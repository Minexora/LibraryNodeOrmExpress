let User

function createUserModel({ sequelize, dataTypes }) {
    User = sequelize.define(
        'User',
        {
            id: {
                type: dataTypes.UUID,
                defaultValue: dataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: dataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: dataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: dataTypes.STRING,
                allowNull: false,
                // set(value) {
                //     this.setDataValue('password', `hashed(${value})`)
                // }
            },
            books: {
                type: dataTypes.JSON,
                defaultValue: { "past": [], "present": [] },
                allowNull: true,
            }
        },
        {
            tableName: "User"
        }
    )
    sequelize.sync({ alter: true });
}

function createBookModel({ sequelize, dataTypes }) {
    User = sequelize.define(
        'Book',
        {
            id: {
                type: dataTypes.UUID,
                defaultValue: dataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: dataTypes.STRING,
                allowNull: true,
            },
            score: {
                type: dataTypes.STRING,
                defaultValue: "-1"
            },
            receiptsCount: {
                type: dataTypes.INTEGER,
                defaultValue: 0
            },
            totalScore: {
                type: dataTypes.FLOAT,
                defaultValue: 0
            },
            active: {
                type: dataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            freezeTableName: true
        }
    )
    sequelize.sync({ alter: true });
}

export {
    createUserModel,
    createBookModel
}