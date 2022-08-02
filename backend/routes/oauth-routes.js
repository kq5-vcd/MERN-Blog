import passport from "../controllers/oath-controller"
import express from "express"; 

const oauthRouter = express.Router()

oauthRouter.get('/failure', (req,res,next) => {
    return res.status(401).json({message: "Fail to access Google"})
});

oauthRouter.get('/success', (req,res,next) => {
    if (req.user) {
        res.status(200).json({message: "Successful authorization"})
    } else {
        res.status(403).json({message: "Unsuccessful authorization"})
    }
});


oauthRouter.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

oauthRouter.get('/redirect/google', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/api/oauth2/failure'
}));

export default oauthRouter