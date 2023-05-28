
const connection = require('../config/connection');
// Import the models for the purpose of seeding them with data
const { User, Thought, Reaction } = require('../models');

connection.on('error', (err) => err);

// Connects to MongoDB
connection.once('open', async () => {
  console.log('connected');

  // Drops existing users, thoughts, and reactions
  await User.deleteMany({});
  await Thought.deleteMany({});
  await Reaction.deleteMany({});

  // Create array of users
    const users = [
        {
        username: 'dfbowen',
        email: 'dfbowen@email.com' 
        },
        {
            username: 'jenbowen',
            email: 'jenbowen@email.com' 
        },
        {
            username: 'cpeters',
            email: 'cpeters@email.com' 
        },
    ];
    // Wait for the User to be inserted into the database
    await User.collection.insertMany(users);
})