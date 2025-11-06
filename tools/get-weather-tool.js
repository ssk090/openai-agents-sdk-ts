import { tool } from "@openai/agents";
import { z } from "zod";

export const weatherTool = tool({
  name: "get_weather",
  description: "Get the weather of a given location",
  parameters: z.object({
    city: z.string().describe("The city to get the weather of"),
  }),
  execute: async ({ city }) => {
    console.log(`🛠️ Getting weather for ${city}`);
    const url = `https://wttr.in/${city}?format="%C+%t"`;
    const response = await fetch(url);
    const data = await response.text();
    console.log("Weather data", data);
    return `The weather in ${city} is ${data}`;
  },
});
