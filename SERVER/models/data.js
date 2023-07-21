const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
let SALT_WORK_FACTOR = 10
const data = mongoose.Schema({
    bpm: {
        type: String,
        required: true,
    },
    temp: {
        type : String,
        required : true
    },
    spo: {
        type : String,
        required : true
    }
}, {
    timestamps: true
})




module.exports = mongoose.model("data", data)
