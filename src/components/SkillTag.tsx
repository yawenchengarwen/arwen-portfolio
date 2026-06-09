interface SkillTagProps { label: string }

export default function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="inline-flex items-center px-4 py-1.5 text-sm border border-lantern-orange/60 text-lantern-orange rounded-full bg-transparent transition-all duration-300 hover:bg-lantern-orange hover:text-night-sky cursor-default">
      {label}
    </span>
  )
}
