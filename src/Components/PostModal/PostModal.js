import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { Button } from "@material-ui/core";
import postModalStyles from "./PostModal.module.css";
import { database, storage } from "../../firebase";
import UserContext from "../../Context/UserContext";
import moment from "moment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    padding: "2rem",
  },
};

function PostModal({ showModal, handleHideModal }) {
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState("");
  const { user } = useContext(UserContext);

  const onInputChange = (e) => {
    setTextInput(e.target.value);
  };
  const onFileChange = (e) => {
    setFileInput(e.target.files[0]);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    storage
      .ref(`/images/${fileInput.name}`)
      .put(fileInput)
      .then(() => {
        storage
          .ref("images")
          .child(fileInput.name)
          .getDownloadURL()
          .then((firebaseUrl) => {
            return firebaseUrl;
          })
          .then((firebaseUrl) => {
            const date = moment().utcOffset("+05:30").format("MMMM Do YYYY");
            const timestamp = moment().unix();
            database.ref("feed").push({
              caption: textInput,
              imageUrl: firebaseUrl,
              timestamp,
              date,
              user,
              likes: 0,
              liked: false,
            });
          })
          .then(() => {
            setFileInput("");
            setTextInput("");
            handleHideModal();
          });
      });
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleHideModal}
      style={customStyles}
      className={postModalStyles.modal}
      ariaHideApp={false}>
      <form className={postModalStyles.modalForm} onSubmit={onFormSubmit}>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" onChange={onFileChange} hidden />
        </Button>
        <textarea
          onChange={onInputChange}
          className={postModalStyles.text}
          value={textInput}
        />
        <Button color="secondary" variant="contained" type="submit">
          Post
        </Button>
      </form>
    </Modal>
  );
}

export default PostModal;
