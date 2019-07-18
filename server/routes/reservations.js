var express = require("express");
var router = express.Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const {
  reservationMaker,
  slackReservationMaker
} = require("./reservations.helper");
const Reservation = require("../models").Reservation;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const wrongFormatMessage =
  'Your reservation was invalid, please request with "Name Date [mm-dd] Time [hh]", between 1pm and 9pm';

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
  console.log(req);
  const currentDate = new Date();

  Reservation.findAll({ where: { date: { [Op.gt]: currentDate } } })
    .then(reservations => {
      res.json(reservations);
    })
    .catch(err => res.status(400).send(err));
});

/* POST user request reservation through message and create new reservation*/
router.post("/sms", (req, res, next) => {
  const twiml = new MessagingResponse();

  const reservation = reservationMaker(req.body);
  if (reservation) {
    Reservation.create({
      person_name: reservation.name,
      date: reservation.dateTime,
      phonenumber: reservation.phoneNumber,
      raw_body: reservation.rawMessage
    }).then(reservation => {
      console.log(reservation);
    });
    twiml.message("Your reservation was successful");
  } else {
    twiml.message(wrongFormatMessage);
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

router.post("/slack", (req, res, next) => {
  const reservation = slackReservationMaker(req.body);
  console.log(reservation);
  if (reservation) {
    Reservation.create(reservation)
      .then(pgres => {
        console.log(pgres);
        return pgres;
      })
      .then(reservation => {
        res
          .send(`Reservation successfully made for ${reservation.person_name}`)
          .end();
      });
    // .catch(err => res.send("Sorry, could not make"));
  } else {
    res.send(wrongFormatMessage).end();
  }
});

module.exports = router;
