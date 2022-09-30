const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const db = require('./models')
const routes = require('./routes/Routes')


app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())


app.use('/lgdiet', routes)



db.sequelize.sync().then((req) =>{
    app.listen(3001, () => {
        console.log("server running on port 3001")
    });  
});
