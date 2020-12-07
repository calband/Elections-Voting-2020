import os
import json
import boto3
import requests

ses = boto3.client('ses', region_name="us-west-2")
admin_password = os.environ["CAL_BAND_VOTING_PASS"]

registration_url = "https://soqgbubrta.execute-api.us-west-1.amazonaws.com/prod/register/"
election_url = 'http://democracy.calband.org/'
voter_list_file = "test_voters.csv"
email_file = "voterEmail.html"


def main():
    emails = gather_emails(voter_list_file)
    for email in emails:
        username, password = grab_voting_info(email)
        html = generate_html(username, password)
        send_email(username, html)
        print(f"Succesfully created voter registration for {email}!")


def gather_emails(csv_file):
    with open(csv_file, "r") as reader:
        emails = reader.readlines()

    return [email.strip() for email in "".join(emails).split(",")]


def grab_voting_info(email):
    payload = {
        "voterId": email,
        "secretKey": admin_password
    }

    # lol this is so bad pls abstract away your api keys in an environment variable or .env file
    headers = {
        "x-api-key": "CB1pjRpF7S9xAL2Xuchch4LVEGMYDaJo7mMtnNbD"
    }

    resp = requests.post(registration_url, json.dumps(payload), headers=headers)
    assert resp.ok
    body = resp.json()
    return body["username"], body["password"]


def generate_html(username, password):
    with open(email_file, "r") as reader:
        html_lines = reader.readlines()

    html = "\n".join(html_lines)
    return html.replace(
        "{{EMAIL}}", username).replace(
        "{{PASSWORD}}", password
    )


def send_email(email, html):
    ses.send_email(
        Source="ebaccay@berkeley.edu",
        Destination={
            "ToAddresses": [email]
        },
        Message={
            "Subject": {
                "Data": "[Action Required] Your Cal Band Voter Registration"
            },
            "Body": {
                "Html": {
                    "Data": html
                }
            }
        }
    )


if __name__ == "__main__":
    main()
