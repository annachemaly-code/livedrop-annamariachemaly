### 3) Cost Model

## Assumptions
- Model: GPT-4o-mini at $0.15/1K prompt tokens, $0.60/1K completion tokens
- Typeahead: Avg tokens in: 10, Avg tokens out: 30
- Support Assistant: Avg tokens in: 50, Avg tokens out: 100
- Requests/day:
  - Typeahead: 50,000
  - Support Assistant: 1,000
- Cache hit rate:
  - Typeahead: 70%
  - Support Assistant: 30%

## Calculation
Cost/action = (tokens_in/1000 * prompt_price) + (tokens_out/1000 * completion_price)  
Daily cost = Cost/action * Requests/day * (1 - cache_hit_rate)

### Typeahead Suggestions
- Cost/action = (10/1000 * $0.15) + (30/1000 * $0.60) = $0.0195 
- Daily cost = $0.0195 * 50,000 * (1 - 0.7) = $292.5  

### Support Assistant
- Cost/action = (50/1000 * $0.15) + (100/1000 * $0.60) = $0.0675  
- Daily cost = $0.0675 * 1,000 * (1 - 0.3) = $47.25

## Cost lever if over budget
- Shorten context tokens (reduce tokens_in or tokens_out)  
- Downgrade model for low-risk queries  
- Increase cache hit rate where possible
