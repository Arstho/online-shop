import React, { useEffect } from "react";
import styles from "./ShopPage.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchClothes } from "../../features/shopSlice";
import { fetchCategories } from "../../features/categorySlice";
import { Link, useParams } from "react-router-dom";

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
        <div className={styles.category} id={styles.activeCategory}>
          <Link to={'/shop'}><button>Все</button></Link>  
        </div>
        {categories.map((category) => {
          return (
            <div className={styles.category}>
              <Link to={`/shop/${category._id}`}><button>{category.category}</button></Link>  
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
