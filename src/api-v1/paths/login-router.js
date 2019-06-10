import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import jwtSimple from 'jwt-simple';
import jwtConfig from'./../config';

import { pessoaSchemaValidate } from "../Schemas/pessoa.schema";
import pessoaModel from "../models/pessoa-model";

const loginRouter = express.Router();

loginRouter.use(cors());

let pessoa = new mongoose.model('pessoas',pessoaSchemaValidate);

loginRouter.post("/token",(req ,resp)=>{
let { email } = req.body;

pessoa.findOne({ "login.email": email },(erro , user)=>{

     if(!user){
         return resp.status(404).json({
             status: false,
             err :{ message :'usuario não cadastrado !'}
         })
     }

   pessoaModel.verificaSenha(req.body.senha, user.login.senha,(err,result)=>{
        if(!result || err){
            return resp.status(404).json({
                status: false,
                err : err
            })
        }

        let token  = jwtSimple.encode({id: user._id},jwtConfig.secretOrKey);
        return resp.status(200).json({
            status: true,
            token
        })

    })
})

});



export default loginRouter;