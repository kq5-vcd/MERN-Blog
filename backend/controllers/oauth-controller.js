import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { key } from '../oauthKey';
import User from "../models/User"
import bcrypt from "bcryptjs"

const CLIENT_URL = 'http://localhost:3000'

export const logOut = async (req,res,next) => {
    req.logOut()
    res.redirect(CLIENT_URL)
}

export const failure = async (req,res,next) => {
    return res.status(401).json({message: "Fail to access Google"})
}

export const success = async (req,res,next) => {
    if (req.user) {
        res.redirect(`${CLIENT_URL}/login/${req.user._id}`)
    } else {
        return res.status(403).json({message: "Unsuccessful authorization"})
    }
}

const handleProfile = async(profile, cb) => {
    // Check if google profile exist.
    if (profile.id) {
        let existingUser; 
        try {
            existingUser = await User.findOne({authId: profile.id})
        } catch (error) {
            console.log(error);
        }

        if(existingUser) {
            return cb(null, existingUser)
        } else {
            const hashedPass = bcrypt.hashSync(profile.id)
            const user = new User({
                authId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                password: hashedPass,
                blogs: [],
                subscriptions: []
            })

            try {
                await user.save()
            } catch (error) {
                console.log(error);
            }

            if(!user) {
                return cb(null, false,{message: "Unable to registers."});
            }

            return cb(null, user)
        }
    }
}

passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  
  passport.deserializeUser(async(id, cb) => {
    try {
        const user = await User.findById(id)
        return cb(null, user);
    } catch(error) {
        console.log(error);
    }

    return cb(null, false)
  });

passport.use(new Strategy(
    {
        clientID: key.googleClientID,
        clientSecret: key.googleClientSecret,
        callbackURL: '/api/oauth2/redirect/google'
    },
    (accessToken, refreshToken, profile, cb) => handleProfile(profile, cb)
))

export default passport