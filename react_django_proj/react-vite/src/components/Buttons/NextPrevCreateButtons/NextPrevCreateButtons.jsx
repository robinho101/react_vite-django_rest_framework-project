import NextPrevButtons from "../NextPrevButtons/NextPrevButtons";

let NextPrevCreateButtons = ({
  setPage,
  page,
  setToggle,
  setCreateOrEdit,
  toggle,
  createOrEdit,
}) => {
  return (
    <NextPrevButtons
      setCreateOrEdit={setCreateOrEdit}
      setToggle={setToggle}
      setPage={setPage}
      page={page}
      toggle={toggle}
      createOrEdit={createOrEdit}
    />
  );
};

export default NextPrevCreateButtons;
