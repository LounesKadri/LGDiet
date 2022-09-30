const { Dispo } = require('../models')


exports.getDietDispo = async (req,res) =>{
    try {
       const dietId = req.params.dietId
       const disponible = await Dispo.findAll({where : {DietId : dietId}})
       res.json(disponible)   
    } catch (err) {
        return res.status(500).json({msg : err.message})
    }
}


exports.addDispo = async (req,res) =>{
    try {
        const disponible = req.body
        const firstname = req.user.firstname
        disponible.firstname = firstname
        await Dispo.create(disponible)
        res.status(201).json(disponible)
    } catch (err) {
        return res.status(500).json({msg : err.message})
    }
}

