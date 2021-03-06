const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Member } = require('../models');

const router = express.Router();

router.get('/join', isNotLoggedIn, (req,res) => {
    res.render('join', { title: 'WJ파크-회원가입' });
});

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { carNumber, password } = req.body;
    try {
        const exMember = await Member.findOne({ where: { carNumber } });
        if (exMember) {
            return res.render('join',{ title: 'WJ파크-회원가입', message: '이미 회원가입되었습니다.' });
        }
        const hash = await bcrypt.hash(password, 12);
        await Member.create({
            carNumber,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login', { title: 'WJ파크-로그인' });
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, member, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!member) {
            return res.render('login', { title: 'WJ파크-로그인', message: info.message });
        }
        return req.login(member, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;