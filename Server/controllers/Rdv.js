const {Rdv} = require('../models')


exports.addRdv = async(req,res) =>{
    try 
    {
        const {DispoId , UserId} = req.body
        console.log(req.body)

        const my_rdv = await Rdv.findOne({where : {DispoId : DispoId}});
        if(my_rdv) { return res.json({msg : "This Rdv already exists........"})}
        else{
            const newRdv = new Rdv({
            DispoId : DispoId , UserId : UserId
        })
        await newRdv.save()
        res.json({msg : "Rendez-vous enregistré avec succes !"})
    }
    } catch (err) {
        return res.status(500).json({msg : "This Rdv already exists.."})
    }
    
}