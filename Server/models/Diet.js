const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/ 

module.exports = (sequelize, DataTypes) => {
    const Diet = sequelize.define("Diet", {
        firstname : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        lastname : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        phone: {
           type: DataTypes.STRING,
           allowNull: false,
        },
      
        description : {
            type : DataTypes.STRING,
            allowNull : false,
        }
        
    })

    Diet.associate = (models) => {
        Diet.hasMany(models.Dispo, {
            onDelete : "cascade"
    })
}

    return Diet
}