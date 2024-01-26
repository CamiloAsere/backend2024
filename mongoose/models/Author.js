import mongoose from 'mongoose';
const { Schema } = mongoose;
const validateName = (name) => {
    if (name === 'Invalid') {
      throw new Error('Invalid name');
    }
  };
const authorSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        validate: [validateName, 'Invalid name'],
      },
      books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
      // ...
    },
    { timestamps: true, toJSON: { virtuals: true } }
  );
 
  authorSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  });

  authorSchema.pre('save', function (next) {
    if (this.isNew) {
      try {
        validateName(this.name);
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });
  const Author = mongoose.model('Author', authorSchema);
  export {Author};