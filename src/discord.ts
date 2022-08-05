import fetch from 'node-fetch';
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

export const SendMessageEmbed = async (username: string, title: string, description: string, fields: Field[]) => {
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
  try {
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const text = await res.text();
    console.log(text);
  } catch (err) {
    console.log(err);
  }
};
