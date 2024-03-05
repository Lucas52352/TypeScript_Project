import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { characters } from "../../api/characters";
import { ICharacter } from "./interface/character.interface"
import { Box, Chip, CircularProgress, Container, Divider, Grid, Typography } from "@mui/material";
import { themePalette } from "../../Config/theme.config";

export const CharacterPage: React.FC = () => {

  const { id } = useParams()

  const [loading, setLoading] = useState<boolean>(true);
  const [character, setCharacter] = useState<ICharacter | null>(null);

  useEffect(() => {
    characters.getById({ id })
      .then(response => {
        setCharacter(response.data)
        setLoading(false)
      }
      )
      .catch((error: any) => console.error(error)

      )
  }, [])

  return (
    <Box sx={{ width: "115%" }}>
      <Container maxWidth='xl' sx={{ padding: 3, border: 2, borderColor: themePalette.PR, borderRadius: 5 }}>
        {
          loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container columnSpacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <Typography variant="h2">{character!.name}</Typography>
                <Divider />
                <Box sx={{ textAlign: "left", m: 5 }}>
                  <Typography variant="h6">Specie: {character!.species}</Typography>
                  <Typography variant="h6">Type: {character!.type}</Typography>
                  <Typography variant="h6">Gender: {character!.gender}</Typography>
                  <Typography variant="h6">Origin: {character!.origin.name}</Typography>
                  <Typography variant="h6">Location: {character!.location.name}</Typography>
                  <Chip color="secondary" variant="outlined" label={character!.status}></Chip>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <img src={character!.image} alt={character!.name} style={{ width: '100%', borderRadius: '0.5rem' }} />
              </Grid>
            </Grid>
          )
        }
      </Container>
    </Box>
  )
}