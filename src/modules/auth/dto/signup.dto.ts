import { IsString, IsBoolean, IsIn, IsOptional, MinLength, MaxLength, Matches, IsEmail } from 'class-validator'

export class SignupDto {
    @IsOptional()
    @IsString()
    readonly country?: string

    @IsOptional()
    @IsString()
    readonly language?: string

    @IsString()
    readonly fullname: string

    @IsEmail()
    readonly email: string

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too weak: type at least 1 upper case letter and at 1 lower case letter and 1 number or special character' }
    )
    password: string

    @IsBoolean()
    @IsIn([true], { message: `You need to accept the terms and conditions.` })
    readonly flagTermsAccepted: boolean
}
