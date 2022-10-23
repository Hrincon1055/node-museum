const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  crearFavorito,
  eliminarFavorito,
  obtenerListaFavoritos,
} = require('../controllers/favorito');

const router = Router();
router.get('/', validarJWT, obtenerListaFavoritos);
router.post(
  '/',
  [
    validarJWT,
    check('favoritoKey', 'El id Es obligatorio').not().isEmpty(),
    check('title', 'El titulo Es obligatorio').not().isEmpty(),
    check('principalOrFirstMaker', 'El autor Es obligatorio').not().isEmpty(),
    check('urlImg', 'la imagen Es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearFavorito
);
router.delete(
  '/:favoritoKey',
  [
    validarJWT,
    check('favoritoKey', 'El id Es obligatorio').not().isEmpty(),
    validarCampos,
  ],

  eliminarFavorito
);

// exports
module.exports = router;
