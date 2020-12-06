const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('plan', { title: 'WJ파크-요금안내' });
});

module.exports = router;