import * as md5 from 'md5'

export class Md5 {
    public static encrypt(password: string): string {
        return md5(password, process.env.MD5_SALTKEY)
    }
}