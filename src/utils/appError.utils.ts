import { StatusCodes } from '../constant/statusCodes';

class AppError extends Error {
    statusCode: number;
    isCustom: boolean;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isCustom = true;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string): AppError {
        return new AppError(message, StatusCodes.BAD_REQUEST);
    }

    static unauthorized(message: string): AppError {
        return new AppError(message, StatusCodes.UNAUTHORIZED);
    }

    static notFound(message: string): AppError {
        return new AppError(message, StatusCodes.NOT_FOUND);
    }

    static conflict(message: string): AppError {
        return new AppError(message, StatusCodes.CONFLICT);
    }

    static forbidden(message: string): AppError {
        return new AppError(message, StatusCodes.FORBIDDEN);
    }

    static internalServerError(message: string): AppError {
        return new AppError(message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default AppError;
