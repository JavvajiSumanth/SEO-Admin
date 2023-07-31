import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, IconButton, Rating, TextField } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Box } from "@mui/system";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import uniqid from "uniqid";

export default function FAQ() {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [faqs, setFaqs] = React.useState([]);

  const handelOpen = () => {
    setOpen(true);
    reset();
  };
  const handelClose = () => {
    setOpen(false);
  };
  const reset = () => {
    console.log("resetting");
    setQuestion("");
    setAnswer("");
    setEdit(false);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      updateReview({
        question,
        answer,
        id: edit,
      });
    } else {
      createReview({
        question,
        answer,
      });
    }
  };

  React.useEffect(() => {
    const fetchedData = [];

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "faqs"));
      querySnapshot.forEach((doc) => {
        fetchedData.push(doc.data());
      });
      setFaqs(fetchedData);
    }
    fetchData();
  }, []);
  const handleEdit = ({ question, id, answer }) => {
    setOpen(true);
    setQuestion(question);
    setAnswer(answer);
    setEdit(id);
  };

  const createReview = async (reviewObj) => {
    const genratedID = uniqid();
    reviewObj.id = genratedID;

    const courseRef = doc(db, "faqs", genratedID);
    await setDoc(courseRef, reviewObj);

    setFaqs((faqs) => [...faqs, reviewObj]);
    handelClose();
  };

  const updateReview = async (reviewObj) => {
    const courseRef = doc(db, "faqs", reviewObj.id);

    await setDoc(courseRef, reviewObj, { merge: true });

    const updatedCourses = faqs.map((course) => {
      if (course.id === reviewObj.id) {
        return reviewObj;
      } else return course;
    });
    setFaqs(updatedCourses);
    handelClose();
  };

  const handelDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?") === true) {
      const data = await deleteReview(id);
      if (data) {
        setFaqs((faqs) => faqs.filter((crs) => crs.id !== id));
      }
    }
  };
  const deleteReview = async (reviewID) => {
    try {
      await deleteDoc(doc(db, "faqs", reviewID));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <>
      {open ? (
        <Box component={"form"} onSubmit={handelSubmit}>
          <TextField
            id="outlined-multiline-flexible"
            label="Question"
            fullWidth
            value={question}
            onChange={({ target }) => setQuestion(target.value)}
            required
            sx={{
              my: 2,
            }}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Answer"
            multiline
            rows={3}
            fullWidth
            value={answer}
            onChange={({ target }) => setAnswer(target.value)}
            required
            sx={{
              mb: 2,
            }}
          />

          <br />
          <Button
            variant="contained"
            type="submit"
            sx={{
              my: 2,
            }}
          >
            Submit
          </Button>
          <Button
            onClick={handelClose}
            variant="outlined"
            color="error"
            type="button"
            sx={{
              m: 2,
            }}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Button
          onClick={handelOpen}
          variant="contained"
          sx={{
            m: 2,
          }}
        >
          Add FAQ
        </Button>
      )}
      <br />
      <Typography variant="h3">Recently Added FAQ</Typography>
      <List
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
      >
        {faqs.map((re) => (
          <ListItem
            sx={{
              boxShadow: `rgba(0, 0, 0, 0.08) 0px 4px 12px`,

              mb: 2,
            }}
            key={re.id}
            alignItems="flex-start"
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  color="primary"
                  sx={{
                    mr: 1,
                  }}
                  onClick={() => handleEdit(re)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handelDelete(re.id)}
                  edge="end"
                  aria-label="delete"
                  color="error"
                >
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText
              sx={{
                marginRight: "40px",
              }}
              primary={`Q: ${re.question}`}
              secondary={
                <span className="text-truncate-3">A: {re.answer}</span>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
