import { Module } from '@nestjs/common';
import { ApiModule } from './API/ApiModule';
import { UtilsModule } from './Utils/UtilsModule';
import { DomainModule } from './Domain/DomainModule'; 

@Module({
  imports: [ 
	ApiModule,
	UtilsModule,
	DomainModule
  ],
})
export class AppModule {}
