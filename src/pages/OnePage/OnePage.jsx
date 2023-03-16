import React from 'react'
import { fetchCategories } from "../../features/categorySlice";
import { fetchClothes } from "../../features/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./OnePage.module.css";
import { useParams } from "react-router-dom";


const OnePage = () => {
  const { id } = useParams();
  const [size, setSize] = React.useState()
  const [colors, setColor] = React.useState()

  const dispatch = useDispatch()
  // const categories = useSelector((state) => state.categories.categories);  
  const thing = useSelector((state) =>
    state.clothes.clothes.find((elem) => {
      return elem._id === id;
    })
  );

  const similarGoods = useSelector((state) =>
    state.clothes.clothes.filter((el) => {
      console.log(el.category);
      return el.category === thing.category;
    })
  );

  React.useEffect(() => {
    dispatch(fetchClothes())
  }, [dispatch])

  // React.useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [dispatch]);

  const onClickChooseSize = (index) => {
    setSize(index)
  }

  const onClickChooseColor = (index) => {
    setColor(index)
  }

  if (!thing) {
    return "loading"
  }

  const { name, image, category, sizes, color, price } = thing
  console.log('thing', thing);

  // clothes.filter(el =>  el.category === id)

  console.log('similarGoods', similarGoods);
  return (
    <div className={styles.conteiner}>
      <h1>{name}</h1>
      <div className={styles.titles}>
        <p>Главная </p>
        <p className={styles.line}> </p>
        <p>—</p>
        <p>Свитшоты </p>
        <p className={styles.line}></p>
        <p>—</p>
        <p className={styles.fontP}> {name}</p>
      </div>
      <div className={styles.item}>
        <img className={styles.img} src="" alt="" />
        <div className={styles.info}>
          <span>{price}$</span>
          <p>Выберите размер</p>
          <ul className={styles.addSize}>
            {sizes.map((el, i) => (
              <li key={i} onChange={() => onClickChooseSize(i)} className={size === i ? styles.activeSize : ''}>{el}</li>
            ))}
          </ul>
          <p>Выберите цвет</p>
          <ul className={styles.addColor}>
            {color.map((el, i) => (
              <li key={i} onChange={() => onClickChooseColor(i)} className={colors === i ? styles.activeColor : ''}>{el}</li>
            ))}
          </ul>
          <div className={styles.amountAndAdd}>
            <button className={styles.addToCart}>Добавить в корзину</button>
          </div>
        </div>
      </div>
      <h2>Связанные товары</h2><div className={styles.contForSimilarCard}>
      {similarGoods.map(item => {
        if (item._id !== id) {
          return <div className={styles.similarCard}><img className={styles.imgSimilarGoods} src={item.image} alt="img" /> <h3>{item.name}</h3> <p>{item.price}$</p>
          </div>
        }
      })}</div>
    </div>
  )
}

export default OnePage
