import { execute } from "./mysql-connector"
import { ContactQueries } from "./contact-queries"
import { IContact } from '../models/Contact'


// Retrieves all data from the contact table and return data as array
export const getContacts = async () => {
    return execute<IContact[]>(ContactQueries.GetContacts, []);
}

// Retrieve a contact by Id and returns it
export const getContactById = async (id: IContact['id']) => {
    return execute<IContact>(ContactQueries.GetContactById, [id])
}

// Create new contact and return a bool (true if 1 ou more rows have been affected or false if not)
export const newContact = async (contact: IContact) => {
    const result = await execute<{ affectedRows: number }>(ContactQueries.NewContact, [
        contact.firstname,
        contact.lastname,
        contact.email,
        contact.phone_code,
        contact.phone_number,
        contact.country,
        contact.city,
        contact.postcode,
        contact.street,
        !!contact.active,
        contact.birthday
    ])

    return result.affectedRows > 0;
}


// Update a contact data found by id and return a bool (true if 1 ou more rows have been affected or false if not)
export const updateContact = async (contact: IContact) => {
    const result = await execute<{ affectedRows: number }>(ContactQueries.updateContact, [
        contact.firstname,
        contact.lastname,
        contact.email,
        contact.phone_code,
        contact.phone_number,
        contact.country,
        contact.city,
        contact.postcode,
        contact.street,
        contact.active,
        contact.birthday,
        contact.id
    ])

    return result.affectedRows > 0;
}

// Delete contact by ID and return a bool (true if 1 ou more rows have been affected or false if not)
export const deleteContact = async (id: IContact['id']) => {
    const result = await execute<{ affectedRows: number }>(ContactQueries.deleteContact, [id])

    return result.affectedRows > 0;
}

// Change a contact status from active to inactive or inactive to active and return a bool (true if 1 ou more rows have been affected or false if not)
export const changeStatus = async (id: IContact['id']) => {
    const result = await execute<{ affectedRows: number }>(ContactQueries.changeStatus, [id])

    return result.affectedRows > 0;
}

// Check if there is a contact data with email or phone number and returns the data
export const checkExistingEmailOrNumber = async (email: string, phone_number: string) => {
    return await execute<IContact>(ContactQueries.getExistingEmailOrNumber, [email, phone_number]);
}