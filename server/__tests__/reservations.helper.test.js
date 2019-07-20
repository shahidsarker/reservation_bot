const {
  reservationMaker,
  parseRequestBody,
  parseDateTime,
  validateReservation,
  slackReservationMaker
} = require("./../routes/reservations.helper");

const mockMessage = "John 9-15 4pm";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const validFutureDate = new Date(currentYear + 1, 1, 1, 15);
const invalidDate = new Date(1, 13, 2, 2);
const pastDate = new Date(currentYear - 1, 1, 1, 15);

const futureRequest = {
  ToCountry: "US",
  ToState: "NY",
  SmsMessageSid: "vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT",
  NumMedia: "0",
  ToCity: "",
  FromZip: "10003",
  SmsSid: "vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT",
  FromState: "NY",
  SmsStatus: "received",
  FromCity: "NEW YORK",
  Body: "John 09-25 4pm",
  FromCountry: "US",
  To: "+23123052583",
  ToZip: "",
  NumSegments: "1",
  MessageSid: "vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT",
  AccountSid: "QmXxjiKhe8RxJwzohdMYxzezO7xA0ndGsP",
  From: "+42605842845",
  ApiVersion: "2010-04-01"
};

const invalidRequest = {
  ToCountry: "US",
  ToState: "NY",
  SmsMessageSid: "vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT",
  NumMedia: "0",
  ToCity: "",
  FromZip: "10003",
  SmsSid: "vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT",
  FromState: "NY",
  SmsStatus: "received",
  FromCity: "NEW YORK",
  Body: "John 02-25 4pm",
  FromCountry: "US",
  To: "+23123052583",
  ToZip: "",
  NumSegments: "1",
  MessageSid: "vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT",
  AccountSid: "QmXxjiKhe8RxJwzohdMYxzezO7xA0ndGsP",
  From: "+42605842845",
  ApiVersion: "2010-04-01"
};

const dummySlackRequest = {
  token: "gIkuvaNzQIHg97ATvDxqgjtO",
  team_id: "T0001",
  team_domain: "example",
  channel_id: "C2147483705",
  channel_name: "test",
  user_id: "U2147483697",
  user_name: "Steve",
  command: "/rez",
  text: "Steve 12-21 4pm",
  response_url: "https://hooks.slack.com/commands/1234/5678",
  trigger_id: "13345224609.738474920.8088930838d88f008e0"
};

const outsideOpenHoursReservationHour = 11; //11am
const reservationDate = new Date(
  currentYear,
  9,
  17,
  outsideOpenHoursReservationHour + 12
);

const expectedReservationObject = {
  id: Date.now(),
  name: "John",
  dateTime: new Date(currentYear, 8, 25, 16),
  phoneNumber: "+42605842845",
  rawMessage: futureRequest,
  createdAt: new Date()
};

test("sms message is parsed by parseRequestBody", () => {
  expect(parseRequestBody("John 9-15 4pm")).toStrictEqual([
    "John",
    "9-15",
    "4pm"
  ]);
});

test("test parseDateTime pass", () => {
  expect(parseDateTime(["John", "9-15", "4pm"])).toStrictEqual(
    new Date(currentYear, 8, 15, 16)
  );
});

test("test parseDateTime fail non-array", () => {
  expect(parseDateTime(null)).toBe("Invalid Date");
});

test("test parseDateTime fail array", () => {
  expect(parseDateTime(["1", "2", "3", "4"]).valueOf()).toBeNaN();
});

test("validateReservation true", () => {
  expect(validateReservation(validFutureDate)).toBe(true);
});

test("validateReservation false Invalid Date", () => {
  expect(validateReservation(invalidDate)).toBe(false);
});
test("validateReservation false past date", () => {
  expect(validateReservation(pastDate)).toBe(false);
});

test("validateReservation false outside open hours", () => {
  expect(validateReservation(reservationDate)).toBe(false);
});

test("reservationMaker return reservationObject", () => {
  const newReservation = reservationMaker(futureRequest);
  expect(newReservation.name).toBe(expectedReservationObject.name);
  expect(newReservation.dateTime).toStrictEqual(
    expectedReservationObject.dateTime
  );
  expect(newReservation.phoneNumber).toBe(
    expectedReservationObject.phoneNumber
  );
  expect(newReservation.rawMessage).toStrictEqual(
    expectedReservationObject.rawMessage
  );
});

test("reservationMaker return null", () => {
  expect(reservationMaker(invalidRequest)).toBeNull();
});

test.todo("slackReservationMaker return reservationObject");
test.todo("slackReservationMaker return null");
// test.todo("");
// test.todo("");
