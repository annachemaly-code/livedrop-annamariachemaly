### 1) AI Capability Map

| Capability | Intent (user) | Inputs (this sprint) | Risk 1–5 (tag) | p95 ms | Est. cost/action | Fallback | Selected |
|---|---|---|---|---:|---:|---|:---:|
| Typeahead Suggestions | Quickly find products | User typing in search bar | 2 | 300 | $0.01 | Show top 5 popular products | Yes |
| Support Assistant | Answer customer FAQs | User question, Policies/FAQ markdown | 2 | 1200 | $0.05 | Show FAQ page | Yes |
| Personalized Promotions | Show relevant deals | User profile, past orders | 3 | 500 | $0.03 | Default promotion banner | No |
| Inventory Alerts | Notify low stock | SKU, inventory DB | 2 | 400 | $0.02 | No alert | No |

**Why these two:**  
Typeahead Suggestions and Support Assistant were selected because they directly improve the user experience and reduce support load. 
Typeahead increases conversion by helping users find products faster, while the Support Assistant lowers contact rates by answering common questions automatically. Both have low integration risk since the data sources already exist and the implementation is straightforward within this sprint.
