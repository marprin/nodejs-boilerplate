'use strict';

const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    console.log('tes');
    res.send('succes');
})

module.exports = router;