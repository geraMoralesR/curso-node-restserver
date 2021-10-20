const { response } = require("express");

const userGet=(req, res = response) => {

    res.json({
        status:'ok',
        msg: 'get api - controller'
    });
}

const userPut = (req, res = response) => {

    const {id} = req.params;
    res.status(500).json({
        status:'ok',
        msg: 'put api - controller',
        id
    });
}

const userPost = (req, res) => {
    //se puede desestructurar const {nombre, edad} = req.body;
    const {nombre, id} = req.body;
    //const body = req.body;

    res.status(201).json({
        status:'ok',
        msg: 'post api',
        nombre, id
    });
}

const userDelete = (req, res) => {
    res.json({
        status:'ok',
        msg: 'delete api'
    });
}

const userPath = (req, res) => {
    res.json({
        status:'ok',
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