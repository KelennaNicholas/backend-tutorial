// exports.verifyUserToken = (req, res, next) => {
//     let token = req.headers.authorization;
//     console.log(token)
//     if (!token) return res.status(401).send("Access Denied / Unauthorized request");

//     try {
//         token = token.split(' ')[1] // Remove Bearer from string

//         if (token === 'null' || !token) return res.status(401).send('Unauthorized request');

//         let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);   
//         if (!verifiedUser) return res.status(401).send('Unauthorized request')
//         console.log(verifiedUser)

//         req.user.token = verifiedUser; 

//         next();

//     } catch (error) {
//         res.status(400).send("Invalid Token");
//     }

// }

const jwt= require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader)

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            // console.log(user)
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    authenticateJWT
}