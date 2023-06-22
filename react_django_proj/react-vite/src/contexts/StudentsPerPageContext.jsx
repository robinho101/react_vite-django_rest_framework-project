import React, { useContext } from "react";

const StudentsPerPageContext = React.createContext();

export const UseStudentsPerPage = () => {
  return useContext(StudentsPerPageContext);
};

export const StudentsPerPageProvider = ({ children }) => {
  const [studentsPerPage, setStudentsPerPage] = React.useState(5);

  return (
    <StudentsPerPageContext.Provider
      value={{
        studentsPerPage,
        setStudentsPerPage,
      }}
    >
      {children}
    </StudentsPerPageContext.Provider>
  );
};
