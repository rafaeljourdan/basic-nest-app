import { IsOptional, IsArray, IsString } from "class-validator";
import { SignupDto } from "src/modules/auth/dto";

export class CreateUserDto extends SignupDto {
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    readonly roles: string[]
}