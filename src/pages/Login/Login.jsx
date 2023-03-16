import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authSignIn } from "../../features/authSlice";
import { toast } from 'react-toastify'

import styles from "./Login.module.css";

export const Login = () => {
  const message = useSelector((state) => state.authReducer.logMessage);
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    if (message) toast(message)
    if (token) navigate('/')
  }, [message, token, navigate])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(authSignIn({ username, password }));
    setUsername("");
    setPassword("");
    console.log(token);
    console.log(message);
  };
  const handleSetUsername = (value) => {
    setUsername(value);
  };
  const handleSetPassword = (value) => {
    setPassword(value);
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <h1>Авторизация</h1>
      <label>
        Username:
        <input
          type='text'
          value={username}
          onChange={(e) => handleSetUsername(e.target.value)}
          placeholder='Username'
        />
      </label>

      <label>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => handleSetPassword(e.target.value)}
          placeholder='Password'
        />
      </label>

      <div className={styles.divBtns}>
        {token ? (<button type='submit' className={styles.login}>
          Войти
        </button>) :
          (<button type='submit' className={styles.login}>
            Выйти
          </button>)
        }
        <Link className={styles.link} to='/register'>
          Нет аккаунта ?
        </Link>
      </div>
    </form>
  );
};
