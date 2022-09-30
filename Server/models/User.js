module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
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
        password : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        role : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        }
    })
    
    Users.associate = (models) => {
        Users.hasMany(models.Rdv, {
            onDelete : "cascade"
        })
    }

    return Users
}