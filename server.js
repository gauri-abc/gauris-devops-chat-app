const express = require('express');
const cors = require('cors'); // Import CORS

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

const definition = {
  devops: {
    easy: "DevOps is a combination of practices that combines software development (Dev) and IT operations (Ops).",
    story: "Imagine you're in a bakery. DevOps is like having both the baker and the cashier work together, so the cakes are baked and sold faster.",
    technical: "DevOps integrates and automates the work of software development and IT operations to improve collaboration and productivity."
  },
  sre: {
    easy: "SRE or Site Reliability Engineering makes sure websites or apps are always running smoothly.",
    story: "Imagine an airplane pilot continuously monitoring and adjusting the flight path to ensure smooth travels for passengers.",
    technical: "SRE applies software engineering practices to IT operations problems to manage systems, automate processes, and ensure reliability."
  },
  cloud: {
    easy: "Cloud computing is like renting a storage space and powerful computers over the internet.",
    story: "Think of cloud as a library, where instead of owning all the books, you just borrow what you need whenever you want.",
    technical: "Cloud computing is the delivery of computing services over the internet to offer faster innovation, flexible resources, and economies of scale."
  }
};

app.get('/api/definition', (req, res) => {
  const term = req.query.term.toLowerCase();
  const result = definition[term] || {};
  
  const response = {
    easy: result.easy || "Easy explanation not available.",
    story: result.story || "Story not available.",
    technical: result.technical || "Technical explanation not available."
  };
  
  res.json({ definition: `${response.easy}\n\nStory: ${response.story}\n\nTechnical: ${response.technical}` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
