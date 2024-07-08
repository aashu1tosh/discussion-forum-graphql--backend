import { plainToClass, type ClassConstructor } from 'class-transformer';
import { validate, type ValidationError } from 'class-validator';
import { type MiddlewareFn } from 'type-graphql';
import { type IContext } from '../types/context.type';
import AppError from '../utils/appError.utils';

export const RequestValidator = {
    async getValidationMessage(
        errors: ValidationError[],
        message: string[]
    ): Promise<void> {
        await Promise.all(
            errors.map(async (err) => {
                if (err.children !== undefined && err.children?.length > 0) {
                    await RequestValidator.getValidationMessage(
                        err.children,
                        message
                    );
                } else {
                    if (err.constraints !== undefined) {
                        Object.values(err.constraints).forEach((value) => {
                            message.push(value);
                        });
                    }
                }
            })
        );
    },

    validate: <T extends object>(
        classInstance: ClassConstructor<T>
    ): MiddlewareFn<IContext> => {
        return async ({ context }, next) => {
            const { req } = context;

            const convertedObject = plainToClass(
                classInstance,
                req.body.variables.data
            );

            const validationMessages: string[] = [];
            const errors = await validate(convertedObject, {
                whitelist: true,
                forbidNonWhitelisted: true,
            });

            if (errors.length !== 0) {
                await RequestValidator.getValidationMessage(
                    errors,
                    validationMessages
                );

                throw AppError.badRequest(validationMessages[0]);
            }

            return await next();
        };
    },
};
