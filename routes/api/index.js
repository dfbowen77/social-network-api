// create a new router object
const router = require('express').Router();

// Imports the user and thought routes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Demarcates the endpoints for the user and thought routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Exports the router for use elsewhere in the application
module.exports = router;