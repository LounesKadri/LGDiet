import React, {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg} from '../notification/notifications'
import { AuthContext } from '../../helpers/AuthContext'


function Auth () {
    const navigate = useNavigate()
    const [err, setErr] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext)

    const login = () =>{
        const data = {email : email, password : password}
        axios.post('http://localhost:3001/lgdiet/login', data).then((response)=>{
        if(response.data.error) return setErr("Incorrect Email or password");
        setErr("")
        localStorage.setItem("accesToken", response.data.token)
        setAuthState({firstname : response.data.firstname, id : response.data.id, role : response.data.role, status : true})
        navigate("/")
      });
    }
    
   

  return (
    
    <div className='login_page'>
        <h2>Login</h2>
        {err && showErrMsg(err)}
        <div>
            <label htmlFor="email">Email Address</label>
            <input type="text" placeholder="Enter email address" onChange={(event) =>{
              setEmail(event.target.value)
            }}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter password" onChange={(event) =>{
              setPassword(event.target.value)
            }}/>
        </div>
        <div className='row'>
          <button onClick={login}>Login</button>
        </div>
      <p>New Customer? <Link to="/register">Register</Link></p>
    </div>
  )
}

export default Auth