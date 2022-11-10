import { ChangeEvent, useState } from "react";

interface fileReaderOptions {
  onComplete?: (img: string) => void;
  initialImgData?: string | undefined | void;
}

export default function useFileReader(options?: fileReaderOptions) {
  const [status, setStatus] = useState({
    success: false,
    loading: false,
  });
  const [img, setImg] = useState<any>(options?.initialImgData);

  function onChangeFile(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target?.files;
    const fileReader = new FileReader();

    fileReader.addEventListener("loadstart", (e) => {
      setStatus((prev) => ({ ...prev, loading: true }));
    });

    fileReader.addEventListener("loadend", (e) => {
      setImg(e.target?.result);
      setStatus((prev) => ({ ...prev, loading: false, success: true }));
      options?.onComplete && options?.onComplete(img);
    });

    files && fileReader.readAsDataURL(files[0]);
  }

  return { img, status, onChangeFile };
}
