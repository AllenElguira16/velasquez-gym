import React, { FC } from "react";
import dynamic from "next/dynamic";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { IFitness } from "~/types";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type TProps = {
  fitness: IFitness;
  toggleModal: () => void;
  isOpen: boolean;
};

const Preview: FC<TProps> = ({ fitness, isOpen: isModalOpen, toggleModal }) => {
  return (
    <>
      {fitness.img !== null && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="img-fluid w-50"
            style={{ cursor: "pointer" }}
            onClick={toggleModal}
            src={fitness.img}
            alt={fitness.type}
          />
          <Modal toggle={toggleModal} isOpen={isModalOpen} size="xl" centered>
            <ModalHeader toggle={toggleModal}>
              Preview - {fitness.type}
            </ModalHeader>
            <ModalBody>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img-fluid w-75 mx-auto d-block"
                style={{ cursor: "pointer" }}
                onClick={toggleModal}
                src={fitness.img}
                alt={fitness.type}
              />
            </ModalBody>
          </Modal>
        </>
      )}
    </>
  );
};

export default Preview;
