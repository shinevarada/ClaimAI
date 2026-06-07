from risk_engine import calculate_risk
from rag_engine import retrieve_context
from vertex_service import generate_insight
from observability import log_event


def run_mcp_workflow(customer):

    workflow = {}

    # ==========================================
    # MCP ORCHESTRATOR START
    # ==========================================

    log_event(
        "MCP Orchestrator Activated"
    )

    # ==========================================
    # STEP 1 — RISK ANALYSIS AGENT
    # ==========================================

    log_event(
        "Risk Analysis Agent Triggered"
    )

    risk = calculate_risk(customer)

    workflow["risk"] = risk

    log_event(
        "Risk Analysis Completed"
    )

    # ==========================================
    # STEP 2 — RAG RETRIEVAL AGENT
    # ==========================================

    log_event(
        "RAG Retrieval Agent Triggered"
    )

    rag_context = retrieve_context(
        "insurance claim investigation policies"
    )

    workflow["rag_context"] = rag_context

    log_event(
        "RAG Context Retrieved"
    )

    # ==========================================
    # STEP 3 — VERTEX AI REASONING AGENT
    # ==========================================

    log_event(
        "Vertex AI Agent Triggered"
    )

    insight = generate_insight(
        customer,
        risk,
        rag_context
    )

    workflow["insight"] = insight

    log_event(
        "Vertex AI Reasoning Completed"
    )

    # ==========================================
    # STEP 4 — OBSERVABILITY AGENT
    # ==========================================

    log_event(
        "Observability Agent Logged Workflow"
    )

    # ==========================================
    # MCP WORKFLOW COMPLETE
    # ==========================================

    log_event(
        "MCP Multi-Agent Workflow Completed"
    )

    return workflow