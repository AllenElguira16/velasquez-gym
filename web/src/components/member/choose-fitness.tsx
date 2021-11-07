import axios from 'axios';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Card, CardBody, Col, CardTitle, CardImg } from 'reactstrap';

const ChooseFitness: FC = () => {

  const [fitnessTypes, setFitnessTypes] = useState<{ type: string; img: string; }[]>([]);
  
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

  useEffect(() => {
    fetchFitnessTypes();
  }, [fetchFitnessTypes]);

  return (
    <>
      <h1>Choose Fitness Type</h1>
      <div className="d-flex">
        {fitnessTypes.map((fitnessType, key) => (
          <Card key={key} tag={Col} md={4} style={{cursor: 'pointer'}}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <CardBody>
              <CardTitle tag="h5" className="text-dark">
                <div>{fitnessType.type}</div>
              </CardTitle>
            </CardBody>
            <CardImg className="img-fluid" src={fitnessType.img} alt={fitnessType.type} width="100%" />
          </Card>
        ))}
      </div>
      
    </>
  )
}

export default ChooseFitness;
