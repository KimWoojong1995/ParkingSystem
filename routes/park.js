const express = require('express');
const router = express.Router();

const { ParkingRecord, Member } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/in', (req,res) => {
    res.render('parkIn', { title: 'WJ파크-주차하기' });
});

router.post('/in', async (req, res, next) => {
    const { carNumber } = req.body;
    try {
        const exParkingRecord = await ParkingRecord.findOne({
            order: [['id', 'DESC']],
            limit: 1,
            where: {
                carNumber,
                paid: false,
            },
        });
        const exMember = await Member.findOne({ where: { carNumber } });

        if (exParkingRecord) {
            return res.render('parkIn', { text: '이미 주차한 차량입니다.' });
        } else if (exMember) {
            await ParkingRecord.create({
                carNumber,
                member: exMember.id,
            });
        } else {
            await ParkingRecord.create({
                carNumber,
            });
        }
        return res.render('parkIn', { text: '주차되었습니다.' });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/out', (req, res) => {
    res.render('parkOut', { title: 'WJ파크-출차하기' });
});

router.post('/out', async (req, res, next) => {
    const { carNumber } = req.body;
    try {
        const exParkingRecord = await ParkingRecord.findOne({
            order: [['id', 'DESC']],
            limit: 1,
            where: {
                carNumber,
            },
        });
        const exMember = await Member.findOne({ carNumber });

        if (!exParkingRecord) {
            return res.render('parkOut', { error: '주차되지 않은 차량입니다.' });
        } else if (exParkingRecord.outTime) {
            return res.render('parkOut', { error: '이미 출차한 차량입니다.' });
        }

        const inTime = exParkingRecord.inTime;
        const parkingTime = new Date() - new Date(inTime);
        console.log('시간 계산' , parkingTime);
        const calc = parseInt(Math.ceil((parkingTime / 1000) / 600) * 1000);
        console.log('계산 전 시간만', parseInt(Math.ceil(parkingTime / 1000) / 600));
        console.log('calc' , calc);
        //천원단위 절삭
        const price = Math.ceil(calc / 1000) * 1000;
        const memberPrice = Math.ceil(calc * 0.8 / 1000) * 1000;
        
        if (exMember) {
            res.render('parkOut', { price: memberPrice, carNumber });
            return 
        }
        
        return res.render('parkOut', { price, carNumber });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;