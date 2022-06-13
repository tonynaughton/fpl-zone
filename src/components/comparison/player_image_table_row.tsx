import React, { Fragment } from "react";
import { Close } from "@mui/icons-material";
import { Box, IconButton, TableCell, TableRow } from "@mui/material";
import { getPlayerImageUrl } from "helpers";
import { Player } from "types";

import { AddButton,MAX_PLAYER_COUNT } from ".";

interface PlayerImageTableRowProps {
  players: Player[];
  onAddPlayerClick: () => void;
  onRemovePlayerClick: (player: Player) => void;
}

export const PlayerImageTableRow = ({
  players,
  onAddPlayerClick,
  onRemovePlayerClick
}: PlayerImageTableRowProps): JSX.Element => {
  const renderPlayerImage = (url: string, player?: Player): JSX.Element => {

    return (
      <TableCell align='center' className='standard-table-cell'>
        <Box
          data-testid={`player-image-container-${player ? player.id : "placeholder"}`}
          onClick={!player ? onAddPlayerClick : undefined}
          sx={{
            height: "18vh",
            width: "18vh",
            margin: "auto",
            backgroundImage: `url(${url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: !player ? "pointer" : "auto",
            borderRadius: !player ? "50%" : "auto",
            position: "relative"
          }}
        >
          { !player
            ? (
              <AddButton />
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
                  data-testid='remove-button'
                  onClick={(): void => onRemovePlayerClick(player)}
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
      {players.map((player, key) => {
        const url = getPlayerImageUrl(player);

        return (
          <Fragment key={key}>
            {renderPlayerImage(url, player)}
          </Fragment>
        );
      })}
      {players.length < MAX_PLAYER_COUNT && renderPlayerImage(`${process.env.PUBLIC_URL}/assets/images/player-placeholder.png`)}
    </TableRow>
  );
};
