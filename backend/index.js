import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Car, insertCarData } from "./models/carModel.js";
import { MakeModel, insertMakeModelData } from "./models/makeModel.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))

app.get('/', (req, res) => {
    console.log(req)
    return res.status(200).send('Hey!')
});

// GET car
app.get('/car', async (req, res) => {
    try {
        const { make, model, year, mileageMin, mileageMax, state, category, condition } = req.query;
        const query = {};

        if (make) query.Make = make;
        if (model) query.Model = model;
        if (year) query.Year = Number(year);
        if (condition) query.VehicleCondition = condition;
        if (category) query.SaleCategory = category;


        if (mileageMin || mileageMax) {
            query.Odometer = {};
            if (mileageMin) query.Odometer.$gte = Number(mileageMin);
            if (mileageMax) query.Odometer.$lte = Number(mileageMax);
        }

        if (state) {
            // Use a regular expression to match the state in parentheses
            query.SaleLocation = new RegExp(`\\(${state}\\)`, 'i');
        }


        const cars = await Car.find(query);
        res.json(cars);

    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET makes-models
app.get('/makes-models', async(req, res) => {
    try {
        const makeModels = await MakeModel.find();
        res.json(makeModels);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

mongoose.connect(mongoDBURL).then(() => {
    console.log('Connected to database successfully')
    // insertCarData()
    // insertMakeModelData()

    app.listen(PORT, () => {
        console.log(`Listening to port: ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
});