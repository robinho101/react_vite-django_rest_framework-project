import { Button } from "reactstrap";
import { UseMutationInMemory } from "../../../customHooks/UseMutationInMemory";
import styles from "./CreateNewButton.module.css";

let CreateNewButton = ({ setToggle, setCreateOrEdit }) => {
  const mutateToggle = UseMutationInMemory(setToggle);
  const mutateCreateOrEdit = UseMutationInMemory(setCreateOrEdit);

  let createNew = async () => {
    // делаем запрос через react_django_proj\react-vite\src\services\requests.js - строчки 45-51 в память, передавая ключ для инверсии булева значения -
    // чтобы открыть модальное окно - react_django_proj\react-vite\src\components\CreateEditStudentModal\CreateEditStudentModal.jsx
    // на бекэнде запрос обрабатывается в - react_django_proj\memory_db_only\views.py
    await mutateToggle.mutateAsync({ key: "toggle" });

    // то же самое, только с другим ключом и присваиваем именно строчку, чтобы в react_django_proj\react-vite\src\components\CreateEditForm\CreateEditForm.jsx,
    // в 18 строке была вызвана функция createStudent - react_django_proj\react-vite\src\services\requests.js - строчки 18-21
    await mutateCreateOrEdit.mutateAsync({
      key: "create_or_edit",
      putData: "create",
    });
  };

  return (
    <>
      <Button
        onClick={() => createNew()}
        className={`${styles.create_new_button} create_new`}
      >
        create new
      </Button>
    </>
  );
};

export default CreateNewButton;
