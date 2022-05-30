import React from "react";
import { v4 as uuidv4 } from 'uuid';

// class component render method is used to return in the class to return the component
class AddContact extends React.Component {
 
  //as it is a class we use state variable to make changes in the state rather than a hooks as we saw in the functional component
  //State Variable
  state ={
    name: "",
    email:""
  }
add = (e)=>{
  
  e.preventDefault();//as we are working on button and we donot want the page to get refreshed 
  if(this.state.name === "" || this.state.email===""){
    alert("all the fields are mandatory");
    return
  }

    let res = this.state;
    let details={...res, id:uuidv4()};
    console.log(details);

   
  this.props.addContactHandler(details);  //we can pass on the state over here as our state contains the details of name and email id
  this.setState({name:"", email:"",id:"" });
  console.log(this.state);
  this.props.history.push("/"); //to get back to the home page
}



  render() {
    return (
      <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={this.add}>
        <div className="field">
          <label>Name</label>
          <input
           type="text" 
           name="name" 
           placeholder="Name" 
           value={this.state.name}
           onChange={(e)=> this.setState({name:e.target.value})}/>

        </div>
        <div className="field">
          <label>Email</label>
          <input 
          type="email" 
          name="email" 
          placeholder="Email"
          value={this.state.email}
          onChange={(e)=> this.setState({email:e.target.value})}/>
          

        </div>
        <button type="submit" className="ui button blue" >Add</button>

      </form>


      </div>

    );
  }
}

export default AddContact;
