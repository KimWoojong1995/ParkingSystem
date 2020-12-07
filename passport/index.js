const passport = require('passport');
const local = require('./localStrategy');
const { Member } = require('../models');

module.exports = () => {
    passport.serializeUser((member, done) => {
        done(null, member.id);
    });

    passport.deserializeUser((id, done) => {
        Member.findOne({ where: { id } })
            .then(user => done(null, user)) //req.user
            .catch(err => done(err));
    });

    local();
}