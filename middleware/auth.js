const jwt = require('jsonwebtoken');
const secret = require('./jwtSecret');

function authenticate(req,res,next){
    // return next();
    try{
    const token = req.headers.auth;
    console.log(token)
    if(!token)res.redirect("/user/login")
    // console.log(token);
  
    const verified = jwt.verify(token,secret);
    console.log(verified)
    if(verified){req.auth = verified;return next()}

    res.redirect("/user/login")
  }catch(err){
    res.redirect("/user/login")
  }
}



module.exports = authenticate