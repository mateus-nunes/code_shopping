import {FieldsOptions} from "../../../../common/fields-options";

const fieldOptions: FieldsOptions = {
    name:{
        id: 'name',
        label: 'Nome',
        validationMessage:{
            maxlength: 255,
            required: true
        }
    },
    email:{
        id: 'email',
        label: 'E-mail',
        validationMessage:{
            required: true,
            email: true
        }
    },
    password:{
        id: 'password',
        label: 'Senha',
        validationMessage:{
            minlength: 4
        }
    },
    password_confirmation:{
        id: 'password_confirmation',
        label: 'Confirmação de senha',
        validationMessage:{
            minlength: 4
        }
    }
};
export default fieldOptions;