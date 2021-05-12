import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

import { User } from '../entities/User';

@ValidatorConstraint({ name: 'IsUserAlreadyExist', async: true })
export class IsUserAlreadyExistConstraint
	implements ValidatorConstraintInterface
{
	async validate(username: string) {
		const isUserTaken = await User.findOne({ where: { username } });
		if (isUserTaken) return false;
		return true;
	}
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsUserAlreadyExistConstraint,
		});
	};
}
