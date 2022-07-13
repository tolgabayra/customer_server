const router = require("express").Router()
const licenseController = require("../controllers/licenseController")
const authenticateToken = require("../middlewares/authenticateToken")
// router.post("/license", authController.login)


router.get("/:id", authenticateToken ,licenseController.getLicense)
router.put('/update', authenticateToken, licenseController.updateLicense)
router.delete('/:id', authenticateToken, licenseController.deleteLicense)




module.exports = router
