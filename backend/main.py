from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import json

from google.cloud import storage
from io import StringIO

from mcp_orchestrator import run_mcp_workflow
from risk_engine import calculate_risk
from observability import log_event

app = FastAPI()

# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# LOAD DATASET FROM GOOGLE CLOUD STORAGE
# ==========================================

def load_dataset():

    client = storage.Client()

    bucket = client.bucket(
        "claimshield-dataset"
    )

    blob = bucket.blob(
        "car_insurance.csv"
    )

    data = blob.download_as_text()

    df = pd.read_csv(
        StringIO(data),
        nrows=50
    )

    return df


df = load_dataset()

sample_data = df.sample(15)

# ==========================================
# HOME
# ==========================================

@app.get("/")
def home():

    return {
        "message": "ClaimShield AI Backend Running",
        "architecture": "MCP-inspired Multi-Agent Workflow",
        "dataset_source": "Google Cloud Storage"
    }

# ==========================================
# GET POLICIES
# ==========================================

@app.get("/policies")
def get_policies():

    policies = []

    for _, row in sample_data.iterrows():

        customer = {
            "policy_id": str(row["policy_id"]),
            "policy_tenure": float(
                row["policy_tenure"]
            ),
            "age_of_car": float(
                row["age_of_car"]
            ),
            "age_of_policyholder": float(
                row["age_of_policyholder"]
            ),
            "population_density": int(
                row["population_density"]
            ),
            "claim_status": int(
                row["is_claim"]
            )
        }

        # ==========================================
        # RISK PREVIEW
        # ==========================================

        risk = calculate_risk(customer)

        customer["risk_level"] = (
            risk["risk_level"]
        )

        customer["risk_score"] = (
            risk["risk_score"]
        )

        policies.append(customer)

    return policies

# ==========================================
# MCP WORKFLOW ANALYSIS
# ==========================================

@app.get("/analyze/{policy_id}")
def analyze(policy_id: str):

    row = sample_data[
        sample_data["policy_id"] == policy_id
    ]

    if row.empty:

        raise HTTPException(
            status_code=404,
            detail="Policy not found"
        )

    row = row.iloc[0]

    customer = {
        "policy_id": str(row["policy_id"]),
        "policy_tenure": float(
            row["policy_tenure"]
        ),
        "age_of_car": float(
            row["age_of_car"]
        ),
        "age_of_policyholder": float(
            row["age_of_policyholder"]
        ),
        "population_density": int(
            row["population_density"]
        ),
        "claim_status": int(
            row["is_claim"]
        )
    }

    # ==========================================
    # MCP ORCHESTRATION
    # ==========================================

    log_event(
        f"MCP Workflow Started: {policy_id}"
    )

    workflow = run_mcp_workflow(customer)

    log_event(
        "MCP Workflow Completed"
    )

    # ==========================================
    # FINAL RESPONSE
    # ==========================================

    return {
        "architecture": "MCP-inspired AI Orchestration",
        "dataset_source": "Google Cloud Storage",
        "customer": customer,
        "risk": workflow["risk"],
        "context": workflow["rag_context"],
        "insight": workflow["insight"]
    }

# ==========================================
# OBSERVABILITY LOGS
# ==========================================

@app.get("/logs")
def logs():

    try:

        with open("logs.json") as f:
            return json.load(f)

    except:

        return []

# ==========================================
# HUMAN APPROVAL
# ==========================================

@app.post("/approve")
def approve(action: dict):

    log_event(
        f"Human Approval Submitted: {action['action']}"
    )

    return {
        "status": "approved",
        "message": "Human review workflow completed"
    }

# ==========================================
# MCP STATUS
# ==========================================

@app.get("/mcp-status")
def mcp_status():

    return {
        "status": "ACTIVE",
        "architecture": "MCP-inspired Modular AI Workflow",
        "dataset_source": "Google Cloud Storage",
        "agents": [
            "MCP Orchestrator",
            "Risk Analysis Agent",
            "RAG Retrieval Agent",
            "Vertex AI Reasoning Agent",
            "Observability Agent"
        ]
    }