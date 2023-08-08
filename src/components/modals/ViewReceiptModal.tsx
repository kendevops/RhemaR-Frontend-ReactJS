import { Modal, ModalBody, ModalHeader } from "reactstrap";
import downloadFile from "../../utils/downloadFile";
import getTimeString from "../../utils/getTimeString";

interface ViewReceiptModalProps {
  isOpen: boolean;
  toggle: VoidFunction;
  data: {
    amount: number;
    type: string;
    date: Date;
    time: Date;
    sender: string;
    status: string;
  };
}

// const rhemaLogo = require(`@src/assets/img/logo/logo.svg`).default;
const rhemaLogo = `@src/assets/img/logo/logo.svg`;

export default function ViewReceiptModal({
  data: receiptData,
  isOpen,
  toggle,
}: ViewReceiptModalProps) {
  const attributes = downloadFile("https://google.com", "Payment Receipt");
  const { amount, date, sender, status, time, type } = receiptData;
  const data = [
    {
      title: "Transaction Amount",
      value: `N${amount}`,
    },
    {
      title: "Transaction Type",
      value: type,
    },
    {
      title: "Transaction Date",
      value: new Date(date)?.toDateString(),
    },
    {
      title: "Transaction Time",
      value: getTimeString({ date: new Date(time) }),
    },
    {
      title: "Sender",
      value: sender,
    },
    {
      title: "Transaction Status",
      value: status,
    },
  ];

  return (
    <>
      <Modal centered {...{ isOpen, toggle }} id="paymentModal">
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <header>
            <section>
              <div className="receipt-first"></div>
              <div className="receipt-second"></div>
            </section>
            <section className="mb-5 text-center nav-logo">
              <img src={rhemaLogo} alt="Rhema Ngr" style={{ width: "100px" }} />
              <h2>Payment receipt</h2>
            </section>
          </header>

          <ul className="my-4 no-padding-left">
            {data?.map((d) => {
              return (
                <li className="border-bottom py-3 d-flex justify-content-between">
                  <p>{d?.title}: </p>
                  <h3>{d?.value}</h3>
                </li>
              );
            })}
          </ul>

          <footer className="mb-3">
            <div className="receipt-third"></div>
            <div className="receipt-fourth"></div>
          </footer>

          <a {...attributes} className="btn btn-blue-800 btn-lg w-100">
            Download receipt
          </a>
        </ModalBody>
      </Modal>
    </>
  );
}
