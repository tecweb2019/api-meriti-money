import express from "express";
import {validate} from "jsonschema";

import transferenciaModel from "../models/transferencia-model";
import {transferenciaSchemaValidate} from "../Schemas/transferencia.schema";

const transferenciaRouter = express.Router();

transferenciaRouter.put("/" ,(req, resp, next)=>{
    let verificaobj = validate(req.body,transferenciaSchemaValidate);

    if(verificaobj.errors.length > 0){
        resp.status(400).json( {'message':"Bad request " + verificaobj.errors[0].message });
    }
    else {
        transferenciaModel.inserir(req.body, (message) => {
            resp.status(201).json({'message': message});
        });
    }
});

transferenciaRouter.get("/",(req,resp,next)=>{
    transferenciaModel.listar({},(erro,data)=>{
        if(erro)
            resp.status(500).send(erro.message);
        else
        if(data.length > 0 )
            resp.json(data);
        else
            resp.status(404).json({'message': 'nenhum registro encontrado'});
    });
});


export default transferenciaRouter;