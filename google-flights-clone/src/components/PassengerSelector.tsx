import { PersonOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Popper,
  ClickAwayListener,
  List,
  ListItem,
} from "@mui/material";
import React from "react";

const PassengerSelector: React.FC<{
  selectedPassengers: { adults: number; children: number };
  setSelectedPassengers: React.Dispatch<
    React.SetStateAction<{ adults: number; children: number }>
  >;
  anchorEl: HTMLElement | null;
  handleToggle: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
}> = ({
  selectedPassengers,
  setSelectedPassengers,
  anchorEl,
  handleToggle,
  handleClose,
}) => {
  const open = Boolean(anchorEl);
  return (
    <Box>
      <Button variant="outlined" onClick={handleToggle}>
        <PersonOutline />{" "}
        {selectedPassengers.adults + selectedPassengers.children}
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <List
            sx={{
              border: "1px solid #ccc",
              bgcolor: "white",
              opacity: 1,
              zIndex: 10000,
            }}
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
  );
};

export default PassengerSelector;
