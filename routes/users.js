const router = require('express').Router();
const { getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar } = require('../controllers/users');

router.patch('/me', updateUserProfile);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
