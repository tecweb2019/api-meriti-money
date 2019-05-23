import express from "express";
import apiRouter from "./api-v1/api-router";
import bodyParse from "body-parser";


const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended : false}));

app.use("/api/v1",apiRouter);


app.listen(3001,()=>{
    console.log("servidor funcionando");
});