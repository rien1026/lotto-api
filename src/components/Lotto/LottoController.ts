import Koa from 'koa';
import { AppError } from '../../utils/AppError';
import { LottoService } from './LottoService';
import { LottoNoPathParam, LottoQueryParams } from './Lotto';

/**
 * @swagger
 * components:
 *   schemas:
 *     LottoSchema:
 *       type: object
 *       properties:
 *         no:
 *           type: integer
 *
 * /Lottos/:lottoNo:
 *   get:
 *     tags: [Lotto]
 *     responses:
 *       200:
 *         description: SUC
 *         type: object
 *         properties:
 *           msg:
 *             type: string
 *             example: suc
 *           data:
 *             type: array
 *             items:
 *               $ref: '#components/schemas/LottoSchema'
 *
 */
const getLotto = async (ctx: Koa.Context) => {
	try {
		let pathParam = await LottoNoPathParam.validateAsync({ lottoNo: ctx.params.lottoNo });
		let lotto = await LottoService.getLotto(pathParam.lottoNo);

		ctx.status = 200;
		ctx.body = { msg: 'suc', data: lotto };
	} catch (err) {
		throw new AppError('CgetLotto', err.message, err.stack, {
			errCode: err.errCode,
			responseCode: err.responseCode,
		});
	}
};

/**
 * @swagger
 * components:
 *   schemas:
 *     LottoListItemSchema:
 *       type: object
 *       properties:
 *         no:
 *           type: integer
 *
 * /Lottos:
 *   get:
 *     tags: [Lotto]
 *     parameters:
 *       - $ref: '#components/parameters/LottoQueryStartNo'
 *     responses:
 *       200:
 *         description: SUC
 *         type: object
 *         properties:
 *           msg:
 *             type: string
 *             example: suc
 *           data:
 *             type: array
 *             items:
 *               $ref: '#components/schemas/LottoListItemSchema'
 *
 */
const getLottoList = async (ctx: Koa.Context) => {
	try {
		let queryParams = await LottoQueryParams.validateAsync(ctx.request.query);
		let lottoList = await LottoService.getLottoList({ startNo: queryParams.startNo });

		ctx.status = 200;
		ctx.body = { msg: 'suc', data: lottoList };
	} catch (err) {
		throw new AppError('CgetLottoList', err.message, err.stack, {
			errCode: err.errCode,
			responseCode: err.responseCode,
		});
	}
};

export const LottoController = { getLottoList, getLotto };
