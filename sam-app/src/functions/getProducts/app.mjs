import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async () => {
  try {
    const result = await client.send(
      new ScanCommand({ TableName: process.env.TABLE_NAME })
    );
    const items = (result.Items || []).sort((a, b) =>
      String(a.id).localeCompare(String(b.id), undefined, { numeric: true })
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to load products" }),
    };
  }
};