import React from "react";
import { IN, US } from "country-flag-icons/react/3x2";
import { Lock, Unlock } from "react-feather";
import {
  LockIcon,
  InputText,
  HeaderText,
  LoginButton,
  ContentWrapper,
  LogInContainer,
  PasswordWrapper,
} from "./commons";

import axios from "axios";

import { useNavigate } from "react-router-dom";
const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

const baseURL = "http://localhost:9000";
export const SignUp = function () {
  const nav = useNavigate();
  const Cmap = new Map([]);
  Cmap.set("+91", <IN />);
  Cmap.set("+1", <US />);
  const [type, setType] = React.useState("text");
  const [FlagIcon, setFlagIcon] = React.useState(null);
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();

  const onlyAlphabets = function (evt) {
    const char = evt.key;
    const regex = new RegExp(/^[a-z A-Z\b]+$/);

    if (!regex.test(char)) evt.preventDefault();
  };

  const onlyNumbers = function (evt) {
    const char = evt.key;
    const regex = new RegExp(/^[+0-9\b]+$/);

    if (!regex.test(char) && evt.which !== 8) {
      evt.preventDefault();
    }
    const i2C = evt.currentTarget.value.substring(0, 2);
    const i3C = evt.currentTarget.value.substring(0, 3);

    if (Cmap.has(i2C)) {
      setFlagIcon(Cmap.get(i2C));
    } else if (Cmap.has(i3C)) {
      setFlagIcon(Cmap.get(i3C));
    } else {
      setFlagIcon(null);
    }
  };
  const toggleVisibilityOfPassword = function () {
    if (type === "text") setType("password");
    else setType("text");
  };

  const onRegister = async function () {
    const resp = await axios.post(
      baseURL + "/registerUser",
      {
        userName: usernameRef.current.value,
        password: passwordRef.current.value,
      },
      axiosConfig
    );

    if (resp.data && resp.data.isRegistered) {
      alert("User registered successfully, please login.");
      nav("/login");
    }
  };
  return (
    <LogInContainer>
      <ContentWrapper>
        <HeaderText>Register</HeaderText>
        <InputText
          type="text"
          placeholder="Full Name"
          onKeyDown={onlyAlphabets}
        />
        <PasswordWrapper>
          <InputText
            type="text"
            placeholder="Phone Number"
            onKeyDown={onlyNumbers}
          />
          <LockIcon>{FlagIcon}</LockIcon>
        </PasswordWrapper>
        <InputText ref={usernameRef} type="text" placeholder="Username" />

        <PasswordWrapper>
          <InputText ref={passwordRef} type={type} placeholder="Password" />
          <LockIcon onClick={toggleVisibilityOfPassword}>
            {type === "text" ? <Unlock /> : <Lock />}
          </LockIcon>
        </PasswordWrapper>
        <LoginButton onClick={onRegister}>Register</LoginButton>
      </ContentWrapper>
    </LogInContainer>
  );
};
