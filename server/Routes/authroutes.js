const Router = require('express');
const { signup, verifyotp, login } = require('../controllers/authcontroller');
const route = Router();

route.post("/signup", signup);
route.post("/otp-verification", verifyotp);
route.post("/login", login);


module.exports = route;