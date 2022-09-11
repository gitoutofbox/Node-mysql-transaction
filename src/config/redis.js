const logger = require("../logger/logger");
const redis = require('redis');
let redisClient;

(async () => {
    redisClient =  redis.createClient();
    redisClient.on("error", error => logger.error(error));
    await redisClient.connect();
})();


module.exports = redisClient;