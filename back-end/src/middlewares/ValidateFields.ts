import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

interface RequiredFields {
  [key: string]: string[];
}

class ValidateFields {
  requiredFields: RequiredFields = {
    vehicle: ['plate', 'renavam', 'color', 'power', 'model', 'brand', 'year_launch', 'state'],
    supply: ['qtd', 'type_fuel', 'value', 'vehiclePlate'],
    token: ['cpf', 'password'],
    register: ['cpf', 'password'],
  };

  validate = (req: Request, res: Response, next: NextFunction) => {
    const currentRoute = req.originalUrl.split('/').pop() ?? '';
    console.log(currentRoute);
    
    const requiredFields = this.requiredFields[currentRoute];

    const missingFields = requiredFields.filter(field => !(field in req.body));
    if (missingFields.length) {
      return next(new AppError(`Campos obrigatórios ausentes: ${missingFields.join(', ')}.`));
    }

    return next();
  };
}

export default new ValidateFields().validate;