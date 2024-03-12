const kafka = require("./client");

const producer = kafka.producer();

async function produceMessage(message) {
  await producer.connect();
  await producer.send({
    topic: "send-message",
    messages: [{ value: JSON.stringify(message) }],
  });
  await producer.disconnect();
}

module.exports = produceMessage;
