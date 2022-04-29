import axios from "axios";
import { GetServerSideProps } from "next";
import { FC, useCallback, useEffect, useState } from "react";
import { Card, CardBody, Container } from "reactstrap";
import LogsList from "~/components/admin/logs-list";
import AdminNavbar from "~/components/admin/navbar";
import { ajax } from "~/helpers/ajax";
import { ILog } from "~/types";

const Logs: FC = () => {
  const [logs, setLogs] = useState<ILog[]>([]);

  const fetchLogs = useCallback(async () => {
    const { data } = await ajax.get("/api/logs");

    setLogs(data.logs);
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className="d-flex mt-1">
      <Container className="my-auto">
        <AdminNavbar />

        <Card className="mt-2">
          <CardBody style={{ height: "32rem", overflowY: "scroll" }}>
            <LogsList logs={logs} />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    await ajax.get("/api/auth", {
      withCredentials: true,
      headers: req.headers,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.writeHead(302, {
        // or 301
        Location: "/login",
      });
      res.end();
    }
  }

  return {
    props: {},
  };
};

export default Logs;
