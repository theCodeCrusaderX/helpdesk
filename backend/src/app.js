import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(
  cors({
    origin: "https://helpdesk-frontend-eight.vercel.ap,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.get('/test', (req, res) => {
  res.send('hello world')
})

//api for user
import userRouter from "./routes/user.route.js"
app.use("/api/v1/users",userRouter)

//api for user ticket
import ticketRouter from "./routes/user/ticket.route.js"
app.use("/api/v1/ticket",ticketRouter)

//api for agent ticket
import agentTicketRouter from "./routes/agent/ticket.route.js"
app.use("/api/v1/agent/ticket",agentTicketRouter)



export {app}