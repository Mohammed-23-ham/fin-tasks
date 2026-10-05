'use client';

import {
  ArrowUpLeft,
  Bell,
  CalendarBlank,
  ChartLineUp,
  Check,
  CheckCircle,
  Clock,
  DotsThree,
  GearSix,
  House,
  ListChecks,
  MagnifyingGlass,
  Plus,
  Sparkle,
  Target,
} from '@phosphor-icons/react';

const tasks = [
  {
    title: 'مراجعة ملخص المشروع مع الفريق',
    project: 'إطلاق المنتج',
    time: '09:30 ص',
    color: 'mint',
    done: true,
  },
  {
    title: 'إرسال النسخة الأولى من العرض',
    project: 'العمل',
    time: '11:00 ص',
    color: 'coral',
    done: false,
  },
  {
    title: 'تحديث قائمة أولويات الأسبوع',
    project: 'شخصي',
    time: '01:30 م',
    color: 'blue',
    done: false,
  },
  {
    title: 'قراءة ٢٠ صفحة من الكتاب',
    project: 'تطوير الذات',
    time: '06:00 م',
    color: 'yellow',
    done: false,
  },
];

const navigation = [
  { label: 'نظرة عامة', icon: House, href: '#overview' },
  { label: 'مهامي', icon: ListChecks, href: '#today', active: true, count: '٨' },
  { label: 'تقويم المهام', icon: CalendarBlank, href: '#week' },
  { label: 'الإحصائيات', icon: ChartLineUp, href: '#progress' },
];

