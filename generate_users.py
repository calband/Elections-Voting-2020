import asyncio
import aiohttp

election_url = 'https://soqgbubrta.execute-api.us-west-1.amazonaws.com/prod/vote'

voter_list_file = "voters.csv"


async def main(emails):
    # Asynchronous context manager.  Prefer this rather
    # than using a different session for each GET request
    async with aiohttp.ClientSession() as session:
        tasks = []
        for email in emails:
            tasks.append(get(session=session, color=c, **kwargs))
        # asyncio.gather() will wait on the entire task set to be
        # completed.  If you want to process results greedily as they come in,
        # loop over asyncio.as_completed()
        htmls = await asyncio.gather(*tasks, return_exceptions=True)
        return htmls



def gather_emails(csv_file):
    # TODO: finish this
    return []


if __name__ == "__main__":
    main()
