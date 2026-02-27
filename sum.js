const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 89; seed <= 98; seed++) {
    const url = `https://YOUR_TARGET_URL?seed=${seed}`;
    console.log(`Opening Seed ${seed}`);

    await page.goto(url);

    // Get ALL table cells
    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(td => parseFloat(td.innerText.trim()))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);

    console.log(`Seed ${seed} Sum:`, pageSum);

    grandTotal += pageSum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
