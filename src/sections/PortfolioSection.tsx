import { useRef, useState } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import PortfolioCard from '@/components/PortfolioCard'
import SmartVideoPlayer from '@/components/SmartVideoPlayer'
import { X, ExternalLink } from 'lucide-react'

interface WorkItem {
  id: number; image: string; type: string; title: string; description: string; detail: string
  videoUrl?: string; videoFile?: string; videoFiles?: string[]; linkUrl?: string
}

const worksAIGC: WorkItem[] = [
  { id: 1, image: '/images/portfolio-1.jpg', type: 'MV', title: '观复', description: 'AIGC探索视频作品，画面与歌词结合', detail: '探讨个体的迷茫。生命在对抗重力与宿命中，能否挣脱尘世枷锁、找到自己的探索过程。下集产出中。（小红书点赞收藏40+）', videoUrl: 'https://www.bilibili.com/video/BV1UnEr6yEB8/', linkUrl: 'http://xhslink.com/o/45h3h9JerVX' },
  { id: 3, image: '/images/portfolio-vlog-2.jpg', type: '宠物vlog', title: "Max & Sadie's Vlog 上", description: '可爱金毛和高冷法斗大学生的NBA球赛之旅', detail: 'AI KOL试水，以小狗Vlog的形式记录生活与旅行中的精彩瞬间，赋予了小狗完整的人设背景，采用了逐段图生视频的方式提高整体质感。上集。（由于国内网络限制视频可能无法观看，高清视频请扫描本网站最后的作品集二维码查看）', videoUrl: 'https://www.tiktok.com/@maxsadieslife/video/7644447394955824414' },
  { id: 7, image: '/images/portfolio-3.jpg', type: '宠物vlog', title: "Max & Sadie's Vlog 下", description: '可爱金毛和高冷法斗大学生的NBA球赛之旅', detail: 'AI KOL试水，以小狗Vlog的形式记录生活与旅行中的精彩瞬间，赋予了小狗完整的人设背景，采用了逐段图生视频的方式提高整体质感。下集。（由于国内网络限制视频可能无法观看，高清视频请扫描本网站最后的作品集二维码查看）', videoUrl: 'https://www.tiktok.com/@maxsadieslife/video/7644775287951052063' },
  { id: 2, image: '/images/portfolio-2.jpg', type: '品牌广告', title: '赤尾产品广告', description: '大广赛参赛作品，产品广告短视频创作', detail: '全国大学生广告艺术大赛参赛作品，围绕赤尾品牌进行产品广告短视频创作，结合品牌logo进行了视觉拓展，紧扣产品卖点。（参赛作品暂无公开链接，可查看飞书作品集）', videoUrl: 'https://ecnpy5fbc4hr.feishu.cn/wiki/OwEPwOKh1ivDwzkdiBlcMM8vnZg' },
]

const worksReal: WorkItem[] = [
  { id: 8, image: '/images/portfolio-shipian-1.jpg', type: '短视频', title: '当我用胶卷记录了一顿年夜饭', description: '小红书新年相关高赞短视频', detail: '用胶卷与数码的对比，展现年夜饭的温情，也让人思考团聚以后的冷清。（小红书点赞收藏2000+）', videoUrl: 'https://www.bilibili.com/video/BV1nzEr6YEA1/', linkUrl: 'https://www.xiaohongshu.com/explore/65d350e6000000000b01bd31?xsec_token=AB7H1Wl-gSmPIwBU_IM_hy9hSn0AS97SKM6nw3NpOCFH4=&xsec_source=pc_user' },
  { id: 4, image: '/images/portfolio-4.jpg', type: '转场短片', title: '扯到成都', description: '丝滑转场快剪，成都城市的影像记录', detail: '导演剪辑作品，以独特的视角记录成都这座城市的人文风貌与市井气息，融合传统与现代的城市影像表达。', videoUrl: 'https://www.bilibili.com/video/BV1pL4y147BZ/' },
  { id: 5, image: '/images/portfolio-5.jpg', type: '诗意纪录片', title: '十二时·十二世', description: '诗意纪录片，探索时间与空间流转的影像表达', detail: '独立作品，以"十二时辰"为线索，探索成都这个城市所蕴含的五行韵味，用诗意的手法深入探索人与自然的关系。', videoUrl: 'https://www.bilibili.com/video/BV1Y4421Q7x5/' },
  { id: 6, image: '/images/portfolio-6.jpg', type: '实验短片', title: '失语', description: '剪辑作品，以影像探讨沟通与表达的主题', detail: '通过影像讽刺和探讨现代社会中沟通障碍与情感表达的深层主题，引发人们的思考。', videoUrl: 'https://www.bilibili.com/video/BV1E54y1p7hv/' },
]

