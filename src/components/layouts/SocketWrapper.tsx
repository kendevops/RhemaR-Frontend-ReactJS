import { ReactNode, useEffect } from "react";
import socket from "../../utils/socket";
import getToken from "../../utils/getToken";
interface Props {
  children: ReactNode;
}

export default function SocketWrapper({ children }: Props) {
  const accessToken = getToken("accessToken");

  // console.log({ accessToken });

  useEffect(() => {
    if (!!accessToken) {
      socket.connect();
    }
  }, [accessToken]);

  return <>{children}</>;
}
