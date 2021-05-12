import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationOptions,
	registerDecorator,
} from 'class-validator';

import { User } from '../entities/User';

@ValidatorConstraint({ name: 'IsEmailAlreadyExist', async: true })
export class IsEmailAlreadyExistConstraint
	implements ValidatorConstraintInterface
{
	async validate(email: string) {
		const isEmailTaken = await User.findOne({ where: { email } });
		if (isEmailTaken) return false;
		return true;
	}
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsEmailAlreadyExistConstraint,
		});
	};
}
