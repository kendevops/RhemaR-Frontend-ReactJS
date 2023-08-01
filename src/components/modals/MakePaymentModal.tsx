import { DocumentDuplicateIcon } from "@heroicons/react/solid";
import { InfoRounded } from "@material-ui/icons";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

interface MakePaymentModalProps {
  isOpen: boolean;
  toggle: VoidFunction;
  amount: number;
}

export default function MakePaymentModal({
  isOpen,
  toggle,
  amount,
}: MakePaymentModalProps) {
  const paymentData = [
    { title: "Bank Name", value: "Keystone Bank" },
    { title: "Account Number", value: "0032781056" },
    { title: "Account Name", value: "Rhema Bible Training Center" },
    { title: "Amount", value: `N${amount}` },
  ];

  return (
    <>
      <Modal centered {...{ isOpen, toggle }} id="paymentModal">
        <ModalHeader toggle={toggle}>Make Payment</ModalHeader>
        <ModalBody>
          {paymentData?.map((d) => {
            function copyText() {
              navigator?.clipboard?.writeText(d?.value).then(() => {
                alert(`${d?.title} Copied`);
              });
            }
            return (
              <article
                key={d?.title}
                style={{
                  backgroundColor: "rgba(0, 45, 107, 0.07)",
                }}
                className="p-3 mb-3  d-flex align-items-center justify-content-between"
              >
                <div>
                  <p>{d?.title}</p>
                  <h2 className="">{d?.value}</h2>
                </div>

                <div onClick={copyText} role={"button"}>
                  <DocumentDuplicateIcon width={24} />
                </div>
              </article>
            );
          })}

          <div className="d-flex gap-3 my-5">
            <InfoRounded color="primary" />
            <p>
              Please verify the information above before you proceed to make
              payment.
            </p>
          </div>

          <button className="btn btn-blue-800 btn-lg w-100">
            Make Payment
          </button>
        </ModalBody>
      </Modal>
    </>
  );
}
