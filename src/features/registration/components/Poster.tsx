'use client';
import Image from 'next/image';
import { motion } from 'motion/react';
import Tilt, { ReactParallaxTiltProps } from 'react-parallax-tilt';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { animations, EASE } from '@/lib/animation';
import { cn } from '@/lib/utils';

type PosterSize = 'sm' | 'md' | 'lg' | 'xl' | 'custom';

type GlarePosition = 'all' | 'top' | 'right' | 'bottom' | 'left';

type TiltProps = {
  perspective?: number;
  scale?: number;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
  glareColor?: string;
  glarePosition?: GlarePosition;
  glareBorderRadius?: string;
  transitionSpeed?: number;
  tiltEnable?: boolean;
}

type PosterProps = {
  imageUrl: string;
  altText?: string;
  hoverCTA?: {
    link?: string;
    text: string;
  };
  size?: PosterSize;
  customWidth?: string;
  customHeight?: string;
  className?: string;
  tiltProps?: Partial<TiltProps>;
};

const HOVER_TRANSITION = { ease: EASE, duration: 0.8 };

const defaultTiltProps: TiltProps = {
  perspective: 1000,
  scale: 1.02,
  tiltMaxAngleX: 5,
  tiltMaxAngleY: 5,
  glareEnable: true,
  glareMaxOpacity: 0.1,
  glareColor: "#ffffff",
  glarePosition: "all",
  glareBorderRadius: "11px",
  transitionSpeed: 300,
  tiltEnable: true,
};

const sizeDimensions = {
  sm: {
    width: '200px',
    height: '267px',
  },
  md: {
    width: '300px',
    height: '400px',
  },
  lg: {
    width: '400px',
    height: '533px',
  },
  xl: {
    width: '500px',
    height: '667px',
  },
  custom: {
    width: 'auto',
    height: 'auto',
  },
};

export function Poster({ 
  imageUrl, 
  altText, 
  hoverCTA, 
  size = 'md', 
  customWidth,
  customHeight,
  className,
  tiltProps = {}
}: PosterProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [buttonHeight, setButtonHeight] = useState(0);

  const finalTiltProps = { ...defaultTiltProps, ...tiltProps } as ReactParallaxTiltProps;

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight);
    }
  }, []);

  const dimensions = size === 'custom' 
    ? { width: customWidth, height: customHeight }
    : sizeDimensions[size];

  const containerStyle = {
    width: dimensions.width,
    height: dimensions.height,
  };

  const cardContent = (
    <motion.div
      className="rounded-md relative"
      initial="initial"
      whileHover={hoverCTA ? "hover" : undefined}
      style={{ 
        overflow: 'hidden',
        width: '100%',
        height: '100%'
      }}
    >
      <div className="relative w-full h-full">
        <motion.div
          variants={hoverCTA ? {
            initial: { y: 0 },
            hover: { y: -buttonHeight }
          } : undefined}
          transition={HOVER_TRANSITION}
          className="h-full"
        >
          <Image
            src={imageUrl}
            alt={altText || 'Event Poster'}
            fill
            className="object-cover rounded-md"
            sizes={`(max-width: ${dimensions.width}) 100vw, ${dimensions.width}`}
            priority
          />
        </motion.div>
      </div>

      {hoverCTA && (
        <motion.div
          ref={buttonRef}
          className="absolute left-0 right-0"
          style={{ bottom: -buttonHeight }}
          variants={{
            initial: { y: 0 },
            hover: { y: -buttonHeight }
          }}
          transition={HOVER_TRANSITION}
        >
          <Button className="w-full rounded-none h-12 flex items-center justify-center gap-1">
            <span>{hoverCTA.text}</span>
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      )}
    </motion.div>
  );

  const content = hoverCTA?.link ? (
    <Link href={hoverCTA.link} className="block w-full h-full">
      {cardContent}
    </Link>
  ) : cardContent;

  return (
    <motion.div
      animate={{ y: [0, 12, 0] }}
      transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
    >
      <motion.div
        variants={animations.fadeUp}
        initial="hidden"
        animate="visible"
        className={cn("inline-block", className)}
        style={containerStyle}
      >
        <Tilt
          className="w-full h-full rounded-md"
          {...finalTiltProps}
        >
          {content}
        </Tilt>
      </motion.div>
    </motion.div>
  );
}