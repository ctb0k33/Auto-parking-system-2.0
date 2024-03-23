import { AppError } from "../utils/appError.js";
import { APIFeature } from "../utils/apiFeature.js";
import { catchAsync } from "../utils/catchAsync.js";

export const deleteOne = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return new AppError("No document found with that ID", 404);
    } else {
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  });

export const updateOne = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("no document found with that id ", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const createOne = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await model.create(req.body);
    if (!doc) {
      return next(new AppError("no doc found with that id ", 404));
    }
    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

export const getOne = (model, populate) =>
  catchAsync(async (req, res, next) => {
    // populate happend only in query, but not database
    let query = model.findById(req.params.id);
    if (populate) {
      query = query.populate(populate);
    }
    const doc = await query;
    if (!doc) {
      return next(new AppError("no document found with that id ", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const getAllDoc = (model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeature(model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    //SEND BACK JSON
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
