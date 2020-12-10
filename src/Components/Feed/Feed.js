import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Posts from "../Posts/Posts";
import feedStyles from "./Feed.module.css";

function Feed() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={feedStyles.feed}>
      <Navbar setSearchTerm={setSearchTerm} />
      <Posts searchTerm={searchTerm} />
    </div>
  );
}

export default Feed;
