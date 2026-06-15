export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-teal-700 font-medium text-sm tracking-wide uppercase">
      {children}
    </span>
  )
}

interface StatCardProps {
  label: string
  value: string
  type?: string
  unit?: string
}

export function StatCard({ label, value, type, unit }: StatCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
      <div className="font-bold text-slate-900">
        {value}{unit ? ` ${unit}` : ''}
      </div>
      {type && (
        <div className="text-xs text-gray-400 mt-1">{type}</div>
      )}
    </div>
  )
}

interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-slate-900 font-semibold mb-2">{title}</h3>
      {description && <p className="text-gray-500 text-sm max-w-md mx-auto">{description}</p>}
    </div>
  )
}
