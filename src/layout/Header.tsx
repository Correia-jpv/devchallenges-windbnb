import { useContext, useState } from 'react'

import { alpha, AppBar, Autocomplete, Box, Button, Container, Drawer, Grid, IconButton, Paper, Popper, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { DarkMode, LightMode, Search, LocationOn, Add, Remove } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

import Logo from '../assets/logo.png'

import { ThemeContext } from '../features/ThemeContext'
import { withStyles } from '@mui/styles'

import hexRgb from 'hex-rgb'

import stays from '.././assets/stays.json'
import PopupState, { bindPopper, bindFocus } from 'material-ui-popup-state'

const Header = ({ locationChanger, guestsChanger, ...rest }) => {
  // Theme
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode

  const onClick = () => {
    if (darkMode) {
      theme.dispatch({ type: 'LIGHTMODE' })
    } else {
      theme.dispatch({ type: 'DARKMODE' })
    }
  }

  const muiTheme = useTheme()

  // Custom TextField styles
  const TextFieldAppbar = withStyles({
    root: {
      width: 150,
      '& .MuiOutlinedInput-root': {
        borderRadius: '0px',
        borderRight: '1px solid rgba(' + Object.values(hexRgb(muiTheme.palette.primary.main)).slice(0, 3) + ',0.07)',
        [muiTheme.breakpoints.down('sm')]: {
          borderRight: 'none',
          borderBottom: '1px solid rgba(' + Object.values(hexRgb(muiTheme.palette.primary.main)).slice(0, 3) + ',0.07)',
        },
        '& fieldset': {
          borderWidth: '0',
          borderRadius: '16px',
        },
      },
    },
  })(TextField)

  const TextFieldDrawer = withStyles({
    root: {
      width: '100%',
      '& .MuiOutlinedInput-root': {
        '& input': {
          marginTop: '0.5em',
        },
        '& .MuiOutlinedInput-notchedOutline ': {
          top: 0,
          '& legend': { display: 'none' },
        },
      },
    },
  })(TextFieldAppbar)

  // Drawer
  const [openDrawerSearch, setOpenDrawerSearch] = useState(false)
  const toggleDrawerSearch = () => setOpenDrawerSearch(!openDrawerSearch)

  // Location
  const [selectedLocation, setSelectedLocation] = useState<null | String>(null)

  // Guests
  const [countAdults, setCountAdults] = useState<number>(0)
  const [countChildren, setCountChildren] = useState<number>(0)

  const appBar = (
    <AppBar color="transparent" position="sticky" sx={{ height: 'auto', padding: '1em 0', backgroundColor: alpha(muiTheme.palette.background.paper, 0.7), backdropFilter: 'blur(20px)', boxShadow: 0 }}>
      <Container sx={{ height: '100%' }} maxWidth="lg">
        <Toolbar disableGutters sx={{ height: '100%', flexWrap: 'wrap' }}>
          <Box
            component="img"
            sx={{
              height: 19,
            }}
            alt="Logo"
            src={Logo}
          />
          <Box sx={{ flexGrow: 1, mx: 2 }} />
          <IconButton
            onClick={onClick}
            color="inherit"
            sx={{
              marginRight: '0.5em',
              [muiTheme.breakpoints.down('md')]: {
                margin: 0,
              },
            }}
          >
            {darkMode ? <DarkMode /> : <LightMode />}
          </IconButton>
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              [muiTheme.breakpoints.down('md')]: {
                paddingTop: '1.5em',
                flexBasis: '100%',
              },
            }}
          >
            <Box
              display="flex"
              sx={{
                boxShadow: '0px 1px 5px 0px rgba(' + Object.values(hexRgb(muiTheme.palette.primary.main)).slice(0, 3) + ',0.2)',
                borderRadius: '16px',
                overflow: 'hidden',
                [muiTheme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                },
              }}
            >
              <TextFieldAppbar disabled value={selectedLocation || 'Choose location'} variant="outlined" />
              <TextFieldAppbar
                disabled
                value={countAdults + countChildren > 0 ? countAdults + countChildren + ' guest' + (countAdults + countChildren !== 1 ? 's' : '') : 'Add guests'}
                variant="outlined"
              />
              <IconButton
                color="secondary"
                sx={{
                  padding: '0.6em',
                  borderRadius: '0 16px 16px 0',
                }}
                aria-label="search"
                onClick={() => toggleDrawerSearch()}
              >
                <Search />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )

  const drawer = (
    <Drawer
      anchor={'top'}
      open={openDrawerSearch}
      onClose={() => toggleDrawerSearch()}
      disableScrollLock={true}
      PaperProps={{
        sx: { overflowY: 'visible' },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          my={10}
          sx={{
            boxShadow: '0px 1px 5px 0px rgba(' + Object.values(hexRgb(muiTheme.palette.primary.main)).slice(0, 3) + ',0.2)',
            borderRadius: '16px',
          }}
        >
          <Grid item xs={12} sm={4}>
            <Autocomplete
              disablePortal
              forcePopupIcon={false}
              value={selectedLocation?.toString() || ''}
              onChange={(e, value) => setSelectedLocation(value)}
              options={Array.from(new Set(stays.map((stay) => stay.city + ', ' + stay.country)))}
              renderInput={(params) => (
                <TextFieldDrawer
                  {...params}
                  variant="outlined"
                  label="LOCATION"
                  placeholder="Choose location"
                  InputLabelProps={{
                    variant: 'filled',
                    shrink: true,
                    focused: true,
                  }}
                />
              )}
              renderOption={(props, option, { selected }) => (
                <li {...props} style={{ borderRadius: '16px', padding: '1em 0.5em' }}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <LocationOn />
                    <Typography variant="body2" component="span">
                      {option}
                    </Typography>
                  </Stack>
                </li>
              )}
              componentsProps={{ paper: { sx: { borderRadius: '0 0 16px 16px' } } }}
            />
          </Grid>

          <Grid item xs={12} sm={4} style={{ position: 'relative' }}>
            <PopupState variant="popper" popupId="popper-guests">
              {(popupState) => (
                <>
                  <TextFieldDrawer
                    variant="outlined"
                    label="GUESTS"
                    placeholder={countAdults + countChildren > 0 ? '' : 'Add guests'}
                    value={countAdults + countChildren > 0 ? (countAdults + countChildren).toString() : ''}
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      variant: 'filled',
                      shrink: true,
                      focused: true,
                    }}
                    {...bindFocus(popupState)}
                  />

                  <Popper {...bindPopper(popupState)} disablePortal sx={{ width: '100%', zIndex: 3000 }}>
                    <Paper sx={{ p: 2, borderRadius: '0 0 16px 16px' }}>
                      <Typography variant="body1" component="p">
                        Adults
                      </Typography>
                      <Typography variant="body2" component="p" gutterBottom sx={{ opacity: 0.7 }}>
                        Ages 13 or above
                      </Typography>

                      <Stack direction="row" alignItems="center" gap={2} paddingBottom={4}>
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label="minus adults"
                          onClick={() => {
                            popupState.close()
                            countAdults > 0 ? setCountAdults(countAdults - 1) : void 0
                          }}
                          sx={{
                            border: '1px solid rgba(' + Object.values(hexRgb(muiTheme.palette.primary.main)).slice(0, 3) + ', 0.8)',
                            borderRadius: '4px',
                          }}
                        >
                          <Remove />
                        </IconButton>
                        <Typography variant="body1" component="span">
                          {countAdults}
                        </Typography>
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label="plus adults"
                          onClick={() => {
                            popupState.close()
                            setCountAdults(countAdults + 1)
                          }}
                          sx={{
                            border: '1px solid rgba(' + Object.values(hexRgb(muiTheme.palette.primary.main)).slice(0, 3) + ', 0.8)',
                            borderRadius: '4px',
                          }}
                        >
                          <Add />
                        </IconButton>
                      </Stack>

                      <Typography variant="body1" component="p">
                        Children
                      </Typography>
                      <Typography variant="body2" component="p" gutterBottom sx={{ opacity: 0.7 }}>
                        Ages 2-12
                      </Typography>
                      <Stack direction="row" alignItems="center" gap={2}>
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label="minus children"
                          onClick={() => {
                            popupState.close()
                            countChildren > 0 ? setCountChildren(countChildren - 1) : void 0
                          }}
                          sx={{
                            border: '1px solid rgba(' + Object.values(hexRgb(muiTheme.palette.primary.main)).slice(0, 3) + ', 0.8)',
                            borderRadius: '4px',
                          }}
                        >
                          <Remove />
                        </IconButton>
                        <Typography variant="body1" component="span">
                          {countChildren}
                        </Typography>
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label="plus children"
                          onClick={() => {
                            popupState.close()
                            setCountChildren(countChildren + 1)
                          }}
                          sx={{
                            border: '1px solid rgba(' + Object.values(hexRgb(muiTheme.palette.primary.main)).slice(0, 3) + ', 0.8)',
                            borderRadius: '4px',
                          }}
                        >
                          <Add />
                        </IconButton>
                      </Stack>
                    </Paper>
                  </Popper>
                </>
              )}
            </PopupState>
          </Grid>

          <Grid item xs={12} sm={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Search />}
              sx={{
                padding: '1em',
                borderRadius: '16px',
                textTransform: 'capitalize',
                [muiTheme.breakpoints.down('sm')]: {
                  width: '100%',
                },
              }}
              onClick={() => {
                toggleDrawerSearch()
                locationChanger(selectedLocation)
                guestsChanger(countAdults + countChildren)
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Drawer>
  )

  return (
    <>
      {appBar}
      {drawer}
    </>
  )
}

export default Header
