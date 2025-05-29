import express from "express"
import dotenv from "dotenv"
import cors from "cors" // Middleware for sharing frontend/bckend in developmnt
import { connectDB } from "./config/db.js"
import itemRoutes from "./routes/item.route.js"



dotenv.config()

const app = express()

const PORT = process.env.PORT || 5001


// Middleware for sharing frontend/bckend in developmnt
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }))
}


app.use(express.json()) // allows you to parse the body of the request

app.use("/api/items", itemRoutes)


connectDB().then(() => {

    app.listen(PORT, () => {
        console.log("Server running started at http://localhost:" + PORT)
    })
})

