import mongoose from "mongoose";
import {transferenciaSchemaDb} from "../Schemas/transferencia.schema";
import pessoamodel from "./pessoa-model";
import {configdb} from "../../../config/config-db";

mongoose.connect(configdb.stringConnection, {useNewUrlParser: true});

let transferenciaschema = new mongoose.Schema( transferenciaSchemaDb);
let transferenciaModel = mongoose.model('transferencias',transferenciaschema);


function inserir(parans,callback) {
    let transferencia = new transferenciaModel(parans);
    let debitou = pessoamodel.debitacoins(parans.doador,parans.qtdcoinstransf);
    if(debitou){
        pessoamodel.creditacoins(parans.recebedor,parans.qtdcoinstransf);
        transferencia.save((err)=>{
            if(err)return handleError(err);
            callback(true,"Tranferencia realizada com sucesso!");
        });
    }
    else{
        callback(false , "Saldo insulficiente!");
    }
}

function listarEnvolvido(parans){
    let promise = new Promise((resolve,reject)=>{
        let trasnf = transferenciaModel.find(parans,(err,transferencias)=>{
            if(err)return handleError(err);
        });
        resolve(trasnf);
    });
    return promise;
}

function listar(parans){
    let promise = new Promise((resolve,reject)=>{
        let trasnf = transferenciaModel.find({},(err,transferencias)=>{
            if(err)return handleError(err);
        }).or(params);
        resolve(trasnf);
    });
    return promise;
}
export default {
    inserir,
    listar,
    listarEnvolvido
};