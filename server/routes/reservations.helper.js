// Takes a message in the format 'NAME MM-DD HHpm' and returns an array of info
const parseRequestBody = requestBody => {
  return requestBody.split(' ');
};

const parseDateTime = messageArray => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const [month, date] = messageArray[1].split('-').map(int => parseInt(int));

    const time = parseInt(messageArray[2].replace(/\D/g, ''));
    const parsedDate = new Date(currentYear, month - 1, date, time + 12);

    return parsedDate;
  } catch (err) {
    return 'Invalid Date';
  }
};

const validateReservation = dateTime => {
  // TODO: fix to check for true dateTime instead of checking 3 failing conditions
  const currentDate = new Date();
  if (dateTime == 'Invalid Date') {
    return false;
  } else if (dateTime < currentDate) {
    //check if the reservation date and time past today
    return false;
  } else if (dateTime.getHours() < 13 || dateTime.getHours() > 21) {
    //check if the request time is between 1pm and 9pm (store opening between 1pm to 10pm, 1 hour duration)
    return false;
  }
  return true;
};

const reservationMaker = twilioReq => {
  const messageArray = parseRequestBody(twilioReq.Body);

  const reservationDate = parseDateTime(messageArray);

  if (validateReservation(reservationDate)) {
    const reservationObject = {
      id: Date.now(),
      name: messageArray[0],
      dateTime: reservationDate,
      phoneNumber: twilioReq.From,
      rawMessage: twilioReq,
      createdAt: new Date()
    };

    return reservationObject;
  } else {
    return null;
  }
};

// // check if the reservation sms format is in the format of "Name, Date (yyyy-mm-dd), Time (hh:mm)"
// const reservationInfo = (reservationMessage) => {
//     const reservationInfoArray = reservationMessage.split(',').map(info => info.trim());
//     return reservationInfoArray;
// };

// const makeDate = (date, time) => {
//     const reservationDate = new Date(`${date}T${time}:00`);
//     return reservationDate;
// };

// const validReservationRequest = (reservationInfoArr) => {
//     if (reservationInfoArr.length !== 3) {
//         //check if the reservationInfoArr has 3 elements
//         return false;
//     }

//     const reservationDate = makeDate(reservationInfoArr[1], reservationInfoArr[2]);
//     const currentDate = new Date();
//     if (reservationDate == 'Invalid Date') {
//         //check if the 2nd input is a valid date
//         return false;
//     } else if (reservationDate < currentDate) {
//         //check if the reservation date and time pasted today
//         return false;
//     } else if (reservationDate.getHours() < 1 || reservationDate.getHours() >= 9) {
//         //check if the request time is between 1pm and 9pm (store opening between 1pm to 10pm, 1 hour of durations)
//         return false;
//     }
//     return true;
// };

// // create a reservation data object
// const createReservation = (msg, reservationInfoArr) => {
//     const reservationDate = makeDate(reservationInfoArr[1], reservationInfoArr[2]);
//     return { id: msg.SmsMessageSid,
//              name: reservationInfoArr[0],
//              dateTime: reservationDate,
//              phoneNumber: msg.From,
//              rawMessage: msg.Body };
// };

// module.exports = {createReservation, validReservationRequest, reservationInfo};

module.exports = {
  reservationMaker,
  parseRequestBody,
  parseDateTime,
  validateReservation
};
