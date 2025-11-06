import { Agent, run } from "@openai/agents";

const agent = new Agent({
  name: "Assistant",
  instructions:
    "You are a helpful assistant that can answer questions and help with tasks.",
});

async function main() {
  const response = await run(
    agent,
    "send me hello world message with some emojis always"
  );
  console.log(response.finalOutput);
}

main();
