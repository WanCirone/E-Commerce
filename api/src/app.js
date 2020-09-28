const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const server = express();
const {User} = require('./db.js');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');


passport.use(new LocalStrategy({
  usernameField: 'email'
    },(username, password, done) => {
      User.findOne({ where: {email: username}})
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        if (!user.correctPassword(password)) {
          return done(null, false);
        }
        return done(null, user.dataValues);
      })
      .catch(err => {
        return done(err);
      })
  }));


// Esto permite que la información almacenada en la sesión sea lo más simple y pequeña posible

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Al deserealizar la información del usuario va a quedar almacenada en req.user

passport.deserializeUser((id, done) => {
  console.log("ENTRA EL ID", id)
  User.findByPk(id)
  .then((user) => {
    done(null, user.dataValues);
  }).catch(err => {
    return done(err);
  })
  });


  server.name = "API";

  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(cookieParser());
  server.use(morgan('dev'));

  server.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));

  server.use(passport.initialize());
  server.use(passport.session());


// Middleware para mostrar la sesión actual en cada request
  server.use((req, res, next) => {
    console.log("Session! ", req.session);
    console.log("User!", req.user);
    next();
  });

  server.use('/', routes); //index



server.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.send(user);
    }
    if(user.banned===true){
      return res.status(401).send("Esta banneado, no puede logearse")
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send(user)
    });
  })(req, res, next);
})


function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
      console.log("entre en el authenticated")
      next();
    }
    else{
      res.send(false);
    }
  }

  
  server.get("/logout", (req, res) => {
    req.logout();
    res.status(200).send("Ok!")
  });


  server.get("/login",
    isAuthenticated,
    (req, res) => {
    res.send(req.user)
  });

//------------------CHECKOUT----------------//
//api key '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'
//online.petshop.argentina@gmail.com
//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

  server.post("/checkout", (req, res, next) => {
    const {street, number, apartment, city, cp, province, country, name, surname, id, articles} = req.body;
    var options = {
        auth: {
            api_key: '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'
        }
    }
    var total = 0;
    htmlContent = `<h2>Su pedido ya está en camino!</h2>
                    <div>
                      <p>Su orden será enviada a ${street} ${number} ${apartment}, ${city}, ${province}, ${country}. Código postal: ${cp}. Gracias por su compra!</p>
                      <p>Nombre completo: ${name} ${surname}.</p> 
                      <h4>Pedido #${id}: </h4>
                      <ul>${articles.map(a => 
                        `<li>Producto: ${a.name}, precio por unidad: $${a.price}, cantidad: ${a.quantity}.</li>
                        <p hidden>Subtotal: $${total += a.price * a.quantity}</p>`
                      )}</ul>
                      <h4>Total: $${total}</h4>
                    </div>
                  `;
    var client = nodemailer.createTransport(sgTransport(options));
    var email = {
        from: 'online.petshop.argentina@gmail.com',
        to: req.body.emailShipment,
        subject: 'Su orden está en camino!',
        html: htmlContent
    };
    console.log(req.body.street);
    client.sendMail(email, function(err, info) {
        if (err){
            console.log(err);
        }
        else {
            console.log('Mensaje enviado: ' + info);
        }
    });

  })


// // Error catching endware.
// server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
//   const status = err.status || 500;
//   const message = err.message || err;
//   console.error(err);
//   res.status(status).send(message);
// });

module.exports = server;
