'use strict';

module.exports = ({ Sequelize, sequelizeClient } = params) => {
    let black_listed_ips = sequelizeClient.define('black_listed_ips', {
        ip_address: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        underscored: true,
        timestamps: true,
    });

    return black_listed_ips;
}
