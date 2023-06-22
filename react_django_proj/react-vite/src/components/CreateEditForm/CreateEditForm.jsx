import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { studentPk } from "../Buttons/EditRemoveButtons/EditRemoveButtons";
import { UseStudentsPerPage } from "../../contexts/StudentsPerPageContext";
import { UseCreateOrEditForm } from "../../customHooks/UseCreateOrEditForm";

export const CreateEditForm = ({ createOrEdit, page }) => {
  const { studentsPerPage } = UseStudentsPerPage();
  const mutateCreateOrEdit = UseCreateOrEditForm(
    createOrEdit,
    studentsPerPage,
    page
  );

  let student = {};

  let formHandler = async (e) => {
    e.preventDefault();
    let studentIputs = document.querySelectorAll(".form-control");
    student.name = studentIputs[0].value;
    student.email = studentIputs[1].value;
    student.phone = studentIputs[2].value;

    // функция запроса, которая определилась по клику либо на этом компоненте - react_django_proj\react-vite\src\components\Buttons\CreateNewButton\CreateNewButton.jsx
    // либо в - react_django_proj\react-vite\src\components\Buttons\EditRemoveButtons\EditRemoveButtons.jsx - строчка 40
    await mutateCreateOrEdit.mutateAsync({ student, studentPk });
    document.querySelector("._close_1sv24_1").click();
  };

  return (
    <Form onSubmit={formHandler}>
      <FormGroup>
        <Label for="name">Name:</Label>
        <Input type="text" name="name" />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input type="email" name="email" />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone:</Label>
        <Input type="text" name="phone" />
      </FormGroup>
      <Button>Send</Button>
    </Form>
  );
};
