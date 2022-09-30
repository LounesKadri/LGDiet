const router = require('express').Router()
const diet = require('../controllers/Diet')
const User = require('../controllers/Users')
const Dispo = require('../controllers/Dispo')
const Rdv = require('../controllers/Rdv')
const Excel = require('../controllers/excel')
const auth = require('../middlewares/auth')



// User rootes

router.post('/register', User.registration)
router.post('/activate', User.activationEmail)
router.post('/login', User.login)
router.post('/insertFb', User.insertFbUser)
router.put('/updateFb', User.updateFb)

router.get('/valideToken', auth ,User.valideToken)
router.put('/update',auth, User.update)

// Excel

router.post('/addExcelDispo', Excel.ADD_DISPO_EXCEL)

// Dieteticien rootes

router.post('/addDiet', diet.addDiet)
router.get('/viewDiet', diet.viewDiet)
router.get('/getDietBy/:id',diet.getById)


// Dispo rootes


router.get('/dispo/:dietId', Dispo.getDietDispo)
router.post('/addDispo', auth, Dispo.addDispo)

// Rdv rootes

router.post('/addRdv', Rdv.addRdv)


module.exports = router