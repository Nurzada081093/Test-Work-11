import express from "express";
import Category from "../models/Category";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (_req, res, next) => {
    try {
        const allCategories = await Category.find();
        res.send(allCategories);
    } catch (e) {
        next(e);
    }
});

export default categoriesRouter;