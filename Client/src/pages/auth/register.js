import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../notification/notifications'
import { isEmpty, isEmail, isLength } from '../utils/validations'
import FacebookLogin from 'react-facebook-login';

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    err: '',
    success: ''
}

function Register() {
   
   const navigate = useNavigate()
    const [user, setUser] = useState(initialState)
   

    const {firstname,lastname, email, password, err, success} = user
    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value , err : '', success : ''})
    }
    
    const handleSubmit = async (e) =>{
       e.preventDefault()
       
       if(isEmpty(firstname) || isEmpty(lastname) || isEmpty(password))
            return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})

       try {
          const res = await axios.post('http://localhost:3001/lgdiet/register',{
              firstname, lastname, email, password
          })
          setUser({...user, err : '', success : res.data.msg})
       } catch (err) {
           err.response.data.msg && setUser({...user, err : err.response.data.msg, success : ''})
       }
    }

    const responseFacebook = async (response) => {
        const firstname = response.name
        const lastname = response.name
        const email = response.email
        const password = "0"
  
        const data = {firstname : firstname, lastname : lastname, email : email, password : password}
        axios.post('http://localhost:3001/lgdiet/insertFb', data).then((response)=>{
            if(response.data.error) return console.log("erreur");
            localStorage.setItem("email", email)
            navigate('/FacebookRegister')
          });
    }
    

    return (
        <div className="login_page">
            <h2>Register</h2>
            
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" placeholder="Enter your firstname" id="firstname"
                     name="firstname" value={firstname} onChange={handleChangeInput} />
                </div>
        
                <div>
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" placeholder="Enter your lastname" id="lastname"
                     name="lastname" value={lastname} onChange={handleChangeInput} />
                </div>        
                 
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter your email address" id="email"
                     name="email" value={email} onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password" 
                    name='password' value={password} onChange={handleChangeInput} />
                </div>


                <div className="row">
                    <button type="submit">Register</button>
                </div>
            </form>

            <div className="hr">Or Create With</div>
 
            <div className="social">
               
               <FacebookLogin
               appId="3106076556298616"
               autoLoad={false}
               fields="name,email,picture"
               textButton = "Create with Facebook"
               callback={responseFacebook} 
               />

           </div>
            
            <p>Already an account? <Link to="/auth">Login</Link></p>
        </div>
    )
}

export default Register
