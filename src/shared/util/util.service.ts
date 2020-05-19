import { NotFoundException } from '@nestjs/common'

import * as md5 from 'md5'
import config from './../contants'

export class UtilService {
    public static isRegisterNotFound(register: any): void {
        if (!register) {
            throw new NotFoundException('Register not found')
        }
		}

		public static encrypt(password: string): string {
			return md5(password, config['MD5_SALTKEY'])
	}
}
