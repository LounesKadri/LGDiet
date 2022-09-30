import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Diet from "./pages/Diet";
import {Link,NavLink} from 'react-router-dom'
import CreateDiet from './pages/CreateDiet';
import Register from './pages/auth/register';
import Login from './pages/auth/auth';
import EmailActivation  from './pages/auth/emailActivation'
import {AuthContext} from './helpers/AuthContext'
import Excel from './pages/excel'
import axios from 'axios';
import Profil from './pages/Profil';
import FacebookRegister from './pages/auth/FacebookRegister';

function App() {

const [authState, setAuthState] = useState({firstname : "",lastname : "",email :"", id : 0, role : 0, status : false})


useEffect(() =>{
  axios.get('http://localhost:3001/lgdiet/valideToken', {headers : {
    accesToken : localStorage.getItem("accesToken"),
  }}).then((response) =>{
    if(response.data.error) {
      setAuthState({...authState, status:false})
    }else{
      setAuthState({
      firstname : response.data.firstname,
      id : response.data.id, 
      role : response.data.role, 
      lastname : response.data.lastname,
      email : response.data.email,
      status : true})
    }
  })
}, [])


const logout = () =>{
  localStorage.removeItem("accesToken");
  setAuthState({firstname : "", id : 0, role : "", lastname : "", email : "", status:false})
}

return( 
<div className='App'>
  <AuthContext.Provider value={{authState, setAuthState}}>
    <BrowserRouter>
        <div className='navbar'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/"><strong>LG-DIET</strong></Link>
            {
              authState.role == 0 ? (
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ">
                <NavLink className="nav-item nav-link" to="/">Home</NavLink>
                
               
                { !authState.status ? (
                  <>
                  <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                  <NavLink className="nav-item nav-link" to="/auth">Login</NavLink>
                  </>
                ) : 
                (
                  <>
                  <NavLink className="nav-item nav-link" to="/profil"> My Profil</NavLink>
                  
                  <button type="button" class="btn btn-light" onClick={logout}>Logout</button>
                  </>
                )
                }
              </div>
            </div>
              ) : (
                <> 
                <NavLink className="nav-item nav-link" to="/">Home</NavLink>
                <NavLink className="nav-item nav-link" to="/excel">Add Dispo</NavLink>
                <NavLink className="nav-item nav-link" to="/pages/createDiet">Add Diet</NavLink>
          
                <button type="button" class="btn btn-light" onClick={logout}>Logout</button>
                </>
              )
            }
            
          </nav>      
        </div>
        <Routes>
          <Route path='/' element={<Home authState={authState}/>} />
          <Route path='/diet/:id' element={<Diet authState={authState}/>} />
          <Route path='/pages/createDiet' element={<CreateDiet/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/auth' element={<Login/>} />
          <Route path='/profil' element={<Profil/>} />
          <Route path='/excel' element={<Excel/>} />
          <Route path='/FacebookRegister' element={<FacebookRegister/>} />
          <Route path="/lgdiet/activate/:activation_token" element={<EmailActivation/>} exact />
      </Routes>
    </BrowserRouter>
  </AuthContext.Provider>  
</div>
  );
}

export default App;
