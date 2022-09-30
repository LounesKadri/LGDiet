import React , {useEffect, useState} from 'react'
import axios from 'axios'
import Img2 from '../img/img4.jpg' 
import {showErrMsg, showSuccessMsg} from './notification/notifications'

function Profil() {

  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [authState, setAuthState] = useState({firstname : "",lastname : "",email :"", id : 0, role : 0, status : false})

useEffect(() =>{
  axios.get('http://localhost:3001/lgdiet/valideToken', {headers : {
    accesToken : localStorage.getItem("accesToken")
  }}).then((response) =>{
    if(response.data.error) {
      setAuthState({...authState, status:false})
    }else {
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

const update = () => {
  axios.put('http://localhost:3001/lgdiet/update', {oldPassword : oldPassword, newPassword : newPassword}, 
  {
    headers : {
      accesToken : localStorage.getItem("accesToken"),
    },
  }
  ).then((response) =>{
     if(response.data.error) {
       setErr("password change error ")
     }else{
      setSuccess("Password successfully changed")
     }
  })
}

  return (
  <div>
    <br/><br/><br/><br/>
    <div className='card'>
      <span className='title'>{authState.firstname}</span> 
      <img src={Img2} className='img'/>
      <p className='description'>Email : {authState.email}</p>
    </div>
    <div className='login_page_bis'>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <h2>Update informations </h2>
      <input type="password" placeholder='Old password ...' onChange={(event) => {setOldPassword(event.target.value)}} />
      <input type="password" placeholder='New password ...' onChange={(event) => {setNewPassword(event.target.value)}} />
      <div className="row">
        <button type="submit" onClick={update}>Update</button>
      </div>
     
    </div>
  </div>  
    
  )
}

export default Profil