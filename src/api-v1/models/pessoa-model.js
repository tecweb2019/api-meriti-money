import mongoose from "mongoose";
import {pessoaSchemaDb, pessoaSchemaValidate} from "../Schemas/pessoa.schema";
import {configdb} from "../../../config/config-db";

//mongoose.connect("mongodb://localhost:27017/meriti-money", {useNewUrlParser: true});
mongoose.connect(configdb.stringConnection, {useNewUrlParser: true});

let schema = new mongoose.Schema(pessoaSchemaValidate);

let pessoaModel = mongoose.model('Pessoa', schema);


function inserir(parans, callback) {
    let pessoa = new pessoaModel(parans);
    pessoa.save((err) => {
        if (err) return handleError(err);
        let message = "Pessoa inserida com sucesso";
        callback(message);
    });
}

function atualizar(params) {

}

function deletar() {
    pessoaModel.deleteOne({nome: "novo contato"}, (err) => {
        if (err) return handleError(err);
        console.log("pessoa deletada com sucesso!");
    });
}

function listar(parans, callback) {
    pessoaModel.find(parans, (err, pessoas) => {
        if (!pessoas || err) {
            err = "não foi possivelretornar";
            pessoas = null;
        }
        callback(err, pessoas);
    });
}


function listaSemUsuarioLogado(email, callback) {
    pessoaModel.find({"login.email": {$ne: email}}, (err, pessoas) => {
        if (!pessoas || err) {
            err = "não foi possivelretornar";
            pessoas = null;
        }
        callback(err, pessoas);
    });
}

async function debitacoins(idDoador, valorTransferido) {
    let restante;
    let pessoa = await pessoaModel.findById(idDoador);
            let saldo = pessoa.qtdcoinstransf;
            if (saldo >= valorTransferido) {
                restante = saldo - valorTransferido;
                pessoaModel.updateOne({_id: idDoador}, {qtdcoinstransf: restante}, (err, result) => {
                });
                return true;
            }
        return false;
}

function creditacoins(idRecebedor, valorTranferido) {
    let valorCreditado;
    pessoaModel.findById(idRecebedor, (err, pessoa) => {
        let valorAtual = pessoa.qtdcoins;
        valorCreditado = valorAtual + valorTranferido;
        pessoaModel.updateOne({_id: idRecebedor}, {qtdcoins: valorCreditado}, (err, result) => {

        });
    });
}

function pegaporid(id) {
    let promisse = new Promise((resolve, reject) => {
        let pessoa = pessoaModel.findById(id, (err, pessoa) => {
        }).select({_id: 1 , nome: 1 , "login.email":1});
        if (!pessoa) {
            resolve(null);
            reject("Usuario não encontrado");
        }
        else {
            resolve(pessoa);
            reject(null);
        }
    });
    return promisse;
}


function verificaSenha(passwordBody, senhaBanco, callback) {
    let result = passwordBody === senhaBanco ? true : false;
    let err = null;
    if (!result) {
        err = {message: "senha incorreta"};
    }
    return callback(err, result);
}


export default {
    inserir,
    atualizar,
    deletar,
    listar,
    pegaporid,
    verificaSenha,
    listaSemUsuarioLogado,
    debitacoins,
    creditacoins,
};