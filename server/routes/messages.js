var express = require("express");
var router = express.Router();
const Message = require("../models/message");
const sequenceGenerator = require("./sequenceGenerator");

router.get("/", (req, res, next) => {
  Message.find()
    // .populate("sender")
    .exec(function (err, allMessages) {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }
      return res.status(200).json({
        messageAlert: "Message added successfully",
        messages: allMessages,
      });
    });
});

router.post("/", (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
    // sender: currentSenderObjId,
  });

  message
    .save()
    .then((createdMessage) => {
      res.status(201).json({
        message: "Message added successfully",
        message: createdMessage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

module.exports = router;
