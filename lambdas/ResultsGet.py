import json
import boto3

ddb = boto3.resource("dynamodb")

votes = ddb.Table("Votes")


def lambda_handler(event, context):
    # Grab ALL votes inside the Votes db
    # Run Ranked Choice Voting algorithm
    # Tabulate
    # Return results!

    return create_response(200, "Voted successfully!")


def create_response(status_code, message, body=None):
    if body is None:
        body = {}

    body["message"] = message

    return {
        "statusCode": status_code,
        "isBase64Encoded": False,
        "headers": {
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(body)
    }
