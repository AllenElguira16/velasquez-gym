import axios from 'axios';
import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Button } from 'reactstrap';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type TProps = {
  fitness: IFitness;
  toggleModal: () => void;
  isOpen: boolean;
}

const VirtualAssistance: FC<TProps> = ({ fitness, isOpen: isModalOpen, toggleModal }) => {
  const [virtualAssistanceInput, setVirtualAssistanceInput] = useState(fitness.virtualAssistance);

  const saveVirtualAssistance = async () => {
    await axios.put(`/api/fitness/${fitness.id}`, {
      virtualAssistance: virtualAssistanceInput
    });

    alert('Saved!');
  }

  return (
    <>
      <Button color="danger" onClick={toggleModal}>+Virtual</Button>
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
              className="border"
              theme="bubble"
              value={virtualAssistanceInput}
              onChange={setVirtualAssistanceInput}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, 4, false] }],
                  ['bold', 'italic', 'underline','strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                  [{'align': []}],
                  ['link', 'image', 'video'],
                  ['clean']
                ]
              }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={saveVirtualAssistance}
          >
            Save
          </Button>
          {' '}
          <Button onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default VirtualAssistance;
