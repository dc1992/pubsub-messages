type attributes = { [k: string]: (string) };

type json =
    | string
    | number
    | boolean
    | { [x: string]: json }
    | Array<json>;

type pubsubMessage = {
    topic: string,
    event: json,
    attributes: attributes
}

const isValidPubsubMessage = (obj: any): obj is pubsubMessage =>
    obj &&
    typeof obj.topic === 'string' &&
    isValidJson(obj.event) &&
    isValidAttributes(obj.attributes);

const isValidJson = (value: any): value is json => {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
      return true;
    
    if (Array.isArray(value))
      return value.every(isValidJson);
    
    if (typeof value === 'object' && value !== null)
      return Object.values(value).every(isValidJson);
    
    return false;
  }

const isValidAttributes = (obj: any): obj is attributes => {
    if (typeof obj !== 'object' || obj === null)
      return false;
    
    for (const key in obj) {
      if (typeof obj[key] !== 'string')
        return false;
    }
    
    return true;
  }

export { pubsubMessage, isValidPubsubMessage }