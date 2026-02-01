
import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Cell
} from 'recharts';
import { COLORS } from '../constants.ts';

interface RadarDataProps {
  label: string;
  value: number;
}

export const CompetencyRadarChart: React.FC<{ data: RadarDataProps[], data2?: RadarDataProps[], label1: string, label2?: string }> = ({ data, data2, label1, label2 }) => {
  const chartData = data.map((d, i) => ({
    subject: d.label,
    A: d.value,
    B: data2 ? data2[i].value : undefined
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
          <Radar
            name={label1}
            dataKey="A"
            stroke={COLORS.primary}
            fill={COLORS.primary}
            fillOpacity={0.6}
          />
          {data2 && (
            <Radar
              name={label2}
              dataKey="B"
              stroke="#cbd5e1"
              fill="#cbd5e1"
              fillOpacity={0.4}
            />
          )}
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CompetencyBarChart: React.FC<{ data: RadarDataProps[], color?: string }> = ({ data, color = COLORS.primary }) => (
  <div className="h-80 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis dataKey="label" type="category" width={100} tick={{ fill: '#475569', fontSize: 13 }} />
        <Tooltip 
          cursor={{ fill: '#f8fafc' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={color} fillOpacity={0.8} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const SubCompetencyHeatmap: React.FC<{ data: number[], labels: string[] }> = ({ data, labels }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {data.map((val, idx) => {
        const intensity = Math.min(1, Math.max(0.1, (val - 40) / 60));
        return (
          <div key={idx} className="flex flex-col items-center p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold mb-3"
              style={{ backgroundColor: COLORS.primary, opacity: intensity }}
            >
              {val.toFixed(1)}
            </div>
            <span className="text-sm font-semibold text-gray-700 text-center">{labels[idx]}</span>
          </div>
        );
      })}
    </div>
  );
};
