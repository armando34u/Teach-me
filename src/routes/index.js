const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signinAdministradores', (req, res, next) => {
  res.render('signinAdministradores');
});
router.post('/signinAdministradores', passport.authenticate('local-signinAdministradores', {
  successRedirect: '/signup',
  failureRedirect: '/signinAdministradores',
  failureFlash: true
}));

router.get('/signup',isAuthenticated, (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})); 

router.get('/signinEstudiantes', (req, res, next) => {
  res.render('signinEstudiantes');
});


router.post('/signinEstudiantes', passport.authenticate('local-signinEstudiantes', {
  successRedirect: '/profileEstudiantes',
  failureRedirect: '/signinEstudiantes',
  failureFlash: true
}));
router.get('/profileEstudiantes',isAuthenticated, (req, res, next) => {
  res.render('profileEstudiantes');
});

router.get('/signinDocentes', (req, res, next) => {
  res.render('signinDocentes');
});
router.post('/signinDocentes', passport.authenticate('local-signinDocentes', {
  successRedirect: '/profileDocentes',
  failureRedirect: '/signinDocentes',
  failureFlash: true
}));
router.get('/profileDocentes',isAuthenticated, (req, res, next) => {
  res.render('profileDocentes');
});


router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

module.exports = router;
