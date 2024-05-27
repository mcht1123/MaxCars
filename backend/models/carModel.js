import mongoose from "mongoose";
import { faker } from '@faker-js/faker';

const carSchema = new mongoose.Schema({
    Make: String,
    Model: String,
    Year: Number,
    Description: String,
    Odometer: Number,
    VehicleCondition: String,
    SaleLocation: String,
    SaleCategory: String,
    SalvageVehicle: String,
    SaleDate: Date
});

export const Car = mongoose.model('Car', carSchema);


const makeModelMap = {
    "Toyota": ["Corolla", "Camry", "RAV4"],
    "Ford": ["Focus", "Mustang", "Fiesta"],
    "Honda": ["Civic", "Accord", "CR-V"],
    "BMW": ["3 Series", "5 Series", "X3"],
    "Audi": ["A4", "A6", "Q5"],
    "Mercedes-Benz": ["C-Class", "E-Class", "GLC"],
    "Chevrolet": ["Impala", "Malibu", "Equinox"],
    "Nissan": ["Altima", "Sentra", "Rogue"],
    "Hyundai": ["Elantra", "Sonata", "Tucson"],
    "Volkswagen": ["Golf", "Passat", "Tiguan"]
};

const conditions = ["Excellent", "Good", "Above Average", "Average", "Below Average"];
const locations = [
    "Sydney (NSW)", "Melbourne (VIC)", "Brisbane (QLD)", "Perth (WA)", "Adelaide (SA)",
    "Hobart (TAS)", "Darwin (NT)", "Canberra (ACT)", "Newcastle (NSW)", "Wollongong (NSW)"
];
const categories = ["Auction", "Dealership", "Fixed Price", "Wholesale"];

async function generateCarData() {
    let records = [];
    for (let i = 0; i < 200; i++) {
        let make = Object.keys(makeModelMap)[Math.floor(Math.random() * Object.keys(makeModelMap).length)];
        let model = makeModelMap[make][Math.floor(Math.random() * makeModelMap[make].length)];
        let record = new Car({
            Make: make,
            Model: model,
            Year: Math.floor(Math.random() * (2023 - 2000 + 1)) + 2000,
            Description: faker.lorem.sentence(),
            Odometer: Math.floor(Math.random() * 300001),
            VehicleCondition: conditions[Math.floor(Math.random() * conditions.length)],
            SaleLocation: locations[Math.floor(Math.random() * locations.length)],
            SaleCategory: categories[Math.floor(Math.random() * categories.length)],
            SalvageVehicle: Math.random() < 0.5 ? "Yes" : "No",
            SaleDate: faker.date.past(5)
        });
        records.push(record);
    }

    return records;
}

export async function insertCarData() {
    try {
        const carData = await generateCarData();
        await Car.insertMany(carData);
        console.log("200 car data records inserted into MongoDB successfully!");
    } catch (error) {
        console.error("Error inserting car data:", error);
    } finally {
        mongoose.connection.close();
    }
}