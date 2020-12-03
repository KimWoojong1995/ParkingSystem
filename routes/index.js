const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.render('index', { title: 'WJ파크' });
});

module.exports = router;