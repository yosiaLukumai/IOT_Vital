const router = require('express').Router()
const userController = require("../controllers/user")

const userRoutes = (app) => {
    router.get("/all", userController.allUsers)
    router.post("/register", userController.register)
    router.post("/login", userController.login)
    router.patch("/:id", userController.updateUser)
    router.get("/count/api", userController.countUsers)
    router.get("/setunit/:unit", userController.setAmount)
    return app.use("/user", router)
}

module.exports = {
    userRoutes
}