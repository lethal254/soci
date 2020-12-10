import { Button } from "@material-ui/core";
import React from "react";
import { signInWithGoogle } from "../../firebase";

function Login({ history }) {
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={signInWithGoogle}>
        Login
      </Button>
    </div>
  );
}

export default Login;
