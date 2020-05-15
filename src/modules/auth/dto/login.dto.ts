import { IsString, IsEmail } from 'class-validator'

export class LoginDto {
    @IsEmail()
    readonly email: string

    @IsString()
    password: string
}
