import React , {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';


const AddContact2 = ({addContactHandler}) => {
    const [data , setData]= useState({
        name:'',
        email:''
    })

    const SubmitHandler = (e)=>{
      e.preventDefault();
      console.log(data);
      const detail = {...data , id:uuidv4()};
      console.log(detail);
    }


  return (
    <div className="ui main">
    <h2>Add Contact</h2>
    <form className="ui form" onSubmit={addContactHandler}>
      <div className="field">
        <label>Name</label>
        <input
         type="text" 
         name="name" 
         placeholder="Name" 
         value={data.name}
         onChange={(e)=> setData({name:e.target.value, email:data.email})}/>

      </div>
      <div className="field">
        <label>Email</label>
        <input 
        type="email" 
        name="email" 
        placeholder="Email"
        value={data.email}
        onChange={(e)=> setData({email:e.target.value , name:data.name})}/>
        

      </div>
      <button type="submit" className="ui button blue" >Add</button>

    </form>


    </div>
  )
}

export default AddContact2