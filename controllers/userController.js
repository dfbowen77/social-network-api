// import the destructured user model
const { User } = require('../models');

// Exports the myriad user routes
module.exports = {
    // Get all Users
    async getUsers(req, res) {
        try {
          const users = await User.find();    
          res.json(users);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
    //   Get a single user
    async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
          }
          res.json(user);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
    },  
    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // update a user
    async updateUser(req, res) {
        try {
            const user  = await User.findOneAndUpdate(req.params.id, req.body, {new: true})

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            res.json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId})

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
              }
        
              res.json({ message: 'User successfully deleted' });
            } catch (err) {
              console.log(err);
              res.status(500).json(err);
            }
    },
    // Add a Friend to a User
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body.friendId || req.params.friendId } },
                { runValidators: true, new: true }
              );
        
              if (!user) {
                return res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' });
              }
        
              res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
    },
    // Delete a friend from a user
    async removeFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

}