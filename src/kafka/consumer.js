const kafka = require("./client");

const consumer = kafka.consumer({ groupId: "chat-consumer-group" });
const topic = "send-message";

async function consumeMessages() {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
      return message;
    },
  });
}

consumeMessages();

module.exports = consumeMessages;
