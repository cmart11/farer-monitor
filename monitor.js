function count() {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  let stockIds = [];
  let soldIDs = [];
  let elsArr = [];
  let els = document.querySelectorAll("form >.dropdown ul li");
  for (let i = 101; i <= 225; i++) {
    stockIds.push(i);
  }
  for (let i = 0; i < els.length; i++) {
    let currEl = els[i];
    elsArr.push(parseInt(currEl.innerText, 10));
  }
  elsArr.shift();

  let remaining = elsArr.length;

  for (let i = 0; i < stockIds.length; i++) {
    let curr = stockIds[i];
    if (!elsArr.includes(curr)) {
      soldIDs.push(curr);
    }
  }

  let sold = 125 - remaining;
  let soldAmount = 1450 * sold;
  let obj = {
    soldIDs,
    remaining,
    sold,
    soldAmount: formatter.format(soldAmount)
  };
  return obj;
}

count();
