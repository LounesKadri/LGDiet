const { Dispo } = require('../models')


exports.ADD_DISPO_EXCEL = async (req,res) =>{
    try {
        const {date , DietId } = req.body
        const newDispo = new Dispo({
            date : date , DietId : DietId
        })
        await newDispo.save()
        res.json({msg : "La disponibilté a été ajouté avec succes !"})
    } catch (err) {
        return res.status(500).json({msg : err.message})
    }
}
