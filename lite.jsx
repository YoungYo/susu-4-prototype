import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  CheckCircle, 
  User, 
  Calendar as CalendarIcon, 
  Trophy, 
  ChevronRight, 
  ChevronLeft,
  Flame, 
  BookOpen, 
  Lock,
  Check,
  MoreHorizontal,
  Sparkles,
  MessageCircle,
  Zap,
  Heart,
  Users,
  X,
  Share2,
  Clock,
  PlayCircle,
  PauseCircle, 
  Gift,
  Snowflake,
  Camera, 
  Image as ImageIcon,
  Video,
  Headphones,
  PenTool,
  Target,
  List,
  Plus,
  Minus,
  Activity,
  Award,
  Medal,
  Crown,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  BarChart2,
  Mic,
  Star,
  Bell, 
  Search,
  HelpCircle, // Added HelpCircle
  MessageSquare // Added MessageSquare
} from 'lucide-react';

// --- Mock Data ---

const MOCK_USER = {
  id: "user_me",
  name: "小葵同学",
  avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Felix",
  streak: 12,
  totalCheckins: 45,
  rank: 8,
  score: 1850
};

const BADGES = [
    { id: 1, name: "连续 3 天", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50", unlocked: true },
    { id: 2, name: "连续 7 天", icon: Flame, color: "text-orange-500", bg: "bg-orange-50", unlocked: true },
    { id: 3, name: "卷王之王", icon: Crown, color: "text-purple-500", bg: "bg-purple-50", unlocked: false },
    { id: 4, name: "早起鸟", icon:  Clock, color: "text-blue-500", bg: "bg-blue-50", unlocked: true },
];

const TEACHERS = {
  political: {
    id: 'political',
    name: "小新老师", 
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ryan",
    message: "早安！今天的知识点有点烧脑，但只要理清逻辑就很简单啦~",
    streak: 12, // Medium
    daysKnown: 45,
    chatStreak: 8,
    subject: "政治",
    checkins: [1, 2, 4, 5, 8, 9, 11, 12, 15, 16, 17, 18] 
  },
  english: {
    id: 'english',
    name: "小林老师", 
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Alyssa",
    message: "英语没有捷径，每一句长难句的攻克都是胜利！",
    streak: 3, // Short
    daysKnown: 10,
    chatStreak: 3,
    subject: "英语",
    checkins: [16, 17, 18]
  },
  math: {
    id: 'math',
    name: "大白老师",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Mason",
    message: "数学就是做题，做题，再做题！",
    streak: 45, // Long (Red gradient)
    daysKnown: 120,
    chatStreak: 30,
    subject: "数学",
    checkins: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
  }
};

// 单词表数据
const VOCAB_LIST = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    word: ['ambiguous', 'benevolent', 'capricious', 'diligent', 'ephemeral', 'fastidious'][i % 6],
    meaning: ['模棱两可的', '仁慈的', '反复无常的', '勤勉的', '短暂的', '挑剔的'][i % 6]
}));

// 播客文稿数据
const PODCAST_SCRIPT = [
    { time: "00:05", text: "同学们好，今天我们来攻克马原第一章最核心的概念：物质与意识。", role: "teacher" },
    { time: "00:20", text: "首先请大家跟我一起回顾列宁对物质的经典定义。", role: "teacher" },
    { time: "00:45", text: "物质是标志客观实在的哲学范畴。", role: "highlight" },
    { time: "01:10", text: "注意！这里的关键词是'客观实在'。它是物质的唯一特性。", role: "teacher" },
    { time: "01:35", text: "这种客观实在是人通过感觉感知的，它不依赖于我们的感觉而存在。", role: "script" },
    { time: "02:00", text: "那么，意识的起源又是什么呢？", role: "question" },
    { time: "02:15", text: "意识是物质世界长期发展的产物，是人脑的机能和属性。", role: "highlight" },
    { time: "02:40", text: "今天的背诵重点就是这两句话，大家可以点击右下角按钮进行打卡。", role: "teacher" },
];

// 今日课程数据
const TODAY_COURSES = [
    { id: 101, time: '08:00', endTime: '09:00', title: '英语词汇速记', type: 'live', status: 'live', color: 'blue' },
    { id: 102, time: '10:00', endTime: '11:30', title: '马原强化班：唯物论', type: 'live', status: 'live', color: 'emerald' },
];

const TASKS = [
  { 
    id: 1, 
    title: "马原：第一章 物质世界", 
    taskType: "challenge", // 模式1：图文打卡
    status: "completed", 
    teacher: TEACHERS.political,
    participants: 1205,
    description: "重点掌握：物质的定义、意识的起源与本质。请配合音频进行背诵，完成后拍照上传笔记。",
    duration: "15 min"
  },
  { 
    id: 2, 
    title: "每日学习时长打卡", 
    taskType: "duration", // 模式2：时长打卡
    status: "pending", 
    teacher: { ...TEACHERS.political, name: "班主任" }, // 班主任或系统发布
    participants: 2300,
    description: "记录你今天在各个科目上投入的时间，诚实记录，见证成长！",
    duration: "每日必做"
  },
  { 
    id: 3, 
    title: "Day 12 核心词汇 (30词)", 
    taskType: "vocab", // 模式3：单词打卡
    status: "pending", 
    teacher: TEACHERS.english,
    participants: 890,
    description: "今日单词选自《考研英语大纲》高频词汇。请浏览列表并进行自测。",
    duration: "20 min"
  },
  { 
    id: 4, 
    title: "史纲：五四运动", 
    taskType: "challenge",
    status: "locked", 
    teacher: TEACHERS.political,
    participants: 0,
    description: "解锁后可见",
    duration: "20 min"
  },
];

