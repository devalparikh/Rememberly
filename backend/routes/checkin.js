const router = require('express').Router();
const auth = require('./middleware/auth');

let User = require('../models/user.model');
let Checkin = require('../models/checkin.model');

require('dotenv').config();

// @route GET /checkin/
// @desc Get all of users checkin
// @access Private
router.get('/', auth, async (req, res) => {
    // Get posts using the user_id from jwt
    Checkin.find({ user_id: req.user.id }).sort([['createdAt', -1]]) // find() returns promise
        .then(posts => res.json(posts)) // returns Posts
        .catch(err => res.status(400).json({ msg: err })); // catches errors and returns err
});

// @route POST /checkin/
// @desc Create new checkin
// @access Private
router.post('/', auth, async (req, res) => {
    const newCheckin = new Checkin(req.body);
    console.log(newCheckin)
    newCheckin.save()
        .then(post => res.json(post))
        .catch(err => res.status(400).json({ msg: err }));
});



module.exports = router;