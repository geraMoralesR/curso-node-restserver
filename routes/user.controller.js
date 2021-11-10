const { Router } = require('express');
const { check } = require('express-validator');

const { roleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validacion');

const { userGet, userPut, userPost,
    userDelete, userPath } = require('../controllers/user.controller');



const router = Router();

router.get('/', userGet);

//el : id es para darle el identificador del que queremos modificar
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(roleValido),
    validarCampos
], userPut);
//validando los campos obligatorios
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es minimo de 6 caracteres').isLength({ min: 6 }),
    check('email').custom(emailExiste),
    // check('role','Rol no permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(roleValido),

    validarCampos //llamamos a la funcion de validar campos (middleware)
], userPost);

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], userDelete);

router.patch('/', userPath);





module.exports = router;