'use strict';

module.exports = (params) => {
    const app = params.router;
    const middleware = params.middleware;

    app.get('', (req, res, next) => {
        console.log('tes');
        res.send('in home');
    });
    app.get('/login', (req, res, next) => {
        console.log('login');
        res.send('login');
    });
}

// const express = require('express');
// const router = express.Router();

// router.get('', (req, res) => {
//     console.log('tes');
//     res.send('succes');
// })

// module.exports = router;