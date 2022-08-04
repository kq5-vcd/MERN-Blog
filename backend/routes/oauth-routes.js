import passport, { logOut, failure, success } from "../controllers/oauth-controller"
import express from "express"; 

const oauthRouter = express.Router()

oauthRouter.get('/failure', failure);

oauthRouter.get('/success', success);

oauthRouter.get('/logout', logOut)

oauthRouter.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

oauthRouter.get('/redirect/google', passport.authenticate('google', {
    successRedirect: '/api/oauth2/success',
    failureRedirect: '/api/oauth2/failure'
}));

export default oauthRouter