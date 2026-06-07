import vertexai
from vertexai.generative_models import GenerativeModel

from dotenv import load_dotenv
import os

load_dotenv()

PROJECT_ID = os.getenv("PROJECT_ID")

vertexai.init(
    project=PROJECT_ID,
    location="us-central1"
)

model = GenerativeModel("gemini-2.5-flash")

def generate_insight(customer, risk, context):

    prompt = f"""
    You are an Insurance Risk Intelligence AI Agent.

    Policyholder:
    {customer}

    Risk Analysis:
    {risk}

    Enterprise Policies:
    {context}

    Explain:
    1. Why the policyholder is risky
    2. Fraud indicators
    3. Recommended business action

    Keep concise and professional.
    """

    response = model.generate_content(prompt)

    return response.text