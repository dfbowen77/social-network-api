// Imports express to help manage the routes
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => 
    {return res.status(404).send('The route you requested does not exist')
});

module.exports = router;