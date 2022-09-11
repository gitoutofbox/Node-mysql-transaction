const redisClient = require('../config/redis');
const db = require('../config/database');

const get = (req, res, next) => {
    db.query("SELECT * FROM users").then(async data => {
        await redisClient.set(req.originalUrl, JSON.stringify(data));
        res.send({ ...data })
    })
        .catch(next)
}
const post = (req, res, next) => {
    isDuplicateEmail(req.body.email).then(isDuplicate => {
        if (isDuplicate) {
            res.send({ message: 'Email already exists' })
        } else {
            createUser(req, res, next);
        }
    })
    .catch(next)

}

const createUser = async (req, res, next) => {
    await db.beginTransaction();
    try {
        const query = `INSERT INTO users (name, email) values("${req.body.name}", "${req.body.email}")`;
        db.query(query)
            .then(data => {
                return createUserDetails(data.insertId, req)
            }).then(async detailsData => {
                await db.commit();
                res.send({ status: "success", message: `row inserted` });
            })
            .catch(async error => {
                await db.rollback();
                next(error)
            })
    } catch (error) {
        await db.rollback();
        next(error)
    }

}

const createUserDetails = (userId, req) => {
    const query = `INSERT INTO user_details (user_id, address, dob, phone) VALUES ("${userId}", "${req.body.address}", "${req.body.dob}","${req.body.phone}")`;
    return db.query(query)
}
const isDuplicateEmail = (email) => {
    const query = `SELECT COUNT(id) as count FROM users WHERE email = "${email}"`;
    return new Promise((resolve, reject) => {
        db.query(query).then(data => {
            if (data[0].count) {
                resolve(true)
            } else {
                resolve(false)
            }

        })
    })
}

module.exports = {
    get,
    post
}