const express = require('express');
const router = express.Router();

router.get('/in', (req,res) => {
    res.render('parkIn');
});

router.get('/out', (req, res) => {
    res.render('parkOut');
})

module.exports = router;