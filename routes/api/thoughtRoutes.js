// create a new router object
const router = require('express').Router();

// import all the necessary controllers from the controllers folder
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

// sets up the endpoint for retreiving and adding thoughts
router.route('/').get(getThoughts).post(createThought);

// sets up the endpoints for retreiving, updating, and deleting single thoughts
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// sets up the endpoints for adding reactions
router.route('/:thoughtID/reactions').post(addReaction)

// sets up the endpoints for deleting reactions
router.route('/:thoughtID/reactions/:reactionID').delete(removeReaction)

// Exports the router for use elsewhere in the application
module.exports = router;