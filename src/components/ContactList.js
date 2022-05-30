import React, {useRef} from "react";
import ContactCard from "./ContactCard";

import { Link } from "react-router-dom/cjs/react-router-dom.min";


const ContactList = (props) => {
  console.log(props);
  const inputEl = useRef("");
  const deleteContactHandler = (id) =>{
    props.getContactId(id);
    console.log(id); 
  };
//    const contacts =[
//    {
//      id:"1",
//      "name":"Dipesh",
//      "email":"malvia@gamil.com",
//    },
//    {
//     id:"2",
//     "name":"Nikesh",
//     "email":"nicks@gamil.com",
//   }
//  ];
  const renderContactList =props.contacts.map((contact)=>{return(
    // <div className="item">
    //   <div className="content">
    //     <div className="header">{contact.name}</div>
    //     <div className="header">{contact.email}</div>
    //     <i className="trash alternate outline icon"></i>
    //   </div>
    // </div>
 
  
    <ContactCard 
    contact={contact} 
    clickHandler={deleteContactHandler} 
    key={contact.id}
    >

    </ContactCard>//passing the component from child to parent -> then parent to its parent{contactcard(id)-> contactlist(id)->app.js}
  );
});
const getSearchTerm = () => {
  props.searchKeyword(inputEl.current.value); // to get the value of what we are feeding in the search text box
};

    return (
      <div className="main">
        <h2>Contact List
          <Link to ="/add">
            <button className="ui button blue right floated">Add Contact</button>
          
          </Link>

        </h2>
        <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}//creating a reference to the input element
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm} //we can get the value by event.target.value
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
      {renderContactList.length > 0
          ? renderContactList
          : "No Contacts available"}
        </div>
      </div>

    )
};

export default ContactList;
