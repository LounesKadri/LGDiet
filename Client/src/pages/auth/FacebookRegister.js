import React , {useState} from 'react'
import axios from 'axios'
//import {useNavigate} from "react-router-dom"
import {showSuccessMsg} from '../notification/notifications'

function FacebookRegister() {

  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  const [newPassword, setNewPassword] = useState("");
  const email = localStorage.getItem("email");

  //const navigate = useNavigate()
  const updatePasswordFb = () => {
    axios.put('http://localhost:3001/lgdiet/updateFb', {email : email, newPassword : newPassword}).then((response)=>{
      localStorage.removeItem("email");
      setSuccess("Your account has been successfully created")
    })
  }
  
  return (
    <div className='login_page'>
       {success && showSuccessMsg(success)}
      <h2>Create Your Password  </h2>

      <input type="text" placeholder='Email...' value={email} />

      <input type="password" placeholder='New password ...' onChange={(event) => {setNewPassword(event.target.value)}} />
      <div className="row">
        <button type="submit" onClick={updatePasswordFb}>Create</button>
      </div>
     
    </div>
  )
}

export default FacebookRegister