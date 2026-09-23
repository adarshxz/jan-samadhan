'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  delta?: number | string;
  deltaLabel?: string;
  icon?: React.ElementType;
  iconColor?: string;
  animate?: boolean;
  compact?: boolean;
  highlight?: boolean;
}

function useCountUp(target: number, duration = 1000, enabled = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled || typeof target !== 'number') return;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, enabled]);

  return count;
}

export function StatsCard({
  label,
  value,
  suffix,
  prefix,
  delta,
  deltaLabel,
  icon: Icon,
  iconColor = 'text-navy-600',
  animate = true,
  compact,
  highlight,
}: StatsCardProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const numericValue = typeof value === 'number' ? value : 0;
  const count = useCountUp(numericValue, 800, animate && visible && typeof value === 'number');
  const displayValue = typeof value === 'number' ? count.toLocaleString() : value;

  return (
    <div
      ref={ref}
      className={cn(
        'stat-card animate-fade-in',
        highlight && 'border-navy-200 bg-navy-50',
        compact ? 'p-3' : 'p-5'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <span className={cn('data-label', highlight ? 'text-navy-500' : '')}>{label}</span>
        {Icon && (
          <div className={cn('w-8 h-8 rounded-md flex items-center justify-center', highlight ? 'bg-navy-100' : 'bg-gray-50')}>
            <Icon className={cn('w-4 h-4', iconColor)} />
          </div>
        )}
      </div>
      <div className="flex items-end gap-1">
        {prefix && <span className={cn('text-lg font-semibold', highlight ? 'text-navy-800' : 'text-gray-600')}>{prefix}</span>}
        <span className={cn('font-bold tracking-tight', highlight ? 'text-navy-900' : 'text-gray-900', compact ? 'text-2xl' : 'text-3xl')}>
          {displayValue}
        </span>
        {suffix && <span className={cn('text-sm font-medium mb-0.5', highlight ? 'text-navy-700' : 'text-gray-500')}>{suffix}</span>}
      </div>
      {delta !== undefined && (
        <div className="flex items-center gap-1 mt-1.5">
          {typeof delta === 'number' ? (
            <>
              {delta > 0 ? (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              ) : delta < 0 ? (
                <TrendingDown className="w-3.5 h-3.5 text-red-500" />
              ) : (
                <Minus className="w-3.5 h-3.5 text-gray-400" />
              )}
              <span className={cn('text-xs font-medium', delta > 0 ? 'text-emerald-600' : delta < 0 ? 'text-red-600' : 'text-gray-500')}>
                {delta > 0 ? '+' : ''}{delta}% {deltaLabel || 'vs last month'}
              </span>
            </>
          ) : (
            <span className="text-xs font-semibold text-emerald-600 flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500 inline" />
              <span>{delta}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
