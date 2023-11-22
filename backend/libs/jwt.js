const { expressjwt: jwt } = require('express-jwt');

function authJwt() {
    const secret = process.env.JWT_SEC;
    return jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/products(.*)/ , methods: ['GET'] },
            {url: /\/categories(.*)/ , methods: ['GET'] },
            {url: /\/coupons(.*)/ , methods: ['GET'] },
            {url: /\/auth(.*)/ , methods: ['POST'] }
        
        ]
    })
}

async function isRevoked(req, token){
    console.log(token);
    console.log(token.payload)
    //console.log(req.auth)
    if(!token.payload.isAdmin) {
       return true;
    }
}
module.exports = authJwt

