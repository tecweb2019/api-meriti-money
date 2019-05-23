import express from "express";
import {validate} from "jsonschema";

import recompensaModel from "../models/recompensa-model";
import {recompensaSchemaValidate} from "../Schemas/recompensa.schema";

const recompensaRouter = express.Router();

recompensaRouter.post("/" ,(req, resp, next)=>{
    let verificaobj = validate(req.body,recompensaSchemaValidate);

    if(verificaobj.errors.length > 0){
        resp.status(400).json( {'message':"Bad request " + verificaobj.errors[0].message });
    }
    else {
        recompensaModel.inserir(req.body, (message) => {
            resp.status(201).json({'message': message});
        });
    }
});

recompensaRouter.get("/",(req,resp,next)=>{
    recompensaModel.listar({},(erro,data)=>{
        if(erro)
            resp.status(500).send(erro.message);
        else
        if(data.length > 0 )
            resp.json(data);
        else
            resp.status(404).json({'message': 'nenhum registro encontrado'});
    });
});

recompensaRouter.put("/" ,(req, resp, next)=>{
    let verificaobj = validate(req.body,recompensaSchemaValidate);

    if(verificaobj.errors.length > 0){
        resp.status(400).json( {'message':"Bad request " + verificaobj.errors[0].message });
    }
    else {
        recompensaModel.atualizar(req.body, (message) => {
            resp.status(201).json({'message': message});
        });
    }
});

recompensaRouter.delete("/",(req, resp, next)=>{
    recompensaModel.deletar(req.body);
});


export default recompensaRouter;