const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { ParkingRecord, Member } = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
    res.render('admin', { title: 'WJ파크-관리자' });
});

router.get('/park/record', isLoggedIn, async (req, res) => {
    try {
        const exParkingRecord = await ParkingRecord.findAll();
        return res.render('admin', { title: 'WJ파크-주차기록', parkingRecord : exParkingRecord, });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/park/record/delete', isLoggedIn, async (req, res) => {
    const { id } = req.body;
    try {
        const exParkingRecord = await ParkingRecord.findOne({ where: { id }});
        if (exParkingRecord) {
            await ParkingRecord.destroy({ where: { id }});
        }
        const parkingRecord = await ParkingRecord.findAll();
        return res.render('admin', { title: 'WJ파크-주차기록', parkingRecord, });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/member/record', isLoggedIn, async (req, res) => {
    try {
        const exMember = await Member.findAll({ where: { admin: null }});
        return res.render('admin', { title: 'WJ파크-회원기록', memberRecord : exMember, });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/member/record/delete', isLoggedIn, async (req, res) => {
    const { id } = req.body;
    try {
        const exMember = await Member.findOne({ where: { id }});
        if (exMember) {
            await Member.destroy({ where: { id }});
        }
        const memberRecord = await ParkingRecord.findAll();
        return res.render('admin', { title: 'WJ파크-회원기록', memberRecord, });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;