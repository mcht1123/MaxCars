import {
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Table,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Container,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import NoRecords from "../components/NoRecords";
import axios from "axios";

function Cars() {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    mileageMin: "",
    mileageMax: "",
    condition: "",
    category: "",
    state: "",
  });
  const [makesModels, setMakesModels] = useState([]);
  const [title, setTitle] = useState("Select make & model to search");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllMakes = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/makes-models");
        setMakesModels(data);
      } catch (err) {
        setError("Failed to fetch makes and models.");
      }
    };

    fetchAllMakes();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/car", {
        params: form,
      });

      let message = "Used car sales for all makes and models";
      if (form.make) message = `Used car sales for ${form.make} ${form.model}`;
      setTitle(message);
      setResults(data);
    } catch (err) {
      setError("Failed to fetch cars.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResults([]);
    setForm({
      make: "",
      model: "",
      year: "",
      mileageMin: "",
      mileageMax: "",
      condition: "",
      category: "",
      state: "",
    });
    setTitle("Select make & model to search");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const carConditions = [
    "Excellent",
    "Good",
    "Above Average",
    "Average",
    "Below Average",
  ];
  const carCategories = ["Auction", "Dealership", "Fixed Price", "Wholesale"];
  const states = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT"];

  return (
    <Container maxWidth={false}>
      <Stack justifyContent="center" alignItems="center" spacing={10}>
        <Typography variant="h2" component="div">
          {title}
        </Typography>

        <Card>
          <CardContent>
            <Stack direction={{ sm: "column", md: "row" }} spacing={5}>
              <TextField
                id="make"
                select
                label="Make"
                name="make"
                value={form.make}
                onChange={handleChange}
                sx={{ width: "200px" }}
                InputProps={{
                  style: {
                    borderRadius: "16px",
                  },
                }}
              >
                {makesModels.map((option, index) => (
                  <MenuItem key={index} value={option.make}>
                    {option.make}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="model"
                select
                label="Model"
                name="model"
                value={form.model}
                onChange={handleChange}
                sx={{ width: "200px" }}
                InputProps={{
                  style: {
                    borderRadius: "16px",
                  },
                }}
              >
                {!form.make && <MenuItem value="" />}

                {form.make &&
                  makesModels
                    .find((option) => option.make === form.make)
                    .models.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
              </TextField>

              <TextField
                id="year"
                name="year"
                placeholder="Year"
                value={form.year}
                onChange={handleChange}
                sx={{ width: "200px" }}
                InputProps={{
                  style: {
                    borderRadius: "16px",
                  },
                }}
              />

              <TextField
                id="condition"
                select
                label="Condition"
                name="condition"
                value={form.condition}
                onChange={handleChange}
                sx={{ width: "200px" }}
                InputProps={{
                  style: {
                    borderRadius: "16px",
                  },
                }}
              >
                {carConditions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Stack
              direction={{ sm: "column", md: "row" }}
              sx={{ my: "20px" }}
              spacing={5}
            >
              <TextField
                id="mileageMin"
                name="mileageMin"
                placeholder="Minimum Mileage"
                value={form.mileageMin}
                onChange={handleChange}
                sx={{ width: "200px" }}
                InputProps={{
                  style: {
                    borderRadius: "16px",
                  },
                }}
              />

              <TextField
                id="mileageMax"
                name="mileageMax"
                placeholder="Maximum Mileage"
                value={form.mileageMax}
                onChange={handleChange}
                sx={{ width: "200px" }}
                InputProps={{
                  style: {
                    borderRadius: "16px",
                  },
                }}
              />

              <TextField
                id="state"
                select
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                sx={{ width: "200px" }}
                InputProps={{
                  style: {
                    borderRadius: "16px",
                  },
                }}
              >
                {states.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="category"
                select
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                sx={{ width: "200px" }}
                InputProps={{
                  style: {
                    borderRadius: "16px",
                  },
                }}
              >
                {carCategories.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Stack
              direction={{ sm: "column", md: "row" }}
              justifyContent="end"
              spacing={5}
            >
              <Button
                sx={{ width: "200px", height: "50px", borderRadius: "16px" }}
                variant="contained"
                onClick={fetchCars}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Apply"}
              </Button>
              <Button
                sx={{ width: "200px", height: "50px", borderRadius: "16px" }}
                variant="outlined"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {error && <Typography color="error">{error}</Typography>}

        {!results.length && !loading ? (
          <NoRecords />
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Make</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Odometer &nbsp;(km)</TableCell>
                  <TableCell>Vehicle condition</TableCell>
                  <TableCell>Sale location</TableCell>
                  <TableCell>Sale category</TableCell>
                  <TableCell>Salvage Vehicle</TableCell>
                  <TableCell>Sale date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.Make}</TableCell>
                    <TableCell>{row.Model}</TableCell>
                    <TableCell>{row.Year}</TableCell>
                    <TableCell>{row.Description}</TableCell>
                    <TableCell>{row.Odometer}</TableCell>
                    <TableCell>{row.VehicleCondition}</TableCell>
                    <TableCell>{row.SaleLocation}</TableCell>
                    <TableCell>{row.SaleCategory}</TableCell>
                    <TableCell>{row.SalvageVehicle}</TableCell>
                    <TableCell>
                      {format(new Date(row.SaleDate), "MMM yyyy")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Container>
  );
}

export default Cars;
