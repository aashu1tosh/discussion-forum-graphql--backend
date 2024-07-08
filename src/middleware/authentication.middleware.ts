import { NextFunction } from 'express';
import { MiddlewareFn } from 'type-graphql';
import { IJwtPayload } from '../interface/jwt.interface';
import roleService from '../services/utils/role.service';
import webtokenService from '../services/webtoken.service';
import { IContext } from '../types/context.type';
import Print from '../utils/Print';
import AppError from '../utils/appError.utils';

export const authentication = (): MiddlewareFn<IContext> => {
    return async ({ context }: any, next: NextFunction) => {
        const { req, res } = context;

        const token = req.headers.authorization?.split(' ');

        try {
            if (!token) {
                throw AppError.unauthorized(
                    'You are not authorized for this task'
                );
            }
            const mode = token[0];
            const accessToken = token[1];
            if (mode !== 'Bearer' || !accessToken)
                throw AppError.unauthorized(
                    'You are not authorized for this task'
                );

            webtokenService.verify(accessToken) as IJwtPayload;
            const payload = webtokenService.verify(accessToken) as IJwtPayload;
            const _id = payload?.id as string;
            const role = await roleService.getRole(_id);
            if (payload) {
                res.locals.id = payload.id;
                res.locals.role = role;
                next();
            }
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                next(AppError.unauthorized('Token Expired'));
                return;
            }
            throw AppError.unauthorized('Not authenticated for this task');
        }
    };
};
