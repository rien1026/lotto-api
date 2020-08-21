import Joi from '@hapi/joi';

export class Lotto {
	public no: number;
	public ballNo1: number;
	public ballNo2: number;
	public ballNo3: number;
	public ballNo4: number;
	public ballNo5: number;
	public ballNo6: number;
	public bonusNo: number;
	public sellAmount: number;
	public firstWinnerTotalAmount: number;
	public firstsWinnerCnt: number;
	public firstWinnerAmount: number;
	public inDt: string;
}
