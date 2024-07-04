/**
 * File: auth-inputs.ts
 * Description: This file defines input classes for authentication-related operations.
 */
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { ROLE } from '../constant/enum';
import { phoneRegex } from '../constant/regex';

/**
 * @class LoginInput
 * @description Represents input for user login.
 */
@InputType()
export class LoginInput {
    @Field()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password!: string;
}


@InputType()
export class RegisterInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    name!: string;

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @Matches(phoneRegex, {
        message:
            'Valid Phone Number Please',
    })
    phone!: string;

    @Field()
    @IsNotEmpty()
    @IsEnum(ROLE)
    role!: ROLE;
}