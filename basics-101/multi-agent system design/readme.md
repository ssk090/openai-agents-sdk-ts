# Multi-agent system design patterns
### There are many ways to compose agents together. Two patterns we regularly see in production apps are:

1. Manager (agents as tools) – a central agent owns the conversation and invokes specialized agents that are exposed as tools.
2. Handoffs – the initial agent delegates the entire conversation to a specialist once it has identified the user’s request.



## Manager (agents as tools)
- In this pattern the manager never hands over control—the LLM uses the tools and the manager summarizes the final answer. Read more in the tools guide.

## Handoffs
- With handoffs the triage agent routes requests, but once a handoff occurs the specialist agent owns the conversation until it produces a final output. This keeps prompts short and lets you reason about each agent independently. Learn more in the handoffs guide.