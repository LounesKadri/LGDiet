import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../notification/notifications'

function EmailActivation() {

    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    const params = useParams()
    console.log(params)


    useEffect(() =>{
        try {
            axios.post('http://localhost:3001/lgdiet/activate', {activation_token:params.activation_token}).then((response)=>{
                setSuccess("Your account has been successfully activated")
                console.log(response.data)
            })
        } catch (err) {
           setErr("error while activating your account")
        }
       },[])
  return (
    <div className="active_page">
    {err && showErrMsg(err)}
    {success && showSuccessMsg(success)}
</div>
  )
}

export default EmailActivation