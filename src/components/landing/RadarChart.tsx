import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

interface Dimension {
  name: string;
  nameEn: string;
  value: number;
  color: string;
}

const initialDimensions: Dimension[] = [
  { name: '销售效能', nameEn: 'Sales', value: 45, color: 'hsl(209, 70%, 33%)' },
  { name: '营销精准', nameEn: 'Marketing', value: 60, color: 'hsl(209, 70%, 45%)' },
  { name: '供应链', nameEn: 'Supply Chain', value: 35, color: 'hsl(18, 50%, 54%)' },
  { name: '数据洞察', nameEn: 'Data Insights', value: 50, color: 'hsl(209, 60%, 40%)' },
  { name: 'AI成熟度', nameEn: 'AI Maturity', value: 30, color: 'hsl(18, 60%, 60%)' },
];

export function RadarChart() {
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const size = 300;
  const center = size / 2;
  const radius = size / 2 - 40;
  const levels = 5;

  // Calculate polygon points
  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / dimensions.length - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Generate polygon path
  const polygonPoints = dimensions
    .map((dim, i) => {
      const point = getPoint(i, dim.value);
      return `${point.x},${point.y}`;
    })
    .join(' ');

  // Animation on mount
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleValueChange = (index: number, newValue: number[]) => {
    setDimensions((prev) =>
      prev.map((dim, i) => (i === index ? { ...dim, value: newValue[0] } : dim))
    );
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Radar Chart SVG */}
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="drop-shadow-lg"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(26, 84, 144, 0.2))',
          }}
        >
          {/* Background circles */}
          {Array.from({ length: levels }).map((_, i) => (
            <polygon
              key={i}
              points={dimensions
                .map((_, j) => {
                  const point = getPoint(j, ((i + 1) / levels) * 100);
                  return `${point.x},${point.y}`;
                })
                .join(' ')}
              fill="none"
              stroke="hsl(209, 70%, 33%)"
              strokeOpacity={0.1 + i * 0.05}
              strokeWidth={1}
            />
          ))}

          {/* Axis lines */}
          {dimensions.map((_, i) => {
            const point = getPoint(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={point.x}
                y2={point.y}
                stroke="hsl(209, 70%, 33%)"
                strokeOpacity={0.2}
                strokeWidth={1}
              />
            );
          })}

          {/* Data polygon */}
          <polygon
            points={polygonPoints}
            fill="url(#radarGradient)"
            fillOpacity={0.3}
            stroke="hsl(209, 70%, 33%)"
            strokeWidth={2}
            className={`transition-all duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* Data points */}
          {dimensions.map((dim, i) => {
            const point = getPoint(i, dim.value);
            const isHovered = hoveredIndex === i;
            return (
              <g key={i}>
                {/* Outer glow */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? 12 : 8}
                  fill={dim.color}
                  fillOpacity={0.2}
                  className="transition-all duration-300"
                />
                {/* Inner point */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? 6 : 4}
                  fill={dim.color}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            );
          })}

          {/* Labels */}
          {dimensions.map((dim, i) => {
            const point = getPoint(i, 120);
            const isHovered = hoveredIndex === i;
            return (
              <g key={i}>
                <text
                  x={point.x}
                  y={point.y - 8}
                  textAnchor="middle"
                  className={`text-xs font-serif transition-all duration-300 ${
                    isHovered ? 'fill-primary' : 'fill-muted-foreground'
                  }`}
                  style={{ fontFamily: 'Noto Serif SC, serif' }}
                >
                  {dim.name}
                </text>
                <text
                  x={point.x}
                  y={point.y + 8}
                  textAnchor="middle"
                  className={`text-[10px] font-mono transition-all duration-300 ${
                    isHovered ? 'fill-primary' : 'fill-muted-foreground/60'
                  }`}
                >
                  {dim.nameEn}
                </text>
              </g>
            );
          })}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(209, 70%, 33%)" />
              <stop offset="100%" stopColor="hsl(18, 50%, 54%)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center score */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary font-mono">
              {Math.round(dimensions.reduce((acc, d) => acc + d.value, 0) / dimensions.length)}
            </div>
            <div className="text-xs text-muted-foreground">综合指数</div>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="w-full lg:w-64 space-y-4">
        <p className="text-sm text-muted-foreground mb-4 font-serif-body">
          拖动滑块，体验 AI 诊断如何分析您的企业能力
        </p>
        {dimensions.map((dim, i) => (
          <div
            key={i}
            className={`space-y-2 p-3 rounded-lg transition-all duration-300 ${
              hoveredIndex === i ? 'glass-card' : ''
            }`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{dim.name}</span>
              <span className="text-xs font-mono text-muted-foreground">{dim.value}%</span>
            </div>
            <Slider
              value={[dim.value]}
              onValueChange={(val) => handleValueChange(i, val)}
              max={100}
              min={0}
              step={1}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
