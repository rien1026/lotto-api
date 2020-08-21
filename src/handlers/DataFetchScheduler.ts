import { AppError } from '../utils';
import fetch from 'node-fetch';
import { Lotto, LottoService } from '../components/Lotto';

export const dataFetchScheduler = async (event) => {
	try {
		const fetchDataList = async () => {
			let startNo = 1;
			let endNo = 1;
			for (let i = startNo; i <= endNo; i++) {
				let result = await fetch('https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=' + i);
				let dataJson = await result.json();
				let data = {
					no: dataJson['drwNo'],
					ballNo1: dataJson['drwtNo1'],
					ballNo2: dataJson['drwtNo2'],
					ballNo3: dataJson['drwtNo3'],
					ballNo4: dataJson['drwtNo4'],
					ballNo5: dataJson['drwtNo5'],
					ballNo6: dataJson['drwtNo6'],
					bonusNo: dataJson['bnusNo'],
					firstWinnerAmount: dataJson['firstWinamnt'],
					firstWinnerTotalAmount: dataJson['firstAccumamnt'],
					firstsWinnerCnt: dataJson['firstPrzwnerCo'],
					inDt: dataJson['drwNoDate'],
					sellAmount: dataJson['totSellamnt'],
				} as Lotto;
				await LottoService.insertLotto(data);
			}
		};
	} catch (err) {
		return new AppError('dataFetchScheduler', err.message, err.stack);
	}
};
