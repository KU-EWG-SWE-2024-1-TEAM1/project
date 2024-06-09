import {IsString, IsEmail, IsOptional} from 'class-validator';

export class PostUserDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;

    nickName:string;
}
export class UpdateUserDto {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly email?: string;
}