const { Users } = require('../models')
const sendMail = require('../controllers/SendEmail');
const jwt = require('jsonwebtoken');
const {sign} = require('jsonwebtoken')
require('dotenv').config('../.env');
const bcrypt= require('bcrypt');

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn : '50m'})
}


exports.registration = async (req,res) => {
    try{
        const {firstname, lastname, email, password} = req.body

        if(!firstname || !lastname || !email || !password){
            return res.status(400).json({msg : "Please fill in all fields."})
        }

        if(!validateEmail(email)){
            return res.status(400).json({msg : "Invalid emails."})
        }
         
        const user = await Users.findOne({where : {email : email}});
        if(user) { return res.status(400).json({msg : "This email already exists.."})};
        
        if(password.length< 6){
            return res.status(400).json({msg : "Password must be at least 6 charateres"})
        }
        
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = {
            firstname, lastname, email, password : passwordHash
        }
        
        const activation_token = createActivationToken(newUser)
        console.log({activation_token})
        const url = `http://localhost:3000/lgdiet/activate/${activation_token}`
        sendMail(email, url, "Verify your email address")        

        res.json({msg : "Register Success ! Please activate your email to start"})
    } catch (err){
        return res.status(500).json({msg : err.message})
    }
}

exports.activationEmail = async (req,res) => {
    try{
        const {activation_token} = req.body
        const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
        
      const {firstname, lastname, email, password} = user

      const check = await Users.findOne({where : {email : email}})
      if(check) return res.status(400).json({msg : "This email already exists"})

      const newUser = new Users({
        firstname, lastname, email, password
      })

      await newUser.save()
      res.json({msg : "Accound has been activated !"})

    }catch(err){
        return res.status(500).json({msg : err.message})
    }
}


exports.login = async (req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await Users.findOne({where : {email : email}});
     
        if(!user) return res.json({error : "Incorrect Password or Email"});
     
        bcrypt.compare(password, user.password).then((Match)=>{
            if(!Match) return res.json({error : "Incorrect Password or Email "})

            const accesToken = sign({firstname : user.firstname, id : user.id, role : user.role, lastname : user.lastname, email : user.email}, "importantsecret")

            
            res.json({token : accesToken, firstname : user.firstname, id : user.id, role : user.role})
        })

    } catch (err) {
        return res.status(500).json({msg : err.message})
    }
}


exports.valideToken = async (req,res) =>{
    try {
        res.json(req.user)
    } catch (err) {
        return res.status(500).json({msg : err.message})
    }
}

exports.update = async (req,res) =>{

    const {oldPassword, newPassword } = req.body
    const user = await Users.findOne({where : {id : req.user.id}});

    bcrypt.compare(oldPassword, user.password).then(
        async (match) => {
        bcrypt.hash(newPassword, 10).then((hash) =>{
            Users.update({password : hash}, {where : {id : req.user.id}})
            res.json({msg : "update success"})
        })
    })
}


exports.insertFbUser = async (req,res) => {
    try {
        const {firstname, lastname, email, password} = req.body
        const user = await Users.findOne({where : {email : email}});
        if(user) { return res.status(400).json({msg : "This email already exists.."})};

        const newUser =  new Users({
            firstname, lastname, email, password
        })

        await newUser.save();
        res.json({msg : "success"})

    } catch (err) {
        return res.status(500).json({msg : err.message})
    }
}


exports.updateFb = async (req,res) =>{

    const {email, newPassword } = req.body
    const user = await Users.findOne({where : {email : email}});
    
    bcrypt.hash(newPassword, 10).then((hash) =>{
        Users.update({password : hash}, {where : {email : user.email}})
        res.json({msg : "update success"})
    })


}
