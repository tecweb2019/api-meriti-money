import express from "express";
import pessoaRouter from "./paths/pessoa-router";
import transferenciaRouter from "./paths/transferencia-router";

const apiRouter = express.Router();

apiRouter.use("/pessoas" , pessoaRouter);
apiRouter.use ("/transferencias", transferenciaRouter);
apiRouter.use("/", (req ,resp,next) =>{

    resp.send(" API V1")
});


//apiRouter.use("/recompensas" ,recompensaRouter);


export default apiRouter;