const express = require('express');
const router = express.Router();
const { Member } = require('../models');

router.get('/', (req, res) => {
    res.render('ticket', { title: 'WJ파크-정기권' });
});

module.exports = router;