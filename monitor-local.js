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
      if (!diffLocalStorage(curr)) {
        setToLocalStorage(curr);
      }
    }
  }
  let dateSold = {};
  for (let i = 0; i < soldIDs.length; i++) {
    let currentID = soldIDs[i];
    createOutput(currentID, dateSold);
  }

  let sold = 125 - remaining;
  let soldAmount = 1450 * sold;
  let obj = {
    dateSold,
    soldIDs,
    remaining,
    sold,
    revenue: formatter.format(soldAmount)
  };

  return obj;
}

function createOutput(id, obj) {
  let key = `_far_${id}`;
  let itemVal = localStorage.getItem(key);
  return (obj[key] = itemVal);
}

function diffLocalStorage(id) {
  let isValSet = localStorage.getItem(`_far_${id}`);
  if (!isValSet) return false;
  return true;
}

function setToLocalStorage(id) {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  localStorage.setItem(`_far_${id}`, currentDate);
}

count();
