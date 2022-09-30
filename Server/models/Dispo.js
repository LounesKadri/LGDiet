
module.exports = (sequelize, DataTypes) => {
    const Dispo = sequelize.define("Dispo", {
        date : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    })
  
    Dispo.associate = (models) => {
        Dispo.hasMany(models.Rdv, {
            onDelete : "cascade"
        })
    }
    return Dispo
}