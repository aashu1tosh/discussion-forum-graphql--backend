/**
 * File: auth-inputs.ts
 * Description: This file defines input classes for authentication-related operations.
 */
import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

/**
 * @class LoginInput
 * @description Represents input for user login.
 */
@InputType()
export class LoginInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    email!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password!: string;
}
