const jwt = require('jsonwebtoken');
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

function middleware(req, res, next){
    const token = req.headers.token;
    console.log(req.headers.token);
    const verified = jwt.verify(token, JWT_ADMIN_SECRET)
    if(verified){
        req.id = verified.id;
        next()
    }   
    else{
        res.json({
            message:'Token not verified'
        })
    }

}

module.exports = {
    middleware
}
