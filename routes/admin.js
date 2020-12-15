const express = require('express');
const { isLoggedIn, isNotAdmin } = require('./middlewares');
const { ParkingRecord, Member } = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, isNotAdmin, (req, res) => {
    return res.render('admin', { title: 'WJ파크-관리자' });
});

router.get('/park/record/:page', isLoggedIn, isNotAdmin, async (req, res) => {
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
        return res.render('parkingRecord', { title: 'WJ파크-주차기록', parkingRecord, pageNum, totalData });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/park/record/delete', isLoggedIn, async (req, res) => {
    const { id, pageNum } = req.body;
    console.log(pageNum);
    try {
        const exParkingRecord = await ParkingRecord.findOne({ where: { id }});
        if (exParkingRecord) {
            await ParkingRecord.destroy({ where: { id }});
        }
        return res.redirect(`/admin/park/record/${pageNum}`);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/member/record/:page', isLoggedIn, isNotAdmin, async (req, res) => {
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
        return res.render('memberRecord', { title: 'WJ파크-회원기록', memberRecord, pageNum,  totalData });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/member/record/delete', isLoggedIn, async (req, res) => {
    const { id, pageNum } = req.body;
    try {
        const exMember = await Member.findOne({ where: { id }});
        if (exMember) {
            await Member.destroy({ where: { id }});
        }
        return res.redirect(`/admin/member/record/${pageNum}`);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;