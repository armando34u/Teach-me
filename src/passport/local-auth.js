const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  nombreCompletoField:'nombreCompleto',
  ciField:'ci',
  nombreUsuarioField:'nombreUsuario',
  usernameField: 'email',
  passwordField: 'password',
  rolField:'rol',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({'email': email})
  console.log(req.body.nombreCompleto);
  console.log(user)
 
  if(user) {
    return done(null, false, req.flash('signupMessage', 'El correo ya fue registrado'));
  } else {
    const usern = await User.findOne({'nombreUsuario':req.body.nombreUsuario})
    console.log(usern)
    if(usern){
      return done(null, false, req.flash('signupMessage', 'El nombre de usuario ya fue registrado'));

    }else{
        const newUser = new User();
        newUser.nombreCompleto=req.body.nombreCompleto;
        newUser.ci=req.body.ci;
        newUser.nombreUsuario=req.body.nombreUsuario;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.rol=req.body.rol;
      console.log(newUser)
       await newUser.save();
       done(null, newUser);
        //await newUser.save(function(err) {
        //  if(err) throw err;
        //  done(null, user);
      //});
    }
  }
}));

passport.use('local-signinEstudiantes', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    return done(null, false, req.flash('signinMessage', 'Estudiante no Encontrado.'));
  }
  const userr = await User.findOne({rol: req.body.rol});
  if(!userr) {
    return done(null, false, req.flash('signinMessage', 'Estudiante no Encontrado.'));
  }
  if(!user.comparePassword(password)) {
    return done(null, false, req.flash('signinMessage', 'Contraseña Incorrecta'));
  }

  return done(null, user);
}));
passport.use('local-signinDocentes', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    return done(null, false, req.flash('signinMessage', 'Docente no Encontrado.'));
  }
  const userd = await User.findOne({rol: req.body.rol});
  if(!userd) {
    return done(null, false, req.flash('signinMessage', 'Docente no Encontrado.'));
  }

  if(!user.comparePassword(password)) {
    return done(null, false, req.flash('signinMessage', 'Contraseña Incorrecta'));
  }
  return done(null, user);
}));
passport.use('local-signinAdministradores', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    return done(null, false, req.flash('signinMessage', 'Administrador no Encontrado.'));
  }
  const usera = await User.findOne({rol: req.body.rol});
  if(!usera) {
    return done(null, false, req.flash('signinMessage', 'Administrador no Encontrado.'));
  }
  if(!user.comparePassword(password)) {
    return done(null, false, req.flash('signinMessage', 'Contraseña Incorrecta'));
  }
  return done(null, user);
}));