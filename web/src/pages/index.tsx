import axios from 'axios';
import React, { FC, useCallback, useEffect } from 'react';

const Index: FC = () => {

  const fetchAuthUser = useCallback(async () => {
    try {
      const {data: {user}} = await axios.get('/api/auth');
  
      if (location.pathname !== `/${user.type}`) {
        location.href = `/${user.type}`;
      }
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
      Redirecting
    </>
  );
};

export default Index;
