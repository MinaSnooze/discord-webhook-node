import { Field, SendMessageEmbed } from './src/discord';
import { GetFreeGameNews } from './src/rss';

export const lambdaHandler = async () => {
  const automaton = await GetFreeGameNews('https://automaton-media.com/feed/');
  const gamespark = await GetFreeGameNews('https://www.gamespark.jp/rss/index.rdf');
  const fourgamer = await GetFreeGameNews('https://www.4gamer.net/rss/pc/pc_news.xml');
  const news = automaton.concat(gamespark, fourgamer);
  if (news.length === 0) {
    return;
  }

  const embedFieldData = news.map((v) => <Field>{ name: v.title, value: v.link });

  SendMessageEmbed(
    '無料配布,配信大好きマン',
    '昨日の無料配布,配信ゲーム記事',
    '昨日に各ニュースサイトから発信された、\n無料配布,配信のゲーム記事をピックアップ！',
    embedFieldData
  );
};
