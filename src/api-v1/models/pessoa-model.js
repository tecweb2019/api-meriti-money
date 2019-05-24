import mongoose from "mongoose";
import {pessoaSchemaDb} from "../Schemas/pessoa.schema";
import {configdb} from "../../../config/config-db";

//mongoose.connect("mongodb://localhost:27017/meriti-money", {useNewUrlParser: true});
mongoose.connect(configdb.stringConnection, {useNewUrlParser: true});

let schema = new mongoose.Schema( pessoaSchemaDb);

let pessoaModel = mongoose.model('Pessoa',schema);


function inserir(parans,callback) {
    let pessoa = new pessoaModel(parans);
    pessoa.save((err)=>{
        if(err)return handleError(err);
        let message = "Pessoa inserida com sucesso";
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
export function debitacoins(idDoador ,valorTranferido) {

    let valorDebitado;
    pessoaModel.findById(idDoador,(err,pessoa)=>{
        if(err)return handleError(err);
        let valorAtual = pessoa.qtdcoinstransf;
        valorDebitado = valorAtual - valorTranferido;
        pessoaModel.updateOne({ _id: idDoador },{qtdcoinstransf: valorDebitado },(err,result)=>{
    });
    });
}
export function creditacoins(idRecebedor ,valorTranferido) {
     let valorCreditado;
     pessoaModel.findById(idRecebedor,(err,pessoa)=> {
         let valorAtual = pessoa.qtdcoins;
         valorCreditado = valorAtual + valorTranferido;
         pessoaModel.updateOne({ _id: idRecebedor },{ qtdcoins: valorCreditado },(err,result)=>{

         });
     });
}
export default {
  inserir,
  atualizar,
  deletar,
  listar,
};