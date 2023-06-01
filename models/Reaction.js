// Uses destructuring to unpack the dependencies needed from mongoose
const { Schema, model, Types } = require('mongoose');

// Defines the reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // The purpose of the following code is to use a getter to transform the date data that is stored in MongoDB into something that is more easily readable by a person. The toLocaleString() returns the date as well as the time.
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
    },
        {
            toJSON: {
                // In Mongoose getters let you transform data in MongoDB into something that is more user friendly. In this case, the getter is being used to transform the date from something that is formatted properly to something that is easier for a human to digest. 
                getters: true,
            },
            id: false,
        }      
);

module.exports = reactionSchema