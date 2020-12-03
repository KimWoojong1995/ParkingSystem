const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const Member = require('../models/member');

module.exports = () => {
    passport.serializeUser((member, done) => {
        done(null, member.id);
    });

    passport.deserializeUser((id, done) => {
        Member.findOne({ where: { id } })
            .then(user => done(null, member))
            .catch(err => done(err));
    });

    local();
    kakao();
}