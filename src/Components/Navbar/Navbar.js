import { Button } from "@material-ui/core";
import React, { useState } from "react";
import navbarStyles from "./Navbar.module.css";
import PersonIcon from "@material-ui/icons/Person";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Link } from "react-router-dom";
import PostModal from "../PostModal/PostModal";

function Navbar({ setSearchTerm }) {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const handleHideModal = () => {
    setShowModal(false);
  };
  return (
    <div className={navbarStyles.navbar}>
      <div className={navbarStyles.navbar__content}>
        <Link style={{ textDecoration: "none" }} to="/">
          <Button variant="contained" color="default" size="small">
            <PersonIcon />
          </Button>
        </Link>
        <input
          type="text"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className={navbarStyles.navbar__search}
          placeholder="Search for posts"></input>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleShowModal}>
          <PostAddIcon />
        </Button>
      </div>
      <PostModal showModal={showModal} handleHideModal={handleHideModal} />
    </div>
  );
}

export default Navbar;
