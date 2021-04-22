export class DateUtil {

    GetLastMonth(): number {
        const d = new Date();
		return d.getMonth() - 1;
    }

    GetLastYear(): number {
        const d = new Date();
		return d.getFullYear();
    }

    GetFirstDayByMonth(month:number,year :number): string {
        const d = new Date(year,month,1);
        d.setHours(0,0,0,0);
        return new Date(d).toISOString().substring(0,16);     
    }

    GetLastDayByMonth(month:number,year :number):string{
        return  new Date(year,month +1, 0,0,0,0).toISOString().substring(0,16);
    }

    GetDateCurrent():string{
        return  new Date().toISOString().substring(0,16);
    }

}