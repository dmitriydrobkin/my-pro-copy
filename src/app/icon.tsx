import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: '#0A0A0A', // Цвет ink (почти черный)
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '6px', // Немного скругленные углы
          fontWeight: 900,
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        M<span style={{ color: '#FF5A36' }}>.</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
