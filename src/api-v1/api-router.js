import express from "express";
import loginRouter from "./paths/login-router";
import pessoaRouter from "./paths/pessoa-router";
import transferenciaRouter from "./paths/transferencia-router";
import recompensaRouter from "./paths/recompensa-router";

const apiRouter = express.Router();

apiRouter.use('/login', loginRouter);
apiRouter.use("/pessoas" , pessoaRouter);
apiRouter.use("/recompensas" ,recompensaRouter);
apiRouter.use ("/transferencias", transferenciaRouter);
apiRouter.use("/", (req ,resp,next) =>{

    resp.send(" API V1")
});





export default apiRouter;