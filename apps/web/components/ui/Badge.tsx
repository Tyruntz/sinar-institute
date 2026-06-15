interface BadgeProps {
  label: string
  variant?: 'teal' | 'amber' | 'green' | 'blue' | 'gray' | 'slate'
}

const variantClasses: Record<string, string> = {
  teal: 'bg-teal-100 text-teal-800',
  amber: 'bg-amber-100 text-amber-800',
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  gray: 'bg-gray-100 text-gray-700',
  slate: 'bg-slate-100 text-slate-700',
}

function getVariantForStatus(status: string): string {
  const map: Record<string, string> = {
    Active: 'teal',
    'Data Collection': 'teal',
    'Data Analysis': 'amber',
    'In Preparation': 'amber',
    'Under Review': 'blue',
    Published: 'green',
    Completed: 'green',
    Planning: 'gray',
    Planned: 'gray',
    'Future Research': 'slate',
    'Concept Development': 'slate',
  }
  return map[status] ?? 'gray'
}

export function Badge({ label, variant }: BadgeProps) {
  const cls = variantClasses[variant ?? getVariantForStatus(label)] ?? variantClasses.gray
  return (
    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${cls}`}>
      {label}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  return <Badge label={status} />
}
