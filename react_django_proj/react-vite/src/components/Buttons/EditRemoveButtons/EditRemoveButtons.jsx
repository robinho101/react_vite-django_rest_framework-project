import { Button } from "reactstrap";
import { UseMutationInMemory } from "../../../customHooks/UseMutationInMemory";
import { UseDeleteStudent } from "../../../customHooks/UseDeleteStudent";
import styles from "./EditRemoveButtons.module.css";

export let studentPk;
export let EditRemoveButtons = ({ setToggle, setCreateOrEdit }) => {
  const mutateToggle = UseMutationInMemory(setToggle);
  const mutateCreateOrEdit = UseMutationInMemory(setCreateOrEdit);

  let editHandler = async (e) => {
    e.preventDefault();

    // делаем то же самое что и в - react_django_proj\react-vite\src\components\Buttons\CreateNewButton\CreateNewButton.jsx,
    // только во второй функции ключ edit
    await mutateToggle.mutateAsync({ key: "toggle" });
    await mutateCreateOrEdit.mutateAsync({
      key: "create_or_edit",
      putData: "edit",
    });

    // в данном случае редактируем данные, поэтому предваритено заполним строчки формы, текущими значениями слева от кликнутой кнопки edit
    studentPk = e.target.parentNode.parentNode.dataset.pk;
    let editInputs = document.querySelectorAll(".form-control");
    let editStudentData =
      e.target.parentNode.parentNode.querySelectorAll(".studentData");
    document.querySelector(".modal-title").textContent = "Edit Student";
    editInputs[0].value = editStudentData[0].textContent;
    editInputs[1].value = editStudentData[1].textContent;
    editInputs[2].value = editStudentData[2].textContent;
  };

  // функция запроса на удаление deleteStudent - react_django_proj\react-vite\src\services\requests.js строчки 31-37
  // на бекэнде запрос обрабатывается в - react_django_proj\students\views.py строчки с 30-й
  const mutateDeleteStudent = UseDeleteStudent();

  let removeHandler = async (e) => {
    let studentPk = e.target.parentNode.parentNode.dataset.pk;
    localStorage.setItem("deletedElem", studentPk);
    mutateDeleteStudent.mutateAsync({ studentPk });
  };

  return (
    <>
      <Button onClick={editHandler} className={`${styles.edit} editRemove`}>
        edit
      </Button>{" "}
      <Button onClick={removeHandler} className={`${styles.remove} editRemove`}>
        remove
      </Button>
    </>
  );
};
