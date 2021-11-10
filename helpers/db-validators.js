const Role = require('../models/role');
const Usuario = require('../models/usuario');

const roleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El rol ${role} no esta registrado en la DB`)
    }
}

const emailExiste = async (email) => {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`el correo ${email} ya existe`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findOne({ id });
    if (!existeUsuario) {
        throw new Error(`el usuario con id: ${id} no existe`);
    }
}



module.exports = {
    roleValido,
    emailExiste,
    existeUsuarioPorId
}