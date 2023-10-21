import { ChangeEvent, useState } from "react";

interface fileReaderOptions {
  onComplete?: (img: string, file: File) => void;
  initialImgData?: string | undefined | void;
}

export default function useFileReader(options?: fileReaderOptions) {
  const [status, setStatus] = useState({
    success: false,
    loading: false,
  });

  const [img, setImg] = useState<any>(options?.initialImgData);
  const [file, setFile] = useState<File>();

  async function onChangeFile(e: ChangeEvent<HTMLInputElement>) {
    const files: any = e.target?.files;
    const fileReader = new FileReader();

    console.log(file, files);

    fileReader.addEventListener("loadstart", (e) => {
      setStatus((prev) => ({ ...prev, loading: true }));
    });

    fileReader.addEventListener("loadend", (e) => {
      const imgData = e.target?.result;
      const fileData = files[0]; // Store the result in a variable
      setImg(imgData);
      // setImg(e.target?.result);
      setStatus((prev) => ({ ...prev, loading: false, success: true }));
      if (files) {
        options?.onComplete && files[0] && options?.onComplete(img, fileData);
      }
    });

    if (files) {
      console.log(files);
      fileReader.readAsDataURL(files[0]);
      setFile(files[0]);
    }

    console.log(file);
  }

  console.log(file);
  // if (!file) {
  //   return;
  // }

  return { img, status, file, onChangeFile };
}
