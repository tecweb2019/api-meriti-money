import mongoose from "mongoose";
import recompensaSchema from "../Schemas/transferencia.schema";

mongoose.connect("mongodb://localhost:27017/meriti-money", {useNewUrlParser: true})

let schema = new mongoose.Schema( recompensaSchema);

let recompensaModel = mongoose.model('recompensa',schema);


function inserir(parans,callback) {
    let recompensa = new recompensaModel(parans);
    recompensa.save((err)=>{
        if(err)return handleError(err);
        console.log("salvei no banco ");
        callback(message);
    });
}

function atualizar(params) {

}

function deletar() {
    recompensaModel.deleteOne({} , (err)=>{
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

export default {
    inserir,
    atualizar,
    deletar,
    listar,
};
