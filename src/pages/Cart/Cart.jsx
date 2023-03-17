import React from "react";
import { Link } from "react-router-dom";
import styles from "./cart.module.css";

const Cart = () => {
  const localStorageItems = JSON.parse(localStorage.getItem("items"));
  return (
    <div className={styles.conteiner}>
      <div className={styles.title}>
        <h1>Корзина</h1>
        <div className={styles.titleP}>
          <p>Главная </p>
          <p> — </p>
          <p className={styles.fontP}> Корзина</p>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td>
              <h4>Фото товара</h4>
            </td>
            <td>
              <h4>Товар</h4>
            </td>
            <td>
              <h4>Цена</h4>
            </td>
            <td>
              <h4>Количество</h4>
            </td>
            <td>
              <h4>Всего</h4>
            </td>
            <td>
              <h4>Удалить</h4>
            </td>
          </tr>
        </thead>
        <tbody>
          {localStorageItems.map((item) => {
            return (
              <tr>
                <td>
                  <img
                    className={styles.img}
                    src={`http://localhost:4000/${item.image}`}
                    alt=""
                  />
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button className={styles.minus}>-</button>
                  <b className={styles.amount}>{item.count}</b>
                  <button className={styles.plus}>+</button>
                </td>
                <td>${item.price * item.count}</td>
                <td>
                  <button>х</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.order}>
        <button className={styles.btnTotal}>Итого: 124$</button>
        <Link className={styles.btnOrder} to={"/checkout"}>
          Оформить заказ
        </Link>
      </div>
    </div>
  );
};

export default Cart;
