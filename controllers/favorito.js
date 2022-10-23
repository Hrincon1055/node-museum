const { response, request } = require('express');
const { Favoritos } = require('../models/Favorito');
const crearFavorito = async (req = request, res = response) => {
  const { favoritoKey, title, principalOrFirstMaker, urlImg } = req.body;
  const { uid } = req;
  try {
    const exiteFavorito = await Favoritos.findOne({
      where: { favoritoKey: favoritoKey, usuarioId: uid },
    });
    if (exiteFavorito) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya esta guardado en tus favoritos',
      });
    }
    const newFavorito = await Favoritos.create({
      favoritoKey,
      title,
      principalOrFirstMaker,
      urlImg,
      usuarioId: uid,
    });
    return res.status(200).json({
      ok: true,
      newFavorito,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador',
    });
  }
};
const eliminarFavorito = async (req = request, res = response) => {
  const { favoritoKey } = req.params;
  const { uid } = req;
  try {
    const favoritoBorrado = Favoritos.destroy({
      where: { favoritoKey: favoritoKey, usuarioId: uid },
    });
    return res.status(200).json({
      ok: true,
      favoritoBorrado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador',
    });
  }
};
const obtenerListaFavoritos = async (req = request, res = response) => {
  const { uid } = req;
  try {
    const favoritos = await Favoritos.findAll({
      where: { usuarioId: uid },
    });
    return res.status(200).json({
      ok: true,
      favoritos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador',
    });
  }
};
module.exports = { crearFavorito, eliminarFavorito, obtenerListaFavoritos };
