const axios = require('axios');
const { response, request } = require('express');
const obtenerArtistas = async (req = request, res = response) => {
  const { artista } = req.params;
  try {
    const { data } = await axios.get(
      `https://www.rijksmuseum.nl/en/search/advanced/terms?field=involvedMaker&q=${artista}`
    );
    const artistas = data.map((artista) => {
      return { value: artista.id, label: artista.name };
    });

    return res.status(200).json({
      ok: true,
      artistas,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador',
    });
  }
};
const obtenerObras = async (req = request, res = response) => {
  const { nombreObra, nombreArtista } = req.params;
  let obra;
  let artista;
  if (nombreObra === 'null') {
    obra = ' ';
  } else {
    obra = nombreObra;
  }
  if (nombreArtista === 'null') {
    artista = ' ';
  } else {
    artista = nombreArtista;
  }
  console.log(
    'museum LINE 27 =>',
    { nombreObra, nombreArtista },
    { obra, artista }
  );
  if (obra === ' ' && artista === ' ') {
    return res.status(401).json({
      ok: false,
      msg: 'Ingrese valores para la busqueda.',
    });
  }
  try {
    const { data } = await axios.get(
      `https://www.rijksmuseum.nl/api/nl/collection?key=wfSvsctX&imgonly=true&q=${obra}&involvedMaker=${artista}`
    );
    return res.status(200).json({
      ok: true,
      obras: data.artObjects,
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
  obtenerArtistas,
  obtenerObras,
};
