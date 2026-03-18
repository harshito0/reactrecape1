import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
  import 'bootstrap/dist/css/bootstrap.min.css';
function Login({loginData}) {

  const[email,setEmail]=useState();
  const[password,setPassword]=useState()
    const navigate=useNavigate();
   function verification(e){
    e.preventDefault();
    //alert(email+password);
    //console.log(loginData)
    if(loginData.email===email){
      
      if(loginData.password===password){
        navigate('/dashboard');
             
      }else{
        alert("Password could not match");
      }


    }else{
      alert("Email is not registered")
    }


   }

  return (
    <div>

        <h2 style={{backgroundColor:'brown',color:'white'}}>Login Form</h2>

<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" onChange={(e)=>setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" onChange={(e)=>setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" />
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" onClick={verification} class="btn btn-primary">Login</button>
</form>
    </div>
  )
}

export default Login