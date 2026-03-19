import React, { useState } from 'react';
import {
    ExternalLink, ChevronDown, ChevronUp, BookOpen, ClipboardCheck,
    FileSpreadsheet, BarChart2, Lightbulb, Info, FileText, Users,
    DollarSign, Send, Package, Archive, FolderOpen, Printer, Camera,
    Megaphone, Gavel, Star, Search, ClipboardList, BookMarked, AlertCircle,
    X, CheckCircle2, Copy,
} from 'lucide-react';

/* ─── Google Sheets Quick-Links ─── */
const SHEET_LINKS = [
    {
        label: 'PR Logging Sheet',
        desc: 'Log incoming Purchase Requests, generate PR numbers, and record PR details.',
        icon: ClipboardCheck,
        color: 'from-blue-600/20 to-blue-800/10 border-blue-500/30 hover:border-blue-400/60',
        badge: 'bg-blue-500/15 text-blue-300',
        glow: 'shadow-blue-500/10',
        url: 'https://docs.google.com/spreadsheets/d/1H5IDE5TKXM2HXcQ-kcKK3BA_JkGiqQVR8yoXo8L9p6E/edit?gid=1039687665#gid=1039687665',
        searchParam: '#gid=0&range=A1',
    },
    {
        label: 'Procurement Monitoring',
        desc: 'Track all procurement projects from PR for Action through completion. Update statuses here.',
        icon: BarChart2,
        color: 'from-indigo-600/20 to-indigo-800/10 border-indigo-500/30 hover:border-indigo-400/60',
        badge: 'bg-indigo-500/15 text-indigo-300',
        glow: 'shadow-indigo-500/10',
        url: 'https://docs.google.com/spreadsheets/d/1VYI9G49VEvogsHHD9pyOJ8NLkf-7spU7GSpPTwAMx84/edit?gid=1943246738#gid=1943246738',
        searchParam: '#gid=0',
    },
    {
        label: 'PMR (Monitoring Report)',
        desc: 'Quarterly GPPB Procurement Monitoring Report. Input completed procurement data here.',
        icon: FileSpreadsheet,
        color: 'from-violet-600/20 to-violet-800/10 border-violet-500/30 hover:border-violet-400/60',
        badge: 'bg-violet-500/15 text-violet-300',
        glow: 'shadow-violet-500/10',
        url: 'https://docs.google.com/spreadsheets/d/1hUMv_yzk1ON4JNij9WV6zH5VB9hW0o0t/edit?gid=519805908#gid=519805908',
        searchParam: '',
    },
];

