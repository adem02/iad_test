import { MyCustomError } from './my-custom-error';


// Inherit the custom error class created for this project and handles bad requests passed
export class BadRequestError extends MyCustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.message }];
    }
}
