import React, { useState } from 'react';
import {
  ExternalLink, ChevronDown, ChevronUp, BookOpen, ClipboardCheck,
  FileSpreadsheet, BarChart2, Lightbulb, Info, FileText, Users,
  DollarSign, Send, Package, Archive, FolderOpen, Printer, Camera,
  Megaphone, Gavel, Star, Search, ClipboardList, BookMarked, AlertCircle,
  X, CheckCircle2, Copy, AlertTriangle, ArrowRight, Zap, ShieldAlert,
  HelpCircle, ChevronRight, Circle, GitBranch, RefreshCw, FileWarning,
  BookCheck, Layers, ReceiptText,
} from 'lucide-react';

/* ─── Google Sheets Quick-Links ─── */
const SHEET_LINKS = [
  {
    label: 'PR Logging Sheet',
    desc: 'Log incoming Purchase Requests, generate PR numbers, and record PR details.',
    icon: ClipboardCheck,
    color: 'from-blue-600/20 to-blue-800/10 border-blue-500/30 hover:border-blue-400/60',
    badge: 'bg-blue-500/15 text-blue-300',
    url: 'https://docs.google.com/spreadsheets/d/1H5IDE5TKXM2HXcQ-kcKK3BA_JkGiqQVR8yoXo8L9p6E/edit?gid=1039687665#gid=1039687665',
  },
  {
    label: 'Procurement Monitoring',
    desc: 'Track all procurement projects from PR for Action through completion. Update statuses here.',
    icon: BarChart2,
    color: 'from-indigo-600/20 to-indigo-800/10 border-indigo-500/30 hover:border-indigo-400/60',
    badge: 'bg-indigo-500/15 text-indigo-300',
    url: 'https://docs.google.com/spreadsheets/d/1VYI9G49VEvogsHHD9pyOJ8NLkf-7spU7GSpPTwAMx84/edit?gid=1943246738#gid=1943246738',
  },
  {
    label: 'PMR (Monitoring Report)',
    desc: 'Quarterly GPPB Procurement Monitoring Report. Input completed procurement data here.',
    icon: FileSpreadsheet,
    color: 'from-violet-600/20 to-violet-800/10 border-violet-500/30 hover:border-violet-400/60',
    badge: 'bg-violet-500/15 text-violet-300',
    url: 'https://docs.google.com/spreadsheets/d/1hUMv_yzk1ON4JNij9WV6zH5VB9hW0o0t/edit?gid=519805908#gid=519805908',
  },
];

