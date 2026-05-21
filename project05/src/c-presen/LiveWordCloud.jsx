import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import D3WordCloud from 'react-d3-cloud';

function fontSize(word) {
  return Math.max(14, Math.min(72, 10 + word.value * 12));
}

/** Live word cloud for presenter view (react-d3-cloud; avoids react-wordcloud + Vite d3 issues). */
export default function LiveWordCloud({ words }) {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 400, height: 280 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setSize({ width: Math.floor(width), height: Math.floor(height) });
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Box ref={ref} sx={{ width: '100%', height: '100%', minHeight: 240 }}>
      <D3WordCloud
        data={words}
        width={size.width}
        height={size.height}
        fontSize={fontSize}
        padding={2}
        random={() => 0.5}
      />
    </Box>
  );
}
