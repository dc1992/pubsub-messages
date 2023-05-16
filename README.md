# pubsub-messages

This script is a simple utility for sending messages on pubsub.

## Setup
- Create a `.env` file in the main directory of the project and add the path of the credentials
  - `GOOGLE_APPLICATION_CREDENTIALS=/path/to/pubsub/credentials.json`
- Put your json files containing the message under the `/messages` directory. The jsons must have the following format:
```json
{
    "topic": "your-topic",
    "event": {
        "example": "data",
        "another_example": 1
    },
    "attributes": {
        "event_type": "MyEvent/Type",
        "project_id": "ProjectId",
        "data_version": "1.0",
        "meta_data_version": "1.0",
        "trace": "",
        "content_type": "application/json"
    }
}
``` 


## Running
Open a shell and:
- `npm run build`
- `npm start`

pubsub-messages will use the credentials provided in the `.env` file and publish the events that finds under `/messages`.