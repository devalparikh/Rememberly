const router = require('express').Router();
const auth = require('./middleware/auth');

let User = require('../models/user.model');

require('dotenv').config();

// @route PUT /user/custom_activities
// @desc Update user's custom_activities
// @access Private
router.put('/custom_activities', auth, async (req, res) => {

    User
        .findById(req.user.id)
        .then((user, err) => {
            if (user) {
                if (err) throw err;
                if (!user.custom_activities.includes(req.body.new_activity.toLowerCase())) {
                    // Append new activity
                    user.custom_activities.push(req.body.new_activity.toLowerCase());
                    user
                        .save()
                        .then(user => res.json(user))
                        .catch(err => { throw err });


                } else {
                    res.status(400).json({ msg: `${req.body.new_activity} already exists` });
                }
            } else {
                res.status(400).json({ msg: `${req.user.id} not found` });

            }

        })
        .catch(err => res.status(400).json({ msg: err }));
});



module.exports = router;