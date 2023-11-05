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
const express = require("express");
const fs = require("fs").promises;
const path = require("path");

// Create router
const router = express.Router();
const {
  readJSON,
  displayInvoiceNo,
  searchInvoiceNo,
  searchManufacturer,
} = require("../helpers/index");

// Initialize built-in middleware for urlencoding and json
router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Route for the main page or default page
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// route for '/users'
router.get("/users", function (req, res) {
  res.send("respond with a resource");
});

// --------------------------------------------------------------------------------------

// Step 3 =>
router.get("/about", async (req, res) => {
  try {
    const data = { title: "About Me" };
    res.render("resume", data);
  } catch (error) {
    console.log(error);
    res.render("error", {
      message: "Internal Server Error!",
    });
  }
});

router.get("/cv", async (req, res) => {
  try {
    const data = { title: "CV" };
    res.render("resume", data);
  } catch (error) {
    console.log(error);
    res.render("error", {
      message: "Internal Server Error!",
    });
  }
});

router.get("/data", async (req, res) => {
  try {
    await readJSON(path);
    res.render("json-loaded");
  } catch (error) {
    console.log(error);
    res.render("error", {
      message: "Internal Server Error!",
    });
  }
});

router.get("/data/invoiceNo/:index", async (req, res) => {
  try {
    const index = req.params.index;
    const invoiceNo = await displayInvoiceNo(res, index, path);
    res.render("displayInvoiceNo", { invoiceNo });
  } catch (error) {
    console.log(error);
    res.render("error", {
      message: "Internal Server Error!",
    });
  }
});

router.get("/search/invoiceNo", async (req, res) => {
  try {
    const data = { title: "Search by InvoiceNo" };
    res.render("invoice-search", data);
  } catch (error) {
    console.log(error);
    res.render("error", {
      message: "Internal Server Error!",
    });
  }
});

router.post(
  "/search/invoiceNo",
  express.urlencoded({ extended: true }),
  (req, res) => {
    try {
      searchInvoiceNo(req, res, path);
    } catch (error) {
      console.log(error);
      res.render("error", {
        message: "Internal Server Error!",
      });
    }
  }
);

router.get("/search/Manufacturer", async (req, res) => {
  try {
    const data = { title: "Search by Manufacturer" };
    res.render("manufacturer-search", data);
  } catch (error) {
    console.log(error);
    res.render("error", {
      message: "Internal Server Error!",
    });
  }
});

router.post(
  "/search/Manufacturer",
  express.urlencoded({ extended: true }),
  (req, res) => {
    try {
      searchManufacturer(req, res, path);
    } catch (error) {
      console.log(error);
      res.render("error", {
        message: "Internal Server Error!",
      });
    }
  }
);

router.get("/allData", async (req, res) => {
  try {
    const rawData = await fs.readFile(
      path.join(__dirname, "../CarSales.json"),
      "utf-8"
    );
    const salesData = JSON.parse(rawData);

    res.render("all-data", { salesData, title: "All Sales Data" });
  } catch (error) {
    console.error(error);
    res.render("error", {
      message: "Internal Server Error!",
    });
  }
});

router.get("/allDataFiltered", async (req, res) => {
  try {
    const rawData = await fs.readFile(
      path.join(__dirname, "../CarSales.json"),
      "utf-8"
    );
    const salesData = JSON.parse(rawData);

    res.render("all-data-filtered", { salesData, title: "All Sales Data" });
  } catch (error) {
    console.error(error);
    res.render("error", {
      message: "Internal Server Error!",
    });
  }
});

// Catch-all route for handling incorrect/undefined routes
router.get("*", function (req, res) {
  res.render("error", {
    title: "Error",
    message: "Wrong Route",
    layout: false,
  });
});

// Export router
module.exports = router;
