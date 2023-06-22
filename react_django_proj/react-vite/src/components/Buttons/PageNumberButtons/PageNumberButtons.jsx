import React from "react";
import { Button } from "reactstrap";
import { UseStudentsPerPage } from "../../../contexts/StudentsPerPageContext";
import { UseMutationInMemory } from "../../../customHooks/UseMutationInMemory";
import styles from "./PageNumberButtons.module.css";

// компонент с значениями страниц таблицы приложения
export const PageNumberButtons = ({ setPage }) => {
  const { studentsPerPage } = UseStudentsPerPage();

  let buttonsArray = [];

  const mutate = UseMutationInMemory(setPage);

  let numberOfButtons =
    Math.ceil(
      Number(localStorage.getItem("numberOfStudents")) / studentsPerPage
    ) <= 12
      ? Math.ceil(
          Number(localStorage.getItem("numberOfStudents")) / studentsPerPage
        )
      : 12;

  for (let i = 0; i < numberOfButtons; i++) {
    let button = (
      <Button
        onClick={async (e) => {
          // отправляем запрос в память со значением страницы функцией putRequestToInMemoryDatabase - react_django_proj\react-vite\src\services\requests.js
          // строчки 45-51
          // на бекэнде обрабатывается - react_django_proj\memory_db_only\views.py, строчка 83 и строчки 8-14
          mutate.mutateAsync({ key: "prev", putData: i + 1 });
        }}
        key={i + 1}
        className={`${styles.pageNumber}`}
      >
        {i + 1}
      </Button>
    );
    buttonsArray.push(button);
  }

  return <>{buttonsArray}</>;
};
