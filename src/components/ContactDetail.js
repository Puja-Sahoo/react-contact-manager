
import React from "react";
import user from "../images/user.jpg";
//import ContactList from "./ContactList";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ContactDetail = (props) => {
const {name, email}= props.location.state.contact;
  return (
      <div className="main">
          <div className="ui card centered">
              <div className="image">
                  <img src={user} alt="user"/>
                </div>
                <div className="content">
                    <div className="header"> {name}</div>
                    <div className="descrption">{email}</div>

                </div>

          </div>
          <div className="center-div"><center>
              <Link to="/">
              <button className="ui button blue center">back to contact list</button>
              </Link>
              </center>
          </div>

      </div>

  );
};

export default ContactDetail;
//https://the-trivia-api.com/