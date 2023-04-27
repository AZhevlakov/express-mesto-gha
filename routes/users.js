const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const { updateUserProfileValidate, updateUserAvatarValidate, idValidate } = require('../middlewares/preValidate');

router.patch('/me', updateUserProfileValidate, updateUserProfile);
router.get('/me', updateUserAvatarValidate, getUserInfo);
router.patch('/me/avatar', updateUserAvatar);
router.get('/', getUsers);
router.get('/:id', idValidate, getUserById);

module.exports = router;
