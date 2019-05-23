export const transferenciaSchemaValidate = {
 //   doador : String,
  //  recebedor : String,
   // qtdcoinstransf : Number,
   // motivo : Text

    "required":[ "doador" , "recebedor" , "qtdcoinstransf" , "motivo"],
    "type": "object",
    "properties": {
        "doador":{
            "type" : "string",
            "description" : "_id da pessoa que doou as moedas"
        },
        "recebedor":{
            "type" : "string",
            "description" : "_id da pessoa que recebeu as moedas"
        },
        "qtdcoinstransf":{
            "type" : "number",
            "description" : "quantidade de moedas que a pessoa pode transferir para outras pessoas",

        },
        "motivo":{
            "type" : "string",
            "description" : "Motivo pelo o qual a pessoa doou as moedas para o outro"
        }
    }
};

export const transferenciaSchemaDb = {
    "doador": String ,
    "recebedor": String ,
    "qtdcoinstransf": Number,
    "motivo": String
};

