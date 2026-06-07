"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [policies, setPolicies] = useState<any[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL =
    "https://claimshield-backend-905201834317.us-central1.run.app";

  // ==========================================
  // LOAD POLICIES
  // ==========================================

  useEffect(() => {

    fetchPolicies();
    fetchLogs();

  }, []);

  const fetchPolicies = async () => {

    try {

      const response = await axios.get(
        `${BACKEND_URL}/policies`
      );

      setPolicies(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  // ==========================================
  // FETCH LOGS
  // ==========================================

  const fetchLogs = async () => {

    try {

      const response = await axios.get(
        `${BACKEND_URL}/logs`
      );

      setLogs(response.data.reverse());

    } catch (error) {

      console.error(error);

    }
  };

  // ==========================================
  // ANALYZE POLICY
  // ==========================================

  const analyzePolicy = async (
    policyId: string
  ) => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${BACKEND_URL}/analyze/${policyId}`
      );

      setSelectedPolicy(response.data);

      fetchLogs();

      setLoading(false);

    } catch (error) {

      console.error(error);

      setLoading(false);

    }
  };

  // ==========================================
  // HUMAN APPROVAL ACTION
  // ==========================================

  const submitHumanAction = async (
    action: string
  ) => {

    try {

      await axios.post(
        `${BACKEND_URL}/approve`,
        {
          action: action,
        }
      );

      alert(
        `Human action submitted: ${action}`
      );

      fetchLogs();

    } catch (error) {

      console.error(error);

    }
  };

  // ==========================================
  // RISK COLORS
  // ==========================================

  const getRiskColor = (
    level: string
  ) => {

    if (level === "HIGH") {
      return "border-red-500";
    }

    if (level === "MEDIUM") {
      return "border-yellow-500";
    }

    return "border-green-500";
  };

  const getBadgeColor = (
    level: string
  ) => {

    if (level === "HIGH") {
      return "bg-red-500";
    }

    if (level === "MEDIUM") {
      return "bg-yellow-500 text-black";
    }

    return "bg-green-500";
  };

  // ==========================================
  // COUNTS
  // ==========================================

  const highRisk = policies.filter(
    (p) => p.risk_level === "HIGH"
  ).length;

  const mediumRisk = policies.filter(
    (p) => p.risk_level === "MEDIUM"
  ).length;

  const lowRisk = policies.filter(
    (p) => p.risk_level === "LOW"
  ).length;

  // ==========================================
  // UI
  // ==========================================

  return (

    <main className="min-h-screen bg-black text-white p-8">

      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div className="flex justify-between items-start mb-10">

        <div>

          <div className="flex items-center gap-4">

            <h1 className="text-7xl font-extrabold text-red-500">
              ClaimShield AI
            </h1>

            <span className="bg-green-500 text-black px-4 py-2 rounded-full text-sm font-bold">
              LIVE ON GOOGLE CLOUD
            </span>

          </div>

          <p className="text-gray-400 mt-4 text-2xl max-w-5xl leading-relaxed">
            AI-powered platform for insurance claim risk intelligence
            using explainable AI, RAG-grounded reasoning,
            MCP-inspired orchestration, and human-in-the-loop workflows.
          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-[320px]">

          <p className="text-gray-400 mb-4">
            Powered By
          </p>

          <div className="flex gap-3 flex-wrap">

            <span className="bg-red-500 px-4 py-2 rounded-full font-bold">
              Vertex AI
            </span>

            <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold">
              FastAPI
            </span>

            <span className="bg-green-500 px-4 py-2 rounded-full font-bold">
              RAG
            </span>

            <span className="bg-purple-600 px-4 py-2 rounded-full font-bold">
              MCP
            </span>

          </div>

        </div>

      </div>

      {/* ========================================== */}
      {/* METRICS */}
      {/* ========================================== */}

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

          <p className="text-gray-400 text-2xl">
            Policies Loaded
          </p>

          <h2 className="text-6xl font-bold mt-4">
            {policies.length}
          </h2>

        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-red-500">

          <p className="text-gray-400 text-2xl">
            High Risk Policies
          </p>

          <h2 className="text-6xl font-bold text-red-500 mt-4">
            {highRisk}
          </h2>

        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-yellow-500">

          <p className="text-gray-400 text-2xl">
            Medium Risk
          </p>

          <h2 className="text-6xl font-bold text-yellow-400 mt-4">
            {mediumRisk}
          </h2>

        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-green-500">

          <p className="text-gray-400 text-2xl">
            Low Risk
          </p>

          <h2 className="text-6xl font-bold text-green-400 mt-4">
            {lowRisk}
          </h2>

        </div>

      </div>

      {/* ========================================== */}
      {/* AGENTS */}
      {/* ========================================== */}

      <div className="flex gap-4 flex-wrap mb-12">

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4">
          🔴 RiskAnalysisAgent ACTIVE
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4">
          🟡 RAG Retrieval Agent ACTIVE
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4">
          🟢 Vertex AI Agent ACTIVE
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4">
          🟣 MCP Orchestrator ACTIVE
        </div>

      </div>

      {/* ========================================== */}
      {/* MAIN GRID */}
      {/* ========================================== */}

      <div className="grid grid-cols-2 gap-8">

        {/* ========================================== */}
        {/* POLICIES */}
        {/* ========================================== */}

        <div>

          <h2 className="text-5xl font-bold mb-8">
            Insurance Policies
          </h2>

          <div className="space-y-6 max-h-[900px] overflow-y-auto pr-4">

            {policies.map((policy) => (

              <div
                key={policy.policy_id}
                className={`bg-zinc-900 rounded-3xl p-8 border ${getRiskColor(policy.risk_level)}`}
              >

                <div className="flex justify-between items-start">

                  <h3 className="text-5xl font-bold">
                    {policy.policy_id}
                  </h3>

                  <span
                    className={`px-5 py-2 rounded-full font-bold text-lg ${getBadgeColor(policy.risk_level)}`}
                  >
                    {policy.risk_level}
                  </span>

                </div>

                <div className="mt-6 space-y-4 text-2xl text-gray-300">

                  <p>
                    Policy Tenure:{" "}
                    {policy.policy_tenure.toFixed(2)}
                  </p>

                  <p>
                    Car Age:{" "}
                    {policy.age_of_car.toFixed(2)}
                  </p>

                  <p>
                    Previous Claim History:{" "}
                    {policy.claim_status}
                  </p>

                  <p className="text-red-400 font-bold">
                    Risk Score:{" "}
                    {policy.risk_score}
                  </p>

                </div>

                <button
                  onClick={() =>
                    analyzePolicy(policy.policy_id)
                  }
                  className="mt-8 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl text-xl font-bold"
                >
                  Analyze Risk
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* ========================================== */}
        {/* INVESTIGATION */}
        {/* ========================================== */}

        <div>

          <h2 className="text-5xl font-bold mb-8">
            AI Investigation
          </h2>

          {!selectedPolicy ? (

            <div className="bg-zinc-900 rounded-3xl p-10 h-[700px] flex items-center justify-center text-3xl text-gray-500 text-center leading-relaxed">
              Select a policyholder to initiate
              MCP-driven AI risk investigation workflow.
            </div>

          ) : (

            <div className="bg-zinc-900 rounded-3xl p-8">

              <div className="flex justify-between items-start">

                <h2 className="text-6xl font-bold">
                  {selectedPolicy.customer.policy_id}
                </h2>

                <span
                  className={`px-6 py-3 rounded-full font-bold text-2xl ${getBadgeColor(selectedPolicy.risk.risk_level)}`}
                >
                  {selectedPolicy.risk.risk_level}
                </span>

              </div>

              <h3 className="text-5xl font-bold text-red-400 mt-10">
                Risk Score: {selectedPolicy.risk.risk_score}
              </h3>

              {/* LOADING */}

              {loading && (

                <div className="mt-8 bg-black border border-purple-500 rounded-2xl p-6 text-purple-300 text-2xl animate-pulse">
                  MCP Orchestrator Activating...
                </div>

              )}

              {/* RISK REASONS */}

              <div className="mt-10">

                <h3 className="text-4xl font-bold mb-6">
                  Risk Reasons
                </h3>

                <ul className="list-disc ml-8 text-2xl text-gray-300 space-y-3">

                  {selectedPolicy.risk.reasons.map(
                    (reason: string, idx: number) => (

                      <li key={idx}>
                        {reason}
                      </li>

                    )
                  )}

                </ul>

              </div>

              {/* INSIGHT */}

              <div className="mt-12">

                <h3 className="text-4xl font-bold mb-6">
                  Vertex AI Insight
                </h3>

                <div className="bg-black border border-zinc-700 rounded-2xl p-6 text-xl whitespace-pre-wrap leading-loose text-gray-200">
                  {selectedPolicy.insight}
                </div>

              </div>

              {/* MCP FLOW */}

              <div className="mt-12">

                <h3 className="text-4xl font-bold mb-6">
                  MCP Workflow Architecture
                </h3>

                <div className="bg-black border border-purple-500 rounded-2xl p-6 text-xl text-purple-300">
                  MCP Orchestrator →
                  Risk Analysis Agent →
                  RAG Retrieval Agent →
                  Vertex AI Reasoning Agent →
                  Observability Layer
                </div>

              </div>

              {/* HUMAN ACTIONS */}

              <div className="mt-12 flex gap-6">

                <button
                  onClick={() =>
                    submitHumanAction("escalate")
                  }
                  className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl text-xl font-bold"
                >
                  Escalate Investigation
                </button>

                <button
                  onClick={() =>
                    submitHumanAction("approve")
                  }
                  className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-2xl text-xl font-bold"
                >
                  Approve Claim
                </button>

              </div>

              {/* OBSERVABILITY */}

              <div className="mt-14">

                <h3 className="text-4xl font-bold mb-8">
                  AI Observability
                </h3>

                <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2">

                  {logs.map((log, idx) => (

                    <div
                      key={idx}
                      className="border-l-2 border-red-500 pl-6"
                    >

                      <p className="text-2xl font-bold">
                        {log.step}
                      </p>

                      <p className="text-gray-400 text-lg mt-2">
                        {log.timestamp}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

              {/* FOOTER */}

              <div className="mt-12 text-center text-gray-500 text-lg">
                Powered by Google Cloud Run + Vertex AI
              </div>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}