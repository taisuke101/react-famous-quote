import { Factory, Seeder } from 'typeorm-seeding';

import Quote from '../factories/quote.factory';

export class CreateQuotesSeed implements Seeder {
	public async run(factory: Factory) {
		await factory(Quote)().createMany(20);
	}
}
