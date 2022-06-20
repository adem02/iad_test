import { MyCustomError } from "./my-custom-error";

// Inherit the custom error class created for this project and handles errors for specific and available not found routes
export class NotFoundError extends MyCustomError {
    statusCode = 404

    constructor(message: string) {
        super(message)

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeError(): { message: string; field?: string; }[] {
        return [{ message: this.message }]
    }
}