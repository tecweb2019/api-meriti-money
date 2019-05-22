import mongoose from "mongoose";
import pessoaSchema from "../Schemas/pessoaSchema";

mongoose.connect("mongodb://localhost:27017/meriti-money", {useNewUrlParser: true})

let schema = new mongoose.Schema( pessoaSchema);

let pessoaModel = mongoose.model('Pessoa',schema);


function inserir(parans,callback) {
    let pessoa = new pessoaModel(parans);
    pessoa.save((err)=>{
        if(err)return handleError(err);
        console.log("salvei no banco ");
        callback(message);
    });

}

function atualizar(params) {

}
function deletar() {
    pessoaModel.deleteOne({nome:"novo contato"} , (err)=>{
        if(err)return handleError(err);
    console.log("pessoa deletada com sucesso!");
    });
}
function listar(parans, callback){
    pessoaModel.find(parans,(err,pessoas)=>{
        if(err)return handleError(err);
        callback(err,pessoas);
    });
}

export default {
  inserir,
  atualizar,
  deletar,
  listar,
};