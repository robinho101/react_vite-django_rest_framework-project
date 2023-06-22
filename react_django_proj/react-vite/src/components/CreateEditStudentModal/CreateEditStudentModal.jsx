import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { CreateEditForm } from "../CreateEditForm/CreateEditForm";
import { UseMutationInMemory } from "../../customHooks/UseMutationInMemory";
import styles from "./CreateEditStudentModal.module.css";

export const CreateEditStudentModal = ({
  setToggle,
  toggle,
  createOrEdit,
  page,
}) => {
  const mutateToggle = UseMutationInMemory(setToggle);

  return (
    <>
      <Modal isOpen={!!toggle}>
        <Button
          onClick={async () => {
            // отправляем запрос для инверсии булева значения, чтобы закрыть модальное окно функцией putRequestToInMemoryDatabase -
            // react_django_proj\react-vite\src\services\requests.js, строчки 45-51
            // на бэке обрабатывается react_django_proj\memory_db_only\views.py, строчка 83 и строчки 37-45
            mutateToggle.mutateAsync({ key: "toggle" });
          }}
          className={styles.close}
        >
          X
        </Button>
        <ModalHeader>Creating New Student</ModalHeader>
        <ModalBody>
          <CreateEditForm page={page} createOrEdit={createOrEdit} />
        </ModalBody>
      </Modal>
    </>
  );
};
