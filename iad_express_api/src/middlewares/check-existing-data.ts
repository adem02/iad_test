import { NextFunction, Request, Response } from "express";
import { checkExistingEmailOrNumber, getContactById } from "../db/contact-model-queries";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import { IContact } from "../models/Contact";

// Check if a contact with a specific id exists
// If not throws an error
export const checkExistingContact = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const contact = await getContactById(Number(req.params.id))

    if (!contact.toString()) {
        throw new NotFoundError('Contact not found for id : ' + req.params.id);
    }

    next()
}

// Check if a contact with a specific email or phone number exists
// If the contact exists, throws an errors
export const checkExistingEmailOrPhone = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, phone_number } = req.body

    let result = await checkExistingEmailOrNumber(email, phone_number)
    let contact = { ...JSON.parse(JSON.stringify(result)) }[0] as IContact

    if ((!req.params.id || Number(req.params.id) !== contact?.id) && result.toString()) {
        throw new BadRequestError("Email or Phone number already in use !");
    }
    next()
}

export const checkUserMajority = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let { birthday } = req.body;

    const bArray = birthday.toString().split('-')
    birthday = new Date(bArray[0], bArray[1], bArray[2])

    const today = {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    }

    let age = today.year - birthday.getFullYear();

    if (today.month < birthday.getMonth()) age - 1;
    if (today.month === birthday.getMonth() && today.day < birthday.getDate()) age - 1;

    if (age < 18) {
        throw new BadRequestError('Contact must have 18 or more');
    }

    next()
}