# Reservation Bot

An app that connects with the Twilio API to receive texts and create restaurant reservations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you have the following:

- [Twilio](https://www.twilio.com/) create a phone number to use with their Programmable SMS service
- [ngrok](https://ngrok.com/)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) _The Node.js installer should include this_
- [Git](https://git-scm.com/)

### Installing

Run the following terminal commands to get the app running:

Clone this repository onto your local machine:

```bash
git clone https://github.com/shahidsarker/reservation_bot.git
```

Move into the project directory:

```bash
cd reservation_bot/
```

Move into the server directory and run the following commands to install Node modules and start the server:

```bash
cd server/
npm install
npm start
```

In a separate terminal, move into the client directory then run the following commands to install Node modules and start the client:

```bash
cd client/
npm install
npm start
```

In a separate terminal window, move into the directory containing `ngrok` and run:

```bash
./ngrok http 3001
```

Copy the forwarding address ending in `ngrok.io` and add it as a

## Running the tests

Explain how to run the automated tests for this system

```
Give an example
```

## Built With

- [Express](https://expressjs.com/) - The Node.js web framework used
- React
- Twilio API

## Authors

- **Shahid Sarker** - [shahidsarker](https://github.com/shahidsarker
- **Cindy Song** - [zs0606](https://github.com/zs0606)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.
