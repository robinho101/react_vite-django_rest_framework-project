import { BASE_API_URL } from "../constants/index.js";
import { INMEMORY_DB_URL } from "../constants/index.js";
import axios from "axios";

// запрос инфы о всех студентах
// бэк запроса - react_django_proj\students\views.py, строчки 10-19
export async function fetchStudents(page = 1, studentsPerPage) {
  const { data } = await axios.get(
    `${BASE_API_URL}?format=json&page=${page}&amount=${studentsPerPage}`
  );

  document.querySelector(".prev").disabled =
    data.previous === null ? true : false;
  document.querySelector(".next").disabled = data.next === null ? true : false;
  localStorage.setItem("numberOfStudents", data.count);
  localStorage.setItem("page", page);
  return data;
}

// запрос добавления студента
// бэк запроса - react_django_proj\students\views.py, строчки 21-27
export async function createStudent(student) {
  const response = await axios.post(BASE_API_URL, student.student);
  return response;
}

// запрос редоктирования студента
// бэк запроса - react_django_proj\students\views.py, строчки 30-44
export async function editStudent(student) {
  const response = await axios.put(
    `${BASE_API_URL}edit_or_delete/${student.studentPk}/`,
    student.student
  );
  return response;
}

// запрос добавления студента
// бэк запроса - react_django_proj\students\views.py, строчки 30-37 и 46-48
export async function deleteStudent(student) {
  const response = await axios.delete(
    `${BASE_API_URL}edit_or_delete/${student.studentPk}/`,
    student.student
  );
  return response;
}

// запрос получения различной инфы из оперативки - (номер страницы,
// название функции при отправке этой формы - (react_django_proj\react-vite\src\components\CreateEditForm\CreateEditForm.jsx)
// булево значение для закрытия/открытия модального окна - (react_django_proj\react-vite\src\components\CreateEditStudentModal\CreateEditStudentModal.jsx)
// бэк запроса - react_django_proj\memory_db_only\views.py, строчки 64-75
export async function getRequestToInMemoryDatabase(key) {
  const { data } = await axios.get(`${INMEMORY_DB_URL}${key}/?format=json`);

  return data;
}

// то же что и выше в (getRequestToInMemoryDatabase), только это запрос для добавления различной инфы в память
// бэк запроса - react_django_proj\memory_db_only\views.py, строчка 83 и в зависимости от ключа(key) строчки 8-61
export async function putRequestToInMemoryDatabase({ key, putData = "" }) {
  const { data, status } = await axios.put(`${INMEMORY_DB_URL}${key}/`, {
    putData,
  });

  return data;
}
