import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { AppButton, AppInput, AppSection } from '../design-system';
import { layoutSpacing } from '../design-system/tokens/spacing';
import QRCode from 'qrcode';
import { QrPanel } from '../layout';

function QR() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQrCode = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
      setImageUrl('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppSection title="QR code" subtitle="Generate a code students can scan from the slide canvas.">
      <Stack spacing={layoutSpacing.form}>
        <AppInput label="Link or text" value={text} onChange={(e) => setText(e.target.value)} />
        <AppButton variant="contained" onClick={generateQrCode} disabled={loading}>
          Generate
        </AppButton>
        <QrPanel imageUrl={imageUrl} loading={loading} caption={text ? 'Preview' : undefined} participantUrl={text || undefined} />
      </Stack>
    </AppSection>
  );
}

export default QR;
