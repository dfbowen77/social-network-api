// import the destructured thought, user, and reaction models
const { Thought, User, Reaction } = require('../models');

// Exports the myriad thought routes
module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
          const thoughts = await Thought.find({});
          res.json(thoughts);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // Get a single thought
    async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({_id:req.params.thoughtId});
          if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
          } else {
            res.json(thought);
          }
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true })
        if (!user) {
            return res
              .status(404)
              .json({ message: 'thought created, but no users with this username' });
          }
      res.json(thought);

    } catch (err) {
        return res.status(500).json(err);
    }
  },
  // Update a Thought
  async updateThought(req, res) {
    try {
        const thought  = await Thought.findOneAndUpdate(req.params.id, req.body, {new: true})

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' })
        }
        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},
//   Delete a Thought
  async deleteThought(req,res) {
    try {
        const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});
        res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
  },
  // Add a Reaction to a Thought
  async addReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            // { $addToSet: { reactions: req.body.reactionId || req.params.reactionId } },
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
          }
    
          res.json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Delete a reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
        
            if (!thought) {
                return res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' });
            }
        
            res.json(thought);

        } catch (err) {
            return res.status(500).json(err);
        }
    },
}
