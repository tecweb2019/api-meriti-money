import mongoose from "mongoose";
import {transferenciaSchemaDb} from "../Schemas/transferencia.schema";
import {debitacoins ,creditacoins} from "./pessoa-model";
import {configdb} from "../../../config/config-db";

mongoose.connect(configdb.stringConnection, {useNewUrlParser: true});

let transferenciaschema = new mongoose.Schema( transferenciaSchemaDb);
let transferenciaModel = mongoose.model('transferencias',transferenciaschema);


function inserir(parans,callback) {
    let transferencia = new transferenciaModel(parans);
    debitacoins(parans.doador,parans.qtdcoinstransf);
    creditacoins(parans.recebedor,parans.qtdcoinstransf);
    transferencia.save((err)=>{
        if(err)return handleError(err);
        let message = "Tranferencia realizada com sucesso!";
        callback(message);
    });

}
function listar(parans, callback){
    transferenciaModel.find(parans,(err,transferencias)=>{
        if(err)return handleError(err);
        callback(err,transferencias);
    });
}




export default {
    inserir,
    listar,
};