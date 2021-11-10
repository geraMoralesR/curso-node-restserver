const { response } = require("express");
const bcyptjs = require('bcryptjs');//ṕaquete de encriptacion
const Usuario = require("../models/usuario");

const userGet = async (req, res = response) => {

    const { limite = 11, desde = 0 } = req.query;
    const query = { estado: true };
    /*const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));
    const total = await Usuario.countDocuments(query);*/

    const [total, usuarios] = await Promise.all([

        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({

        total,
        usuarios
    });
}

const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { password, google, ...resto } = req.body;

    if (password) {
        const salt = bcyptjs.genSaltSync();
        resto.password = bcyptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(500).json({
        status: 'ok',
        usuario
    });
}

const userPost = async (req, res = response) => {

    //se puede desestructurar const {nombre, edad} = req.body;
    const { nombre, password, email, role } = req.body;
    //const body = req.body;

    const usuario = new Usuario({ nombre, password, email, role });

    //encriptar contraseña
    const salt = bcyptjs.genSaltSync();
    usuario.password = bcyptjs.hashSync(password, salt);

    //guardar en base de datos
    await usuario.save();

    res.status(201).json({
        usuario,
    });
}

const userDelete = async (req, res) => {

    const { id } = req.params;
    //borrar fisicamente NO ES RECOMENDABLE
   /* const usuario = await Usuario.findByIdAndDelete(id);*/

   const usuario = await Usuario.findByIdAndUpdate( id, {estado: false});
    res.json({
        usuario
    });
}

const userPath = (req, res = response) => {
    res.json({
        status: 'ok',
        msg: 'patch api'
    });
}


module.exports = {
    userGet,
    userPut,
    userDelete,
    userPath,
    userPost
}