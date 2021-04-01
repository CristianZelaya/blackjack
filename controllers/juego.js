const {response} = require('express');

const juegoGet = (req, res = response) => {
    res.render('index')
}

const error404 = (req, res) => {
    res.render('404', {
        titulo: 'Page not found'
    });
}

module.exports = {
    juegoGet,
    error404
}