'use client';

import {
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
  DotsThree,
  House,
  ListChecks,
  Plus,
  SignOut,
  Target,
} from '@phosphor-icons/react';
import { addTask, deleteTask, signOut, toggleTask, updateTask } from '@/app/actions';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type DashboardProps = {
  tasks: Task[];
  taskError: boolean;
};

const navigation = [
  { label: 'Overview', icon: House, href: '#overview' },
  { label: 'My tasks', icon: ListChecks, href: '#today', active: true },
];

export default function Dashboard({ tasks, taskError }: DashboardProps) {
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const completionRate = tasks.length === 0 ? 0 : Math.round((completedTasks.length / tasks.length) * 100);
  const number = new Intl.NumberFormat('en-US');
  const now = new Date();
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now);

  return (
    <main className="grid min-h-screen grid-cols-[246px_minmax(0,1fr)] bg-[#f7f8f4] font-sans text-[#1d302b] max-[820px]:grid-cols-[66px_minmax(0,1fr)] max-[580px]:grid-cols-1" dir="ltr">
      <aside className="sticky top-0 flex h-screen flex-col border-r border-[#e7ebe5] bg-white px-[17px] pt-[27px] pb-[18px] max-[820px]:items-center max-[820px]:px-2 max-[580px]:static max-[580px]:block max-[580px]:h-auto max-[580px]:min-h-0 max-[580px]:border-r-0 max-[580px]:border-b max-[580px]:px-4 max-[580px]:pt-3 max-[580px]:pb-2" aria-label="Main navigation">
        <a className="mb-[43px] flex items-center gap-2.5 px-2 text-[15px] font-bold text-[#1d302b] no-underline max-[820px]:mb-[38px] max-[820px]:justify-center max-[580px]:mb-2 max-[580px]:w-fit max-[580px]:justify-start max-[580px]:px-[3px]" href="#overview">
          <span className="grid size-[34px] shrink-0 place-items-center rounded-[10px_10px_10px_3px] bg-[#176b55] text-white" aria-hidden="true">
            <Check size={19} weight="bold" />
          </span>
          <span className="max-[820px]:hidden max-[580px]:inline">Fin Tasks</span>
        </a>

        <div className="mb-3 px-2.5 text-[10px] font-semibold text-[#9ba59e] max-[820px]:hidden">Workspace</div>
        <nav className="grid gap-1 max-[820px]:w-full max-[580px]:grid-cols-2 max-[580px]:gap-[3px]">
          {navigation.map(({ label, icon: Icon, href, active }) => (
            <a
              key={label}
              className={`flex min-h-[42px] items-center gap-[11px] rounded-[5px] px-[11px] text-xs no-underline transition-colors max-[820px]:justify-center max-[820px]:px-0 max-[580px]:min-h-[37px] ${active ? 'bg-[#eaf3ed] font-bold text-[#155f4b]' : 'text-[#66756d] hover:bg-[#f6f8f4] hover:text-[#1d302b]'}`}
              href={href}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={19} weight={active ? 'fill' : 'regular'} />
              <span className="max-[820px]:hidden">{label}</span>
            </a>
          ))}
        </nav>

      </aside>

      <section className="min-w-0" id="overview">
        <header className="flex h-[66px] items-center justify-between border-b border-[#e9ede8] bg-white/80 px-[clamp(24px,4.5vw,68px)] max-[580px]:h-14 max-[580px]:px-4">
          <div className="flex items-center gap-2.5 text-[11px] text-[#97a19a] max-[580px]:gap-1.5 max-[580px]:text-[9px]"><span>Workspace</span><ArrowRight size={14} /><strong className="font-semibold text-[#40534a]">My tasks</strong></div>
          <form action={signOut}>
            <button className="grid size-[34px] place-items-center rounded-[5px] border-0 bg-transparent text-[#6f7d75] hover:bg-[#edf3ed] hover:text-[#3c6552]" type="submit" aria-label="Sign out" title="Sign out">
              <SignOut size={19} />
            </button>
          </form>
        </header>

        <div className="mx-auto w-[calc(100%-72px)] max-w-[1130px] py-[38px] pb-[58px] max-[1120px]:w-[calc(100%-48px)] max-[580px]:w-[calc(100%-32px)] max-[580px]:pt-[25px]">
          <section className="mb-[25px]">
            <div>
              <p className="mb-[11px] text-[11px] text-[#76877d]">{today}</p>
              <h1 className="m-0 text-[clamp(22px,2.3vw,29px)] leading-[1.55] font-bold text-[#20352c] max-[580px]:text-xl">Welcome back. Let’s make progress.</h1>
              <p className="mt-1 max-w-[240px] text-[11px] leading-[1.7] text-[#8a9890]">Keep your priorities clear and move one task at a time.</p>
            </div>
          </section>

          <section className="grid min-h-[98px] grid-cols-3 rounded-md border border-[#e8ede7] bg-white max-[580px]:min-h-[78px]" aria-label="Task summary">
            <div className="grid grid-cols-[38px_auto_1fr] content-center items-center gap-[9px] px-5 py-[17px] max-[1120px]:grid-cols-[34px_auto] max-[1120px]:px-[13px] max-[580px]:flex max-[580px]:flex-col max-[580px]:justify-center max-[580px]:gap-1.5 max-[580px]:px-[3px] max-[580px]:py-[9px] max-[580px]:text-center">
              <span className="grid size-9 place-items-center rounded-[5px] bg-[#e9f3e9] text-[#34745b] max-[580px]:hidden"><ListChecks size={18} /></span>
              <div className="grid gap-[3px] max-[580px]:gap-1">
                <strong className="text-[19px] leading-none text-[#2b4036] max-[580px]:text-[17px]">{number.format(tasks.length)}</strong>
                <span className="text-[9px] text-[#86948b] max-[580px]:text-[8px]">Total tasks</span>
              </div>
              <small className="justify-self-end whitespace-nowrap text-[9px] text-[#86948b] max-[1120px]:hidden">{number.format(completedTasks.length)} completed</small>
            </div>
            <div className="grid grid-cols-[38px_auto_1fr] content-center items-center gap-[9px] border-l border-[#edf0eb] px-5 py-[17px] max-[1120px]:grid-cols-[34px_auto] max-[1120px]:px-[13px] max-[580px]:flex max-[580px]:flex-col max-[580px]:justify-center max-[580px]:gap-1.5 max-[580px]:px-[3px] max-[580px]:py-[9px] max-[580px]:text-center">
              <span className="grid size-9 place-items-center rounded-[5px] bg-[#fbefe6] text-[#b7734f] max-[580px]:hidden"><Clock size={18} /></span>
              <div className="grid gap-[3px] max-[580px]:gap-1">
                <strong className="text-[19px] leading-none text-[#2b4036] max-[580px]:text-[17px]">{number.format(activeTasks.length)}</strong>
                <span className="text-[9px] text-[#86948b] max-[580px]:text-[8px]">Remaining</span>
              </div>
              <small className="justify-self-end whitespace-nowrap text-[9px] text-[#86948b] max-[1120px]:hidden">Tasks to complete</small>
            </div>
            <div className="grid grid-cols-[38px_auto_minmax(55px,1fr)] content-center items-center gap-[9px] border-l border-[#edf0eb] px-5 py-[17px] max-[1120px]:flex max-[1120px]:flex-col max-[1120px]:justify-center max-[1120px]:px-[13px] max-[1120px]:py-[15px] max-[1120px]:text-center max-[580px]:gap-1.5 max-[580px]:px-[3px] max-[580px]:py-[9px]">
              <span className="grid size-9 place-items-center rounded-[5px] bg-[#eaf1f5] text-[#5c7f97] max-[580px]:hidden"><Target size={18} /></span>
              <div className="grid gap-[3px] max-[580px]:gap-1">
                <strong className="text-[19px] leading-none text-[#2b4036] max-[580px]:text-[17px]">{number.format(completionRate)}%</strong>
                <span className="text-[9px] text-[#86948b] max-[580px]:text-[8px]">Completion</span>
              </div>
              <span className="h-[5px] overflow-hidden rounded-full bg-[#edf1ec] max-[1120px]:hidden"><i className="block h-full rounded-full bg-[#5c9876]" style={{ width: `${completionRate}%` }} /></span>
            </div>
          </section>

          <div className="mt-[35px] grid grid-cols-1 items-start gap-[26px] max-[1120px]:gap-[18px] max-[580px]:mt-[27px]">
            <section className="min-w-0" id="today">
              <div className="mb-[18px] flex items-end justify-between max-[580px]:items-start">
                <div>
                  <h2 className="m-0 flex items-center gap-[9px] text-base text-[#2b4036] max-[580px]:text-sm">My tasks <span className="grid min-w-[21px] h-5 place-items-center rounded bg-[#e9efea] text-[10px] font-semibold text-[#6a7e72]">{number.format(tasks.length)}</span></h2>
                  <p className="mt-[5px] text-[10px] text-[#909c94]">Everything you need to get done.</p>
                </div>
              </div>

              {taskError && <p className="mb-[9px] text-[11px] text-[#a45248]" role="alert">We couldn’t save that task. Check the details and try again.</p>}

              <form action={addTask} className="flex min-h-[55px] items-center gap-[11px] rounded-md border border-[#e1e9df] bg-white px-2 py-[7px] pl-[13px] shadow-[0_4px_15px_rgb(31_63_44_/_3%)] max-[580px]:gap-[7px] max-[580px]:p-1.5" aria-label="Add a task">
                <span className="grid size-[25px] shrink-0 place-items-center rounded-[5px] bg-[#edf5ed] text-[#34775d]"><Plus size={20} weight="bold" /></span>
                <input className="h-9 w-full min-w-0 border-0 bg-transparent text-[11px] text-[#34473d] outline-none placeholder:text-[#a0aaa3]" type="text" name="title" maxLength={120} required placeholder="What needs to get done?" aria-label="New task title" />
                <span className="shrink-0 text-[9px] text-[#aab2ac] max-[580px]:hidden">⌘ ↵</span>
                <button type="submit" className="inline-flex min-h-[35px] shrink-0 items-center gap-[5px] rounded bg-[#176b55] px-[10px] text-[10px] text-white hover:bg-[#105640] max-[580px]:min-h-[33px] max-[580px]:gap-0.5 max-[580px]:px-[7px] max-[580px]:text-[9px]"><Plus size={17} />Add task</button>
              </form>

              <div className="mt-[25px] mb-[5px] flex justify-between px-0.5 text-[10px] text-[#839188]">
                <span>To do</span>
                <span className="text-[9px] text-[#9ba59e]">{number.format(activeTasks.length)} tasks</span>
              </div>
              <ul className="m-0 list-none border-t border-[#e7ece6] p-0">
                {activeTasks.map((task) => (
                  <li className="flex min-h-[69px] items-center gap-3 border-b border-[#e9ede8] max-[580px]:min-h-16 max-[580px]:gap-2" key={task.id}>
                    <form action={toggleTask}>
                      <input type="hidden" name="id" value={task.id} />
                      <input type="hidden" name="completed" value="false" />
                      <button className="grid size-[18px] place-items-center rounded-full border-[1.5px] border-[#bdcbc0] bg-transparent p-0 text-white" type="submit" aria-label={`Complete: ${task.title}`} />
                    </form>
                    <span className="min-w-0 flex-1">
                      <strong className="break-words text-[11px] font-semibold text-[#34463c] max-[580px]:text-[10px]">{task.title}</strong>
                    </span>
                    <details className="relative w-[27px] shrink-0 max-[580px]:w-[22px]">
                      <summary className="grid h-[30px] w-full cursor-pointer list-none place-items-center rounded text-[#9ca69f] hover:bg-[#edf3ed] hover:text-[#3c6552]" aria-label={`Options for ${task.title}`}><DotsThree size={21} weight="bold" /></summary>
                      <div className="absolute top-full right-0 z-10 grid min-w-[190px] gap-2 rounded-md border border-[#e1e9df] bg-white p-2.5 shadow-lg">
                        <form action={updateTask} className="grid gap-1.5">
                          <input type="hidden" name="id" value={task.id} />
                          <input className="h-[31px] min-w-0 rounded border border-[#e1e9df] px-[7px] text-[10px] text-[#34473d]" type="text" name="title" defaultValue={task.title} maxLength={120} required aria-label="Edit task title" />
                          <button className="min-h-7 rounded bg-[#f0f5ef] px-2 text-left text-[10px] text-[#456452]" type="submit">Save changes</button>
                        </form>
                        <form action={deleteTask}>
                          <input type="hidden" name="id" value={task.id} />
                          <button className="min-h-7 w-full rounded bg-[#fbefed] px-2 text-left text-[10px] text-[#a45248]" type="submit">Delete task</button>
                        </form>
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
              {activeTasks.length === 0 && <p className="my-3.5 text-[11px] text-[#909c94]">No tasks to do. Add one above to get started.</p>}

              <div className="mt-6 mb-2 flex items-center gap-2 text-[11px] text-[#6e8c78]" id="completed">
                <CheckCircle size={17} weight="fill" />
                <span>Completed</span>
                <span className="ml-px grid h-[18px] min-w-[19px] place-items-center rounded bg-[#e9f0e9] text-[9px] text-[#7b9382]">{number.format(completedTasks.length)}</span>
              </div>
              {completedTasks.map((task) => (
                <div className="flex min-h-12 items-center gap-2.5 rounded bg-[#f0f3ee] px-[9px] text-[10px] text-[#a2aca4]" key={task.id}>
                  <form action={toggleTask}>
                    <input type="hidden" name="id" value={task.id} />
                    <input type="hidden" name="completed" value="true" />
                    <button className="grid size-4 place-items-center rounded-full border-0 bg-[#83a38c] p-0 text-white" type="submit" aria-label={`Reopen: ${task.title}`}><Check size={12} weight="bold" /></button>
                  </form>
                  <span className="flex-1 line-through">{task.title}</span>
                  <form action={deleteTask}>
                    <input type="hidden" name="id" value={task.id} />
                    <button className="min-h-7 rounded bg-[#fbefed] px-2 text-[10px] text-[#a45248]" type="submit">Delete</button>
                  </form>
                </div>
              ))}
            </section>

          </div>
        </div>
      </section>
    </main>
  );
}
