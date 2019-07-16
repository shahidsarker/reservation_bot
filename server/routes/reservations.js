var express = require("express");
var router = express.Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const { reservationMaker } = require("./reservations.helper");
// const database = [];
const database = [
  {
    id: 1563160660411,
    name: "John",
    dateTime: new Date("2019-09-15T20:00:00.000Z"),
    phoneNumber: "+18888675309",
    rawMessage: {
      ToCountry: "US",
      ToState: "NY",
      NumMedia: "0",
      ToCity: "",
      FromZip: "90210",
      FromState: "NY",
      SmsStatus: "received",
      FromCity: "NEW YORK",
      Body: "John 9-15 4pm",
      FromCountry: "US",
      To: "+18888675309",
      ToZip: "",
      NumSegments: "1",
      From: "+18888675309",
      ApiVersion: "2010-04-01"
    },
    createdAt: new Date("2019-07-15T03:17:40.411Z")
  },
  {
    id: 1563161004024,
    name: "Molly",
    dateTime: new Date("2019-02-15T21:00:00.000Z"),
    phoneNumber: undefined,
    rawMessage: {
      ToCountry: "US",
      ToState: "NY",
      NumMedia: "0",
      ToCity: "",
      FromZip: "10014",
      FromState: "NY",
      SmsStatus: "received",
      FromCity: "NEW YORK",
      Body: "Molly 2-15 4pm",
      FromCountry: "US",
      ToZip: "",
      NumSegments: "1",
      ApiVersion: "2010-04-01"
    },
    createdAt: new Date("2019-07-15T03:23:24.024Z")
  }
];

/* GET users listing. */
router.get("/", function(req, res, next) {
  const currentDate = new Date();
  // res.send('respond with a resource');
  const filteredDatabase = database.filter(
    reservation => reservation.dateTime > currentDate
  );
  res.json(filteredDatabase);
});

/* POST user request reservation through message and create new reservation*/
router.post("/sms", (req, res, next) => {
  const twiml = new MessagingResponse();

  const reservation = reservationMaker(req.body);
  if (reservation) {
    database.push(reservation);
    twiml.message("Your reservation was successful");
  } else {
    twiml.message(
      'Your reservation was invalid, please request with "Name Date [mm-dd] Time [hh]", between 1pm and 9pm'
    );
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

module.exports = router;
