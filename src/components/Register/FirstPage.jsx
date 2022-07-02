import React from 'react'
import GoogleLogin from "react-google-login";
import {Button } from "react-bootstrap";
const FirstPage = ({show,setState}) => {
  return (
    <div
    className="login-Form"
    style={{ display: show === 1 ? "grid" : "none" }}
  >
    <GoogleLogin
      className="google-login"
      // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
      buttonText="Continue with Google"
      // onSuccess={responseGoogle}
      // onFailure={responseGoogle}
      // cookiePolicy={'single_host_origin'}
    />
  
    <hr className="hr-text" data-content="OR" />

    <GoogleLogin
      className="google-login"
      // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
      buttonText="Continue with E-mail"
      // onSuccess={responseGoogle}
      // onFailure={responseGoogle}
      // cookiePolicy={'single_host_origin'}
    />

    <Button
      className="button-submit"
      onClick={() => setState(2)}
      style={{ marginTop: "20px" }}
    >
      Next
    </Button>
  </div>
  )
}

export default FirstPage