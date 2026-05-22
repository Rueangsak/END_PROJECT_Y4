import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppButton, FadeIn } from '../design-system';
import { AuthContext } from '../login/Auth';

export default function NotFound() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        bgcolor: 'background.default',
      }}
    >
      <FadeIn>
        <Stack spacing={3} alignItems="center" textAlign="center" sx={{ maxWidth: 420 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '5rem' }, fontWeight: 800, color: 'primary.main' }}>
            404
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            ไม่พบหน้าที่ต้องการ
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ลิงก์อาจหมดอายุ ถูกลบ หรือพิมพ์ URL ไม่ถูกต้อง
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <AppButton component={Link} to="/" variant="outlined">
              กลับหน้าหลัก
            </AppButton>
            {currentUser ? (
              <AppButton component={Link} to="/Work" variant="contained">
                ไปงานนำเสนอ
              </AppButton>
            ) : (
              <AppButton component={Link} to="/login" variant="contained">
                เข้าสู่ระบบ
              </AppButton>
            )}
          </Stack>
        </Stack>
      </FadeIn>
    </Box>
  );
}
