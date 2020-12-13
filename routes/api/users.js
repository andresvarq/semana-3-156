const router = require('express').Router();
const { User } = require('../../models');
const userController = require('../../controllers/TheController.js');
var bcrypt = require('bcryptjs');


router.get('/', async(req, res) => {
    const user = await User.findAll();
    res.status(200).json(user);
});

router.post('/register', async(req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.status(200).json(user);
});

// router.get('/', userController.list);
// router.post('register', userController.register);
router.post('/signin', userController.signin);

module.exports = router;
