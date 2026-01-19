import React, { useState, useEffect, useRef } from 'react'

const StudentDrawer = ({ student, onClose }) => {
  const [activeTab, setActiveTab] = useState('todo')
  const [planView, setPlanView] = useState('overview') // 'overview' or 'calendar'
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date(2026, 0, 16))
  const drawerRef = useRef(null)
  const resizerRef = useRef(null)

  if (!student) return null

  // 学习计划数据
  const studyPlans = {
    '2026-01-15': [
      { subject: 'math', title: '高数基础第一章', time: '09:00-11:00' },
      { subject: 'english', title: '英语单词背诵', time: '14:00-15:00' }
    ],
    '2026-01-16': [
      { subject: 'math', title: '高数基础第二章', time: '09:00-11:00' },
      { subject: 'politics', title: '政治马原学习', time: '15:00-17:00' }
    ],
    '2026-01-17': [
      { subject: 'english', title: '英语长难句', time: '10:00-11:30' },
      { subject: 'professional', title: '专业课408复习', time: '14:00-17:00' }
    ],
    '2026-01-18': [
      { subject: 'math', title: '高数练习题', time: '09:00-11:00' },
      { subject: 'english', title: '英语阅读训练', time: '14:00-16:00' }
    ],
    '2026-01-20': [
      { subject: 'math', title: '高数基础第三章', time: '09:00-11:00' },
      { subject: 'politics', title: '政治毛概学习', time: '15:00-17:00' }
    ],
    '2026-01-22': [
      { subject: 'professional', title: '专业课数据结构', time: '09:00-12:00' },
      { subject: 'english', title: '英语作文练习', time: '14:00-16:00' }
    ]
  }

  // 学习计划总览数据（按月份）
  const monthlyPlans = [
    {
      month: '2026年1月',
      color: 'blue',
      items: [
        '全题型备考指南，弄清考研英语的考查内容&试卷结构，把握考情，了解各题型的考查方式、备考方式，明确备考方向；',
        '学习1800考研高频词，掌握考研英语1800+高频核心词汇以及其拓展词汇，掌握重点用法和搭配；',
        '系统学习语法长难句，掌握长难句拆分核心方法"三找一定"，以及长难句3大高分考点、3大高频考点；',
        '经典长难句50句寒假通关特训，从简单到复杂逐级过渡，强化语法知识的应用，查漏补缺,锻炼分析句子的能力；',
        '真题入门，精读阅读真题篇章，深入剖析文章的篇章结构、逻辑脉络以及语言表达特色，精准把握文章主旨大意，初步了解各类题型的选材规律，提升词汇运用、长难句分析以及语篇理解等综合能力；',
        '补充西方背景文化知识，掌握三权分立、脱欧、人工智能等必备背景知识，能够将背景知识与阅读文章紧密结合，更准确地把握文章主旨。',
        '精读外刊14篇，深入了解西方学术文章行文特色、考研文章特点，拓展词汇量、积累语法点、了解时下热点话题信息。'
      ]
    },
    { month: '2026年2月', color: null, items: [] },
    {
      month: '2026年3月',
      color: 'purple',
      items: [
        '学习五大题型解题方法，掌握各题型的特点、核心解题技巧，如完形四步法、阅读文章"化繁为简"技巧、翻译"拆分与组合"方法、新题型点线面大法、写作万能句型等等；',
        '2007-2012年精选试题，主讲逐篇带练，学练结合，巩固解题方法的应用，建立解题思路，培养做题习惯。'
      ]
    },
    { month: '2026年4月', color: null, items: [] },
    { month: '2026年5月', color: null, items: [] },
    {
      month: '2026年6月',
      color: 'green',
      items: [
        '翻译专题练习，通过对历年真题中的高频主题的10篇文章进行翻译，训练文章翻译「拆分-重组-润色」技巧，突破翻译难题，翻译文章不再简单"单词堆砌"。',
        '通过基础阶段测评，查漏补缺，明确下个阶段的复习主攻方向。'
      ]
    },
    {
      month: '2026年7月',
      color: 'orange',
      items: [
        '刷2013-2018年真题，通过课前练习-直播听课-课后复盘，训练做题方法和做题能力，总结答题规律，在保证做题正确率基础上，逐渐提高做题效率；',
        '阅读题型专题练习，分题型突破6大阅读题型，提升阅读解题能力和准确率。'
      ]
    },
    { month: '2026年8月', color: null, items: [] },
    {
      month: '2026年9月',
      color: 'indigo',
      items: [
        '刷2019-2024年真题，通过课前练习-直播听课-课后复盘，总结出自己的做题节奏，保证做题正确率，提升做题速度，10月开启套卷速度练习，控制时间做题；',
        '写作题型专题练习，提升句式灵活度和复杂句应用准确率，提高模板套用精准度，40分钟完成高质量作文。'
      ]
    },
    { month: '2026年10月', color: null, items: [] },
    {
      month: '2026年11月',
      color: 'teal',
      items: [
        '考前核心知识串讲课，快速梳理并巩固完形、新题型、阅读、翻译、写作以及词汇等各个板块的关键得分技巧；',
        '学习阅读&写作热点话题，熟悉当年考试热点，把握命题趋势，积累写作素材；',
        '2025年试题套卷练习，检验全年学习效果。'
      ]
    },
    {
      month: '2026年12月',
      color: 'red',
      items: [
        '两轮模考，模拟考场实战，适应考试节奏和考场氛围，稳住考前心态；',
        '考前点睛课，熟悉阅读热点话题、写作预测作文模板&思路梳理，考前临门一脚、奋力突击。'
      ]
    }
  ]

  // 合并空月份到前一个有内容的月份
  const mergedPlans = []
  let currentGroup = null

  monthlyPlans.forEach((plan, index) => {
    if (plan.items.length > 0) {
      // 如果有内容，结束当前组（如果有），开始新组
      if (currentGroup) {
        mergedPlans.push(currentGroup)
      }
      currentGroup = {
        months: [plan.month],
        color: plan.color,
        items: plan.items
      }
    } else {
      // 如果没内容，合并到当前组
      if (currentGroup) {
        currentGroup.months.push(plan.month)
      }
    }
  })

  // 添加最后一个组
  if (currentGroup) {
    mergedPlans.push(currentGroup)
  }

  // 获取月份范围的显示文本
  const getMonthRangeText = (months) => {
    if (months.length === 1) {
      return months[0]
    }
    // 提取年份和月份数字
    const firstMonth = months[0].match(/(\d{4})年(\d+)月/)
    const lastMonth = months[months.length - 1].match(/(\d{4})年(\d+)月/)
    if (firstMonth && lastMonth) {
      return `${firstMonth[1]}年${firstMonth[2]}月~${lastMonth[2]}月`
    }
    return months.join('~')
  }

  // 获取颜色样式类
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-400',
        title: 'text-blue-800',
        text: 'text-blue-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-400',
        title: 'text-purple-800',
        text: 'text-purple-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-400',
        title: 'text-green-800',
        text: 'text-green-700'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-400',
        title: 'text-orange-800',
        text: 'text-orange-700'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-400',
        title: 'text-indigo-800',
        text: 'text-indigo-700'
      },
      teal: {
        bg: 'bg-teal-50',
        border: 'border-teal-400',
        title: 'text-teal-800',
        text: 'text-teal-700'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-400',
        title: 'text-red-800',
        text: 'text-red-700'
      },
    }
    return colorMap[color] || {
      bg: 'bg-slate-50',
      border: 'border-slate-300',
      title: 'text-slate-600',
      text: 'text-slate-500'
    }
  }

  // 初始化拖拽功能
  useEffect(() => {
    if (!drawerRef.current || !resizerRef.current) return

    const drawer = drawerRef.current
    const resizer = resizerRef.current
    let isResizing = false
    let startX = 0
    let startWidth = 0

    const handleMouseDown = (e) => {
      isResizing = true
      startX = e.clientX
      startWidth = drawer.offsetWidth
      drawer.classList.add('resizing')
      resizer.classList.add('dragging')
      document.body.style.cursor = 'ew-resize'
      e.preventDefault()
    }

    const handleMouseMove = (e) => {
      if (!isResizing) return
      const diff = startX - e.clientX
      const newWidth = startWidth + diff
      const minWidth = 400
      const maxWidth = window.innerWidth * 0.9

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        drawer.style.width = newWidth + 'px'
      }
    }

    const handleMouseUp = () => {
      if (isResizing) {
        isResizing = false
        drawer.classList.remove('resizing')
        resizer.classList.remove('dragging')
        document.body.style.cursor = ''
      }
    }

    resizer.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      resizer.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // 日历相关函数
  const changeMonth = (delta) => {
    setCurrentCalendarDate(new Date(
      currentCalendarDate.getFullYear(),
      currentCalendarDate.getMonth() + delta,
      currentCalendarDate.getDate()
    ))
  }

  const formatDate = (year, month, day) => {
    const m = month + 1
    return `${year}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const renderCalendar = () => {
    const year = currentCalendarDate.getFullYear()
    const month = currentCalendarDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const firstDayOfWeek = firstDay.getDay()
    const daysInMonth = lastDay.getDate()
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    const today = new Date()

    const weekDays = ['日', '一', '二', '三', '四', '五', '六']
    const days = []

    // 星期标题
    weekDays.forEach(day => {
      days.push(
        <div key={`header-${day}`} className="calendar-day-header">
          {day}
        </div>
      )
    })

    // 上个月的日期
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i
      const dateStr = formatDate(year, month - 1, day)
      const plans = studyPlans[dateStr] || []
      days.push(
        <div key={`prev-${day}`} className="calendar-day other-month">
          <div className="calendar-day-number">{day}</div>
          {plans.map((plan, idx) => (
            <div key={idx} className={`calendar-plan-item ${plan.subject}`}>
              {plan.title}
            </div>
          ))}
        </div>
      )
    }

    // 当月的日期
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(year, month, day)
      const isToday = year === today.getFullYear() &&
                     month === today.getMonth() &&
                     day === today.getDate()
      const plans = studyPlans[dateStr] || []
      days.push(
        <div key={`current-${day}`} className={`calendar-day ${isToday ? 'today' : ''}`}>
          <div className="calendar-day-number">{day}</div>
          {plans.map((plan, idx) => (
            <div key={idx} className={`calendar-plan-item ${plan.subject}`} title={`${plan.title} (${plan.time})`}>
              {plan.title}
            </div>
          ))}
        </div>
      )
    }

    // 下个月的日期（填满42个格子）
    const totalCells = days.length - 7
    const remainingCells = 42 - totalCells
    for (let day = 1; day <= remainingCells; day++) {
      const dateStr = formatDate(year, month + 1, day)
      const plans = studyPlans[dateStr] || []
      days.push(
        <div key={`next-${day}`} className="calendar-day other-month">
          <div className="calendar-day-number">{day}</div>
          {plans.map((plan, idx) => (
            <div key={idx} className={`calendar-plan-item ${plan.subject}`}>
              {plan.title}
            </div>
          ))}
        </div>
      )
    }

    return days
  }

  return (
    <>
      <div className="drawer-overlay show" onClick={onClose}></div>
      <div ref={drawerRef} className="drawer show">
        <div ref={resizerRef} className="drawer-resizer"></div>
        <div className="drawer-header">
          <span className="text-xs font-bold text-slate-500">
            学员详情 · {student.name}
          </span>
          <i
            className="fas fa-times text-slate-300 cursor-pointer hover:text-slate-500"
            onClick={onClose}
          ></i>
        </div>
        <div className="drawer-body">
          <div className="p-5 flex items-center gap-4 border-b">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{student.name}</span>
                <span className="text-[9px] bg-red-100 text-red-600 px-1 rounded font-black">
                  退费风险
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                ID: {student.id} | {student.target}
              </p>
            </div>
          </div>
          <div className="flex border-b text-xs sticky top-0 bg-white z-10">
            <div
              className={`flex-1 py-3 text-center cursor-pointer ${
                activeTab === 'todo'
                  ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
                  : 'text-slate-400'
              }`}
              onClick={() => setActiveTab('todo')}
            >
              TODO
            </div>
            <div
              className={`flex-1 py-3 text-center cursor-pointer ${
                activeTab === 'plan'
                  ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
                  : 'text-slate-400'
              }`}
              onClick={() => setActiveTab('plan')}
            >
              学习计划
            </div>
            <div
              className={`flex-1 py-3 text-center cursor-pointer ${
                activeTab === 'checkin'
                  ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
                  : 'text-slate-400'
              }`}
              onClick={() => setActiveTab('checkin')}
            >
              打卡记录
            </div>
            <div
              className={`flex-1 py-3 text-center cursor-pointer ${
                activeTab === 'notes'
                  ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
                  : 'text-slate-400'
              }`}
              onClick={() => setActiveTab('notes')}
            >
              备注
            </div>
          </div>
          <div className="p-4">
            {activeTab === 'todo' && (
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 rounded-xl border-l-4 border-orange-400">
                  <p className="text-xs font-bold text-orange-800">修改高数基础学习计划</p>
                  <p className="text-[9px] text-orange-400 mt-1">截止：今日 18:00</p>
                </div>
              </div>
            )}
            {activeTab === 'plan' && (
              <div>
                {/* 视图切换按钮 */}
                <div className="flex gap-2 mb-4 border-b">
                  <button
                    className={`px-4 py-2 text-xs font-bold ${
                      planView === 'overview'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-400'
                    }`}
                    onClick={() => setPlanView('overview')}
                  >
                    <i className="fas fa-list"></i> 总览
                  </button>
                  <button
                    className={`px-4 py-2 text-xs font-bold ${
                      planView === 'calendar'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-400'
                    }`}
                    onClick={() => setPlanView('calendar')}
                  >
                    <i className="fas fa-calendar"></i> 日历
                  </button>
                </div>

                {/* 总览视图 */}
                {planView === 'overview' && (
                  <div className="plan-view-content space-y-4">
                    {mergedPlans.map((group, index) => {
                      const colorClasses = getColorClasses(group.color)
                      
                      return (
                        <div
                          key={index}
                          className={`p-4 ${colorClasses.bg} rounded-xl border-l-4 ${colorClasses.border}`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className={`text-sm font-black ${colorClasses.title}`}>
                              {getMonthRangeText(group.months)}
                            </h4>
                          </div>
                          <ul className={`text-xs ${colorClasses.text} space-y-2 list-disc list-inside`}>
                            {group.items.map((item, itemIndex) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* 日历视图 */}
                {planView === 'calendar' && (
                  <div className="plan-view-content calendar-container">
                    <div className="calendar-header mb-4 flex items-center justify-between">
                      <button
                        className="calendar-nav-btn"
                        onClick={() => changeMonth(-1)}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <h3 className="text-sm font-bold text-slate-800">
                        {currentCalendarDate.getFullYear()}年{currentCalendarDate.getMonth() + 1}月
                      </h3>
                      <button
                        className="calendar-nav-btn"
                        onClick={() => changeMonth(1)}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                    <div className="calendar-grid">
                      {renderCalendar()}
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'checkin' && (
              <div className="text-center py-8 text-slate-400 text-sm">
                <i className="fas fa-calendar-check text-3xl mb-3"></i>
                <p>打卡记录功能开发中</p>
              </div>
            )}
            {activeTab === 'notes' && (
              <div>
                <p className="text-slate-400 text-sm">备注内容</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentDrawer
