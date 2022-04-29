import moment from "moment";
import React, { FC } from "react";
import { Table } from "reactstrap";
import { ILog } from "~/types";

const LogsList: FC<{ logs: ILog[] }> = ({ logs }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th style={{ width: "60" }}>Message</th>
          <th style={{ width: "40" }}>Date</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr key={index}>
            <td>{log.message}</td>
            <td>
              {moment(log.createdAt).format("YYYY-MM-DD hh:mm:ss A").toString()}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LogsList;
