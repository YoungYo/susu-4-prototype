import React, { useState } from 'react'

const TaskPage = () => {
  const [filterCollapsed, setFilterCollapsed] = useState(false)

  const tasks = [
    {
      id: 'T20260114001',
      type: '新生加微',
      desc: '联系学员添加微信好友，建立沟通渠道',
      studentName: '李萌萌',
      studentId: '98721',
      studentType: '新生',
      teacher: '张三老师',
      status: '已逾期',
      countdown: '逾期2天',
      deadline: '2026-01-14 18:00',
      completeTime: '-',
      duration: '-',
    },
    {
      id: 'T20260115002',
      type: '首call',
      desc: '完成首次电话沟通，了解学员基本情况',
      studentName: '王小明',
      studentId: '98722',
      studentType: '新生',
      teacher: '张三老师',
      status: '临期待处理',
      countdown: '剩余2小时',
      deadline: '2026-01-16 20:00',
      completeTime: '-',
      duration: '-',
    },
    {
      id: 'T20260116003',
      type: '通时通次',
      desc: '完成本周通话时长和次数要求',
      studentName: '赵小华',
      studentId: '98723',
      studentType: '老生',
      teacher: '李四老师',
      status: '待处理',
      countdown: '剩余3天',
      deadline: '2026-01-19 18:00',
      completeTime: '-',
      duration: '-',
    },
    {
      id: 'T20260115004',
      type: '新生加微',
      desc: '联系学员添加微信好友，建立沟通渠道',
      studentName: '孙小美',
      studentId: '98724',
      studentType: '新生',
      teacher: '张三老师',
      status: '已完成',
      countdown: '-',
      deadline: '2026-01-15 18:00',
      completeTime: '2026-01-15 16:30',
      duration: '1小时30分钟',
    },
    {
      id: 'T20260117005',
      type: '作文批改',
      desc: '批改学员提交的英语作文，提供详细反馈',
      studentName: '周小强',
      studentId: '98725',
      studentType: '老生',
      teacher: '李四老师',
      status: '待处理',
      countdown: '剩余5天',
      deadline: '2026-01-22 18:00',
      completeTime: '-',
      duration: '-',
    },
  ]

  const getStatusColor = (status) => {
    const colors = {
      '已逾期': 'bg-red-100 text-red-600',
      '临期待处理': 'bg-orange-100 text-orange-600',
      '待处理': 'bg-yellow-100 text-yellow-600',
      '已完成': 'bg-green-100 text-green-600',
    }
    return colors[status] || 'bg-slate-100 text-slate-600'
  }

  const getTypeColor = (type) => {
    const colors = {
      '新生加微': 'bg-blue-100 text-blue-600',
      '首call': 'bg-purple-100 text-purple-600',
      '通时通次': 'bg-green-100 text-green-600',
      '作文批改': 'bg-orange-100 text-orange-600',
    }
    return colors[type] || 'bg-slate-100 text-slate-600'
  }

  return (
    <div className="animate-up">
      {/* 统计数据模块 */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* 按任务类型统计 */}
        <div className="glass-card p-6 rounded-3xl">
          <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
            <i className="fas fa-tasks text-blue-600"></i> 按任务类型统计
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <p className="text-[9px] text-blue-400 font-bold uppercase mb-2">新生加微任务</p>
              <p className="text-2xl font-black text-blue-700">18</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
              <p className="text-[9px] text-purple-400 font-bold uppercase mb-2">首call任务</p>
              <p className="text-2xl font-black text-purple-700">32</p>
            </div>
            <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
              <p className="text-[9px] text-green-400 font-bold uppercase mb-2">通时通次任务</p>
              <p className="text-2xl font-black text-green-700">45</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
              <p className="text-[9px] text-orange-400 font-bold uppercase mb-2">作文批改任务</p>
              <p className="text-2xl font-black text-orange-700">28</p>
            </div>
          </div>
        </div>
        {/* 按任务状态统计 */}
        <div className="glass-card p-6 rounded-3xl">
          <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
            <i className="fas fa-chart-line text-orange-600"></i> 按任务状态统计
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
              <p className="text-[9px] text-red-400 font-bold uppercase mb-2">已逾期</p>
              <p className="text-2xl font-black text-red-700">8</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
              <p className="text-[9px] text-orange-400 font-bold uppercase mb-2">临期待处理</p>
              <p className="text-2xl font-black text-orange-700">16</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
              <p className="text-[9px] text-yellow-400 font-bold uppercase mb-2">所有待处理</p>
              <p className="text-2xl font-black text-yellow-700">95</p>
            </div>
            <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
              <p className="text-[9px] text-green-400 font-bold uppercase mb-2">所有已完成</p>
              <p className="text-2xl font-black text-green-700">287</p>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选表单 */}
      <div className={`filter-form ${filterCollapsed ? 'filter-collapsed' : ''}`}>
        <div className="filter-header" onClick={() => setFilterCollapsed(!filterCollapsed)}>
          <h3><i className="fas fa-filter"></i> 筛选条件</h3>
          <i className={`fas fa-chevron-${filterCollapsed ? 'down' : 'up'} text-slate-400`}></i>
        </div>
        <div className="filter-content">
          <div className="filter-field">
            <label>任务ID</label>
            <input type="text" placeholder="请输入任务ID" />
          </div>
          <div className="filter-field">
            <label>学员姓名/ID/手机号</label>
            <input type="text" placeholder="请输入学员信息" />
          </div>
          <div className="filter-field">
            <label>组织架构</label>
            <select className="org-select">
              <option value="">全部</option>
              <option value="org1">北京校区</option>
              <option value="org1-1">&nbsp;&nbsp;├─ 计算机学院</option>
              <option value="org1-2">&nbsp;&nbsp;├─ 数学学院</option>
              <option value="org2">上海校区</option>
              <option value="org2-1">&nbsp;&nbsp;├─ 计算机学院</option>
            </select>
          </div>
          <div className="filter-field">
            <label>二讲老师</label>
            <input type="text" placeholder="请输入二讲老师" />
          </div>
          <div className="filter-field">
            <label>学员类型</label>
            <select>
              <option value="">全部</option>
              <option value="new">新生</option>
              <option value="old">老生</option>
            </select>
          </div>
        </div>
        <div className="filter-actions">
          <button className="filter-btn filter-btn-secondary">
            <i className="fas fa-redo"></i> 重置
          </button>
          <button className="filter-btn filter-btn-primary">
            <i className="fas fa-search"></i> 筛选
          </button>
        </div>
      </div>

      {/* 任务列表 */}
      <div className="glass-card rounded-[32px] overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1800px]">
            <thead className="bg-slate-50/50 border-b">
              <tr>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">任务ID</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">任务类型</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">任务描述</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">学员姓名</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">学员ID</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">学员类型</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">二讲老师</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">任务状态</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">任务倒计时</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">截止时间</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">完成时间</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">处理时长</th>
                <th className="px-4 py-4 text-right font-black text-slate-400 uppercase whitespace-nowrap sticky right-0 bg-slate-50/50">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-4 py-4 text-slate-600 font-mono text-xs">{task.id}</td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] px-2 py-1 rounded font-bold ${getTypeColor(task.type)}`}>
                      {task.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600 max-w-[200px] truncate" title={task.desc}>
                    {task.desc}
                  </td>
                  <td className="px-4 py-4 font-bold">{task.studentName}</td>
                  <td className="px-4 py-4 text-slate-600">{task.studentId}</td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] px-2 py-1 rounded font-bold ${
                      task.studentType === '新生' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {task.studentType}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{task.teacher}</td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] px-2 py-1 rounded font-bold ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className={`px-4 py-4 font-bold ${
                    task.status === '已逾期' ? 'text-red-600' : 
                    task.status === '临期待处理' ? 'text-orange-600' : 
                    'text-slate-600'
                  }`}>
                    {task.countdown}
                  </td>
                  <td className="px-4 py-4 text-slate-600">{task.deadline}</td>
                  <td className="px-4 py-4 text-slate-400">{task.completeTime}</td>
                  <td className="px-4 py-4 text-slate-400">{task.duration}</td>
                  <td className="px-4 py-4 text-right sticky right-0 bg-white">
                    <button className="text-blue-600 font-bold hover:underline text-xs">
                      查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TaskPage
