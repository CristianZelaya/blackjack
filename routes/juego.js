const {Router} = require('express');
const {
    juegoGet,
    error404
} = require('../controllers/juego')

const router = Router();

router.get('/', juegoGet);

router.get('*', error404);

module.exports = router;