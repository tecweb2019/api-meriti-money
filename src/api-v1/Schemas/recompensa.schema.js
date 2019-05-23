export const recompensaSchemaValidate = {


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

export const recompensaSchemaDb = {
    descri : String,
    price : Number,
} ;

