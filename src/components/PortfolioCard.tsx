import { Play } from 'lucide-react'

interface PortfolioCardProps {
  image: string
  type: string
  title: string
  description: string
  aspectRatio?: '16/9' | '3/4'
  onClick: () => void
}

export default function PortfolioCard({
  image, type, title, description, aspectRatio = '16/9', onClick,
}: PortfolioCardProps) {
  const isPortrait = aspectRatio === '3/4'
  return (
    <div onClick={onClick}
      className={`group flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-deep-indigo transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-card-hover hover:border-lantern-orange/30 ${isPortrait ? 'w-[260px] md:w-[300px]' : 'w-[340px] md:w-[400px]'}`}>
      <div className={`relative overflow-hidden bg-deep-indigo ${isPortrait ? 'aspect-[3/4]' : 'aspect-video'}`}>
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-indigo/60 to-transparent" />
        <span className="absolute top-4 left-4 bg-lantern-orange text-night-sky text-xs font-medium px-3 py-1 rounded-full">{type}</span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-lantern-orange/90 rounded-full flex items-center justify-center shadow-lantern-lg">
            <Play size={24} className="text-night-sky ml-1" fill="#0D1B2A" />
          </div>
        </div>
      </div>
      <div className="bg-deep-indigo p-5">
        <h3 className="font-display-cn text-lg text-pure-white font-bold mb-2 group-hover:text-lantern-orange transition-colors line-clamp-1">{title}</h3>
        <p className="text-pale-silver text-sm leading-relaxed line-clamp-2">{description}</p>
      </div>
    </div>
  )
}
