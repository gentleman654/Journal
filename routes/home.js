const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');

function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
}

router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const journals = await Journal.find().sort({ dateCreated: -1 });
    res.render('home', { user: req.session.user, journals: journals });
  } catch (err) {
    console.error('Error fetching journals:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    const { title, body } = req.body;
    const newJournal = await Journal.create({ title, body });
    res.redirect('/home');
  } catch (err) {
    console.error('Error creating journal:', err);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
