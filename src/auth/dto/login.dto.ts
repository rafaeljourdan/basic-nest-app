import { IsString, MinLength, MaxLength, Matches } from 'class-validator'
import { Type } from 'class-transformer'

export class LoginDto {
    @IsString()
    readonly email: string

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too weak: type at least 1 upper case letter and at 1 lower case letter and 1 number or special character' }
    )
    readonly password: string
}
