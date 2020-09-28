// const server = require('express').Router();
// const {User} = require('../db.js');
// const cors = require('cors');
// const passport = require('passport');


// //FUNCION PARA SABER SI EL USUARIO YA ESTA LOGEADO

// function authMiddleware(req, res, next) {
//     if(req.isAuthenticated()) {
//         console.log(req.user)
//         next();
//     } else {
//         res.status(401);
//         //res.redirect('/login');
//         res.send('El usuario no esta logueado');
//     }
// }

// // FUNCION PARA SABER SI EL USUARIO ES ADMIN Y DARLE ACCESO A LAS RUTAS DE ADMIN

// function isAdmin(req, res, next) {
//     if(req.user.admin === true) {
//         next();
//     } else {
//         //res.redirect('/');
//         res.send('Su usuario no es admin')
//     }
// }

// server.get('/', cors(), (req, res, next) => {
//     res.render('home', { user: req.user });
// });


// //--------------LOG IN-----------------\\

// //GET /auth/login

// server.get('/login', cors(), (req, res, next) => {
//     if(req.isAuthenticated()) {
//         res.redirect('/auth/profile')
//         console.log('HOLAAAAAAA')
//     }
//     //res.render('login', { user : req.user });
// });

// //POST /auth/login

// server.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), cors(), (req, res, next) => {
//     //res.redirect('/');
//     res.send('Usuario logueado. BIENVENIDO/A')
// });


// //--------------LOG OUT-----------------\\

// //POST /auth/logout

// server.get('/logout', cors(), (req, res, next) => {
//     req.logout();
//     //res.redirect('/');
//     res.send('Deslogueado con exito')
// });


// //--------------PROFILE-----------------\\

// //GET /auth/profile  Esta ruta tiene que devolver el usuario que está logeado, o 401 si no está logeado. VER FUNCION isAuthenticated.

// server.get('/profile', authMiddleware, cors(), (req, res, next) => {
//     //res.render('/auth/profile', { title: 'Perfil', user: req.user, name: req.user.name, surname: req.user.surname, email: req.user.email });
//     res.send(req.user)
// });


// //----------------------ADMIN-----------------------------\\

// server.use('/admin', isAdmin);

// //POST /auth/promote/:id Promote convierte al usuario con ID: id a Admin.

// server.put('/promote/:id', authMiddleware, isAdmin, cors(), (req, res, next) => {
// //AL USUARIO Y CAMBIAR DE FALSE A TRUE CAMBIAR MODELO DE USUARIO 
// //CAMPO SI ES BANNED Y SI ES ADMIN
// });

// //GET /auth/profile/admin

// server.get('/profile/admin', authMiddleware, isAdmin, cors(), (req, res, next) => {
//     res.send(req.user.admin)
//     //res.render('profile', { title: 'Perfil de Admin', user: req.user, name: req.name, surname: req.surname, email: req.email });
// });

// //Agregar middeware para proteger las rutas que sólo pueden usar los admins.

// //--------------REGISTER-----------------\\

// //GET auth/register

// // server.get('/register', cors(), (req, res, next) => {
// //   res.render('register', { });
// // });

// // //POST auth/register

// // server.post('/register', cors(), (req, res, next) => {
// //   User.register(new User({ email : req.body.email }), req.body.name, req.body.surname, req.body.password, (err, user) => {
// //       if (err) {
// //           return res.render('register', { user : user });
// //       }

// //       passport.authenticate('local')(req, res, function () {
// //           //res.redirect('/');
// //           res.send('Registrado')
// //       });
// //   });
// // });


// module.exports = server; 