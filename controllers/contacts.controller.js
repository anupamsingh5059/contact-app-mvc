import Contact from "../models/contacts.models.js";

// Get all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    // res.json(contacts);
    res.render("home", { contacts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching contacts");
  }
};

// Get single contact
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send("Contact not found");
    res.render("show-contact", { contact });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching contact");
  }
};

// Show add form
export const showAddForm = (req, res) => {
  res.render("add-contact");
};

// Add contact
export const addContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding contact");
  }
};

// Show update form
export const showUpdateForm = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send("Contact not found");
    res.render("update-contact", { contact });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading contact for update");
  }
};

// Update contact
export const updateContact = async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/show-contact/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating contact");
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting contact");
  }
};
