import express from "express";
import cors from "cors";
import mongoDb from "./mongoDb";
import config from "./config";
import mongoose from "mongoose";
import userRouter from "./routers/users";
import categoriesRouter from "./routers/categories";
import productsRouter from "./routers/products";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', userRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));