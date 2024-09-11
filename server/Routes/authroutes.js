const Router = require('express');
const { signup, verifyotp } = require('../controllers/authcontroller');
const route = Router();

route.post("/signup", signup);
route.post("/otp-verification", verifyotp);


module.exports = route;