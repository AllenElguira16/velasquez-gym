import React, { ChangeEvent, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import axios from 'axios';
import VirtualAssistance from './virtual-assistant';
import Preview from './preview';

const FitnessList = () => {
  const [isPreviewOpen, setPreviewOpen] = useState(false);
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

  const togglePreview = () => setPreviewOpen(!isPreviewOpen);

  useEffect(() => {
    fetchFitnessTypes();
  }, [fetchFitnessTypes]);
  
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th style={{width: '20'}}>Fitness Type</th>
            <th style={{width: '40'}}>Image</th>
            <th style={{width: '20'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fitnessTypes.length > 0 && fitnessTypes.map(fitnessType => (
            <tr key={fitnessType.id}>
              <td className="w-25">{fitnessType.type}</td>
              <td className="w-50">
                <Preview toggleModal={togglePreview} isOpen={isPreviewOpen} fitness={fitnessType} />
              </td>
              <td>
                <Button color="danger" onClick={deleteFitness(fitnessType.id)}>Delete</Button>
              </td>
              <td className="w-25">
                <VirtualAssistance fitness={fitnessType} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default FitnessList;
