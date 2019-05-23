import mongoose from "mongoose";
import {recompensaSchemaDb } from "../Schemas/recompensa.schema";

mongoose.connect("mongodb://localhost:27017/meriti-money", {useNewUrlParser: true})

let schema = new mongoose.Schema(recompensaSchemaDb);

let recompensaModel = mongoose.model('recompensa',schema);


function inserir(parans,callback) {
    let recompensa = new recompensaModel(parans);
    recompensa.save((err)=>{
        if(err)return handleError(err);
        let message = "recompensa salva com sucesso!";
        callback(message);
    });
}

function deletar(obj){
    recompensaModel.deleteOne(obj,(err)=>{
        if(err)return handleError(err);
        console.log("recompensa deletada com sucesso!");
    });
}
function listar(parans, callback){
    recompensaModel.find(parans,(err,recompensas)=>{
        if(err)return handleError(err);
        callback(err,recompensas);
    });
}

function atualizar(obj){
    recompensaModel.find( {_id : obj._id }, obj , (err,data)=>{
        if(err) return hadleError(err);
    });
}

export default {
    inserir,
    atualizar,
    deletar,
    listar,
};
