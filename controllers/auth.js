const { response, request } = require('express');
const { Usuarios } = require('../models/Usuario');
const bcript = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  try {
    // Verificar email
    const exiteEmail = await Usuarios.findOne({ where: { email: email } });
    if (exiteEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe con ese email',
      });
    }
    // crear usuario
    const newUsuario = await Usuarios.create({ name, email, password });
    //Generar jwt
    const token = await generarJWT(newUsuario.id, newUsuario.name);
    return res.status(200).json({
      ok: true,
      uid: newUsuario.id,
      name: newUsuario.name,
      email: newUsuario.email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador',
    });
  }
};
const loginUsuario = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar email
    const dbUsuario = await Usuarios.findOne({ where: { email: email } });
    if (!dbUsuario) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario o password no valido.',
      });
    }
    // Confirmar password
    const validPassword = bcript.compareSync(password, dbUsuario.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario o password no valido.',
      });
    }
    // Generar jwt
    const token = await generarJWT(dbUsuario.id, dbUsuario.name);
    // respuesta
    return res.status(200).json({
      ok: true,
      uid: dbUsuario.id,
      name: dbUsuario.name,
      email: dbUsuario.email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador',
    });
  }
};
const revalidarToken = async (req = request, res = response) => {
  const { uid } = req;

  try {
    const dbUsuario = await Usuarios.findOne({ where: { id: uid } });

    // Generar jwt
    const token = await generarJWT(uid, dbUsuario.name);
    return res.status(200).json({
      ok: true,
      uid,
      name: dbUsuario.name,
      email: dbUsuario.email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador',
    });
  }
};
module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
