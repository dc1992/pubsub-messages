import { PubSub } from '@google-cloud/pubsub';
import { pubsubMessage } from './types';

const messageSenderGenerator = (pubSub: PubSub) => ({
    publish: async (message: pubsubMessage): Promise<string> => {
        const eventBuffer = Buffer.from(JSON.stringify(message.event))
    
        const messageId = await pubSub
            .topic(message.topic)
            .publishMessage({
                'data': eventBuffer,
                'attributes': message.attributes
            });

        return messageId;
    }
})

export { messageSenderGenerator };