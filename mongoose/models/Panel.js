import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: String,
    image: String,
    options: [String],
    correctAnswer: String
  });
  const validateQuestion= (question) => {
    if (question === 'Invalid') {
      throw new Error('Invalid title');
    }
  };
  questionSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id; // Cambiar el nombre del campo _id por id
      delete ret._id; // Eliminar el campo _id
      delete ret.__v; // Eliminar el campo __v
      return ret; // Devolver el objeto modificado
    }
  });

  questionSchema.pre('save', function (next) {
    if (this.isNew) {
      try {
        validateQuestion(this.question);
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });

  


export const Question = mongoose.model('Question', questionSchema);
