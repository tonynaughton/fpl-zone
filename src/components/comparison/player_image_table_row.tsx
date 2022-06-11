import React, { Fragment } from "react";
import { Add, Close } from "@mui/icons-material";
import { Box, IconButton, TableCell, TableRow } from "@mui/material";
import { Player } from "types";

interface PlayerImageTableRowProps {
  players: Player[];
  onAddPlayerClick: () => void;
  onRemovePlayerClick: (player: Player) => void;
}

export const PlayerImageTableRow = ({ players, onAddPlayerClick, onRemovePlayerClick }: PlayerImageTableRowProps): JSX.Element => {
  const isPlaceholder = players.length === 0;

  const renderPlayerImage = (url: string, player?: Player): JSX.Element => {
    return (
      <TableCell align='center'>
        <Box
          onClick={isPlaceholder ? onAddPlayerClick : undefined}
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
            cursor: isPlaceholder ? "pointer" : "auto",
            borderRadius: isPlaceholder ? "50%" : "auto",
            position: "relative"
          }}
        >
          { isPlaceholder
            ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#5fdd6b",
                  borderRadius: "50%"
                }}
              >
                <IconButton aria-label='add player button'>
                  <Add />
                </IconButton>
              </Box>
            )
            : (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0
                }}
              >
                <IconButton
                  onClick={player ? (): void => onRemovePlayerClick(player) : undefined}
                  size='small'
                  sx={{
                    backgroundColor: "#c30000",
                    "&:hover": {
                      backgroundColor: "#e00d0d"
                    }
                  }}
                >
                  <Close color='info' />
                </IconButton>
              </Box>
            )}
        </Box>
      </TableCell>
    );
  };

  return (
    <TableRow>
      <TableCell className='first-table-cell' />
      { !isPlaceholder
        ? (
          players.map((player, key) => {
            const imgId = player.photo.replace(".jpg", "");
            const url = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${imgId}.png`;

            return (
              <Fragment key={key}>
                {renderPlayerImage(url, player)}
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
