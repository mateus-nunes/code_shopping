import {FieldsOptions} from "../../../../common/fields-options";

const fieldOptions: FieldsOptions = {
    name:{
        id: 'name',
        label: 'Nome',
        validationMessage:{
            maxlength: 255
        }
    },
    active:{
        id: 'active',
        label: 'Ativo'
    }
};
export default fieldOptions;