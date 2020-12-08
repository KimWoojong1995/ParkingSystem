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
        let offset = 0;
        if(pageNum > 1){
            offset = 10 * (pageNum - 1);
        }
        const parkingRecord = await ParkingRecord.findAll({
            order: [['id', 'DESC']],
            limit: 10,
            offset: offset,
        })
        const totalData = Object.keys(await ParkingRecord.findAll()).length;
        const pages = Math.ceil(totalData / 10);
        return res.render('parkingRecord', { title: 'WJ파크-주차기록', parkingRecord, pages });
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
        const parkingRecord = await ParkingRecord.findAll({
            order: [['id', 'DESC']],
            limit: 10
        });
        const totalData = Object.keys(await ParkingRecord.findAll()).length;
        const pages = Math.ceil(totalData / 10);
        return res.render('parkingRecord', { title: 'WJ파크-주차기록', parkingRecord, pages });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/member/record/:page', isLoggedIn, async (req, res) => {
    const pageNum = req.params.page;
    try {
        let offset = 0;
        if(pageNum > 1){
            offset = 10 * (pageNum - 1);
        }
        const memberRecord = await Member.findAll({
            where: { admin: null },
            order: [['id', 'DESC']],
            limit: 10,
            offset: offset,
        })
        const totalData = Object.keys(await Member.findAll({ where: { admin: null } })).length;
        const pages = totalData / 10;
        return res.render('memberRecord', { title: 'WJ파크-회원기록', memberRecord,  pages });
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
        const memberRecord = await Member.findAll({
            where: { admin: null },
            order: [['id', 'DESC']],
            limit: 10,
        });
        const totalData = Object.keys(await Member.findAll({ where: { admin: null } })).length;
        const pages = totalData / 10;
        return res.render('memberRecord', { title: 'WJ파크-회원기록', memberRecord, pages });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;