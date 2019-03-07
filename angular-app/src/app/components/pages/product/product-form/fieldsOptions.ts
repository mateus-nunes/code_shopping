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
    description:{
        id: 'description',
        label: 'Descrição',
        validationMessage:{
            minlength: 4,
            required: true
        }
    },
    price:{
        id: 'price',
        label: 'Preço',
        validationMessage:{
            min: 0.01,
            required: true
        }
    }
};
export default fieldOptions;