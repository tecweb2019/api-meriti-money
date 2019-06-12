import express from "express";
import {validate} from "jsonschema";
import cors from "cors";
import auth from "./auth";

import transferenciaModel from "../models/transferencia-model";
import {transferenciaSchemaValidate} from "../Schemas/transferencia.schema";
import pessoaModel from "../models/pessoa-model";

const transferenciaRouter = express.Router();

transferenciaRouter.use(cors());

transferenciaRouter.post("/", auth.authenticate(), (req, resp, next) => {
    let verificaobj = validate(req.body, transferenciaSchemaValidate);

    if (verificaobj.errors.length > 0) {
        resp.status(400).json({'message': "Bad request " + verificaobj.errors[0].message});
    }
    else {
        transferenciaModel.inserir(req.body, (result, message) => {
            if (result) {
                resp.status(201).json({'message': message});
            } else {
                resp.status(500).json({'message': message});
            }
        });
    }
});

async function joinPessoaTransf(params) {
let transf;
    if(Array.isArray(params)){
        transf = await transferenciaModel.listarEnvolvido(params);
    }
    else {
        transf = await transferenciaModel.listar(params);
    }
    for (let i = 0; i < transf.length; i++) {
        transf[i].doador = await pessoaModel.pegaporid(transf[i].doador);
        transf[i].recebedor = await pessoaModel.pegaporid(transf[i].recebedor);
    }
    return transf;
}

transferenciaRouter.get("/recebidas/:recebedor", auth.authenticate(), (req, resp) => {
    console.log(req.params.recebedor);
    joinPessoaTransf({recebedor: req.params.recebedor})
        .then(resposta => {
            resp.json(resposta);
        });
});


transferenciaRouter.get("/remetidas/:doador", auth.authenticate(), (req, resp) => {
    joinPessoaTransf({doador: req.params.doador})
        .then(resposta => {
            resp.json(resposta);
        });
});

transferenciaRouter.get("/envolvido/:id", auth.authenticate(), (req, resp) => {
    joinPessoaTransf([{doador: req.params.id},{recebedor : req.params.id}])
        .then(resposta => {
            resp.json(resposta);
        });
});

transferenciaRouter.get("/", (req, resp, next) => {
    joinPessoaTransf()
        .then(resposta => {
            resp.json(resposta);
        });
});

export default transferenciaRouter;