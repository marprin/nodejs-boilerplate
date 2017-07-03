'use strict';

module.exports = ({ Sequelize, sequelizeClient } = params) => {
    let user = sequelizeClient.define('users', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('name').toUpperCase();
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            set(val) {
                this.setDataValue('email', val.toLowerCase());
            }
        }
    }, {
        underscored: true,
        timestamps: true,
        paranoid: true
    });

    return user;
}
