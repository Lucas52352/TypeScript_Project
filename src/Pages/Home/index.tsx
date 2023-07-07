import { Button, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CardComponent, Header } from '../../Components';
import { characters } from '../../api/characters';
import { TypeCharacter } from './interface/character.interface';

export const HomePage: React.FC<{}> = () => {
  const [allCharacters, setAllCharacters] = useState<TypeCharacter[] | null>(
    null,
  );

  useEffect(() => {
    characters

      .getAll({ page: 1 })

      .then(response => {
        setAllCharacters(response.data.results);
      })

      .catch(error => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <Container sx={{ mt: 6 }} maxWidth="xl">
        <Header
          title="Hola Mundo"
          description="Bienvenido a WW"
          element={
            <Button fullWidth variant="contained">
              {' '}
              Iniciar{' '}
            </Button>
          }
        />

        {allCharacters?.length !== 0 ? (
          <Grid container spacing={2} direction='row'>
            {allCharacters?.map(character => (
              <Grid item xs={3} >
                <CardComponent
                  key={character.id}
                  image={character.image}
                  name={character.name}
                  species={character.species}
                  status={character.status}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          ''
        )}
      </Container>
    </div>
  );
};
