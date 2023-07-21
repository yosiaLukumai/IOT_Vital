const router = require('express').Router()
const dataController = require("../controllers/data")

const dataRoutes = (app) => {
    router.post("/register", dataController.register)
    router.post("/update", dataController.update)
    router.get("/data", dataController.getData)
    router.get("/data/:amount", dataController.getDataValue)
    return app.use("/data", router)
}

module.exports = {
    dataRoutes
}