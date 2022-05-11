import React from 'react'

import { Box, Container, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import { GitHub, LinkedIn } from '@mui/icons-material'
import DevChallengesIcon from '../components/DevChallengesIcon'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <Box component="footer" sx={{ marginTop: 'auto' }}>
      <Divider />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 4,
          }}
        >
          <Typography color="text.secondary" variant="body2">
            © {year} Correia JPV
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link color="text.secondary" href="https://github.com/Correia-jpv/devchallenges-windbnb" underline="none" variant="body2">
              <IconButton aria-label="GitHub">
                <GitHub />
              </IconButton>
            </Link>
            <Link color="text.secondary" href="https://linkedin.com/in/correiajpv/" underline="none" variant="body2">
              <IconButton aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Link>
            <Link color="text.secondary" href="https://devchallenges.io/portfolio/Correia-jpv" underline="none" variant="body2">
              <IconButton aria-label="devChallenges">
                <DevChallengesIcon />
              </IconButton>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
