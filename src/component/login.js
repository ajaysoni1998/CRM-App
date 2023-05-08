import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  InputText,
  HeaderText,
  LoginButton,
  ContentWrapper,
  LogInContainer,
} from "./commons";
import styled, { css } from "styled-components";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

const baseURL = "http://localhost:9000";
const MsgDiv = styled.div`
  color: #e91e63;
  font-size: 12px;
  margin: 5px 22px 2px;

  ${(props) =>
    props.exists &&
    css`
      color: green;
    `}
`;

export const LogIn = function () {
  const nav = useNavigate();
  const [message, setMessage] = React.useState("");
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const submitRef = React.useRef();
  const authenticateUser = async function () {
    const userName = usernameRef.current.value;
    const password = passwordRef.current.value;

    const resp = await axios.post(
      baseURL + "/authenticateUser",
      { userName, password },
      axiosConfig
    );
    if (resp.data && resp.data.isAuthenticated) {
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("isAdmin", resp.data.isAdmin);
      setMessage("You have logged In");
      if (resp.data.isAdmin) nav("/admin/one-view");
      else nav("/home");
    } else {
      setMessage(resp.data.message);
      sessionStorage.setItem("isAdmin", false);
    }
  };
  const checkUserExists = async function () {
    const userName = usernameRef.current.value;

    if (userName.trim() === "" || userName.trim().length < 4) return;
    const resp = await axios.post(
      baseURL + "/checkUserExists",
      { userName },
      axiosConfig
    );

    if (resp.data && !resp.data.isExistingUser) {
      setMessage("User Doesn't exist, please create an account");
    } else setMessage("User exists");
  };

  const onEnter = function (evt) {
    if (evt.keyCode === 13) {
      submitRef.current.click();
    }
  };
  const sessionUserName = sessionStorage.getItem("userName") || "";

  return (
    <LogInContainer>
      <ContentWrapper>
        <HeaderText>Login</HeaderText>
        {message ? (
          <MsgDiv exists={message === "User exists"}>{message}</MsgDiv>
        ) : null}
        <InputText
          ref={usernameRef}
          type="text"
          placeholder="username"
          onBlur={checkUserExists}
          defaultValue={sessionUserName}
          autoFocus={sessionUserName ? false : true}
        />
        <InputText
          ref={passwordRef}
          type="password"
          placeholder="password"
          autoFocus={sessionUserName ? true : false}
          onKeyUp={onEnter}
        />

        <LoginButton ref={submitRef} onClick={authenticateUser}>
          Sign In
        </LoginButton>
      </ContentWrapper>
    </LogInContainer>
  );
};

// const [str, setStr] = React.useState("This string is from client");
//     React.useEffect(() => {
//         const getData = async function(){
//             const resp = await  axios.get("http://localhost:9000/data")
//             setTimeout(() => {
//                 setStr(resp.data);
//             },4000);
//         }
//        getData();
//     }, [])
