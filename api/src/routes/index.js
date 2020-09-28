const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const userRouter = require('./user.js');
const orderRouter = require('./order.js'); 
// const authRouter = require('./auth');


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/user', userRouter);
router.use('/orders', orderRouter);
// router.use('/auth', authRouter);

module.exports = router;
