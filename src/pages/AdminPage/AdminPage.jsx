import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AdminPage.module.scss";

const AdminPage = () => {
  const dispath = useDispatch();
  const [action, setAction] = React.useState();

  return (
    <div className={styles.adminPage}>
      <div className={styles.addCategoryForm}>
        <div className={styles.adminAction}>
          <button>Добавить категорию</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
