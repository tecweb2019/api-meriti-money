import { Strategy } from "passport-jwt" ;
import jwtConfig from "./../config";
import Passport from "passport";
import mongoose from "mongoose";
import { pessoaSchemaValidate } from "../Schemas/pessoa.schema";

let pessoa = new mongoose.model('pessoa',pessoaSchemaValidate);

Passport.use('login', new Strategy(jwtConfig,(payload, callback) => {

    pessoa.findById(payload.id, (err, result) => {
        if (!result) {
            return callback(null, false);
        }
        return callback(null, result);
    });
}));

function initialize() {
   return Passport.initialize();
}

function authenticate() {
    return Passport.authenticate('login', {session: false})

}

export default {
    initialize,
    authenticate
}

