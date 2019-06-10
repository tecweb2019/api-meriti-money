
 export const pessoaSchemaValidate = {

     nome: {
         type: String,
         description: "nome da pessoa a ser cadastrada",
         required: true
     },
     qtdcoinstransf: {
         type: Number,
         description: "quantidade de moedas que a pessoa pode transferir para outras pessoas",

     },
     qtdcoins: {
         type: Number,
         description: "quantidade de moedas recebidas de outras pessaos e que podem ser trocadas por recompensas"
     },
     login: {
         email: {
             type: String,
             required: true
         },
         senha: {
             type: String,
             required: true
         }
     }
};

export const pessoaSchemaDb = {
    nome: String,
    qtdcoinstransf: Number,
    qtdcoins: Number
}

