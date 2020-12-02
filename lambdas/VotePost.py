import json
import boto3

ddb = boto3.resource("dynamodb")

voters = ddb.Table("CalbandUsers")
votes = ddb.Table("Votes")


def lambda_handler(event, context):
    body = event["body"]

    # Check if user is in database
    # Check if password hashes match
    # Check if valid vote
    # Register

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
