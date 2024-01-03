import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

export class createUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    age: number;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(["ADMIN", "INTERN"], {
        message: "Valid role required"
    })
    role: "ADMIN" | "INTERN";
}