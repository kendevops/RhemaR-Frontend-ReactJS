export default function embedParams(params: any) {
  if (!params) return "";

  const opts = Object?.keys(params)?.map((o, i) => {
    return `${i === 0 ? "?" : ""}${o}=${params[o]}${
      i < Object?.keys(params)?.length - 1 ? "&" : ""
    }`;
  });

  return opts;
}
