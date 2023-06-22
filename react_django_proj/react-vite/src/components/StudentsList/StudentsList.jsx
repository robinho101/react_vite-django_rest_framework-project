import React from "react";
import { Table, Spinner, Alert } from "reactstrap";
import NextPrevCreateButtons from "../Buttons/NextPrevCreateButtons/NextPrevCreateButtons";
import { EditRemoveButtons } from "../Buttons/EditRemoveButtons/EditRemoveButtons";
import { StudentsPerPageButtons } from "../Buttons/StudentPerPageButtons/StudentPerPageButtons";
import styles from "./StudentsList.module.css";
import { getRequestToInMemoryDatabase } from "../../services/requests";
import { UseStudentsPerPage } from "../../contexts/StudentsPerPageContext";
import { UseStudentList } from "../../customHooks/UseStudentList";

let StudentsList = () => {
  // отправляем запрос для получения последней посещенной страницы таблицы, после перезагрузки(ctrl+r)
  const [page, setPage] = React.useState(() => {
    getRequestToInMemoryDatabase("page_number").then((data) => {
      setPage(data);
      return;
    });
  });

  // создаем стэйты для проброса в соответствующие компоненты.
  const [toggle, setToggle] = React.useState(false);
  const [createOrEdit, setCreateOrEdit] = React.useState(false);

  const { studentsPerPage } = UseStudentsPerPage();

  // получаем все данные об имеющихся студентах функцией fetchStudents - react_django_proj\react-vite\src\services\requests.js,
  // на бэке обрабатывается react_django_proj\students\views.py строчки 10-19
  const { data, isLoading, isSuccess, isError } = UseStudentList(
    page,
    studentsPerPage
  );

  return (
    <>
      {isSuccess ? (
        <div className={styles.studentsPerPageButtonsWrapper}>
          <Alert className={`${styles.numberOfStudents} nmbStd`} color="info">
            overall number of students: {data.count}
          </Alert>
          <StudentsPerPageButtons />
        </div>
      ) : (
        ""
      )}
      <Alert style={{ display: "none" }} className="createAlert" color="info">
        student added!
      </Alert>
      <Alert style={{ display: "none" }} className="editAlert" color="info">
        changing saved!
      </Alert>
      <Table dark>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Registration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isSuccess ? (
            data.results.map((student) => (
              <tr key={student.id} data-pk={student.id}>
                <td className={`${styles.td_font} studentData`}>
                  {student.name}
                </td>
                <td className={`${styles.td_font} studentData`}>
                  {student.email}
                </td>
                <td className={`${styles.td_font} studentData`}>
                  {student.phone}
                </td>
                <td className={`${styles.td_font} studentData`}>
                  {student.registrationDate}
                </td>
                <td className={styles.td_font}>
                  <EditRemoveButtons
                    toggle={toggle}
                    createOrEdit={createOrEdit}
                    setToggle={setToggle}
                    setCreateOrEdit={setCreateOrEdit}
                  />
                </td>
              </tr>
            ))
          ) : !data ? (
            <tr>
              <td colSpan="6" align="center">
                <b>students not found</b>
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </Table>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Alert color="danger">data is not found!!</Alert>
      ) : (
        ""
      )}

      <NextPrevCreateButtons
        setCreateOrEdit={setCreateOrEdit}
        setToggle={setToggle}
        setPage={setPage}
        page={page}
        toggle={toggle}
        createOrEdit={createOrEdit}
      />
    </>
  );
};

export default StudentsList;
