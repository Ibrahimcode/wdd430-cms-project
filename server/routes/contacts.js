var express = require("express");
var router = express.Router();
const Contact = require("../models/contact");
const sequenceGenerator = require("./sequenceGenerator");

router.get("/", (req, res, next) => {
  Contact.find()
    .populate("group")
    .then((contacts) => {
      // console.log(contacts);
      res.status(200).json({
        message: "Contacts fetched successfully!",
        contacts: contacts,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.post("/", (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
    // group: contactObjIdList,
  });

  contact
    .save()
    .then((createdContact) => {
      res.status(201).json({
        message: "Contact added successfully",
        contact: createdContact,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  console.log("Update : " + req.params.id);
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      contact.name = req.body.name;

      contact.email = req.body.email;

      contact.phone = req.body.phone;

      contact.imageUrl = req.body.imageUrl;

      contact.group = req.body.group;

      Contact.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            imgageUrl: req.body.imageUrl,
            group: req.body.group,
          },
        }
      )
        .then((result) => {
          res.status(204).json({
            message: "Contact updated successfully",
            contact: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Contact not found.",
        error: { contact: "Contact not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      Contact.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Contact deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Contact not found.",
        error: { contact: "Contact not found" },
      });
    });
});

module.exports = router;
