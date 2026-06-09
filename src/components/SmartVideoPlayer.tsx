import { ExternalLink } from 'lucide-react'

interface SmartVideoPlayerProps {
  videoUrl?: string
  videoFile?: string
  videoFiles?: string[]
  label?: string
  className?: string
  poster?: string
}

function isXiaohongshu(url: string): boolean {
  return url.includes('xiaohongshu.com') || url.includes('xhslink.com')
}

function convertToEmbedUrl(url: string): string | null {
  if (isXiaohongshu(url)) return null
  const bvidMatch = url.match(/bilibili\.com\/video\/(BV[\w]+)/i)
  if (bvidMatch) return `https://player.bilibili.com/player.html?bvid=${bvidMatch[1]}&page=1&high_quality=1&autoplay=0&danmaku=0`
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/i)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`
  if (url.includes('embed') || url.includes('player')) return url
  return null
}

function getVideoType(filename: string): string {
  if (filename.endsWith('.mov')) return 'video/quicktime'
  if (filename.endsWith('.webm')) return 'video/webm'
  return 'video/mp4'
}

export default function SmartVideoPlayer({ videoUrl, videoFile, videoFiles, label, className = '', poster }: SmartVideoPlayerProps) {
  if (videoUrl && isXiaohongshu(videoUrl)) {
    return (
      <div className={`w-full rounded-xl bg-night-sky/60 border border-white/5 flex flex-col items-center justify-center gap-4 py-12 ${className}`}>
        <div className="w-16 h-16 bg-lantern-orange/20 rounded-full flex items-center justify-center">
          <ExternalLink size={28} className="text-lantern-orange" />
        </div>
        <p className="text-mist-white text-sm">{label || '小红书视频'}</p>
        <a href={videoUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-lantern-orange text-night-sky text-sm font-medium px-6 py-2.5 rounded-full hover:bg-warm-amber transition-colors">
          <ExternalLink size={14} />前往小红书观看
        </a>
      </div>
    )
  }

  if (videoFile) {
    return (
      <video controls className={`w-full rounded-xl bg-night-sky max-h-[65vh] object-contain ${className}`} preload="metadata" playsInline poster={poster}>
        <source src={`/videos/${videoFile}`} type={getVideoType(videoFile)} />
        <p className="text-pale-silver text-sm text-center py-8">浏览器不支持视频播放<a href={`/videos/${videoFile}`} download className="text-lantern-orange underline ml-1">下载</a></p>
      </video>
    )
  }

  if (videoFiles && videoFiles.length > 0) {
    return (
      <div className={`space-y-3 ${className}`}>
        {videoFiles.map((file, i) => (
          <div key={i}>
            {videoFiles.length > 1 && <span className="text-xs text-lantern-orange uppercase tracking-wider mb-1.5 block">{i === 0 ? '上集' : '下集'}</span>}
            <video controls className="w-full rounded-xl bg-night-sky max-h-[55vh] object-contain" preload="metadata" playsInline poster={poster}>
              <source src={`/videos/${file}`} type={getVideoType(file)} />
              <p className="text-pale-silver text-sm text-center py-8">浏览器不支持视频播放</p>
            </video>
          </div>
        ))}
      </div>
    )
  }

  if (videoUrl) {
    const embedUrl = convertToEmbedUrl(videoUrl)
    if (embedUrl) {
      return (
        <div className={`relative w-full rounded-xl overflow-hidden bg-night-sky ${className}`} style={{ paddingBottom: '56.25%', maxHeight: '65vh' }}>
          <iframe src={embedUrl} className="absolute inset-0 w-full h-full" allowFullScreen allow="autoplay; encrypted-media" title="视频播放器" />
        </div>
      )
    }
  }

  return (
    <div className={`w-full rounded-xl bg-night-sky/60 border border-white/5 flex flex-col items-center justify-center gap-3 ${className}`} style={{ minHeight: '200px' }}>
      <div className="w-14 h-14 bg-lantern-orange/20 rounded-full flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4A261" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
      </div>
      <p className="text-pale-silver text-sm">视频即将上线</p>
    </div>
  )
}
