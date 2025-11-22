import React from 'react';
import { Stage } from '@pixi/react';
import mainBg from '@/shared/assets/backgrounds/main_background.jpg';
import { useWindowSize } from '@/shared/lib/useWindowSize';
import FirefliesLayer from '@/shared/effects/FirefliesLayer';

const MainPage: React.FC = () => {
  const { width, height } = useWindowSize();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${mainBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Fireflies effect layer */}
      <Stage
        width={width}
        height={height}
        options={{
          backgroundAlpha: 0,
          antialias: true,
        }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <FirefliesLayer width={width} height={height} count={22} />
      </Stage>

      {/* Bottom navigation menu */}
      <div
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          height: 96,
          background: 'rgba(20,20,20,0.9)',
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 12,
          gap: 8,
        }}
      >
        {/* Button 1 */}
        <button
          type="button"
          style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              backgroundColor: '#666',
              borderRadius: 10,
            }}
          />
          <span>Button 1</span>
        </button>

        {/* Button 2 */}
        <button
          type="button"
          style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              backgroundColor: '#666',
              borderRadius: 10,
            }}
          />
          <span>Button 2</span>
        </button>

        {/* Button 3 */}
        <button
          type="button"
          style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              backgroundColor: '#666',
              borderRadius: 10,
            }}
          />
          <span>Button 3</span>
        </button>

        {/* Button 4 */}
        <button
          type="button"
          style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              backgroundColor: '#666',
              borderRadius: 10,
            }}
          />
          <span>Button 4</span>
        </button>

        {/* Button 5 */}
        <button
          type="button"
          style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              backgroundColor: '#666',
              borderRadius: 10,
            }}
          />
          <span>Button 5</span>
        </button>
      </div>
    </div>
  );
};

export default MainPage;

