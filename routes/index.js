const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.member = req.user;
    next();
})

router.get('/', (req,res) => {
    res.render('index', { title: 'WJ파크' });
});

module.exports = router;