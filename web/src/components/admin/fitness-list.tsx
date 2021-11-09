import axios from 'axios';
import React, { ChangeEvent, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';

const FitnessList = () => {
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
    await axios.delete(`/api/fitness/${id}`);
    location.reload();
  }

  useEffect(() => {
    fetchFitnessTypes();
  }, [fetchFitnessTypes]);
  
  return (
    <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>Fitness Type</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {fitnessTypes.length > 0 && fitnessTypes.map(fitnessType => (
          <tr key={fitnessType.id}>
            <td className="w-50">{fitnessType.id}</td>
            <td className="w-25">{fitnessType.type}</td>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <td className="w-25"><img className="img-fluid" src={fitnessType.img} alt={fitnessType.type} /></td>
            <td><Button color="danger" onClick={deleteFitness(fitnessType.id)}>Delete</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FitnessList;
