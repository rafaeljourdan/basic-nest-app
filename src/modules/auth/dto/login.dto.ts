import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator'
import { Transform } from 'class-transformer'

export class LoginDto {
    @IsEmail()
    readonly email: string

    @IsString()
    password: string
}
