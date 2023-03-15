import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate  } from "react-router-dom";
import { authSignUp } from "../../features/authSlice";
import { toast } from 'react-toastify'
import styles from "./Register.module.css";

export const Register = () => {
  const message = useSelector((state) => state.authReducer.regMessage);
  const token = useSelector((state) => state.authReducer.token);

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  React.useEffect(() => {
    if (message) toast(message)
    if (token) navigate('/')
  }, [message, token, navigate])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(authSignUp({ username, password }));
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
    <form onSubmit={handleFormSubmit}>
      <h1>Регистрация</h1>
      <label>
        Username:
        <input
          value={username}
          onChange={(e) => handleSetUsername(e.target.value)}
          type='text'
          placeholder='Username'
        />
      </label>

      <label>
        Password:
        <input
          value={password}
          onChange={(e) => handleSetPassword(e.target.value)}
          type='password'
          placeholder='Password'
        />
      </label>

      <div className={styles.divBtns}>
        <button type='submit' className={styles.login}>
          Подтвердить
        </button>
        <Link to='/login' className={styles.link}>
          Уже зарегистрированы ?
        </Link>
      </div>
    </form>
  );
};
