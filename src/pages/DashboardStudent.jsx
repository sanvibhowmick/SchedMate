import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Settings, 
  Download, 
  MessageSquare, 
  BarChart3, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Filter,
  Search,
  Eye,
  Edit3,
  BookOpen,
  Microscope,
  Briefcase,
  ChevronDown,
  Target,
  TrendingUp,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

const TimetableDashboard = () => {
  const [activeView, setActiveView] = useState('weekly');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [draggedItem, setDraggedItem] = useState(null);
  const [hoveredSlot, setHoveredSlot] = useState(null);

  // Sample data
  const timeSlots = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const classes = [
  // MONDAY
  { id: 1, subject: 'Data Structures & Algorithms', teacher: 'Dr. Sharma', room: 'CS-201', group: 'CSE-A', type: 'theory', day: 0, time: 0, duration: 1, credits: 4 },
  { id: 2, subject: 'DSA Tutorial', teacher: 'Teaching Assistant', room: 'CS-105', group: 'CSE-All', type: 'tutorial', day: 0, time: 1, duration: 1, credits: 1 },
  { id: 3, subject: 'Discrete Mathematics', teacher: 'Dr. Patel', room: 'CS-301', group: 'CSE-B', type: 'theory', day: 0, time: 2, duration: 1, credits: 4 },
  { id: 4, subject: 'OOP (Java)', teacher: 'Prof. Kumar', room: 'CS-202', group: 'CSE-C', type: 'theory', day: 0, time: 3, duration: 1, credits: 4 },
  { id: 5, subject: 'OOP Lab', teacher: 'Prof. Kumar', room: 'Lab-202', group: 'CSE-A', type: 'lab', day: 0, time: 4, duration: 2, credits: 2 },
  { id: 6, subject: 'Professional Communication', teacher: 'Dr. Mehta', room: 'CS-106', group: 'CSE-All', type: 'theory', day: 0, time: 6, duration: 1, credits: 2 },
  { id: 7, subject: 'Co-Curricular / Coding Club', teacher: 'Mentor', room: 'Lab-210', group: 'CSE-All', type: 'activity', day: 0, time: 7, duration: 1, credits: 0 },

  // TUESDAY
  { id: 8, subject: 'Computer Organization', teacher: 'Dr. Sharma', room: 'CS-201', group: 'CSE-A', type: 'theory', day: 1, time: 0, duration: 1, credits: 4 },
  { id: 9, subject: 'Probability & Statistics', teacher: 'Dr. Patel', room: 'CS-301', group: 'CSE-B', type: 'theory', day: 1, time: 1, duration: 1, credits: 3 },
  { id: 10, subject: 'Database Systems', teacher: 'Dr. Sharma', room: 'CS-202', group: 'CSE-A', type: 'theory', day: 1, time: 2, duration: 1, credits: 4 },
  { id: 11, subject: 'Database Lab', teacher: 'Prof. Kumar', room: 'Lab-202', group: 'CSE-B', type: 'lab', day: 1, time: 3, duration: 2, credits: 2 },
  { id: 12, subject: 'Environmental Science', teacher: 'Dr. Rao', room: 'CS-105', group: 'CSE-All', type: 'theory', day: 1, time: 5, duration: 1, credits: 2 },
  { id: 13, subject: 'Mathematics-IV (Linear Algebra)', teacher: 'Dr. Banerjee', room: 'CS-301', group: 'CSE-All', type: 'theory', day: 1, time: 6, duration: 1, credits: 4 },
  { id: 14, subject: 'Coding Practice Hour', teacher: 'Lab Instructor', room: 'Lab-201', group: 'CSE-All', type: 'lab', day: 1, time: 7, duration: 1, credits: 0 },

  // WEDNESDAY
  { id: 15, subject: 'Operating Systems', teacher: 'Prof. Kumar', room: 'CS-202', group: 'CSE-C', type: 'theory', day: 2, time: 0, duration: 1, credits: 4 },
  { id: 16, subject: 'OS Tutorial', teacher: 'Teaching Assistant', room: 'CS-105', group: 'CSE-All', type: 'tutorial', day: 2, time: 1, duration: 1, credits: 1 },
  { id: 17, subject: 'OS Lab', teacher: 'Prof. Kumar', room: 'Lab-203', group: 'CSE-B', type: 'lab', day: 2, time: 2, duration: 2, credits: 2 },
  { id: 18, subject: 'Theory of Computation', teacher: 'Dr. Patel', room: 'CS-301', group: 'CSE-A', type: 'theory', day: 2, time: 4, duration: 1, credits: 4 },
  { id: 19, subject: 'Computer Networks', teacher: 'Dr. Sharma', room: 'CS-201', group: 'CSE-C', type: 'theory', day: 2, time: 5, duration: 1, credits: 4 },
  { id: 20, subject: 'Soft Skills & Aptitude', teacher: 'Training Faculty', room: 'CS-106', group: 'CSE-All', type: 'theory', day: 2, time: 6, duration: 1, credits: 2 },
  { id: 21, subject: 'Guest Lecture / Seminar', teacher: 'Industry Expert', room: 'Auditorium', group: 'CSE-All', type: 'seminar', day: 2, time: 7, duration: 1, credits: 0 },

  // THURSDAY
  { id: 22, subject: 'Networks Lab', teacher: 'Prof. Kumar', room: 'Lab-204', group: 'CSE-A', type: 'lab', day: 3, time: 0, duration: 2, credits: 2 },
  { id: 23, subject: 'Software Engineering', teacher: 'Dr. Patel', room: 'CS-301', group: 'CSE-B', type: 'theory', day: 3, time: 2, duration: 1, credits: 3 },
  { id: 24, subject: 'Compiler Design', teacher: 'Dr. Sharma', room: 'CS-202', group: 'CSE-A', type: 'theory', day: 3, time: 3, duration: 1, credits: 4 },
  { id: 25, subject: 'Artificial Intelligence', teacher: 'Prof. Kumar', room: 'CS-301', group: 'CSE-C', type: 'theory', day: 3, time: 4, duration: 1, credits: 3 },
  { id: 26, subject: 'Elective', teacher: 'Dr. Sen', room: 'CS-106', group: 'CSE-All', type: 'theory', day: 3, time: 5, duration: 1, credits: 2 },
  { id: 27, subject: 'Project Work Discussion', teacher: 'Industry Mentor', room: 'Virtual', group: 'CSE-All', type: 'internship', day: 3, time: 6, duration: 1, credits: 2 },
  { id: 28, subject: 'Hackathon Prep / Innovation Hour', teacher: 'Faculty Coordinator', room: 'Lab-210', group: 'CSE-All', type: 'activity', day: 3, time: 7, duration: 1, credits: 0 },

  // FRIDAY
  { id: 29, subject: 'Computer Architecture', teacher: 'Dr. Sharma', room: 'CS-201', group: 'CSE-A', type: 'theory', day: 4, time: 0, duration: 1, credits: 4 },
  { id: 30, subject: 'AI Lab', teacher: 'Dr. Patel', room: 'Lab-205', group: 'CSE-B', type: 'lab', day: 4, time: 1, duration: 2, credits: 2 },
  { id: 31, subject: 'Machine Learning', teacher: 'Prof. Kumar', room: 'CS-202', group: 'CSE-A', type: 'theory', day: 4, time: 3, duration: 1, credits: 3 },
  { id: 32, subject: 'Mini Project / Internship', teacher: 'Industry Mentor', room: 'Virtual', group: 'CSE-All', type: 'internship', day: 4, time: 4, duration: 1, credits: 6 },
  { id: 33, subject: 'Entrepreneurship', teacher: 'Industry Mentor', room: 'CS-106', group: 'CSE-All', type: 'theory', day: 4, time: 5, duration: 1, credits: 2 },
  { id: 34, subject: 'Electronics for Computing', teacher: 'Dr. Rao', room: 'CS-107', group: 'CSE-All', type: 'theory', day: 4, time: 6, duration: 1, credits: 3 },
  { id: 35, subject: 'Weekly Coding Contest (Mock CF/LC)'}
];


  const facultyData = [
    { name: 'Dr. Sharma', utilization: 85, overloaded: true, classes: 12 },
    { name: 'Prof. Kumar', utilization: 72, overloaded: false, classes: 9 },
    { name: 'Dr. Patel', utilization: 68, overloaded: false, classes: 8 }
  ];

  const aiSuggestions = [
    { type: 'warning', message: 'Dr. Sharma overloaded on Mondays — suggest reallocation', priority: 'high' },
    { type: 'conflict', message: 'Lab 202 double-booked for Groups A & B at 2:00 PM', priority: 'critical' },
    { type: 'optimization', message: 'Room CS-301 underutilized — can accommodate 2 more classes', priority: 'medium' },
    { type: 'suggestion', message: 'Consider moving Theory classes to morning slots for better attendance', priority: 'low' }
  ];

  const getClassColor = (type, conflict = false) => {
    if (conflict) return 'rgba(239, 68, 68, 0.9)';
    switch (type) {
      case 'theory': return 'rgba(34, 211, 238, 0.8)';
      case 'lab': return 'rgba(139, 92, 246, 0.8)';
      case 'internship': return 'rgba(16, 185, 129, 0.8)';
      default: return 'rgba(156, 163, 175, 0.8)';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'theory': return <BookOpen size={14} />;
      case 'lab': return <Microscope size={14} />;
      case 'internship': return <Briefcase size={14} />;
      default: return <BookOpen size={14} />;
    }
  };

  const dashboardStyle = {
    minHeight: '100vh',
    background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.1) 35%, rgba(0, 0, 0, 0.8) 70%)',
    color: '#FFFFFF',
    display: 'flex',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const sidebarStyle = {
    width: '280px',
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  };

  const mainContentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  const headerStyle = {
    padding: '2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)'
  };

  const timetableStyle = {
    flex: 1,
    padding: '2rem',
    overflow: 'auto',
    display: 'flex',
    gap: '2rem'
  };

  const gridStyle = {
    flex: 1,
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    overflow: 'hidden'
  };

  const rightPanelStyle = {
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  const cardStyle = {
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1rem'
  };

  const buttonStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem'
  };

  const activeButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
    borderColor: 'transparent'
  };

  return (
    <div style={dashboardStyle}>
      {/* Left Sidebar */}
      <div style={sidebarStyle}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            <img src="./src/assets/logo.png" alt="Logo" style={{ width: '4rem', height: '3rem', verticalAlign: 'middle', marginRight: '0.5rem' }} />
            SchedMate
            
          </h2>
        </div>

        {/* View Options */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#D1D5DB' }}>Timetable View</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { key: 'weekly', label: 'Weekly View', icon: Calendar },
              { key: 'daily', label: 'Daily View', icon: Clock }
            ].map(view => (
              <button
                key={view.key}
                style={activeView === view.key ? activeButtonStyle : buttonStyle}
                onClick={() => setActiveView(view.key)}
                onMouseEnter={(e) => {
                  if (activeView !== view.key) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeView !== view.key) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                <view.icon size={16} />
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Management Options */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#D1D5DB' }}>Management</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: 'Faculty', icon: Users },
              { label: 'Rooms', icon: MapPin },
              { label: 'Students', icon: Users },
              { label: 'AI Assistant', icon: MessageSquare }
            ].map(item => (
              <button
                key={item.label}
                style={buttonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#D1D5DB' }}>Export & Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: 'Export PDF', icon: Download },
              { label: 'Export Excel', icon: Download },
              { label: 'Settings', icon: Settings }
            ].map(item => (
              <button
                key={item.label}
                style={buttonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Metrics */}
        <div style={cardStyle}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem', color: '#22D3EE' }}>Quick Metrics</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Faculty Utilization</span>
              <span style={{ color: '#F59E0B', fontWeight: '600' }}>74%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Room Utilization</span>
              <span style={{ color: '#10B981', fontWeight: '600' }}>68%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Student Clashes</span>
              <span style={{ color: '#EF4444', fontWeight: '600' }}>2</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Total Classes</span>
              <span style={{ color: '#22D3EE', fontWeight: '600' }}>89</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', gap: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Weekly Timetable Overview
              </h1>
              <p style={{ color: '#9CA3AF' }}>Manage your institutional schedule with AI-powered optimization</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type="text"
                  placeholder="Search classes, faculty..."
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    width: '250px'
                  }}
                />
              </div>
              <button style={buttonStyle}>
                <Filter size={16} />
                Filter
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Timetable Content */}
        <div style={timetableStyle}>
          {/* Main Timetable Grid */}
          <div style={gridStyle}>
            <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(6, 1fr)', height: '100%' }}>
              {/* Header row */}
              <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}></div>
              {days.map(day => (
                <div key={day} style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', borderRight: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center', fontWeight: '600', fontSize: '0.9rem' }}>
                  {day}
                </div>
              ))}
              
              {/* Time slots and classes */}
              {timeSlots.map((time, timeIndex) => (
                <React.Fragment key={time}>
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', borderRight: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '0.85rem', color: '#9CA3AF' }}>
                    {time}
                  </div>
                  {days.map((day, dayIndex) => {
                    const classInSlot = classes.find(c => c.day === dayIndex && c.time === timeIndex);
                    const isOccupied = classInSlot && timeIndex < classInSlot.time + classInSlot.duration;
                    const isClassStart = classInSlot && timeIndex === classInSlot.time;
                    
                    return (
                      <div
                        key={`${day}-${time}`}
                        style={{
                          background: isOccupied ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                          minHeight: '80px',
                          position: 'relative',
                          cursor: isClassStart ? 'move' : 'default'
                        }}
                        onMouseEnter={() => setHoveredSlot(`${dayIndex}-${timeIndex}`)}
                        onMouseLeave={() => setHoveredSlot(null)}
                      >
                        {isClassStart && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '4px',
                              left: '4px',
                              right: '4px',
                              height: `${classInSlot.duration * 80 - 8}px`,
                              background: getClassColor(classInSlot.type, classInSlot.conflict),
                              borderRadius: '0.5rem',
                              padding: '0.75rem',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                              border: classInSlot.conflict ? '2px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.2)',
                              transition: 'all 0.3s ease',
                              cursor: 'move'
                            }}
                            draggable
                            onDragStart={() => setDraggedItem(classInSlot)}
                            onDragEnd={() => setDraggedItem(null)}
                          >
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                {getTypeIcon(classInSlot.type)}
                                <span style={{ fontSize: '0.80rem', fontWeight: '600' }}>
                                  {classInSlot.subject}
                                </span>
                                {classInSlot.conflict && <AlertTriangle size={14} color="#EF4444" />}
                              </div>
                              <div style={{ fontSize: '0.65rem', opacity: 0.9 }}>
                                {classInSlot.teacher}
                              </div>
                              <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                                {classInSlot.room} • {classInSlot.group}
                              </div>
                            </div>
                            <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                              {classInSlot.credits} credits • {classInSlot.duration}h
                            </div>
                          </div>
                        )}
                        
                        {hoveredSlot === `${dayIndex}-${timeIndex}` && !isOccupied && (
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '0.75rem',
                            color: '#9CA3AF',
                            textAlign: 'center'
                          }}>
                            Drop here
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div style={rightPanelStyle}>
            {/* AI Suggestions */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Lightbulb size={18} color="#22D3EE" />
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#22D3EE' }}>AI Suggestions</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflow: 'auto' }}>
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} style={{
                    background: suggestion.priority === 'critical' ? 'rgba(239, 68, 68, 0.1)' : 
                                suggestion.priority === 'high' ? 'rgba(245, 158, 11, 0.1)' : 
                                'rgba(34, 211, 238, 0.1)',
                    border: `1px solid ${suggestion.priority === 'critical' ? '#EF4444' : 
                                          suggestion.priority === 'high' ? '#F59E0B' : 
                                          '#22D3EE'}`,
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      {suggestion.type === 'conflict' && <AlertCircle size={14} color="#EF4444" />}
                      {suggestion.type === 'warning' && <AlertTriangle size={14} color="#F59E0B" />}
                      {suggestion.type === 'optimization' && <Target size={14} color="#10B981" />}
                      {suggestion.type === 'suggestion' && <TrendingUp size={14} color="#22D3EE" />}
                      <span>{suggestion.message}</span>
                    </div>
                    <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '0.25rem',
                        background: suggestion.priority === 'critical' ? '#EF4444' : 
                                   suggestion.priority === 'high' ? '#F59E0B' : 
                                   suggestion.priority === 'medium' ? '#8B5CF6' : '#6B7280',
                        color: '#FFFFFF'
                      }}>
                        {suggestion.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Faculty Utilization */}
            <div style={cardStyle}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#22D3EE' }}>Faculty Workload</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {facultyData.map((faculty, index) => (
                  <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{faculty.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', color: faculty.overloaded ? '#EF4444' : '#10B981' }}>
                          {faculty.utilization}%
                        </span>
                        {faculty.overloaded && <AlertTriangle size={12} color="#EF4444" />}
                      </div>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${faculty.utilization}%`,
                        height: '100%',
                        background: faculty.overloaded ? 
                          'linear-gradient(90deg, #F59E0B, #EF4444)' : 
                          'linear-gradient(90deg, #22D3EE, #10B981)',
                        borderRadius: '3px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
                      {faculty.classes} classes assigned
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={cardStyle}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#22D3EE' }}>Quick Actions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { label: 'Auto-Optimize Schedule', icon: Target },
                  { label: 'Resolve All Conflicts', icon: CheckCircle },
                  { label: 'Generate Report', icon: BarChart3 },
                  { label: 'Simulate Changes', icon: Eye }
                ].map(action => (
                  <button
                    key={action.label}
                    style={{
                      ...buttonStyle,
                      background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
                      border: 'none',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 20px rgba(34, 211, 238, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <action.icon size={16} />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableDashboard;