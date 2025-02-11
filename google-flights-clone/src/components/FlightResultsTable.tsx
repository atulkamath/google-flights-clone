import React from "react";
import { ResultsType } from "./types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
const FlightResultsTable: React.FC<{
  data: ResultsType;
}> = ({ data }) => {
  function formatMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Carriers</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Origin</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Stops</TableCell>
            <TableCell>Departure</TableCell>
            <TableCell>Arrival</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data.itineraries
            .filter((_, index) => index < 10)
            .sort((a, b) => a.price.raw - b.price.raw)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img
                    width={32}
                    src={row.legs[0].carriers.marketing[0].logoUrl}
                  />
                </TableCell>
                <TableCell>{row.legs[0].carriers.marketing[0].name}</TableCell>

                <TableCell component="th" scope="row">
                  {row.price.formatted}
                </TableCell>

                <TableCell>{row.legs[0].origin.city}</TableCell>
                <TableCell>{row.legs[0].destination.city}</TableCell>
                <TableCell>
                  {formatMinutes(row.legs[0].durationInMinutes)}
                </TableCell>
                <TableCell>{row.legs[0].stopCount}</TableCell>
                <TableCell>
                  {dayjs(row.legs[0].departure).format("HH:MM A")}
                </TableCell>
                <TableCell>
                  {dayjs(row.legs[0].arrival).format("HH:MM A")}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FlightResultsTable;
