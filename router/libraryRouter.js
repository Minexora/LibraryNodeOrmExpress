import express from 'express';
import libraryValidation from "../validations/libraryValidation.js"
import { validationMiddleware } from "../loaders/expressValidationLoaders.js"
import userServices from '../services/userServices.js'
import bookServices from '../services/bookServices.js'

const router = express.Router();
const userClass = new userServices.UserService();
const bookClass = new bookServices.BookService();


router.get('/users', async (req, res) => { await userClass.getAllUser(req, res) })
router.post('/users', libraryValidation.schemas.createUser, validationMiddleware, async (req, res) => { await userClass.createUser(req, res) })
router.get('/users/:id', libraryValidation.schemas.getUserForId, validationMiddleware, async (req, res) => { await userClass.getUserForId(req, res) })

router.get('/books', async (req, res) => { await bookClass.getAllBook(req, res) })
router.post('/books', libraryValidation.schemas.createBook, validationMiddleware, async (req, res) => { await bookClass.createBook(req, res) })
router.get('/books/:b_id', libraryValidation.schemas.getBookForId, validationMiddleware, async (req, res) => { await bookClass.getBookForId(req, res) })

router.post('/users/:u_id/borrow/:b_id', libraryValidation.schemas.borrowBook, validationMiddleware, async (req, res) => { await userClass.borrowBook(req, res) })
router.post('/users/:u_id/return/:b_id', libraryValidation.schemas.returnBook, validationMiddleware, async (req, res) => { await userClass.returnBook(req, res) })

export {
    router
}