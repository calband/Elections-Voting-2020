import json
import boto3
import traceback
import hashlib

ddb = boto3.resource("dynamodb")

voters = ddb.Table("CalbandUsers")

required_params = [
    "voterId",
    "oldPwHash",
    "newPwHash"
]


def lambda_handler(event, context):
    try:
        return main(event, context)
    except:
        print("-----ERROR. TRACEBACK:-----")
        traceback.print_exc()
        print("-------END TRACEBACK-------")
        # return create_response(500, traceback.format_exc())
        return create_response(500, "OOPSIE WOOPSIE!! Uwu We make a fucky wucky!! A wittle fucko boingo! The gowden beaws at comp comm are working VEWY HAWD to fix this! Owo")


def main(event, context):
    body = json.loads(event["body"])

    # Verify that request is valid
    if not verify_request(body):
        return create_response(400, "Missing parameters required to vote or parameters provided are malformed - vote discarded.")

    # Check if user is in database
    registered_voter = voters.get_item(
        Key={"email": body["voterId"]}
    )
    if "Item" not in registered_voter:
        return create_response(400, "Incorrect username or password!")
    registered_voter = registered_voter["Item"]

    # Check if old passwords match
    if registered_voter["pwHash"] != create_hash(body["oldPwHash"]):
        return create_response(400, "Incorrect username or password!")

    # Check if voter accidentally pressed send early
    if body["newPwHash"] == "":
        return create_response(400, "Your new password can't be the empty you silly goose")

    # Check if new password is the same as the old password
    if registered_voter["pwHash"] == create_hash(body["newPwHash"]):
        return create_response(400, "Your new password can't be the same as the old password you silly goose")

    # Update password!
    update_password(body["voterId"], body["newPwHash"])
    return create_response(200, "Successfully changed password! You are now ready to vote in the ExComm elections :)")


def verify_request(body):
    for param in required_params:
        if param not in body:
            return False

    return True


def update_password(username, pw_hash):
    voters.update_item(
        Key={"email": username},
        UpdateExpression="SET pwHash = :pwHash, pwChanged = :pwChanged",
        ExpressionAttributeValues={
            ":pwHash": create_hash(pw_hash),
            ":pwChanged": True
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
