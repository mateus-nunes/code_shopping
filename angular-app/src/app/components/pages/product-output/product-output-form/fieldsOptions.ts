import {FieldsOptions} from "../../../../common/fields-options";

const fieldOptions: FieldsOptions = {
    amount:{
        id: 'amount',
        label: 'Quantidade',
        validationMessage:{
            min: 1,
            required: true
        }
    },
    product_id:{
        id: 'product_id',
        label: 'Produto',
        validationMessage:{
            required: true
        }
    }
};
export default fieldOptions;