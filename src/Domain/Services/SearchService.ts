import { HttpService, Injectable } from "@nestjs/common";
import { DateUtil } from "src/Utils/Date";
import { DomainException } from "../Exceptions/DomainException";
import { Result } from "../Models/Result";

@Injectable()
export class SearchService {
	constructor(
		private readonly httpService: HttpService,
		private readonly dateUtil: DateUtil
	) { }

	public async GetData(from: string, to: string, type: string): Promise<Result> {
		const response = await this.httpService.get('https://production.api.coindesk.com/v2/price/values/' + type + '?start_date=' + from + '&end_date=' + to).toPromise();
		if (!response.data.data) {
			throw new DomainException('error al obtener Data');
		}
		return response.data.data;
	}

	//obteno el spread del ultimo mes
	//para esto estoy tomando de dos en dos 
	//se resta el de mayor fecha al de menor fecha
	//para luego sacar el promedio del ultimo mes
	public async GetSpreadLastMonth(type: string): Promise<any> {
		const month = this.dateUtil.GetLastMonth();
		const year = this.dateUtil.GetLastYear();
		const firsDate = this.dateUtil.GetFirstDayByMonth(month, year);
		const lastDate = this.dateUtil.GetLastDayByMonth(month, year);
		const response = await this.GetData(firsDate, lastDate, type);

		const arrayAverage = [];

		for (let index = 0; index < response.entries.length / 2; index++) {

			arrayAverage.push(response.entries[(index * 2) + 1][1] - response.entries[index * 2][1])

		}

		const average = arrayAverage.reduce(function (avg, value, _, { length }) {
			return avg + value / length;
		}, 0);

		return   average  ;

	}

	//obtengo el historial de precio del bitcoin
	//la fecha esta en formato Timestamp
	//si este array le paso a algun chart , te mostraria el precio por fecha desde el año 2013 hasta la actualidad

	public async GetRelativeStrengthIndex(type: string): Promise<any> {

		const firsDate = '2013-10-01T00:00';
		const lastDate = this.dateUtil.GetDateCurrent();
		const response = await this.GetData(firsDate, lastDate, type);
		const arrayRSI = [];
		const data = response.entries;
		for (let i = 0; i < data.length; i++) {
			arrayRSI[i] = {
				t: data[i][0],
				y: data[i][1]
			}
		} 
		return    arrayRSI  
	}


	//obtengo el precio minimo y maximo desde el inicio del bitcoin
	//obtengo el porcentaje de crecimiento del bitcoin desde su creación
	public async GetpriceHistory(type: string): Promise<any> {

		const firsDate = '2013-10-01T00:00';
		const lastDate = this.dateUtil.GetDateCurrent();
		const response = await this.GetData(firsDate, lastDate, type);
		const arrayTotal = [];
		const data = response.entries;
		for (let i = 0; i < data.length; i++) {
			arrayTotal.push(data[i][1])
		} 

		const maximum = arrayTotal.sort((a, b) => b - a)[0];
		const minimum = arrayTotal.sort((a, b) => a - b)[0];

		const growthRate = maximum*100/minimum;


		return { max : maximum, min : minimum, growthRate : growthRate }  
	}

}

