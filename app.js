const express = require("express")
const app = express()
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const env = require("./configs/config")

const services = require("./services")

const authRoute = require("./routes/auth")
const licenseRoute = require("./routes/license")

env.configenv
services()




//-----------
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(morgan("short"))



//---------
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/license", licenseRoute)







app.listen(8800, () => {
    console.log("Server is running...");
  })