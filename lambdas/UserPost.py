import json
import boto3
import traceback
import hashlib

ddb = boto3.resource("dynamodb")

voters = ddb.Table("CalbandUsers")

required_params = [
    "voterId",
    "pwHash",
    "secretKey"
]


def lambda_handler(event, context):
    try:
        return main(event, context)
    except:
        print("-----ERROR. TRACEBACK:-----")
        traceback.print_exc()
        print("-------END TRACEBACK-------")
        # return create_response(500, traceback.format_exc())
        return create_response(500, "OOPSIE WOOPSIE!! Uwu We make a fucky wucky!! A wittle fucko boingo! The code monkeys at comp comm are working VEWY HAWD to fix this! Owo")


def main(event, context):
    body = json.loads(event["body"])

    # Verify that request is valid
    if not verify_request(body):
        return create_response(400, "Missing parameters required to vote or parameters provided are malformed - vote discarded.")

    # lol this is such bad practice never do this pls
    # always obfuscate away your keys to environment variables kids
    if create_hash(body["secretKey"]) != '4acf6433cfbd0d1127956815934fb4c77c40':
        return create_response(400, "Invalid password")

    # Check if user is in database
    registered_voter = voters.get_item(
        Key={"email": body["voterId"]}
    )
    if "Item" in registered_voter:
        return create_response(400, "Voter ID is already registered - user registration discarded.")

    # Create user!
    create_user(body["voterId"], body["pwHash"])

    return create_response(200, "Registered successfully! Thank you for making democracy a SUCCESS")


def verify_request(body):
    for param in required_params:
        if param not in body:
            return False

    return True


def create_user(username, pw_hash):
    voters.put_item(
        Item={
            "email": username,
            "pwHash": create_hash(pw_hash),
            "dm": False,
            "execSec": False,
            "prd": False,
            "stud": False
        }
    )


def create_hash(*args):
    arg_string = "".join([str(arg) for arg in args])
    return hashlib.sha256(arg_string.encode()).hexdigest()[:36]


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
