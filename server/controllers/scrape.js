const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

///// GET
// : /api/scrape/steam
exports.scrapeSteam = async (req, res, next) => {
	console.log('running')
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://store.steampowered.com/search/?maxprice=90&tags=5350&category1=998&supportedlang=norwegian"
  );
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await autoScroll(page);
  const result = {
    game: [],
    img: [],
    price: [],
    date: [],
  };

  await page.content().then((html) => {
    const $ = cheerio.load(html);
    $(".title").each(function () {
      result.game.push($(this).text());
    });
    $(".col.search_capsule >img").each(function () {
      result.img.push($(this).attr("src"));
    });
    $(".search_price").each(function () {
      const price = $(this).text().trim().split(" kr");
      price.pop();
      result.price.push(price);
    });
    $(".search_released").each(function () {
      result.date.push($(this).text());
    });
  });

  res.json({ result });

  await browser.close();

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }
};
