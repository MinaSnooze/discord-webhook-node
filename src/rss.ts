import Parser from 'rss-parser';

type News = {
  title: string;
  link: string;
};

export const GetFreeGameNews = async (rssUrl: string) => {
  const jstOffset = 9 * 60;
  const now = new Date();
  const offset = now.getTimezoneOffset() + jstOffset;
  now.setTime(now.getTime() + offset * 60 * 1000);

  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  start.setTime(start.getTime() - jstOffset * 60 * 1000);

  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  end.setTime(end.getTime() - jstOffset * 60 * 1000);

  const parser = new Parser();
  const feed = await parser.parseURL(rssUrl);
  const news: News[] = [];
  feed.items.forEach((item) => {
    let itemDate: Date;
    if (item.isoDate) {
      itemDate = new Date(item.isoDate);
    } else if (item.pubDate) {
      itemDate = new Date(item.pubDate);
    } else {
      return;
    }
    if (item.title && item.link) {
      if (itemDate >= start && itemDate < end) {
        if (item.title.match(/無料配布/) || item.title.match(/無料配信/)) {
          news.push({
            title: item.title,
            link: item.link,
          });
        }
      }
    }
  });
  return news;
};
