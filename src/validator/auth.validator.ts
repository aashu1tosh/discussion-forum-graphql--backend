/**
 * File: auth-inputs.ts
 * Description: This file defines input classes for authentication-related operations.
 */
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    Matches,
    NotEquals,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { ROLE } from '../constant/enum';
import { passwordRegex, phoneRegex } from '../constant/regex';

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
        message: 'Valid Phone Number Please',
    })
    phone!: string;
}

export class RegisterFields extends RegisterInput {
    @Field()
    @IsEnum(ROLE)
    role!: ROLE;
}

@InputType()
export class UpdatePasswordInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    oldPassword!: string;

    @Field()
    @IsNotEmpty()
    @NotEquals('oldPassword', {
        message: 'New Password must be different from old password dto',
    })
    @Matches(passwordRegex, {
        message:
            'New Password must contain at least one uppercase letter and one lowercase letter',
    })
    newPassword!: string;
}

@InputType()
export class CreateUserInput {
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
    @Matches(passwordRegex, {
        message:
            'New Password must contain at least one uppercase letter and one lowercase letter',
    })
    password!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    phone!: string;
}
