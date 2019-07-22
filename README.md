# Rez Bot

[![Build Status](https://travis-ci.com/shahidsarker/reservation_bot.svg?branch=master)](https://travis-ci.com/shahidsarker/reservation_bot)

An app that connects with the Twilio API and Slack API to create restaurant reservations via SMS or slash command.

You can send a message in the format `[Name] [MM-DD] [TTam]` to make a reservation. For example, if John wants a reservation at 4pm on August 28, he would send `John 08-28 4pm` via SMS or Slack.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Please make sure you have the following:

- [Twilio](https://www.twilio.com/) create a phone number to use with their Programmable SMS service
- [ngrok](https://ngrok.com/) allows you to test out webhooks locally
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) _The Node.js installer should include this_
- [Git](https://git-scm.com/)
- [Postgres](https://www.postgresql.org/)
- [Slack App](https://api.slack.com/start/overview) create a Slack app to

### Installing

Create a Postgres database for the project and save its connection URL as a `DATABASE_URL` environment variable.

Run the following terminal commands to get the app running:

Clone this repository onto your local machine:

```bash
git clone https://github.com/shahidsarker/reservation_bot.git
```

Move into the project directory:

```bash
cd reservation_bot/
```

Run the following commands to install Node modules, migrate the database, and start the server:

```bash
npm install
sequelize db:migrate
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

Copy the forwarding address ending in `ngrok.io`.

Add the following as a Messaging webhook in Twilio:

```
https://[ngrok url]/reservations/sms
```

Add the following as a slash command Request URL for your Slack app:

```
https://[ngrok url]//reservations/slack
```

## Running the tests

To run tests locally, run the following command from the parent directory:

```
npm test
```

## Built With

- [Express](https://expressjs.com/) - The Node.js web framework used
- React
- Twilio API
- Slack API

## Authors

- **Shahid Sarker** - [shahidsarker](https://github.com/shahidsarker) Reservation functions, Postgres setup, Travis CI integration
- **Cindy Song** - [zs0606](https://github.com/zs0606) Initial setup, tests, reservation helpers

## Resources

- [Twilio: Set up your Node.js and Express Development Environment](https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-node-js-and-express-development-environment)
- [Twilio: Test Your Webhooks Locally with ngrok](https://www.twilio.com/blog/2013/10/test-your-webhooks-locally-with-ngrok.html)
- [Slack: Slash Commands](https://api.slack.com/slash-commands)
