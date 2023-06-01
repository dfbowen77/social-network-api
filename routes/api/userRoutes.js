// create a new router object
const router = require('express').Router();

// import all the necessary controllers from the controllers folder
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

console.log("test:" + getUsers)

// sets up the endpoint for retreiving and adding users
router.route('/').get(getUsers).post(createUser);

// sets up the endpoints for retreiving, updating, and deleting single users
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// sets up the endpoints for adding and deleting friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

// Exports the router for use elsewhere in the application
module.exports = router;