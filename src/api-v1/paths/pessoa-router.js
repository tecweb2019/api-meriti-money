import express from "express";
import { validate } from "jsonschema";
import cors from "cors";
import auth from "./auth.js";

import pessoaModel from "../models/pessoa-model";
import {pessoaSchemaValidate} from "../Schemas/pessoa.schema";

const pessoaRouter = express.Router();

pessoaRouter.use(cors());

pessoaRouter.post("/",(req, resp)=>{
    let verificaobj = validate(req.body,pessoaSchemaValidate);
    pessoaModel.listar({"login.email":req.body.login.email},(erro,pessoa)=>{
    if(!pessoa[0]) {
        if (verificaobj.errors.length > 0) {
            resp.status(400).json({'message': "Bad request " + verificaobj.errors[0].message});
        }
        else {
            pessoaModel.inserir(req.body, (message) => {
                resp.status(201).json({'message': message});
            });
        }
    }else{
        resp.status(500).json({'message': "E-mail já cadastrado"});
    }

    })
});

pessoaRouter.get("/me",auth.authenticate(),(req,resp)=>{
    resp.status(200).json({
        status: true,
        user: req.user
    })
});

pessoaRouter.get("/:id",auth.authenticate(),(req,resp,next)=>{
    if(req.params){
       pessoaModel.pegaporid(req.params.id).then(pessoa=>{
           resp.json(pessoa);
       }).catch(error =>{
           resp.status(404).json({
               status: false,
               err : error
           });
       })
    }
});

pessoaRouter.get("/listausuarios/:email",auth.authenticate(),(req,resp,next)=>{
    if(req.params){
        pessoaModel.listaSemUsuarioLogado(req.params.email,(error,pessoa)=>{
            if(!pessoa) {
                resp.status(404).json({
                    status: false,
                    err: error
                });
            }
            resp.status(200).json(pessoa);
        })
    }
});

pessoaRouter.get("/",auth.authenticate(),(req,resp,next)=>{
    pessoaModel.listar({}, (erro, data) => {
        if (erro)
            resp.status(500).send(erro.message);
        else if (data.length > 0)
            resp.json(data);
        else
            resp.status(404).json({'message': 'nenhum registro encontrado'});
    });
});


export default pessoaRouter;