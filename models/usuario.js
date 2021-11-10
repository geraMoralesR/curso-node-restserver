const { Schema, model } = require("mongoose");




const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'nombre obligatorio']
    },
    password: {
        type: String,
        required: [true, 'contraseña obligatorio']
    },
    email: {
        type: String,
        required: [true, 'correo obligatorio'],
        unique: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);