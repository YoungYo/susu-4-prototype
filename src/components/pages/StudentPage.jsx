import React, { useState } from 'react'
import StudentDrawer from '../drawers/StudentDrawer'
import StudentPlanModal from '../modals/StudentPlanModal'

const StudentPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedStudentForPlan, setSelectedStudentForPlan] = useState(null)
  const [filterCollapsed, setFilterCollapsed] = useState(false)

  const students = [
    {
      id: '98721',
      name: '李萌萌',
      phone: '138****5678',
      classId: 'C202701',
      className: '27届计算机强化班',
      undergrad: '北京理工大学 · 软件工程',
      target: '清华大学 · 计算机',
      completionRate: '15%',
      isAdmitted: false,
      admittedSchool: '-',
      admittedMajor: '-',
      friendStatus: true,
      grade: '27届',
      subjects: '数学、英语',
      expandSubjects: '政治、专业课',
      examSubjects: '数学、英语、政治、408',
      attempt: '第1次',
      notes: '完课率较低，需要重点关注',
    },
  ]

  return (
    <div className="animate-up">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <i className="fas fa-users"></i>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase">带班总量</p>
              <p className="text-lg font-black">482</p>
            </div>
          </div>
          <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-4 border-red-100">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
              <i className="fas fa-user-shield"></i>
            </div>
            <div>
              <p className="text-[9px] text-red-400 font-bold uppercase">退费风险人数</p>
              <p className="text-lg font-black text-red-600">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Form */}
      <div className={`filter-form ${filterCollapsed ? 'filter-collapsed' : ''}`}>
        <div className="filter-header" onClick={() => setFilterCollapsed(!filterCollapsed)}>
          <h3><i className="fas fa-filter"></i> 筛选条件</h3>
          <i className={`fas fa-chevron-${filterCollapsed ? 'down' : 'up'} text-slate-400`}></i>
        </div>
        <div className="filter-content">
          <div className="filter-field">
            <label>学员ID</label>
            <input type="text" placeholder="请输入学员ID" />
          </div>
          <div className="filter-field">
            <label>学员手机号</label>
            <input type="text" placeholder="请输入手机号" />
          </div>
          <div className="filter-field">
            <label>班级ID</label>
            <input type="text" placeholder="请输入班级ID" />
          </div>
          <div className="filter-field">
            <label>班级名称</label>
            <input type="text" placeholder="请输入班级名称" />
          </div>
          <div className="filter-field">
            <label>本科院校</label>
            <input type="text" placeholder="请输入本科院校" />
          </div>
          <div className="filter-field">
            <label>本科专业</label>
            <input type="text" placeholder="请输入本科专业" />
          </div>
          <div className="filter-field">
            <label>目标院校</label>
            <input type="text" placeholder="请输入目标院校" />
          </div>
          <div className="filter-field">
            <label>目标专业</label>
            <input type="text" placeholder="请输入目标专业" />
          </div>
          <div className="filter-field">
            <label>完课率</label>
            <select>
              <option value="">全部</option>
              <option value="0-20">0-20%</option>
              <option value="21-40">21-40%</option>
              <option value="41-60">41-60%</option>
              <option value="61-80">61-80%</option>
              <option value="81-100">81-100%</option>
            </select>
          </div>
          <div className="filter-field">
            <label>是否上岸</label>
            <select>
              <option value="">全部</option>
              <option value="yes">是</option>
              <option value="no">否</option>
            </select>
          </div>
          <div className="filter-field">
            <label>上岸院校</label>
            <input type="text" placeholder="请输入上岸院校" />
          </div>
          <div className="filter-field">
            <label>上岸专业</label>
            <input type="text" placeholder="请输入上岸专业" />
          </div>
          <div className="filter-field">
            <label>好友关系</label>
            <select>
              <option value="">全部</option>
              <option value="yes">是</option>
              <option value="no">否</option>
            </select>
          </div>
          <div className="filter-field">
            <label>年级</label>
            <select>
              <option value="">全部</option>
              <option value="27">27届</option>
              <option value="28">28届</option>
              <option value="29">29届</option>
              <option value="30">30届</option>
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

      {/* Student Table */}
      <div className="glass-card rounded-[32px] overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[2000px]">
            <thead className="bg-slate-50/50 border-b">
              <tr>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">学员姓名</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">学员ID</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">学员手机号</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">班级ID</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">班级名称</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">本科院校/专业</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">目标院校/专业</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">完课率</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">是否上岸</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">上岸院校</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">上岸专业</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">好友关系</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">年级</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">已报科目</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">可扩科目</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">考试科目</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">第几次考研</th>
                <th className="px-4 py-4 font-black text-slate-400 uppercase whitespace-nowrap">备注</th>
                <th className="px-4 py-4 text-right font-black text-slate-400 uppercase whitespace-nowrap sticky right-0 bg-slate-50/50">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold">{student.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{student.id}</td>
                  <td className="px-4 py-4 text-slate-600">{student.phone}</td>
                  <td className="px-4 py-4 text-slate-600">{student.classId}</td>
                  <td className="px-4 py-4 text-slate-600">{student.className}</td>
                  <td className="px-4 py-4 text-slate-600">{student.undergrad}</td>
                  <td className="px-4 py-4 font-medium">{student.target}</td>
                  <td className="px-4 py-4 text-red-500 font-black">{student.completionRate}</td>
                  <td className="px-4 py-4">
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold">
                      {student.isAdmitted ? '是' : '否'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-400">{student.admittedSchool}</td>
                  <td className="px-4 py-4 text-slate-400">{student.admittedMajor}</td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] px-2 py-1 rounded font-bold ${
                      student.friendStatus ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {student.friendStatus ? '是' : '否'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded font-bold">
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{student.subjects}</td>
                  <td className="px-4 py-4 text-slate-600">{student.expandSubjects}</td>
                  <td className="px-4 py-4 text-slate-600">{student.examSubjects}</td>
                  <td className="px-4 py-4 text-slate-600">{student.attempt}</td>
                  <td className="px-4 py-4 text-slate-400 text-[10px] max-w-[150px] truncate" title={student.notes}>
                    {student.notes}
                  </td>
                  <td className="px-4 py-4 text-right sticky right-0 bg-white">
                    <div className="flex gap-2 justify-end">
                      <button
                        className="text-blue-600 font-bold hover:underline text-xs"
                        onClick={() => setSelectedStudentForPlan(student)}
                      >
                        学习计划
                      </button>
                      <button
                        className="text-blue-600 font-bold hover:underline text-xs"
                        onClick={() => setSelectedStudent(student)}
                      >
                        查看详情
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStudent && (
        <StudentDrawer
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {selectedStudentForPlan && (
        <StudentPlanModal
          student={selectedStudentForPlan}
          onClose={() => setSelectedStudentForPlan(null)}
        />
      )}
    </div>
  )
}

export default StudentPage
