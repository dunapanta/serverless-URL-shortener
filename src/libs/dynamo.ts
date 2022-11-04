import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";

//default region where lambda is deploying
const dynamoClient = new DynamoDBClient({});
export const dynamo = {
  write: async (data: Record<string, any>, tableName: string) => {
    const params: PutCommandInput = {
      TableName: tableName,
      Item: data,
    };
    const command = new PutCommand(params);
    const res = await dynamoClient.send(command);
    console.log("DynamoDb res:", res);

    return data;
  },
};
