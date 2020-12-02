const express = require('express');
const router = express.Router();

router.get('/join', (req,res) => {
    res.render('join');
});

router.get('/login', (req, res) => {
    res.render('login');
})

// router.get('/kakao', passport.authenticate('kakao'));

// router.get('/kakao/callback', passport.authenticate('kakao', {
//   failureRedirect: '/',
// }), (req, res) => {
//   res.redirect('/');
// });

module.exports = router;