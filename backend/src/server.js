import express from "express"
import dotenv from "dotenv"
import cors from "cors" // Middleware for sharing frontend/bckend in developmnt
import { connectDB } from "./config/db.js"
import itemRoutes from "./routes/item.route.js"
import path from "path"
import job from "./config/cron.js"


dotenv.config()

const app = express()



const PORT = process.env.PORT || 5001

const __dirname = path.resolve()


// Middleware for sharing frontend/bckend in developmnt
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }))
}



// Calling cron to send an GET request to render.com every 14 minutes 
if (process.env.NODE_ENV === "production") job.start()


app.use(express.json()) // allows you to parse the body of the request



// Check the health of your backend URL
app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true })
})

app.use("/api/items", itemRoutes)


if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}


connectDB().then(() => {

    app.listen(PORT, () => {
        console.log("Server running started at http://localhost:" + PORT)
    })
})

