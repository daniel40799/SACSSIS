import AppRouter from "@/app/router/AppRouter.tsx";

export default function App() {
    return (<AppRouter/>);
}


// import { useState } from 'react';
// import {
//   HomeIcon,
//   UsersIcon,
//   AcademicCapIcon,
//   CalendarIcon,
//   ChartBarIcon,
//   CogIcon,
//   BellIcon,
//   UserCircleIcon,
//   PlusIcon,
//   PencilIcon,
//   TrashIcon,
//   BookOpenIcon,
// } from '@heroicons/react/24/outline';
//
// import { ComponentLibrary } from './pages/ComponentLibrary';
//
// // Layout
// import { AppShell } from './components/layout/AppShell';
// import { PageHeader } from './components/layout/PageHeader';
//
// // UI
// import { Button } from './components/ui/Button';
// import { Badge } from './components/ui/Badge';
// import { Card } from './components/ui/Card';
// import { Input } from './components/ui/Input';
// import { Select } from './components/ui/Select';
// import { Avatar, AvatarGroup } from './components/ui/Avatar';
// import { Dropdown } from './components/ui/Dropdown';
// import { ButtonGroup } from './components/ui/ButtonGroup';
//
// // Forms
// import { CheckboxGroup } from './components/forms/Checkbox';
// import { Toggle } from './components/forms/Toggle';
// import { Textarea } from './components/forms/Textarea';
// import { RadioGroup } from './components/forms/RadioGroup';
//
// // Feedback
// import { Alert } from './components/feedback/Alert';
// import { EmptyState } from './components/feedback/EmptyState';
//
// // Overlays
// import { Modal } from './components/overlays/Modal';
// import { Drawer } from './components/overlays/Drawer';
// import { ToastContainer, useToast } from './components/overlays/Toast';
//
// // Data Display
// import { DataTable } from './components/data-display/DataTable';
// import { StatGrid } from './components/data-display/StatCard';
// import { DescriptionList } from './components/data-display/DescriptionList';
// import { StackedList } from './components/data-display/StackedList';
//
// // Navigation
// import { Tabs } from './components/navigation/Tabs';
// import { Breadcrumb } from './components/navigation/Breadcrumb';
// import { Pagination } from './components/navigation/Pagination';
// import { ProgressBar, StepProgressBar } from './components/navigation/ProgressBar';
//
// // ── Data ──────────────────────────────────────────────────────────────────────
//
// type AppPage = 'dashboard' | 'component-library';
//
// const navigation = [
//   { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
//   { name: 'Students', href: '#', icon: UsersIcon, current: false, badge: 247 },
//   { name: 'Faculty', href: '#', icon: AcademicCapIcon, current: false },
//   { name: 'Attendance', href: '#', icon: CalendarIcon, current: false },
//   { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
//   { name: 'Component Library', href: '#', icon: BookOpenIcon, current: false },
//   { name: 'Settings', href: '#', icon: CogIcon, current: false },
// ];
//
// const stats = [
//   { name: 'Total Students', stat: '2,847', change: '12%', changeType: 'increase' as const },
//   { name: 'Active Faculty', stat: '142', change: '3%', changeType: 'increase' as const },
//   { name: 'Avg. Attendance', stat: '94.2%', change: '1.5%', changeType: 'decrease' as const },
//   { name: 'Enrolled Courses', stat: '38', change: '4', changeType: 'increase' as const },
// ];
//
// interface Student {
//   id: string;
//   name: string;
//   grade: string;
//   status: string;
//   email: string;
//   enrolled: string;
// }
//
// const students: Student[] = [
//   { id: '1', name: 'Alice Johnson', grade: '10th', status: 'Active', email: 'alice@school.edu', enrolled: 'Sep 2022' },
//   { id: '2', name: 'Bob Martinez', grade: '11th', status: 'Active', email: 'bob@school.edu', enrolled: 'Sep 2021' },
//   { id: '3', name: 'Carol Williams', grade: '9th', status: 'Inactive', email: 'carol@school.edu', enrolled: 'Sep 2023' },
//   { id: '4', name: 'David Lee', grade: '12th', status: 'Active', email: 'david@school.edu', enrolled: 'Sep 2020' },
// ];
//
// const teamMembers = [
//   { id: '1', primary: 'Alice Johnson', secondary: 'alice@school.edu', meta: 'Student', metaDetail: 'Last seen 3h ago', avatarInitials: 'AJ' },
//   { id: '2', primary: 'Bob Martinez', secondary: 'bob@school.edu', meta: 'Student', badge: <Badge color="green" dot>Online</Badge>, avatarInitials: 'BM' },
//   { id: '3', primary: 'Dr. Carol Smith', secondary: 'carol@school.edu', meta: 'Faculty', metaDetail: 'Mathematics Dept', avatarInitials: 'CS' },
// ];
//
// const descriptionItems = [
//   { term: 'Full name', detail: 'Alice Johnson' },
//   { term: 'Grade', detail: '10th Grade' },
//   { term: 'Email', detail: 'alice@school.edu' },
//   { term: 'Status', detail: <Badge color="green" dot>Active</Badge> },
//   { term: 'Enrolled', detail: 'September 2022' },
//   { term: 'Notes', detail: 'High-achieving student in STEM courses.' },
// ];
//
// const checkboxOptions = [
//   { id: 'email', label: 'Email Notifications', description: 'Receive updates via email.' },
//   { id: 'sms', label: 'SMS Alerts', description: 'Get urgent alerts via text.' },
//   { id: 'push', label: 'Push Notifications', description: 'Browser push notifications.' },
// ];
//
// const radioOptions = [
//   { value: 'full', label: 'Full Time', description: 'All course days per week.' },
//   { value: 'part', label: 'Part Time', description: 'Flexible schedule.' },
//   { value: 'remote', label: 'Remote', description: 'Online only courses.' },
// ];
//
// const gradeOptions = [
//   { value: '9', label: '9th Grade' },
//   { value: '10', label: '10th Grade' },
//   { value: '11', label: '11th Grade' },
//   { value: '12', label: '12th Grade' },
// ];
//
// const tabsList = [
//   { name: 'Overview', current: true },
//   { name: 'Students', current: false },
//   { name: 'Faculty', current: false, badge: 12 },
//   { name: 'Reports', current: false },
// ];
//
// const breadcrumbItems = [
//   { name: 'Students', href: '#' },
//   { name: 'Alice Johnson', current: true },
// ];
//
// const dropdownItems = [
//   { label: 'Edit Profile', onClick: () => {} },
//   { label: 'View Reports', href: '#' },
//   { label: 'Export Data', onClick: () => {} },
//   { label: 'Delete', onClick: () => {}, danger: true, dividerBefore: true },
// ];
//
// const tableColumns = [
//   { key: 'name', header: 'Name' },
//   { key: 'grade', header: 'Grade' },
//   { key: 'email', header: 'Email' },
//   { key: 'enrolled', header: 'Enrolled' },
//   {
//     key: 'status',
//     header: 'Status',
//     render: (val: unknown) => (
//       <Badge color={val === 'Active' ? 'green' : 'gray'} dot>
//         {String(val)}
//       </Badge>
//     ),
//   },
//   {
//     key: 'actions',
//     header: '',
//     render: () => (
//       <span className="flex gap-x-2">
//         <button className="text-indigo-600 hover:text-indigo-900"><PencilIcon className="h-4 w-4" /></button>
//         <button className="text-red-500 hover:text-red-700"><TrashIcon className="h-4 w-4" /></button>
//       </span>
//     ),
//   },
// ];
//
// // ── App ───────────────────────────────────────────────────────────────────────
//
// export default function App() {
//   const [activePage, setActivePage] = useState<AppPage>('dashboard');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [showAlert, setShowAlert] = useState(true);
//   const [currentPage, setCurrentPage] = useState(2);
//   const [progress, setProgress] = useState(65);
//   const [checkboxValues, setCheckboxValues] = useState<string[]>(['email']);
//   const [radioValue, setRadioValue] = useState('full');
//   const [toggleEnabled, setToggleEnabled] = useState(true);
//   const { messages, addToast, removeToast } = useToast();
//
//   const logo = (
//     <div className="flex items-center gap-2">
//       <AcademicCapIcon className="h-8 w-8 text-indigo-600" />
//       <span className="text-lg font-bold text-gray-900">EduPortal</span>
//     </div>
//   );
//
//   const topbarActions = (
//     <div className="flex items-center gap-x-4">
//       <button
//         type="button"
//         onClick={() => addToast({ title: 'New message!', description: 'You have a new notification.', variant: 'info' })}
//         className="relative text-gray-400 hover:text-gray-500"
//       >
//         <span className="sr-only">Notifications</span>
//         <BellIcon className="h-6 w-6" aria-hidden="true" />
//         <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
//           3
//         </span>
//       </button>
//       <AvatarGroup
//         avatars={[
//           { initials: 'AJ' },
//           { initials: 'BM' },
//           { initials: 'CS' },
//           { initials: 'DL' },
//           { initials: 'EW' },
//         ]}
//         size="sm"
//         max={3}
//       />
//       <div className="flex items-center gap-x-2 text-sm text-gray-700">
//         <UserCircleIcon className="h-8 w-8 text-gray-400" />
//         <span className="hidden md:block font-medium">Admin User</span>
//       </div>
//     </div>
//   );
//
//   return (
//     <div className="h-screen bg-gray-50">
//       {activePage === 'component-library' ? (
//         <>
//           <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-x-4">
//             <button
//               type="button"
//               onClick={() => setActivePage('dashboard')}
//               className="flex items-center gap-x-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
//             >
//               <HomeIcon className="h-4 w-4" /> Back to Dashboard
//             </button>
//           </div>
//           <ComponentLibrary />
//         </>
//       ) : (
//       <AppShell
//         navigation={navigation.map(n => ({ ...n, onClick: n.name === 'Component Library' ? () => setActivePage('component-library') : undefined }))}
//         logo={logo}
//         topbarActions={topbarActions}
//       >
//         <div className="space-y-10">
//
//           {/* ── Page Header + Breadcrumb ── */}
//           <div>
//             <Breadcrumb items={breadcrumbItems} className="mb-4" />
//             <PageHeader
//               title="Dashboard"
//               subtitle="Welcome back! Here's what's happening at your school today."
//               actions={
//                 <>
//                   <ButtonGroup items={[
//                     { label: 'Day', active: true },
//                     { label: 'Week' },
//                     { label: 'Month' },
//                   ]} />
//                   <Dropdown label="Actions" items={dropdownItems} />
//                   <Button
//                     variant="primary"
//                     leadingIcon={<PlusIcon className="h-4 w-4" />}
//                     onClick={() => setModalOpen(true)}
//                   >
//                     Add Student
//                   </Button>
//                 </>
//               }
//             />
//           </div>
//
//           {/* ── Alert ── */}
//           {showAlert && (
//             <Alert
//               variant="info"
//               title="Term Registration Open"
//               message="Spring 2025 term registration is now open. Students can enroll in courses through the student portal until March 31."
//               dismissible
//               onDismiss={() => setShowAlert(false)}
//             />
//           )}
//
//           {/* ── Stats ── */}
//           <StatGrid stats={stats} columns={4} title="Key Metrics" />
//
//           {/* ── Progress Bars ── */}
//           <Card header={<h3 className="text-base font-semibold text-gray-900">Enrollment Progress</h3>}>
//             <div className="space-y-4">
//               <ProgressBar label="Math Dept" value={progress} showPercentage color="indigo" />
//               <ProgressBar label="Science Dept" value={82} showPercentage color="green" />
//               <ProgressBar label="Arts Dept" value={45} showPercentage color="yellow" />
//               <StepProgressBar
//                 steps={['Applications', 'Review', 'Enrolled', 'Active']}
//                 currentStep={2}
//               />
//             </div>
//             <div className="mt-4 flex items-center gap-x-3">
//               <Button variant="secondary" size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>−10%</Button>
//               <Button variant="secondary" size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10%</Button>
//             </div>
//           </Card>
//
//           {/* ── Tabs + Table ── */}
//           <div>
//             <Tabs tabs={tabsList} className="mb-6" />
//             <Card padding={false}>
//               <DataTable
//                 columns={tableColumns}
//                 data={students as unknown as Record<string, unknown>[]}
//                 title="Recent Students"
//                 description="Students recently added or updated."
//                 action={
//                   <Button variant="primary" onClick={() => setModalOpen(true)}>
//                     Add student
//                   </Button>
//                 }
//                 getRowKey={(_row, i) => i}
//               />
//               <div className="px-4 py-3 border-t border-gray-200">
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={10}
//                   onPageChange={setCurrentPage}
//                   variant="simple"
//                 />
//               </div>
//             </Card>
//           </div>
//
//           {/* ── Three-column grid ── */}
//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//
//             {/* Stacked list */}
//             <div className="lg:col-span-2">
//               <Card header={<h3 className="text-base font-semibold text-gray-900">Team Members</h3>}>
//                 <StackedList items={teamMembers} />
//               </Card>
//             </div>
//
//             {/* Right column */}
//             <div className="space-y-6">
//
//               {/* Avatars showcase */}
//               <Card header={<h3 className="text-base font-semibold text-gray-900">Avatars</h3>}>
//                 <div className="flex flex-wrap items-center gap-3">
//                   <Avatar size="xs" initials="AJ" />
//                   <Avatar size="sm" initials="BM" />
//                   <Avatar size="md" initials="CS" />
//                   <Avatar size="lg" initials="DL" shape="rounded" />
//                   <Avatar size="xl" />
//                 </div>
//               </Card>
//
//               {/* Badge showcase */}
//               <Card header={<h3 className="text-base font-semibold text-gray-900">Badges</h3>}>
//                 <div className="flex flex-wrap gap-2">
//                   <Badge color="green" dot>Active</Badge>
//                   <Badge color="yellow" dot>Pending</Badge>
//                   <Badge color="red" dot>Inactive</Badge>
//                   <Badge color="blue">Enrolled</Badge>
//                   <Badge color="purple" variant="border">Alumni</Badge>
//                   <Badge color="gray">N/A</Badge>
//                 </div>
//               </Card>
//
//               {/* Empty state */}
//               <Card header={<h3 className="text-base font-semibold text-gray-900">Announcements</h3>}>
//                 <EmptyState title="No announcements" description="Check back soon." />
//               </Card>
//
//               {/* Quick actions */}
//               <Card header={<h3 className="text-base font-semibold text-gray-900">Quick Actions</h3>}>
//                 <div className="space-y-3">
//                   <Button variant="secondary" size="md" className="w-full justify-center" onClick={() => setDrawerOpen(true)}>
//                     Open Drawer
//                   </Button>
//                   <Button variant="soft" size="md" className="w-full justify-center" onClick={() => addToast({ title: 'Success!', description: 'Action completed.', variant: 'success' })}>
//                     Show Toast
//                   </Button>
//                   <Button variant="primary" size="md" className="w-full justify-center" onClick={() => addToast({ title: 'Error occurred', description: 'Please try again.', variant: 'error' })}>
//                     Show Error Toast
//                   </Button>
//                 </div>
//               </Card>
//             </div>
//           </div>
//
//           {/* ── Description List ── */}
//           <Card>
//             <DescriptionList
//               title="Student Profile"
//               subtitle="Alice Johnson — Personal details."
//               items={descriptionItems}
//               columns={2}
//             />
//           </Card>
//
//           {/* ── Forms Showcase ── */}
//           <Card header={<h3 className="text-base font-semibold text-gray-900">Forms Components</h3>}>
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               <div className="space-y-4">
//                 <Input label="Student Name" placeholder="Alice Johnson" />
//                 <Input label="Email" type="email" placeholder="alice@school.edu" />
//                 <Select label="Grade Level" options={gradeOptions} placeholder="Select grade" />
//                 <Textarea label="Notes" placeholder="Enter any notes..." rows={3} />
//               </div>
//               <div className="space-y-6">
//                 <Toggle
//                   label="Email Notifications"
//                   description="Receive updates and alerts via email."
//                   checked={toggleEnabled}
//                   onChange={setToggleEnabled}
//                 />
//                 <CheckboxGroup
//                   legend="Notification Preferences"
//                   options={checkboxOptions}
//                   values={checkboxValues}
//                   onChange={setCheckboxValues}
//                 />
//                 <RadioGroup
//                   name="enrollment-type"
//                   legend="Enrollment Type"
//                   options={radioOptions}
//                   value={radioValue}
//                   onChange={setRadioValue}
//                 />
//                 <div>
//                   <p className="text-sm text-gray-500">
//                     Toggle: <strong>{toggleEnabled ? 'On' : 'Off'}</strong>{' | '}
//                     Checkboxes: <strong>{checkboxValues.join(', ') || 'none'}</strong>{' | '}
//                     Radio: <strong>{radioValue}</strong>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Card>
//
//         </div>
//       </AppShell>
//       )} {/* end dashboard / component-library */}
//
//       {/* ── Modal ── */}
//       <Modal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title="Add New Student"
//         description="Fill in the details below to enroll a new student."
//         size="md"
//         footer={
//           <div className="flex gap-x-3 justify-end w-full">
//             <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
//             <Button variant="primary" onClick={() => {
//               setModalOpen(false);
//               addToast({ title: 'Student added!', description: 'The new student has been enrolled.', variant: 'success' });
//             }}>Save Student</Button>
//           </div>
//         }
//       >
//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <Input label="First Name" placeholder="Alice" />
//             <Input label="Last Name" placeholder="Johnson" />
//           </div>
//           <Input label="Email Address" type="email" placeholder="alice@school.edu" />
//           <Select label="Grade Level" options={gradeOptions} placeholder="Select a grade" />
//           <Input label="Enrollment Date" type="date" />
//           <Toggle label="Active Status" defaultChecked={true} />
//         </div>
//       </Modal>
//
//       {/* ── Drawer ── */}
//       <Drawer
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         title="Student Details"
//         description="Full profile and recent activity for Alice Johnson."
//         footer={
//           <>
//             <Button variant="secondary" onClick={() => setDrawerOpen(false)}>Cancel</Button>
//             <Button variant="primary" onClick={() => setDrawerOpen(false)}>Save Changes</Button>
//           </>
//         }
//       >
//         <DescriptionList items={descriptionItems} columns={1} />
//       </Drawer>
//
//       {/* ── Toast Container ── */}
//       <ToastContainer messages={messages} onClose={removeToast} position="top-right" />
//     </div>
//   );
// }
