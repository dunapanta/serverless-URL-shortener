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
