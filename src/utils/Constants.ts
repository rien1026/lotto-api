import dotenv from 'dotenv';

const PROD_MODE = (process.env['PROD_MODE'] as any) || 'local';

switch (PROD_MODE) {
	case 'local':
		dotenv.config({ path: './.env.local' });
		break;
}

const API_INFO = {
	URI: process.env['API_INFO_URI'],
	VERSION: process.env['API_INFO_VERSION'],
};

const DB_CONFIG = {
	REGION: process.env['DB_REGION'],
};

const TABLE_NAMES = {
	LOTTO: process.env['TABLE_LOTTO'],
};

export const Constants = { PROD_MODE, DB_CONFIG, TABLE_NAMES, API_INFO };
