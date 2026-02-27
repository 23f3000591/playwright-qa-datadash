const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 89; seed <= 98; seed++) {
    console.log(`Opening Seed ${seed}`);

    await page.goto(`https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`, {
      waitUntil: "load"
    });

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(c => Number(c.textContent.trim()))
        .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
