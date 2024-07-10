import { NextFunction } from 'express';
import { MiddlewareFn } from 'type-graphql';
import { ROLE } from '../constant/enum';
import { IContext } from '../types/context.type';
import AppError from '../utils/appError.utils';

export const authorization = (roles: ROLE[]): MiddlewareFn<IContext> => {
    return async ({ context }: any, next: NextFunction) => {
        const { res } = context;

        if (!res.locals.id && !res.locals.role)
            throw AppError.unauthorized('Not authorized for this task');
        try {
            const role = res.locals.role;
            if (roles.includes(role)) return next();
            else throw AppError.unauthorized('Not authorized for this task');
        } catch (error) {
            throw AppError.unauthorized('Not authorized for this task');
        }
    };
};
