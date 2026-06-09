import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface TimelineItemProps {
  time: string
  role: string
  company: string
  description?: string
  achievements?: string[]
}

export default function TimelineItem({ time, role, company, description, achievements }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative pl-8 md:pl-12 pb-12 last:pb-0 group">
      <div className="absolute left-[5px] md:left-[7px] top-3 bottom-0 w-[2px] bg-lantern-orange/30" />
      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-lantern-orange border-2 border-night-sky shadow-lantern transition-shadow duration-300 group-hover:shadow-lantern-lg" />
      <div className={`bg-deep-indigo rounded-2xl transition-all duration-300 cursor-pointer border-l-[3px] overflow-hidden ${isExpanded ? 'border-lantern-orange' : 'border-transparent hover:border-lantern-orange'}`} onClick={() => setIsExpanded(!isExpanded)}>
        <div className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="text-xs font-body-en tracking-wider text-lantern-orange uppercase">{time}</span>
              <h3 className="font-display-cn text-lg md:text-xl text-pure-white font-bold mt-1">{role}</h3>
              <p className="text-warm-amber text-sm md:text-base mt-0.5">{company}</p>
            </div>
            <ChevronDown size={20} className={`text-pale-silver transition-transform duration-300 flex-shrink-0 mt-1 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
        <div className={`overflow-hidden transition-all duration-400 ${isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 md:px-7 pb-6 md:pb-7 space-y-4">
            {description && (<div><span className="text-xs text-lantern-orange uppercase tracking-wider font-medium">工作内容</span><p className="text-mist-white text-sm leading-relaxed mt-2">{description}</p></div>)}
            {achievements && achievements.length > 0 && (<div><span className="text-xs text-lantern-orange uppercase tracking-wider font-medium">工作成果</span><ol className="mt-2 space-y-2 list-decimal list-inside">{achievements.map((item, i) => (<li key={i} className="text-pale-silver text-sm leading-relaxed">{item}</li>))}</ol></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
