import { useContext, useState } from 'react'

import { ThemeContext } from './features/ThemeContext'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Header from './layout/Header'
import Footer from './layout/Footer'

import { Box, Button, Card, CardContent, CardMedia, Container, CssBaseline, Grid, Stack, Typography } from '@mui/material'
import { StarRounded } from '@mui/icons-material'

import { LazyLoadImage } from 'react-lazy-load-image-component'

import stays from './assets/stays.json'

const light = createTheme({
    palette: {
      mode: 'light',

      primary: {
        main: '#000',
      },
      secondary: {
        main: '#EB5757',
      },
    },
  }),
  dark = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#1D1F20',
      },
      primary: {
        main: '#fff',
      },
      secondary: {
        main: '#EB5757',
      },
    },
  })

const App = () => {
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode

  const [location, setLocation] = useState<null | String>(null)
  const [guests, setGuests] = useState<number>(0)

  const filteredStays = stays.filter((stay) => (location === null || stay.city + ', ' + stay.country === location) && stay.maxGuests >= guests)

  const staysList = (
    <Container>
      <Grid container spacing={2} paddingY={2} sx={{ maxWidth: 'lg' }}>
        <Grid item xs={12}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-end'}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              {'All stays'}
            </Typography>

            <Typography variant="body2" component="span">
              {filteredStays.length + ' stay' + (filteredStays.length !== 1 ? 's' : '')}
            </Typography>
          </Box>
        </Grid>
        {filteredStays.map((stay) => {
          return (
            <Grid item xs={12} sm={6} lg={4}>
              <Card sx={{ border: 0, boxShadow: 0, background: 'unset', height: '100%' }}>
                <CardMedia>
                  <LazyLoadImage src={stay.photo} alt={stay.title} width="100%" effect={'opacity'} style={{ borderRadius: '16px', aspectRatio: '394/267', objectFit: 'cover' }} />
                </CardMedia>
                <CardContent sx={{ padding: 0, paddingTop: '0.5em' }}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Box>
                      {stay.superHost && (
                        <Button variant="outlined" size={'small'} sx={{ fontSize: '0.7em', borderRadius: '20px', lineHeight: 1.3, textTransform: 'uppercase', fontWeight: 'bold', marginRight: '1em' }}>
                          Super host
                        </Button>
                      )}
                      <Typography variant="body2" component="span" sx={{ opacity: 0.7 }}>
                        {stay.type + (stay.beds ? ' · ' + stay.beds + ' beds' : '')}
                      </Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                      <StarRounded color="secondary" />
                      <Typography variant="body2" component="span">
                        {stay.rating}
                      </Typography>
                    </Stack>
                  </Box>

                  <Typography gutterBottom variant="h6" component="p">
                    {stay.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <CssBaseline enableColorScheme />

      <Header locationChanger={setLocation} guestsChanger={setGuests} />
      {staysList}
      <Footer />
    </ThemeProvider>
  )
}

export default App
