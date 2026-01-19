import React, { useState, useRef } from 'react'
import AddPlanModal from '../modals/AddPlanModal'
import PlanDetailModal from '../modals/PlanDetailModal'

const PlanPage = () => {
  const [filterCollapsed, setFilterCollapsed] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedPlanId, setSelectedPlanId] = useState(null)
  
  // 表单字段的 ref
  const courseIdRef = useRef(null)
  const courseNameRef = useRef(null)
  const subjectRef = useRef(null)

  const plans = [
    {
      courseId: 'C202601001',
      courseName: '2027考研英语全程班',
      subject: '英语',
      planName: '2027考研英语全程复习规划',
    },
    {
      courseId: 'C202601002',
      courseName: '2027考研数学全程班',
      subject: '数学',
      planName: '2027考研数学全程复习规划',
    },
    {
      courseId: 'C202601003',
      courseName: '2027考研政治全程班',
      subject: '政治',
      planName: '2027考研政治全程复习规划',
    },
  ]

  const getSubjectColor = (subject) => {
    const colors = {
      '英语': 'bg-yellow-100 text-yellow-600',
      '数学': 'bg-blue-100 text-blue-600',
      '政治': 'bg-red-100 text-red-600',
      '管综': 'bg-purple-100 text-purple-600',
      '计算机408': 'bg-green-100 text-green-600',
      '法硕': 'bg-indigo-100 text-indigo-600',
    }
    return colors[subject] || 'bg-slate-100 text-slate-600'
  }

  const handleReset = () => {
    if (courseIdRef.current) courseIdRef.current.value = ''
    if (courseNameRef.current) courseNameRef.current.value = ''
    if (subjectRef.current) subjectRef.current.value = ''
  }

  const handleShowDetail = (courseId) => {
    setSelectedPlanId(courseId)
    setShowDetailModal(true)
  }

  return (
    <div className="animate-up">
      {/* 筛选表单 */}
      <div className={`filter-form ${filterCollapsed ? 'filter-collapsed' : ''}`}>
        <div className="filter-header" onClick={() => setFilterCollapsed(!filterCollapsed)}>
          <h3><i className="fas fa-filter"></i> 筛选条件</h3>
          <i className={`fas fa-chevron-${filterCollapsed ? 'down' : 'up'} text-slate-400`}></i>
        </div>
        <div className="filter-content">
          <div className="filter-field">
            <label>课程ID</label>
            <input ref={courseIdRef} type="text" placeholder="请输入课程ID" />
          </div>
          <div className="filter-field">
            <label>课程名称</label>
            <input ref={courseNameRef} type="text" placeholder="请输入课程名称" />
          </div>
          <div className="filter-field">
            <label>科目</label>
            <select ref={subjectRef}>
              <option value="">全部</option>
              <option value="english">英语</option>
              <option value="math">数学</option>
              <option value="politics">政治</option>
              <option value="management">管综</option>
              <option value="computer408">计算机408</option>
              <option value="law">法硕</option>
            </select>
          </div>
        </div>
        <div className="filter-actions">
          <button className="filter-btn filter-btn-secondary" onClick={handleReset}>
            <i className="fas fa-redo"></i> 重置
          </button>
          <button className="filter-btn filter-btn-primary">
            <i className="fas fa-search"></i> 筛选
          </button>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-between items-center mb-6 mt-6">
        <div className="flex gap-3">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
            onClick={() => setShowAddModal(true)}
          >
            <i className="fas fa-plus mr-2"></i>新增
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors">
            <i className="fas fa-trash mr-2"></i>批量删除
          </button>
        </div>
      </div>

      {/* 复习规划列表 */}
      <div className="glass-card rounded-[32px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/50 border-b">
              <tr>
                <th className="px-6 py-4 font-black text-slate-400 uppercase whitespace-nowrap">课程ID</th>
                <th className="px-6 py-4 font-black text-slate-400 uppercase whitespace-nowrap">课程名称</th>
                <th className="px-6 py-4 font-black text-slate-400 uppercase whitespace-nowrap">科目</th>
                <th className="px-6 py-4 font-black text-slate-400 uppercase whitespace-nowrap">复习规划名称</th>
                <th className="px-6 py-4 text-right font-black text-slate-400 uppercase whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {plans.map((plan) => (
                <tr key={plan.courseId}>
                  <td className="px-6 py-4 text-slate-600 font-mono text-xs">{plan.courseId}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{plan.courseName}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2 py-1 rounded font-bold ${getSubjectColor(plan.subject)}`}>
                      {plan.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{plan.planName}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      className="text-blue-600 font-bold hover:underline text-xs"
                      onClick={() => handleShowDetail(plan.courseId)}
                    >
                      查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 新增复习规划弹窗 */}
      {showAddModal && (
        <AddPlanModal onClose={() => setShowAddModal(false)} />
      )}

      {/* 复习规划详情弹窗 */}
      {showDetailModal && (
        <PlanDetailModal 
          courseId={selectedPlanId}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedPlanId(null)
          }} 
        />
      )}
    </div>
  )
}

export default PlanPage
