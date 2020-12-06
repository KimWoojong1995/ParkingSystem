const express = require('express');
const router = express.Router();

const { ParkingRecord, Member } = require('../models');

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

router.post('/ticket', async (req, res, next) => {
    const { carNumber, ticket } = req.body;
    try {
        const exMember = await Member.findOne({where: { carNumber }});
        if (exMember && exMember.ticket) {
            const date = exMember.ticket;
            const addTicket = date.setMonth(date.getMonth() + parseInt(ticket));
            await Member.update({
                ticket: addTicket,
            },{
                where: {
                    carNumber,
                },
            },
            );
        } else if (exMember) {
            const newDate = new Date();
            const firstTicket = newDate.setMonth(newDate.getMonth() + parseInt(ticket));
            await Member.update({
                ticket: firstTicket,
            },{
                where: {
                    carNumber,
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