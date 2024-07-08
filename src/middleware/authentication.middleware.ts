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
            Print.debug('code reached here');
            const mode = token[0];
            const accessToken = token[1];
            if (mode !== 'Bearer' || !accessToken)
                throw AppError.unauthorized(
                    'You are not authorized for this task'
                );

            const payload = webtokenService.verify(accessToken) as IJwtPayload;

            const _id = payload?.id as string;
            const role = await roleService.getRole(_id);
            Print.debug('code reached here 2');
            if (payload) {
                res.locals.id = 'payload.id';
                res.locals.role = 'role';
                return next();
            }
        } catch (error) {
            throw AppError.unauthorized('Not authenticated for this task');
        }
    };
};
