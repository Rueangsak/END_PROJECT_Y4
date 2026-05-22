import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppButton, AppCard, FadeIn } from '../../design-system';
import PublicNavBar from '../../layout/PublicNavBar';
import { colors } from '../../design-system/tokens/colors';
import { containerMaxWidth, layoutSpacing } from '../../design-system/tokens/spacing';
import landingContent from './landingContent';
import {
  CloudOutlinedIcon,
  LeaderboardOutlinedIcon,
  PollOutlinedIcon,
  QuestionAnswerOutlinedIcon,
} from './LandingIcons';

const featureIcons = {
  cloud: CloudOutlinedIcon,
  poll: PollOutlinedIcon,
  qa: QuestionAnswerOutlinedIcon,
  ranking: LeaderboardOutlinedIcon,
};

const sectionSx = {
  py: { xs: 6, md: 10 },
  px: layoutSpacing.pageX,
};

export default function LandingPage() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef(null);
  const languageTimerRef = useRef(null);

  const content = useMemo(() => landingContent[currentLang] || landingContent.th, [currentLang]);

  useEffect(() => {
    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    if (isTransitioning) {
      transitionTimerRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
      }, 220);
    }

    return () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    };
  }, [isTransitioning]);

  useEffect(
    () => () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
      if (languageTimerRef.current) window.clearTimeout(languageTimerRef.current);
    },
    [],
  );

  const handleLanguageChange = (nextLang) => {
    if (nextLang === currentLang || (nextLang !== 'th' && nextLang !== 'en')) return;

    if (languageTimerRef.current) window.clearTimeout(languageTimerRef.current);
    setIsTransitioning(true);
    languageTimerRef.current = window.setTimeout(() => {
      setCurrentLang(nextLang);
    }, 120);
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PublicNavBar
        links={content.nav}
        brand={content.brand}
        loginLabel={content.navActions.login}
        startLabel={content.navActions.start}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      <Box sx={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 220ms ease' }}>
        {/* Hero */}
        <Box
          component="section"
          sx={{
            ...sectionSx,
            pt: { xs: 4, md: 6 },
            pb: { xs: 8, md: 12 },
            background: `linear-gradient(160deg, ${colors.neutral[50]} 0%, ${colors.semantic.infoLight} 40%, ${colors.neutral[0]} 100%)`,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg" sx={{ maxWidth: containerMaxWidth.lg }}>
            <FadeIn>
              <Stack spacing={3} alignItems={{ xs: 'center', md: 'flex-start' }} textAlign={{ xs: 'center', md: 'left' }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
                    lineHeight: 1.15,
                    maxWidth: 720,
                  }}
                >
                  {content.hero.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 560, fontWeight: 400, lineHeight: 1.6 }}>
                  {content.hero.subtitle}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                  <AppButton component={Link} to="/Work" variant="contained" size="large">
                    {content.hero.cta}
                  </AppButton>
                  <AppButton component={Link} to="/login" variant="outlined" size="large">
                    {content.hero.ctaSecondary}
                  </AppButton>
                </Stack>
              </Stack>
            </FadeIn>
          </Container>
        </Box>

        {/* Features */}
        <Box component="section" id="features" sx={{ ...sectionSx, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <FadeIn>
              <Typography variant="h4" component="h2" fontWeight={700} textAlign="center" sx={{ mb: 1 }}>
                {content.features.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 5, maxWidth: 520, mx: 'auto' }}>
                {content.features.subtitle}
              </Typography>
            </FadeIn>
            <Grid container spacing={3}>
              {content.features.items.map((feature, index) => {
                const Icon = featureIcons[feature.icon];
                return (
                  <Grid item xs={12} sm={6} md={3} key={feature.title}>
                    <FadeIn delay={index * 60}>
                      <AppCard
                        interactive
                        padding="md"
                        sx={{ height: '100%', textAlign: 'center' }}
                      >
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                          }}
                        >
                          <Icon style={{ width: 28, height: 28 }} />
                        </Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.text}
                        </Typography>
                      </AppCard>
                    </FadeIn>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        {/* About */}
        <Box component="section" id="about" sx={sectionSx}>
          <Container maxWidth="md">
            <FadeIn>
              <AppCard padding="lg" maxWidth={720} sx={{ mx: 'auto' }}>
                <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
                  {content.about.title}
                </Typography>
                <Stack spacing={2}>
                  {content.about.paragraphs.map((text) => (
                    <Typography key={text.slice(0, 24)} variant="body1" color="text.secondary" lineHeight={1.75}>
                      {text}
                    </Typography>
                  ))}
                </Stack>
              </AppCard>
            </FadeIn>
          </Container>
        </Box>

        {/* Contact */}
        <Box
          component="section"
          id="contact"
          sx={{
            ...sectionSx,
            bgcolor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="sm">
            <FadeIn>
              <Stack spacing={2} textAlign="center">
                <Typography variant="h5" fontWeight={700}>
                  {content.contact.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <Box component="span" display="block">
                    {content.contact.labels.email}:{' '}
                    <Box component="a" href={`mailto:${content.contact.email}`} sx={{ color: 'primary.main' }}>
                      {content.contact.email}
                    </Box>
                  </Box>
                  <Box component="span" display="block" sx={{ mt: 0.5 }}>
                    {content.contact.labels.facebook}: {content.contact.facebook}
                  </Box>
                  <Box component="span" display="block" sx={{ mt: 0.5 }}>
                    {content.contact.labels.tel}: {content.contact.tel}
                  </Box>
                </Typography>
                <AppButton component={Link} to="/Work" variant="contained" sx={{ alignSelf: 'center', mt: 2 }}>
                  {content.contact.cta}
                </AppButton>
              </Stack>
            </FadeIn>
          </Container>
        </Box>

        <Box
          component="footer"
          sx={{
            py: 3,
            textAlign: 'center',
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: colors.neutral[900],
            color: colors.neutral[300],
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Teaching Assistance Tools — {content.footer}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
