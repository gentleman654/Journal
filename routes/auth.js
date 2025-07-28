const express = require('express');
const router = express.Router();

const Test_User = {username: 'admin', password: '1234'};


router.get('/', (req, res) => {
    res.send(`
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
            </form>`); 
    });

router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (username === Test_User.username && password === Test_User.password) {
        req.session.user = { username };
        res.redirect('/home');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.redirect('/login');
    });
});

module.exports = router;