/* ─── Process Steps Data ─── */
const PROCESS_STEPS = [
    {
        id: 1, category: 'common', categoryLabel: 'COMMON',
        title: 'PR Logging', icon: ClipboardList,
        color: 'border-indigo-500/40 bg-indigo-500/5', headerColor: 'bg-indigo-500/10 border-indigo-500/30',
        badgeColor: 'bg-indigo-500/20 text-indigo-300',
        analogy: 'Think of this like a front-desk officer in a hospital receiving a patient\'s admission form. You stamp it with the time and date received, assign it a number, and decide where it goes next — all before any treatment begins.',
        description: 'This is the very first step in the procurement process. When an End User brings a Purchase Request (PR), the BAC Secretariat logs it into the system, assigns a PR number, and processes it before routing it back or retaining it for action.',
        tasks: [
            { main: 'Log in to the GSD Gmail Account to check for any incoming PR-related communications.', subs: [] },
            { main: 'Open the PR Google Sheet. Perform data entry and generate a new PR Number for the incoming request.', subs: [] },
            { main: 'Write the generated PR Number clearly on the PR form itself for reference.', subs: [] },
            { main: 'Stamp "RECEIVED" on the back of the PR form and write the exact time and date of receipt.', subs: [] },
            { main: 'Bring the PR to the BAC Secretariat Head for initial review and signature.', subs: [] },
            {
                main: 'Log the PR Out (only if the End User cannot wait and needs to take the PR back temporarily):',
                subs: ['Stamp the date on the PR.', 'Write a note: "Returned PR# [YYYY-MMM-PRN] to End User (For Signature — if PR is not yet signed)".', 'Record the Project Title of the PR.'],
            },
            { main: 'Return the signed PR to the End User and allow them to proceed with their own processing.', subs: [] },
        ],
    },
    {
        id: 2, category: 'optional', categoryLabel: 'OPTIONAL',
        title: 'Budget Certification', icon: DollarSign,
        color: 'border-yellow-500/40 bg-yellow-500/5', headerColor: 'bg-yellow-500/10 border-yellow-500/30',
        badgeColor: 'bg-yellow-500/20 text-yellow-300',
        analogy: 'Like checking if there\'s enough money in your wallet before placing an order at a restaurant. The Budget Division confirms funds exist before any spending commitment is made.',
        description: 'This step is optional and is only performed if the End User requests it. Normally, End Users are responsible for submitting their PR to the Budget Division themselves. However, if they ask the BAC Secretariat to assist, you will forward or receive the PR on their behalf.',
        tasks: [
            { main: 'Receive the PR and accompanying documents from the End User (or on their behalf).', subs: [] },
            { main: 'Bring or forward the PR to the Budget Division for processing of Budget Allocation for the specific project.', subs: [] },
            { main: 'Wait for the Budget Division to certify the availability of funds and attach the Certificate of Availability of Funds (CAF).', subs: [] },
        ],
    },
    {
        id: 3, category: 'common', categoryLabel: 'COMMON',
        title: 'PR for Action', icon: ClipboardCheck,
        color: 'border-blue-500/40 bg-blue-500/5', headerColor: 'bg-blue-500/10 border-blue-500/30',
        badgeColor: 'bg-blue-500/20 text-blue-300',
        analogy: 'Think of this as officially registering a patient into a hospital ward. Once the PR is fully received and signed, it is formally entered into the monitoring system, stamped with the procurement mode, and assigned to the appropriate process.',
        description: 'Once the PR has been properly signed and returned by the End User, the BAC Secretariat receives it again and formally records it in the Procurement Monitoring Google Sheet as "PR for Action." The PR is also stamped with the applicable Mode of Procurement.',
        tasks: [
            { main: 'Open the Procurement Monitoring Google Sheet.', subs: [] },
            {
                main: 'Input the PR data under the appropriate fields:',
                subs: ['PR Number', 'Project Title', 'End User (requesting office/division)', 'ABC (Approved Budget for the Contract) amount', 'Status → set to "Not Yet Acted"', 'Date of Current Status (today\'s date)', 'Remarks → write "PR for Action"', 'Assign the date in the "Received PR for Action" column', 'Notes → enter your name as the modifier'],
            },
            {
                main: 'Stamp the Mode of Procurement on the PR form and check the applicable type:',
                subs: ['Shopping — used only when accompanied by a Certificate of Non-Availability of Stocks', 'SVP (Small Value Procurement) — for amounts above ₱50,000 and also for amounts ₱50,000 and below when applicable', 'Regular Bidding — for amounts ₱1,000,000 and above'],
            },
            { main: 'Check the appropriate ABC bracket on the form: check "No" if below ₱50,000; check "Yes" if ₱50,000 and above.', subs: [] },
            { main: 'Bring the stamped PR to the BAC Secretariat Head for signature.', subs: [] },
        ],
    },
    {
        id: 4, category: 'common', categoryLabel: 'COMMON',
        title: 'PR Deliberation (BAC Meeting)', icon: Gavel,
        color: 'border-violet-500/40 bg-violet-500/5', headerColor: 'bg-violet-500/10 border-violet-500/30',
        badgeColor: 'bg-violet-500/20 text-violet-300',
        analogy: 'This is like a board meeting where key decision-makers review project proposals, ask questions, and vote on whether to proceed. PRs are presented, discussed, and either approved or returned for corrections.',
        description: 'The BAC holds a regular meeting to formally deliberate on all submitted PRs. The BAC Secretariat assists in setting up the meeting, managing technology and attendance, and updating records afterward.',
        tasks: [
            { main: 'Assist in conducting the BAC Regular Meeting by preparing the venue and necessary materials.', subs: [] },
            { main: 'Circulate the attendance sheet for all BAC Members and observers to sign.', subs: [] },
            { main: 'Set up a Zoom Meeting and send the meeting link through the official Procurement Gmail Account.', subs: [] },
            {
                main: 'Manage the technical setup for the meeting:',
                subs: ['Ensure the TV, PC, and amplifier are working.', 'Connect Zoom for COA (Commission on Audit) remote attendance.', 'Start the Zoom recording for transparency documentation.', 'Extract a backup copy of the recording for the BAC Office files.'],
            },
            { main: 'After the BAC Members approve each PR, collect their initial signatures on the relevant PR forms.', subs: [] },
            {
                main: 'Update the Procurement Monitoring Google Sheet after the meeting:',
                subs: ['Locate the PR by its PR Number.', 'Set today\'s date in the "PR Deliberated" column.', 'Update "Date of Current Status" to today.', 'Change Status to "In Progress".', 'Update Remarks to "For PhilGEPS Posting".', 'Enter your name in the Notes column as the modifier.'],
            },
        ],
    },
    {
        id: 5, category: 'svp', categoryLabel: 'SVP / RFQ',
        title: 'RFQ Preparation', icon: FileText,
        color: 'border-emerald-500/40 bg-emerald-500/5', headerColor: 'bg-emerald-500/10 border-emerald-500/30',
        badgeColor: 'bg-emerald-500/20 text-emerald-300',
        analogy: 'Like preparing a detailed shopping checklist and price-request form that you send to multiple stores to compare their prices. Each field must be accurate so suppliers know exactly what you need.',
        description: 'The Request for Quotation (RFQ) is the official document sent to suppliers to collect their price quotations. The BAC Secretariat prepares the RFQ and the Abstract of Quotations in a spreadsheet, making sure all project details and item specifications are correctly entered.',
        tasks: [
            {
                main: 'Open the RFQ Worksheet and fill in the following fields:',
                subs: ['Project Reference Number', 'Name of Project', 'Date — use today\'s date; if the ABC is above ₱50,000, use tomorrow\'s date instead', 'Deadline Date — for above ₱50,000 only, set it to 7 days after tomorrow\'s date', 'Item Number, Item & Description, Quantity, Unit, Delivery Terms, Date of Delivery, Place of Delivery, Payment Terms', 'Estimated Total Cost'],
            },
            {
                main: 'Open the Abstract and Proof of Service Worksheets and link data from the RFQ sheet:',
                subs: ['Use the "=" formula in Excel/Sheets to pull data automatically.', 'Press Ctrl + D to duplicate formulas for multiple rows.', 'Use formulas such as =QTY*UNIT_COST and =SUM(Total) to compute values.', 'Manually input Unit Cost and Total columns for each supplier\'s quote.'],
            },
            {
                main: 'Double-check the following before printing:',
                subs: ['All monetary values are correct', 'No spelling errors in item names or project title', 'Lines, borders, and page margins are suitable for printing'],
            },
            { main: 'If signature images are not appearing in the document, press Ctrl + 6 to toggle image display.', subs: [] },
            { main: 'Print one (1) copy of the RFQ.', subs: [] },
            { main: 'Attach the PR Form Slip to the printed RFQ. Make sure PR Number, Received Date, Acted Date, and Published Date are filled in.', subs: [] },
        ],
    },
    {
        id: 6, category: 'svp', categoryLabel: 'SVP / POSTING',
        title: 'RFQ Posting & Distribution', icon: Send,
        color: 'border-teal-500/40 bg-teal-500/5', headerColor: 'bg-teal-500/10 border-teal-500/30',
        badgeColor: 'bg-teal-500/20 text-teal-300',
        analogy: 'Like posting a "For Sale" ad on multiple bulletin boards and personally mailing copies to potential buyers. The more visibility, the better the competition and pricing.',
        description: 'After the RFQ is finalized and printed, multiple copies are prepared, distributed, and posted as required. This step ensures that suppliers are properly notified and that the procurement process is transparent and compliant.',
        tasks: [
            { main: 'Print four (4) copies of the RFQ and one (1) copy of the Proof of Service.', subs: [] },
            { main: 'Attach/staple an envelope to each of the 3 supplier-copy RFQs. Attach the Proof of Service to the back of one of these copies.', subs: [] },
            { main: 'Record the procurement in the posting log (PR Number, Project Title, ABC amount).', subs: [] },
            { main: 'Submit the 3 supplier copies and Proof of Service to the BAC Head for acknowledgment and signature.', subs: [] },
            { main: 'Post the 1 Bulletin Board copy of the RFQ on the official Bulletin Board for public viewing.', subs: [] },
            {
                main: 'Update the Procurement Monitoring Google Sheet:',
                subs: ['Set today\'s date in the "Published" column.', 'Update Remarks to "For Canvass".', 'Enter your name in the Notes column.'],
            },
            { main: 'For procurements with ABC above ₱50,000: post the RFQ to PhilGEPS as well.', subs: [] },
        ],
    },
    {
        id: 7, category: 'svp', categoryLabel: 'SVP',
        title: 'RFQ Opening', icon: Gavel,
        color: 'border-orange-500/40 bg-orange-500/5', headerColor: 'bg-orange-500/10 border-orange-500/30',
        badgeColor: 'bg-orange-500/20 text-orange-300',
        analogy: 'Like opening sealed bid envelopes at an auction — it\'s a formal event with witnesses where submitted price offers are officially received and documented.',
        description: 'On the deadline date, the BAC Secretariat formally opens the submitted quotations. The date of opening is recorded in the Abstract of Quotations, and the Procurement Monitoring Sheet is updated accordingly.',
        tasks: [
            { main: 'Open the Abstract Worksheet and enter the current date in the "Date of Bids Opened" field.', subs: [] },
            { main: 'Update the Procurement Monitoring Google Sheet with today\'s date in the "RFQ Opening" column.', subs: [] },
        ],
    },
    {
        id: 8, category: 'svp', categoryLabel: 'SVP',
        title: 'Abstract Evaluation & LCRB', icon: FileSpreadsheet,
        color: 'border-purple-500/40 bg-purple-500/5', headerColor: 'bg-purple-500/10 border-purple-500/30',
        badgeColor: 'bg-purple-500/20 text-purple-300',
        analogy: 'Like a judge scoring a competition — you tally up each contestant\'s scores, determine who followed all the rules, and declare who wins based on the lowest compliant price.',
        description: 'After all quotations are collected, the BAC Secretariat evaluates and compares the prices of all participating suppliers. This determines which supplier offers the lowest compliant price and is eligible to win the procurement.',
        tasks: [
            { main: 'Calculate each supplier\'s total quoted price for all items in the Abstract.', subs: [] },
            {
                main: 'Evaluate and classify each supplier:',
                subs: ['LCRB — Lowest Calculated Responsive Bid (the qualified winning supplier)', 'SCRB — Second Lowest Calculated Responsive Bid', '1st LCB, 2nd LCB — other ranked compliant bidders', 'Non-Compliant — suppliers who did not meet the required specifications', 'No Bid — suppliers who did not submit any quotation'],
            },
            { main: 'Contact the winning supplier (LCRB) to request their legal documents: COR, Business Permit, PhilGEPS Certificate, Omnibus Sworn Statement.', subs: [] },
        ],
    },
    {
        id: 9, category: 'svp', categoryLabel: 'SVP',
        title: 'Evaluation & Declaration', icon: CheckCircle2,
        color: 'border-green-500/40 bg-green-500/5', headerColor: 'bg-green-500/10 border-green-500/30',
        badgeColor: 'bg-green-500/20 text-green-300',
        analogy: 'Like the final inspection phase — the technical team confirms that the winning bidder\'s offer actually meets all the technical requirements before a winner is declared.',
        description: 'The Technical Working Group (TWG) and the End User conduct a formal evaluation of the winning supplier\'s offered specifications. If the items comply with the requirements, the supplier is declared the winner.',
        tasks: [
            { main: 'Coordinate with the TWG and End User for the evaluation of submitted technical specifications and samples.', subs: [] },
            { main: 'Document the evaluation results in the appropriate form.', subs: [] },
            { main: 'Officially declare the winning supplier based on the evaluation result.', subs: [] },
        ],
    },
    {
        id: 10, category: 'svp', categoryLabel: 'SVP',
        title: 'BAC Resolution, NOA & NTP', icon: BookMarked,
        color: 'border-indigo-500/40 bg-indigo-500/5', headerColor: 'bg-indigo-500/10 border-indigo-500/30',
        badgeColor: 'bg-indigo-500/20 text-indigo-300',
        analogy: 'Like drafting the formal award letter and contract notice — these documents officially declare the winner, authorize the award, and notify the supplier to begin delivery.',
        description: 'After the evaluation, the BAC Secretariat prepares the final set of award documents: the BAC Resolution, Notice of Award (NOA), and Notice to Proceed (NTP).',
        tasks: [
            { main: 'Edit the template documents based on the Purchase Request details (project title, PR number, supplier name, dates, ABC, contract amount).', subs: [] },
            { main: 'For the BAC Resolution: clearly state the legal basis used to justify the procurement mode or any failed procurement situation (cite the specific provision of RA 9184 or RA 12009).', subs: [] },
            {
                main: 'Update the Procurement Monitoring Google Sheet:',
                subs: ['Set today\'s date in the "BAC Reso" column.', 'Update Remarks to "For P.O." (Purchase Order).', 'Enter the winning supplier\'s name in the "Supplier" column.', 'Enter your name in the Notes column.'],
            },
        ],
    },
    {
        id: 11, category: 'svp', categoryLabel: 'SVP',
        title: 'Document Routing for Signatures', icon: Users,
        color: 'border-amber-500/40 bg-amber-500/5', headerColor: 'bg-amber-500/10 border-amber-500/30',
        badgeColor: 'bg-amber-500/20 text-amber-300',
        analogy: 'Like routing a memo through a chain of command — each official in the hierarchy signs or initials the document to show their review, concurrence, and authority.',
        description: 'The finalized BAC Resolution, Abstract, and other procurement documents are routed to all required signatories. Each signatory initials or signs based on their role and authority.',
        tasks: [
            { main: 'BAC Secretariat Head initials the documents before routing to the Chairperson.', subs: [] },
            { main: 'Route to the End User or HOPE (GSD, HRD, EEMD, BDD, MISD, or OAPIA depending on the project origin).', subs: [] },
            { main: 'Route to the Chairperson (from EAD).', subs: [] },
            { main: 'Route to the Vice Chairperson (from RALMD).', subs: [] },
            { main: 'Route to the Provisional Member (from CPD).', subs: [] },
            { main: 'Route to BAC Members 1, 2, and 3 (from FD, LSD, and VACRD respectively).', subs: [] },
            { main: 'For procurements with ABC above ₱50,000: also route to the Accounting Division for their signature.', subs: [] },
        ],
    },
    {
        id: 12, category: 'common', categoryLabel: 'COMMON',
        title: 'Abstract for Purchase Order', icon: Package,
        color: 'border-cyan-500/40 bg-cyan-500/5', headerColor: 'bg-cyan-500/10 border-cyan-500/30',
        badgeColor: 'bg-cyan-500/20 text-cyan-300',
        analogy: 'Like filing and forwarding the finalized contract to the purchasing department so they can place the actual order. This is the handoff from the BAC Office to GSD for order processing.',
        description: 'Once all documents are signed, the BAC Secretariat compiles, scans, and forwards the procurement documents to the GSD (General Services Division) for preparation of the Purchase Order.',
        tasks: [
            { main: 'Scan all compiled procurement documents for the BAC Office\'s digital archive copy.', subs: [] },
            {
                main: 'Prepare the document package to be forwarded to GSD. Include:',
                subs: ['1 copy of the Abstract of Quotations', '1 copy of the BAC Resolution (Only for 50K Above)', '1 draft copy of the Abstract', '1 copy of the Purchase Request'],
            },
            {
                main: 'Log the outgoing documents in the BAC Outgoing Log Book.',
                subs: ['Indicate whether the procurement is "Below 50K" or "Above 50K".', 'Stamp the date for the RFQ for Canvass column and Abstract for P.O.'],
            },
            {
                main: 'Update the Procurement Monitoring Google Sheet:',
                subs: ['Set today\'s date in the "Forwarded to GSD for P.O." column.', 'Change Status to "Completed".', 'Enter your name in the Notes column.'],
            },
        ],
    },
    {
        id: 13, category: 'common', categoryLabel: 'COMMON',
        title: 'Purchase Order (GSD)', icon: Package,
        color: 'border-slate-500/40 bg-slate-500/5', headerColor: 'bg-slate-500/10 border-slate-500/30',
        badgeColor: 'bg-slate-500/20 text-slate-300',
        analogy: 'The final handoff — like handing your completed order form to the store cashier. GSD takes over from here to contact the supplier, confirm the order, arrange delivery, and inspect the items.',
        description: 'The GSD (General Services Division) takes over from the BAC Office at this stage. GSD is responsible for issuing the formal Purchase Order to the winning supplier, coordinating the delivery, and conducting inspection of the items delivered.',
        tasks: [
            { main: 'GSD issues the Purchase Order to the winning supplier.', subs: [] },
            { main: 'GSD coordinates with the supplier for the scheduling and delivery of items.', subs: [] },
            { main: 'GSD conducts an inspection of delivered items upon receipt.', subs: [] },
        ],
    },
    {
        id: 14, category: 'common', categoryLabel: 'COMMON',
        title: 'PMR (Procurement Monitoring Report)', icon: BarChart2,
        color: 'border-violet-500/40 bg-violet-500/5', headerColor: 'bg-violet-500/10 border-violet-500/30',
        badgeColor: 'bg-violet-500/20 text-violet-300',
        analogy: 'Like submitting a quarterly performance report to management — you record all completed procurement activities, including costs and timelines, as a formal accountability document.',
        description: 'The Procurement Monitoring Report (PMR) is a GPPB-required report that documents all procurement activities. The BAC Secretariat fills in each completed procurement\'s details. Failed procurements are not included.',
        tasks: [
            {
                main: 'Open the PMR Google Sheet and input data for each completed procurement (excluding failed ones):',
                subs: ['PR Number', 'Procurement Project Title', 'End User (requesting division/office)', 'Mode of Procurement (e.g., SVP)', 'Date of Opening of Bids', 'Date of Bid Evaluation', 'ABC — total amount and MOOE breakdown', 'Contract Cost — total amount and MOOE breakdown'],
            },
            { main: 'Stamp the PMR with "Posted" and write the current date.', subs: [] },
        ],
    },
    {
        id: 15, category: 'common', categoryLabel: 'COMMON',
        title: 'Archive to Drawer & File Tracking', icon: Archive,
        color: 'border-slate-500/40 bg-slate-500/5', headerColor: 'bg-slate-500/10 border-slate-500/30',
        badgeColor: 'bg-slate-500/20 text-slate-300',
        analogy: 'Like filing a finished case folder in a cabinet organized by month and year. Proper filing ensures documents can be retrieved quickly during audits or future reference.',
        description: 'All completed procurement documents are physically filed and archived in the designated drawer or cabinet. The file tracking system is then updated for digital retrieval.',
        tasks: [
            { main: 'Insert the completed procurement documents into the drawer or filing folder designated for the specific month and year.', subs: [] },
            { main: 'Open the File Tracking System and input all relevant data based on the archived copy: PR Number, Project Title, End User, Mode, ABC, and archive location.', subs: [] },
        ],
    },
    {
        id: 16, category: 'additional', categoryLabel: 'ADDITIONAL',
        title: 'Pre-Procurement & Pre-Bid Conference', icon: Megaphone,
        color: 'border-pink-500/40 bg-pink-500/5', headerColor: 'bg-pink-500/10 border-pink-500/30',
        badgeColor: 'bg-pink-500/20 text-pink-300',
        analogy: 'Like a project kick-off meeting or a Q&A session with contractors before construction begins — everyone aligns on the scope, rules, and requirements before the official start.',
        description: 'For Regular Bidding and large procurements, the BAC Secretariat assists in conducting formal Pre-Procurement and Pre-Bid Conferences via Zoom. These meetings are official and must be properly documented.',
        tasks: [
            { main: 'Use the official Procurement Gmail Account for all communications: E: procurement@piamo.gov.ph | P: PIABACSEC2025@', subs: [] },
            { main: 'Prepare and set up all required documents and presentation materials before the meeting.', subs: [] },
            { main: 'Start the meeting setup 15–20 minutes before the scheduled time.', subs: [] },
            { main: 'Start Zoom recording when the presentation begins (or as directed by the BAC Secretariat Head).', subs: [] },
            { main: 'Send in Zoom Chat: "Good Morning! Kindly type your name, location, and device used for attendance purposes. Thank you!" — re-send periodically.', subs: [] },
            { main: 'When discussing document images on screen, zoom in by pressing Ctrl + Scroll Up. Press Ctrl + Click to unzoom.', subs: [] },
            { main: 'Before ending the meeting, take a screenshot of the full Zoom chat window for attendance documentation.', subs: [] },
        ],
    },
    {
        id: 17, category: 'rb', categoryLabel: 'REG. BIDDING',
        title: 'Bid Opening', icon: Gavel,
        color: 'border-blue-500/40 bg-blue-500/5', headerColor: 'bg-blue-500/10 border-blue-500/30',
        badgeColor: 'bg-blue-500/20 text-blue-300',
        analogy: 'Like a formal sealed-bid auction — envelopes are opened in public with witnesses, each bidder\'s documents are checked against requirements, and results are recorded in real time.',
        description: 'The Bid Opening is a formal public event where the BAC Secretariat opens and checks all submitted bid documents. Zoom is used for remote attendees, and all results are encoded in the Opening of Bids spreadsheet.',
        tasks: [
            { main: 'Set up the Zoom Meeting, start screen sharing and recording.', subs: [] },
            { main: 'Take attendance for all physically present committee members and suppliers.', subs: [] },
            { main: 'Open sealed bid document envelopes. Distribute the documents to the respective committee members for review.', subs: [] },
            { main: 'Encode the result for each bidder in the Opening of Bids Spreadsheet — mark each item as "Passed" or "Failed" per document requirement.', subs: [] },
            {
                main: 'If a qualified bidder offers a discount, compute the final bid amount:',
                subs: ['Compute 2.5% of Bid Amount: = Bid Amount × 0.025', 'Net Bid = Bid Amount − Discount Amount'],
            },
            { main: 'Declare the LCRB, 1st LCB, 2nd LCB, and so on in ranked order.', subs: [] },
        ],
    },
    {
        id: 18, category: 'rb', categoryLabel: 'REG. BIDDING',
        title: 'TWG Evaluation', icon: Search,
        color: 'border-indigo-500/40 bg-indigo-500/5', headerColor: 'bg-indigo-500/10 border-indigo-500/30',
        badgeColor: 'bg-indigo-500/20 text-indigo-300',
        analogy: 'Like a panel of technical experts reviewing submitted product samples against a specification sheet — they determine whether the offered products truly meet what was required.',
        description: 'The Technical Working Group (TWG) conducts a formal evaluation of the bidders\' technical proposals. The BAC Secretariat assists with the Zoom setup and documentation.',
        tasks: [
            { main: 'Set up the Zoom Meeting, start screen sharing and recording as in previous meetings.', subs: [] },
            { main: 'The TWG members present the evaluation results. Assist as needed.', subs: [] },
            { main: 'Take attendance of all committee members during the evaluation meeting.', subs: [] },
        ],
    },
    {
        id: 19, category: 'rb', categoryLabel: 'REG. BIDDING',
        title: 'Post-Qualification', icon: CheckCircle2,
        color: 'border-emerald-500/40 bg-emerald-500/5', headerColor: 'bg-emerald-500/10 border-emerald-500/30',
        badgeColor: 'bg-emerald-500/20 text-emerald-300',
        analogy: 'Like a final background check on the winning job applicant — verifying all their credentials are authentic before issuing the official job offer letter.',
        description: 'Post-Qualification is the final verification step during Regular Bidding. The BAC formally validates all submitted documents of the LCRB bidder and declares them as the officially qualified winner.',
        tasks: [
            { main: 'Review and validate the LCRB\'s submitted eligibility and bid documents for authenticity and completeness.', subs: [] },
            { main: 'Edit the Post-Qualification Report template based on the specific details of the procurement and the bidder\'s information.', subs: [] },
            { main: 'Formally declare the bidder as qualified or disqualified and document the result.', subs: [] },
        ],
    },
    {
        id: 20, category: 'rb', categoryLabel: 'REG. BIDDING',
        title: 'Contract Signing & Bound Copies', icon: Printer,
        color: 'border-teal-500/40 bg-teal-500/5', headerColor: 'bg-teal-500/10 border-teal-500/30',
        badgeColor: 'bg-teal-500/20 text-teal-300',
        analogy: 'Like assembling a complete legal binder for a real estate transaction — every document is organized, certified, and signed before being submitted for official registration.',
        description: 'The final step in a Regular Bidding procurement is assembling the complete set of documents into official bound copies. These are distributed to COA, Accounting, and the End User.',
        tasks: [
            { main: 'Print the Document Checklist and page identification labels (alphabetical order: A, B, C…).', subs: [] },
            { main: 'Punch holes in all compiled documents and insert them into the Blue Binder.', subs: [] },
            { main: 'Stamp "CERTIFIED" on each document and write the certification date. These copies must be signed by the BAC Secretariat Head.', subs: [] },
            { main: 'Prepare and have signed the transmittal/cover letter addressed to the Supplier and End User.', subs: [] },
            { main: 'Use the Outgoing Documents Log Book to record the receipt of the bound copies by COA, Accounting, and the End User.', subs: [] },
        ],
    },
    {
        id: 21, category: 'additional', categoryLabel: 'ADDITIONAL',
        title: 'Attaching Proof of Attendance / Meals', icon: Camera,
        color: 'border-orange-500/40 bg-orange-500/5', headerColor: 'bg-orange-500/10 border-orange-500/30',
        badgeColor: 'bg-orange-500/20 text-orange-300',
        analogy: 'Like attaching your receipts to an expense reimbursement form — the photos and receipts are evidence that the activity actually occurred.',
        description: 'When meals or snacks are provided during official meetings, the expense must be supported by documented proof of attendance and receipts.',
        tasks: [
            { main: 'Compile photos taken during the meeting (lunch or snack photos) as visual proof of the event.', subs: [] },
            { main: 'Paste the official receipt(s) neatly on a bond paper.', subs: [] },
            { main: 'Photocopy the bond paper with receipt — make 2 copies for the record.', subs: [] },
            { main: 'Attach the photos and receipt copies to the meeting documentation or liquidation report.', subs: [] },
        ],
    },
];

