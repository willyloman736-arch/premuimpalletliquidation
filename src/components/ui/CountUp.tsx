'use client';

import { useRef, useState, useEffect } from 'react';

function parse(value: string) {
  const m = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!m) return { prefix: '', num: 0, suffix: value, dec: 0 };
  const numStr = m[2];
  return { prefix: m[1], num: parseFloat(numStr), suffix: m[3], dec: (numStr.split('.')[1] || '').length };
}

export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const { prefix, num, suffix, dec } = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [disp, setDisp] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setDisp(num);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisp(num * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setDisp(num);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [num, duration]);

  const shown = dec > 0 ? disp.toFixed(dec) : Math.round(disp).toLocaleString('en-US');
  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
