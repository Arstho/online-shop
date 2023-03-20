import React from "react";
import { Link } from "react-router-dom";
import styles from "./CheckoutPage.module.scss";
import { fetchCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";

const Checkout = () => {
  const localStorageItems = JSON.parse(localStorage.getItem("items")); 
  const [customerName, setCustomerName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [country, setCountry] = React.useState('')
  const [citi, setCiti] = React.useState('')
  const [street, setStreet] = React.useState('')
  const [home, setHome] = React.useState('')
  const [flat, setFlat] = React.useState('')

  const dispatch = useDispatch();

  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('customerName', customerName)
      data.append('email', email)
      data.append('number', number)
      data.append('country', country)
      data.append('citi', citi)
      data.append('street', street)
      data.append('home', home)
      data.append('flat', flat)
      data.append('localStorageItems', localStorageItems)
      dispatch(fetchCart(data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.checkout}>
      <h1>Оформление заказа</h1>
      <p className={styles.header}>Главная—Оформление заказа</p>
      <div className={styles.block}>
        <div className={styles.inputBlock}>
          <div className={styles.buyer}>
            <p className={styles.user}>Данные покупателя</p>
          </div>
          <div className={styles.inputs}>
            <input onChange={(e) => setCustomerName(e.target.value)} type='text' placeholder='Имя'></input>
            <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='E-mail'></input>
            <input onChange={(e) => setNumber(e.target.value)} type='text' placeholder='Телефон'></input>
          </div>
          <div className={styles.inputAddres}>
            <div className={styles.adress}>
              <p>Адрес покупателя</p>
            </div>
            <input onChange={(e) => setCountry(e.target.value)} type='text' placeholder='Страна'></input>
            <input onChange={(e) => setCiti(e.target.value)} type='text' placeholder='Город'></input>
            <input onChange={(e) => setStreet(e.target.value)}  type='text' placeholder='Улица'></input>
            <input onChange={(e) => setHome(e.target.value)} type='text' placeholder='Дом/Квартира'></input>
          </div>
          <p className={styles.comment}>Комментарии</p>
          <textarea onChange={(e) => setFlat(e.target.value)} type='text' placeholder='Комментарии' className={styles.commentInput}></textarea>
        </div>
        <div className={styles.productBlock}>
          <p>Ваш заказ</p>

          <div className={styles.cart}>
            <div className={styles.product}>
              <p>Товар</p>
              {localStorageItems.map((item) => {
            return (
              <div>
              <p>{item.name}</p>
              <p>{item.count}</p>
              <p className={styles.paragraf}>{item.price * item.count}$</p>
              </div>
              )})}
              <div className={styles.payment}>
                <p>Способ оплаты</p>
              </div>
              <p className={styles.cash}> Оплата наличными</p>
              <Link to='/success'>
                <button onClick={submitHandler}> Разместить заказ </button>
              </Link>
            </div>
            <div className={styles.all}>
              <p>Всего</p>
              <div className={styles.dollar}>
                <p>129$</p>
              </div>
              <p className={styles.paragraf2}>129$</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
