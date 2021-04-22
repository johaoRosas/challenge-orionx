import { Controller, Get } from "@nestjs/common";
import { SearchService } from "src/Domain/Services/SearchService";

@Controller('search')
export class SearchController {
	constructor(
		private readonly searchService: SearchService
	){}


	@Get()
	public async get(): Promise<any> {

	 	const spreadLastMonth=  await this.searchService.GetSpreadLastMonth('BTC');
	 	const relativeStrengthIndex =  await this.searchService.GetRelativeStrengthIndex('BTC');
	 	const GetpriceHistory =  await this.searchService.GetpriceHistory('BTC');

		 return { spreadLastMonth, relativeStrengthIndex , GetpriceHistory  }
	}
}
