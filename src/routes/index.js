const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const sendFromCache = require('../middlewares/redis-cache')

// const use = fn => (req, res, next) => {
//     Promise.resolve(
//         fn(req, res, next)
//     ). catch(error => {
//         next(error);
//     })
// }
router.get('/users', sendFromCache, user.get);
router.post('/user', user.post);

module.exports = router;
