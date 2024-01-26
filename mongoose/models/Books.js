import mongoose from 'mongoose';
const { Schema } = mongoose;
const validateTitle = (title) => {
  if (title === 'Invalid') {
    throw new Error('Invalid title');
  }
};

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      validate: [validateTitle, 'Invalid title'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
    // ...
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

bookSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

bookSchema.pre('save', function (next) {
  if (this.isNew) {
    try {
      validateTitle(this.title);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const Book = mongoose.model('Book', bookSchema);

export { Book };