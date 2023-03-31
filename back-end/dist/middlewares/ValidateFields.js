import { AppError } from '../errors/AppError.js';
class ValidateFields {
    requiredFields = {
        vehicle: ['plate', 'renavam', 'color', 'power', 'model', 'brand', 'year_launch', 'state'],
        supply: ['qtd', 'type_fuel', 'value', 'vehiclePlate'],
        token: ['cpf', 'password'],
        register: ['cpf', 'password'],
    };
    validate = (req, res, next) => {
        const currentRoute = req.originalUrl.split('/').pop() ?? '';
        const requiredFields = this.requiredFields[currentRoute];
        const missingFields = requiredFields.filter(field => !(field in req.body));
        if (missingFields.length) {
            return next(new AppError(`Campos obrigatórios ausentes: ${missingFields.join(', ')}.`));
        }
        return next();
    };
}
export default new ValidateFields().validate;
//# sourceMappingURL=ValidateFields.js.map