/* ─── Error/Warning Node Component ─── */
const ErrorNode = ({ type = 'warning', title, items }) => {
  const styles = {
    warning: {
      wrap: 'bg-amber-500/8 border-amber-500/30 text-amber-300',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />,
      label: 'text-amber-400',
      dot: 'bg-amber-500/50',
    },
    error: {
      wrap: 'bg-red-500/8 border-red-500/30 text-red-300',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />,
      label: 'text-red-400',
      dot: 'bg-red-500/50',
    },
    tip: {
      wrap: 'bg-sky-500/8 border-sky-500/30 text-sky-300',
      icon: <Lightbulb className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />,
      label: 'text-sky-400',
      dot: 'bg-sky-500/50',
    },
    note: {
      wrap: 'bg-slate-500/10 border-slate-500/30 text-slate-400',
      icon: <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />,
      label: 'text-slate-400',
      dot: 'bg-slate-500/50',
    },
  };
  const s = styles[type];
  return (
    <div className={`rounded-lg border p-3 ${s.wrap}`}>
      <div className="flex items-start gap-2">
        {s.icon}
        <div className="flex-1 min-w-0">
          <p className={`text-[10px] font-bold tracking-widest uppercase mb-1.5 ${s.label}`}>{title}</p>
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] leading-relaxed">
                <span className={`flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${s.dot}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ─── Connector Arrow ─── */
const Connector = ({ label }) => (
  <div className="flex flex-col items-center py-1">
    <div className="w-px h-4 bg-gradient-to-b from-slate-600 to-slate-700" />
    {label && (
      <span className="text-[9px] font-bold tracking-widest text-slate-600 uppercase px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 my-0.5">
        {label}
      </span>
    )}
    <div className="w-px h-4 bg-gradient-to-b from-slate-700 to-slate-800" />
    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-600" />
  </div>
);

/* ─── Step Card ─── */
const StepCard = ({ step, index, total }) => {
  const [open, setOpen] = useState(false);
  const Icon = step.icon;

  return (
    <div className="relative">
      {/* Step Number Line */}
      <div className="flex items-stretch gap-3">
        {/* Left timeline */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${step.timelineColor} bg-[#0a0a18] z-10`}>
            <span className="text-[10px] font-black text-white">{index + 1}</span>
          </div>
          {index < total - 1 && (
            <div className="w-px flex-1 mt-1 bg-gradient-to-b from-slate-700/80 to-transparent" style={{ minHeight: '1rem' }} />
          )}
        </div>

        {/* Card */}
        <div className={`flex-1 mb-3 rounded-xl border ${step.color} overflow-hidden transition-all duration-200`}>
          <button
            onClick={() => setOpen(o => !o)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 ${step.headerColor} transition-colors hover:brightness-110 text-left`}
          >
            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-black/30 flex items-center justify-center">
              <Icon className="w-3.5 h-3.5 text-white/70" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[9px] font-bold tracking-widest px-2 py-0.5 rounded ${step.badgeColor}`}>{step.categoryLabel}</span>
                {step.isOptional && (
                  <span className="text-[9px] font-bold tracking-widest px-2 py-0.5 rounded bg-slate-500/20 text-slate-400">OPTIONAL</span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-slate-100 mt-0.5">{step.title}</h3>
              {!open && step.shortDesc && (
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">{step.shortDesc}</p>
              )}
            </div>
            <div className="flex-shrink-0">
              {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </button>

          {open && (
            <div className="px-4 py-4 space-y-4 border-t border-white/5">
              {step.description && (
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              )}

              {step.analogy && (
                <div className="bg-amber-500/8 border border-amber-500/25 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[9px] font-bold tracking-widest text-amber-400 uppercase">Real-Life Analogy</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">{step.analogy}</p>
                </div>
              )}

              {step.tasks && step.tasks.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Info className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Tasks / Steps</span>
                  </div>
                  <ol className="space-y-2.5">
                    {step.tasks.map((task, i) => (
                      <li key={i}>
                        <div className="flex items-start gap-2.5">
                          <span className="flex-shrink-0 w-[18px] h-[18px] mt-0.5 rounded-full bg-slate-700/60 flex items-center justify-center text-[9px] font-bold text-slate-400">{i + 1}</span>
                          <span className="text-xs text-slate-300 leading-relaxed">{task.main}</span>
                        </div>
                        {task.subs && task.subs.length > 0 && (
                          <ul className="mt-1.5 ml-7 space-y-1">
                            {task.subs.map((sub, j) => (
                              <li key={j} className="flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
                                <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-slate-600" />
                                {sub}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Error/Warning/Tip nodes */}
              {step.nodes && step.nodes.length > 0 && (
                <div className="space-y-2.5 pt-1">
                  {step.nodes.map((node, i) => (
                    <ErrorNode key={i} type={node.type} title={node.title} items={node.items} />
                  ))}
                </div>
              )}

              {/* Monitoring Sheet update block */}
              {step.monitoringUpdate && (
                <div className="bg-indigo-500/8 border border-indigo-500/25 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[9px] font-bold tracking-widest text-indigo-400 uppercase">Procurement Monitoring Sheet — Update</span>
                  </div>
                  <ul className="space-y-1">
                    {step.monitoringUpdate.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
                        <ChevronRight className="w-3 h-3 text-indigo-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Process Section (vertical flow) ─── */
const ProcessSection = ({ title, subtitle, icon: Icon, accentClass, steps }) => {
  return (
    <div className={`rounded-2xl border ${accentClass} overflow-hidden`}>
      <div className={`px-5 py-4 border-b ${accentClass} bg-gradient-to-r ${accentClass.replace('border-', 'from-').replace('/40', '/10')} to-transparent`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black/40 flex items-center justify-center border border-white/10">
            <Icon className="w-4.5 h-4.5 text-white/70" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">{title}</h2>
            {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
      </div>
      <div className="p-4 pt-5">
        {steps.map((step, index) => (
          <StepCard key={step.id} step={step} index={index} total={steps.length} />
        ))}
      </div>
    </div>
  );
};

/* ─── Shared / Common Steps ─── */
const SHARED_STEPS_BEFORE = [
  {
    id: 's1', category: 'common', categoryLabel: 'COMMON',
    title: 'PR Logging',
    icon: ClipboardList,
    timelineColor: 'border-indigo-400',
    color: 'border-indigo-500/40 bg-indigo-500/5',
    headerColor: 'bg-indigo-500/10',
    badgeColor: 'bg-indigo-500/20 text-indigo-300',
    shortDesc: 'Receive, stamp, number, and route incoming Purchase Requests.',
    analogy: "Think of this like a front-desk officer in a hospital receiving a patient's admission form. You stamp it with the time and date received, assign it a number, and decide where it goes next — all before any treatment begins.",
    description: "The very first step in the procurement process. When an End User brings a Purchase Request (PR), the BAC Secretariat logs it into the system, assigns a PR number, and processes it before routing it back or retaining it for action.",
    tasks: [
      { main: 'Log in to the GSD Gmail Account to check for any incoming PR-related communications.', subs: [] },
      { main: 'Open the PR Google Sheet. Perform data entry and generate a new PR Number for the incoming request.', subs: [] },
      { main: 'Write the generated PR Number clearly on the PR form itself for reference.', subs: [] },
      { main: 'Stamp "RECEIVED" on the back of the PR form and write the exact time and date of receipt.', subs: [] },
      { main: 'Bring the PR to the BAC Secretariat Head for initial review and signature.', subs: [] },
      {
        main: 'Log the PR Out (only if the End User cannot wait and needs to take the PR back temporarily):',
        subs: [
          'Stamp the date on the PR.',
          'Write a note: "Returned PR# [YYYY-MMM-PRN] to End User (For Signature — if PR is not yet signed)".',
          'Record the Project Title of the PR.',
        ],
      },
      { main: 'Return the signed PR to the End User and allow them to proceed with their own processing.', subs: [] },
    ],
    nodes: [
      {
        type: 'warning',
        title: 'Common Mistakes',
        items: [
          'Forgetting to stamp "RECEIVED" with exact time — this is required for audit trail.',
          'Skipping the log-out entry when returning the PR to the End User temporarily.',
          'Not writing the PR Number on the physical PR form — number it before routing.',
        ],
      },
      {
        type: 'note',
        title: 'Important Notes',
        items: [
          'Always check the Gmail account first before doing any logging — there may be PRs sent digitally.',
          'The PR Number format follows: YYYY-MMM-PRN (e.g., 2025-MAR-001).',
          'If the PR is not yet signed by the End User, do not accept it for full processing — return it with a note.',
        ],
      },
    ],
  },
  {
    id: 's2', category: 'optional', categoryLabel: 'OPTIONAL',
    isOptional: true,
    title: 'Budget Certification (CAF)',
    icon: DollarSign,
    timelineColor: 'border-yellow-400',
    color: 'border-yellow-500/40 bg-yellow-500/5',
    headerColor: 'bg-yellow-500/10',
    badgeColor: 'bg-yellow-500/20 text-yellow-300',
    shortDesc: 'Forward PR to Budget Division for Certificate of Availability of Funds.',
    analogy: "Like checking if there's enough money in your wallet before placing an order at a restaurant. The Budget Division confirms funds exist before any spending commitment is made.",
    description: "This step is optional and is only performed if the End User requests it. Normally, End Users are responsible for submitting their PR to the Budget Division themselves. However, if they ask the BAC Secretariat to assist, you will forward or receive the PR on their behalf.",
    tasks: [
      { main: 'Receive the PR and accompanying documents from the End User (or on their behalf).', subs: [] },
      { main: 'Bring or forward the PR to the Budget Division for processing of Budget Allocation for the specific project.', subs: [] },
      { main: 'Wait for the Budget Division to certify the availability of funds and attach the Certificate of Availability of Funds (CAF).', subs: [] },
    ],
    nodes: [
      {
        type: 'note',
        title: 'When This Step Applies',
        items: [
          'Only performed when the End User explicitly asks the BAC Secretariat to handle this on their behalf.',
          'In most cases, the End User goes to the Budget Division themselves — do not do this step automatically.',
          'Without a CAF, no procurement can proceed. The End User must secure this before the PR is acted upon.',
        ],
      },
    ],
  },
  {
    id: 's3', category: 'common', categoryLabel: 'COMMON',
    title: 'PR for Action',
    icon: ClipboardCheck,
    timelineColor: 'border-blue-400',
    color: 'border-blue-500/40 bg-blue-500/5',
    headerColor: 'bg-blue-500/10',
    badgeColor: 'bg-blue-500/20 text-blue-300',
    shortDesc: 'Formally enter the PR into the monitoring system and stamp mode of procurement.',
    analogy: "Think of this as officially registering a patient into a hospital ward. Once the PR is fully received and signed, it is formally entered into the monitoring system, stamped with the procurement mode, and assigned to the appropriate process.",
    description: "Once the PR has been properly signed and returned by the End User, the BAC Secretariat receives it again and formally records it in the Procurement Monitoring Google Sheet as 'PR for Action.' The PR is also stamped with the applicable Mode of Procurement.",
    tasks: [
      { main: 'Open the Procurement Monitoring Google Sheet.', subs: [] },
      {
        main: 'Input the PR data under the appropriate fields:',
        subs: [
          'PR Number',
          'Project Title',
          'End User (requesting office/division)',
          'ABC (Approved Budget for the Contract) amount',
          'Status → set to "Not Yet Acted"',
          'Date of Current Status (today\'s date)',
          'Remarks → write "PR for Action"',
          'Assign the date in the "Received PR for Action" column',
          'Notes → enter your name as the modifier',
        ],
      },
      {
        main: 'Stamp the Mode of Procurement on the PR form and check the applicable type:',
        subs: [
          'Shopping — used only when accompanied by a Certificate of Non-Availability of Stocks (mostly Supplies, Office Equipment, Janitorial/Cleaning Equipment)',
          'SVP (Small Value Procurement) — for amounts above ₱50,000 and also for amounts ₱50,000 and below when applicable',
          'Regular Bidding — for amounts ₱1,000,000 and above',
        ],
      },
      { main: 'Check the appropriate ABC bracket on the form: check "No" for PhilGEPS/BAC Reso if below ₱50,000; check "Yes" if ₱50,000 and above.', subs: [] },
      { main: 'Bring the stamped PR to the BAC Secretariat Head for signature.', subs: [] },
    ],
    monitoringUpdate: [
      'PR Number → project identifier',
      'Project Title',
      'End User',
      'ABC amount',
      'Status → "Not Yet Acted"',
      'Date of Current Status → today\'s date',
      'Remarks → "PR for Action"',
      '"Received PR for Action" column → today\'s date',
      'Notes → your name as modifier',
    ],
    nodes: [
      {
        type: 'warning',
        title: 'Mode of Procurement — How to Decide',
        items: [
          'Shopping: ONLY applicable when there is a Certificate of Non-Availability of Stocks from the supplier.',
          'SVP: Used for above ₱50,000 AND for ₱50,000 and below when applicable.',
          'Regular Bidding: Mandatory for ₱1,000,000 and above.',
          'PhilGEPS/BAC Reso checkbox: check "No" if below ₱50K, check "Yes" if ₱50K and above.',
        ],
      },
    ],
  },
  {
    id: 's4', category: 'common', categoryLabel: 'COMMON',
    title: 'PR Deliberation (BAC Regular Meeting)',
    icon: Gavel,
    timelineColor: 'border-violet-400',
    color: 'border-violet-500/40 bg-violet-500/5',
    headerColor: 'bg-violet-500/10',
    badgeColor: 'bg-violet-500/20 text-violet-300',
    shortDesc: 'BAC Members formally review, discuss, and approve PRs at a scheduled meeting.',
    analogy: "This is like a board meeting where key decision-makers review project proposals, ask questions, and vote on whether to proceed. PRs are presented, discussed, and either approved or returned for corrections.",
    description: "The BAC holds a regular meeting to formally deliberate on all submitted PRs. The BAC Secretariat assists in setting up the meeting, managing technology and attendance, and updating records afterward.",
    tasks: [
      { main: 'Assist in conducting the BAC Regular Meeting by preparing the venue and necessary materials.', subs: [] },
      { main: 'Circulate the attendance sheet for all BAC Members and observers to sign.', subs: [] },
      { main: 'Set up a Zoom Meeting and send the meeting link through the official Procurement Gmail Account (procurement@piamo.gov.ph / PIABACSEC2025@).', subs: [] },
      {
        main: 'Manage the technical setup for the meeting:',
        subs: [
          'Ensure the TV, PC, and amplifier are working.',
          'Connect Zoom for COA (Commission on Audit) remote attendance.',
          'Start the Zoom recording for transparency documentation.',
          'Extract a backup copy of the recording for the BAC Office files.',
        ],
      },
      { main: 'After the BAC Members approve each PR, collect their initial signatures on the relevant PR forms.', subs: [] },
    ],
    monitoringUpdate: [
      'Locate the PR by its PR Number',
      '"PR Deliberated" column → today\'s date',
      '"Date of Current Status" column → today\'s date',
      'Status → "In Progress"',
      'Remarks → "For PhilGEPS Posting"',
      'Notes → your name as modifier',
    ],
    nodes: [
      {
        type: 'tip',
        title: 'Zoom Meeting Tips',
        items: [
          'Always send the Zoom link through the official procurement Gmail account — not personal accounts.',
          'Start the recording before the deliberation begins, not after.',
          'Save a backup of the Zoom recording to the BAC Office shared drive immediately after the meeting.',
          'The COA representative typically joins via Zoom — ensure they are admitted and can hear/see clearly.',
        ],
      },
      {
        type: 'error',
        title: 'If the Meeting Cannot Push Through',
        items: [
          'Notify all BAC Members and relevant parties as early as possible.',
          'Do NOT update the Procurement Monitoring sheet with deliberation dates if no meeting occurred.',
          'Re-schedule and send an updated Zoom invite through the procurement Gmail account.',
        ],
      },
    ],
  },
];

const SHARED_STEPS_AFTER = [
  {
    id: 'sa1', category: 'common', categoryLabel: 'COMMON',
    title: 'Abstract for Purchase Order (Forward to GSD)',
    icon: Package,
    timelineColor: 'border-cyan-400',
    color: 'border-cyan-500/40 bg-cyan-500/5',
    headerColor: 'bg-cyan-500/10',
    badgeColor: 'bg-cyan-500/20 text-cyan-300',
    shortDesc: 'Compile, scan, and forward all procurement documents to GSD for PO issuance.',
    analogy: "Like filing and forwarding the finalized contract to the purchasing department so they can place the actual order. This is the handoff from the BAC Office to GSD for order processing.",
    description: "Once all documents are signed, the BAC Secretariat compiles, scans, and forwards the procurement documents to the GSD (General Services Division) for preparation of the Purchase Order.",
    tasks: [
      { main: 'Scan all compiled procurement documents for the BAC Office\'s digital archive copy.', subs: [] },
      { main: 'Photocopy the BAC Checklist.', subs: [] },
      {
        main: 'Prepare the document package to be forwarded to GSD. Include:',
        subs: [
          '1 copy of the Abstract of Quotations',
          '1 copy of the BAC Resolution (for 50K and above — and even below if the procurement failed)',
          '1 draft copy of the Abstract',
          '1 copy of the Purchase Request (with PR Form Slip)',
          'Any other papers with doctored or annotated information',
        ],
      },
      {
        main: 'Log the outgoing documents in the BAC Outgoing Log Book:',
        subs: [
          'Indicate whether the procurement is "Below 50K" or "Above 50K".',
          'Stamp the date for the "RFQ for Canvass" column and "Abstract for P.O." column.',
        ],
      },
      { main: 'Receive (hand over) the Abstract to GSD — specifically the copy that has the PR Form Slip attached.', subs: [] },
    ],
    monitoringUpdate: [
      '"Forwarded to GSD for P.O." column → today\'s date',
      'Status → "Completed"',
      'Notes → your name as modifier',
    ],
    nodes: [
      {
        type: 'warning',
        title: 'Before Forwarding to GSD — Checklist',
        items: [
          'Ensure all BAC Member signatures are complete on the Abstract and BAC Resolution.',
          'Confirm the PR Form Slip has PR Number, Received Date, Acted Date, and Published Date filled in.',
          'Do not forward to GSD until all required signatures are obtained.',
          'Log the outgoing entry in the BAC Outgoing Log Book before releasing documents.',
        ],
      },
    ],
  },
  {
    id: 'sa2', category: 'common', categoryLabel: 'COMMON',
    title: 'Purchase Order Processing (GSD)',
    icon: ReceiptText,
    timelineColor: 'border-slate-400',
    color: 'border-slate-500/40 bg-slate-500/5',
    headerColor: 'bg-slate-500/10',
    badgeColor: 'bg-slate-500/20 text-slate-300',
    shortDesc: 'GSD issues PO to supplier, coordinates delivery, and inspects items.',
    analogy: "The final handoff — like handing your completed order form to the store cashier. GSD takes over from here to contact the supplier, confirm the order, arrange delivery, and inspect the items.",
    description: "The GSD (General Services Division) takes over from the BAC Office at this stage. GSD is responsible for issuing the formal Purchase Order to the winning supplier, coordinating the delivery, and conducting inspection of the items delivered.",
    tasks: [
      { main: 'GSD issues the Purchase Order to the winning supplier.', subs: [] },
      { main: 'GSD coordinates with the supplier for the scheduling and delivery of items.', subs: [] },
      { main: 'GSD conducts an inspection of delivered items upon receipt.', subs: [] },
    ],
    nodes: [
      {
        type: 'note',
        title: 'BAC Secretariat Role at This Stage',
        items: [
          'BAC Secretariat\'s role effectively ends once documents are forwarded to GSD.',
          'If GSD encounters discrepancies in the documents, they will refer back to the BAC Office.',
          'Monitor the status and follow up with GSD if the PO is delayed significantly.',
        ],
      },
    ],
  },
  {
    id: 'sa3', category: 'common', categoryLabel: 'COMMON',
    title: 'PMR (Procurement Monitoring Report)',
    icon: BarChart2,
    timelineColor: 'border-violet-400',
    color: 'border-violet-500/40 bg-violet-500/5',
    headerColor: 'bg-violet-500/10',
    badgeColor: 'bg-violet-500/20 text-violet-300',
    shortDesc: 'Input completed procurement data into the quarterly GPPB-required report.',
    analogy: "Like submitting a quarterly performance report to management — you record all completed procurement activities, including costs and timelines, as a formal accountability document.",
    description: "The Procurement Monitoring Report (PMR) is a GPPB-required report that documents all procurement activities. The BAC Secretariat fills in each completed procurement's details. Failed procurements are NOT included.",
    tasks: [
      {
        main: 'Open the PMR Google Sheet and input data for each completed procurement (excluding failed ones):',
        subs: [
          'PR Number',
          'Procurement Project Title',
          'End User (requesting division/office)',
          'Mode of Procurement (e.g., SVP, Shopping, Regular Bidding)',
          'Date of Opening of Bids',
          'Date of Bid Evaluation',
          'ABC — total amount and MOOE breakdown',
          'Contract Cost — total amount and MOOE breakdown',
        ],
      },
      { main: 'Stamp the PMR with "POSTED" and write the current date.', subs: [] },
    ],
    nodes: [
      {
        type: 'warning',
        title: 'PMR Reminders',
        items: [
          'FAILED procurements are NOT included in the PMR — only successfully completed ones.',
          'PMR is submitted quarterly to GPPB — always keep records updated.',
          'MOOE breakdown must be accurate — coordinate with Accounting if needed.',
          'Stamp "POSTED" with the current date after encoding to mark it as submitted/filed.',
        ],
      },
    ],
  },
  {
    id: 'sa4', category: 'common', categoryLabel: 'COMMON',
    title: 'Archive to Drawer & File Tracking',
    icon: Archive,
    timelineColor: 'border-slate-400',
    color: 'border-slate-500/40 bg-slate-500/5',
    headerColor: 'bg-slate-500/10',
    badgeColor: 'bg-slate-500/20 text-slate-300',
    shortDesc: 'Physically file documents and update the digital File Tracking System.',
    analogy: "Like filing a finished case folder in a cabinet organized by month and year. Proper filing ensures documents can be retrieved quickly during audits or future reference.",
    description: "All completed procurement documents are physically filed and archived in the designated drawer or cabinet. The file tracking system is then updated for digital retrieval.",
    tasks: [
      { main: 'Insert the completed procurement documents into the drawer or filing folder designated for the specific month and year of the procurement.', subs: [] },
      {
        main: 'Open the File Tracking System and input all relevant data based on the archived copy:',
        subs: [
          'PR Number',
          'Project Title',
          'End User',
          'Mode of Procurement',
          'ABC amount',
          'Archive location (drawer/folder label)',
        ],
      },
    ],
    nodes: [
      {
        type: 'tip',
        title: 'Filing Tips',
        items: [
          'Always sort documents by Month and Year — this matches how auditors retrieve records.',
          'Label the folder/drawer clearly with the year and month range it covers.',
          'Update the File Tracking System immediately after filing — do not leave it for later.',
        ],
      },
    ],
  },
];

/* ─── Shopping Mode Steps ─── */
const SHOPPING_STEPS = [
  {
    id: 'sh1', category: 'shopping', categoryLabel: 'SHOPPING',
    title: 'RFQ Preparation',
    icon: FileText,
    timelineColor: 'border-sky-400',
    color: 'border-sky-500/40 bg-sky-500/5',
    headerColor: 'bg-sky-500/10',
    badgeColor: 'bg-sky-500/20 text-sky-300',
    shortDesc: 'Prepare the RFQ form, Abstract, and Proof of Service worksheets.',
    analogy: "Like preparing a detailed shopping checklist and price-request form that you send to multiple stores to compare their prices.",
    description: "Shopping mode is used when there is a Certificate of Non-Availability of Stocks. The RFQ is prepared similar to SVP but the rules differ on posting and PhilGEPS requirements.",
    tasks: [
      {
        main: 'Open the RFQ Worksheet and fill in the following fields:',
        subs: [
          'Project Reference Number',
          'Name of Project',
          'Date — use today\'s date (Shopping typically doesn\'t require tomorrow\'s date)',
          'Item Number, Item & Description, Quantity, Unit',
          'Delivery Terms, Date of Delivery, Place of Delivery, Payment Terms',
          'Estimated Total Cost',
        ],
      },
      {
        main: 'Open the Abstract and Proof of Service Worksheets and link data from the RFQ sheet:',
        subs: [
          'Use the "=" formula to pull data automatically from the RFQ sheet.',
          'Press Ctrl + D to duplicate formulas for multiple rows.',
          'Use formulas such as =QTY*UNIT_COST and =SUM(Total) to compute values.',
          'Manually input Unit Cost and Total columns for each supplier\'s quote.',
        ],
      },
      {
        main: 'Double-check before printing:',
        subs: [
          'All monetary values are correct',
          'No spelling errors in item names or project title',
          'Lines, borders, and page margins are suitable for printing',
          'Format and messy data issues resolved',
        ],
      },
      { main: 'If signature images are not appearing in the document, press Ctrl + 6 to toggle image display.', subs: [] },
      { main: 'Print one (1) copy of the RFQ.', subs: [] },
      { main: 'Attach the PR Form Slip to the printed RFQ. Ensure PR Number, Received Date, Acted Date, and Published Date are filled in.', subs: [] },
    ],
    nodes: [
      {
        type: 'note',
        title: 'Shopping vs SVP — Key Differences',
        items: [
          'Shopping requires a Certificate of Non-Availability of Stocks — without this, it CANNOT be Shopping mode.',
          'Shopping is typically for Supplies, Office Equipment, or Janitorial/Cleaning materials.',
          'Shopping does NOT require PhilGEPS posting (unlike SVP above ₱50K).',
          'Shopping does NOT require a 7-day deadline — quotations can be collected more quickly.',
        ],
      },
      {
        type: 'warning',
        title: 'Common Errors in RFQ Preparation',
        items: [
          'Wrong or missing Estimated Total Cost — double-check formula computations.',
          'Signature images not showing — press Ctrl + 6 to toggle.',
          'Messy borders or misaligned rows — preview before printing.',
          'Missing PR Form Slip attachment — always attach before routing.',
        ],
      },
    ],
  },
  {
    id: 'sh2', category: 'shopping', categoryLabel: 'SHOPPING',
    title: 'RFQ Distribution (Canvass)',
    icon: Send,
    timelineColor: 'border-sky-400',
    color: 'border-sky-500/40 bg-sky-500/5',
    headerColor: 'bg-sky-500/10',
    badgeColor: 'bg-sky-500/20 text-sky-300',
    shortDesc: 'Print and distribute RFQ copies; post on Bulletin Board.',
    description: "After the RFQ is finalized, copies are prepared and distributed to suppliers for canvassing. For Shopping mode, there is no PhilGEPS posting requirement.",
    tasks: [
      { main: 'Print four (4) copies of the RFQ and one (1) copy of the Proof of Service.', subs: [] },
      { main: 'Attach/staple an envelope to each of the 3 supplier-copy RFQs. Attach the Proof of Service to the back of one of these copies.', subs: [] },
      { main: 'Attach TOR/Detailed Specifications/Sample Picture if stated on the RFQ — Paper Clip all together.', subs: [] },
      {
        main: 'Record the procurement in the posting log:',
        subs: ['Log whether it\'s Below or Above 50K.', 'PR Number and Project Title.', 'ABC amount.'],
      },
      { main: 'Stamp the date on the left side of the RFQ for Canvass column.', subs: [] },
      { main: 'Submit the 3 supplier copies with envelopes and Proof of Service to BAC Head for acknowledgment and signature.', subs: [] },
      { main: 'Go to the Guard and ask for the Log Book for posting (if applicable).', subs: [] },
      { main: 'Post the 1 Bulletin Board copy of the RFQ on the official Bulletin Board.', subs: [] },
      { main: 'Submit the 3 RFQs with envelopes to the End User / Canvassers for distribution to suppliers.', subs: [] },
    ],
    monitoringUpdate: [
      '"Published" column → today\'s date',
      'Remarks → "For Canvass"',
      'Notes → your name as modifier',
    ],
    nodes: [
      {
        type: 'note',
        title: 'Shopping Mode — No PhilGEPS Required',
        items: [
          'Unlike SVP above ₱50K, Shopping mode does NOT require PhilGEPS posting.',
          'Canvassers (End User representatives) are responsible for distributing to suppliers and collecting quotations.',
          'Proof of Service must be signed by the canvasser before routing for signatures.',
        ],
      },
    ],
  },
  {
    id: 'sh3', category: 'shopping', categoryLabel: 'SHOPPING',
    title: 'Abstract Evaluation & Winner Selection',
    icon: FileSpreadsheet,
    timelineColor: 'border-sky-400',
    color: 'border-sky-500/40 bg-sky-500/5',
    headerColor: 'bg-sky-500/10',
    badgeColor: 'bg-sky-500/20 text-sky-300',
    shortDesc: 'Evaluate supplier quotes, determine LCRB, and request legal documents.',
    description: "After all quotations are collected, the BAC Secretariat evaluates and compares prices to determine the Lowest Calculated Responsive Bid.",
    tasks: [
      { main: 'Put current date in the "Date of Bids Opened" field on the Abstract Worksheet.', subs: [] },
      { main: 'Calculate each supplier\'s total quoted price for all items in the Abstract.', subs: [] },
      {
        main: 'Evaluate and classify each supplier:',
        subs: [
          'LCRB — Lowest Calculated Responsive Bid (the qualified winning supplier)',
          'SCRB — Second Lowest Calculated Responsive Bid',
          '1st LCB, 2nd LCB — other ranked compliant bidders',
          'Non-Compliant — suppliers who did not meet the required specifications',
          'No Bid — suppliers who did not submit any quotation',
        ],
      },
      { main: 'If it is 1 LOT with many items and some items are not compliant, the entire lot may be considered FAILED.', subs: [] },
      { main: 'Contact the winning supplier (LCRB) to request their legal documents: COR, Business Permit, PhilGEPS Certificate, Omnibus Sworn Statement (Affidavit).', subs: [] },
    ],
    monitoringUpdate: [
      '"RFQ Opening" column → today\'s date',
      '"Date of Current Status" column → today\'s date',
      'Notes → your name as modifier',
    ],
    nodes: [
      {
        type: 'error',
        title: 'When Procurement Fails (Shopping)',
        items: [
          'If only 1 or 0 compliant suppliers submitted, the procurement is considered FAILED.',
          'If a lot has items that are non-compliant, the whole lot fails.',
          'Document the failure and state the reason clearly in the BAC Resolution.',
          'Failed procurements are NOT included in the PMR.',
          'Consult the BAC Secretariat Head on next steps (re-bidding or alternative mode).',
        ],
      },
    ],
  },
  {
    id: 'sh4', category: 'shopping', categoryLabel: 'SHOPPING',
    title: 'BAC Resolution, NOA & NTP',
    icon: BookMarked,
    timelineColor: 'border-sky-400',
    color: 'border-sky-500/40 bg-sky-500/5',
    headerColor: 'bg-sky-500/10',
    badgeColor: 'bg-sky-500/20 text-sky-300',
    shortDesc: 'Prepare award documents and route for signatures.',
    description: "After evaluation, the BAC Secretariat prepares the BAC Resolution, Notice of Award (NOA), and Notice to Proceed (NTP), then routes them for signatures.",
    tasks: [
      { main: 'Edit the template documents based on the Purchase Request details: project title, PR number, supplier name, dates, ABC, contract amount.', subs: [] },
      { main: 'For the BAC Resolution: clearly state the legal basis used to justify the Shopping procurement mode (cite the specific provision of RA 9184 or RA 12009).', subs: [] },
      { main: 'For failed procurement: state the complete and specific law basis for the reason the procurement failed.', subs: [] },
    ],
    monitoringUpdate: [
      '"BAC Reso" column → today\'s date',
      'Remarks → "For P.O."',
      '"Supplier" column → winning supplier\'s name',
      'Notes → your name as modifier',
    ],
    nodes: [
      {
        type: 'warning',
        title: 'BAC Resolution Content Requirements',
        items: [
          'Must cite the exact provision of RA 9184 or RA 12009 as legal basis.',
          'For Shopping: the non-availability certificate must be referenced.',
          'For failed procurement: include the specific reason and legal citation.',
        ],
      },
    ],
  },
  {
    id: 'sh5', category: 'shopping', categoryLabel: 'SHOPPING',
    title: 'Document Routing for Signatures',
    icon: Users,
    timelineColor: 'border-sky-400',
    color: 'border-sky-500/40 bg-sky-500/5',
    headerColor: 'bg-sky-500/10',
    badgeColor: 'bg-sky-500/20 text-sky-300',
    shortDesc: 'Route BAC Resolution, Abstract, and other docs through all required signatories.',
    description: "The finalized documents are routed to all required signatories in the correct order. Always bring a pen.",
    tasks: [
      { main: 'BAC Secretariat Head initials the documents before routing.', subs: [] },
      { main: 'Route to the End User (GSD, HRD, EEMD, BDD, MISD, or OAPIA depending on origin).', subs: [] },
      { main: 'Route to BAC Member 1 (FD). Note: The Proof of Service must be signed by the Canvasser first.', subs: [] },
      { main: 'Route to the Provisional Member (CPD).', subs: [] },
      { main: 'Route to the Vice Chairperson (RALMD).', subs: [] },
      { main: 'Route to BAC Member 3 (VACRD). Note: If there are dates on the form, a Proof of Attendance is required before signing.', subs: [] },
      { main: 'Route to BAC Member 2 (LSD — Attorney). Politely introduce yourself: "Excuse me Attorney, Good Afternoon. [Your Full Name], an Intern from the BAC Office, asking to sign for RFQ, Abstract, and Proof of Service, then BAC Resolution regarding [Procurement Root Word]."', subs: [] },
      { main: 'Route to the Chairperson (EAD) — also for Endorsement and Initial for Accounting.', subs: [] },
      { main: 'For procurements with ABC above ₱50,000: also route to the Accounting Division for their signature.', subs: [] },
      { main: 'Double-check: confirm signatures on Abstract and BAC Reso, and initials on RFQ, Proof of Service, and other attachments.', subs: [] },
    ],
    nodes: [
      {
        type: 'tip',
        title: 'Routing Tips',
        items: [
          'Always carry a pen — never ask signatories to lend theirs.',
          'Group all documents together neatly before routing — don\'t present them disorganized.',
          'Know the proper introduction when approaching the Attorney (BAC Member 2 / LSD).',
          'Proof of Service must be signed by the Canvasser BEFORE routing to BAC Member 1.',
          'BAC Member 3 (VACRD) needs Proof of Attendance before signing if dates are involved.',
        ],
      },
      {
        type: 'error',
        title: 'Signature Order Errors',
        items: [
          'Never skip the Secretariat Head\'s initial — it must come first before any routing.',
          'If the Chairperson is unavailable, do not route out of order — wait or consult the Head.',
          'For above ₱50K: Accounting signature is required — do not forward to GSD without it.',
        ],
      },
    ],
  },
];

/* ─── SVP Steps ─── */
const SVP_STEPS = [
  {
    id: 'v1', category: 'svp', categoryLabel: 'SVP',
    title: 'RFQ Preparation',
    icon: FileText,
    timelineColor: 'border-emerald-400',
    color: 'border-emerald-500/40 bg-emerald-500/5',
    headerColor: 'bg-emerald-500/10',
    badgeColor: 'bg-emerald-500/20 text-emerald-300',
    shortDesc: 'Prepare the RFQ worksheet, Abstract, and Proof of Service.',
    analogy: "Like preparing a detailed shopping checklist and price-request form that you send to multiple stores to compare their prices.",
    description: "The Request for Quotation (RFQ) is the official document sent to suppliers to collect their price quotations. The BAC Secretariat prepares the RFQ and the Abstract of Quotations in a spreadsheet.",
    tasks: [
      {
        main: 'Open the RFQ Worksheet and fill in the following fields:',
        subs: [
          'Project Reference Number',
          'Name of Project',
          'Date — use today\'s date; if the ABC is above ₱50,000, use tomorrow\'s date instead',
          'Deadline Date — for above ₱50,000 only, set it to 7 days after tomorrow\'s date',
          'Item Number, Item & Description, Quantity, Unit',
          'Delivery Terms, Date of Delivery, Place of Delivery, Payment Terms',
          'Estimated Total Cost (format: Php 47,000.00)',
        ],
      },
      {
        main: 'Open the Abstract and Proof of Service Worksheets and link data from the RFQ sheet:',
        subs: [
          'Use the "=" formula to pull data automatically from the RFQ worksheet.',
          'Press Ctrl + D to duplicate formulas for multiple rows.',
          'Use formulas such as =QTY*UNIT_COST and =SUM(Total) to compute values.',
          'Manually input Unit Cost and Total columns for each supplier\'s quote.',
          'Deadline (for above ₱50K): should be 7 days after the Date shown on the RFQ.',
        ],
      },
      {
        main: 'Double-check the following before printing:',
        subs: [
          'All monetary values are correct and properly formatted.',
          'No spelling errors in item names or project title.',
          'Messy or misaligned data corrected.',
          'Lines, borders, and page margins are suitable for printing.',
        ],
      },
      { main: 'If signature images are not appearing in the document, press Ctrl + 6 to toggle image display.', subs: [] },
      { main: 'Print one (1) copy of the RFQ.', subs: [] },
      { main: 'Attach the PR Form Slip to the printed RFQ. Ensure PR Number, Received Date, Acted Date, and Published Date are filled in.', subs: [] },
    ],
    nodes: [
      {
        type: 'warning',
        title: 'Date Rules for SVP',
        items: [
          'Below ₱50K: Date on RFQ = today\'s date. No deadline date required.',
          'Above ₱50K: Date on RFQ = tomorrow\'s date. Deadline = 7 days after tomorrow.',
          'Entering the wrong date will invalidate the RFQ for above-₱50K procurements.',
        ],
      },
      {
        type: 'error',
        title: 'Common RFQ Errors',
        items: [
          'Signature images not showing — press Ctrl + 6.',
          'Wrong Estimated Total Cost — verify formula computations.',
          'Missing PR Form Slip — always attach before submission.',
          'Borders/lines misaligned for printing — preview and fix before printing.',
        ],
      },
    ],
  },
  {
    id: 'v2', category: 'svp', categoryLabel: 'SVP',
    title: 'RFQ Posting & Distribution',
    icon: Send,
    timelineColor: 'border-emerald-400',
    color: 'border-emerald-500/40 bg-emerald-500/5',
    headerColor: 'bg-emerald-500/10',
    badgeColor: 'bg-emerald-500/20 text-emerald-300',
    shortDesc: 'Print copies, post on Bulletin Board, and post to PhilGEPS if above ₱50K.',
    analogy: "Like posting a 'For Sale' ad on multiple bulletin boards and personally mailing copies to potential buyers.",
    description: "After the RFQ is finalized and printed, multiple copies are prepared, distributed, and posted. For above ₱50K, PhilGEPS posting is mandatory.",
    tasks: [
      { main: 'Print four (4) copies of the RFQ and one (1) copy of the Proof of Service.', subs: [] },
      { main: 'Attach/staple an envelope to each of the 3 supplier-copy RFQs. Attach the Proof of Service to the back of one of these copies.', subs: [] },
      { main: 'Attach TOR/Detailed Specifications/Sample Picture if stated on the RFQ — Paper Clip all together.', subs: [] },
      {
        main: 'Record the procurement in the posting log:',
        subs: ['PR Number and Project Title.', 'ABC amount.', 'Note whether it is Below or Above ₱50K.'],
      },
      { main: 'Stamp the date on the left side of the RFQ for Canvass.', subs: [] },
      { main: 'Submit the 3 supplier copies with envelopes and Proof of Service to BAC Head for acknowledgment and received signature.', subs: [] },
      { main: 'Go to the Guard and ask for the Log Book for Bulletin Board posting.', subs: [] },
      { main: 'Post the 1 Bulletin Board copy of the RFQ on the official Bulletin Board for public viewing.', subs: [] },
      { main: 'Submit the 3 RFQs with envelopes to the End User / Canvassers for distribution to suppliers.', subs: [] },
      { main: 'For procurements with ABC above ₱50,000: post the RFQ to PhilGEPS as well.', subs: [] },
    ],
    monitoringUpdate: [
      '"Published" column → today\'s date',
      'Remarks → "For Canvass"',
      'Notes → your name as modifier',
    ],
    nodes: [
      {
        type: 'error',
        title: 'PhilGEPS Posting — Required for Above ₱50K',
        items: [
          'If ABC is above ₱50,000, posting on PhilGEPS is MANDATORY — skipping this invalidates the procurement.',
          'Post on PhilGEPS on the same day as Bulletin Board posting.',
          'Take a screenshot/record of the PhilGEPS posting confirmation for documentation.',
        ],
      },
      {
        type: 'warning',
        title: 'Proof of Service',
        items: [
          'The Proof of Service must be signed by the designated Canvasser before routing.',
          'Attach it to the back of one of the 3 supplier-copy RFQs.',
          'Without the Proof of Service signature, the procurement documents cannot be completed.',
        ],
      },
    ],
  },
  {
    id: 'v3', category: 'svp', categoryLabel: 'SVP',
    title: 'RFQ Opening',
    icon: Gavel,
    timelineColor: 'border-emerald-400',
    color: 'border-emerald-500/40 bg-emerald-500/5',
    headerColor: 'bg-emerald-500/10',
    badgeColor: 'bg-emerald-500/20 text-emerald-300',
    shortDesc: 'On the deadline date, formally open submitted quotations and record.',
    analogy: "Like opening sealed bid envelopes at an auction — a formal event with witnesses where submitted price offers are officially received and documented.",
    description: "On the deadline date, the BAC Secretariat formally opens the submitted quotations. The date is recorded in the Abstract, and the Monitoring Sheet is updated.",
    tasks: [
      { main: 'Open the Abstract Worksheet and enter the current date in the "Date of Bids Opened" field.', subs: [] },
      { main: 'Contact and accommodate suppliers on how much they bid on each item (canvass phase).', subs: [] },
      { main: 'Record the quoted prices of each supplier in the Abstract spreadsheet.', subs: [] },
    ],
    monitoringUpdate: [
      '"RFQ for Canvass" column → today\'s date',
      '"RFQ Opening" column → today\'s date',
      '"Date of Current Status" column → today\'s date',
      'Notes → your name as modifier',
    ],
    nodes: [
      {
        type: 'warning',
        title: 'Opening Day Requirements',
        items: [
          'Quotations submitted after the deadline cannot be accepted for above ₱50K procurements.',
          'At least 3 supplier quotations are ideally required; fewer may result in failed procurement.',
          'Record the date of opening immediately — this is an official timestamp.',
        ],
      },
    ],
  },
  {
    id: 'v4', category: 'svp', categoryLabel: 'SVP',
    title: 'Abstract Evaluation & LCRB Determination',
    icon: FileSpreadsheet,
    timelineColor: 'border-emerald-400',
    color: 'border-emerald-500/40 bg-emerald-500/5',
    headerColor: 'bg-emerald-500/10',
    badgeColor: 'bg-emerald-500/20 text-emerald-300',
    shortDesc: 'Evaluate supplier prices, classify bidders, and determine the LCRB.',
    analogy: "Like a judge scoring a competition — you tally each contestant's scores, determine who followed the rules, and declare who wins based on the lowest compliant price.",
    description: "After all quotations are collected, the BAC Secretariat evaluates and compares prices of all participating suppliers.",
    tasks: [
      { main: 'Calculate each supplier\'s total quoted price for all items in the Abstract.', subs: [] },
      {
        main: 'Evaluate and classify each supplier with the appropriate label:',
        subs: [
          'LCRB — Lowest Calculated Responsive Bid (the qualified winning supplier)',
          'SCRB — Second Lowest Calculated Responsive Bid',
          '1st LCB, 2nd LCB — other ranked compliant bidders',
          'Non-Compliant — suppliers who did not meet the required specifications',
          'No Bid — suppliers who did not submit any quotation',
        ],
      },
      { main: 'If it is 1 LOT with many items and some items are non-compliant, the entire lot is considered FAILED.', subs: [] },
      { main: 'Contact the winning supplier (LCRB) to request their legal documents: COR, Business Permit, PhilGEPS Certificate, Omnibus Sworn Statement (Affidavit).', subs: [] },
    ],
    nodes: [
      {
        type: 'error',
        title: 'When SVP Procurement Fails',
        items: [
          'If only 1 compliant supplier submitted a bid, the procurement is considered FAILED.',
          'If a LOT has items that are non-compliant, the whole LOT fails.',
          'Document the failure reason clearly in the BAC Resolution and cite the specific law provision.',
          'Failed procurements are NOT entered in the PMR.',
          'Consult BAC Secretariat Head for next steps.',
        ],
      },
    ],
  },
  {
    id: 'v5', category: 'svp', categoryLabel: 'SVP',
    title: 'TWG Evaluation & Declaration of Winner',
    icon: CheckCircle2,
    timelineColor: 'border-emerald-400',
    color: 'border-emerald-500/40 bg-emerald-500/5',
    headerColor: 'bg-emerald-500/10',
    badgeColor: 'bg-emerald-500/20 text-emerald-300',
    shortDesc: 'TWG and End User evaluate winning supplier\'s specs; winner is declared.',
    analogy: "Like the final inspection phase — the technical team confirms the winning bidder's offer meets all technical requirements before a winner is officially declared.",
    description: "The Technical Working Group (TWG) and the End User conduct a formal evaluation of the winning supplier's offered specifications.",
    tasks: [
      { main: 'Coordinate with the TWG and End User for the evaluation of submitted technical specifications and samples.', subs: [] },
      { main: 'Document the evaluation results in the appropriate evaluation form.', subs: [] },
      { main: 'Officially declare the winning supplier based on the evaluation result.', subs: [] },
    ],
    nodes: [
      {
        type: 'warning',
        title: 'Evaluation Notes',
        items: [
          'Evaluation must be conducted by the TWG — BAC Secretariat assists but does not decide.',
          'If the LCRB\'s specs are found non-compliant, proceed to the SCRB.',
          'Document all evaluation decisions — these may be requested during audit.',
        ],
      },
    ],
  },
  {
    id: 'v6', category: 'svp', categoryLabel: 'SVP',
    title: 'BAC Resolution, NOA & NTP',
    icon: BookMarked,
    timelineColor: 'border-emerald-400',
    color: 'border-emerald-500/40 bg-emerald-500/5',
    headerColor: 'bg-emerald-500/10',
    badgeColor: 'bg-emerald-500/20 text-emerald-300',
    shortDesc: 'Prepare and finalize the award documents.',
    description: "After the evaluation, the BAC Secretariat prepares the BAC Resolution, Notice of Award (NOA), and Notice to Proceed (NTP).",
    tasks: [
      { main: 'Edit the template documents based on the Purchase Request details: project title, PR number, supplier name, dates, ABC, contract amount.', subs: [] },
      { main: 'For the BAC Resolution: clearly state the legal basis used to justify the SVP procurement mode or any failed procurement situation (cite the specific provision of RA 9184 or RA 12009).', subs: [] },
      { main: 'For failed procurement: state the complete and specific law basis for the reason the procurement failed.', subs: [] },
    ],
    monitoringUpdate: [
      '"BAC Reso" column → today\'s date',
      'Remarks → "For P.O."',
      '"Supplier" column → winning supplier\'s name',
      'Notes → your name as modifier',
    ],
    nodes: [
      {
        type: 'note',
        title: 'Document Details to Verify',
        items: [
          'Confirm correct PR Number, project title, and supplier name.',
          'Verify that the contract amount matches the LCRB\'s quoted total.',
          'Dates on NOA and NTP must align with the procurement timeline.',
        ],
      },
    ],
  },
  {
    id: 'v7', category: 'svp', categoryLabel: 'SVP',
    title: 'Document Routing for Signatures',
    icon: Users,
    timelineColor: 'border-emerald-400',
    color: 'border-emerald-500/40 bg-emerald-500/5',
    headerColor: 'bg-emerald-500/10',
    badgeColor: 'bg-emerald-500/20 text-emerald-300',
    shortDesc: 'Route BAC Resolution, Abstract, and related documents for all required signatures.',
    description: "The finalized documents are routed through all required signatories in the correct hierarchical order. Always bring a pen.",
    tasks: [
      { main: 'BAC Secretariat Head initials the documents before routing.', subs: [] },
      { main: 'Route to the End User (GSD, HRD, EEMD, BDD, MISD, or OAPIA depending on project origin).', subs: [] },
      { main: 'Route to BAC Member 1 (FD). Note: Proof of Service must be signed by the Canvasser first.', subs: [] },
      { main: 'Route to the Provisional Member (CPD).', subs: [] },
      { main: 'Route to the Vice Chairperson (RALMD).', subs: [] },
      { main: 'Route to BAC Member 3 (VACRD). Note: If dates are present on the form, Proof of Attendance is required before signing.', subs: [] },
      { main: 'Route to BAC Member 2 (LSD — Attorney). Say: "Excuse me Attorney, Good Afternoon. [Your Full Name], an Intern from the BAC Office, asking to sign for RFQ, Abstract, and Proof of Service, then BAC Resolution regarding [Procurement Root Word]."', subs: [] },
      { main: 'Route to the Chairperson (EAD) — also for Endorsement and Initial for Accounting.', subs: [] },
      { main: 'For procurements with ABC above ₱50,000: also route to the Accounting Division.', subs: [] },
      { main: 'Double-check: verify signatures on Abstract and BAC Reso; initials on RFQ, Proof of Service, and other attachments.', subs: [] },
    ],
    nodes: [
      {
        type: 'tip',
        title: 'Routing Order — SVP',
        items: [
          'BAC Secretariat Head → End User → BAC Member 1 (FD) → Provisional Member (CPD) → Vice Chairperson (RALMD) → BAC Member 3 (VACRD) → BAC Member 2 (LSD) → Chairperson (EAD) → Accounting (if above ₱50K).',
          'Always carry a pen.',
          'Proof of Service must be canvasser-signed before BAC Member 1.',
          'Accounting signature is mandatory for above ₱50K — do not skip.',
        ],
      },
      {
        type: 'error',
        title: 'Routing Mistakes to Avoid',
        items: [
          'Never route out of order — signatures must follow the hierarchy.',
          'Missing the Accounting signature for above ₱50K will stall the process.',
          'Always verify all signatures are complete before forwarding to GSD.',
        ],
      },
    ],
  },
];

/* ─── Regular Bidding Steps ─── */
const RB_STEPS = [
  {
    id: 'rb1', category: 'rb', categoryLabel: 'REG. BIDDING',
    title: 'Pre-Procurement Conference',
    icon: Megaphone,
    timelineColor: 'border-rose-400',
    color: 'border-rose-500/40 bg-rose-500/5',
    headerColor: 'bg-rose-500/10',
    badgeColor: 'bg-rose-500/20 text-rose-300',
    shortDesc: 'Conduct the Pre-Procurement Conference via Zoom before bidding begins.',
    analogy: "Like a project kick-off meeting — everyone aligns on the scope, rules, and requirements before the official start.",
    description: "The Pre-Procurement Conference is a formal meeting conducted via Zoom where the BAC discusses the procurement details before posting the Invitation to Bid.",
    tasks: [
      { main: 'Use the official Procurement Gmail Account for all communications: procurement@piamo.gov.ph / PIABACSEC2025@', subs: [] },
      { main: 'Prepare and set up all required documents and presentation materials before the meeting.', subs: [] },
      { main: 'Start meeting setup 15–20 minutes before the scheduled time.', subs: [] },
      { main: 'Turn on the Portable Recorder.', subs: [] },
      { main: 'Share screen only during presentation.', subs: [] },
      { main: 'Start Zoom recording when the presentation begins (or as directed by the BAC Secretariat Head).', subs: [] },
      { main: 'In Zoom Chat, send: "Good Morning! Kindly type your name, location, and device used for attendance purposes. Thank you!" — copy and resend periodically so late joiners see it.', subs: [] },
      { main: 'When discussing document images on screen, use Ctrl + Scroll Up to zoom in. Use Ctrl + Click to unzoom when moving to the next slide.', subs: [] },
      { main: 'After the presentation, wait for questions in the Zoom Chat Meeting.', subs: [] },
      { main: 'Before ending: take a screenshot of the entire Zoom Chat window to capture online attendance.', subs: [] },
      { main: 'Turn off Audio and Video, End Recording, and End Meeting.', subs: [] },
    ],
    nodes: [
      {
        type: 'tip',
        title: 'Meeting Tech Tips',
        items: [
          'Start 15–20 minutes early — troubleshoot tech issues before participants join.',
          'Ctrl + Scroll Up to zoom into document images; Ctrl + Click to unzoom.',
          'Screenshot the full Zoom Chat BEFORE ending the meeting — you cannot retrieve it after.',
          'Save Zoom recording immediately to BAC Office shared storage.',
        ],
      },
    ],
  },
  {
    id: 'rb2', category: 'rb', categoryLabel: 'REG. BIDDING',
    title: 'PhilGEPS Posting & Invitation to Bid',
    icon: Send,
    timelineColor: 'border-rose-400',
    color: 'border-rose-500/40 bg-rose-500/5',
    headerColor: 'bg-rose-500/10',
    badgeColor: 'bg-rose-500/20 text-rose-300',
    shortDesc: 'Post the Invitation to Bid on PhilGEPS and Bulletin Board.',
    description: "Regular Bidding requires mandatory posting on PhilGEPS. The Invitation to Bid must be posted and the advertisement period observed.",
    tasks: [
      { main: 'Prepare the Invitation to Bid (ITB) document with all required procurement details.', subs: [] },
      { main: 'Post the ITB on PhilGEPS — mandatory for Regular Bidding.', subs: [] },
      { main: 'Post on the official Bulletin Board simultaneously.', subs: [] },
      { main: 'Observe the mandatory advertisement period before accepting bids.', subs: [] },
    ],
    monitoringUpdate: [
      '"Published" column → today\'s date',
      'Remarks → "For Canvass / Bidding"',
      'Notes → your name as modifier',
    ],
    nodes: [
      {
        type: 'error',
        title: 'PhilGEPS Posting is MANDATORY',
        items: [
          'Regular Bidding ALWAYS requires PhilGEPS posting — no exceptions.',
          'The advertisement period must be observed before accepting bids — bidding cannot proceed early.',
          'Save proof of PhilGEPS posting (screenshots, reference numbers).',
        ],
      },
    ],
  },
  {
    id: 'rb3', category: 'rb', categoryLabel: 'REG. BIDDING',
    title: 'Pre-Bid Conference',
    icon: Megaphone,
    timelineColor: 'border-rose-400',
    color: 'border-rose-500/40 bg-rose-500/5',
    headerColor: 'bg-rose-500/10',
    badgeColor: 'bg-rose-500/20 text-rose-300',
    shortDesc: 'Conduct the Pre-Bid Conference via Zoom for prospective bidders.',
    analogy: "Like a Q&A session with contractors before construction begins — bidders ask questions about the specs and bidding rules.",
    description: "The Pre-Bid Conference is conducted after the ITB is posted. It allows prospective bidders to ask questions about the procurement. Setup is similar to the Pre-Procurement Conference.",
    tasks: [
      { main: 'Use the official Procurement Gmail Account to send Zoom invite.', subs: [] },
      { main: 'Prepare and set up all documents and presentation materials.', subs: [] },
      { main: 'Start setup 15–20 minutes before scheduled time.', subs: [] },
      { main: 'Turn on Portable Recorder.', subs: [] },
      { main: 'Start Zoom recording at the start of the presentation.', subs: [] },
      { main: 'Send attendance message in Zoom Chat and resend periodically: "Good Morning! Kindly type your name, location, and device used for attendance purposes. Thank you!"', subs: [] },
      { main: 'Monitor Zoom Chat for questions from prospective bidders.', subs: [] },
      { main: 'Use Ctrl + Scroll Up for zooming into documents during screen share. Ctrl + Click to unzoom.', subs: [] },
      { main: 'Take screenshot of full Zoom Chat before ending the meeting.', subs: [] },
      { main: 'Turn off Audio and Video, End Recording, and End Meeting.', subs: [] },
    ],
    nodes: [
      {
        type: 'note',
        title: 'Pre-Bid Supplemental Documents',
        items: [
          'If bidders raise clarifications, issue a Supplemental Bulletin to address them formally.',
          'Supplemental Bulletins must be posted on PhilGEPS and distributed to all bidders.',
          'Attendance at Pre-Bid is documented — screenshot the Zoom Chat before ending.',
        ],
      },
    ],
  },
  {
    id: 'rb4', category: 'rb', categoryLabel: 'REG. BIDDING',
    title: 'Bid Opening',
    icon: Gavel,
    timelineColor: 'border-rose-400',
    color: 'border-rose-500/40 bg-rose-500/5',
    headerColor: 'bg-rose-500/10',
    badgeColor: 'bg-rose-500/20 text-rose-300',
    shortDesc: 'Formally open sealed bid documents in public; encode results.',
    analogy: "Like a formal sealed-bid auction — envelopes are opened in public with witnesses, each bidder's documents are checked against requirements, and results are recorded in real time.",
    description: "The Bid Opening is a formal public event where the BAC Secretariat opens and checks all submitted bid documents. Zoom is used for remote attendees.",
    tasks: [
      { main: 'Set up the Zoom Meeting — start screen sharing and recording.', subs: [] },
      { main: 'Monitor Zoom Chat and ask attendees to provide name, company name, location, and device used.', subs: [] },
      { main: 'Take attendance for all physically present committee members and suppliers.', subs: [] },
      { main: 'Open sealed bid document envelopes. Distribute documents to the respective committee members for review.', subs: [] },
      { main: 'Encode the result for each bidder in the Opening of Bids Spreadsheet — mark each item as "Passed" or "Failed" per document requirement.', subs: [] },
      { main: 'Validate and qualify each bidder — if one fails, proceed to the next supplier.', subs: [] },
      {
        main: 'If a qualified bidder offers a discount, compute the final bid amount:',
        subs: [
          'Bid Amount = submitted bid amount',
          '2.5% Discount = Bid Amount × 0.025',
          'Net Bid Amount = Bid Amount − Discount Amount',
        ],
      },
      { main: 'Declare the LCRB, 1st LCB, 2nd LCB, and so on in ranked order.', subs: [] },
    ],
    nodes: [
      {
        type: 'warning',
        title: 'Bid Opening Rules',
        items: [
          'All bid envelopes must be opened in public view — do not open any in advance.',
          'Late bids are automatically disqualified — record the reason.',
          'If only 1 bidder submits, declare a failed bidding and document accordingly.',
          'Zoom recording must be running for the entire bid opening — COA attends remotely.',
        ],
      },
      {
        type: 'error',
        title: 'Failed Bidding',
        items: [
          'If no compliant bids are submitted, declare failed bidding.',
          'Document the failure in the BAC Resolution with the specific legal basis.',
          'Coordinate with the BAC Secretariat Head for re-bidding procedures.',
        ],
      },
    ],
  },
  {
    id: 'rb5', category: 'rb', categoryLabel: 'REG. BIDDING',
    title: 'TWG Evaluation',
    icon: Search,
    timelineColor: 'border-rose-400',
    color: 'border-rose-500/40 bg-rose-500/5',
    headerColor: 'bg-rose-500/10',
    badgeColor: 'bg-rose-500/20 text-rose-300',
    shortDesc: 'TWG formally evaluates technical bids via a Zoom meeting.',
    analogy: "Like a panel of technical experts reviewing submitted product samples against a specification sheet.",
    description: "The Technical Working Group (TWG) conducts a formal evaluation of bidders' technical proposals. The BAC Secretariat assists with Zoom setup and documentation.",
    tasks: [
      { main: 'Set up the Zoom Meeting — start screen sharing and recording.', subs: [] },
      { main: 'Take attendance of all committee members during the evaluation meeting.', subs: [] },
      { main: 'The TWG members present the evaluation results — assist as needed.', subs: [] },
      { main: 'Assist for other document signing as required during the meeting.', subs: [] },
    ],
    nodes: [
      {
        type: 'note',
        title: 'TWG Evaluation Notes',
        items: [
          'TWG members lead the evaluation — BAC Secretariat supports and documents.',
          'If TWG finds the LCRB non-compliant, move to the 1st LCB for evaluation.',
          'Document all evaluation decisions — these will be referenced in Post-Qualification.',
        ],
      },
    ],
  },
  {
    id: 'rb6', category: 'rb', categoryLabel: 'REG. BIDDING',
    title: 'Post-Qualification',
    icon: CheckCircle2,
    timelineColor: 'border-rose-400',
    color: 'border-rose-500/40 bg-rose-500/5',
    headerColor: 'bg-rose-500/10',
    badgeColor: 'bg-rose-500/20 text-rose-300',
    shortDesc: 'Final verification of the LCRB\'s eligibility and bid documents.',
    analogy: "Like a final background check on the winning job applicant — verifying all credentials are authentic before issuing the official job offer letter.",
    description: "Post-Qualification is the final verification step during Regular Bidding. The BAC formally validates all submitted documents of the LCRB bidder.",
    tasks: [
      { main: 'Review and validate the LCRB\'s submitted eligibility and bid documents for authenticity and completeness.', subs: [] },
      { main: 'Edit the Post-Qualification Report template based on the specific details of the procurement and the bidder\'s information.', subs: [] },
      { main: 'Formally declare the bidder as Qualified or Disqualified and document the result.', subs: [] },
      { main: 'If disqualified, proceed to the 1st LCB and conduct post-qualification again.', subs: [] },
    ],
    nodes: [
      {
        type: 'warning',
        title: 'Post-Qualification Checklist',
        items: [
          'Verify: COR (Certificate of Registration), Business Permit, PhilGEPS Certificate, Omnibus Sworn Statement.',
          'All documents must be valid and not expired at the time of submission.',
          'If the LCRB is disqualified, move to the next qualified bidder — do not cancel immediately.',
          'Document all disqualification reasons clearly.',
        ],
      },
    ],
  },
  {
    id: 'rb7', category: 'rb', categoryLabel: 'REG. BIDDING',
    title: 'BAC Resolution, NOA & NTP',
    icon: BookMarked,
    timelineColor: 'border-rose-400',
    color: 'border-rose-500/40 bg-rose-500/5',
    headerColor: 'bg-rose-500/10',
    badgeColor: 'bg-rose-500/20 text-rose-300',
    shortDesc: 'Prepare all award documents and update the monitoring sheet.',
    description: "After post-qualification, the BAC Secretariat prepares the final award documents for Regular Bidding.",
    tasks: [
      { main: 'Edit template documents: BAC Resolution, Notice of Award (NOA), Notice to Proceed (NTP).', subs: [] },
      { main: 'Fill in all details: project title, PR number, supplier/bidder name, dates, ABC, contract amount.', subs: [] },
      { main: 'For BAC Resolution: cite specific provisions of RA 9184 or RA 12009 as the legal basis.', subs: [] },
      { main: 'For failed bidding: clearly state the specific reason and the law provision cited.', subs: [] },
    ],
    monitoringUpdate: [
      '"BAC Reso" column → today\'s date',
      'Remarks → "For P.O."',
      '"Supplier" column → winning bidder\'s name',
      'Notes → your name as modifier',
    ],
    nodes: [
      {
        type: 'note',
        title: 'Legal Basis Reference',
        items: [
          'Always cite the specific Section/Article of RA 9184 (Government Procurement Reform Act) or RA 12009 (New Government Procurement Act).',
          'Vague references like "in accordance with procurement law" are not acceptable.',
          'BAC Secretariat Head can provide guidance on which provision applies.',
        ],
      },
    ],
  },
  {
    id: 'rb8', category: 'rb', categoryLabel: 'REG. BIDDING',
    title: 'Contract Signing & Bound Document Copies',
    icon: Printer,
    timelineColor: 'border-rose-400',
    color: 'border-rose-500/40 bg-rose-500/5',
    headerColor: 'bg-rose-500/10',
    badgeColor: 'bg-rose-500/20 text-rose-300',
    shortDesc: 'Compile, certify, and distribute bound document copies to COA, Accounting, End User.',
    analogy: "Like assembling a complete legal binder for a real estate transaction — every document is organized, certified, and signed before being submitted for official registration.",
    description: "The final step in a Regular Bidding procurement is assembling the complete set of documents into official bound copies.",
    tasks: [
      { main: 'Photocopy all original documents — up to 4 copies for: End User, Accounting, COA, and BAC Copy.', subs: [] },
      { main: 'Print the Document Checklist and page identification labels (alphabetical: A, B, C…) — print 4 copies of the checklist.', subs: [] },
      { main: 'Stamp "CERTIFIED TRUE COPY" on each document and write the certification date.', subs: [] },
      { main: 'Sign each certified stamp — certified copies must be signed by the BAC Secretariat Head.', subs: [] },
      { main: 'Punch holes in all compiled documents.', subs: [] },
      { main: 'Insert them into the Blue Binder through the fastener.', subs: [] },
      { main: 'Attach tabs/labels with letters (A, B, C…) on each printed identification checklist page.', subs: [] },
      { main: 'Print the Transmittal Letter for each copy — addressed to the Supplier, End User, COA, and Accounting.', subs: [] },
      { main: 'Route Transmittal Letter to BAC Secretariat Head for initial.', subs: [] },
      { main: 'Route to BAC Chairperson for e-signature or wet signature.', subs: [] },
      { main: 'Sign the checklist with the BAC Secretariat Head.', subs: [] },
      { main: 'Attach both Transmittal Letter and Checklist to the bound copies.', subs: [] },
      { main: 'Print a label, attach it, and forward to End User, COA, and Accounting.', subs: [] },
      { main: 'Use the Outgoing Documents Log Book to record receipt by COA, Accounting, and End User.', subs: [] },
    ],
    nodes: [
      {
        type: 'warning',
        title: 'Bound Copy Requirements',
        items: [
          'All stamps must be signed by the BAC Secretariat Head — unsigned stamps are invalid.',
          'Prepare all 4 copies at once — do not release incomplete sets.',
          'Alphabetical tabs (A, B, C…) must match the Document Checklist exactly.',
          'Use the Outgoing Documents Log Book — this is the official record of receipt.',
        ],
      },
      {
        type: 'tip',
        title: 'Efficiency Tips',
        items: [
          'Stamp all documents at once before signing — group the task to save time.',
          'Punch holes in batches — sort by tab letter first.',
          'Keep the Blue Binder neat and orderly — auditors inspect these.',
        ],
      },
    ],
  },
  {
    id: 'rb9', category: 'rb', categoryLabel: 'REG. BIDDING',
    title: 'Document Routing for Signatures',
    icon: Users,
    timelineColor: 'border-rose-400',
    color: 'border-rose-500/40 bg-rose-500/5',
    headerColor: 'bg-rose-500/10',
    badgeColor: 'bg-rose-500/20 text-rose-300',
    shortDesc: 'Route Resolution and all procurement documents through all required signatories.',
    description: "For Regular Bidding, documents require signatures from all BAC Members and the Chairperson, following the same routing order as other modes.",
    tasks: [
      { main: 'BAC Secretariat Head initials the documents before routing.', subs: [] },
      { main: 'Route to the End User (GSD, HRD, EEMD, BDD, MISD, or OAPIA depending on project origin).', subs: [] },
      { main: 'Route to BAC Member 1 (FD).', subs: [] },
      { main: 'Route to the Provisional Member (CPD).', subs: [] },
      { main: 'Route to the Vice Chairperson (RALMD).', subs: [] },
      { main: 'Route to BAC Member 3 (VACRD). Note: If dates are present on form, Proof of Attendance required before signing.', subs: [] },
      { main: 'Route to BAC Member 2 (LSD — Attorney). Use proper introduction.', subs: [] },
      { main: 'Route to the Chairperson (EAD) — also for Endorsement and Initial for Accounting.', subs: [] },
      { main: 'Route to Accounting Division — always required for Regular Bidding (always above ₱1M).', subs: [] },
      { main: 'Verify all signatures are complete before proceeding to compile bound copies.', subs: [] },
    ],
    nodes: [
      {
        type: 'note',
        title: 'Regular Bidding — Accounting Always Required',
        items: [
          'Since Regular Bidding is always ₱1,000,000 and above, Accounting signature is always required.',
          'Do not forward to GSD or compile bound copies without the Accounting signature.',
          'Always carry a pen — never ask signatories to lend theirs.',
        ],
      },
    ],
  },
];

/* ─── Additional Steps ─── */
const ADDITIONAL_STEPS = [
  {
    id: 'add1', category: 'additional', categoryLabel: 'ADDITIONAL',
    title: 'Attaching Proof of Attendance / Meals',
    icon: Camera,
    timelineColor: 'border-orange-400',
    color: 'border-orange-500/40 bg-orange-500/5',
    headerColor: 'bg-orange-500/10',
    badgeColor: 'bg-orange-500/20 text-orange-300',
    shortDesc: 'Document meal expenses with photos and receipts for liquidation.',
    analogy: "Like attaching your receipts to an expense reimbursement form — the photos and receipts are evidence that the activity actually occurred.",
    description: "When meals or snacks are provided during official meetings, the expense must be supported by documented proof of attendance and receipts.",
    tasks: [
      { main: 'Compile photos taken during the meeting (lunch or snack photos) as visual proof of the event.', subs: [] },
      { main: 'Paste the official receipt(s) neatly on a bond paper.', subs: [] },
      { main: 'Photocopy the bond paper with receipt — make 2 copies for the record.', subs: [] },
      { main: 'Attach the photos and receipt copies to the meeting documentation or liquidation report.', subs: [] },
    ],
    nodes: [
      {
        type: 'warning',
        title: 'Proof Requirements',
        items: [
          'Both photos AND official receipts are required — one without the other is insufficient.',
          'Receipts must be official (with BIR registration) — handwritten receipts may not be accepted.',
          'Photos should clearly show the meeting context — not just food.',
        ],
      },
    ],
  },
];

/* ─── Mode Tabs ─── */
const MODE_TABS = [
  { id: 'overview', label: 'Overview', icon: BookOpen, color: 'text-slate-300' },
  { id: 'shopping', label: 'Shopping', icon: Package, color: 'text-sky-300' },
  { id: 'svp', label: 'SVP', icon: FileText, color: 'text-emerald-300' },
  { id: 'rb', label: 'Reg. Bidding', icon: Gavel, color: 'text-rose-300' },
  { id: 'additional', label: 'Additional', icon: Star, color: 'text-orange-300' },
];

/* ─── Overview Flow Diagram ─── */
const OverviewFlow = () => {
  const phases = [
    { label: 'Phase 1', title: 'PR Logging', color: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300', dot: 'bg-indigo-400' },
    { label: 'Optional', title: 'Budget Certification', color: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300', dot: 'bg-yellow-400' },
    { label: 'Phase 2', title: 'PR for Action', color: 'border-blue-500/50 bg-blue-500/10 text-blue-300', dot: 'bg-blue-400' },
    { label: 'Phase 3', title: 'PR Deliberation', color: 'border-violet-500/50 bg-violet-500/10 text-violet-300', dot: 'bg-violet-400' },
  ];
  const modes = [
    { label: 'Shopping', steps: ['RFQ Prep', 'Distribution', 'Abstract Eval', 'BAC Reso / NOA / NTP', 'Routing'], color: 'border-sky-500/40 bg-sky-500/8 text-sky-300', badge: 'bg-sky-500/20 text-sky-300' },
    { label: 'SVP', steps: ['RFQ Prep', 'Posting', 'RFQ Opening', 'Abstract Eval', 'TWG Evaluation', 'BAC Reso / NOA / NTP', 'Routing'], color: 'border-emerald-500/40 bg-emerald-500/8 text-emerald-300', badge: 'bg-emerald-500/20 text-emerald-300' },
    { label: 'Regular Bidding', steps: ['Pre-Procurement Conf', 'PhilGEPS Posting', 'Pre-Bid Conf', 'Bid Opening', 'TWG Evaluation', 'Post-Qualification', 'BAC Reso / NOA / NTP', 'Contract Signing', 'Routing'], color: 'border-rose-500/40 bg-rose-500/8 text-rose-300', badge: 'bg-rose-500/20 text-rose-300' },
  ];
  const finals = [
    { title: 'Abstract for PO → GSD', color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300' },
    { title: 'Purchase Order', color: 'border-slate-500/50 bg-slate-500/10 text-slate-300' },
    { title: 'PMR Report', color: 'border-violet-500/50 bg-violet-500/10 text-violet-300' },
    { title: 'Archive & File Tracking', color: 'border-slate-500/50 bg-slate-500/10 text-slate-300' },
  ];

  return (
    <div className="space-y-4">
      {/* Pre-mode phases */}
      <div className="space-y-1">
        {phases.map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex flex-col items-center flex-shrink-0 w-8">
              <div className={`w-2.5 h-2.5 rounded-full ${p.dot}`} />
              {i < phases.length - 1 && <div className="w-px h-4 bg-slate-700" />}
            </div>
            <div className={`flex-1 flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium ${p.color}`}>
              <span>{p.title}</span>
              <span className="text-[9px] opacity-60 font-bold tracking-widest">{p.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Branch point */}
      <div className="flex items-center gap-3">
        <div className="w-8 flex justify-center">
          <GitBranch className="w-4 h-4 text-slate-500" />
        </div>
        <div className="flex-1 px-3 py-2 rounded-lg border border-slate-600/40 bg-slate-700/20">
          <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-1">Mode of Procurement Branch</p>
          <div className="flex gap-2 flex-wrap">
            <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/15 text-sky-300">Shopping</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300">SVP</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/15 text-rose-300">Regular Bidding</span>
          </div>
        </div>
      </div>

      {/* Mode columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {modes.map((mode, mi) => (
          <div key={mi} className={`rounded-xl border p-3 ${mode.color}`}>
            <div className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded inline-block mb-2 ${mode.badge}`}>{mode.label}</div>
            <div className="space-y-1">
              {mode.steps.map((step, si) => (
                <div key={si} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-current opacity-40" />
                  <span className="text-[10px] opacity-80">{step}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Merge back */}
      <div className="flex items-center gap-3">
        <div className="w-8 flex justify-center">
          <RefreshCw className="w-4 h-4 text-slate-500" />
        </div>
        <div className="flex-1 px-3 py-2 rounded-lg border border-slate-600/40 bg-slate-700/20">
          <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">All modes converge → Final Steps</p>
        </div>
      </div>

      {/* Final steps */}
      <div className="space-y-1">
        {finals.map((f, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex flex-col items-center flex-shrink-0 w-8">
              <div className="w-2 h-2 rounded-full bg-slate-500" />
              {i < finals.length - 1 && <div className="w-px h-4 bg-slate-700" />}
            </div>
            <div className={`flex-1 px-3 py-2 rounded-lg border text-xs font-medium ${f.color}`}>
              {f.title}
            </div>
          </div>
        ))}
      </div>

      <ErrorNode type="note" title="Mode Selection Guide" items={[
        'Shopping: Only with Certificate of Non-Availability of Stocks. Used for supplies, office equipment, janitorial materials.',
        'SVP (Small Value Procurement): For amounts ₱50,000 and below (when applicable) and above ₱50,000 up to below ₱1,000,000.',
        'Regular Bidding: Mandatory for ₱1,000,000 and above. Requires Pre-Procurement and Pre-Bid Conferences.',
      ]} />
    </div>
  );
};

/* ─── Main Page ─── */
export default function ProcurementProcessFlow() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-4 md:p-6 max-w-[900px] mx-auto space-y-5 font-sans">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <h1 className="text-xl font-bold text-white">Procurement Process Flow</h1>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Complete step-by-step guide for BAC Secretariat staff. Covers Shopping, SVP, and Regular Bidding modes — from PR Logging to archiving.
        </p>
      </div>

      {/* Google Sheets Quick-Links */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <Star className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Quick Access — Google Sheets</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SHEET_LINKS.map(link => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col gap-2 p-3.5 rounded-xl border bg-gradient-to-br ${link.color} transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`}
              >
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider self-start ${link.badge}`}>
                  <Icon className="w-3 h-3" />SHEET
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-100">{link.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{link.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 group-hover:text-slate-300 transition mt-auto">
                  <ExternalLink className="w-3 h-3" />Open Sheet
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-1 flex-wrap bg-slate-900/60 border border-slate-800 rounded-xl p-1">
        {MODE_TABS.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                active
                  ? `bg-slate-700/80 ${tab.color} border border-slate-600/60`
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon className="w-3 h-3" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-bold text-slate-200">Process Overview</h2>
          </div>
          <OverviewFlow />
        </div>
      )}

      {activeTab === 'shopping' && (
        <div className="space-y-4">
          <ProcessSection
            title="Shopping Mode — Full Process Flow"
            subtitle="Used with Certificate of Non-Availability of Stocks. Typically for supplies, office equipment, janitorial materials."
            icon={Package}
            accentClass="border-sky-500/40"
            steps={[...SHARED_STEPS_BEFORE, ...SHOPPING_STEPS, ...SHARED_STEPS_AFTER]}
          />
        </div>
      )}

      {activeTab === 'svp' && (
        <div className="space-y-4">
          <ProcessSection
            title="SVP (Small Value Procurement) — Full Process Flow"
            subtitle="For amounts ₱50,000 and below (when applicable) and above ₱50,000 up to below ₱1,000,000."
            icon={FileText}
            accentClass="border-emerald-500/40"
            steps={[...SHARED_STEPS_BEFORE, ...SVP_STEPS, ...SHARED_STEPS_AFTER]}
          />
        </div>
      )}

      {activeTab === 'rb' && (
        <div className="space-y-4">
          <ProcessSection
            title="Regular Bidding — Full Process Flow"
            subtitle="Mandatory for procurements ₱1,000,000 and above. Requires Pre-Procurement and Pre-Bid Conferences."
            icon={Gavel}
            accentClass="border-rose-500/40"
            steps={[...SHARED_STEPS_BEFORE, ...RB_STEPS, ...SHARED_STEPS_AFTER]}
          />
        </div>
      )}

      {activeTab === 'additional' && (
        <div className="space-y-4">
          <ProcessSection
            title="Additional Procedures"
            subtitle="Supplementary tasks that may be required in specific situations."
            icon={Star}
            accentClass="border-orange-500/40"
            steps={ADDITIONAL_STEPS}
          />
        </div>
      )}

      {/* Footer note */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-500 leading-relaxed">
          This guide is based on actual BAC Secretariat workflows. For the most current templates, forms, and official procedures, always refer to the latest versions in the Google Sheets linked above and consult your BAC Secretariat Head.
        </p>
      </div>
    </div>
  );
}