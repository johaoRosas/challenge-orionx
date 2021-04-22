import { Module } from '@nestjs/common';
import { DomainModule } from '../Domain/DomainModule';
import { SearchController } from './Search/SearchController';

@Module({
	controllers: [
		SearchController	
	],
	imports: [DomainModule]
})
export class ApiModule {}
