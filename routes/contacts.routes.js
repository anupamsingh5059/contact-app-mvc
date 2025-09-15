import express from "express";
import Contact from "../models/contacts.models.js";   // 👈 import model

const router = express.Router();

// Route
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render("home", { contacts });
  } catch (error) {
    res.status(500).send("Error fetching contacts");
  }
});

router.get("/show-contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    res.render("show-contact", { contact });
  } catch (error) {
    res.status(500).send("Error loading contact");
  }
});

// Show Add Contact Form
router.get("/add-contact", (req, res) => {
  res.render("add-contact");
});

router.post("/add-contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error adding contact");
  }
});

// Show update form
router.get("/update-contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    res.render("update-contact", { contact });
  } catch (error) {
    res.status(500).send("Error loading contact");
  }
});

// Handle update form submission
router.post("/update-contact/:id", async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    });
    res.redirect(`/show-contact/${req.params.id}`);
  } catch (error) {
    res.status(500).send("Error updating contact");
  }
});

// Hard Delete - Contact remove permanently
router.get("/delete-contact/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting contact");
  }
});

export default router;
