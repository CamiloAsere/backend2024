import { DataPlan } from "../models/DataPlan.js";
import { User } from "../models/User.js";

const handleErrors = (err, res) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: err.message });
    } else if (err.name === 'CastError') {
      res.status(404).send({ message: 'Not found' });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  };
  
  export const dataPlanController = {
    index: async (req, res) => {
      try {
        const docs = await DataPlan.find({});
        res.send(docs);
      } catch (err) {
        handleErrors(err, res);
      }
    },
    show: async (req, res) => {
      try {
        const doc = await DataPlan.findById(req.params.id);
        if (!doc) return res.status(404).send();
        res.send(doc);
      } catch (err) {
        handleErrors(err, res);
      }
    },
    create: async (req, res) => {
      try {
        const dataPlan = new DataPlan(req.body);
        await dataPlan.validate();
        const doc = await dataPlan.save();
        res.status(201).send(doc);
      } catch (err) {
        handleErrors(err, res);
      }
    },
    update: async (req, res) => {
      try {
        const doc = await DataPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!doc) return res.status(404).send();
        res.send(doc);
      } catch (err) {
        handleErrors(err, res);
      }
    },
    destroy: async (req, res) => {
      try {
        await DataPlan.findByIdAndRemove(req.params.id);
        res.status(204).send();
      } catch (err) {
        handleErrors(err, res);
      }
    },
  };
  
  export const userController = {
    index: async (req, res) => {
      try {
        const docs = await User.find({}).populate('dataPlan');
        res.send(docs);
      } catch (err) {
        handleErrors(err, res);
      }
    },
    show: async (req, res) => {
      try {
        const doc = await User.findById(req.params.id).populate('dataPlan');
        if (!doc) return res.status(404).send();
        res.send(doc);
      } catch (err) {
        handleErrors(err, res);
      }
    },
    create: async (req, res) => {
      try {
        const user = new User(req.body);
        await user.validate();
        const doc = await user.save();
        res.status(201).send(doc);
      } catch (err) {
        handleErrors(err, res);
      }
    },
    update: async (req, res) => {
      try {
        const doc = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!doc) return res.status(404).send();
        res.send(doc);
      } catch (err) {
        handleErrors(err, res);
      }
    },
    destroy: async (req, res) => {
      try {
        await User.findByIdAndRemove(req.params.id);
        res.status(204).send();
      } catch (err) {
        handleErrors(err, res);
      }
    },
  };