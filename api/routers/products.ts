import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import Category from "../models/Category";
import {ProductData} from "../types";
import Product from "../models/Product";
import {Error} from "mongoose";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
    const categoryId = req.query.category;

    try {
        const filter = categoryId ? {category: categoryId} : {};
        const products = await Product.find(filter);
        res.send(products);
    } catch (e) {
        next(e);
    }
});

productsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: 'Not Found'});
    }

    try {
        const product = await Product.findById(id).populate('category').populate('user', 'displayName phoneNumber');
        if (!product) {
            res.status(404).send({error: 'This product not found!'});
        }

        res.send(product);
    } catch (e) {
        next(e);
    }
});

productsRouter.post("/", auth, imagesUpload.single('image'), async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;
    const categoryId = req.body.category;

    try {
        const category = await Category.findById({_id: categoryId});

        if (!category) {
            res.status(404).send({error: 'Not found this category!'});
            return;
        }

        const newProduct: ProductData = {
            user,
            category,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.file && 'images' + req.file.filename
        };

        const product = new Product(newProduct);
        await product.save();
        res.send(product);
    } catch (error) {

        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

productsRouter.delete("/:id", auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const productId = expressReq.params.id;
    const userId = expressReq.user._id;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            res.status(404).send({error: 'This product not found!'});
            return;
        }

        if (userId.toString() !== product.user.toString()) {
            res.status(403).send({error: 'You can not delete this product. This product belongs to another user!'});
            return;
        }

        await product.deleteOne();
        res.send({message: "This product was successfully deleted!"});
    } catch (error) {
        next(error);
    }
});

export default productsRouter;