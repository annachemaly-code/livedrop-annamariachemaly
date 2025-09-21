### 2) Touchpoint Specs

## 1) Typeahead Suggestions

**Problem statement:**  
Users want to find products quickly as they type in the search bar. Currently, they must type the full name or navigate multiple pages, reducing conversion and increasing frustration.

**Happy path:**  
1. User clicks on the search bar.  
2. User begins typing a query.  
3. Frontend sends partial query to backend API.  
4. Backend queries cached AI suggestions.  
5. Model returns top 5–10 suggestions.  
6. Frontend displays suggestions in dropdown.  
7. User selects a suggestion → navigates to product page.  

**Grounding & guardrails:**  
- Source of truth: Product catalog (10k SKUs).  
- Retrieval scope: Top 50 matching SKUs.  
- Max context: 50 tokens.  
- Refuse queries outside product catalog.  

**Human-in-the-loop:**  
- Escalation: No escalation for Typeahead.  
- UI: Dropdown suggestions.  
- Reviewer/SLA: Not applicable.  

**Latency budget:**  
- Frontend request: 50 ms  
- Backend cache retrieval: 50 ms  
- Model inference: 150 ms  
- Rendering suggestions: 50 ms  
- Total p95 ≤ 300 ms  
- Cache: 70% hit rate  

**Error & fallback behavior:**  
- If model fails, show top 5 popular products.  
- Log failure for review.  

**PII handling:**  
- No user PII leaves the app.  
- Queries logged without personal identifiers.  

**Success metrics:**  
- Product metric 1: Click-through rate on suggestions: CTR = clicks / impressions  
- Product metric 2: Search-to-purchase conversion: Conversion = purchases from suggestions / total searches  
- Business metric: Revenue uplift = Σ(additional sales from Typeahead suggestions)

**Feasibility note:**  
- Data available: Product catalog exists.  
- API/tool: Backend API can call model for suggestions.  
- Next prototype step: Integrate model with cache and measure latency.

[Typeahead Probe Screenshot](/docs/ai-first/probe/typeahead_test.png)
---

## 2) Support Assistant

**Problem statement:**  
Users frequently ask common questions about orders and policies. Support team handles repetitive queries, increasing cost and response time.

**Happy path:**  
1. User opens chat widget.  
2. User types a question.  
3. Frontend sends question to Support Assistant API.  
4. Model retrieves relevant FAQ/Policies from markdown.  
5. Model generates answer.  
6. Frontend displays answer to user.  
7. If user is satisfied → session ends.  
8. If user requests human help → escalate to support agent.  

**Grounding & guardrails:**  
- Source of truth: Policies/FAQ markdown.  
- Retrieval scope: Relevant section of markdown.  
- Max context: 500 tokens.  
- Refuse outside scope queries.  

**Human-in-the-loop:**  
- Escalation triggers: User asks for human help, model confidence < threshold.  
- UI: “Escalate to agent” button.  
- Reviewer/SLA: Support agent responds within 2 hours.  

**Latency budget:**  
- Frontend request: 50 ms  
- Retrieval from markdown: 100 ms  
- Model inference: 1000 ms  
- Rendering: 50 ms  
- Total p95 ≤ 1200 ms  
- Cache: 30% hit rate  

**Error & fallback behavior:**  
- If model fails → show relevant FAQ link.  
- Log all failures for review.  

**PII handling:**  
- Redact email, order ID, or other sensitive info from queries.  
- Logs store only anonymized text.  

**Success metrics:**  
- Product metric 1: First-response accuracy: FRA = correct answers / total queries  
- Product metric 2: Escalation rate: ER = escalated queries / total queries  
- Business metric: Support cost reduction: SCR = reduction in agent workload per day  

**Feasibility note:**  
- Data available: FAQ markdown exists, order-status API available.  
- API/tool: Model inference via GPT-4o-mini or Llama.  
- Next prototype step: Connect chat widget to model and log response metrics.
