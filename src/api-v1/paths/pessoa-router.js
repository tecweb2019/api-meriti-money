import express from "express";
import {validate} from "jsonschema";

import pessoaModel from "../models/pessoa-model";
import {pessoaSchemaValidate} from "../Schemas/pessoa.schema";

const pessoaRouter = express.Router();

pessoaRouter.post("/" ,(req, resp, next)=>{
    let verificaobj = validate(req.body,pessoaSchemaValidate);

    if(verificaobj.errors.length > 0){
        resp.status(400).json( {'message':"Bad request " + verificaobj.errors[0].message });
    }
    else {
        pessoaModel.inserir(req.body, (message) => {
            resp.status(201).json({'message': message});
        });
    }
});

pessoaRouter.get("/",(req,resp,next)=>{
    pessoaModel.listar({},(erro,data)=>{
        if(erro)
            resp.status(500).send(erro.message);
        else
        if(data.length > 0 )
            resp.json(data);
        else
            resp.status(404).json({'message': 'nenhum registro encontrado'});
    });
});


export default pessoaRouter;