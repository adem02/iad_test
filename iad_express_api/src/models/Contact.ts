export interface IContact {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone_code: string;
    phone_number: string;
    country: string;
    city: string;
    postcode: string;
    street: string;
    active?: boolean;
    birthday: Date
}