
import React from "react";
import user from "../images/user.png";
//import ContactList from "./ContactList";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ContactCard = (props) => {
  //const {clickHandler} =props.clickHandler;
  const { id, name, email } = props.contact;//destructuring of Contact list

  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link to = {{pathname:`/contact/${id}`, state:{contact : props.contact}}}>
        <div className="header">{name}</div>
        <div>{email}</div>
        </Link>
        {/* {console.log(id)} */}
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => props.clickHandler(id)}

      ></i>
            <Link to={{ pathname: `/edit`, state: { contact: props.contact } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
//https://the-trivia-api.com/