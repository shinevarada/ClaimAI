def calculate_risk(customer):

    risk = 0
    reasons = []

    if customer["age_of_car"] > 10:
        risk += 30
        reasons.append("Old vehicle risk")

    if customer["policy_tenure"] < 1:
        risk += 20
        reasons.append("Low policy tenure")

    if customer["population_density"] > 5000:
        risk += 20
        reasons.append("High-risk region")

    if customer["claim_status"] == 1:
        risk += 40
        reasons.append("Historical claim pattern")

    level = (
        "HIGH"
        if risk > 60
        else "MEDIUM"
        if risk > 30
        else "LOW"
    )

    return {
        "risk_score": risk,
        "risk_level": level,
        "reasons": reasons
    }