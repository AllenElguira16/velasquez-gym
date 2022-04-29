import moment from "moment";
import { GetServerSideProps } from "next";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  Table,
  Button,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import ReactToPrint from "react-to-print";
import xlsx, { IJsonSheet } from "json-as-xlsx";
import type { ChartData, ScatterDataPoint, BubbleDataPoint } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import AdminNavbar from "../../components/admin/navbar";
import { ajax } from "~/helpers/ajax";

type TSummaryObject = { users: number; income: number };

type TSummary = Record<
  "daily" | "weekly" | "monthly",
  { [key: string]: TSummaryObject }
>;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ChartJS.defaults.color = "#FFFFFF";

const Admin: FC = () => {
  const cardBodyRef = useRef(null);

  // const [weekly, setWeekly] = useState({ totalIncome: 0, totalUsers: 0 });
  // const [monthly, setMonthly] = useState({ totalIncome: 0, totalUsers: 0 });
  // const [yearly, setYearly] = useState({ totalIncome: 0, totalUsers: 0 });

  // const getWeekly = useCallback(async () => {
  //   const weekStart = moment().clone().startOf("week").format("YYYY-MM-DD");
  //   const weekEnd = moment().clone().endOf("week").format("YYYY-MM-DD");

  //   const { data } = await ajax.get(
  //     `/api/summary?range=${weekStart},${weekEnd}`
  //   );
  //   setWeekly({
  //     totalIncome: data.content.totalIncome,
  //     totalUsers: data.content.totalUsers,
  //   });
  // }, []);

  // const getMonthly = useCallback(async () => {
  //   const weekStart = moment().clone().startOf("month").format("YYYY-MM-DD");
  //   const weekEnd = moment().clone().endOf("month").format("YYYY-MM-DD");

  //   const { data } = await ajax.get(
  //     `/api/summary?range=${weekStart},${weekEnd}`
  //   );
  //   setMonthly({
  //     totalIncome: data.content.totalIncome,
  //     totalUsers: data.content.totalUsers,
  //   });
  // }, []);

  // const getYearly = useCallback(async () => {
  //   const weekStart = moment().clone().startOf("year").format("YYYY-MM-DD");
  //   const weekEnd = moment().clone().endOf("year").format("YYYY-MM-DD");

  //   const { data } = await ajax.get(
  //     `/api/summary?range=${weekStart},${weekEnd}`
  //   );
  //   setYearly({
  //     totalIncome: data.content.totalIncome,
  //     totalUsers: data.content.totalUsers,
  //   });
  // }, []);

  const [summary, setSummary] = useState<TSummary>({
    daily: {},
    weekly: {},
    monthly: {},
  });

  function toExcel() {
    const keys = ["Daily", "Weekly", "Monthly"];

    let data: IJsonSheet[] = keys.map((key) => ({
      sheet: key,
      columns: [
        {
          label: "Total Members",
          value: "total_members",
        },
        {
          label: "Total Income",
          value: "total_income",
        },
      ],
      content: [
        {
          total_members: Object.entries(
            summary[key.toLocaleLowerCase() as keyof TSummary]
          ).reduce((total, [, { users }]) => total + users, 0),
          total_income: Object.entries(
            summary[key.toLocaleLowerCase() as keyof TSummary]
          ).reduce((total, [, { income }]) => total + income, 0),
        },
      ],
    }));

    let settings = {
      fileName: `Velasquez Gym - ${new Date().toDateString()}`,
      extraLength: 3,
      writeOptions: {},
    };

    xlsx(data, settings);
  }

  const fetchSummary = useCallback(async () => {
    const { data } = await ajax.get(`/api/summary`);

    setSummary(data.content);
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const getData = ({
    key,
    type,
    title,
  }: {
    key: keyof TSummary;
    type: keyof TSummaryObject;
    title: string;
  }): ChartData<
    "bar",
    (number | ScatterDataPoint | BubbleDataPoint | null)[],
    unknown
  > => ({
    labels: Object.keys(summary[key]),
    datasets: [
      {
        label: title,
        data: Object.keys(summary[key]).map(
          (index) => summary[key][index][type]
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  return (
    <div className="d-flex mt-1">
      <Container className="my-auto">
        <AdminNavbar />
        <Card className="mt-2">
          <CardHeader className="d-flex gap-2">
            <ReactToPrint
              trigger={() => <Button>Print</Button>}
              onBeforeGetContent={() => {
                document.querySelectorAll("canvas").forEach((canvas) => {
                  setTimeout(() => {
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                      ctx.fillStyle = "#000000";
                    }
                    canvas.setAttribute("fillStyle", "#000000");
                  }, 20000);
                });
              }}
              content={() => cardBodyRef.current}
            />
            <Button onClick={toExcel}>Excel</Button>
          </CardHeader>
          <CardBody
            id="to-print"
            style={{ height: "32rem", overflowY: "scroll" }}
            innerRef={cardBodyRef}
          >
            <Row>
              <Col md={6}>
                <Bar
                  data={getData({
                    key: "daily",
                    type: "income",
                    title: "Daily Income",
                  })}
                />
              </Col>
              <Col md={6}>
                <Bar
                  data={getData({
                    key: "daily",
                    type: "users",
                    title: "Daily Users",
                  })}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Bar
                  data={getData({
                    key: "weekly",
                    type: "income",
                    title: "Weekly Income",
                  })}
                />
              </Col>
              <Col md={6}>
                <Bar
                  data={getData({
                    key: "weekly",
                    type: "users",
                    title: "Weekly Users",
                  })}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Bar
                  data={getData({
                    key: "monthly",
                    type: "income",
                    title: "Monthly Income",
                  })}
                />
              </Col>
              <Col md={6}>
                <Bar
                  data={getData({
                    key: "monthly",
                    type: "users",
                    title: "Monthly Users",
                  })}
                />
              </Col>
            </Row>
            {/* <div>
              <Table>
                <h6>This Week</h6>
                <tbody>
                  <tr>
                    <th className="w-75">Total Members</th>
                    <td className="w-25">{weekly.totalUsers}</td>
                  </tr>
                  <tr>
                    <th className="w-75">Total Income This Month</th>
                    <td className="w-25">{weekly.totalIncome}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <Table>
                <h6>This Month</h6>
                <tbody>
                  <tr>
                    <th className="w-75">Total Members</th>
                    <td className="w-25">{monthly.totalUsers}</td>
                  </tr>
                  <tr>
                    <th className="w-75">Total Income This Month</th>
                    <td className="w-25">{monthly.totalIncome}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <Table>
                <h6>This Year</h6>
                <tbody>
                  <tr>
                    <th className="w-75">Total Members</th>
                    <td className="w-25">{yearly.totalUsers}</td>
                  </tr>
                  <tr>
                    <th className="w-75">Total Income This Month</th>
                    <td className="w-25">{yearly.totalIncome}</td>
                  </tr>
                </tbody>
              </Table>
            </div> */}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    await ajax.get("/api/auth", {
      withCredentials: true,
      headers: req.headers,
    });

    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};

export default Admin;
