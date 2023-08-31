import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import useToggle from "../../utility/hooks/useToggle";
import ExportStudentsThirdModal from "./ExportStudentsThirdModal";

const ItemType = "CARD";

type Item = {
  id: number;
  text: string;
};

type Container = {
  id: string;
  items: Item[];
};

type ExportStudentsSecondModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
  searchData?: any;
};

const ExportStudentsSecondModal: React.FC<ExportStudentsSecondModalProps> = ({
  isOpen,
  toggle,
  searchData,
}) => {
  const [isThirdModalOpen, toggleThirdModalOpen] = useToggle();

  const initialContainer1Items: Item[] = [
    { id: 1, text: "First Name" },
    { id: 2, text: "Last Name" },
    { id: 3, text: "Email" },
    { id: 4, text: "Phone Number" },
    { id: 5, text: "Address Street" },
    { id: 6, text: "Address State" },
    { id: 7, text: "Address Countries" },
  ];

  const initialContainer2Items: Item[] = [
    { id: 8, text: "Item 1" },
    { id: 9, text: "Item 2 - Container 2" },
  ];

  const [containers, setContainers] = useState<Container[]>([
    { id: "All Fields", items: initialContainer1Items },
    { id: "Selected Fields", items: initialContainer2Items },
  ]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const sourceContainerId = result.source.droppableId;
    const destinationContainerId = result.destination.droppableId;

    if (sourceContainerId === destinationContainerId) {
      const updatedItems = [
        ...containers.find((c) => c.id === sourceContainerId)!.items,
      ];
      const [movedItem] = updatedItems.splice(sourceIndex, 1);
      updatedItems.splice(destinationIndex, 0, movedItem);

      setContainers((prevContainers) =>
        prevContainers.map((c) =>
          c.id === sourceContainerId ? { ...c, items: updatedItems } : c
        )
      );
    } else {
      const sourceItems = [
        ...containers.find((c) => c.id === sourceContainerId)!.items,
      ];
      const destinationItems = [
        ...containers.find((c) => c.id === destinationContainerId)!.items,
      ];

      const [movedItem] = sourceItems.splice(sourceIndex, 1);
      destinationItems.splice(destinationIndex, 0, movedItem);

      setContainers((prevContainers) =>
        prevContainers.map((c) =>
          c.id === sourceContainerId
            ? { ...c, items: sourceItems }
            : c.id === destinationContainerId
            ? { ...c, items: destinationItems }
            : c
        )
      );
    }
  };

  return (
    <>
      <ExportStudentsThirdModal
        isOpen={isThirdModalOpen}
        toggle={toggleThirdModalOpen}
        fieldData={containers[1]?.items}
        searchData={searchData}
      />
      <Modal
        centered
        {...{ isOpen, toggle }}
        // scrollable
        style={{ minWidth: "800px" }}
      >
        <ModalHeader toggle={toggle}>Export Students Record</ModalHeader>
        <ModalBody>
          <DragDropContext onDragEnd={onDragEnd}>
            <h1>Step 2: Select Fields</h1>

            <div className="container">
              <div className="row">
                {containers.map((container) => (
                  <div key={container.id} className="col">
                    <h1 className="my-4">{container.id}</h1>
                    <Droppable droppableId={container.id}>
                      {(provided) => (
                        <div
                          className="droppable-area p-5"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{ background: "#f0f0f0" }}
                        >
                          {container.items.length > 0 ? (
                            container.items.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div style={{ background: "#fff" }}>
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="draggable-item p-3 my-3 "
                                    >
                                      {item.text}
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <p></p>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="btn btn-blue-800 btn-lg w-100 my-5 "
              type="button"
              onClick={() => {
                toggle();
                toggleThirdModalOpen();
              }}
            >
              Next
            </button>
          </DragDropContext>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ExportStudentsSecondModal;
