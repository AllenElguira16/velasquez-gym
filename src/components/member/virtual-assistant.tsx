import axios from 'axios';
import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Button } from 'reactstrap';
import { IFitness } from '~/types';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type TProps = {
  fitness: IFitness;
  toggleModal: () => void;
  isModalOpen: boolean;
}

const VirtualAssistance: FC<TProps> = ({ fitness, isModalOpen, toggleModal }) => {
  const [virtualAssistanceInput, setVirtualAssistanceInput] = useState(fitness.virtualAssistance);

  return (
    <Modal
      toggle={toggleModal}
      isOpen={isModalOpen}
      size='xl'
    >
      <ModalHeader toggle={toggleModal}>
        Add Virtual Home Assistance
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <ReactQuill 
            readOnly
            value={virtualAssistanceInput}
            onChange={setVirtualAssistanceInput}
            modules={{
              toolbar: false
            }}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggleModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default VirtualAssistance;
