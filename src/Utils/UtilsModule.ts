
import { Module } from '@nestjs/common';
import { DateUtil } from './Date';

@Module({ 
	providers: [DateUtil],
	exports: [DateUtil],
	imports: [DateUtil],
})
export class UtilsModule {}
