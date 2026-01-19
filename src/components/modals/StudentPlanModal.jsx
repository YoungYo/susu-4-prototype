import React, { useState } from 'react'

const StudentPlanModal = ({ student, onClose }) => {
  const [selectedCourse, setSelectedCourse] = useState(0)
  const [viewMode, setViewMode] = useState('overview') // 'overview' or 'calendar'
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date(2026, 0, 16))

  if (!student) return null

  // 学员所报课程列表（示例数据）
  const courses = [
    {
      courseId: 'C202601001',
      courseName: '2027考研英语全程班',
      subject: '英语',
    },
    {
      courseId: 'C202601002',
      courseName: '2027考研数学全程班',
      subject: '数学',
    },
  ]

  // 学习计划数据（日历视图用）
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

  const currentCourse = courses[selectedCourse]

  return (
    <>
      <div className="drawer-overlay show" onClick={onClose}></div>
      <div className="fixed inset-0 bg-white z-[10002] overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-black text-slate-800">学习计划</h1>
              <p className="text-sm text-slate-400 mt-1">
                {student.name} · ID: {student.id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-xl"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="mb-6 flex gap-3 border-b">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 text-sm font-bold transition-colors ${
                viewMode === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <i className="fas fa-list mr-2"></i>复习规划
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 text-sm font-bold transition-colors ${
                viewMode === 'calendar'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <i className="fas fa-calendar mr-2"></i>学习日历
            </button>
          </div>

          {/* Content Area */}
          {viewMode === 'overview' && (
            <div className="glass-card rounded-3xl overflow-hidden">
              {/* Course Switcher - only show in overview mode */}
              {courses.length > 1 && (
                <div className="p-4 border-b bg-slate-50/50 flex gap-3">
                  {courses.map((course, index) => (
                    <button
                      key={course.courseId}
                      onClick={() => setSelectedCourse(index)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                        selectedCourse === index
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {course.courseName}
                    </button>
                  ))}
                </div>
              )}
              <div className="p-4 border-b bg-slate-50/50">
                <h2 className="text-lg font-black text-slate-800">
                  {currentCourse.courseName} 复习规划
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[1200px]">
                  <thead className="bg-slate-50/50 border-b">
                    <tr>
                      <th className="px-4 py-3 font-black text-slate-400 uppercase whitespace-nowrap">学习阶段</th>
                      <th className="px-4 py-3 font-black text-slate-400 uppercase whitespace-nowrap">月份</th>
                      <th className="px-4 py-3 font-black text-slate-400 uppercase whitespace-nowrap">学习目标</th>
                      <th className="px-4 py-3 font-black text-slate-400 uppercase whitespace-nowrap">课程</th>
                      <th className="px-4 py-3 font-black text-slate-400 uppercase whitespace-nowrap">练习</th>
                      <th className="px-4 py-3 font-black text-slate-400 uppercase whitespace-nowrap">使用资料/讲义</th>
                      <th className="px-4 py-3 font-black text-slate-400 uppercase whitespace-nowrap">学习建议</th>
                      <th className="px-4 py-3 font-black text-slate-400 uppercase whitespace-nowrap">考研重要阶段</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-4 align-top font-bold text-slate-800" rowSpan="2">
                        早鸟阶段：系统强基
                      </td>
                      <td className="px-4 py-4 align-top text-slate-600">2026.1月</td>
                      <td className="px-4 py-4 align-top text-slate-600 text-[11px] leading-relaxed">
                        <ol className="list-decimal list-inside space-y-1">
                          <li>
                            全题型备考指南，弄清考研英语的考查内容&试卷结构，把握考情，了解各题型的考查方式、备考方式，明确备考方向；
                          </li>
                          <li>
                            学习1800考研高频词，掌握考研英语1800+高频核心词汇以及其拓展词汇，掌握重点用法和搭配；
                          </li>
                          <li>
                            系统学习语法长难句，掌握长难句拆分核心方法"三找一定"，以及长难句3大高分考点、3大高频考点；
                          </li>
                          <li>
                            经典长难句50句寒假通关特训，从简单到复杂逐级过渡，强化语法知识的应用，查漏补缺,锻炼分析句子的能力；
                          </li>
                          <li>
                            真题入门，精读阅读真题篇章，深入剖析文章的篇章结构、逻辑脉络以及语言表达特色，精准把握文章主旨大意，初步了解各类题型的选材规律，提升词汇运用、长难句分析以及语篇理解等综合能力；
                          </li>
                          <li>
                            补充西方背景文化知识，掌握三权分立、脱欧、人工智能等必备背景知识，能够将背景知识与阅读文章紧密结合，更准确地把握文章主旨。
                          </li>
                          <li>
                            精读外刊14篇，深入了解西方学术文章行文特色、考研文章特点，拓展词汇量、积累语法点、了解时下热点话题信息。
                          </li>
                        </ol>
                      </td>
                      <td className="px-4 py-4 align-top text-slate-600 text-[11px] leading-relaxed">
                        <ol className="list-decimal list-inside space-y-1">
                          <li>全题型备考型导学课 （3节）</li>
                          <li>词汇课程：1800考研高频词课程（38节）</li>
                          <li>语法课程：语法长难句逐句精讲（11节）</li>
                          <li>语法带练：考研经典长难句50句（10节）</li>
                          <li>真题篇章入门，阅读真题篇章精读</li>
                          <li>阅读素养：西方背景文化课（10节）—选修</li>
                          <li>精选题源外刊课（14节）—选修</li>
                        </ol>
                      </td>
                      <td className="px-4 py-4 align-top text-slate-600 text-[11px] leading-relaxed">
                        <ol className="list-decimal list-inside space-y-1">
                          <li>
                            课后完成词汇自测<br />
                            考研英语1800高频词汇自测本（电子版）<br />
                            1800考研高频词习题集（2课1测）
                          </li>
                          <li>课前预习语法长难句的句子，课后完成主讲布置的课后练习</li>
                          <li>经典长难句打卡，每日打卡，分析句子</li>
                          <li>真题/外刊文章重难点单词背诵、句子分析</li>
                          <li>
                            完成模块测<br />
                            【模块测】语法长难句：测评<br />
                            【模块测】1800高频词：测评<br />
                            【模块测】真题篇章入门：测评
                          </li>
                        </ol>
                      </td>
                      <td className="px-4 py-4 align-top text-slate-600 text-[11px] leading-relaxed">
                        <ul className="list-disc list-inside space-y-1">
                          <li>1800考研高频词讲义（纸质版）</li>
                          <li>1800考研高频词习题集（纸质版）</li>
                          <li>考研英语语法及长难句讲义（纸质版）</li>
                          <li>50句经典长难句讲义（电子版）</li>
                          <li>经典篇章精读讲义（电子版）</li>
                          <li>考研英语精选题源外刊（纸质版）</li>
                        </ul>
                      </td>
                      <td className="px-4 py-4 align-top text-slate-600 text-[11px] leading-relaxed">
                        寒假复习黄金期，要把握好复习节奏，充分利用这段时间夯实基础，为3月份开始的方法论学习打牢根基：
                        <br />
                        <br />
                        1、词汇学习要有重点，重点学习高频词汇，除了背释义外，还要记用法搭配。
                        <br />
                        <br />
                        2、语法学习要多练习，多分析，除了听老师讲解，自己课前课后也要动笔划分句子结构、翻译句子。
                        <br />
                        <br />
                        3、阅读学习要多动笔，多积累，除了读懂文章大意外，要学会分析句子、掌握地道表达。
                      </td>
                      <td className="px-4 py-4 align-top text-slate-600 text-[11px]">26考研结束</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 align-top text-slate-600">2月</td>
                      <td className="px-4 py-4 align-top text-slate-400 italic" colSpan="6">
                        -
                      </td>
                      <td className="px-4 py-4 align-top text-slate-600 text-[11px]">26考研初试成绩公布</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {viewMode === 'calendar' && (
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="p-3 border-b bg-slate-50/50">
                <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                  <i className="fas fa-calendar"></i>
                  学习日历
                </h2>
              </div>
              <div className="p-3 calendar-container-compact">
                <div className="calendar-header mb-3 flex items-center justify-between">
                  <button
                    className="calendar-nav-btn text-xs"
                    onClick={() => changeMonth(-1)}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <h3 className="text-xs font-bold text-slate-800">
                    {currentCalendarDate.getFullYear()}年{currentCalendarDate.getMonth() + 1}月
                  </h3>
                  <button
                    className="calendar-nav-btn text-xs"
                    onClick={() => changeMonth(1)}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
                <div className="calendar-grid-compact">
                  {renderCalendar()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default StudentPlanModal
