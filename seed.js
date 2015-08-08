/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Tx = Promise.promisifyAll(mongoose.model('Tx'));
var Block = Promise.promisifyAll(mongoose.model('Block'));
var Chain = Promise.promisifyAll(mongoose.model('Chain'));

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        },
        {
            email: 'jack@mulrow.com',
            password: 'jack'
        }
    ];

    return User.createAsync(users);

};

var seedTx = function () {

    var txs = [
        {
            hash: 'testing@fsa.com'
        },
        {
            hash: 'obama@gmail.com'
        },
        {
            hash: 'jack@mulrow.com'
        },
        {
            hash: '3jack@mulrow.comadfdas'
        },
        {
            hash: 'fafadsfewdsaas3242'
        },
        {
            hash: 'adsfadsf345345fg'
        }
    ];

    return Tx.createAsync(txs);

};

var seedBlocks = function () {

    var blocks = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        },
        {
            email: 'jack@mulrow.com',
            password: 'jack'
        }
    ];

    return Block.createAsync(blocks);

};

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function() {
        return seedTx();
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
