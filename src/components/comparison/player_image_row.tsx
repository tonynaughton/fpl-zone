import React, { Fragment } from "react";
import { Box, IconButton, TableCell, TableRow } from "@mui/material";
import { Player } from "types";

import { customBorderStyle, customCellStyle } from "./comparison_table";
import { Add } from "@mui/icons-material";

interface PlayerImageRowProps {
  players: Player[];
  onAddPlayerClick: () => void;
}

export const ImageRow = ({ players, onAddPlayerClick }: PlayerImageRowProps): JSX.Element => {
  const renderPlayerImage = (url: string): JSX.Element => {
    return (
      <TableCell align='center' sx={{ height: "inherit" }}>
        <Box
          onClick={onAddPlayerClick}
          sx={{
            height: "20vh",
            width: "20vh",
            margin: "auto",
            backgroundImage: `url(${url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            borderRadius: "50%"
          }}
        >
          { !players.length && 
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#5fdd6b",
                borderRadius: "50%"
              }}
            >
              <IconButton aria-label="add player button">
                <Add />
              </IconButton>
            </Box>
          }
        </Box>
      </TableCell>
    );
  };

  return (
    <TableRow
      sx={{
        "& .MuiTableCell-root": { customBorderStyle }
      }}
    >
      <TableCell sx={customCellStyle} />
      { players.length > 0
        ? (
          players.map((player, key) => {
            const imgId = player.photo.replace(".jpg", "");
            const url = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${imgId}.png`;

            return (
              <Fragment key={key}>
                {renderPlayerImage(url)}
              </Fragment>
            );
          })
        )
        : (
          renderPlayerImage(`${process.env.PUBLIC_URL}/assets/images/player-placeholder.png`)
        )}
    </TableRow>
  );
};
