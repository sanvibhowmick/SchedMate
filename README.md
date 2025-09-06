# 📅 SchedMate

**SchedMate** is a hybrid smart timetabling system that combines algorithmic scheduling with AI-driven preference optimization. It ensures conflict-free schedules while maximizing satisfaction for faculty and students.

---

## 🚀 Features
- ✅ **Conflict-Free Scheduling** – Hard constraints guarantee no clashes for students, faculty, or rooms.  
- ⚖️ **Preference Optimization** – Balances faculty availability, student needs, and room preferences.  
- 🧠 **AI + Genetic Algorithms** – Learns from past schedules to improve outcomes.  
- 🖥️ **Admin-Friendly Interface** – Drag-and-drop editor, live re-optimization, and “what-if” simulations.  
- 🔗 **Integration Ready** – Exports to PDF/Excel and syncs with Student Information Systems (SIS/AMS).  

---

## 👥 User Roles
- **Administrators** → Define curricula, faculty loads, and approve schedules.  
- **Faculty** → Set availability/preferences and review personal timetables.  
- **Students** → Access conflict-free schedules and download personalized versions.  
- **IT Support** → Maintain integrations and system stability.  

---

## ⚙️ Tech Stack
- **Frontend:** React / Next.js  
- **Backend:** Node.js  
- **Database:** MongoDB  
- **Optimization Core:** Genetic Algorithm + ML feedback loop  

---

## 🛠️ How It Works
1. **Data Input** → Curriculum, faculty workload, room capacities, student enrollments.  
2. **Constraint Engine** → Applies hard (non-negotiable) + soft (preferences) constraints.  
3. **Optimization Core** → Generates and scores multiple timetable candidates.  
4. **Admin UI** → Allows drag-and-drop adjustments and simulations.  
5. **Outputs** → Timetables exported or integrated into existing systems.  

---

## 🔄 Update Strategy
- **Real-Time Adjustments** → For minor changes (faculty swaps, room shifts).  
- **Batch Re-Optimization** → For major changes (new electives, large-scale updates).  
- **Hybrid Approach** → Keeps timetables stable but flexible.  

---

## 📦 Getting Started
```bash
# Clone the repository
git clone https://github.com/your-username/schedmate.git

# Move into the project directory
cd schedmate

# Install dependencies
npm install

# Run development server
npm run dev
