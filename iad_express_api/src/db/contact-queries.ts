// SQL Queries

export const ContactQueries = {
    GetContacts: `
        SELECT * FROM iad_test_express_db.contact
    `,

    getFilteredContacts: `
        SELECT * FROM iad_test_express_db.contact WHERE active = ?
    `,

    GetContactById: `
        SELECT *
        FROM iad_test_express_db.contact
        WHERE id = ? 
    `,
    NewContact: `
        INSERT INTO iad_test_express_db.contact (
            firstname,
            lastname,
            email,
            phone_code,
            phone_number,
            country,
            city,
            postcode,
            street,
            active,
            birthday
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    updateContact: `
        UPDATE iad_test_express_db.contact 
        SET firstname = ?,
            lastname = ?,
            email = ?,
            phone_code = ?,
            phone_number = ?,
            country = ?,
            city = ?,
            postcode = ?,
            street = ?,
            active = ?,
            birthday = ?
        WHERE id = ?;
    `,

    deleteContact: `
        DELETE FROM iad_test_express_db.contact WHERE id = ?
    `,

    changeStatus: `
        UPDATE iad_test_express_db.contact SET active = NOT active WHERE id = ?
    `,

    getExistingEmailOrNumber: `
    SELECT * FROM iad_test_express_db.contact where email = ? OR phone_number = ?;
    `
}