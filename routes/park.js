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
            return res.render('parkOut', { message: '주차되지 않은 차량입니다.' });
        } else if (exParkingRecord.outTime) {
            return res.render('parkOut', { message: '이미 출차한 차량입니다.' });
        }

        const inTime = exParkingRecord.inTime;
        const parkingTime = new Date() - new Date(inTime);
        const calc = parseInt(Math.ceil((parkingTime / 1000) / 600) * 1000);
        //천원단위 절삭
        const price = Math.ceil(calc / 1000) * 1000;
        const memberPrice = Math.ceil(calc * 0.8 / 1000) * 1000;
        
        if (exMember) {
            return res.render('parkOut', { price: memberPrice, carNumber });
            //if Member.ticket...
        // } else if (exMember.ticket) {
        //     return res.render('parkOut', { message: '(정기권) 출차되었습니다.' });
        }
        return res.render('parkOut', { price, carNumber });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/out/payment', async (req, res, next) => {
    const { carNumber } = req.body;
    try {
        const exParkingRecord = await ParkingRecord.findOne({
            order: [['id', 'DESC']],
            limit: 1,
            where: {
                carNumber,
            },
        });
        if (exParkingRecord) {
            await ParkingRecord.update({
                order: [['id', 'DESC']],
                limit: 1,
                outTime: new Date(),
                paid: true,
            },{
                where: {
                    id: exParkingRecord.id
                },
            },
            );
        }
        return;
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;