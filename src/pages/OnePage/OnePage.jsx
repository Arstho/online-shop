import React from "react";
import { fetchClothes } from "../../features/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./OnePage.module.css";
import { Link, useParams } from "react-router-dom";
import { addItemToLocalStorage, fetchCart } from "../../features/cartSlice";

const OnePage = () => {
  const { id } = useParams();
  const [sizeBtn, setSizeBtn] = React.useState(0);
  const [colorBtn, setColorBtn] = React.useState(0);
  const [count, setCount] = React.useState(1);

  const dispatch = useDispatch();
  const thing = useSelector((state) =>
    state.clothes.clothes.find((elem) => {
      return elem._id === id;
    })
  );

  const similarGoods = useSelector((state) =>
    state.clothes.clothes.filter((el) => {
      return el.category === thing.category;
    })
  );

  React.useEffect(() => {
    dispatch(fetchClothes());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const submitHandler = () => {
    try {
      const data = new FormData();
      data.append('image', thing.image)
      data.append("name", thing.name);
      data.append("count", count);
      data.append("price", thing.price);
      data.append("size", thing.sizes[sizeBtn]);
      data.append("color", thing.color[colorBtn]);
      data.append("total", thing.price * count);
      dispatch(addItemToLocalStorage({ data }));
    } catch (error) {
      console.log(error);
    }
  };

  const onClickChooseSize = (index) => {
    setSizeBtn(index);
  };

  const onClickChooseColor = (index) => {
    setColorBtn(index);
  };

  if (!thing) {
    return "loading";
  }

  const dec = () => {
    setCount(count - 1);
  };

  const inc = () => {
    setCount(count + 1);
  };
  return (
    <div className={styles.conteiner}>
      <h1>{thing.name}</h1>
      <div className={styles.titles}>
        <p>Главная </p>
        <p className={styles.line}></p>
        <p>—</p>
        <p>Свитшоты </p>
        <p className={styles.line}></p>
        <p>—</p>
        <p className={styles.fontP}>{thing.name}</p>
      </div>
      <div className={styles.item}>
        <img
          className={styles.img}
          src={`http://localhost:4000/${thing.image}`}
          alt=""
        />
        <div className={styles.info}>
          <span>{thing.price}$</span>
          <p>Выберите размер</p>
          <ul className={styles.addSize}>
            {thing.sizes.map((el, i) => (
              <li
                key={i}
                onClick={() => onClickChooseSize(i)}
                className={sizeBtn === i ? styles.activeSize : ""}
              >
                {el}
              </li>
            ))}
          </ul>
          <p>Выберите цвет</p>
          <ul className={styles.addColor}>
            {thing.color.map((el, i) => (
              <li
                key={i}
                onClick={() => onClickChooseColor(i)}
                className={colorBtn === i ? styles.activeColor : ""}
              >
                {el}
              </li>
            ))}
          </ul>
          <div className={styles.amountAndAdd}>
            <div>
              <button onClick={dec} className={styles.minus} disabled={count === 1}>
                -
              </button>
              <b className={styles.amount}>{count}</b>
              <button onClick={inc} className={styles.plus}>
                +
              </button>
            </div>
            <button className={styles.addToCart} onClick={submitHandler}>
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
      <h2>Связанные товары</h2>
      <div className={styles.contForSimilarCard}>
        {similarGoods.map((item, i) => {
          if (item._id !== id) {
            return (
              <Link to={`el/${item._id}`}>
                <div key={i} className={styles.similarCard}>
                  <img
                    className={styles.imgSimilarGoods}
                    src={`http://localhost:4000/${item.image}`}
                    alt="img"
                  />
                  <h3>{item.name}</h3>
                  <p>{item.price}$</p>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default OnePage;
