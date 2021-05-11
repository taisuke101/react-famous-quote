import { define } from 'typeorm-seeding';
import * as Faker from 'faker/locale/ja';

import { Quote } from '../../entities/Quote';

define(Quote, (faker: typeof Faker): Quote => {
	const quote = new Quote();
	quote.author = 'テスト';
	quote.country = faker.internet.userName();
	quote.job = faker.name.jobType();
	quote.text = faker.name.jobDescriptor();
	quote.likeCount = faker.random.number();
	quote.category = faker.name.jobType();

	return quote;
});

export default Quote;
