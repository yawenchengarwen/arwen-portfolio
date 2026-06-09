import SectionWrapper from '@/components/SectionWrapper'
import SkillTag from '@/components/SkillTag'
import { GraduationCap, Award, Star } from 'lucide-react'

const skills = ['内容策划', '文案撰写', '新媒体运营', '视频制作', '项目协同', 'PR / 剪映 / FCP / AE', '达芬奇 / PS / LR', 'Claude / GPT / Gemini', '即梦 / 可灵 / 豆包', 'CapCut']

const education = [
  { school: '西南交通大学 211', detail: '新闻与传播硕士 人文学院 全日制', period: '2024.09 - 2027.06', score: '86.49/100' },
  { school: '成都理工大学 双一流', detail: '广播电视编导 本科 传播科学与艺术学院 全日制', period: '2020.09 - 2024.06', score: '85.32/100' },
]

const certificates = [
  '英语（IELTS）7.0，日语 N3',
  '米兰设计周高校设计展国家级二等奖',
  '全国三维数字创新大赛省级二等奖',
]

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-24 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <SectionWrapper>
              <span className="text-xs font-body-en tracking-[0.15em] text-lantern-orange uppercase">About Me</span>
              <h2 className="font-display-cn text-3xl md:text-4xl text-pure-white font-bold mt-3">关于我</h2>
              <div className="mt-8 space-y-5 text-mist-white text-base leading-[1.8]">
                <p>我是郑雅文（Arwen），专注于传统与 AI 内容的策划与短视频编导。拥有从选题策划、脚本撰写、实景拍摄、AI 视频制作到剪辑包装、配乐字幕的全流程经验。</p>
                <p>在校期间，我深入学习传播学与影视制作，并积极将 AI 技术应用于内容创作，探索 AI 时代下的新可能。我的作品涵盖短视频、影视项目及独立创意实验，兼具艺术感和数据驱动思维，能够将创意转化为高质量可传播内容。</p>
                <p>我热衷于将创意、技术与传播结合，打造多样化、高影响力的作品，也擅长团队协作与项目管理，致力于用 AI 与新媒体工具讲好每一个故事。我相信技术为创意插上翅膀，每一个像素背后都有故事在等待被讲述。</p>
              </div>
            </SectionWrapper>
          </div>
          <div className="lg:col-span-3 space-y-8">
            <SectionWrapper delay={0.15}>
              <div className="bg-deep-indigo rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap size={22} className="text-lantern-orange" />
                  <h3 className="font-display-cn text-lg md:text-xl text-pure-white font-bold">教育经历</h3>
                </div>
                <div className="space-y-5">
                  {education.map((edu, i) => (
                    <div key={i} className={`${i > 0 ? 'pt-5 border-t border-white/5' : ''}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-pure-white font-medium">{edu.school}</p>
                          <p className="text-pale-silver text-sm mt-0.5">{edu.detail}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-pale-silver text-xs">{edu.period}</p>
                          <p className="text-lantern-orange text-xs mt-1">均分 {edu.score}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionWrapper>
            <SectionWrapper delay={0.2}>
              <div className="bg-deep-indigo rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <Award size={22} className="text-lantern-orange" />
                  <h3 className="font-display-cn text-lg text-pure-white font-bold">技能 / 证书</h3>
                </div>
                <div className="space-y-2">
                  {certificates.map((cert, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lantern-orange mt-2 flex-shrink-0" />
                      <span className="text-mist-white text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionWrapper>
            <SectionWrapper delay={0.3}>
              <div className="bg-deep-indigo rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Star size={22} className="text-lantern-orange" />
                  <h3 className="font-display-cn text-lg text-pure-white font-bold">核心技能</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (<SkillTag key={skill} label={skill} />))}
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </section>
  )
}
