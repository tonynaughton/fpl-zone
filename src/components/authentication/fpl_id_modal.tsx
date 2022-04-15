import { Close } from "@mui/icons-material";
import { Box, IconButton, Link, List, ListItem, Modal, Typography } from "@mui/material";
import React from "react";

interface FplIdModalProps {
  modalVisible: boolean;
  setModalOpen: (value: boolean) => void;
}

export default function FplIdModal({ modalVisible, setModalOpen }: FplIdModalProps): JSX.Element {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "#F9F9F9",
    border: "2px solid black",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={modalVisible} onClose={(): void => setModalOpen(false)}>
      <Box sx={modalStyle}>
        <Typography>How to get your FPL ID:</Typography>
        <List>
          <ListItem>
            1. Login in to&nbsp;
            <Link
              href="https://fantasy.premierleague.com/"
              sx={{ display: "inline-block" }}
              target="_blank"
            >
              fantasy.premierleague.com
            </Link>
            &nbsp;and navigate to the &apos;Points&apos; tab.
          </ListItem>
          <ListItem>
            2. Your FPL ID appears in the URL after &apos;entry&apos; and before &apos;event&apos;
            as highlighted:
          </ListItem>
          <ListItem>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/fpl-id.png`}
              alt="fpl-id-location"
              width="100%"
            />
          </ListItem>
          <ListItem>
            Note: Your FPL ID is publicly available. Inputting the ID into FPL Zone does not give
            the app permission to make changes to your FPL team on your behalf.
          </ListItem>
        </List>
        <IconButton
          size="large"
          sx={{ position: "absolute", top: 15, right: 15 }}
          onClick={(): void => setModalOpen(false)}
        >
          <Close />
        </IconButton>
      </Box>
    </Modal>
  );
}
