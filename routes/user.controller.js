const { Router } = require('express');
const { userGet, userPut, userPost,
    userDelete, userPath } = require('../controllers/user.controller');

const router = Router();

router.get('/', userGet);

//el : id es para darle el identificador de que queremos modificar
router.put('/:id', userPut);

router.post('/', userPost);

router.delete('/', userDelete);

router.patch('/', userPath);





module.exports = router;