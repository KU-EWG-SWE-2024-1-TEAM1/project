import {IsString, IsEmail, IsOptional} from 'class-validator';

export class PostUserDto {
    @IsString({ message: 'Username must be contained.' })
    name: string;
    @IsEmail({}, { message: 'invalid email address.' })
    email: string;

}
export class UpdateUserDto {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly email?: string;
}

export class ResponseUserDto {
    id: number;
    name: string;
    email: string;
}

export class AuthorUserDto {
    id: number;
    name: string;
}