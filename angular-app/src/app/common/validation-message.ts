const messages = {
    required: 'O campo :field é obrigatório',
    minlength: 'O campo :field deve ter no mínimo :min caracteres',
    maxlength: 'O campo :field deve ter no máximo :max caracteres',
    email: 'O campo :field não e um e-mail válido',
    url: 'O campo :field não é um link válido',
    date: 'O campo :field não é uma data válida'
};

export class ValidationMessage {

    static getMessage(error: string,replaceTokens: Array<any>){
        //Busca a mensagem do erro
        let message = messages[error];

        //Busca quais são os tokens a serem substituidos(:field, :min,...)
        const tokens =  message.match(/\:[a-z]+/g);

        if(tokens === null){
            return "Campo inválido";
        }

        //Substitui os tokens encontrados pelos valores informados na ordem em que foram encontrados
        tokens.forEach((token, index) => {
            message = message.replace(token, replaceTokens[index]);
        });

        return message;
    }
}