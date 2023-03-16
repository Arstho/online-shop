import React, { useEffect } from "react";
import styles from "./ShopPage.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchClothes } from "../../features/shopSlice";
import { fetchCategories } from "../../features/categorySlice";
import { Link, NavLink, useParams } from "react-router-dom";
import OnePage from "../OnePage/OnePage";

const ShopPage = () => {
  const { categoryId } = useParams();

  const categories = useSelector((state) => state.categories.categories);  
  const clothes = useSelector((state) =>
    state.clothes.clothes.filter((elem) => { 
      if (!categoryId) return true
      return elem.category === categoryId;  
    })
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClothes());
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className={styles.ShopPage}>
      <div className={styles.bText}>Магазин</div>
      <div className={styles.linkToThisPage}>
        Главная <span className={styles.defis}>—</span>{" "}  
        <span className={styles.opacityText}>Магазин</span>   
      </div>
      <div className={styles.categories_row}>
        <div className={styles.category}>
          <NavLink to={'/shop'} className={({ isActive }) => (isActive ? styles.category_active : styles.category)}><button>Все</button></NavLink>  
        </div>
        {categories.map((category) => {
          return (
            <div className={styles.category}>
              <NavLink to={`/category/${category._id}`} className={({ isActive }) => (isActive ? styles.category_active : styles.category)}><button>{category.category}</button></NavLink>  
            </div>
          );
        })}
      </div>
      <div className={styles.countOfVisibleItems}>   
        Показано: 9 из 12 товаров
      </div>
      <div className={styles.items}>
        {clothes.map((carts) => {
          return (
            <div className={styles.carts}>
              <img src={`http://localhost:4000/${carts.image}`} />   
              <div className={styles.name}>{carts.name}</div>
              <div className={styles.price}>${carts.price}</div>  
            </div>
          );
        })}
      </div>
      <div className={styles.countOfVisibleItems}>
        Показано: 9 из 12 товаров
      </div>
      <Pagination currentPage={1} onChangePage={() => {}} />
    </div>
  );
};

export default ShopPage;
