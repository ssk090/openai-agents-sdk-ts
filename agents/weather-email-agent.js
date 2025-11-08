import 'dotenv/config';
import { Agent, run } from "@openai/agents";
import { weatherTool, sendEmailTool } from "../tools/index.js";

const agent = new Agent({
  name: "Weather Email Agent",
  instructions: `
    You are a helpful assistant that can send an email with the weather of a given location. 
    You can use the weatherTool to get the weather of a given location and the sendEmailTool to send an email with the weather of a given location.
    The email address of 'from' is 'onboarding@resend.dev' (this is Resend's test email address for development).
    Get the email address of 'to' from the user.
    The subject of the email is 'Weather Report'.
    The body of the email is the weather report of the given location.
    `,
  tools: [weatherTool, sendEmailTool],
});

async function main() {
  run(
    agent,
    "get the weather of bhubaneswar and send an email to 'shivanandasai.38@gmail.com'"
  );
}

main();
