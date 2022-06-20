// Creating our custom errors class to return errors as an array of object
// an error contains a message and an optional field
export abstract class MyCustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message)

        Object.setPrototypeOf(this, MyCustomError.prototype)
    }

    abstract serializeError(): { message: string, field?: string }[]
}