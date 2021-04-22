
import { Module,HttpModule } from '@nestjs/common';
import { UtilsModule } from 'src/Utils/UtilsModule';
import { SearchService } from './SearchService';

@Module({
	imports: [
		HttpModule,
		UtilsModule
	],
	providers: [SearchService],
	exports: [SearchService],
})
export class ServiceModule {}
