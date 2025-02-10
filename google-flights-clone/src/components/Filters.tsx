import {
  ArrowRightAlt,
  ConnectingAirportsOutlined,
  PersonOutline,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ClickAwayListener,
  List,
  ListItem,
  ListItemIcon,
  MenuItem,
  Popper,
  Select,
  styled,
} from "@mui/material";
import React, { useState } from "react";

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
  const [selectedTab, setSelectedTab] = useState(Tab.RoundTrip);
  const [tripType, setTripType] = useState(TripType.Economy);
  const [anchorEl, setAnchorEl] = useState(null);
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

  const open = Boolean(anchorEl);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <CustomSelect size="small" value={selectedTab} onChange={handleChange}>
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

      <Box>
        <Button variant="oulined" onClick={handleToggle}>
          <PersonOutline />{" "}
          {selectedPassengers.adults + selectedPassengers.children}
        </Button>
        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <ClickAwayListener onClickAway={handleClose}>
            <List
              sx={{ border: "1px solid #ccc", bgcolor: "background.paper" }}
            >
              <ListItem>
                Adults
                <Button
                  disabled={selectedPassengers.adults === 1}
                  onClick={() =>
                    setSelectedPassengers((prev) => ({
                      ...prev,
                      adults: prev.adults - 1,
                    }))
                  }
                >
                  -
                </Button>
                {selectedPassengers.adults}
                <Button
                  disabled={selectedPassengers.adults === 9}
                  onClick={() =>
                    setSelectedPassengers((prev) => ({
                      ...prev,
                      adults: prev.adults + 1,
                    }))
                  }
                >
                  +
                </Button>
              </ListItem>
              <ListItem>
                Children
                <Button
                  disabled={selectedPassengers.children === 0}
                  onClick={() =>
                    setSelectedPassengers((prev) => ({
                      ...prev,
                      children: prev.children - 1,
                    }))
                  }
                >
                  -
                </Button>
                {selectedPassengers.children}
                <Button
                  disabled={selectedPassengers.children === 9}
                  onClick={() =>
                    setSelectedPassengers((prev) => ({
                      ...prev,
                      children: prev.children + 1,
                    }))
                  }
                >
                  +
                </Button>
              </ListItem>
            </List>
          </ClickAwayListener>
        </Popper>
      </Box>

      <CustomSelect size="small" value={tripType} onChange={handleTripChange}>
        <MenuItem value={TripType.Economy}>Economy</MenuItem>
        <MenuItem value={TripType.Business}>Business</MenuItem>
      </CustomSelect>
    </div>
  );
};

export default Filters;
