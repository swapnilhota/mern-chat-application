const User = require('../models/User');

module.exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ user });
    } catch (err) {
        console.log(err);
        res.status(400).send('Fail to create user');
    }
}

module.exports.login = (req, res) => {
    res.send('login');
}

module.exports.logout = (req, res) => {
    res.send('logout');
}