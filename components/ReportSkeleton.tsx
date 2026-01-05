
import React from 'react';

const ReportSkeleton: React.FC = () => {
  return (
    <div className="a4-page bg-white shadow-2xl mx-auto p-[15mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col font-sans animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
            <div className="h-6 bg-slate-200 rounded w-48"></div>
          </div>
          <div className="h-10 bg-slate-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-2/3"></div>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 min-w-[240px] space-y-3">
          <div className="h-3 bg-slate-200 rounded w-full"></div>
          <div className="h-3 bg-slate-200 rounded w-full"></div>
          <div className="h-3 bg-slate-200 rounded w-full"></div>
        </div>
      </div>

      <div className="h-[2px] bg-slate-100 w-full mb-12"></div>

      {/* Verdict Box Skeleton */}
      <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-8 text-center mb-12">
        <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-slate-200 rounded w-full mx-auto mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
      </div>

      {/* Table Skeleton */}
      <div className="mb-12 flex-grow">
        <div className="h-4 bg-slate-200 rounded w-48 mb-6"></div>
        <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex border-b border-slate-100 p-5 items-center gap-4">
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="w-8 h-8 bg-slate-200 rounded-full mx-auto"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3 ml-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 h-48"></div>
    </div>
  );
};

export default ReportSkeleton;
