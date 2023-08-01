import useToggle from "../../utility/hooks/useToggle";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

//TODO: Connect form to data
interface defaultValues {
  campus: string;
  level: string;
  tuitionType: string;
  amount: string;
  discounted: string;
  discountAmount: string;
  date: string;
}

type AddTuitionProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: defaultValues;
};

export default function AddTuition({
  toggle,
  visibility,
  defaultValues: defValues,
}: AddTuitionProps) {
  const defaultValues = defValues ?? {
    campus: "",
    level: "",
    tuitionType: "",
    amount: "",
    discounted: "",
    discountAmount: "",
    date: ""
  };

  const [campusOpen, toggleCampus] = useToggle();
  const [levelOpen, toggleLevel] = useToggle();
  const [tuitionTypeOpen, toggleTuitionType] = useToggle();
  const [amountOpen, toggleAmount] = useToggle();
  const [discountedOpen, toggleDiscounted] = useToggle();
  const [discountAmountOpen, toggleDiscountAmount] = useToggle();

  //const [campus, setCampus] =  useState();

  const { control, setError, handleSubmit, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });

  function onSubmit() {}

  return (
    <div>
      <Modal centered isOpen={visibility} toggle={toggle} id="tuitionModal">
        <ModalHeader toggle={toggle}>Add Tuition</ModalHeader>
        <ModalBody>
          <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="campusOption">Campus</label>
              <Controller
                control={control}
                name="campus"
                defaultValue=""
                render={({ field }) => (
                  <Dropdown
                    className="form-control "
                    {...field}
                    isOpen={campusOpen}
                    toggle={toggleCampus}
                  >
                    <DropdownToggle
                      className="text-lg w-100 text-start shadow-none"
                      caret
                    >
                      Select Campus
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem >Abuja</DropdownItem>
                      <DropdownItem>Port Harcourt</DropdownItem>
                      <DropdownItem>Kaduna</DropdownItem>
                      <DropdownItem>Kaduna Hausa</DropdownItem>
                      <DropdownItem>Lagos</DropdownItem>
                      <DropdownItem>Nasarawa</DropdownItem>
                      <DropdownItem>Enugu</DropdownItem>
                      <DropdownItem>Kainos Ilorin</DropdownItem>
                      <DropdownItem>Kainos Ife</DropdownItem>
                      <DropdownItem>Kainos Ibadan</DropdownItem>
                      <DropdownItem>--------</DropdownItem>
                      <DropdownItem>Abia</DropdownItem>
                      <DropdownItem>Adamawa</DropdownItem>
                      <DropdownItem>Akwa Ibom</DropdownItem>
                      <DropdownItem>Anambra</DropdownItem>
                      <DropdownItem>Bauchi</DropdownItem>
                      <DropdownItem>Bayelsa</DropdownItem>
                      <DropdownItem>Benue</DropdownItem>
                      <DropdownItem>Borno</DropdownItem>
                      <DropdownItem>Cross River</DropdownItem>
                      <DropdownItem>Delta</DropdownItem>
                      <DropdownItem>Ebonyi</DropdownItem>
                      <DropdownItem>Edo</DropdownItem>
                      <DropdownItem>Ekiti</DropdownItem>
                      <DropdownItem>Enugu</DropdownItem>
                      <DropdownItem>Gombe</DropdownItem>
                      <DropdownItem>Imo</DropdownItem>
                      <DropdownItem>Jigawa</DropdownItem>
                      <DropdownItem>Kaduna</DropdownItem>
                      <DropdownItem>Kano</DropdownItem>
                      <DropdownItem>Katsina</DropdownItem>
                      <DropdownItem>Kebbi</DropdownItem>
                      <DropdownItem>Kogi</DropdownItem>
                      <DropdownItem>Kwara</DropdownItem>
                      <DropdownItem>Lagos</DropdownItem>
                      <DropdownItem>Nasarawa</DropdownItem>
                      <DropdownItem>Niger</DropdownItem>
                      <DropdownItem>Ogun</DropdownItem>
                      <DropdownItem>Ondo</DropdownItem>
                      <DropdownItem>Osun</DropdownItem>
                      <DropdownItem>Oyo</DropdownItem>
                      <DropdownItem>Plateau</DropdownItem>
                      <DropdownItem>Rivers</DropdownItem>
                      <DropdownItem>Sokoto</DropdownItem>
                      <DropdownItem>Taraba</DropdownItem>
                      <DropdownItem>Yobe</DropdownItem>
                      <DropdownItem>Zamfara</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="levelOption">Level</label>
              <Controller
                control={control}
                name="level"
                defaultValue=""
                render={({ field }) => (
                  <Dropdown
                    className="form-control "
                    {...field}
                    isOpen={levelOpen}
                    toggle={toggleLevel}
                  >
                    <DropdownToggle
                      className="text-lg w-100 text-start shadow-none"
                      caret
                    >
                      Select Level
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Level 1</DropdownItem>
                      <DropdownItem>Level 2</DropdownItem>
                      <DropdownItem>Level 3</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tuitionTypeOption">Tuition Type</label>
              <Controller
                control={control}
                name="tuitionType"
                defaultValue=""
                render={({ field }) => (
                  <Dropdown
                    className="form-control "
                    {...field}
                    isOpen={tuitionTypeOpen}
                    toggle={toggleTuitionType}
                  >
                    <DropdownToggle
                      className="text-lg w-100 text-start shadow-none"
                      caret
                    >
                      Select Tuition Type
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Application Fee</DropdownItem>
                      <DropdownItem>Initial Deposit</DropdownItem>
                      <DropdownItem>Tuition Installment</DropdownItem>
                      <DropdownItem>Tuition Balance</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amountOption">Amount</label>
              <Controller
                control={control}
                name="amount"
                defaultValue=""
                render={({ field }) => (
                  <Dropdown
                    className="form-control "
                    {...field}
                    isOpen={amountOpen}
                    toggle={toggleAmount}
                  >
                    <DropdownToggle
                      className="text-lg w-100 text-start shadow-none"
                      caret
                    >
                      Select Amount
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>2,500</DropdownItem>
                      <DropdownItem>5,000</DropdownItem>
                      <DropdownItem>10,000</DropdownItem>
                      <DropdownItem>20,000</DropdownItem>
                      <DropdownItem>30,000</DropdownItem>
                      <DropdownItem>40,000</DropdownItem>
                      <DropdownItem>50,000</DropdownItem>
                      <DropdownItem>60,000</DropdownItem>
                      <DropdownItem>70,000</DropdownItem>
                      <DropdownItem>80,000</DropdownItem>
                      <DropdownItem>90,000</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="discountedtOption">Discounted</label>
              <Controller
                control={control}
                name="discounted"
                defaultValue=""
                render={({ field }) => (
                  <Dropdown
                    className="form-control "
                    {...field}
                    isOpen={discountedOpen}
                    toggle={toggleDiscounted}
                  >
                    <DropdownToggle
                      className="text-lg w-100 text-start shadow-none"
                      caret
                    >
                      Is this tuition discounted?
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Yes</DropdownItem>
                      <DropdownItem>No</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="discountAmountOption">Discount Amount</label>
              <Controller
                control={control}
                name="discountAmount"
                defaultValue=""

                // changeHandler={handleChange} 
                // value={discountAmount} 

                render={({ field }) => (
                  <Dropdown
                    className="form-control "
                    {...field}
                    isOpen={discountAmountOpen}
                    toggle={toggleDiscountAmount}
                  >
                    <DropdownToggle
                      className="text-lg w-100 text-start shadow-none"
                      caret
                    >
                      Select Discount Amount
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>2,500</DropdownItem>
                      <DropdownItem>5,000</DropdownItem>
                      <DropdownItem>10,000</DropdownItem>
                      <DropdownItem>20,000</DropdownItem>
                      <DropdownItem>30,000</DropdownItem>
                      <DropdownItem>40,000</DropdownItem>
                      <DropdownItem>50,000</DropdownItem>
                      <DropdownItem>60,000</DropdownItem>
                      <DropdownItem>70,000</DropdownItem>
                      <DropdownItem>80,000</DropdownItem>
                      <DropdownItem>90,000</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="setDate">Date</label>
              <Controller
                control={control}
                name="date"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    autoFocus
                    type="date"
                    placeholder="date"
                    className="form-control"
                    invalid={formState.errors.date && true}
                    {...field}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
           

            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
              disabled={!formState.isValid}
            >
              Add Tuition
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
