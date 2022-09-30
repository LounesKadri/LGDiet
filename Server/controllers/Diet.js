const { Diet } = require('../models')


exports.addDiet = async (req,res) => {
    const pratician = req.body
    await Diet.create(pratician)
    res.status(201).json(pratician)
}

exports.viewDiet = async (req,res) =>{
    const list = await Diet.findAll()
    res.json(list)
}


exports.getById = async (req,res) =>{
    const id = req.params.id
    const Dieteticien = await Diet.findByPk(id)
    res.json(Dieteticien)
  }