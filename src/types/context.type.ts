/**
 * File: IContext.ts
 * Description: This file defines the structure of the `IContext` interface, which represents the context object for GraphQL resolvers.
 */

import { type Request, type Response } from 'express';
import { Auth } from '../entities/auth/auth.entity';

/**
 * @interface IContext
 * @description Represents the context object used in GraphQL resolvers.
 */
export interface IContext {
    req: Request;
    res: Response;
    token?: string;
    user?: Auth;
}
