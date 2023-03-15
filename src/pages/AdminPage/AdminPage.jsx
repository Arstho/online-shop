import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  fetchCategoryById,
  patchCategory,
} from "../../features/categorySlice";

import styles from "./AdminPage.module.scss";

const AdminPage = () => {
  const dispatch = useDispatch();
  const [action, setAction] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [idForFindOrDelete, setIdForFindOrDelete] = React.useState("");
  const [openCategoriesList, setOpenCategoriesList] = React.useState(false);

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

  return (
    <div className={styles.adminPage}>
      <div className={styles.addActionForm}>
        <div className={styles.adminAction}>
          <div className={styles.chooseActionText}>Выберите действие</div>
          <button
            className={styles.chooseAsctionButton}
            onClick={() => setAction("ADD COMMENT")}
          >
            Добавить категорию
          </button>
          <button
            className={styles.chooseAsctionButton}
            onClick={() => setAction("PATCH COMMENT")}
          >
            Изменить категорию
          </button>
          <button
            className={styles.chooseAsctionButton}
            onClick={() => setAction("DELETE COMMENT")}
          >
            Удалить категорию
          </button>
        </div>
        {action === "ADD COMMENT" && (
          <div className={styles.addCategoryForm}>
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
          <div className={styles.addCategoryForm}>
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
          <div className={styles.addCategoryForm}>
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
      </div>
    </div>
  );
};

export default AdminPage;
