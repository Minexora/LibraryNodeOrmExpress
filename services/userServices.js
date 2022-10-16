import sequelizeLoader from '../loaders/sequelizeLoader.js'
import { createUserModel } from '../models/library/index.js'
import { log } from '../loaders/bunyanLoggerLoader.js'
import bcrypt from 'bcryptjs';
import delay from 'delay';

class UserService {
    models = undefined

    constructor() {
        createUserModel({ sequelize: sequelizeLoader.sequelize, dataTypes: sequelizeLoader.DataTypes });
        this.models = sequelizeLoader.sequelize.models;
    }

    async createUser(req, res) {
        const { name, email, pass } = req.body;
        try {
            const user = await this.models.User.create({
                name: name,
                email: email,
                password: await bcrypt.hash(pass, 8)
            });
            res.send({ id: user.id, name: user.name, books: user.books });
        } catch (err) {
            log.error(err);
            res.status(501).send(err.errors)
        }
    }

    checkPassword(password, password_hash) {
        return bcrypt.compare(password, password_hash);
    }

    async getAllUser(req, res) {
        try {
            const users = await this.models.User.findAll({ attributes: ['id', 'name'] })
            res.send(users)
        } catch (err) {
            log.error(err);
            res.status(501).send(err.errors)
        }
    }

    async getUserForId(req, res) {
        const { id } = req.params;
        try {
            const user = await this.models.User.findAll({ where: { id: id }, attributes: ['id', 'name', 'books'] })
            res.send(user)
        } catch (err) {
            log.error(err);
            res.status(501).send(err.errors)
        }
    }


    async borrowBook(req, res) {
        const { u_id, b_id } = req.params;
        try {
            const user = await this.models.User.findByPk(u_id)
            const book = await this.models.Book.findByPk(b_id)
            if (user && book) {
                if (book.active) {
                    user.books.present.push({
                        name: book.name
                    })
                    user.changed("books", true) //--> json datanın değişmesi için izin verildi.
                    await user.save()

                    book.active = false
                    book.changed("active", true)
                    await book.save()
                    res.status(200).send(`The book named '${book.name}' was borrowed.`)
                }
                else {
                    res.status(400).send(`The book '${book.name}' has already been borrowed.`)
                }
            }
            else {
                res.status(400).send('Entered parameters are not correct')
            }
        } catch (err) {
            log.error(err);
            res.status(501).send(err.errors)
        }
    }

    async returnBook(req, res) {
        const { u_id, b_id } = req.params;
        const { score } = req.body;
        try {
            const user = await this.models.User.findByPk(u_id)
            const book = await this.models.Book.findByPk(b_id)
            if (user && book) {
                if (user.books.present.find(item => item.name === book.name)) {
                    user.books.present = user.books.present.filter(item => item.name !== book.name)
                    user.books.past.push({
                        name: book.name,
                        userScore: score
                    })
                    user.changed("books", true); //--> json datanın değişmesi için izin verildi. 
                    await user.save()
                    book.totalScore += score
                    book.receiptsCount++
                    book.score = book.totalScore / book.receiptsCount
                    book.active = true
                    await book.save()
                    res.status(200).send(`The book '${book.name}' is being returned.`)
                } else {
                    res.status(400).send(`You don't have a book called '${book.name}'. You cannot return it!`)
                }
            }
            else {
                res.status(400).send('Entered parameters are not correct')
            }
        } catch (err) {
            log.error(err);
            res.status(501).send(err.errors)
        }
    }
}

export default {
    UserService,
}