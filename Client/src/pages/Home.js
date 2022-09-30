import axios from "axios"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import Img1 from '../img/diet.jpg'

function Home ({authState}) {
  const [listOfDiet, setlistOfDiet] = useState([])
  const navigate = useNavigate()
  const connected = localStorage.getItem("accesToken")
  useEffect(()=>
  {
    axios.get('http://localhost:3001/lgdiet/viewDiet').then((response)=>{
      setlistOfDiet(response.data)
      }) 
      console.log(connected)
    }, [])


  return (
    <div className="home">  
      {listOfDiet.map((value, key)=>{
      return (
          <div className='card'>
              <span className='title'>{value.firstname} {value.lastname}</span>  
                <img src={Img1} className='img'/>
                <p className='description'>{value.description}</p>
                <button className='cardButton' onClick={() => {
                  if(connected){
                  navigate(`/diet/${value.id}`)
                  }else{
                    navigate(`/auth`)
                  }
                  }}>More details</button>
          </div>
          )
     })}
    </div>
  )
}  

export default Home;