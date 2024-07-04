/**
 * File: auth.resolver.ts
 * Description: This file defines a GraphQL resolver for authentication-related operations.
 */

import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { AppDataSource } from '../config/database.config';
import { Auth } from '../entities/auth/auth.entity';
import { UserLoginSchema } from '../schema/auth.schema';
import { UserSchema } from '../schema/user.schema';
import AuthService from '../services/auth.service';
import { LoginInput } from '../validator/auth.validator';

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
}
