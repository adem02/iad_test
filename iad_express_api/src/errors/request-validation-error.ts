import { ValidationError } from "express-validator";
import { MyCustomError } from "./my-custom-error";

// Inherit the custom error class created for this project and handles errors for request not validated by our express validator
export class RequestValidationError extends MyCustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters')

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        })
    }
}