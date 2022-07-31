import * as https from 'https';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DISCORD_WEBHOOK_URL || !process.env.AUTHOR_NAME) {
  throw new Error('Empty environment');
}

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL,
  AUTHOR_NAME = process.env.AUTHOR_NAME;

export type Field = {
  name: string;
  value: string;
};

export const SendMessageEmbed = (username: string, title: string, description: string, fields: Field[]) => {
  const data = JSON.stringify({
    username,
    embeds: [
      {
        title,
        description,
        color: 56831,
        footer: {
          text: `Created by ${AUTHOR_NAME}`,
        },
        fields,
      },
    ],
  });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const req = https.request(DISCORD_WEBHOOK_URL, options);
  req.write(data);
  req.end();
};
