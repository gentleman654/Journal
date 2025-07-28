const express = require('express');
const router = express.Router();    

const journalArray= [];

function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login');
}   

router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json(journalArray);
});

router.post('/', ensureAuthenticated, (req, res) => {
    console.log("Request body:", req.body);
});
module.exports = router;