const {User} = require('../models');
const bcrypt = require('bcryptjs');

const login = async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: { email: email }
    });

    if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...userWithoutPassword } = user.toJSON();
        req.session.user = userWithoutPassword;
        res.send("Login successful");
    } else {
        res.status(401).send('Invalid credentials');
    }
};

const register = async (req, res) => {
    const { name, email, password, gender } = req.body;
    let role = "USER";
    if('role' in req.body)
        role = req.body.role;

    console.log(User);
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({ name, email, gender, password: hashedPassword, role:role });
    res.status(201).send('User registered');
};

const logout = (req, res) => {
    req.session.destroy(err => {
    if (err) {
        return res.status(500).json({ message: 'Failed to logout' });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.json({ message: 'Logout successful' });
    });
}

module.exports = {login, register, logout};