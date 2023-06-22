import { Button, Badge } from "reactstrap";
import { UseStudentsPerPage } from "../../../contexts/StudentsPerPageContext";
import styles from "./StudentsPerPageButtons.module.css";

// компонент со значениями количесва студентов на одной странице. меняем state, значение которого используем в других компонентах
export const StudentsPerPageButtons = () => {
  const { setStudentsPerPage } = UseStudentsPerPage();

  const setBackground = (e) => {
    document.querySelectorAll(".studentsPerPage").forEach((elem) => {
      elem.style.backgroundColor = "#38dadc";
    });
    e.target.style.backgroundColor = "teal";
  };

  const onClickHandler = (eTarget, studentsPerPage) => {
    setBackground(eTarget);
    setStudentsPerPage(
      (prevStudentsPerPage) => (prevStudentsPerPage = studentsPerPage)
    );
  };

  const nums = [1, 3, 5, 10];
  const buttonsArray = [];

  for (let num of nums) {
    let button = (
      <Button
        key={num}
        onClick={(e) => {
          onClickHandler(e, num);
        }}
        className={`${styles.students_per_page} studentsPerPage`}
      >
        {num}
      </Button>
    );
    buttonsArray.push(button);
  }

  return (
    <>
      <Badge style={{ fontSize: "14px", marginRight: "5px" }} color="primary">
        students per one page{" "}
        <i className={`${styles.arrow} ${styles.right}`}></i>
      </Badge>
      {buttonsArray}
    </>
  );
};
