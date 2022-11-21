export default function downloadFile(url: string, fileName: string) {
  let href = "";

  const attributes = {
    download: fileName,
    href,
    target: "_blank",
  };

  fetch(url, { mode: "no-cors", referrerPolicy: "no-referrer" })
    .then((res) => {
      console.log(res.json());
      return res.blob();
    })
    .then((res) => {
      href = URL.createObjectURL(res);

      //click fn
      URL.revokeObjectURL(href);
    });

  return { ...attributes };
}
