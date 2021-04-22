import { Module } from '@nestjs/common';
import { ServiceModule } from './Services/ServiceModule';

@Module({
	imports: [
		
		ServiceModule
	],
	exports: [
		ServiceModule,
		DomainModule
	],
})
export class DomainModule {}
