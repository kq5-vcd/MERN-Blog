import passport from "../controllers/oath-controller"
import express from "express"; 

const oauthRouter = express.Router()

oauthRouter.get('/', (req,res,next) => {
    return res.status(200).json({message: "Test"})
});
oauthRouter.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        successRedirect: '/api/user',
        failureRedirect: '/'
    })
);
oauthRouter.get('/redirect/google', passport.authenticate('google'), (req,res,next) => {
    //return res.status(200).json({message: "Successful authentication."})
    res.redirect("/api/user")
});

export default oauthRouter