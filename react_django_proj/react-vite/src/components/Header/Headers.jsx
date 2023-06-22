import React from "react";
import react_django from "../../assets/react_django.png";

let Header = () => {
  return (
    <div className="text-center">
      <img
        src={react_django}
        alt=""
        className="img-thumbnail"
        style={{ marginTop: "20px" }}
      />
      <hr />
    </div>
  );
};

export default Header;
