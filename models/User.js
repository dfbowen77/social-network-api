// Uses destructuring to unpack the dependencies needed from mongoose
const { Schema, model, Types } = require('mongoose');

// Defines the user schema
const userSchema = new Schema(
    {
        // Defines username as being a unique, required, trimmed string
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        // Defines email as a valid, required, unique string
        email: {
            type: String,
            unique: true,
            required: true,
            // Uses a regular expression (regex) to ensure the email is a valid address
            validate: {
                validator: function(validateEmail) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(validateEmail)
                }
            }

        },
        // Defines Thoughts as an array that references the Thought model
        thoughts:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        // Defines Friends as an array that references the User model
        friends:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],

    },
    {
        // In Mongoose a virtual is a property that is NOT stored in MongoDB. According to the Mongoose documentation they are typically used for doing some type of computation or manipulation of the data that doesn't need to be stored. Thus, this allows for virtual fields to be displayed to the users without storing it in the MongoDB. 
        // In this case, the virtual is needed to compute users' friends counts.   
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
)

// This is where the virtual is create to get the length of the friends array for a user.  
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

// From the userSchema defined above, a User model is created. That user model is then exported to be used elsewhere within the myriad programs.   
const User = model('User',userSchema)

// Exports the User model 
module.exports = User