/* ─── Validate Modal ─────────────────────────────────────────────────────────
   Key behaviour: when the user types a PR number and clicks "Open Sheet",
   the PR number is automatically copied to the clipboard so they can just
   press Ctrl+F → Ctrl+V inside the sheet without having to re-type anything.
─────────────────────────────────────────────────────────────────────────── */
interface SheetLink {
    label: string;
    desc: string;
    icon: React.ElementType;
    color: string;
    badge: string;
    glow: string;
    url: string;
    searchParam: string;
}

const ValidateModal: React.FC<{ link: SheetLink; onClose: () => void }> = ({ link, onClose }) => {
    const [prNumber, setPrNumber] = useState('');
    const [copied,   setCopied]   = useState(false);

    const Icon = link.icon;

    // Copy to clipboard helper
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
            return true;
        } catch {
            return false;
        }
    };

    // Open the sheet AND auto-copy the PR number at the same moment
    const handleOpen = async () => {
        if (prNumber.trim()) {
            await copyToClipboard(prNumber.trim());
        }
        window.open(link.url, '_blank', 'noopener,noreferrer');
    };

    // Manual copy button (without opening the sheet)
    const handleCopyOnly = () => copyToClipboard(prNumber.trim());

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-[460px] rounded-2xl bg-[#0d0d1c] border border-[#1e1e38] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">

                {/* ── Header ── */}
                <div className="p-5 border-b border-[#1e1e38]">
                    <div className="flex items-center justify-between mb-3">
                        <div className={`flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider ${link.badge}`}>
                            <Icon className="w-3 h-3" />
                            VIEW & VALIDATE
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg hover:bg-white/8 text-slate-500 hover:text-slate-300 transition"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <h2 className="text-base font-bold text-slate-100">{link.label}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{link.desc}</p>
                </div>

                {/* ── Body ── */}
                <div className="p-5 space-y-4">
                    <div>
                        <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2 block">
                            PR Number{' '}
                            <span className="normal-case font-normal text-slate-600">
                                (optional — for quick search)
                            </span>
                        </label>

                        {/* Input row with inline copy button */}
                        <div className="relative flex items-center">
                            <Search className="absolute left-3 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                            <input
                                type="text"
                                value={prNumber}
                                onChange={e => setPrNumber(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') handleOpen(); }}
                                placeholder="e.g. 2025-MAR-001 or GSD-MAR-25-001"
                                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#111124] border border-[#1e1e38] text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition"
                            />
                            {prNumber.trim() && (
                                <button
                                    onClick={handleCopyOnly}
                                    title="Copy PR number to clipboard"
                                    className="absolute right-2.5 p-1 rounded text-slate-500 hover:text-slate-200 transition"
                                >
                                    {copied
                                        ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                        : <Copy className="w-4 h-4" />
                                    }
                                </button>
                            )}
                        </div>

                        {/* Contextual hint */}
                        {prNumber.trim() ? (
                            <div className="mt-2.5 p-3 rounded-lg bg-emerald-500/8 border border-emerald-500/20 space-y-2">
                                <p className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                                    After clicking "Open Sheet", do this inside Google Sheets:
                                </p>
                                <ol className="space-y-1.5 ml-1">
                                    <li className="flex items-center gap-2 text-[11px]">
                                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-400">1</span>
                                        <span className="text-slate-400">
                                            Press{' '}
                                            <kbd className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-200 text-[10px] font-mono">Ctrl + F</kbd>
                                            {' '}to open the search bar
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2 text-[11px]">
                                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-400">2</span>
                                        <span className="text-slate-400">
                                            Press{' '}
                                            <kbd className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-200 text-[10px] font-mono">Ctrl + V</kbd>
                                            {' '}— the PR number is <span className="text-emerald-400 font-semibold">already copied!</span>
                                        </span>
                                    </li>
                                </ol>
                                <p className="text-[10px] text-slate-600 pl-1 pt-0.5">
                                    Searching for:{' '}
                                    <span className="font-mono text-slate-400">{prNumber.trim()}</span>
                                </p>
                            </div>
                        ) : (
                            <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                                Enter a PR Number above and it will be automatically copied to your clipboard when you open the sheet — just press{' '}
                                <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">Ctrl+F</kbd>{' '}then{' '}
                                <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">Ctrl+V</kbd>.
                            </p>
                        )}
                    </div>

                    {/* ── Action buttons ── */}
                    <div className="flex gap-2.5">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-slate-200 hover:bg-white/8 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleOpen}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:brightness-110 bg-gradient-to-r from-indigo-600 to-violet-600"
                        >
                            {copied ? (
                                <>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                                    Copied & Opened
                                </>
                            ) : (
                                <>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Open Sheet
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─── Step Card ──────────────────────────────────────────────────────────── */
interface Step {
    id: number;
    category: string;
    categoryLabel: string;
    title: string;
    icon: React.ElementType;
    color: string;
    headerColor: string;
    badgeColor: string;
    analogy: string;
    description: string;
    tasks: Array<{ main: string; subs: string[] }>;
}

const StepCard: React.FC<{ step: Step }> = ({ step }) => {
    const [open, setOpen] = useState(false);
    const Icon = step.icon;

    return (
        <div className={`rounded-xl border ${step.color} overflow-hidden transition-all duration-200`}>
            <button
                onClick={() => setOpen(o => !o)}
                className={`w-full flex items-center gap-4 px-5 py-4 ${step.headerColor} border-b ${open ? '' : 'border-transparent'} transition-colors hover:brightness-110 text-left`}
            >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white/70" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[9px] font-bold tracking-widest px-2 py-0.5 rounded ${step.badgeColor}`}>{step.categoryLabel}</span>
                        <span className="text-[10px] text-slate-500 font-mono">STEP {step.id}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-100 mt-0.5">{step.title}</h3>
                </div>
                <div className="flex-shrink-0">
                    {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
            </button>

            {open && (
                <div className="px-5 py-4 space-y-4">
                    <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                    <div className="bg-amber-500/8 border border-amber-500/25 rounded-lg p-3.5">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-[9px] font-bold tracking-widest text-amber-400 uppercase">Real-Life Analogy</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed italic">{step.analogy}</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2.5">
                            <Info className="w-3.5 h-3.5 text-slate-500" />
                            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Tasks</span>
                        </div>
                        <ol className="space-y-2.5">
                            {step.tasks.map((task, i) => (
                                <li key={i}>
                                    <div className="flex items-start gap-2.5">
                                        <span className="flex-shrink-0 w-[18px] h-[18px] mt-0.5 rounded-full bg-slate-700/60 flex items-center justify-center text-[9px] font-bold text-slate-400">{i + 1}</span>
                                        <span className="text-xs text-slate-300 leading-relaxed">{task.main}</span>
                                    </div>
                                    {task.subs.length > 0 && (
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
                </div>
            )}
        </div>
    );
};

/* ─── Main Page ──────────────────────────────────────────────────────────── */
const ProcurementProcessFlow: React.FC = () => {
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [validateModal, setValidateModal]   = useState<SheetLink | null>(null);

    const categories = [
        { id: 'all',        label: 'All Steps',    dot: 'bg-slate-400'  },
        { id: 'common',     label: 'Common',       dot: 'bg-purple-400' },
        { id: 'svp',        label: 'SVP',          dot: 'bg-emerald-400'},
        { id: 'rb',         label: 'Reg. Bidding', dot: 'bg-blue-400'   },
        { id: 'optional',   label: 'Optional',     dot: 'bg-yellow-400' },
        { id: 'additional', label: 'Additional',   dot: 'bg-pink-400'   },
    ];

    const filtered = categoryFilter === 'all'
        ? PROCESS_STEPS
        : PROCESS_STEPS.filter(s => s.category === categoryFilter);

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
            {validateModal && (
                <ValidateModal link={validateModal} onClose={() => setValidateModal(null)} />
            )}

            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                    <h1 className="text-xl font-bold text-foreground">Procurement Process Flow</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                    Step-by-step guide for BAC Secretariat staff — from PR Logging to archiving. Includes quick access to working Google Sheets.
                </p>
            </div>

            {/* Google Sheets Quick-Links */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Star className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Quick Access — Google Sheets</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {SHEET_LINKS.map(link => {
                        const Icon = link.icon;
                        return (
                            <div
                                key={link.label}
                                className={`group relative flex flex-col gap-3 p-4 rounded-xl border bg-gradient-to-br ${link.color} transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className={`flex items-center gap-2 px-2 py-1 rounded text-[9px] font-bold tracking-wider ${link.badge}`}>
                                        <Icon className="w-3 h-3" />
                                        SHEETS
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-100">{link.label}</p>
                                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{link.desc}</p>
                                </div>
                                <div className="flex gap-1.5 mt-auto">
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-medium text-slate-400 hover:text-slate-200 hover:bg-white/10 transition"
                                        title="Open Google Sheet"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        Open
                                    </a>
                                    {/* <button
                                        onClick={() => setValidateModal(link)}
                                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-[10px] font-medium text-indigo-300 hover:bg-indigo-600/30 hover:border-indigo-400/50 transition"
                                        title="Search PR Number & Open"
                                    >
                                        <Search className="w-3 h-3" />
                                        Validate
                                    </button> */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend + Filter */}
            <div className="flex flex-wrap items-center gap-2">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setCategoryFilter(cat.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            categoryFilter === cat.id
                                ? 'bg-secondary text-foreground border border-border'
                                : 'text-muted-foreground hover:text-foreground border border-transparent'
                        }`}
                    >
                        <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                        {cat.label}
                    </button>
                ))}
                <span className="ml-auto text-[11px] text-muted-foreground">
                    {filtered.length} step{filtered.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Steps */}
            <div className="space-y-3">
                {filtered.map(step => (
                    <StepCard key={step.id} step={step} />
                ))}
            </div>

            {/* Info note */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                    This guide is based on actual BAC Secretariat workflows observed during office operations. For the most current templates, forms, and official procedures, always refer to the latest versions in the Google Sheets linked above and consult your BAC Secretariat Head.
                </p>
            </div>
        </div>
    );
};

export default ProcurementProcessFlow;