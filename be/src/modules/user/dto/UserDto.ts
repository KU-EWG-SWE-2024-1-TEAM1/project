import { IsString, IsEmail, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';
import { Field } from "../../../utils/mapper/FieldNameExtractor";

export class PostUserDto {
    @IsString({ message: 'Name must be contained.' })
    name: string;

    @IsString({ message: 'Nickname must be contained.' })
    nickname: string;

    @IsEmail({}, { message: 'Invalid email address.' })
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
    readonly nickname?: string;

}

export class ResponseUserDto {
    @Field
    id: number;
    @Field
    name: string;
    @Field
    nickname: string;
    @Field
    email: string;
}

export class AuthorUserDto {
    @Field
    id: number;
    @Field
    nickname: string;
}