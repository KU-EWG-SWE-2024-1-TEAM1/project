import { IsString, IsEmail, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';

export class PostUserDto {
    @IsString({ message: 'Username must be contained.' })
    name: string;
    @IsEmail({}, { message: 'invalid email address.' })
    email: string;
    @IsString({ message: 'Password must be contained.' })
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    @MaxLength(20, { message: 'Password must be at most 20 characters long.' })
    @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter.' })
    @Matches(/(?=.*[0-9])/, { message: 'Password must contain at least one number.' })
    @Matches(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character.' })
    password: string;

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