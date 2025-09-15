import express from "express";

const router = express.Router();
import {
  getContacts,
  getContactById,
  showAddForm,
  addContact,
  showUpdateForm,
  updateContact,
  deleteContact
} from "../controllers/contacts.controller.js";



router.get("/", getContacts);
router.get("/show-contact/:id", getContactById);
router.get("/add-contact", showAddForm);
router.post("/add-contact", addContact);
router.get("/update-contact/:id", showUpdateForm);
router.post("/update-contact/:id", updateContact);
router.post("/delete-contact/:id", deleteContact);  // POST delete

export default router;
