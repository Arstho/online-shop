import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserByName } from "../../features/authSlice";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  fetchCategoryById,
  patchCategory,
} from "../../features/categorySlice";
import { addClotnes } from "../../features/shopSlice";

import styles from "./AdminPage.module.scss";

const AdminPage = () => {
  const dispatch = useDispatch();
  const [action, setAction] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [idForFindOrDelete, setIdForFindOrDelete] = React.useState("");
  const [openCategoriesList, setOpenCategoriesList] = React.useState(false);
  const [clothesName, setClothesName] = React.useState("");
  const [clothesImg, setClothesImg] = React.useState("");
  const [clothesSizes, setClothesSizes] = React.useState("");
  const [clothesColors, setClothesColors] = React.useState("");
  const [clothesPrice, setClothesPrice] = React.useState();
  const [deleteUserName, setDeleteUserName] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);
  const currentCategory = useSelector(
    (state) => state.categories.currentCategory
  );

  const handleAddCategory = () => {
    dispatch(addCategory(category));
    setCategory("");
  };

  const handleGetCategoryById = () => {
    dispatch(fetchCategoryById(idForFindOrDelete));
    setCategory(currentCategory.category);
  };

  const handlePatchCategoryById = () => {
    dispatch(patchCategory({ id: idForFindOrDelete, category }));
    setCategory("");
  };

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(idForFindOrDelete));
    setIdForFindOrDelete("");
  };

  const handleDeleteUser = () => {
    dispatch(deleteUserByName(deleteUserName));
    setIdForFindOrDelete("");
  };

  const formClear = () => {
    setCategory("");
    setIdForFindOrDelete("");
    setClothesName("");
    setClothesSizes("");
    setClothesColors("");
    setClothesPrice("");
    setOpenCategoriesList(false);
  };

  const handleChangeAction = (newAction) => {
    setAction(newAction);
    formClear();
  };

  const disabledValues = () => {
    if (
      !clothesName ||
      !clothesImg ||
      !category ||
      !clothesSizes ||
      !clothesColors ||
      !clothesPrice
    ) {
      return true;
    }
    return false;
  };

  const handleAddCloth = () => {
    dispatch(
      addClotnes({
        name: clothesName,
        image: clothesImg,
        category,
        sizes: clothesSizes.split(' '),
        color: clothesColors.split(' '),
        price: clothesPrice,
      })
    );
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.addActionForm}>
        <div className={styles.adminAction}>
          <div className={styles.chooseActionText}>Выберите действие</div>
          <button
            className={styles.chooseActionButton}
            onClick={() => handleChangeAction("ADD COMMENT")}
          >
            Добавить категорию
          </button>
          <button
            className={styles.chooseActionButton}
            onClick={() => handleChangeAction("PATCH COMMENT")}
          >
            Изменить категорию
          </button>
          <button
            className={styles.chooseActionButton}
            onClick={() => handleChangeAction("DELETE COMMENT")}
          >
            Удалить категорию
          </button>
          <button
            className={styles.chooseActionButton}
            onClick={() => handleChangeAction("DELETE USER")}
          >
            Удалить пользователя
          </button>
          <button
            className={styles.chooseActionButton}
            onClick={() => setAction("ADD CLOTHES")}
          >
            Добавить одежду
          </button>
        </div>
        {action === "ADD COMMENT" && (
          <div className={styles.actionForm}>
            <div className={styles.actionText}>
              Введите категорию, которую хотите добавить
            </div>
            <div className={styles.actionInput}>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles.addCategoryButton}>
              <button disabled={!category} onClick={handleAddCategory}>
                Добавить категорию
              </button>
            </div>
          </div>
        )}
        {action === "PATCH COMMENT" && (
          <div className={styles.actionForm}>
            <div className={styles.actionText}>
              Введите id категории, которую хотите изменить
            </div>
            <div className={styles.actionInput}>
              <input
                value={idForFindOrDelete}
                onChange={(e) => setIdForFindOrDelete(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles.categoriesList}>
              <div
                className={styles.openCategoryListText}
                onClick={() => setOpenCategoriesList(!openCategoriesList)}
              >
                Список категорий
              </div>
              {openCategoriesList &&
                categories.map((category) => {
                  return (
                    <div key={category._id} className={styles.categoryRow}>
                      <div className={styles.categoryName}>
                        {category.category}
                      </div>
                      <div className={styles.categoryId}>{category._id}</div>
                    </div>
                  );
                })}
            </div>
            <div className={styles.getCategory}>
              <button
                onClick={handleGetCategoryById}
                disabled={!idForFindOrDelete}
              >
                Получить категорию
              </button>
            </div>
            <div className={styles.changedCategory}>
              <div className={styles.changedCategoryText}>
                Введите новое название категории
              </div>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles.addCategoryButton}>
              <button disabled={!category} onClick={handlePatchCategoryById}>
                Изменить категорию
              </button>
            </div>
          </div>
        )}
        {action === "DELETE COMMENT" && (
          <div className={styles.actionForm}>
            <div className={styles.actionText}>
              Введите id категории, которую хотите удалить
            </div>
            <div className={styles.actionInput}>
              <input
                value={idForFindOrDelete}
                onChange={(e) => setIdForFindOrDelete(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles.categoriesList}>
              <div
                className={styles.openCategoryListText}
                onClick={() => setOpenCategoriesList(!openCategoriesList)}
              >
                Список категорий
              </div>
              {openCategoriesList &&
                categories.map((category) => {
                  return (
                    <div key={category._id} className={styles.categoryRow}>
                      <div className={styles.categoryName}>
                        {category.category}
                      </div>
                      <div className={styles.categoryId}>{category._id}</div>
                    </div>
                  );
                })}
            </div>
            <div className={styles.addCategoryButton}>
              <button
                disabled={!idForFindOrDelete}
                onClick={handleDeleteCategory}
              >
                Удалить категорию
              </button>
            </div>
          </div>
        )}
        {action === "DELETE USER" && (
          <div className={styles.actionForm}>
            <div className={styles.actionText}>
              Введите имя пользователя, которого хотите удалить
            </div>
            <div className={styles.actionInput}>
              <input
                value={deleteUserName}
                onChange={(e) => setDeleteUserName(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles.addCategoryButton}>
              <button disabled={!deleteUserName} onClick={handleDeleteUser}>
                Удалить пользователя
              </button>
            </div>
          </div>
        )}
        {action === "ADD CLOTHES" && (
          <div className={styles.actionForm}>
            <div className={styles.actionText}>Введите название одежды</div>
            <div className={styles.actionInput}>
              <input
                value={clothesName}
                onChange={(e) => setClothesName(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles.actionText}>Введите путь к картинке</div>
            <div className={styles.actionInput}>
              <input
                type="text"
                value={clothesImg}
                onChange={(e) => setClothesImg(e.target.value)}
              />
            </div>
            <div className={styles.actionText}>Вставьте id категории</div>
            <div className={styles.actionInput}>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles.categoriesList}>
              <div
                className={styles.openCategoryListText}
                onClick={() => setOpenCategoriesList(!openCategoriesList)}
              >
                Список категорий
              </div>
              {openCategoriesList &&
                categories.map((category) => {
                  return (
                    <div key={category._id} className={styles.categoryRow}>
                      <div className={styles.categoryName}>
                        {category.category}
                      </div>
                      <div className={styles.categoryId}>{category._id}</div>
                    </div>
                  );
                })}
            </div>
            <div className={styles.actionText}>
              Введите рамзеры данной одежды через пробел
            </div>
            <div className={styles.actionInput}>
              <input
                value={clothesSizes}
                onChange={(e) => setClothesSizes(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles.actionText}>
              Введите цвета данной одежды через пробел
            </div>
            <div className={styles.actionInput}>
              <input
                value={clothesColors}
                onChange={(e) => setClothesColors(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles.actionText}>Введите цену данной одежды</div>
            <div className={styles.actionInput}>
              <input
                value={clothesPrice}
                onChange={(e) => setClothesPrice(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles.addCategoryButton}>
              <button disabled={disabledValues()} onClick={handleAddCloth}>
                Добавить одежду
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
