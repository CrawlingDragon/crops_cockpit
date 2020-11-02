export function getUrlQuery(key) {
  const query = window.location.hash.substring(1);
  const queryArr = query.split("?");
  for (let i = 0; i < queryArr.length; i++) {
    const r = queryArr[i].split("=");
    if (r[0] === key) {
      return r[1];
    }
  }
  return false;
}
