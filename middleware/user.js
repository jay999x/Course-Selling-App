const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function userMiddleware(req, res, next){
    const token = req.headers.token;
    const tokenverified = jwt.verify(token, JWT_SECRET);
    if(tokenverified){
        req.id = tokenverified.id
        next();

    }

    else{
        res.json({
            message:'Token not verified'
        })
    }
    
}

module.exports={
    userMiddleware
}