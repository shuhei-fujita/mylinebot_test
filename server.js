'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: 'a92fd9b1b95c96105b7319e1d9bb5d3a',
    channelAccessToken: 'bmp8h9NOiMCzrFltk7LdvRtxZ9N4de1StcvzepWE+JnCdfI6PpDC9tWhfmuiQGovOZXZ7HXlfQqqPKUQ6Fs0dF+FXz/58X1FwDoW5ehB3zYxayZOmw6O4/XMTPsEhknMNEr0QGqcaOJ/nlZl8LUFogdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);