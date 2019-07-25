const passport = require('passport');
const LocalSatrategy =require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id,done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalSatrategy({
    usernameField:'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req,email,password,done)=>{
    //validamos usuarios duplicados
    const user = await User.findOne({email: email});
    if(user){
        return done(null,false,req.flash('signupMessage', 'Email ya registrado.'));
    }else{
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null,newUser); 
    }
    //
}));

passport.use('local-signin', new LocalSatrategy({
    usernameField:'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req, email, password, done)=>{
    const user = await User.findOne({email:email});
    if(!use){
        return done(null,false,req.flash('signinMessage','Usuario no encontrado'));
    }
    if(!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage','Contraseña Incorrecta'));
    }
    done(null,user);

}));