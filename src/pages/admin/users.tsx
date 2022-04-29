import axios from "axios";
import xlsx, { IJsonSheet } from "json-as-xlsx";
import { GetServerSideProps } from "next";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import ReactToPrint from "react-to-print";
import { Container, Card, CardBody, Button, CardHeader } from "reactstrap";
import { ajax } from "~/helpers/ajax";
import { IUser } from "~/types";
import AdminNavbar from "../../components/admin/navbar";
import UserList from "../../components/admin/user-list";

const Admin: FC = () => {
  const cardBodyRef = useRef(null);
  function toExcel() {
    let data: IJsonSheet[] = [
      {
        sheet: "Weekly",
        columns: [
          {
            label: "Username",
            value: "username",
          },
          {
            label: "Paid",
            value: "paid",
          },
          {
            label: "Current Membership",
            value: "membership",
          },
        ],
        content: users.map((user) => {
          return {
            username: user.username,
            paid: user.memberships !== undefined ? "Yes" : "No",
            membership: user.fitness?.type || "",
          };
        }),
      },
    ];

    let settings = {
      fileName: `Velasquez Gym - ${new Date().toDateString()}`,
      extraLength: 3,
      writeOptions: {},
    };

    xlsx(data, settings);
  }

  const alert = useAlert();
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user");

      setUsers(data.users);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert.error(error.response?.data.message);
      }
    }
  }, [alert]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="d-flex vh-100">
      <Container className="my-auto">
        <AdminNavbar />

        <Card className="mt-2">
          <CardHeader className="d-flex gap-2">
            <ReactToPrint
              trigger={() => <Button>Print</Button>}
              content={() => cardBodyRef.current}
            />
            <Button onClick={toExcel}>Excel</Button>
          </CardHeader>
          <CardBody
            id="to-print"
            style={{ height: "32rem", overflowY: "scroll" }}
            innerRef={cardBodyRef}
          >
            <UserList users={users} />
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

export default Admin;
