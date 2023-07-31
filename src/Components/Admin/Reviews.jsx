import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, IconButton, TextField } from "@mui/material";
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

export default function Reviews() {
  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [profile, setProfile] = React.useState("");

  const [testimonial, setTestimonial] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);

  const handelOpen = () => {
    setOpen(true);
    reset();
  };
  const handelClose = () => {
    setOpen(false);
  };
  const reset = () => {
    console.log("resetting");
    setName("");
    setTestimonial("");
    setTitle("");
    setProfile("");
    setEdit(false);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      updateReview({
        testimonial,
        name,
        title,
        profile,
        id: edit,
      });
    } else {
      createReview({
        testimonial,
        name,
        title,
        profile,
      });
    }
  };

  React.useEffect(() => {
    const fetchedData = [];

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      querySnapshot.forEach((doc) => {
        fetchedData.push(doc.data());
      });
      setReviews(fetchedData);
    }
    fetchData();
  }, []);
  const handleEdit = ({ testimonial, name, id, title }) => {
    setOpen(true);
    setTestimonial(testimonial);
    setName(name);
    setTitle(title);
    setProfile(profile);
    setEdit(id);
  };

  const createReview = async (reviewObj) => {
    const genratedID = uniqid();
    reviewObj.id = genratedID;

    const courseRef = doc(db, "reviews", genratedID);
    await setDoc(courseRef, reviewObj);

    setReviews((reviews) => [...reviews, reviewObj]);
    handelClose();
  };

  const updateReview = async (reviewObj) => {
    const courseRef = doc(db, "reviews", reviewObj.id);

    await setDoc(courseRef, reviewObj, { merge: true });

    const updatedCourses = reviews.map((course) => {
      if (course.id === reviewObj.id) {
        return reviewObj;
      } else return course;
    });
    setReviews(updatedCourses);
    handelClose();
  };

  const handelDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this Testimonial?") ===
      true
    ) {
      const data = await deleteReview(id);
      if (data) {
        setReviews((reviews) => reviews.filter((crs) => crs.id !== id));
      }
    }
  };
  const deleteReview = async (reviewID) => {
    try {
      await deleteDoc(doc(db, "reviews", reviewID));
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
            label="Name"
            fullWidth
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
            sx={{
              my: 2,
            }}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            fullWidth
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
            sx={{
              mb: 2,
            }}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Testimonial"
            fullWidth
            multiline
            rows={3}
            value={testimonial}
            required
            sx={{
              mb: 2,
            }}
            onChange={({ target }) => setTestimonial(target.value)}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Profile URL (optional)"
            fullWidth
            value={profile}
            onChange={({ target }) => setProfile(target.value)}
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
          Add Testimonial
        </Button>
      )}
      <br />
      <Typography variant="h3">Recently Added Reviews</Typography>
      <List
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
      >
        {reviews.map((re) => (
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
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={
                  re.profile ||
                  `https://avatars.dicebear.com/api/adventurer/${re.id}.svg`
                }
              />{" "}
            </ListItemAvatar>
            <ListItemText
              sx={{
                marginRight: "40px",
              }}
              primary={re.name}
              secondary={<p className="text-truncate-3">{re.testimonial}</p>}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
