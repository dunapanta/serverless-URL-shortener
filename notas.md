## URL Shortener Clase 5 - Add DynamoDB

- Para agregar nuevos recursos en `serverless.ts`, agregamos la sección `resources`, en donde se puede definir `Resources` y `Outputs`.
- Para mejor organización en la carpeta serverless se crea `dynamoResources.ts`

```
const dynamoResources: AWS["resources"]["Resources"] = {
  urlTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "${self:custom.urlTableName}",
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
    },
  },
};

export default dynamoResources;
```

- Se importa en `serverless.ts` y se agrega a `resources`

```
resources: {
    Resources: {
      ...dynamoResources,
    },
  },
```

## URL Shortener Clase 7 - Set Url Code

- Para agregar una variable de entorno du¡námica (clamer code) switch

```
baseUrl: {
        "Fn::Join": [
          "",
          [
            "https://",
            { Ref: "HttpApi" },
            ".execute-api.${self:provider.region}.amazonaws.com",
          ],
        ],
      },
```

## URL Shortener Clase 8 - Create DynamoDB Library
- Ejecutar `npm install @aws-sdk/client-dynamodb`
- Ejecutar `npm install @aws-sdk/lib-dynamodb`
- En `dynamo.ts`
```
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
    await dynamoClient.send(command);

    return data;
  },
};

```

## URL Shortener Clase 9 - Define permissions that Lambda have
- Agregar policy a lambda para utilizar DynamoDB, en `serverless.ts` en `provider` agregar `iamRoleStatements`
```
iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource:
          "arn:aws:dynamodb:${self:provider.region}:{aws:accountId}:table/${self:custom.urlTableName}",
      },
    ],
```
