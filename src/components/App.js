import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import api from "../api/contacts";
//import AddContact2 from "./AddContact2";
//import {uuid} from "uuidv4";
import { v4 as uuidv4 } from 'uuid';
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
//functional components can have react hooks for eg useState and useEffects
//whenever the actually changes the useeffect help us to render the component again
const [contacts , setContacts] = useState([]);
//at intial contacts would be an empty array

//local storage key
const LOCAL_STORAGE_KEY = "contacts";



//   //list
//  const contacts =[
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

//state variables for search option
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);


//Retrive Contacts
const retrieveContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
};
  const addContactHandler=async(contact)=>{

    setContacts({...contact,id: uuidv4()});
    console.log(contact);
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    console.log(response);

    setContacts([...contacts, response.data]);//contacts for the old one, contact for the new addition
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };
  //for filter and searching

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };
  useEffect(()=>{
    // const retriveContacts =JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async() => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    }
     getAllContacts();
  },[]);


  useEffect(()=>{
   // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));

  },[contacts]);

  return (
    <div className="ui container">
     <Router>
     <Header />
     <Switch>
      {/* <AddContact  addContactHandler={addContactHandler}/> */}
      <Route 
      path="/add" 
      // component={()=><AddContact
      //  addContactHandler={addContactHandler}/>}
      render={(props)=>(<AddContact
      {...props}
      addContactHandler={addContactHandler}/>)}
      />
      {/* <ContactList contacts={contacts}   getContactId={removeContactHandler}/> */}
      <Route 
      path="/" 
      exact 
     render={(props)=>(<ContactList 
      {...props}
      contacts={searchTerm.length < 1 ? contacts : searchResults}
   
      getContactId={removeContactHandler}
      term={searchTerm}
      searchKeyword={searchHandler}
      />
      )}
      /> 
      <Route  path="/contact/:id" component={ContactDetail}/>
      <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
     </Switch>


     </Router>
      
     

    </div>
  );
}

export default App;
