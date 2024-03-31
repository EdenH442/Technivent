import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { loginRoute, logoutRoute, resetPasswordRoute, secretQuestionRoute, signupRoute } from "./user_routes.js";
import { getEventRoute } from "./event_routes.js";

import { LOGIN_PATH, LOGOUT_PATH, SIGNUP_PATH, EVENT_PATH, SECRET_QUESTION_PATH, PASSWORD_RESET } from "./const.js";

dotenv.config();

let dbUri;
dbUri = `mongodb+srv://edenh:${process.env.DBPASS}@cluster0.cuoqmgf.mongodb.net/Technivent?retryWrites=true&w=majority&appName=Cluster0`;

await mongoose.connect(dbUri);

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
/* TODO: set CORS headers appropriately using the cors middleware */
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.post(LOGIN_PATH, loginRoute);
app.post(LOGOUT_PATH, logoutRoute);
app.post(SIGNUP_PATH, signupRoute);
app.post(SECRET_QUESTION_PATH, secretQuestionRoute);
app.post(PASSWORD_RESET, resetPasswordRoute);

app.get(EVENT_PATH, getEventRoute);

app.listen(port, () => {
  console.log(`Server running! port ${port}`);
});
