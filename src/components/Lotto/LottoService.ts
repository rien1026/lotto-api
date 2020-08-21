import { AppError, Constants } from '../../utils';

import { getDBInstance } from '../../configs';

const getLottoList = async ({ attributes }: { attributes?: string[]; limit?: number; offset?: number }) => {
	try {
		let result = await getDBInstance()
			.scan({
				TableName: Constants.TABLE_NAMES.LOTTO,
				AttributesToGet: attributes,
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

export const LottoService = { getLottoList, insertLotto };
