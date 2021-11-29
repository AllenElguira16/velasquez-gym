import React, { ChangeEvent, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import axios from 'axios';
import VirtualAssistance from './virtual-assistant';

const FitnessList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [fitnessTypes, setFitnessTypes] = useState<IFitness[]>([]);
  
  const fetchFitnessTypes = useCallback(async () => {
    try {
      const {data: {fitness}} = await axios.get('/api/fitness');
  
      setFitnessTypes(fitness);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }, []);

  const deleteFitness = (id: string) => async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    await axios.delete(`/api/fitness/${id}`);
    location.reload();
  }

  const toggleModal = () => setModalOpen(!isModalOpen);



  useEffect(() => {
    fetchFitnessTypes();
  }, [fetchFitnessTypes]);
  
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Fitness Type</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fitnessTypes.length > 0 && fitnessTypes.map(fitnessType => (
            <tr key={fitnessType.id}>
              <td className="w-25">{fitnessType.type}</td>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <td className="w-25"><img className="img-fluid" src={fitnessType.img} alt={fitnessType.type} /></td>
              <td>
                <Button color="danger" onClick={deleteFitness(fitnessType.id)}>Delete</Button>
              </td>
              <td>
                <VirtualAssistance toggleModal={toggleModal} isModalOpen={isModalOpen} fitness={fitnessType} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default FitnessList;
