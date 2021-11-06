import axios from 'axios';
import React, { FC, useCallback, useEffect } from 'react';

const Index: FC = () => {

  const fetchAuthUser = useCallback(async () => {
    try {
      const {data} = await axios.get('/api/auth');
  
      console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        location.href = '/login'
      }
    }
  }, []);

  useEffect(() => {
    fetchAuthUser();
  }, [fetchAuthUser]);

  return (
    <>
      Hello World!
    </>
  );
};

export default Index;
