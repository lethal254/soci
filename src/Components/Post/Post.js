import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";
import postStyles from "./Post.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { database } from "../../firebase";

function Post({ imageUrl, caption, myUser, id, date, likes, liked }) {
  const { user, dispatch } = useContext(UserContext);

  const likePicture = () => {
    if (myUser.displayName === user.displayName) {
      if (!myUser.liked) {
        database
          .ref(`feed/${id}`)
          .update({ likes: likes + 1 })
          .then(() => {
            database.ref(`feed/${id}/user/liked`).set(true);
          });
      } else {
        database
          .ref(`feed/${id}`)
          .update({ likes: likes - 1 })
          .then(() => {
            database.ref(`feed/${id}/user/liked`).set(false);
          });
      }
    } else {
      if (!liked) {
        database
          .ref(`feed/${id}`)
          .update({ likes: likes + 1 })
          .then(() => {
            database.ref(`feed/${id}/liked`).set(true);
          });
      } else {
        database
          .ref(`feed/${id}`)
          .update({ likes: likes - 1 })
          .then(() => {
            database.ref(`feed/${id}/liked`).set(false);
          });
      }
    }
  };
  return (
    <div className={postStyles.post}>
      <Card className={postStyles.card}>
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={myUser.photoURL}></Avatar>}
          title={myUser.displayName}
          subheader={date}
        />
        {imageUrl ? (
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={imageUrl}
            title={`A Post by ${myUser.displayName}`}
          />
        ) : (
          false
        )}

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {caption}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title="Like">
            <IconButton aria-label="add to favorites" onClick={likePicture}>
              <FavoriteIcon />
              <p>{likes} likes</p>
            </IconButton>
          </Tooltip>
          <Tooltip title="comment">
            <IconButton aria-label="add to favorites">
              <ChatBubbleIcon />
            </IconButton>
          </Tooltip>
          {myUser.displayName === user.displayName ? (
            <Tooltip title="delete post">
              <IconButton
                aria-label="add to favorites"
                onClick={() => {
                  database.ref(`feed/${id}`).remove();
                }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            false
          )}
        </CardActions>
      </Card>
    </div>
  );
}

export default Post;
