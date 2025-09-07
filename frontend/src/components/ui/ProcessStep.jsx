import React from 'react';

const ProcessStep = ({ icon, title, desc, index }) => (
  <div className="text-center group">
    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-2xl transform transition-transform group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{desc}</p>
  </div>
);

export default ProcessStep;