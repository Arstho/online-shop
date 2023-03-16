import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import vector1 from "..//..//assets/Vector.png";
import vector2 from "..//..//assets/Vector2.png";
import basket from "..//..//assets/basket.png";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authExit, authSignIn, fetchUsers } from "../../features/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.loginedUser);
  const [modalActive, setModalActive] = useState(false);
  const handleModal = () => {
    dispatch(authExit());
    setModalActive(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_wrapper}>
        <div className={styles.headerLogo}>
          <img src={vector1} alt='vector' />
          <Link to='/'>Womazing</Link>
        </div>
        <div className={styles.headerLick}>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : styles.nav_link)}
            to={"/"}>
            Главная
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : styles.nav_link)}
            to={"/shop"}>
            Магазин
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : styles.nav_link)}
            to={"/aboutus"}>
            О нас
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : styles.nav_link)}
            to={"/contact"}>
            Контакты
          </NavLink>
        </div>
        <div className={styles.headersContact}>
          <img src={vector2} alt='phone' />
          <div className={styles.headerNumber}>+7 (495) 823-54-12</div>
          <div className={styles.headerBasket}>
            <Link to={"/cart"}>
              <img src={basket} alt='' />
            </Link>
          </div>
          {!token ? (
            <Link className={styles.auth} to={"/login"}>
              Войти
            </Link>
          ) : (
            <div onClick={() => setModalActive(!modalActive)}>{user ? user.username : ""}</div>
          )}
          {modalActive && (
            <div onClick={() => setModalActive(false)} className={styles.modalWindow}>
              <ul onClick={(e) => e.stopPropagation()} className={styles.modalContent}>
                {user.role === "ADMIN" && (
                  <Link to='/admin'>
                    <li className={styles.menuLi}>Настройки администратора</li>
                  </Link>
                )}
                <Link to='/'>
                  <li className={styles.menuLi} onClick={() => handleModal()}>
                    Выйти
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
