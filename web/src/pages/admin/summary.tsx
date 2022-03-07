import axios from 'axios';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container, Card, CardBody, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col } from 'reactstrap';
import AdminNavbar from '../../components/admin/navbar';

const Admin: FC = () => {
  const [weekly, setWeekly] = useState({ totalIncome: 0, totalUsers: 0 });
  const [monthly, setMonthly] = useState({ totalIncome: 0, totalUsers: 0 });
  const [yearly, setYearly] = useState({ totalIncome: 0, totalUsers: 0 });

  const getWeekly = useCallback(async () => {
    const weekStart = moment().clone().startOf('week').format('YYYY-MM-DD');
    const weekEnd = moment().clone().endOf('week').format('YYYY-MM-DD');
    
    const { data } = await axios.get(`http://localhost:8000/api/summary?range=${weekStart},${weekEnd}`);
    setWeekly({
      totalIncome: data.content.totalIncome,
      totalUsers: data.content.totalIncome,
    });
  }, []);

  const getMonthly = useCallback(async () => {
    const weekStart = moment().clone().startOf('month').format('YYYY-MM-DD');
    const weekEnd = moment().clone().endOf('month').format('YYYY-MM-DD');
    
    const { data } = await axios.get(`http://localhost:8000/api/summary?range=${weekStart},${weekEnd}`);
    setMonthly({
      totalIncome: data.content.totalIncome,
      totalUsers: data.content.totalIncome,
    });
  }, []);

  const getYearly = useCallback(async () => {
    const weekStart = moment().clone().startOf('year').format('YYYY-MM-DD');
    const weekEnd = moment().clone().endOf('year').format('YYYY-MM-DD');
    
    const { data } = await axios.get(`http://localhost:8000/api/summary?range=${weekStart},${weekEnd}`);
    setYearly({
      totalIncome: data.content.totalIncome,
      totalUsers: data.content.totalIncome,
    });
  }, []);

  useEffect(() => {
    getWeekly();
    getMonthly();
    getYearly();
  }, [getMonthly, getWeekly, getYearly]); 

  return (
    <div className="d-flex mt-1">
      <Container className="my-auto">
        <AdminNavbar />

        <Card className="mt-2">
          <CardBody style={{height: '32rem', overflowY: 'scroll'}}>
            <div>
              <h6>This Week</h6>
              <Table>
                <tbody>
                  <tr>
                    <th>Total Members</th>
                    <td>{weekly.totalUsers}</td>
                  </tr>
                  <tr>
                    <th>Total Income This Month</th>
                    <td>{weekly.totalIncome}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <h6>This Month</h6>
              <Table>
                <tbody>
                  <tr>
                    <th>Total Members</th>
                    <td>{monthly.totalUsers}</td>
                  </tr>
                  <tr>
                    <th>Total Income This Month</th>
                    <td>{monthly.totalIncome}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <h6>This Year</h6>
              <Table>
                <tbody>
                  <tr>
                    <th>Total Members</th>
                    <td>{yearly.totalUsers}</td>
                  </tr>
                  <tr>
                    <th>Total Income This Month</th>
                    <td>{yearly.totalIncome}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    await axios.get('http://localhost:8000/api/auth', {
      withCredentials: true,
      headers: req.headers
    });

    return {
      props: {}
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.writeHead(302, { // or 301
        Location: '/login',
      });
      res.end();
    }

    return {props: {}}
  }
}

export default Admin;
