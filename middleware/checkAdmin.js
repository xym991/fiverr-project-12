module.exports = function check(req,res,next){
    if(!req.auth.admin)return res.send({error:"no admin privilages on this account"});
    else next();
}