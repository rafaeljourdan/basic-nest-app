import { IsOptional, IsArray, IsString, IsEmail, MinLength, MaxLength, Matches, IsBoolean, IsIn } from 'class-validator'

export class CreateUserDto {
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
        { message: 'Password too weak: type at least 1 upper case letter, 1 lower case letter and 1 number/special character' }
    )
    password: string

    @IsBoolean()
    @IsIn([true], { message: 'You need to accept the terms and conditions.' })
    readonly flagTermsAccepted: boolean

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    readonly roles: string[]
}
