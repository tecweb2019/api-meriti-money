import express from "express";
import recompensaModel from "../models/recompensa-model";
const recompensaRouter = express.Router();

recompensaRouter.put("/" ,(req, resp, next)=>{
    recompensaModel.inserir(req.body,(message)=>{

    });
});

recompensaRouter.get("/",(req,resp,next)=>{
    recompensaModel.listar({},(erro,data)=>{
        if(erro)
            resp.status(404).send(erro.message);
        else
            resp.json(data);
    });
});


export default recompensaRouter;