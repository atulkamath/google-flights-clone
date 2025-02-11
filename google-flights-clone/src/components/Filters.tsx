import { ArrowRightAlt, ConnectingAirportsOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Card,
  ListItemIcon,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import "../App.css";
import PassengerSelector from "./PassengerSelector";
import { ApiResponse, ResultsType, SourceItem } from "./types";
import FlightResultsTable from "./FlightResultstable";

enum Tab {
  RoundTrip = "round-trip",
  OneWay = "one-way",
}
enum TripType {
  Economy = "economy",
  Business = "business",
}

const CustomSelect = styled(Select)({
  border: "none",
  boxShadow: "none",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
});

const Filters = () => {
  const [results, setResults] = useState<ResultsType>();
  const [source, setSource] = useState("");
  const [sourceId, setSourceId] = useState({ skyId: "", entityId: "" });
  const [destinationId, setDestinationId] = useState({
    skyId: "",
    entityId: "",
  });
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [destination, setDestination] = useState("");
  const [sourceQuery, setSourceQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [sourceLoading, setSourceLoading] = useState(false);
  const [destinationLoading, setDestinationLoading] = useState(false);
  const [sourceList, setSourceList] = useState<ApiResponse>();
  const [destinationList, setDestinationList] = useState<ApiResponse>();
  const [selectedTab, setSelectedTab] = useState(Tab.RoundTrip);
  const [tripType, setTripType] = useState(TripType.Economy);
  const [anchorEl, setAnchorEl] = useState(null);
  const [departureDate, setDepartureDate] = useState<Dayjs | null>();
  const [returnDate, setReturnDate] = useState<Dayjs | null>();
  const [selectedPassengers, setSelectedPassengers] = useState({
    adults: 1,
    children: 0,
  });
  const handleChange = () => {
    setSelectedTab(selectedTab === Tab.RoundTrip ? Tab.OneWay : Tab.RoundTrip);
  };
  const handleTripChange = () => {
    setTripType(
      tripType === TripType.Economy ? TripType.Business : TripType.Economy
    );
  };
  // const handlePassengersChange = () => {};
  const handleToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSourceSearch = (event: React.SyntheticEvent, value: string) => {
    if (event && event.type === "change") {
      setSource(value);
    }
  };

  const handleDestinationSearch = (
    event: React.SyntheticEvent,
    value: string
  ) => {
    if (event && event.type === "change") {
      setDestination(value);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSourceQuery(source);
    }, 1000);
    return () => clearTimeout(handler);
  }, [source]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDestinationQuery(destination);
    }, 1000);
    return () => clearTimeout(handler);
  }, [destination]);

  const fetchData = async (
    query: string,
    setList: React.Dispatch<React.SetStateAction<ApiResponse | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}&locale=en-US`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
            "x-rapidapi-key": import.meta.env.VITE_FLIGHT_APIKEY,
          },
        }
      );
      const result: ApiResponse = await response.json();
      setList(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sourceQuery) {
      fetchData(sourceQuery, setSourceList, setSourceLoading);
    }
  }, [sourceQuery]);

  useEffect(() => {
    if (destinationQuery) {
      fetchData(destinationQuery, setDestinationList, setDestinationLoading);
    }
  }, [destinationQuery]);

  const searchFlights = async () => {
    try {
      setLoadingFlights(true);
      const returnDateString =
        selectedTab === Tab.OneWay
          ? ""
          : `&returnDate=${returnDate?.format("YYYY-MM-DD")}`;
      const response = await fetch(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?originSkyId=${
          sourceId.skyId
        }&destinationSkyId=${destinationId.skyId}&originEntityId=${
          sourceId.entityId
        }&destinationEntityId=${
          destinationId.entityId
        }&date=${departureDate?.format(
          "YYYY-MM-DD"
        )}${returnDateString}&cabinClass=${tripType}&adults=${
          selectedPassengers.adults || 1
        }&childrens=${
          selectedPassengers.children || 0
        }&sortBy=best&currency=USD&market=en-US&countryCode=US`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
            "x-rapidapi-key": import.meta.env.VITE_FLIGHT_APIKEY,
          },
        }
      );
      const result: ResultsType = await response.json();
      console.log(result, "final");
      setResults(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFlights(false);
    }
  };

  return (
    <>
      <Card sx={{ padding: 2, minWidth: { lg: 1200 } }}>
        <div
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          <CustomSelect
            size="small"
            value={selectedTab}
            onChange={handleChange}
          >
            <MenuItem value={Tab.RoundTrip}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ConnectingAirportsOutlined style={{ marginRight: 4 }} />
                Round Trip
              </div>
            </MenuItem>
            <MenuItem value={Tab.OneWay}>
              <ListItemIcon>
                <ArrowRightAlt />
              </ListItemIcon>
              One Way
            </MenuItem>
          </CustomSelect>

          <PassengerSelector
            anchorEl={anchorEl}
            handleClose={handleClose}
            handleToggle={handleToggle}
            selectedPassengers={selectedPassengers}
            setSelectedPassengers={setSelectedPassengers}
          />

          <CustomSelect
            size="small"
            value={tripType}
            onChange={handleTripChange}
          >
            <MenuItem value={TripType.Economy}>Economy</MenuItem>
            <MenuItem value={TripType.Business}>Business</MenuItem>
          </CustomSelect>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: 10,
          }}
        >
          <Autocomplete
            loading={sourceLoading}
            onInputChange={handleSourceSearch}
            onChange={(event, value: SourceItem | null) => {
              if (value) {
                setSource(value.presentation.suggestionTitle);
                setSourceId({ skyId: value.skyId, entityId: value.entityId });
              }
            }}
            disablePortal
            getOptionLabel={(option: SourceItem) =>
              option.presentation.suggestionTitle
            }
            // isOptionEqualToValue={(option, value) => option.skyId === value.skyId}
            options={sourceList?.data || []}
            sx={{
              width: {
                xs: "calc(50% - 8px)",
                lg:
                  selectedTab === Tab.RoundTrip
                    ? "calc(25% - 12px)"
                    : "calc(33.33% - 12px)",
              },
            }}
            renderInput={(params) => <TextField {...params} label="From" />}
          />
          <Autocomplete
            onChange={(event, value: SourceItem | null) => {
              if (value) {
                setDestination(value.presentation.suggestionTitle);
                setDestinationId({
                  skyId: value.skyId,
                  entityId: value.entityId,
                });
              }
            }}
            getOptionLabel={(option: SourceItem) =>
              option.presentation.suggestionTitle
            }
            loading={destinationLoading}
            onInputChange={handleDestinationSearch}
            disablePortal
            options={destinationList?.data || []}
            sx={{
              width: {
                xs: "calc(50% - 8px)",
                lg:
                  selectedTab === Tab.RoundTrip
                    ? "calc(25% - 12px)"
                    : "calc(33.33% - 12px)",
              },
            }}
            renderInput={(params) => (
              <TextField {...params} label="Where To?" />
            )}
          />

          {/* save value yyyy-mm-dd */}
          <DatePicker
            value={departureDate}
            sx={{
              width: {
                xs: "calc(50% - 8px)",
                lg:
                  selectedTab === Tab.RoundTrip
                    ? "calc(25% - 12px)"
                    : "calc(33.33% - 12px)",
              },
            }}
            format="DD-MM-YYYY"
            onChange={(value) => {
              setDepartureDate(value);
            }}
            label="Departure"
          />
          {selectedTab === Tab.RoundTrip && (
            <DatePicker
              sx={{ width: { xs: "calc(50% - 8px)", lg: "calc(25% - 12px)" } }}
              onChange={(value) => {
                setReturnDate(value);
              }}
              format="DD-MM-YYYY"
              value={selectedTab === Tab.RoundTrip ? returnDate : null}
              label="Return"
            />
          )}
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Button
            loading={loadingFlights}
            onClick={searchFlights}
            variant="outlined"
          >
            Explore
          </Button>
        </div>
      </Card>
      {results && <FlightResultsTable data={results} />}
    </>
  );
};

export default Filters;
