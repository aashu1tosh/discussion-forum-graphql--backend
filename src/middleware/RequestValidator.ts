/**
 * File: RequestValidator.ts
 * Description: This file defines a request validation middleware using class-validator and class-transformer for TypeGraphQL resolvers.
 */

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

    /**
     * @function validate
     * @template T
     * @param {ClassConstructor<T>} classInstance - A class constructor representing the expected input data structure.
     * @returns {MiddlewareFn<IContext>}IContext
     * @description Middleware function that validates incoming request data against a class schema using class-validator and class-transformer.
     */
    validate: <T extends object>(
        classInstance: ClassConstructor<T>
    ): MiddlewareFn<IContext> => {
        return async ({ context }, next) => {
            const { req } = context;

            // Convert the request body to a class instance using class-transformer
            const convertedObject = plainToClass(
                classInstance,
                req.body.variables.data
            );

            // Validate the class instance against defined validation rules
            const validationMessages: string[] = [];
            const errors = await validate(convertedObject, {
                whitelist: true,
                forbidNonWhitelisted: true,
            });

            if (errors.length !== 0) {
                // Collect validation error messages recursively
                await RequestValidator.getValidationMessage(
                    errors,
                    validationMessages
                );

                // Throw a BadRequest error with the first validation error message
                throw AppError.badRequest(validationMessages[0]);
            }

            // Continue with the next resolver or middleware
            return await next();
        };
    },
};
