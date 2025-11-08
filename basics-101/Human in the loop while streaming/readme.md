# Human in the loop while streaming

Streaming is compatible with handoffs that pause execution (for example when a tool requires approval). The `interruption` field on the stream object exposes the interruptions, and you can continue execution by calling `state.approve()` or `state.reject()` for each of them. Executing again with `{ stream: true }` resumes streaming output.