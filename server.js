const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config(); // Load environment variables from .env file

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Access the API key from the environment variable
});

const openai = new OpenAIApi(config);

const app = express();
app.use(bodyParser.json());
app.use(cors());
// const path = require('path');

app.use(express.static('build')); // Serve static files from the build folder

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.post("/chat", async (req, res) => {
  const { transcript } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt: transcript,
  });

  res.send(completion.data.choices[0].text);
});



// const port = 8020;
const port = process.env.PORT || 8020;
app.listen(port, () => console.log(`server is running on port: ${port}`));

// app.listen(process.env.PORT || 8020, () => console.log(`Server is running`));