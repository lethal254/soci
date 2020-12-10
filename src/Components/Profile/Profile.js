import { Avatar, Badge, Button } from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import profileStyles from "./Profile.module.css";
import PeopleIcon from "@material-ui/icons/People";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../../firebase";
import UserContext from "../../Context/UserContext";

function Profile() {
  const { user, dispatch } = useContext(UserContext);
  return (
    <div className={profileStyles.profile}>
      {/* This is the header section of the profile page*/}

      <div className={profileStyles.profile__logo}>
        <Button
          onClick={() => {
            auth.signOut().then(() => {
              dispatch({
                type: "LOGOUT",
                user: null,
              });
            });
          }}
          size="small"
          variant="contained"
          color="default"
          className={profileStyles.profile__logoutbtn}>
          <ExitToAppIcon />
        </Button>
        <h1 className={profileStyles.profile__logoText}>SoCi.</h1>
      </div>

      {/* This is the details section of the  page*/}

      <div className={profileStyles.profile__content}>
        <div className={profileStyles.profile__avatarcircle}>
          <Avatar
            src={user.photoURL}
            className={profileStyles.profile__avatar}
          />
        </div>
        <h3 className={profileStyles.profile__name}>{user.displayName}</h3>
        <p className={profileStyles.profile__username}>
          @{user.displayName.replace(/ /g, "")}
        </p>

        {/* This is the stats section of the profile page*/}

        <div className={profileStyles.profile__followers}>
          <PeopleIcon />
          <p>Followers</p>
          <p>
            <Badge badgeContent={5} color="secondary"></Badge>
          </p>
        </div>
        <div className={profileStyles.profile__posts}>
          <PostAddIcon />
          <p>Posts</p>
          <p>
            <Badge badgeContent={1} color="secondary"></Badge>
          </p>
        </div>

        {/* This button leads to the feed page*/}

        <Link to="/feed" className={profileStyles.link}>
          <Button variant="contained" color="secondary">
            FEED
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
