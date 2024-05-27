import mongoose from "mongoose";

const makeModelSchema = new mongoose.Schema({
  make: { type: String, required: true },
  models: { type: [String], required: true },
});

// Create make and model model
export const MakeModel = mongoose.model("MakeModel", makeModelSchema);

// Make and model data
const makeModelData = [
  { make: "Toyota", models: ["Corolla", "Camry", "RAV4"] },
  { make: "Ford", models: ["Focus", "Mustang", "Fiesta"] },
  { make: "Honda", models: ["Civic", "Accord", "CR-V"] },
  { make: "BMW", models: ["3 Series", "5 Series", "X3"] },
  { make: "Audi", models: ["A4", "A6", "Q5"] },
  { make: "Mercedes-Benz", models: ["C-Class", "E-Class", "GLC"] },
  { make: "Chevrolet", models: ["Impala", "Malibu", "Equinox"] },
  { make: "Nissan", models: ["Altima", "Sentra", "Rogue"] },
  { make: "Hyundai", models: ["Elantra", "Sonata", "Tucson"] },
  { make: "Volkswagen", models: ["Golf", "Passat", "Tiguan"] },
];

export async function insertMakeModelData() {
  try {
    // Clear existing data
    await MakeModel.deleteMany({});

    // Insert new data
    await MakeModel.insertMany(makeModelData);
    console.log("Make and model data inserted successfully!");
  } catch (error) {
    console.error("Error inserting make and model data:", error);
  } finally {
    mongoose.connection.close();
  }
}