const CLASS_FEED = [
  { id: 101, user: "Momo", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=3", content: "今天有点难，但坚持下来了。", time: "1分钟前", likes: 2 },
  { id: 1, user: "西瓜皮", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=1", content: "终于背完了！小新老师的口诀太好用了。", time: "2分钟前", likes: 5 },
  { id: 2, user: "上岸选手", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=2", content: "打卡 Day 12，英语阅读全对！开心！", time: "5分钟前", likes: 12 },
  { id: 102, user: "派大星", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Patrick", content: "数学题刷得我头秃，求安慰😭", time: "10分钟前", likes: 8 },
  { id: 103, user: "海绵宝宝", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Spongebob", content: "楼上加油！我们能赢！", time: "12分钟前", likes: 15 },
];

const LEADERBOARD = [
  { rank: 1, name: "卷王之王", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=King", days: 45, score: 2100 },
  { rank: 2, name: "努力的派大星", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Star", days: 44, score: 1950 },
  { rank: 3, name: "考研必胜", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Win", days: 42, score: 1910 },
  { rank: 4, name: "不睡觉", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sleep", days: 41, score: 1890 },
  { rank: 5, name: "明年一定", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Future", days: 40, score: 1880 },
  { rank: 6, name: "CoffeePlease", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Coffee", days: 39, score: 1860 },
  { rank: 7, name: "AnotherUser", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=X", days: 38, score: 1855 },
];

const generateHeatmapData = () => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 180; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (179 - i));
    const intensity = Math.random() > 0.4 ? Math.floor(Math.random() * 4) + 1 : 0;
    data.push({ date, intensity });
  }
  return data;
};

const HEATMAP_DATA = generateHeatmapData();

// --- Sub-Components ---

// 1. Spark Rules Modal (New Feature)
const SparkRulesModal = ({ onClose }) => {
    return (
        <div className="absolute inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Flame className="text-orange-500 fill-orange-500" size={20} />
                        火花规则
                    </h3>
                    <button onClick={onClose} className="p-1.5 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100">
                        <X size={18} />
                    </button>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                        <div className="w-12 h-12 rounded-full p-[2px]" style={{background: 'linear-gradient(45deg, #2193b0 0%, #6dd5ed 100%)'}}>
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-slate-600">1-6</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-slate-700 text-sm">初识之火</div>
                            <div className="text-[10px] text-slate-400">坚持打卡 1 ~ 6 天</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                        <div className="w-12 h-12 rounded-full p-[2px]" style={{background: 'linear-gradient(45deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)'}}>
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-slate-600">7-29</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-slate-700 text-sm">默契之火</div>
                            <div className="text-[10px] text-slate-400">坚持打卡 7 ~ 29 天</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                        <div className="w-12 h-12 rounded-full p-[2px]" style={{background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'}}>
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-slate-600">30+</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-slate-700 text-sm">陪伴之火</div>
                            <div className="text-[10px] text-slate-400">坚持打卡 30 天以上</div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400">火花代表你与老师共同坚持的日子<br/>每天打卡，让火花永不熄灭 ✨</p>
                </div>
            </div>
        </div>
    );
};

// 2. Teacher Calendar Modal (Updated with Relationship Stats)
const TeacherCalendarModal = ({ teacher, onClose }) => {
    if (!teacher) return null;

    const days = Array.from({ length: 35 }, (_, i) => {
        const day = i - 2; // Offset
        return day > 0 && day <= 31 ? day : null;
    });

    return (
        <div className="absolute inset-0 z-[70] bg-black/40 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-300">
            <div 
                className="bg-white w-full rounded-t-[2rem] p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300 h-[85vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Drag Handle */}
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 shrink-0"></div>

                {/* Header Profile */}
                <div className="flex justify-between items-start mb-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-0.5 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500">
                            <img src={teacher.avatar} className="w-14 h-14 rounded-full border-2 border-white bg-slate-50" alt={teacher.name} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-1">
                                {teacher.name}
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-normal">{teacher.subject}</span>
                            </h3>
                            <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                                <Sparkles size={12} fill="currentColor" /> 学习伙伴
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100">
                        <X size={20} />
                    </button>
                </div>

                {/* Relationship Stats (New Feature) */}
                <div className="grid grid-cols-3 gap-3 mb-6 shrink-0">
                    <div className="bg-blue-50 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
                        <div className="text-blue-500 mb-1"><CalendarIcon size={18} /></div>
                        <div className="text-lg font-bold text-slate-800 leading-none">{teacher.daysKnown}</div>
                        <div className="text-[10px] text-slate-400 mt-1">认识天数</div>
                    </div>
                    <div className="bg-purple-50 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
                        <div className="text-purple-500 mb-1"><MessageSquare size={18} /></div>
                        <div className="text-lg font-bold text-slate-800 leading-none">{teacher.chatStreak}</div>
                        <div className="text-[10px] text-slate-400 mt-1">连续聊天</div>
                    </div>
                    <div className="bg-orange-50 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
                        <div className="text-orange-500 mb-1"><Flame size={18} fill="currentColor" /></div>
                        <div className="text-lg font-bold text-slate-800 leading-none">{teacher.streak}</div>
                        <div className="text-[10px] text-slate-400 mt-1">连续打卡</div>
                    </div>
                </div>

                {/* Specific Calendar */}
                <div className="bg-slate-50/50 rounded-3xl p-5 border border-slate-100 flex-1 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6 px-1">
                        <span className="font-bold text-slate-800 flex items-center gap-2">
                            <Clock size={16} className="text-emerald-500" />
                            打卡记录
                        </span>
                        <span className="text-xs text-slate-400">2023年 10月</span>
                    </div>
                    <div className="grid grid-cols-7 text-center text-xs text-slate-400 mb-4 font-medium">
                        <div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div><div>日</div>
                    </div>
                    <div className="grid grid-cols-7 gap-y-4">
                        {days.map((day, i) => {
                            const isChecked = teacher.checkins.includes(day);
                            return (
                                <div key={i} className="flex justify-center items-center h-8">
                                    {day && (
                                        <div className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                                            isChecked 
                                            ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-md' 
                                            : day === 18 ? 'border-2 border-emerald-500 text-emerald-600' // Today
                                            : 'text-slate-400'
                                        }`}>
                                            {day}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                <div className="mt-4 shrink-0">
                    <button onClick={onClose} className="w-full py-3.5 bg-slate-100 text-slate-600 font-bold rounded-xl active:scale-[0.98] transition-all">
                        关闭
                    </button>
                </div>
            </div>
        </div>
    );
};

// 3. Unified Task Detail Overlay
const TaskDetail = ({ task, onClose }) => {
  const [step, setStep] = useState('detail'); 
  const [durations, setDurations] = useState({ poli: 0, eng: 0, math: 0, major: 0 });
  const [showPoster, setShowPoster] = useState(false); 
  const [isPlaying, setIsPlaying] = useState(false); // For audio player

  if (!task) return null;

  const handlePost = () => {
    if (task.taskType === 'duration') {
        setShowPoster(true); 
    } else {
        alert("打卡成功！已同步至学习日历 📅");
        onClose();
    }
  };

  const handleSendToTeacher = () => {
      alert(`已发送给${task.teacher.name}！老师会为您点赞 👍`);
      onClose();
  };

  const updateDuration = (subject, val) => {
      let numVal = parseFloat(val);
      if (isNaN(numVal) || numVal < 0) numVal = 0;
      numVal = parseFloat(numVal.toFixed(1));

      setDurations(prev => ({
          ...prev,
          [subject]: numVal
      }));
  };

  const adjustDuration = (subject, delta) => {
      setDurations(prev => {
          const newVal = Math.max(0, parseFloat((prev[subject] + delta).toFixed(1)));
          return { ...prev, [subject]: newVal };
      });
  }

  const renderVocabList = () => (
      <div className="grid grid-cols-2 gap-3 p-4">
          {VOCAB_LIST.map((item) => (
              <div key={item.id} className="bg-white border border-slate-100 p-3 rounded-xl flex flex-col items-center text-center shadow-sm">
                  <span className="font-bold text-slate-800 text-lg">{item.word}</span>
                  <span className="text-xs text-slate-400 mt-1">{item.meaning}</span>
              </div>
          ))}
      </div>
  );

  const renderDurationInputs = () => (
      <div className="p-6 space-y-5">
          {[
              { id: 'poli', label: '政治', color: 'text-rose-500', bg: 'bg-rose-50', icon: BookOpen },
              { id: 'eng', label: '英语', color: 'text-indigo-500', bg: 'bg-indigo-50', icon: PenTool },
              { id: 'math', label: '数学', color: 'text-purple-500', bg: 'bg-purple-50', icon: Activity },
              { id: 'major', label: '专业课', color: 'text-teal-500', bg: 'bg-teal-50', icon: Trophy },
          ].map(subject => (
              <div key={subject.id} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${subject.bg} ${subject.color} flex items-center justify-center`}>
                          <subject.icon size={20} />
                      </div>
                      <span className="font-bold text-slate-700">{subject.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <button 
                        onClick={() => adjustDuration(subject.id, -0.5)}
                        className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
                      >
                          <Minus size={16} />
                      </button>
                      <div className="w-16 text-center relative">
                          <input 
                            type="number" 
                            value={durations[subject.id]} 
                            onChange={(e) => updateDuration(subject.id, e.target.value)}
                            className="w-full text-center font-bold text-slate-800 text-lg border-none focus:ring-0 p-0"
                            step="0.1"
                          />
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-slate-300 pointer-events-none">h</span>
                      </div>
                      <button 
                         onClick={() => adjustDuration(subject.id, 0.5)}
                         className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center active:scale-95 transition-all"
                      >
                          <Plus size={16} />
                      </button>
                  </div>
              </div>
          ))}
          <div className="mt-6 bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl text-orange-700 text-sm flex items-center justify-center gap-2 border border-orange-100">
              <Sparkles size={18} className="text-orange-500" />
              <span>今日总计学习：<span className="font-bold text-2xl mx-1">{parseFloat(Object.values(durations).reduce((a,b)=>a+b, 0).toFixed(1))}</span> 小时</span>
          </div>
      </div>
  );

  const PosterModal = () => {
      const totalHours = parseFloat(Object.values(durations).reduce((a,b)=>a+b, 0).toFixed(1));
      const yesterdayHours = 5.2; 
      const growth = ((totalHours - yesterdayHours) / yesterdayHours * 100).toFixed(0);
      const isGrowth = totalHours >= yesterdayHours;

      const data = [
          { val: durations.poli, color: '#fca5a5' }, 
          { val: durations.eng, color: '#60a5fa' }, 
          { val: durations.math, color: '#a78bfa' }, 
          { val: durations.major, color: '#34d399' }, 
      ];
      
      let gradientStr = '';
      let currentPercent = 0;
      
      if (totalHours > 0) {
        data.forEach((d, i) => {
            const percent = (d.val / totalHours) * 100;
            gradientStr += `${d.color} ${currentPercent}% ${currentPercent + percent}%${i < data.length - 1 ? ', ' : ''}`;
            currentPercent += percent;
        });
      } else {
        gradientStr = '#f1f5f9 0% 100%'; 
      }

      return (
          <div className="absolute inset-0 z-[60] bg-emerald-900/20 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
              <div className="bg-white w-full rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[4rem] -z-0"></div>
                  <div className="absolute top-4 right-4 text-emerald-100"><Sparkles size={48} /></div>

                  <div className="p-8 text-center relative z-10">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3 shadow-sm">
                          <CheckCircle size={24} strokeWidth={3} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">今日学习小结</h3>
                      <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">DAILY REPORT</p>
                  </div>

                  <div className="px-8 pb-8 flex flex-col items-center">
                      <div 
                        className="w-48 h-48 rounded-full mb-8 relative flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(16,185,129,0.2)]"
                        style={{ background: `conic-gradient(${gradientStr})` }}
                      >
                          <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                               <span className="text-4xl font-black text-slate-800 tracking-tighter">{totalHours}</span>
                               <span className="text-xs text-slate-400 font-bold uppercase mt-1">Hours</span>
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 w-full mb-8">
                          <div className="bg-emerald-50 rounded-2xl p-3 flex flex-col items-center border border-emerald-100">
                             <span className="text-[10px] text-slate-400 mb-1">较昨日</span>
                             <div className={`flex items-center text-sm font-bold ${isGrowth ? 'text-emerald-600' : 'text-orange-500'}`}>
                                  {isGrowth ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                  {Math.abs(growth)}%
                             </div>
                          </div>
                          <div className="bg-blue-50 rounded-2xl p-3 flex flex-col items-center border border-blue-100">
                             <span className="text-[10px] text-slate-400 mb-1">超越同学</span>
                             <div className="flex items-center text-sm font-bold text-blue-600">
                                  <Users size={14} className="mr-1" />
                                  85%
                             </div>
                          </div>
                      </div>

                      <div className="text-center mb-8">
                          <p className="text-slate-700 font-bold text-lg mb-2">
                              {totalHours > 6 ? "太强了！你是卷王本王！🔥" : totalHours > 3 ? "节奏很棒，继续保持！✨" : "积少成多，明天加油！🌱"}
                          </p>
                          <p className="text-xs text-slate-400 bg-slate-50 inline-block px-3 py-1 rounded-full border border-slate-100">
                              "{totalHours > 0 ? "每一步都算数。" : "休息是为了走更远的路。"}"
                          </p>
                      </div>

                      <button 
                        onClick={handleSendToTeacher}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:shadow-xl"
                      >
                          <Send size={18} />
                          打卡并在班级圈展示
                      </button>
                  </div>
              </div>
          </div>
      );
  };

  const renderChallengeForm = () => (
      <div className="p-5 flex-1 overflow-y-auto">
        <div className="mb-4">
            <input type="text" placeholder="给今天的努力起个标题..." className="w-full text-xl font-bold bg-transparent placeholder:text-slate-300 border-none outline-none p-0 focus:ring-0"/>
        </div>
        <div className="mb-6">
            <textarea placeholder="写下此刻的学习感悟吧..." className="w-full h-32 bg-transparent text-slate-600 placeholder:text-slate-300 border-none outline-none p-0 resize-none focus:ring-0 leading-relaxed"></textarea>
        </div>
        <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 cursor-pointer">
                <Camera size={24} className="mb-1" />
                <span className="text-[10px]">添加图片</span>
            </div>
        </div>
      </div>
  );

  // --- New Challenge (Audio+Script) View ---
  const renderInteractiveScript = () => (
      <div className="flex flex-col h-full bg-[#F9FAFB] relative">
          {/* Audio Player Card */}
          <div className="px-5 pt-4 pb-2 shrink-0">
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 flex-shrink-0 relative">
                      {isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
                      {isPlaying && <div className="absolute inset-0 rounded-full border-2 border-emerald-200 animate-ping opacity-75"></div>}
                  </div>
                  <div className="flex-1">
                      <h3 className="font-bold text-slate-800 text-sm mb-1">第一章：物质世界与实践</h3>
                      <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 w-1/3 rounded-full"></div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">04:20 / 12:00</span>
                      </div>
                  </div>
                  <button onClick={() => setIsPlaying(!isPlaying)} className="absolute inset-0 z-10" aria-label="Toggle Play"></button>
              </div>
          </div>

          {/* Scrollable Script Area */}
          <div className="flex-1 overflow-y-auto px-5 py-2 space-y-4">
              <div className="text-center text-xs text-slate-400 my-2">-- 音频文稿 --</div>
              {PODCAST_SCRIPT.map((line, idx) => (
                  <div key={idx} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 pt-1">
                          {line.role === 'teacher' ? (
                              <img src={TEACHERS.political.avatar} className="w-8 h-8 rounded-full bg-slate-200" alt="T" />
                          ) : line.role === 'highlight' ? (
                              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                  <Star size={14} />
                              </div>
                          ) : (
                              <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                          )}
                      </div>
                      <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-xs font-bold text-slate-600">
                                  {line.role === 'teacher' ? '小新老师' : line.role === 'highlight' ? '重点笔记' : '旁白'}
                              </span>
                              <span className="text-[10px] text-slate-300">{line.time}</span>
                          </div>
                          <div className={`p-3 rounded-2xl rounded-tl-none text-sm leading-relaxed ${
                              line.role === 'highlight' 
                                ? 'bg-yellow-50 text-yellow-900 border border-yellow-100 font-medium' 
                                : 'bg-white text-slate-700 border border-slate-50 shadow-sm'
                          }`}>
                              {line.text}
                          </div>
                      </div>
                  </div>
              ))}
              <div className="h-24"></div> {/* Spacer for FAB */}
          </div>

          {/* Floating Action Button (FAB) */}
          <button 
              onClick={() => setStep('checkin')}
              className="absolute bottom-6 right-6 w-14 h-14 bg-emerald-500 rounded-full shadow-emerald-300 shadow-lg flex items-center justify-center text-white active:scale-90 transition-all z-20 group"
          >
              <Camera size={24} className="group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
          </button>
      </div>
  );

  return (
    <div className="absolute inset-0 bg-white z-50 overflow-y-auto animate-in slide-in-from-bottom-10 duration-300 rounded-none bg-[#FAFAFA] flex flex-col">
      {showPoster && <PosterModal />}
      
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm border-b border-slate-50 flex items-center justify-between sticky top-0 z-20 shrink-0">
            <button onClick={onClose} className="p-2 -ml-2 text-slate-500 active:bg-slate-50 rounded-full">
                <ChevronLeft size={24} />
            </button>
            <span className="font-bold text-slate-800">
                {task.taskType === 'vocab' ? '单词背诵' : task.taskType === 'duration' ? '时长记录' : '课程带背'}
            </span>
            <div className="w-8"></div>
      </div>

      {/* Body Content Swapper */}
      <div className="flex-1 overflow-hidden relative">
          {task.taskType === 'vocab' ? (
             <div className="h-full overflow-y-auto">
                <div className="bg-emerald-50 p-4 text-center">
                    <h2 className="text-emerald-700 font-bold mb-1">今日核心词汇</h2>
                    <p className="text-emerald-500 text-xs">请大声朗读并记忆以下单词</p>
                </div>
                {renderVocabList()}
                <div className="p-4"><button onClick={handlePost} className="w-full bg-emerald-500 text-white font-bold py-3.5 rounded-xl">全部掌握并打卡</button></div>
             </div>
          ) : task.taskType === 'duration' ? (
             <div className="h-full overflow-y-auto">
                 <div className="px-6 pt-6 pb-2 text-center">
                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-3 text-blue-500">
                        <Clock size={32} />
                     </div>
                     <h2 className="text-slate-800 font-bold text-lg mb-1">记录学习时长</h2>
                     <p className="text-slate-400 text-xs">精确记录每一刻的专注</p>
                 </div>
                 {renderDurationInputs()}
                 <div className="p-6"><button onClick={handlePost} className="w-full bg-emerald-500 text-white font-bold py-3.5 rounded-xl">确认提交</button></div>
             </div>
          ) : (
             // Challenge Mode Logic
             step === 'detail' ? renderInteractiveScript() : (
                 <div className="h-full flex flex-col">
                     {renderChallengeForm()}
                     <div className="p-4 bg-white border-t border-slate-100">
                        <button onClick={handlePost} className="w-full bg-emerald-500 text-white font-bold py-3.5 rounded-xl">确认提交</button>
                     </div>
                 </div>
             )
          )}
      </div>
    </div>
  );
};

// 2. Greeting Card (Unchanged - Removed Usage)
const GreetingCard = ({ onClose }) => {
  // ... (No changes needed, functionality removed from UI)
  return null;
};

// 3. New Unified Calendar Component
const StudyCalendar = ({ setSelectedTask }) => {
    // ... (Keep existing implementation)
    const [view, setView] = useState('week'); // 'year', 'month', 'week', 'day'
    const [selectedDate, setSelectedDate] = useState(18); // Default to today

    const weekDays = [
        { day: '一', date: 16 }, { day: '二', date: 17 }, 
        { day: '三', date: 18, isToday: true }, { day: '四', date: 19 }, 
        { day: '五', date: 20 }, { day: '六', date: 21 }, { day: '日', date: 22 }
    ];

    const getDurationText = () => {
        if (view === 'year') return { label: '本年学习', val: '860.5', unit: 'h' };
        if (view === 'month') return { label: '本月学习', val: '86.5', unit: 'h' };
        if (view === 'week') return { label: '本周学习', val: '24.2', unit: 'h' };
        return { label: '今日学习', val: '6.5', unit: 'h' };
    };

    const durationInfo = getDurationText();

    // Mock Year Data (Updated to display effectively)
    const YEAR_DATA = Array.from({length: 12}, (_, i) => ({
        month: i + 1,
        hours: Math.floor(Math.random() * 100) + 20
    }));

    const renderTimeline = () => (
        <div className="relative pl-2 mt-4">
            <div className="absolute left-[59px] top-2 bottom-4 w-0.5 bg-slate-100 -z-0"></div>
            <div className="space-y-4">
                {TODAY_COURSES.map((item) => (
                    <div key={item.id} className="flex gap-4 relative z-10 group cursor-pointer">
                        <div className="w-12 pt-1 flex flex-col items-end flex-shrink-0">
                            <span className={`text-xs font-bold ${item.status === 'live' ? 'text-emerald-600' : 'text-slate-600'}`}>{item.time}</span>
                            <span className="text-[10px] text-slate-300">{item.endTime}</span>
                        </div>
                        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 border-2 flex-shrink-0 ${item.status === 'live' ? 'bg-emerald-500 border-emerald-200' : 'bg-slate-200 border-white'}`}></div>
                        <div className={`flex-1 p-3 rounded-2xl border transition-all ${item.status === 'live' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-transparent'}`}>
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-1.5">
                                    {item.type === 'live' && <Video size={12} className="text-emerald-500" />}
                                    {item.type === 'video' && <PlayCircle size={12} className="text-blue-500" />}
                                    <span className="text-[10px] bg-white/50 px-1.5 py-0.5 rounded font-medium text-slate-500">
                                        {item.type === 'live' ? '直播' : '录播'}
                                    </span>
                                </div>
                                {item.status === 'done' && <CheckCircle size={14} className="text-emerald-400" />}
                            </div>
                            <h4 className="text-sm font-bold text-slate-700">{item.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="px-5 pb-24 pt-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold text-slate-800">学习日历</h1>
                <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-bold">
                    {['year', 'month', 'week', 'day'].map(v => (
                        <button 
                            key={v}
                            onClick={() => setView(v)}
                            className={`px-3 py-1.5 rounded-md transition-all ${view === v ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                        >
                            {v === 'year' ? '年' : v === 'month' ? '月' : v === 'week' ? '周' : '日'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Duration Stats Card - Updated Lighter/Fresher Theme */}
            <div className="bg-emerald-50/50 rounded-3xl p-5 mb-6 shadow-sm border border-emerald-100 relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-end">
                    <div>
                        <div className="text-emerald-600/70 text-xs font-medium mb-1 flex items-center gap-1">
                            <Clock size={12} /> {durationInfo.label}
                        </div>
                        <div className="text-4xl font-bold text-emerald-600">{durationInfo.val}<span className="text-base font-normal ml-1 opacity-60">{durationInfo.unit}</span></div>
                    </div>
                    <div className="bg-white px-3 py-1.5 rounded-xl text-xs font-medium text-emerald-600 flex items-center gap-1 border border-emerald-100 shadow-sm">
                        <Activity size={12} /> 超过 85% 同学
                    </div>
                </div>
                {/* Decorative circles - Very subtle */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-100/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 right-10 w-16 h-16 bg-emerald-100/30 rounded-full blur-lg"></div>
            </div>

            {/* View Content */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 min-h-[400px]">
                {view === 'year' && (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-800">2023年</h3>
                        </div>
                        {/* Fixed Bar Chart */}
                        <div className="h-48 flex items-end justify-between px-1 gap-2">
                            {YEAR_DATA.map((d, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group cursor-pointer">
                                    <div className="w-full bg-emerald-50 rounded-t-md relative flex items-end h-full overflow-hidden">
                                         <div 
                                            className="w-full bg-emerald-300 rounded-t-md relative group-hover:bg-emerald-400 transition-all duration-500" 
                                            style={{ height: `${(d.hours / 120) * 100}%` }}
                                         >
                                         </div>
                                         {/* Tooltip */}
                                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                             {d.hours}h
                                         </div>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium scale-90">{d.month}月</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {view === 'month' && (
                    <>
                         <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-800">2023年 10月</h3>
                            <CalendarIcon size={18} className="text-slate-300" />
                        </div>
                        <div className="grid grid-cols-7 text-center text-xs text-slate-400 mb-4 font-medium">
                            <div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div><div>日</div>
                        </div>
                        <div className="grid grid-cols-7 gap-y-4 gap-x-1 mb-8">
                             {Array.from({ length: 35 }, (_, i) => {
                                 const day = i - 2; 
                                 const hasClass = [2, 5, 9, 12, 16, 20, 23, 26].includes(day);
                                 const hasCheckin = [1, 2, 3, 4, 5, 8, 9, 10, 11, 15, 16, 17, 18, 19, 22].includes(day);
                                 
                                 return (
                                     <div key={i} className="flex flex-col items-center h-10 relative">
                                         {day > 0 && day <= 31 && (
                                             <>
                                                <span className={`text-sm font-medium z-10 w-7 h-7 flex items-center justify-center rounded-full ${day === 18 ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-600'}`}>
                                                    {day}
                                                </span>
                                                <div className="flex gap-0.5 mt-1">
                                                    {hasClass && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>}
                                                    {hasCheckin && <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>}
                                                </div>
                                             </>
                                         )}
                                     </div>
                                 )
                             })}
                        </div>
                    </>
                )}

                {view === 'week' && (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            {weekDays.map((item, idx) => (
                                <div key={idx} onClick={() => setSelectedDate(item.date)} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${selectedDate === item.date ? 'scale-110' : 'opacity-60'}`}>
                                    <span className="text-[10px] text-slate-400 font-medium">{item.day}</span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${selectedDate === item.date ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-50 text-slate-600'}`}>
                                        {item.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm mb-2">今日安排</h4>
                        {renderTimeline()}
                    </>
                )}

                {view === 'day' && (
                    <>
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">10月18日</h2>
                            <p className="text-xs text-slate-400">周三 · 考研倒计时 65 天</p>
                        </div>
                        
                        <div className="mb-6">
                            <h4 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2">
                                <CheckCircle size={14} className="text-emerald-500" /> 
                                打卡任务完成度 (1/3)
                            </h4>
                            <div className="space-y-2">
                                {TASKS.slice(0,3).map(task => (
                                    <div 
                                        key={task.id} 
                                        onClick={() => setSelectedTask(task)} // Interactive click handler
                                        className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            {task.status === 'completed' ? <CheckCircle size={16} className="text-emerald-500" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>}
                                            <span className={`text-sm ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.title}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-100">
                                            {task.taskType === 'vocab' ? '单词' : task.taskType === 'duration' ? '时长' : '闯关'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h4 className="font-bold text-slate-700 text-sm mb-2">时间轴</h4>
                        {renderTimeline()}
                    </>
                )}

                {/* Heatmap Footer - Horizontal Github Style */}
                <div className="border-t border-slate-100 pt-6 mt-6">
                    <h4 className="font-bold text-slate-700 text-sm mb-4 flex items-center gap-2">
                        <Sparkles size={14} className="text-emerald-500" /> 学习热力图
                    </h4>
                    {/* Horizontal scrollable heatmap */}
                    <div className="flex overflow-x-auto pb-2 no-scrollbar">
                        <div className="grid grid-rows-7 grid-flow-col gap-1">
                            {HEATMAP_DATA.map((day, index) => (
                                <div 
                                    key={index} 
                                    className={`w-2.5 h-2.5 rounded-[2px] transition-all ${
                                        day.intensity === 0 ? 'bg-slate-100' : 
                                        day.intensity === 1 ? 'bg-emerald-100' :
                                        day.intensity === 2 ? 'bg-emerald-300' :
                                        day.intensity === 3 ? 'bg-emerald-400' :
                                        'bg-emerald-500'
                                    }`} 
                                    title={day.date.toLocaleDateString()}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 4. Class View 
const ClassView = () => {
    const [subTab, setSubTab] = useState('feed'); 
    return (
        <div className="px-5 pb-24 pt-6 animate-fade-in">
            <h1 className="text-xl font-bold text-slate-800 mb-4">24级考研冲刺班</h1>
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                <button onClick={() => setSubTab('feed')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${subTab === 'feed' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}>班级动态</button>
                <button onClick={() => setSubTab('rank')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${subTab === 'rank' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}>排行榜</button>
            </div>
            {subTab === 'feed' ? (
                <div className="space-y-4">
                    {/* User's own input area */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                             <User size={20} />
                        </div>
                        <div className="text-slate-400 text-sm flex-1">说点什么鼓励一下自己...</div>
                        <button className="text-emerald-500 font-bold text-sm">发布</button>
                    </div>

                    {CLASS_FEED.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <img src={item.avatar} className="w-8 h-8 rounded-full bg-slate-100" alt="avatar" />
                                    <div>
                                        <div className="text-sm font-bold text-slate-700">{item.user}</div>
                                        <div className="text-[10px] text-slate-400">{item.time}</div>
                                    </div>
                                </div>
                                <div className="text-xs text-slate-400 flex items-center gap-1"><Heart size={14}/> {item.likes}</div>
                            </div>
                            <p className="text-slate-600 text-sm pl-10">{item.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-3">
                   {/* Pinned User Stats */}
                   <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-emerald-200 shadow-lg text-white flex items-center justify-between mb-4 relative overflow-hidden">
                        <div className="flex items-center gap-3 relative z-10">
                            <span className="font-bold italic text-xl">#{MOCK_USER.rank}</span>
                            <img src={MOCK_USER.avatar} className="w-10 h-10 rounded-full border-2 border-white/50" alt="av" />
                            <div>
                                <div className="text-sm font-bold">我 ({MOCK_USER.name})</div>
                                <div className="text-xs opacity-80">坚持 {MOCK_USER.streak} 天</div>
                            </div>
                        </div>
                        <span className="text-white font-bold relative z-10">{MOCK_USER.score} pts</span>
                        <div className="absolute -right-4 -bottom-8 opacity-20"><Trophy size={80} /></div>
                   </div>

                   {LEADERBOARD.map((user, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className={`font-bold italic w-6 text-center ${idx===0?'text-yellow-500 text-lg':idx===1?'text-slate-400 text-base':idx===2?'text-orange-400 text-base':'text-slate-300 text-sm'}`}>{user.rank}</span>
                                <img src={user.avatar} className="w-8 h-8 rounded-full bg-slate-50" alt="av" />
                                <span className="text-sm font-bold text-slate-700">{user.name}</span>
                            </div>
                            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">{user.score} pts</span>
                        </div>
                   ))}
                </div>
            )}
        </div>
    );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showSparkRules, setShowSparkRules] = useState(false); // New state for rules modal
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    // const timer = setTimeout(() => setShowGreeting(true), 500); 
    // return () => clearTimeout(timer);
  }, []);

  // --- New Component: Teacher Sparks Row (Instagram Style) ---
  const TeacherStories = ({ onTeacherClick }) => {
    const getGradientStyle = (streak) => {
        if (streak >= 30) {
            return { background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' };
        } else if (streak >= 7) {
            return { background: 'linear-gradient(45deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)' };
        } else {
            return { background: 'linear-gradient(45deg, #2193b0 0%, #6dd5ed 100%)' };
        }
    };

    const sortedTeachers = Object.values(TEACHERS).sort((a, b) => b.streak - a.streak);

    return (
        <div className="mb-6 animate-fade-in overflow-x-auto no-scrollbar py-2">
            <div className="flex gap-2 items-center mb-3 px-1">
                <h3 className="font-bold text-slate-800 text-sm">我的老师</h3>
                <button onClick={() => setShowSparkRules(true)} className="text-slate-300 hover:text-emerald-500 transition-colors">
                    <HelpCircle size={14} />
                </button>
            </div>
            
            <div className="flex gap-5 px-1">
            {sortedTeachers.map((teacher, idx) => (
                <div 
                    key={idx} 
                    className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0"
                    onClick={() => onTeacherClick(teacher)}
                >
                    {/* Ring Container */}
                    <div 
                        className="p-[2px] rounded-full transition-transform duration-300 group-active:scale-95"
                        style={getGradientStyle(teacher.streak)}
                    >
                        <div className="bg-white p-[2px] rounded-full">
                            <img src={teacher.avatar} className="w-14 h-14 rounded-full object-cover bg-slate-50" alt={teacher.name} />
                        </div>
                    </div>
                    <div className="text-center">
                        <span className="block text-xs font-medium text-slate-700">{teacher.name}</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">{teacher.streak}天</span>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="px-5 pb-24 pt-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <img src={MOCK_USER.avatar} alt="User" className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-white shadow-sm" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center">
                        <Zap size={8} className="text-white fill-white" />
                    </div>
                 </div>
                 <div>
                    <h1 className="text-lg font-bold text-slate-800">Hi, {MOCK_USER.name}</h1>
                    <p className="text-xs text-slate-400">报名的课程</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                   {/* Points Pill */}
                   <div className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-yellow-100">
                       <Sparkles size={12} className="fill-yellow-600" /> {MOCK_USER.score} 积分
                   </div>
                   {/* Notification Bell */}
                   <div className="relative p-2 bg-white rounded-full border border-slate-50 text-slate-400 shadow-sm cursor-pointer hover:text-emerald-500 hover:border-emerald-100 transition-colors">
                        <Bell size={20} />
                        <div className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                   </div>
              </div>
            </div>

            {/* Teacher Stories (Instagram Style) */}
            <TeacherStories onTeacherClick={setSelectedTeacher} />

            {/* Today's Schedule Preview - Transparent Style */}
            <div className="bg-white rounded-3xl p-5 mb-6 shadow-sm border border-slate-100 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-bl-[4rem] -z-0 transition-transform group-hover:scale-110 duration-500"></div>
                <div className="absolute right-4 top-4 text-emerald-100"><CalendarIcon size={64} /></div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                            今日课程 
                            <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-bold">2节</span>
                        </h3>
                    </div>
                    
                    <div className="space-y-3">
                        {TODAY_COURSES.map((course) => (
                            <div key={course.id} className="flex items-center gap-3">
                                <span className="text-xs font-mono font-bold text-slate-400 w-10">{course.time}</span>
                                <div className="flex-1 bg-transparent p-2.5 rounded-xl flex items-center justify-between border border-dashed border-slate-200 hover:border-emerald-200 transition-colors">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        <span className="text-sm font-medium text-slate-700 truncate">{course.title}</span>
                                    </div>
                                    <span className="text-[10px] bg-emerald-500 px-1.5 py-0.5 rounded text-white animate-pulse flex-shrink-0">LIVE</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button 
                        onClick={() => setActiveTab('calendar')}
                        className="mt-4 w-full py-2 flex items-center justify-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50/50 rounded-xl hover:bg-emerald-50 transition-colors"
                    >
                        查看完整日程 <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            {/* Task List (3 Types) */}
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="font-bold text-base text-slate-800 flex items-center gap-2">
                    今日打卡 <span className="text-[10px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded-md font-bold border border-red-100">待完成</span>
                </h2>
            </div>
            
            <div className="space-y-3">
              {TASKS.map(task => (
                <div 
                    key={task.id} 
                    onClick={() => setSelectedTask(task)}
                    className={`group relative p-4 rounded-3xl transition-all duration-300 cursor-pointer border ${
                        task.status === 'locked' ? 'bg-slate-50 border-slate-100 opacity-70' : 
                        'bg-white border-slate-50 shadow-sm hover:border-emerald-200 hover:shadow-md'
                    }`}
                >
                    <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                            task.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 
                            task.taskType === 'vocab' ? 'bg-blue-50 text-blue-500' :
                            task.taskType === 'duration' ? 'bg-purple-50 text-purple-500' :
                            'bg-orange-50 text-orange-500'
                        }`}>
                            {task.status === 'completed' ? <Check size={20} strokeWidth={3} /> : 
                             task.taskType === 'vocab' ? <List size={20} /> :
                             task.taskType === 'duration' ? <Clock size={20} /> :
                             task.status === 'locked' ? <Lock size={18} /> :
                             <Camera size={20} />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                    task.taskType === 'vocab' ? 'bg-blue-100 text-blue-600' :
                                    task.taskType === 'duration' ? 'bg-purple-100 text-purple-600' :
                                    'bg-orange-100 text-orange-600'
                                }`}>
                                    {task.taskType === 'vocab' ? '单词' : task.taskType === 'duration' ? '时长' : '闯关'}
                                </span>
                                <span className="text-[10px] text-slate-300">•</span>
                                <span className="text-[10px] text-slate-400">{task.participants} 人参与</span>
                            </div>
                            <h3 className={`font-bold text-sm truncate ${task.status === 'locked' ? 'text-slate-400' : 'text-slate-800'}`}>
                                {task.title}
                            </h3>
                            {task.status !== 'completed' && !task.status === 'locked' && (
                                <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                                    <span className="flex-1 text-slate-400">{task.description.substring(0, 20)}...</span>
                                </div>
                            )}
                        </div>
                        {task.status !== 'locked' && (
                             <div className="self-center bg-slate-50 p-1.5 rounded-full group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                <ChevronRight size={16} />
                             </div>
                        )}
                    </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'calendar':
          return <StudyCalendar setSelectedTask={setSelectedTask} />;

      case 'class':
        return <ClassView />;

      case 'profile':
        return (
          <div className="px-5 pb-24 pt-6">
             {/* Profile Header */}
             <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50 text-center relative overflow-hidden mb-6">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-emerald-50 to-transparent -z-0"></div>
                <div className="relative z-10">
                    <div className="w-24 h-24 rounded-full bg-white mx-auto mb-3 p-1.5 shadow-sm">
                        <img src={MOCK_USER.avatar} alt="Avatar" className="w-full h-full object-cover rounded-full bg-slate-50" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{MOCK_USER.name}</h2>
                    <p className="text-sm text-slate-400 mt-1">已坚持学习 {MOCK_USER.totalCheckins} 天</p>
                </div>
             </div>

             {/* Badges Section */}
             <div className="bg-white rounded-3xl p-5 mb-6 shadow-sm border border-slate-50">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Medal size={18} className="text-orange-500" /> 我的勋章
                    </h3>
                    <ChevronRight size={16} className="text-slate-300" />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                    {BADGES.map((badge, idx) => (
                        <div key={idx} className={`flex flex-col items-center flex-shrink-0 w-20 ${badge.unlocked ? '' : 'opacity-50 grayscale'}`}>
                            <div className={`w-14 h-14 rounded-full ${badge.bg} flex items-center justify-center mb-2 shadow-sm`}>
                                <badge.icon size={24} className={badge.color} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">{badge.name}</span>
                        </div>
                    ))}
                </div>
             </div>

             {/* Menu List */}
             <div className="bg-white rounded-3xl shadow-sm border border-slate-50 overflow-hidden">
                 {[{ icon: User, label: '个人信息' }, { icon: Flame, label: '补签卡' }, { icon: MoreHorizontal, label: '设置' }].map((item, idx) => (
                     <div key={idx} className="flex items-center p-5 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0">
                         <div className="text-slate-400 mr-4"><item.icon size={20} /></div>
                         <span className="flex-1 text-sm font-medium text-slate-700">{item.label}</span>
                         <ChevronRight size={16} className="text-slate-300" />
                     </div>
                 ))}
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans max-w-md mx-auto relative shadow-2xl overflow-hidden text-slate-800">
      
      {showGreeting && <GreetingCard onClose={() => setShowGreeting(false)} />}
      {selectedTask && <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />}
      {selectedTeacher && <TeacherCalendarModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />}
      {showSparkRules && <SparkRulesModal onClose={() => setShowSparkRules(false)} />}

      <div className="h-full overflow-y-auto no-scrollbar">
        {renderContent()}
      </div>

      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-6 py-3 flex gap-8 pointer-events-auto">
            {[
                { id: 'home', icon: Home, label: '今日' },
                { id: 'calendar', icon: CalendarIcon, label: '日历' }, 
                { id: 'class', icon: Users, label: '班级' }, 
                { id: 'profile', icon: User, label: '我的' }
            ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center space-y-1 transition-all duration-300 ${
                    activeTab === tab.id ? 'text-emerald-500 scale-110' : 'text-slate-300 hover:text-slate-400'
                  }`}
                >
                  <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                  {activeTab === tab.id && <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1"></span>}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
}