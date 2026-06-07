import chromadb

client = chromadb.Client()

collection = client.create_collection(
    "claim_playbook"
)

with open("playbook.txt") as f:
    content = f.read()

collection.add(
    documents=[content],
    ids=["playbook"]
)

def retrieve_context(query):

    results = collection.query(
        query_texts=[query],
        n_results=1
    )

    return results["documents"][0][0]