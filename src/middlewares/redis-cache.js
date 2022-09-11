const redisClient = require("../config/redis");

const sendFromCache = async (req, res, next) => {
    
    const cachedData = await redisClient.get(req.originalUrl);
    if(cachedData) {
        res.set({'from-cache': 'true'})
        res.send(JSON.parse(cachedData))
    } else {
        next();
    }
   
}

module.exports = sendFromCache;