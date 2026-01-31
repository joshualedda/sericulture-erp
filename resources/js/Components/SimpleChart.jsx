import React from 'react';

// Simple SVG line chart with dummy data
export default function SimpleChart({ width = 600, height = 200, data }) {
    const padding = 20;
    const w = width;
    const h = height;

    // default dummy data if none provided
    const values = data && data.length ? data : [1200, 1800, 1500, 2200, 2000, 2600, 3000];
    const max = Math.max(...values) * 1.1;
    const min = 0;
    const stepX = (w - padding * 2) / (values.length - 1);

    const points = values.map((v, i) => {
        const x = padding + i * stepX;
        const y = padding + (1 - (v - min) / (max - min)) * (h - padding * 2);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="w-full overflow-hidden">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
                {/* background grid */}
                {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                    <line key={i} x1={padding} x2={w - padding} y1={padding + t * (h - padding * 2)} y2={padding + t * (h - padding * 2)} stroke="#eef2ff" strokeWidth={1} />
                ))}

                {/* polyline */}
                <polyline points={points} fill="none" stroke="#4f46e5" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

                {/* area below */}
                <polyline points={`${points} ${w - padding},${h - padding} ${padding},${h - padding}`} fill="#eef2ff" stroke="none" />

                {/* points */}
                {values.map((v, i) => {
                    const x = padding + i * stepX;
                    const y = padding + (1 - (v - min) / (max - min)) * (h - padding * 2);
                    return <circle key={i} cx={x} cy={y} r={3.5} fill="#4f46e5" />;
                })}
            </svg>
        </div>
    );
}
