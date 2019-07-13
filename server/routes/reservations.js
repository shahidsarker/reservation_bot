var express = require("express");
var router = express.Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;

/* GET users listing. */
router.get("/", function(req, res, next) {
  // res.send('respond with a resource');
  res.json([
    { id: 1, name: "Eli Ferdinand, party of 2 @ 8pm" },
    { id: 2, name: "Cecilija Frantzisko, party of 5 @ 3pm" }
  ]);
});

router.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message("The Robots are coming! Head for the hills!");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

module.exports = router;