export default function Dashboard() {
  const now = new Date();
  const today = new Intl.DateTimeFormat('ar-u-nu-arab', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now);
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return date;
  });
  const weekRangeFormatter = new Intl.DateTimeFormat('ar-u-nu-arab', {
    day: 'numeric',
    month: 'long',
  });
  const weekRange = `${weekRangeFormatter.format(weekDays[0])} – ${weekRangeFormatter.format(weekDays[6])}`;
  const weekDayLabels = ['أح', 'إث', 'ث', 'أر', 'خ', 'ج', 'س'];

  return (
    <main className="workspace" dir="rtl">
      <aside className="workspace-sidebar" aria-label="القائمة الرئيسية">
        <a className="workspace-brand" href="#overview">
          <span className="workspace-brand-mark" aria-hidden="true">
            <Check size={19} weight="bold" />
          </span>
          <span>فِن تاسكس</span>
        </a>

        <div className="sidebar-section-label">مساحة العمل</div>
        <nav className="workspace-nav">
          {navigation.map(({ label, icon: Icon, href, active, count }) => (
            <a
              key={label}
              className={`workspace-nav-link${active ? ' is-active' : ''}`}
              href={href}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={19} weight={active ? 'fill' : 'regular'} />
              <span>{label}</span>
              {count && <span className="nav-count">{count}</span>}
            </a>
          ))}
        </nav>

        <div className="sidebar-section-label projects-label">قوائمك</div>
        <div className="project-links">
          <a href="#today"><i className="project-dot dot-coral" />العمل</a>
          <a href="#today"><i className="project-dot dot-blue" />شخصي</a>
          <a href="#today"><i className="project-dot dot-yellow" />تطوير الذات</a>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span className="tip-icon"><Sparkle size={17} weight="fill" /></span>
            <p>خطوة صغيرة اليوم،<br />فرق كبير غدًا.</p>
          </div>
          <a className="workspace-nav-link settings-link" href="#settings">
            <GearSix size={19} />
            <span>الإعدادات</span>
          </a>
          <div className="sidebar-profile">
            <span className="profile-avatar">م</span>
            <span className="profile-copy"><strong>مساحتي</strong><small>مساحة شخصية</small></span>
            <DotsThree size={21} weight="bold" />
          </div>
        </div>
      </aside>

      <section className="workspace-main" id="overview">
        <header className="workspace-topbar">
          <div className="breadcrumb"><span>مساحة العمل</span><ArrowUpLeft size={14} /><strong>مهامي</strong></div>
          <div className="topbar-actions">
            <label className="workspace-search">
              <MagnifyingGlass size={17} />
              <input type="search" placeholder="ابحث عن مهمة..." aria-label="ابحث عن مهمة" />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button notification-button" type="button" aria-label="الإشعارات">
              <Bell size={19} />
              <i />
            </button>
            <span className="topbar-avatar" aria-label="الملف الشخصي">م</span>
          </div>
        </header>

        <div className="workspace-content">
          <section className="welcome-row">
            <div>
              <p className="workspace-date">{today}</p>
              <h1>أهلًا بك، لننجز شيئًا جميلًا <span>✳</span></h1>
              <p className="welcome-caption">رتّب أفكارك وخذ يومك خطوة بخطوة.</p>
            </div>
            <button className="today-selector" type="button">
              <CalendarBlank size={17} />
              <span>اليوم</span>
            </button>
          </section>

          <section className="overview-strip" aria-label="ملخص المهام">
            <div className="overview-stat">
              <span className="stat-icon stat-icon-green"><ListChecks size={18} /></span>
              <div><strong>٨</strong><span>مهام اليوم</span></div>
              <small>منها ٤ مكتملة</small>
            </div>
            <div className="overview-stat">
              <span className="stat-icon stat-icon-orange"><Clock size={18} /></span>
              <div><strong>٤</strong><span>متبقية</span></div>
              <small>أنت على المسار الصحيح</small>
            </div>
            <div className="overview-stat progress-stat" id="progress">
              <span className="stat-icon stat-icon-blue"><Target size={18} /></span>
              <div><strong>٥٠٪</strong><span>إنجاز اليوم</span></div>
              <span className="progress-track"><i /></span>
            </div>
          </section>

          <div className="task-layout">
            <section className="task-column" id="today">
              <div className="section-heading">
                <div>
                  <h2>مهام اليوم <span className="heading-count">٤</span></h2>
                  <p>ابدأ بالأهم، والباقي سيأتي.</p>
                </div>
                <button className="sort-control" type="button">ترتيب حسب الوقت <span>⌄</span></button>
              </div>

              <div className="task-composer" role="group" aria-label="إضافة مهمة">
                <span className="composer-plus"><Plus size={20} weight="bold" /></span>
                <input type="text" placeholder="ما المهمة التي تريد إنجازها؟" aria-label="عنوان المهمة الجديدة" />
                <span className="composer-shortcut">⌘ ↵</span>
                <button type="button" className="composer-submit"><Plus size={17} />إضافة مهمة</button>
              </div>

              <div className="task-list-heading">
                <span>اليوم</span>
                <span>٤ مهام</span>
              </div>
              <ul className="workspace-task-list">
                {tasks.map((task) => (
                  <li className={`workspace-task${task.done ? ' task-is-done' : ''}`} key={task.title}>
                    <span className={`task-marker${task.done ? ' marker-done' : ''}`} aria-hidden="true">
                      {task.done && <Check size={13} weight="bold" />}
                    </span>
                    <span className="workspace-task-copy">
                      <strong>{task.title}</strong>
                      <span><i className={`project-dot dot-${task.color}`} />{task.project}</span>
                    </span>
                    <span className="task-time"><Clock size={14} />{task.time}</span>
                    <button type="button" className="task-more" aria-label={`خيارات: ${task.title}`}>
                      <DotsThree size={21} weight="bold" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="completed-heading">
                <CheckCircle size={17} weight="fill" />
                <span>مكتملة</span>
                <span className="heading-count">٤</span>
              </div>
              <div className="completed-preview">
                <span className="completed-check"><Check size={12} weight="bold" /></span>
                <span>الرد على رسائل الصباح</span>
                <span>08:45 ص</span>
              </div>
            </section>

            <aside className="workspace-rail">
              <section className="focus-panel">
                <div className="focus-panel-heading">
                  <span className="focus-icon"><Sparkle size={18} weight="fill" /></span>
                  <span>مساحة التركيز</span>
                  <DotsThree size={20} />
                </div>
                <p className="focus-label">مهمتك التالية</p>
                <h3>إرسال النسخة الأولى من العرض</h3>
                <div className="focus-project"><i className="project-dot dot-coral" />العمل</div>
                <div className="focus-divider" />
                <div className="focus-time"><Clock size={15} /><span>موعدها</span><strong>11:00 ص</strong></div>
                <div className="focus-footer"><span><i />جلسة تركيز مقترحة</span><strong>٢٥ دقيقة</strong></div>
              </section>

              <section className="week-panel" id="week">
                <div className="week-panel-heading">
                  <div><h2>هذا الأسبوع</h2><p>{weekRange}</p></div>
                  <button type="button" aria-label="عرض التقويم"><CalendarBlank size={17} /></button>
                </div>
                <div className="week-days" aria-label="أيام الأسبوع">
                  {weekDays.map((day) => (
                    <span className={day.toDateString() === now.toDateString() ? 'day-current' : ''} key={day.toISOString()}>
                      <small>{weekDayLabels[day.getDay()]}</small>
                      <b>{new Intl.DateTimeFormat('ar-u-nu-arab', { day: 'numeric' }).format(day)}</b>
                    </span>
                  ))}
                </div>
                <div className="week-summary"><span>إنجازك هذا الأسبوع</span><strong>١٢ من ٢٠ مهمة</strong></div>
                <div className="week-progress"><i /></div>
              </section>

              <div className="daily-note">
                <span className="note-mark">“</span>
                <p>لا تحتاج أن تنجز كل شيء اليوم. فقط ابدأ.</p>
                <span>تذكير صغير</span>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
