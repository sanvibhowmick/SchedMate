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
  Lightbulb,
  Monitor,
  Users2,
  Calculator
} from 'lucide-react';

const TimetableDashboard = () => {
  const [activeView, setActiveView] = useState('weekly');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [draggedItem, setDraggedItem] = useState(null);
  const [hoveredSlot, setHoveredSlot] = useState(null);

  // Sample data with more realistic course structure
  const timeSlots = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const classes = [
    // MONDAY
    { id: 1, subject: 'DSA', code: 'CS301', teacher: 'Dr. Sarah Mitchell', room: 'LH-201', group: 'CS-3A', type: 'lecture', day: 0, time: 0, duration: 1, credits: 3 },
    { id: 2, subject: 'DBMS', code: 'CS302', teacher: 'Prof. James Wilson', room: 'LH-101', group: 'CS-3B', type: 'lecture', day: 0, time: 1, duration: 1, credits: 3 },
    { id: 3, subject: 'Data Structures Lab', code: 'CS301L', teacher: 'Dr. Sarah Mitchell', room: 'Lab-A', group: 'CS-3A', type: 'lab', day: 0, time: 2, duration: 2, credits: 1 },
    { id: 4, subject: 'Software Engineering', code: 'CS401', teacher: 'Dr. Michael Chen', room: 'LH-205', group: 'CS-4A', type: 'lecture', day: 0, time: 5, duration: 1, credits: 3 },
    { id: 5, subject: 'Computer Networks', code: 'CS402', teacher: 'Prof. Lisa Rodriguez', room: 'LH-301', group: 'CS-4B', type: 'lecture', day: 0, time: 6, duration: 1, credits: 3 },
    { id: 6, subject: 'Discrete Mathematics', code: 'MATH201', teacher: 'Dr. Alan Foster', room: 'LH-102', group: 'CS-2A', type: 'lecture', day: 0, time: 7, duration: 1, credits: 4 },
    
    // TUESDAY
    { id: 7, subject: 'Operating Systems', code: 'CS303', teacher: 'Dr. Rachel Green', room: 'LH-203', group: 'CS-3A', type: 'lecture', day: 1, time: 0, duration: 1, credits: 3 },
    { id: 8, subject: 'Database Lab', code: 'CS302L', teacher: 'Prof. James Wilson', room: 'Lab-B', group: 'CS-3B', type: 'lab', day: 1, time: 1, duration: 2, credits: 1 },
    { id: 9, subject: 'Linear Algebra', code: 'MATH202', teacher: 'Dr. Emily Thompson', room: 'LH-104', group: 'CS-2B', type: 'lecture', day: 1, time: 3, duration: 1, credits: 3 },
    { id: 10, subject: 'Web Development', code: 'CS304', teacher: 'Prof. David Kumar', room: 'Lab-C', group: 'CS-3C', type: 'lab', day: 1, time: 5, duration: 2, credits: 2 },
    { id: 11, subject: 'Computer Architecture', code: 'CS201', teacher: 'Dr. Robert Singh', room: 'LH-202', group: 'CS-2A', type: 'lecture', day: 1, time: 7, duration: 1, credits: 3 },
    
    // WEDNESDAY
    { id: 12, subject: 'Algorithms Analysis', code: 'CS305', teacher: 'Dr. Sarah Mitchell', room: 'LH-201', group: 'CS-3A', type: 'lecture', day: 2, time: 0, duration: 1, credits: 3 },
    { id: 13, subject: 'Operating Systems Lab', code: 'CS303L', teacher: 'Dr. Rachel Green', room: 'Lab-D', group: 'CS-3A', type: 'lab', day: 2, time: 1, duration: 2, credits: 1 },
    { id: 14, subject: 'Statistics & Probability', code: 'MATH301', teacher: 'Dr. Alan Foster', room: 'LH-103', group: 'CS-3B', type: 'lecture', day: 2, time: 3, duration: 1, credits: 3 },
    { id: 15, subject: 'Software Engineering Lab', code: 'CS401L', teacher: 'Dr. Michael Chen', room: 'Lab-E', group: 'CS-4A', type: 'lab', day: 2, time: 5, duration: 2, credits: 1 },
    { id: 16, subject: 'Network Security', code: 'CS403', teacher: 'Prof. Lisa Rodriguez', room: 'LH-301', group: 'CS-4B', type: 'lecture', day: 2, time: 7, duration: 1, credits: 3 },
    
    // THURSDAY
    { id: 17, subject: 'Machine Learning', code: 'CS501', teacher: 'Dr. Kevin Park', room: 'LH-205', group: 'CS-5A', type: 'lecture', day: 3, time: 0, duration: 1, credits: 3 },
    { id: 18, subject: 'Computer Graphics', code: 'CS306', teacher: 'Prof. Maria Santos', room: 'Lab-F', group: 'CS-3C', type: 'lab', day: 3, time: 1, duration: 2, credits: 2 },
    { id: 19, subject: 'Compiler Design', code: 'CS404', teacher: 'Dr. Thomas Brown', room: 'LH-204', group: 'CS-4A', type: 'lecture', day: 3, time: 3, duration: 1, credits: 3 },
    { id: 20, subject: 'Networks Lab', code: 'CS402L', teacher: 'Prof. Lisa Rodriguez', room: 'Lab-G', group: 'CS-4B', type: 'lab', day: 3, time: 5, duration: 2, credits: 1 },
    { id: 21, subject: 'Data Mining', code: 'CS502', teacher: 'Dr. Kevin Park', room: 'LH-301', group: 'CS-5B', type: 'lecture', day: 3, time: 7, duration: 1, credits: 3 },
    
    // FRIDAY
    { id: 22, subject: 'Object-Oriented Programming', code: 'CS202', teacher: 'Prof. Jennifer Lee', room: 'LH-102', group: 'CS-2A', type: 'lecture', day: 4, time: 0, duration: 1, credits: 3 },
    { id: 23, subject: 'ML Lab', code: 'CS501L', teacher: 'Dr. Kevin Park', room: 'Lab-H', group: 'CS-5A', type: 'lab', day: 4, time: 1, duration: 2, credits: 1 },
    { id: 24, subject: 'Comp Organisation', code: 'CS405', teacher: 'Dr. Amanda White', room: 'LH-203', group: 'CS-4A', type: 'lecture', day: 4, time: 3, duration: 1, credits: 2 },
    { id: 25, subject: 'OOP Lab', code: 'CS202L', teacher: 'Prof. Jennifer Lee', room: 'Lab-I', group: 'CS-2A', type: 'lab', day: 4, time: 4, duration: 2, credits: 1 },
    { id: 26, subject: 'Project Seminar', code: 'CS503', teacher: 'Faculty Panel', room: 'Seminar Hall', group: 'CS-5A', type: 'seminar', day: 4, time: 6, duration: 1, credits: 2 },
    { id: 27, subject: 'Ethics in Computing', code: 'CS406', teacher: 'Dr. Patricia Davis', room: 'LH-101', group: 'CS-4B', type: 'lecture', day: 4, time: 7, duration: 1, credits: 2 }
  ];

  const facultyData = [
    { name: 'Dr. Sarah Mitchell', utilization: 82, overloaded: false, classes: 8, department: 'Computer Science' },
    { name: 'Prof. James Wilson', utilization: 75, overloaded: false, classes: 7, department: 'Computer Science' },
    { name: 'Dr. Rachel Green', utilization: 78, overloaded: false, classes: 6, department: 'Computer Science' },
    { name: 'Dr. Kevin Park', utilization: 88, overloaded: true, classes: 9, department: 'Computer Science' }
  ];

  const aiSuggestions = [
    { type: 'conflict', message: 'Lab-A double-booked: CS-3A (DSA Lab) conflicts with CS-2B (OOP Lab) at 10:00 AM Monday', priority: 'critical' },
    { type: 'optimization', message: 'Dr. Kevin Park exceeds recommended 20hr/week limit. Consider redistributing ML Lab to available faculty', priority: 'high' },
    { type: 'suggestion', message: 'LH-205 has 3-hour gap on Tuesday. Optimize room utilization by scheduling additional classes', priority: 'medium' },
    { type: 'warning', message: 'CS-3A has back-to-back theory classes (DSA + OS) on Monday-Tuesday. Consider adding break time', priority: 'medium' }
  ];

  const getClassColor = (type, conflict = false) => {
    if (conflict) return 'rgba(239, 68, 68, 0.9)';
    switch (type) {
      case 'lecture': return 'rgba(59, 130, 246, 0.85)';
      case 'lab': return 'rgba(139, 92, 246, 0.85)';
      case 'tutorial': return 'rgba(16, 185, 129, 0.85)';
      case 'seminar': return 'rgba(245, 158, 11, 0.85)';
      default: return 'rgba(107, 114, 128, 0.85)';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'lecture': return <Monitor size={14} />;
      case 'lab': return <Microscope size={14} />;
      case 'tutorial': return <Users2 size={14} />;
      case 'seminar': return <Users size={14} />;
      default: return <BookOpen size={14} />;
    }
  };

  const dashboardStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 100%)',
    color: '#FFFFFF',
    display: 'flex',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  const sidebarStyle = {
    width: '280px',
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(148, 163, 184, 0.1)',
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
    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    background: 'rgba(15, 23, 42, 0.6)',
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
    background: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1rem',
    border: '1px solid rgba(148, 163, 184, 0.1)',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
  };

  const rightPanelStyle = {
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  const cardStyle = {
    background: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1rem',
    border: '1px solid rgba(148, 163, 184, 0.1)',
    padding: '1.5rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
  };

  const buttonStyle = {
    background: 'rgba(148, 163, 184, 0.1)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500'
  };

  const activeButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
    borderColor: 'transparent',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
  };

  return (
    <div style={dashboardStyle}>
      {/* Left Sidebar */}
      <div style={sidebarStyle}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center' }}>
            <img 
              src="./src/assets/logo.png" 
              alt="Logo" 
              style={{ width: '3rem', height: '2.5rem', marginRight: '0.5rem' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            SchedMate Pro
          </h2>
        </div>

        {/* View Options */}
        <div>
          <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timetable Views</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { key: 'weekly', label: 'Weekly Overview', icon: Calendar },
              { key: 'daily', label: 'Daily Schedule', icon: Clock },
              { key: 'faculty', label: 'Faculty View', icon: Users },
              { key: 'room', label: 'Room Utilization', icon: MapPin }
            ].map(view => (
              <button
                key={view.key}
                style={activeView === view.key ? activeButtonStyle : buttonStyle}
                onClick={() => setActiveView(view.key)}
                onMouseEnter={(e) => {
                  if (activeView !== view.key) {
                    e.target.style.backgroundColor = 'rgba(148, 163, 184, 0.15)';
                    e.target.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeView !== view.key) {
                    e.target.style.backgroundColor = 'rgba(148, 163, 184, 0.1)';
                    e.target.style.transform = 'translateX(0)';
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
          <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Management</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: 'Faculty Management', icon: Users },
              { label: 'Room Management', icon: MapPin },
              { label: 'Course Catalog', icon: BookOpen },
              { label: 'AI Assistant', icon: MessageSquare }
            ].map(item => (
              <button
                key={item.label}
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(148, 163, 184, 0.15)';
                  e.target.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(148, 163, 184, 0.1)';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Metrics */}
        <div style={cardStyle}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>System Overview</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Total Classes', value: '89', color: '#3B82F6', trend: '+5%' },
              { label: 'Faculty Utilization', value: '78%', color: '#10B981', trend: '+2%' },
              { label: 'Room Efficiency', value: '82%', color: '#8B5CF6', trend: '+8%' },
              { label: 'Schedule Conflicts', value: '2', color: '#EF4444', trend: '-3' }
            ].map((metric, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.25rem' }}>{metric.label}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: metric.color }}>{metric.value}</div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '500' }}>{metric.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>
                Academic Timetable Dashboard
              </h1>
              <p style={{ color: '#9CA3AF', fontSize: '1rem' }}>Computer Science Department - Fall 2024</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type="text"
                  placeholder="Search courses, faculty, rooms..."
                  style={{
                    background: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    width: '280px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              <button style={{...buttonStyle, background: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.3)'}}>
                <Filter size={16} />
                Filters
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Timetable Content */}
        <div style={timetableStyle}>
          {/* Main Timetable Grid */}
          <div style={gridStyle}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(5, 1fr)', height: '100%' }}>
              {/* Header row */}
              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderBottom: '1px solid rgba(148, 163, 184, 0.1)', borderRight: '1px solid rgba(148, 163, 184, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#94A3B8' }}>
              Time
              </div>
              {days.map(day => (
                <div key={day} style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderBottom: '1px solid rgba(148, 163, 184, 0.1)', borderRight: '1px solid rgba(148, 163, 184, 0.1)', textAlign: 'center', fontWeight: '600', fontSize: '1rem', color: '#E2E8F0' }}>
                  {day}
                </div>
              ))}
              
              {/* Time slots and classes */}
              {timeSlots.map((time, timeIndex) => (
                <React.Fragment key={time}>
                  <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '1rem', borderBottom: '1px solid rgba(148, 163, 184, 0.1)', borderRight: '1px solid rgba(148, 163, 184, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '0.9rem', color: '#94A3B8' }}>
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
                          background: isOccupied ? 'transparent' : 'rgba(248, 250, 252, 0.02)',
                          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                          borderRight: '1px solid rgba(148, 163, 184, 0.1)',
                          minHeight: '70px',
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
                              top: '6px',
                              left: '6px',
                              right: '6px',
                              height: `${classInSlot.duration * 70 - 12}px`,
                              background: getClassColor(classInSlot.type, classInSlot.conflict),
                              borderRadius: '0.75rem',
                              padding: '0.75rem',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                              border: classInSlot.conflict ? '2px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.15)',
                              transition: 'all 0.3s ease',
                              cursor: 'move',
                              overflow: 'hidden'
                            }}
                            draggable
                            onDragStart={() => setDraggedItem(classInSlot)}
                            onDragEnd={() => setDraggedItem(null)}
                          >
                            {/* Course Header */}
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                {getTypeIcon(classInSlot.type)}
                                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#FFFFFF', opacity: 0.9 }}>
                                  {classInSlot.code}
                                </span>
                                {classInSlot.conflict && <AlertTriangle size={12} color="#FEF2F2" />}
                              </div>
                              <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#FFFFFF', lineHeight: '1.2', marginBottom: '0.25rem' }}>
                                {classInSlot.subject}
                              </div>
                              <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                                {classInSlot.teacher}
                              </div>
                            </div>
                            
                            {/* Course Footer */}
                            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                                  {classInSlot.room}
                                </div>
                                <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                  <Calculator size={10} />
                                  {classInSlot.credits} CR
                                </div>
                              </div>
                              <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.25rem' }}>
                                {classInSlot.group}
                              </div>
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
                            textAlign: 'center',
                            opacity: 0.7
                          }}>
                            Available
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
                <Lightbulb size={18} color="#3B82F6" />
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#3B82F6' }}>AI Insights</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflow: 'auto' }}>
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} style={{
                    background: suggestion.priority === 'critical' ? 'rgba(239, 68, 68, 0.1)' : 
                                suggestion.priority === 'high' ? 'rgba(245, 158, 11, 0.1)' : 
                                'rgba(59, 130, 246, 0.1)',
                    border: `1px solid ${suggestion.priority === 'critical' ? 'rgba(239, 68, 68, 0.3)' : 
                                          suggestion.priority === 'high' ? 'rgba(245, 158, 11, 0.3)' : 
                                          'rgba(59, 130, 246, 0.3)'}`,
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    fontSize: '0.85rem',
                    lineHeight: '1.4'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      {suggestion.type === 'conflict' && <AlertCircle size={16} color="#EF4444" style={{ marginTop: '0.125rem', flexShrink: 0 }} />}
                      {suggestion.type === 'warning' && <AlertTriangle size={16} color="#F59E0B" style={{ marginTop: '0.125rem', flexShrink: 0 }} />}
                      {suggestion.type === 'optimization' && <Target size={16} color="#10B981" style={{ marginTop: '0.125rem', flexShrink: 0 }} />}
                      {suggestion.type === 'suggestion' && <TrendingUp size={16} color="#3B82F6" style={{ marginTop: '0.125rem', flexShrink: 0 }} />}
                      <div style={{ flex: 1 }}>
                        <span style={{ color: '#E2E8F0' }}>{suggestion.message}</span>
                        <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
                          <span style={{ 
                            fontSize: '0.7rem', 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '0.375rem',
                            background: suggestion.priority === 'critical' ? '#EF4444' : 
                                       suggestion.priority === 'high' ? '#F59E0B' : 
                                       suggestion.priority === 'medium' ? '#8B5CF6' : '#6B7280',
                            color: '#FFFFFF',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.025em'
                          }}>
                            {suggestion.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Faculty Workload */}
            <div style={cardStyle}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#3B82F6' }}>Faculty Workload Analysis</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {facultyData.map((faculty, index) => (
                  <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#E2E8F0' }}>{faculty.name}</span>
                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.125rem' }}>{faculty.department}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textAlign: 'right' }}>
                        <div>
                          <div style={{ fontSize: '0.85rem', color: faculty.overloaded ? '#EF4444' : '#10B981', fontWeight: '600' }}>
                            {faculty.utilization}%
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{faculty.classes} classes</div>
                        </div>
                        {faculty.overloaded && <AlertTriangle size={14} color="#EF4444" />}
                      </div>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${faculty.utilization}%`,
                        height: '100%',
                        background: faculty.overloaded ? 
                          'linear-gradient(90deg, #F59E0B, #EF4444)' : 
                          'linear-gradient(90deg, #3B82F6, #10B981)',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={cardStyle}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#3B82F6' }}>Quick Actions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Auto-Optimize Schedule', icon: Target, description: 'AI-powered optimization' },
                  { label: 'Resolve Conflicts', icon: CheckCircle, description: 'Fix scheduling issues' },
                  { label: 'Generate Reports', icon: BarChart3, description: 'Export analytics' },
                  { label: 'Preview Changes', icon: Eye, description: 'Simulate modifications' }
                ].map(action => (
                  <button
                    key={action.label}
                    style={{
                      ...buttonStyle,
                      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                      border: 'none',
                      justifyContent: 'flex-start',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      gap: '0.25rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <action.icon size={16} />
                      <span style={{ fontWeight: '600' }}>{action.label}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{action.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div style={cardStyle}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#3B82F6' }}>Export & Settings</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { label: 'Export to PDF', icon: Download },
                  { label: 'Export to Excel', icon: Download },
                  { label: 'System Settings', icon: Settings }
                ].map(item => (
                  <button
                    key={item.label}
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(148, 163, 184, 0.15)';
                      e.target.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(148, 163, 184, 0.1)';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    <item.icon size={16} />
                    {item.label}
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