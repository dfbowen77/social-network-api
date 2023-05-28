// Uses destructuring to unpack the dependencies needed from mongoose
const { Schema, model, Types } = require('mongoose');

// Defines the thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            // The purpose of the following code is to use a getter to transform the date data that is stored in MongoDB into something that is more easily readable by a person. 
            get: timestamp => new Date(timestamp).toLocaleTimeString(),
        },
        username:{
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        // In Mongoose a virtual is a property that is NOT stored in MongoDB. According to the Mongoose documentation they are typically used for doing some type of computation or manipulation of the data that doesn't need to be stored. Thus, this allows for virtual fields to be displayed to the users without storing it in the MongoDB. 
        // In this case, the virtual is needed to compute thoughts' reaction counts. 
        
        // In Mongoose getters let you transform data in MongoDB into something that is more user friendly. In this case, the getter is being used to transform the date from something that is formatted properly to something that is easier for a human to digest. 
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

// This is where the virtual is created to get the length of the reaction array for a thought.  
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

// From the thoughtSchema defined above, a Thought model is created. That thought model is then exported to be used elsewhere within the myriad programs.   
const Thought = model('Thought',thoughtSchema)

// Exports the User model 
module.exports = Thought