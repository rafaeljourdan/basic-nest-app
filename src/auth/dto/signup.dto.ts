import { IsString, IsBoolean, IsIn, IsOptional, MinLength, MaxLength, Matches } from 'class-validator'
import { Type } from 'class-transformer'

export class SignupDto {
    @IsOptional()
    @IsString()
    readonly country?: string

    @IsOptional()
    @IsString()
    readonly language?: string

    @IsString()
    readonly fullname: string

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

    @IsBoolean()
    @IsIn([true], { message: `You need to accept the terms and conditions.` })
    readonly flagTermsAccepted: boolean
}
