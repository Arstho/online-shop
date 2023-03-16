import React from "react";
import styles from "./Home.module.css";
import arrowDown from "..//..//assets/down_arrow.png";
import allef1 from "..//..//assets/allef1.png";
import allef2 from "..//..//assets/allef2.png";
import allef3 from "..//..//assets/allef3.png";
import quality1 from "..//..//assets/quality1.png";
import quality2 from "..//..//assets/quality2.png";
import quality3 from "..//..//assets/quality3.png";
import imgTeam from "..//..//assets/fotksh.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClothes } from "../../features/shopSlice";

const Home = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchClothes());
  }, [dispatch]);

  const clothes = useSelector((state) => state.clothes.clothes);

  return (
    <div className={styles.home}>
      <div className={styles.homeBlockTop}>
        <div className={styles.topText}>
          <div className={styles.topTextTitle}>
            Новые поступления в этом сезоне
          </div>
          <div className={styles.topTextContent}>
            Утонченные сочетания и бархатные оттенки - вот то, что вы искали в
            этом сезоне. Время исследовать.
          </div>
          <div className={styles.topButton}>
            <Link className={styles.topButton1} to={"/shop"}>
              <img src={arrowDown} alt="arrow" />
            </Link>
            <Link className={styles.topButton2} to={"/shop"}>
              Открыть магазин
            </Link>
          </div>
        </div>
        <div className={styles.topImage}>
          <img src={allef1} alt="" className={styles.topImg1} />
          <img src={allef2} alt="" className={styles.topImg2} />
          <img src={allef3} alt="" className={styles.topImg3} />
        </div>
      </div>
      <div className={styles.homeBlockCollection}>
        <div className={styles.collectionTitlle}>Новая коллекция</div>
        <div className={styles.collectionBlock}>
          {clothes.map((cloth, index) => {
            return (
              <div className={styles.collectionItem} key={index}>
                <Link to={`/el/${cloth._id}`}><div className={styles.colletcionItemHover}></div></Link>
                <img
                  src={`http://localhost:4000/${cloth.image}`}
                  alt=""
                  className={styles.collectionImage}
                />
                <div className={styles.collectionName}>{cloth.name}</div>
                <div className={styles.collectionPrice}>${cloth.price}</div>
              </div>
            );
          })}
        </div>
        <Link to={'/shop'}>
          <button className={styles.collectionBtn}>Открыть магазин</button>
        </Link>
      </div>
      <div className={styles.homeBlockQuality}>
        <div className={styles.qualiteTitle}>Что для нас важно</div>
        <div className={styles.qualite}>
          <div className={styles.qualiteBlock}>
            <img src={quality1} alt="" className={styles.qualiteImage} />
            <div className={styles.qualiteBlockTitle}>Качество</div>
            <div className={styles.qualiteBlockText}>
              Наши профессионалы работают на лучшем оборудовании для пошива
              одежды беспрецедентного качества
            </div>
          </div>
          <div className={styles.qualiteBlock}>
            <img src={quality2} alt="" className={styles.qualiteImage} />
            <div className={styles.qualiteBlockTitle}>Скорость</div>
            <div className={styles.qualiteBlockText}>
              Благодаря отлаженной системе в Womazing мы можем отшивать до 20-ти
              единиц продукции в наших собственных цехах
            </div>
          </div>
          <div className={styles.qualiteBlock}>
            <img src={quality3} alt="" className={styles.qualiteImage} />
            <div className={styles.qualiteBlockTitle}>Ответственность</div>
            <div className={styles.qualiteBlockText}>
              Мы заботимся о людях и планете. Безотходное производство и
              комфортные условия труда - все это Womazing
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homeBlockTeam}>
        <div className={styles.teamTitle}>Команда мечты Womazing</div>
        <div className={styles.teamBlokc}>
          <img src={imgTeam} alt="" className={styles.teamImage} />
          <div className={styles.teamContent}>
            <div className={styles.teamContentTitle}>Для каждой</div>
            <br />
            <br />
            <div className={styles.teamContentText}>
              Каждая девушка уникальна. Однако, мы схожи в миллионе мелочей.{" "}
              <br />
              <br />
              Womazing ищет эти мелочи и создает прекрасные вещи, которые
              выгодно подчеркивают достоинства каждой девушки.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
