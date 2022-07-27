import passport from "../controllers/oath-controller"
import express from "express"; 

const oauthRouter = express.Router()

oauthRouter.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        //successRedirect: '/api/user',
        //failureRedirect: '/'
    })
);
oauthRouter.get('/redirect/google', passport.authenticate('google'));

export default oauthRouter