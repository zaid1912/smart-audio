const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(config);

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

const port = 8020;
app.listen(port, () => console.log(`server is running on port: ${port}`));
