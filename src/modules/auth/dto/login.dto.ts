import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator'
import { Transform } from 'class-transformer'
import * as md5 from 'md5'
import { JWT } from './../../../shared/constants'

export class LoginDto {
    @IsEmail()
    readonly email: string

    @IsString()
    password: string
}
