export const recompensaSchema = {
   // descri : Text,
    //price : Number,

    "required":[ "descri" ,"price" ],
    "type": "object",
    "properties": {
        "descri":{
            "type" : "string",
            "description" : "descrição ada recompesa a ser resgatada com moedas"
        },
        "price":{
            "type" : "number",
            "description" : "quantidade de moedas necessarias para resgatar a recompensa",
        },

    }
};
