# ClaimShield AI

AI-powered Insurance Claim Risk Intelligence Platform using Vertex AI, MCP-inspired multi-agent orchestration, RAG-grounded reasoning, and human-in-the-loop workflows.

---

# Overview

ClaimShield AI is a cloud-native AI investigation platform designed to identify potentially high-risk insurance policies that may require additional review or escalation.

The platform combines:

* Explainable AI
* Multi-agent orchestration
* Retrieval-Augmented Generation (RAG)
* AI observability
* Human approval workflows
* Google Cloud-native deployment

Unlike traditional black-box prediction systems, ClaimShield AI provides grounded reasoning, workflow traceability, and enterprise-style investigation visibility.

---

# Problem Statement

Insurance claim investigation and policy risk assessment are often:

* manual
* time-consuming
* difficult to scale
* lacking explainability and observability

Traditional systems struggle to:

* identify high-risk policyholders efficiently
* provide trustworthy AI reasoning
* maintain auditability and workflow visibility
* support human reviewers with actionable insights

---

# Solution

ClaimShield AI provides:

* AI-powered risk assessment
* Explainable AI reasoning using Vertex AI
* MCP-inspired multi-agent orchestration
* RAG-grounded contextual reasoning
* Human-in-the-loop approvals
* AI observability and workflow logging
* Cloud-native scalable deployment

The system evaluates policyholder risk using attributes such as:

* policy tenure
* vehicle age
* claim history
* regional indicators
* population density

and recommends whether the policy should:

* proceed normally
* or be escalated for additional investigation.

---

# Features

## AI Risk Analysis

Calculates:

* risk score
* risk level
* investigation indicators

---

## Vertex AI Reasoning

Generates:

* explainable investigation insights
* grounded reasoning
* human-readable recommendations

Powered by:

* Google Vertex AI
* Gemini

---

## MCP-inspired Multi-Agent Orchestration

Implements coordinated workflow execution between:

* MCP Orchestrator
* Risk Analysis Agent
* RAG Retrieval Agent
* Vertex AI Reasoning Agent
* Observability Agent

---

## Retrieval-Augmented Generation (RAG)

Uses:

* ChromaDB
* contextual retrieval workflows

to reduce hallucinations and improve grounded reasoning.

---

## AI Observability

Tracks:

* workflow execution
* agent activity
* orchestration events
* human approval actions

Supports:

* auditability
* enterprise monitoring
* workflow traceability

---
## Human-in-the-loop Audit Logging

ClaimShield AI maintains full workflow traceability through its observability layer.

All workflow stages are logged, including:
- MCP orchestration events
- Risk Analysis Agent execution
- RAG retrieval events
- Vertex AI reasoning generation
- Human approval decisions
- Investigation escalation actions

When a human reviewer clicks:
- Approve Claim
- Escalate Investigation

the action is recorded through the observability layer and stored as part of the audit trail.

This enables:
- enterprise monitoring
- workflow traceability
- AI governance
- auditability
- responsible AI operations

---

# Google Cloud Services Used

* Google Cloud Run
* Vertex AI / Gemini
* Google Cloud Storage

---

# Tech Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS

## Backend

* FastAPI
* Python
* Pandas

## AI & Retrieval

* Vertex AI / Gemini
* ChromaDB
* Retrieval-Augmented Generation (RAG)

## Deployment

* Google Cloud Run
* Docker

---

# System Architecture

<p align="center">
  <img src="assets/Architecture.png" width="900"/>
</p>

---

# AI Workflow

<p align="center">
  <img src="assets/AI_Workflow.png" width="900"/>
</p>

---

# Live Deployment

## Frontend

```text id="readme3"
https://claimshield-frontend-905201834317.us-central1.run.app
```

## Backend

```text id="readme4"
https://claimshield-backend-905201834317.us-central1.run.app
```

---

# Demo Workflow

1. Select insurance policy
2. Trigger AI investigation
3. MCP orchestrator coordinates agents
4. Risk score generated
5. RAG retrieves contextual information
6. Vertex AI generates explainable insight
7. Observability layer logs workflow
8. Human reviewer approves or escalates claim

---

# Dataset

The dataset contains insurance policyholder information including:

* policy tenure
* age of vehicle
* age of policyholder
* population density
* claim history

The target variable indicates whether the policyholder is likely to file a claim within the next 6 months.

## Dataset Source

Insurance Claim Prediction Dataset  
Source: Kaggle

https://www.kaggle.com/datasets/ifteshanajnin/carinsuranceclaimprediction-classification
---

# Key Highlights

* Explainable AI
* Enterprise-style orchestration
* RAG-grounded reasoning
* Human-in-the-loop approvals
* AI observability
* Cloud-native deployment
* Live public demo
* Multi-agent architecture

---

# Future Improvements

* Real-time streaming observability
* BigQuery analytics integration
* Advanced fraud intelligence workflows
* Agent memory persistence
* ML-based predictive scoring models
* Role-based investigation dashboards

---

# Team

## AIChampX

Built during DeployFest 2026 using Google Cloud and Vertex AI.
