import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateDiet() {
  
  const navigate = useNavigate()
  const initialValues = 
  {
    firstname : "",
    lastname : "",
    email : "",
    phone : "",
    description : ""
  }  
  
  const onSubmit = (data) =>{
    axios.post('http://localhost:3001/lgdiet/addDiet', data).then((response)=>{
     navigate("/")
    }) 
  }

  const validationSchema = Yup.object().shape({
    firstname : Yup.string().required() ,
    lastname : Yup.string().required(),
    email :Yup.string().email().required(),
    phone : Yup.number().required(),
    description :Yup.string().required()
  })

  return (
    <div className='container'>
        <div className='titre'>ADD Dietitian</div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
            <div className='row'>
                <div className="form-group col-xs-12 col-sm-6 col-md-6">
                    <Field autocomplete="off" id="firstname" placeholder=" Dietetician firstname" name="firstname" className="form-control" type="text" />
                    <ErrorMessage name="firstname" component="span" />
                </div>

                <div className="form-group col-xs-12 col-sm-6 col-md-6">
                    <Field autocomplete="off" id="lastname" placeholder=" Dietetician lastname" name="lastname" className="form-control" type="text" />
                    <ErrorMessage name="lastname" component="span" />
                </div>

                <div className="form-group col-xs-12 col-sm-6 col-md-6">
                    <Field autocomplete="off" id="email" placeholder=" Dietetician email" name="email" className="form-control" type="email" />
                    <ErrorMessage name="email" component="span" />
                </div>

                <div className="form-group col-xs-12 col-sm-6 col-md-6">
                    <Field autocomplete="off" id="phone" placeholder=" Dietetician phone" name="phone" className="form-control" type="tel" />
                    <ErrorMessage name="phone" component="span" />
                </div>

                <div className="form-group col-xs-12 col-sm-12 col-md-12">
                    <Field autocomplete="off" id="lastname" placeholder=" Dietetician description" name="description" className="form-control" type="text" />
                    <ErrorMessage name="description" component="span" />
                </div>

                <div className="form-group col-xs-12 col-sm-12 col-md-12">
                    <button type="submit" className="btn btn-primary">Add Diet</button>
                </div>
            </div>        
        </Form>
        </Formik>
    </div>
  )
}

export default CreateDiet