const ethTokensList = require('../../assets/data/eth-tokens.json');

const Promise = require('bluebird');

module.exports = function (app, sqlLiteService) {
    const TABLE_NAME = 'token_prices';
    const Controller = function () { };

    let knex = sqlLiteService.knex;

    /**
     *
     */
    Controller.findAll = _findAll;
    Controller.findBySymbol = _findBySymbol;
    Controller.add = _add;
    Controller.edit = _edit;

    function _findAll() {
        return new Promise((resolve, reject) => {
            knex(TABLE_NAME).select().then((rows) => {
                resolve(rows);
            }).catch((error) => {
                reject({ message: "error_findAll", error: error });
            });
        });
    }

    function _findBySymbol(symbol) {
        return new Promise((resolve, reject) => {
            knex(TABLE_NAME).select().where({ symbol: symbol }).then((rows) => {
                resolve(rows && rows.length ? rows[0] : null);
            }).catch((error) => {
                reject({ message: "error_findAll", error: error });
            });
        });
    }

    function _add (tokenPrice) {
        return sqlLiteService.insertIntoTable(TABLE_NAME, tokenPrice);
    }

    function _edit(tokenPrice) {
        return sqlLiteService.updateById(TABLE_NAME, tokenPrice);
    }

    return Controller;
}
