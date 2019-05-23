
 export const pessoaSchemaValidate = {
     "required":[ "nome" ],
     "type": "object",
     "properties": {
         "nome":{
             "type" : "string",
             "description" : "nome da pessoa a ser cadastrada"
         },
         "qtdcoinstransf":{
             "type" : "number",
             "description" : "quantidade de moedas que a pessoa pode transferir para outras pessoas",

         },
         "qtdcoins":{
             "type" : "number",
             "description" : "quantidade de moedas recebidas de outras pessaos e que podem ser trocadas por recompensas"
         }
     }
};

export const pessoaSchemaDb = {
    nome: String,
    qtdcoinstransf: Number,
    qtdcoins: Number
}

