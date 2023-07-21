const { createOutput } = require("../utils");
const io = require("./../index")
const dataModel = require("./../models/data")

const register = async (req, res) => {
    try {
        const { bpm, spo, temp} = req.body;
        const saved = await dataModel.create({bpm,spo, temp});
        if (saved) {
            return res.json(createOutput(true, saved));
        } else {
            return res.json(createOutput(false, saved));
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}

const getData = async (req, res) => {
    try {

        let one = await dataModel.findOne().sort({createdAt: 'desc'});
        // console.log(one);
        return res.json(createOutput(true, one))
        
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}


const update = async (req, res) => {
    try {
        const { bpm, spo, temp} = req.body;
        const saved = await dataModel.create({bpm,spo, temp});
        if (saved) {
            const datas = await dataModel.find().sort({createdAt: 'desc'}).limit(6);
            io.Socket.emit("dataSet", datas)
            return res.json(createOutput(true, datas));
        } else {
            return res.json(createOutput(false, 'failed to update'));
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}

const getDataValue = async (req, res) => {
    try {
        const amount = req.params.amount
        const dataAms = await dataModel.find().limit(parseInt(amount)).sort({createdAt: 'desc'});
        return res.json(createOutput(true, dataAms))
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}


module.exports = {
    register,
    update,
    getData,
    getDataValue
}