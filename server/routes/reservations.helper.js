// Takes a message in the format 'NAME MM-DD HHpm' and returns an array of info
const parseRequestBody = requestBody => {
  return requestBody.split(" ");
};

const parseDateTime = messageArray => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const [month, date] = messageArray[1].split("-").map(int => parseInt(int));

    const time = parseInt(messageArray[2].replace(/\D/g, ""));
    const parsedDate = new Date(currentYear, month - 1, date, time + 12);

    return parsedDate;
  } catch (err) {
    return "Invalid Date";
  }
};

const validateReservation = dateTime => {
  const currentDate = new Date();
  if (
    dateTime > currentDate &&
    13 <= dateTime.getHours() &&
    dateTime.getHours() <= 21
  ) {
    return true;
  }
  return false;
};

const reservationMaker = twilioReq => {
  const messageArray = parseRequestBody(twilioReq.Body);

  const reservationDate = parseDateTime(messageArray);

  if (validateReservation(reservationDate)) {
    const reservationObject = {
      name: messageArray[0],
      dateTime: reservationDate,
      phoneNumber: twilioReq.From,
      rawMessage: twilioReq
    };

    return reservationObject;
  } else {
    return null;
  }
};

const slackReservationMaker = slackReq => {
  const messageArray = parseRequestBody(slackReq.text);

  const reservationDate = parseDateTime(messageArray);

  if (validateReservation(reservationDate)) {
    const reservationObject = {
      person_name: messageArray[0],
      date: reservationDate,
      phonenumber: `${slackReq.user_name}@${slackReq.team_domain}`,
      raw_body: slackReq
    };
    return reservationObject;
  } else {
    return null;
  }
};

module.exports = {
  reservationMaker,
  parseRequestBody,
  parseDateTime,
  validateReservation,
  slackReservationMaker
};
