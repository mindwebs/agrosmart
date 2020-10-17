const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const shortid = require('shortid');

const User = require('../models/User');

router.post('/create', async (req, res) => {
    // const { name } = req.body;
    // const { email } = req.body;
    // const { phone } = req.body;
    // //const { pass } = req.body;
    // const pass = req.body.password;
    // const { accessLevel } = req.body; // W/A/U-S
    // const { defaultProperty } = req.body;

    const { name, email, phone, password : pass,accessLevel, defaultProperty  } = req.body;

    const defaultTimeout = 0;

    let password = bcrypt.hashSync(pass, saltRounds);

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(409).json('User Already Exists');
        } else {
            user = new User({
                name,
                email,
                phone,
                password,
                accessLevel,
                defaultProperty,
                defaultTimeout,
                date: new Date()
            });

            await user.save();

            res.json(user);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }

});

router.post('/login', async (req, res) => {
    const email = req.body.username;
    const pass = req.body.password;
    //let password = bcrypt.hashSync(pass, saltRounds);

    try {
        let user = await User.findOne({ email });

        if (user) {
            if (bcrypt.compareSync(pass, user.password)) {
                const hashKey = shortid.generate();;
                let loginHash = bcrypt.hashSync(hashKey, saltRounds);
                var lastLogin = new Date();
                let update = await User.updateOne({ email }, { $inc: { loginNo: 1 }, $set: { loginHash, lastLogin } });
                if (update) {
                    var message = "Login Successful!";
                    var success = true;
                    var returnJson = ({ success, message, loginHash });
                    res.status(200).json(returnJson);
                } else {
                    res.status(200).json('Login Successful, but No Hash Set.');
                }

            } else {
                var message = "Invalid Password! Try again.";
                var success = false;
                var returnJson = ({ success, message });
                res.status(200).json(returnJson);
            }
        } else {
            var message = "Account Not Found";
            var success = false;
            var returnJson = ({ success, message });
            res.status(200).json(returnJson);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
});

router.post('/updateUserName', async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    const username = req.body.username;
    const password = bcrypt.hashSync(pass, saltRounds);
    try {
        let user = await User.findOne({ email });

        if (user) {
            if (bcrypt.compareSync(pass, user.password)) {
                let update = await User.updateOne({ email }, { $set: { username } });
                if (update) {
                    var message = "Username Set Successfully!";
                    var name = user.name;
                    var returnJson = { message, name, username };
                    res.status(200).json(returnJson);
                } else {
                    res.status(500).json('There was some error.');
                }
            } else {
                res.status(401).json('Invalid Password! Try again.');
            }
        } else {
            res.status(404).json('User not Found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
});

router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.username });

        if (user) {
            /* Create the Required JSON */
            var name = user.name;
            var email = user.email;
            var phone = user.phone;
            var username = user.username;
            var accessLevel = user.accessLevel;
            var defaultProperty = user.defaultProperty;
            var lastLogin = user.lastLogin;
            var loginHash = user.loginHash;
            var returnJson = { name, email, username, accessLevel, phone, defaultProperty, lastLogin, loginHash };
            return res.status(200).json(returnJson);
        } else {
            var message = 'User not found!';
            return res.status(200).json({ message });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json('Internal Server Error.');
    }
});

router.post('/logout', async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const loginHash = req.body.loginHash;

    if (email) {
        let user = User.findOne({ email });
        if (user) {
            if (loginHash == user.loginHash) {
                var loginNo = user.loginNo;
                if (loginNo == 1) {
                    let update = await User.updateOne({ email }, { $inc: { loginNo: -1 }, $set: { loginHash: null } });
                    if (update) {
                        res.status(200).json("Logout Successful!");
                    } else {
                        res.status(417)
                    }
                } else {
                    let update = await User.updateOne({ email }, { $inc: { loginNo: -1 } });
                }

            }
        }
    }
});

module.exports = router;