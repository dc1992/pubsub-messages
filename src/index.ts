import { messageSenderGenerator } from './utils/pubsub';
import * as dotenv from 'dotenv'
import { pubsubMessage, isValidPubsubMessage } from './utils/types';
import fs from 'fs'
import path from 'path'
import { PubSub } from '@google-cloud/pubsub';


(async () => {
  console.log(`Starting..`);

  dotenv.config()

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log(`Undefined GOOGLE_APPLICATION_CREDENTIALS environment variable`);
    return;
  }

  const messagesDirectory = path.join(__dirname, '..', 'messages');
  const files = await fs.promises.readdir(messagesDirectory);
  const jsonFiles = files.filter(a => a.endsWith('.json'));

  if (jsonFiles.length === 0) {
    console.log(`No data has been found in ${messagesDirectory}`);
    return;
  }

  console.log(`${jsonFiles.length} messages found in ${messagesDirectory}`);

  const pubsub = new PubSub();
  const messageSender = messageSenderGenerator(pubsub);

  for (const jsonFileName of jsonFiles) {
    const fullJsonFilePath = path.join(messagesDirectory, jsonFileName);
    const rawMessage = await fs.promises.readFile(fullJsonFilePath, 'utf-8')
    const message: pubsubMessage = JSON.parse(rawMessage);

    if (!isValidPubsubMessage(message)) {
      console.log(`${jsonFileName} is not valid, not sent`);
      continue;
    }

    const messageId = await messageSender.publish(message)

    console.log(`${jsonFileName} event sent with id ${messageId}`);
  }

  console.log(`Done.`);
})();