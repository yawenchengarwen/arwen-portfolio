import SectionWrapper from '@/components/SectionWrapper'
import TimelineItem from '@/components/TimelineItem'

const experiences = [
  {
    time: '2026.04 - 2026.05', role: 'TikTok AIGC编导', company: '橙果视界科技有限公司',
    description: '负责TikTok短视频全链路内容生产，包括选题策划、脚本撰写、AI视频生成、剪辑包装、配乐字幕等；参与公司AI KOL项目从0到1搭建，协助完成虚拟达人形象设定、内容测试与账号运营；配合团队输出符合海外受众偏好的品牌及带货内容，并负责管理实习生任务分配与进度管理，保障日常发布与数据回收。',
    achievements: [
      '月均独立产出TikTok AI短视频数百条，熟练使用CapCut完成剪辑、字幕、卡点配乐等后期工作，保障内容产出效率与质量。',
      '独立完成宠物类AI KOL热点调研、脚本编写与视频产出，内容贴合TikTok海外用户表达习惯。',
      '搭建AI短视频生产SOP，整合提示词方法与工具参数，提升单条视频生产效率约30%。',
      '输出产品市场洞察报告，梳理竞品矩阵、潜力品类与内容方向，为团队选品和账号运营提供支持。制定橱窗号内容策略框架，涵盖选题逻辑、发布节奏与带货内容规划，助力账号商业转化。',
      '完成AIGC OPC课程教案撰写与PPT制作，搭建部门飞书管理表格，包括数据统计表、角色资产表、部门看板等。',
    ],
  },
  {
    time: '2025.06 - 2025.10', role: '实习生', company: '芒果TV《姐姐妹妹抓娃娃》节目组',
    description: '将前期拍摄素材进行结构化管理与标签化（人物/事件/情绪点/冲突线），输出可检索的内容索引与场记文档，支撑导演与后期快速定位素材、提升剪辑效率；参与多轮审片会，记录反馈要点并转译为可执行的修改清单，跟进后期迭代与版本确认，推动修改闭环落地；协助宣传与后期沟通，参与内容质量核查与细节问题修正，保障信息传递与执行闭环。',
    achievements: [
      '输出十余万字结构化场记与故事线梳理文档，保障导演/后期对真人秀叙事与关键卖点的一致理解与把控。支撑了10期节目和数条加更花絮的顺利剪辑。',
      '跟进数十次审片反馈流转，推进导演/宣管/台内意见落地与版本验收，形成可复用的"问题—定位—修改—复核"流程。',
      '参与内容质检，发现并核查修正细节问题，提升成片一致性与观感。',
      '完成宣传对接，确保数十条广告素材按节点确认并上线。',
    ],
  },
  {
    time: '2022.12 - 2023.02', role: '制片助理', company: '北京中视欢乐家园国际传媒集团有限公司',
    description: '《中央电视台2023年元宵晚会自贡分会场》项目制片；录制期间导演组工作保障；各节目道具采买、服装租赁、演员及场地对接；现场突发事件的处理及解决等。',
    achievements: [
      '协助公司成功在竞争性谈判中取得供应资格。',
      '共计统筹安排200余名演职人员的食宿、拍摄通告，保证了节目拍摄的顺利进行。',
      '解决了现场各种突发状况，满足了各方的要求。',
    ],
  },
  {
    time: '2020.09 - 2022.07', role: '新媒体工作室部长 | 新媒体运营', company: '成都理工大学党委宣传部',
    description: '负责学校官方微博、微信公众号的内容策划与运营，围绕校园热点、节日节点、传播需求进行选题策划、文案撰写、排版发布及视频/图片内容制作；跟踪平台数据表现，结合阅读量、互动量进行内容复盘，持续优化选题方向与发布策略；对接校内各学院及相关新媒体矩阵，统筹热点事件联动传播，提升内容扩散效率与账号影响力。',
    achievements: [
      '参与策划及推文150+篇；多篇推文阅读量达到50000+。',
      '推动账号与人民日报、新华网、成都校园及其他高校大V联动，助推学校相关话题冲上同城热搜10+次，冲上微博全平台实时热搜榜2次，其中最高达到热搜第3，单条微博阅读量破2亿。',
      '整合重塑学校新媒体联盟，完善投稿机制，统筹学校各级新媒体资源，实现了相关热点、事件、资源的最大化利用。',
    ],
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full py-24 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-[900px] mx-auto">
        <SectionWrapper className="text-center mb-12 md:mb-16">
          <span className="text-xs font-body-en tracking-[0.15em] text-lantern-orange uppercase">Experience</span>
          <h2 className="font-display-cn text-3xl md:text-4xl text-pure-white font-bold mt-3">工作经历</h2>
        </SectionWrapper>
        <div>
          {experiences.map((exp, index) => (
            <SectionWrapper key={index} delay={index * 0.12}>
              <TimelineItem time={exp.time} role={exp.role} company={exp.company} description={exp.description} achievements={exp.achievements} />
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
