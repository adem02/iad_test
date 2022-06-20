import express, { Request, Response } from 'express'
import * as ContactModelQueries from '../db/contact-model-queries';
import { IContact } from '../models/Contact';
import { body } from 'express-validator'
import { validateRequest } from '../middlewares/validate-request';
import { checkExistingContact, checkExistingEmailOrPhone, checkUserMajority } from '../middlewares/check-existing-data';

const router = express.Router();

// Route to get all contacts
router.get('/contacts', async (req: Request, res: Response) => {
    const contacts = await ContactModelQueries.getContacts();

    if (!contacts) {
        res.status(404).json({ contacts });
    }

    res.status(200).json({ contacts });
})

// Route to  create new contacts, check middlewares documentations
router.post('/contact/new',
    checkExistingEmailOrPhone,
    checkUserMajority,
    [
        body('firstname')
            .trim()
            .isString()
            .isLength({ min: 2, max: 40 })
            .withMessage('Firstname must be between 2 and 40 characters'),
        body('lastname')
            .trim()
            .isString()
            .withMessage('Must be a string')
            .isLength({ min: 1, max: 40 })
            .withMessage('Lastname must be between 2 and 40 characters'),
        body('email')
            .trim()
            .isEmail(),
        body('phone_code')
            .trim()
            .isString()
            .isLength({ min: 2, max: 5 })
            .withMessage('Phone code must be between 2 and 5 characters'),
        body('phone_number')
            .trim()
            .isString()
            .isLength({ min: 10, max: 10 })
            .withMessage('Phone number must have 10 characters'),
        body('city')
            .trim()
            .isString()
            .isLength({ min: 2, max: 40 })
            .withMessage('City must be between 2 and 40 characters'),
        body('country')
            .trim()
            .isString()
            .isLength({ min: 2, max: 40 })
            .withMessage('Country must be between 2 and 40 characters'),
        body('postcode')
            .trim()
            .isString()
            .isLength({ min: 4, max: 6 })
            .withMessage('Postcode must be between 4 and 6 characters'),
        body('street')
            .trim()
            .isString()
            .isLength({ min: 5, max: 100 })
            .withMessage('Street must be between 5 and 100 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const contact = await ContactModelQueries.newContact(req.body as IContact)

            res.status(201).json({ data: contact })
        } catch (error) {
            const err = typeof error === 'object' && JSON.stringify(error);
            res.status(500).json(error);
        }
    })

// Route to get contact by id
router.get('/contact/:id',
    checkExistingContact,
    async (req: Request, res: Response) => {
        const contact = await ContactModelQueries.getContactById(Number(req.params.id))
        res.status(200).json({ data: contact })
    })

//Route to update contact by id
router.put('/contact/:id',
    checkExistingContact,
    checkExistingEmailOrPhone,
    checkUserMajority,
    [
        body('firstname')
            .trim()
            .isString()
            .isLength({ min: 2, max: 40 })
            .withMessage('Firstname must be between 2 and 40 characters'),
        body('lastname')
            .trim()
            .isString()
            .withMessage('Must be a string')
            .isLength({ min: 1, max: 40 })
            .withMessage('Lastname must be between 2 and 40 characters'),
        body('email')
            .trim()
            .isEmail(),
        body('phone_code')
            .trim()
            .isString()
            .isLength({ min: 2, max: 5 })
            .withMessage('Phone code must be between 2 and 5 characters'),
        body('phone_number')
            .trim()
            .isString()
            .isLength({ min: 10, max: 10 })
            .withMessage('Phone number must have 10 characters'),
        body('city')
            .trim()
            .isString()
            .isLength({ min: 2, max: 40 })
            .withMessage('City must be between 2 and 40 characters'),
        body('country')
            .trim()
            .isString()
            .isLength({ min: 2, max: 40 })
            .withMessage('Country must be between 2 and 40 characters'),
        body('postcode')
            .trim()
            .isString()
            .isLength({ min: 4, max: 6 })
            .withMessage('Postcode must be between 4 and 6 characters'),
        body('street')
            .trim()
            .isString()
            .isLength({ min: 5, max: 100 })
            .withMessage('Street must be between 5 and 100 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const contactData = await ContactModelQueries.getContactById(Number(req.params.id))
        const contact = { ...JSON.parse(JSON.stringify(contactData))[0], ...req.body }

        try {
            const result = await ContactModelQueries.updateContact({ ...contact, id: Number(req.params.id) })

            res.status(203).json({ contact: result });
        } catch (error) {
            res.status(500).json(error);
        }
    })

router.delete('/contact/:id',
    checkExistingContact,
    async (req: Request, res: Response) => {
        try {
            const data = await ContactModelQueries.deleteContact(Number(req.params.id))

            res.status(203).json({ contact: data });
        } catch (error) {
            res.status(500).json(error);
        }
    })

// Changes contact status
router.post('/contact/status/:id',
    checkExistingContact,
    async (req: Request, res: Response) => {
        try {
            const result = await ContactModelQueries.changeStatus(Number(req.params.id));

            res.status(203).json({ contact: result });
        } catch (error) {
            res.status(500).json(error);
        }
    })

export { router as Routes };