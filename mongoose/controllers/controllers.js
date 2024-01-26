import { Author } from "../models/Author.js";
import { Book } from "../models/Books.js";

const handleErrors = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: err.message });
  } else if (err.name === 'CastError') {
    res.status(404).send({ message: 'Not found' });
  } else {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const authorsController = {
  index: async (req, res) => {
    try {
      const docs = await Author.find({});
      res.send(docs);
    } catch (err) {
      handleErrors(err, res);
    }
  },
  show: async (req, res) => {
    try {
      const doc = await Author.findById(req.params.id).populate('books');
      if (!doc) return res.status(404).send();
      res.send(doc);
    } catch (err) {
      handleErrors(err, res);
    }
  },
  create: async (req, res) => {
    try {
      const author = new Author(req.body);
      await author.validate();
      const doc = await author.save();
      res.status(201).send(doc);
    } catch (err) {
      handleErrors(err, res);
    }
  },
  update: async (req, res) => {
    try {
      const doc = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) return res.status(404).send();
      res.send(doc);
    } catch (err) {
      handleErrors(err, res);
    }
  },
  destroy: async (req, res) => {
    try {
      await Author.findByIdAndRemove(req.params.id);
      res.status(204).send();
    } catch (err) {
      handleErrors(err, res);
    }
  },
};

export const booksController = {
  index: async (req, res) => {
    try {
      const docs = await Book.find({}).populate('author');
      res.send(docs);
    } catch (err) {
      handleErrors(err, res);
    }
  },
  show: async (req, res) => {
    try {
      const doc = await Book.findById(req.params.id).populate('author');
      if (!doc) return res.status(404).send();
      res.send(doc);
    } catch (err) {
      handleErrors(err, res);
    }
  },
  create: async (req, res) => {
    try {
      const book = new Book(req.body);
      await book.validate();
      const doc = await book.save();
      res.status(201).send(doc);
    } catch (err) {
      handleErrors(err, res);
    }
  },
}