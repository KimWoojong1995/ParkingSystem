const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { ParkingRecord, Member } = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
    res.render('admin', { title: 'WJ파크-관리자' });
});

router.get('/park/record/:page', isLoggedIn, async (req, res) => {
    const pageNum = req.params.page;
    try {
        const totalData = Object.keys(await ParkingRecord.findAll()).length;
        const pages = totalData / 10;
        let offset = 0;
        if(pageNum > 1){
            offset = 10 * (pageNum - 1);
        }
        const exParkingRecord = await ParkingRecord.findAll({
            order: [['id', 'DESC']],
            limit: 10,
            offset: offset,
        })
        return res.render('parkingRecord', { title: 'WJ파크-주차기록', parkingRecord : exParkingRecord, pages, });
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

router.get('/member/record/:page', isLoggedIn, async (req, res) => {
    const pageNum = req.params.page;
    try {
        const totalData = Object.keys(await Member.findAll({ where: { admin: null } })).length;
        const pages = totalData / 10;
        let offset = 0;
        if(pageNum > 1){
            offset = 10 * (pageNum - 1);
        }
        const exMember = await Member.findAll({
            where: { admin: null },
            order: [['id', 'DESC']],
            limit: 10,
            offset: offset,
        })
        return res.render('memberRecord', { title: 'WJ파크-회원기록', memberRecord : exMember,  pages});
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