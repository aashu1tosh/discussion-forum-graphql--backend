/**
 * File: auth.resolver.ts
 * Description: This file defines a GraphQL resolver for authentication-related operations.
 */

import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { AppDataSource } from '../config/database.config';
import { Auth } from '../entities/auth/auth.entity';
import { RequestValidator } from '../middleware/RequestValidator';
import { UserLoginSchema } from '../schema/auth.schema';
import { UserSchema } from '../schema/user.schema';
import AuthService from '../services/auth.service';
import {
    LoginInput,
    RegisterInput,
    UpdatePasswordInput,
} from '../validator/auth.validator';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authRepo = AppDataSource.getRepository(Auth),
        private readonly authService = AuthService
    ) {}

    @Query(() => [String])
    async getEmails(): Promise<string[]> {
        // const authRepository = getRepository(Auth);
        const auths = await this.authRepo.find();
        return auths.map((auth) => auth.email);
    }

    @Mutation(() => UserLoginSchema)
    async login(@Arg('data') data: LoginInput): Promise<UserLoginSchema> {
        const response = await this.authService.loginUser(data);
        const accessToken = response.token;
        return {
            accessToken: accessToken,
            user: response.user as UserSchema,
        };
    }

    @Mutation(() => String)
    async createUser(@Arg('data') data: RegisterInput): Promise<string> {
        const response = await this.authService.createUser(data);
        return 'User register successful';
    }

    @Mutation(() => String)
    @UseMiddleware(RequestValidator.validate(UpdatePasswordInput))
    async updatePassword(
        @Arg('data') data: UpdatePasswordInput
    ): Promise<string> {
        // const response = await this.authService.updatePassword(data);
        return 'Password Change Successfully';
    }
}
