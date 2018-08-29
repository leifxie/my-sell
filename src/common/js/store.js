export function saveToLocal (id, key, val) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = val;
  window.localStorage._seller_ = JSON.stringify(seller);
}

export function loadFromLocal (id, key, def) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    return def;
  }
  // 记得要将json字符串解析成对象
  const sellerId = JSON.parse(seller)[id];
  if (!sellerId) {
    return def;
  }
  let res = sellerId[key];
  return res || def;
}
