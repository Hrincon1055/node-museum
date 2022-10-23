const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerArtistas, obtenerObras } = require('../controllers/museum');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.get(
  '/:artista',
  [
    check('artista', 'El artista Es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  obtenerArtistas
);
router.get(
  '/busqueda/:nombreObra/:nombreArtista',
  [
    check('nombreObra', 'El nombre de la obra es obligatoria').not().isEmpty(),
    check('nombreArtista', 'El artista Es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  obtenerObras
);
// exports
module.exports = router;
