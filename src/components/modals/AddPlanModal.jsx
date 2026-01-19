import React, { useState } from 'react'

const AddPlanModal = ({ onClose }) => {
  const [courseId, setCourseId] = useState('')
  const [planRows, setPlanRows] = useState([
    {
      stage: '',
      month: '',
      goal: '',
      course: '',
      practice: '',
      materials: '',
      suggestion: '',
      importantStage: '',
    },
  ])

  const addPlanRow = () => {
    setPlanRows([
      ...planRows,
      {
        stage: '',
        month: '',
        goal: '',
        course: '',
        practice: '',
        materials: '',
        suggestion: '',
        importantStage: '',
      },
    ])
  }

  const removePlanRow = (index) => {
    if (planRows.length > 1) {
      setPlanRows(planRows.filter((_, i) => i !== index))
    }
  }

  const updatePlanRow = (index, field, value) => {
    const newRows = [...planRows]
    newRows[index][field] = value
    setPlanRows(newRows)
  }

  const handleSubmit = () => {
    console.log('课程ID:', courseId)
    console.log('规划数据:', planRows)
    alert(`复习规划保存功能已触发\n课程ID: ${courseId}\n规划条目数: ${planRows.length}`)
    handleClose()
  }

  const handleClose = () => {
    setCourseId('')
    setPlanRows([
      {
        stage: '',
        month: '',
        goal: '',
        course: '',
        practice: '',
        materials: '',
        suggestion: '',
        importantStage: '',
      },
    ])
    onClose()
  }

  return (
    <>
      <div className="drawer-overlay show" onClick={handleClose}></div>
      <div className="fixed inset-0 z-[10003] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-black text-slate-800">新增复习规划</h2>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600 text-xl"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">课程ID</label>
              <input
                type="text"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                placeholder="请输入课程ID"
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-bold text-slate-700">规划详情</label>
                <button
                  onClick={addPlanRow}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                >
                  <i className="fas fa-plus mr-1"></i>添加行
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-3 py-2 border border-slate-200 font-bold text-slate-700">学习阶段</th>
                      <th className="px-3 py-2 border border-slate-200 font-bold text-slate-700">月份</th>
                      <th className="px-3 py-2 border border-slate-200 font-bold text-slate-700">学习目标</th>
                      <th className="px-3 py-2 border border-slate-200 font-bold text-slate-700">课程</th>
                      <th className="px-3 py-2 border border-slate-200 font-bold text-slate-700">练习</th>
                      <th className="px-3 py-2 border border-slate-200 font-bold text-slate-700">使用资料/讲义</th>
                      <th className="px-3 py-2 border border-slate-200 font-bold text-slate-700">学习建议</th>
                      <th className="px-3 py-2 border border-slate-200 font-bold text-slate-700">考研重要阶段</th>
                      <th className="px-3 py-2 border border-slate-200 font-bold text-slate-700">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planRows.map((row, index) => (
                      <tr key={index} className="plan-form-row">
                        <td className="border border-slate-200 p-2">
                          <input
                            type="text"
                            value={row.stage}
                            onChange={(e) => updatePlanRow(index, 'stage', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                            placeholder="学习阶段"
                          />
                        </td>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="text"
                            value={row.month}
                            onChange={(e) => updatePlanRow(index, 'month', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                            placeholder="月份"
                          />
                        </td>
                        <td className="border border-slate-200 p-2">
                          <textarea
                            value={row.goal}
                            onChange={(e) => updatePlanRow(index, 'goal', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                            rows="3"
                            placeholder="学习目标"
                          ></textarea>
                        </td>
                        <td className="border border-slate-200 p-2">
                          <textarea
                            value={row.course}
                            onChange={(e) => updatePlanRow(index, 'course', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                            rows="3"
                            placeholder="课程"
                          ></textarea>
                        </td>
                        <td className="border border-slate-200 p-2">
                          <textarea
                            value={row.practice}
                            onChange={(e) => updatePlanRow(index, 'practice', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                            rows="3"
                            placeholder="练习"
                          ></textarea>
                        </td>
                        <td className="border border-slate-200 p-2">
                          <textarea
                            value={row.materials}
                            onChange={(e) => updatePlanRow(index, 'materials', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                            rows="3"
                            placeholder="使用资料/讲义"
                          ></textarea>
                        </td>
                        <td className="border border-slate-200 p-2">
                          <textarea
                            value={row.suggestion}
                            onChange={(e) => updatePlanRow(index, 'suggestion', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                            rows="3"
                            placeholder="学习建议"
                          ></textarea>
                        </td>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="text"
                            value={row.importantStage}
                            onChange={(e) => updatePlanRow(index, 'importantStage', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                            placeholder="考研重要阶段"
                          />
                        </td>
                        <td className="border border-slate-200 p-2">
                          <button
                            onClick={() => removePlanRow(index)}
                            className="text-red-600 hover:text-red-800 text-xs"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 p-6 border-t">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-300 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPlanModal
