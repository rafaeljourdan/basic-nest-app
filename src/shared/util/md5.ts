import * as md5 from 'md5'
import config from './../contants'

class Md5 {
    public encrypt(password: string): string {
        return md5(password, config['MD5_SALTKEY'])
    }
}

export default new Md5()