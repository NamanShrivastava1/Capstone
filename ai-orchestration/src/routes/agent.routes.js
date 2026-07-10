import { Router } from "express";
import agent from "../agents/code.agent.js";

const agentRouter = Router();

// agentRouter.post("/invoke", async (req, res) => {
//   console.log("Agent Invoking");
//   try {
//     const { message, projectId } = req.body;
//     const response = await agent.invoke(
//       {
//         messages: [
//           {
//             role: "user",
//             content: message,
//           },
//         ],
//       },
//       {
//         context: {
//           projectId,
//         },
//       },
//     );
//     res.json({ response });
//   } catch (error) {
//     console.log("Error invoking agent", error);
//     res.status(500).json({ error: "Failed to invoke agent" });
//   }
// });

agentRouter.post("/invoke", async (req, res) => {
  console.log("Agent Invoking");

  try {
    const { message, projectId } = req.body;

    console.log("Before invoke");

    const response = await agent.invoke(
      {
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        context: {
          projectId,
        },
      },
    );

    console.log("After invoke"); // <-- Does this ever print?
    console.log(response);

    res.json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default agentRouter;
