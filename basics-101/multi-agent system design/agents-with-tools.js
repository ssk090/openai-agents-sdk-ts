//Agents as tools

import { Agent, run } from "@openai/agents";

const bookingAgent = new Agent({
    name: 'Booking expert',
    instructions: 'Answer booking questions and modify reservations.',
});

const refundAgent = new Agent({
    name: 'Refund expert',
    instructions: 'Help customers process refunds and credits.',
});

const customerFacingAgent = new Agent({
    name: "Customer Facing Agent",
    instructions:
        'Talk to the user directly. When they need booking or refund help, call the matching tool.',
    tools: [
        bookingAgent.asTool({
            toolName: 'booking_agent',
            toolDescription: 'Handles booking questions and requests.',
        }),
        refundAgent.asTool({
            toolName: 'refund_agent',
            toolDescription: 'Handles refund questions and requests.',
        })
    ]
})

async function main() {
    const response = await run(customerFacingAgent, "I need to change my booking and get a refund for my last trip.");
    console.log(response.finalOutput);
}
main();