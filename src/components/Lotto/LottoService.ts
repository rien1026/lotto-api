import { AppError, Constants } from '../../utils';

import { getDBInstance } from '../../configs';

const getLotto = async (lottoNo: number, attributes?: string[]) => {
	try {
		let result = await getDBInstance()
			.get({
				TableName: Constants.TABLE_NAMES.LOTTO,
				Key: {
					no: lottoNo,
				},
				AttributesToGet: attributes,
			})
			.promise();
		return result.Item;
	} catch (err) {
		new AppError('SgetLotto', err.message, err.stack);
		return {};
	}
};

const getLottoList = async ({ attributes, startNo = 0 }: { attributes?: string[]; startNo?: any }) => {
	try {
		let result = await getDBInstance()
			.scan({
				TableName: Constants.TABLE_NAMES.LOTTO,
				AttributesToGet: attributes,
				FilterExpression: 'roundNo > :roundNo',
				ExpressionAttributeValues: {
					':roundNo': startNo,
				},
			})
			.promise();
		return result.Items;
	} catch (err) {
		new AppError('SgetLottoList', err.message, err.stack);
		return [];
	}
};

const insertLotto = async (params: {}) => {
	try {
		return await getDBInstance()
			.put({
				TableName: Constants.TABLE_NAMES.LOTTO,
				Item: params,
			})
			.promise();
	} catch (err) {
		throw new AppError('SinsertLotto', err.message, err.stack);
	}
};

export const LottoService = { getLottoList, insertLotto, getLotto };
