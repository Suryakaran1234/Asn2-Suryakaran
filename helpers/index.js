/******************************************************************************
 ***
 * ITE5315 – Assignment 1
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Surya Karan Sharma Student ID: N01530697 Date: 3rd Oct., 2023
 *
 *
 ******************************************************************************
 **/
const fs = require("fs");

let preprocessedData = null;

async function readJSON(path) {
  // Initialize the preprocessedData variable which will hold the loaded JSON data.
  await fs.readFile(
    path.join(__dirname, "../CarSales.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.error("Error loading JSON data:", err);
        process.exit(1); // Terminate the process with a non-zero exit code
      }
      try {
        preprocessedData = JSON.parse(data);
        console.log("JSON data is loaded and ready!");
      } catch (parseErr) {
        console.error("Error parsing JSON data:", parseErr);
        process.exit(1); // Terminate the process with a non-zero exit code
      }
      //console.log(preprocessedData);
    }
  );
}

async function displayInvoiceNo(res, id, path) {
  await readJSON(path);
  if (!preprocessedData) {
    return res.render("error", { message: "Error loading JSON data." });
  }
  const index = parseInt(id, 10);
  if (isNaN(index) || index < 0 || index >= preprocessedData.length)
    return res.render("error", { message: "Invalid Index provided." });
  const item = preprocessedData[index];
  if (item && "InvoiceNo" in item) return item.InvoiceNo;
  return res.render("error", {
    message: "InvoiceNo not found for the given index.",
  });
}

function searchInvoiceNo(req, res, path) {
  readJSON(path);
  if (!preprocessedData) {
    return res.render("error", { message: "Error loading JSON data." });
  }
  const { invoiceNo } = req.body;
  const result = preprocessedData.find((item) => item.InvoiceNo === invoiceNo);
  console.log(result);
  if (result)
    return res.render("car", {
      invoiceNo,
      invoice: result,
    });

  return res.render("error", {
    message: `<h1 style="color:red;">No data found for InvoiceNo: ${invoiceNo}</h1>`,
  });
}

function searchManufacturer(req, res, path) {
  readJSON(path);

  const manufacturer = req.body.manufacturer; // Access the property directly
  if (!preprocessedData) {
    return res.render("error", { message: "Error loading JSON data." });
  }
  const matchedRecords = preprocessedData.filter(
    (item) =>
      item.Manufacturer &&
      item.Manufacturer.toLowerCase().includes(manufacturer.toLowerCase())
  );
  if (matchedRecords.length > 0) {
    res.render("manufacturer-view", {
      records: matchedRecords,
      Query: manufacturer,
    });
  } else {
    res.render("error", {
      message: `No sales records found for Manufacturer: ${manufacturer}`,
    });
  }
}

module.exports = {
  preprocessedData,
  readJSON,
  displayInvoiceNo,
  searchInvoiceNo,
  searchManufacturer,
};
