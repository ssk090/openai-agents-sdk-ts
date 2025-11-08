import { Agent, run } from "@openai/agents";
import z from "zod";

const agent = new Agent({
  name: "Assistant",
  instructions:
    "You are a helpful assistant that can answer questions and help with tasks.",
  // structured output
  outputType: z.object({
    message: z.string().describe("The message to send to the user"),
  })
});

async function main() {
  const response = await run(
    agent,
    "send me hello world message with some emojis always"
  );
  console.log(response.finalOutput);
}

main();
