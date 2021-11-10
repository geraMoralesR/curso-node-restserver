const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
    //validacion del correo
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}




module.exports = {
    validarCampos
}