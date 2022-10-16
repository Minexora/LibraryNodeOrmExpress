import sequelizeLoader from '../loaders/sequelizeLoader.js'
import { createBookModel } from '../models/library/index.js'
import { log } from '../loaders/bunyanLoggerLoader.js'


class BookService {
    models = undefined

    constructor() {
        createBookModel({ sequelize: sequelizeLoader.sequelize, dataTypes: sequelizeLoader.DataTypes });
        this.models = sequelizeLoader.sequelize.models;
    }

    async createBook(req, res) {
        const { name } = req.body;
        try {
            const book = await this.models.Book.create({ name: name });
            res.send({ id: book.id, name: book.name, score: book.score });
        } catch (err) {
            log.error(err);
            res.status(400).send(err.errors)
        }
    }

    async getAllBook(req, res) {
        try {
            const books = await this.models.Book.findAll({ attributes: ['id', 'name'] })
            res.send(books)
        } catch (err) {
            log.error(err);
            res.status(400).send(err.errors)
        }
    }

    async getBookForId(req, res) {
        const { b_id } = req.params;
        try {
            const book = await this.models.Book.findAll({ where: { id: b_id }, attributes: ['id', 'name', 'score'] })
            res.send(book)
        } catch (err) {
            log.error(err);
            res.status(400).send(err.errors)
        }
    }
}

export default {
    BookService,
}