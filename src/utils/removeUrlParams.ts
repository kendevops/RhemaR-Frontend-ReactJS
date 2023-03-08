export default function removeUrlParams(url: string) {
  const index = url.indexOf("?");
  if (index === -1) {
    return url;
  } else {
    return url.substring(0, index);
  }
}
