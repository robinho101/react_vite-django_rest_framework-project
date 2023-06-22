import React from "react";
import { Button } from "reactstrap";
import CreateNewButton from "../CreateNewButton/CreateNewButton";
import { PageNumberButtons } from "../PageNumberButtons/PageNumberButtons";
import { CreateEditStudentModal } from "../../CreateEditStudentModal/CreateEditStudentModal";
import { UseMutationInMemory } from "../../../customHooks/UseMutationInMemory";
import styles from "./NextPrevButtons.module.css";

let NextPrevButtons = ({
  setPage,
  page,
  setToggle,
  setCreateOrEdit,
  toggle,
  createOrEdit,
}) => {
  const mutatePrevOrNext = UseMutationInMemory(setPage);

  return (
    <div className={styles.next_prev_buttons_wrapper}>
      <Button
        onClick={async (e) => {
          // отправляем запрос в памянь функцией putRequestToInMemoryDatabase - react_django_proj\react-vite\src\services\requests.js, строчки 45-51
          // для изменения страницы на -1
          // на бекэнде обрабатывается - react_django_proj\memory_db_only\views.py, строчка 83 и строчки 16-23
          mutatePrevOrNext.mutateAsync({ key: "prev" });
        }}
        className={`${styles.next_prev_buttons} ${styles.prev} prev`}
      >
        previous
      </Button>
      <PageNumberButtons setPage={setPage} />
      <Button
        onClick={async (e) => {
          // по аналогии с вышеописанным
          mutatePrevOrNext.mutateAsync({ key: "next" });
        }}
        className={`${styles.next_prev_buttons} ${styles.next} next`}
      >
        next
      </Button>

      <CreateNewButton
        setCreateOrEdit={setCreateOrEdit}
        setToggle={setToggle}
      />
      <CreateEditStudentModal
        page={page}
        setToggle={setToggle}
        createOrEdit={createOrEdit}
        toggle={toggle}
      />
    </div>
  );
};

export default NextPrevButtons;