function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0), scrollLeft = useRef(0)
  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return; setIsDragging(true)
    startX.current = e.pageX - ref.current.offsetLeft; scrollLeft.current = ref.current.scrollLeft
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !ref.current) return; e.preventDefault()
    const x = e.pageX - ref.current.offsetLeft
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5
  }
  const onMouseUp = () => setIsDragging(false)
  return { ref, isDragging, onMouseDown, onMouseMove, onMouseUp }
}

function ScrollRow({ title, works, onSelect, delay = 0, cardRatio = '16/9' as '16/9' | '3/4' }: { title: string; works: WorkItem[]; onSelect: (work: WorkItem) => void; delay?: number; cardRatio?: '16/9' | '3/4' }) {
  const { ref, isDragging, onMouseDown, onMouseMove, onMouseUp } = useDragScroll()
  return (
    <SectionWrapper delay={delay}>
      <h3 className="font-display-cn text-xl text-lantern-orange font-bold mb-6 pl-2">{title}
      </h3>
      <div ref={ref} className={`flex gap-5 md:gap-6 overflow-x-auto pb-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {works.map((work) => (
          <PortfolioCard key={work.id} image={work.image} type={work.type} title={work.title} description={work.description}
            aspectRatio={cardRatio} onClick={() => { if (!isDragging) onSelect(work) }} />
        ))}
      </div>
    </SectionWrapper>
  )
}

export default function PortfolioSection() {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null)
  const allWorks = [...worksAIGC, ...worksReal]
  const selectedFromList = selectedWork ? allWorks.find((w) => w.id === selectedWork.id) || null : null

  return (
    <section id="portfolio" className="relative w-full py-24 md:py-40">
      <div className="px-6 md:px-12 lg:px-20 mb-10 md:mb-14">
        <div className="max-w-[1200px] mx-auto">
          <SectionWrapper>
            <span className="text-xs font-body-en tracking-[0.15em] text-lantern-orange uppercase">Portfolio</span>
            <h2 className="font-display-cn text-3xl md:text-4xl text-pure-white font-bold mt-3">作品集</h2>
            <p className="text-pale-silver text-base mt-2">MV · 品牌广告 · 宠物vlog · 转场短片 · 诗意纪录片 · 实验短片</p>
          </SectionWrapper>
        </div>
      </div>
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <ScrollRow title="实拍作品" works={worksReal} onSelect={setSelectedWork} delay={0.1} cardRatio="16/9" />
        <p className="text-center text-warm-amber text-xs opacity-80 mt-2">（由于上传限制，高清视频请扫描网页最底部二维码或点击右上角小红书/B站按钮查看）</p>
      </div>
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-16">
        <ScrollRow title="AIGC作品" works={worksAIGC} onSelect={setSelectedWork} delay={0.2} cardRatio="3/4" />
        <p className="text-center text-warm-amber text-xs opacity-80 mt-2">（由于国内网络原因，部分视频可能无法打开，如需观看高清作品，请滑到网页底部扫描二维码查看）</p>
      </div>
      {selectedFromList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedWork(null)}>
          <div className="absolute inset-0 bg-night-sky/80 backdrop-blur-md" />
          <div className="relative bg-deep-indigo rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedWork(null)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-night-sky/60 rounded-full flex items-center justify-center text-mist-white hover:text-lantern-orange transition-colors"><X size={20} /></button>
            <div className="p-6 md:p-8 pb-0">
              <SmartVideoPlayer videoUrl={selectedFromList.videoUrl} videoFile={selectedFromList.videoFile} videoFiles={selectedFromList.videoFiles} label={selectedFromList.title} poster={selectedFromList.image} />
            </div>
            <div className="p-6 md:p-8 pt-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block bg-lantern-orange text-night-sky text-xs font-medium px-3 py-1 rounded-full mb-3">{selectedFromList.type}</span>
                  <h3 className="font-display-cn text-2xl text-pure-white font-bold">{selectedFromList.title}</h3>
                </div>
                {(selectedFromList.videoUrl || selectedFromList.linkUrl) && (
                  <a href={selectedFromList.linkUrl || selectedFromList.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-lantern-orange text-sm hover:underline flex-shrink-0 mt-1"><ExternalLink size={14} />原链接</a>
                )}
              </div>
              <p className="text-pale-silver text-sm leading-relaxed mt-4">{selectedFromList.detail}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
