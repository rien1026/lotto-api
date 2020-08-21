import Koa from 'koa';
import { AppError } from '../../utils/AppError';
import { LottoService } from './LottoService';

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
		let lottoList = await LottoService.getLottoList({});

		ctx.status = 200;
		ctx.body = { msg: 'suc', data: lottoList };
	} catch (err) {
		throw new AppError('CgetLottoList', err.message, err.stack, {
			errCode: err.errCode,
			responseCode: err.responseCode,
		});
	}
};

export const LottoController = { getLottoList };
