import express from "express";
import pessoaRouter from "./paths/pessoa-router";

const apiRouter = express.Router();

apiRouter.use("/pessoas" , pessoaRouter);
apiRouter.use("/", (req ,resp,next) =>{

    resp.send(" API V1")
});


//apiRouter.use("/recompensas" ,recompensaRouter);
//apiRouter.use ("/transferencias", transferenciasRouter);

export default apiRouter;