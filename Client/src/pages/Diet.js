import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import {showErrMsg, showSuccessMsg} from './notification/notifications'

export default function Diet({authState}) {

  let { id } = useParams()
  const [dietObject, setDietObject] = useState({})
  const [dispo, setDispo] = useState([])
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
 
  
  useEffect(() =>{
    axios.get(`http://localhost:3001/lgdiet/getDietBy/${id}`).then((response)=>{
    setDietObject(response.data)
    })
 
    axios.get(`http://localhost:3001/lgdiet/dispo/${id}`).then((response)=>{
     setDispo(response.data)
    }) 

  },[])



const prendreRdv = (index) =>{
 
  const UserId = authState.id
  const DispoId = dispo[index].id
   
  const res = axios.post('http://localhost:3001/lgdiet/addRdv', {
    UserId, DispoId
  },
  {
    headers : {
      accesToken : localStorage.getItem("accesToken"),
    },
  }).then((res)=>{
    if(res.data.msg=="This Rdv already exists........"){
      setErr(res.data.msg)
    }else{
      setSuccess('the appointment has been saved successfully') 
    }
       
  })
}


  return (
    <div className='mere'>
     {err && showErrMsg(err)}
     {success && showSuccessMsg(success)}
    <div className='col-md-4'>
      <h2 className='h2rdv'>make an appointment :</h2>
      <br/><br/>
      <table className='table'>
        <thead>
          <tr>
            <th scope="col">ID Disponibilités and more Informations </th>
          </tr>
        </thead>
        <tbody>
        {dispo.map((value, index) =>{
          return(
          <div key={dispo.id+'-'+index}>
            <tr>
              <td> {value.id}</td>
              <td> {value.date} {<button type="button" class="btnRdv" onClick={()=>prendreRdv(index)}>Take</button>}</td>
            </tr>
          </div>
          )
        })}
        </tbody>
        
     </table> 
    </div>
    </div>
  )
}
