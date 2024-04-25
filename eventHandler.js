const { ServiceBusClient } = require("@azure/service-bus");
const connectionString = "YOUR_SERVICEBUS_CONNECTION_STRING";
const topicName = "YOUR_TOPIC_NAME";
const subscriptionName = "YOUR_SUBSCRIPTION_NAME";

// Function to send cloud events
async function sendEvent() {
    const serviceBusClient = new ServiceBusClient(connectionString);
    const sender = serviceBusClient.createSender(topicName);

    const event = {
        eventType: "MyApp.UserCreated",
        userId: "123",
        userName: "John Doe",
        timestamp: new Date().toISOString()
    };

    try {
        await sender.sendMessages({ body: JSON.stringify(event) });
        console.log("Event sent:", event);
    } catch (error) {
        console.error("Error sending event:", error);
    } finally {
        await sender.close();
        await serviceBusClient.close();
    }
}

// Function to receive cloud events
async function receiveEvents() {
    const serviceBusClient = new ServiceBusClient(connectionString);
    const receiver = serviceBusClient.createReceiver(topicName, subscriptionName);

    try {
        const messages = await receiver.receiveMessages(10);

        messages.forEach(message => {
            console.log("Received event:", message.body);
            // Handle the event here...
        });

        await receiver.completeMessages(messages);
    } catch (error) {
        console.error("Error receiving events:", error);
    } finally {
        await receiver.close();
        await serviceBusClient.close();
    }
}


module.exports = { sendEvent, receiveEvents }
