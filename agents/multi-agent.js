import 'dotenv/config';
import { Agent, run } from '@openai/agents';
import z from 'zod';

const historyAgent = new Agent({
    name: "History Agent",
    instructions: "An agent that provides information about historical events, figures, and timelines. Explain important events and context clearly.",
})

const mathAgent = new Agent({
    name: "Math Agent",
    instructions: "You provide help with math problems. Explain your reasoning at each step and include examples.",
})

const combinedAgent = new Agent({
    name: "Combined Agent",
    instructions: "You determine which agent to use based on the user's question",
    handoffs: [historyAgent, mathAgent],
})

// this just prints the final output
// async function main() {
//     const response = await run(combinedAgent, "Who was the first president of the United States?");
//     console.log(response.finalOutput);

// }
// this streams the output as it is generated
async function main() {
    const response = await run(combinedAgent, "Who was the first president of the United States? explain please", {
        stream: true
    });
    response
        .toTextStream({
            compatibleWithNodeStreams: true,
        })
        .pipe(process.stdout);
}

main();