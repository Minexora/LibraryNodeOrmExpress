import { body, param } from "../loaders/expressValidationLoaders.js"

const schemas = {
    createUser: [
        body('name').notEmpty().withMessage('name is a required field.').isString().withMessage('The entered value is not correct.'),
        body('email').notEmpty().withMessage('email is a required field.').isEmail().withMessage('The entered value is not correct.'),
        body('pass').notEmpty().withMessage('pass is a required field.').isString().withMessage('The entered value is not correct.'),
    ],
    createBook: [
        body('name').notEmpty().withMessage('name is a required field.').isString().withMessage('The entered value is not correct.'),
    ],
    getUserForId: [
        param('id').isUUID().withMessage('The entered value is not correct.'),
    ],
    getBookForId: [
        param('id').isUUID().withMessage('The entered value is not correct.'),
    ],
    borrowBook: [
        param('u_id').isUUID().withMessage('The value entered in the u_id(UserID) field is not correct.'),
        param('b_id').isUUID().withMessage('The value entered in the b_id(BookID) field is not correct.'),
    ],
    returnBook: [
        param('u_id').isUUID().withMessage('The value entered in the u_id(UserID) field is not correct.'),
        param('b_id').isUUID().withMessage('The value entered in the b_id(BookID) field is not correct.'),
    ],
}

export default {
    schemas
}