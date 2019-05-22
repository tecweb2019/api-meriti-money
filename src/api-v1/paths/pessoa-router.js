import express from "express";
import pessoaModel from "../models/pessoa-model";
const pessoaRouter = express.Router();

pessoaRouter.put("/" ,(req, resp, next)=>{
    pessoaModel.inserir(req.body,(message)=>{

    });
});

pessoaRouter.get("/",(req,resp,next)=>{
    pessoaModel.listar({},(erro,data)=>{
        if(erro)
            resp.status(404).send(erro.message);
        else
            resp.json(data);
    });
});


export default pessoaRouter;