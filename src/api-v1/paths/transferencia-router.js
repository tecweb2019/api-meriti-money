import express from "express";
import {validate} from "jsonschema";
import cors from "cors";

import transferenciaModel from "../models/transferencia-model";
import {transferenciaSchemaValidate} from "../Schemas/transferencia.schema";
import pessoaModel from "../models/pessoa-model";
const transferenciaRouter = express.Router();

transferenciaRouter.use(cors());

transferenciaRouter.post("/" ,(req, resp, next)=>{
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
    joinPessoaTransf()
        .then(resposta =>{
            resp.json(resposta);
        });
});

 async function joinPessoaTransf(){

     let transf = await transferenciaModel.listar();

     for(let i = 0;i < transf.length;i++){

         //transf[i].doador = await pessoaModel.pegaporid(transf[i].doador);
         transf[i].recebedor = await pessoaModel.pegaporid(transf[i].recebedor);
     }
     return transf;
}

export default transferenciaRouter;