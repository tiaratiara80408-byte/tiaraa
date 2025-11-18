import React, { useState } from 'react';
import DrillCard from '../components/DrillCard';
import Modal from '../components/Modal';
import { drills, trainingSessions, beginnerGuides } from '../data/mockData';
import type { BeginnerGuide, TrainingSession } from '../types';
import { PlusIcon, CalendarIcon, ClockIcon, MapPinIcon, CheckCircleIcon } from '../components/icons';

type TrainingTab = 'schedule' | 'drills' | 'guide';

const BeginnerGuideCard: React.FC<{ guide: BeginnerGuide }> = ({ guide }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-slate-800 rounded-lg p-4">
            <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-lg text-indigo-400">{guide.title}</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
                <p className="text-sm text-gray-400 mt-1">{guide.description}</p>
            </div>
            {isOpen && (
                <div className="mt-4 pt-4 border-t border-slate-700 space-y-3">
                    {guide.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <CheckCircleIcon className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm">{step.title}</p>
                                <p className="text-xs text-gray-400">{step.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
};

const TrainingView: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TrainingTab>('schedule');
    const [sessionList, setSessionList] = useState<TrainingSession[]>(trainingSessions);

    const [sessionTitle, setSessionTitle] = useState('');
    const [sessionDate, setSessionDate] = useState('');
    const [sessionTime, setSessionTime] = useState('');
    const [sessionLocation, setSessionLocation] = useState('');
    const [sessionNotes, setSessionNotes] = useState('');

    const handleScheduleSession = (e: React.FormEvent) => {
        e.preventDefault();
        if (!sessionTitle || !sessionDate || !sessionTime || !sessionLocation) return;
        
        const newSession: TrainingSession = {
            id: Math.max(...sessionList.map(s => s.id), 0) + 1,
            title: sessionTitle,
            date: sessionDate,
            time: sessionTime,
            location: sessionLocation,
            notes: sessionNotes,
        };

        setSessionList(prevSessions => [newSession, ...prevSessions].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        
        setSessionTitle('');
        setSessionDate('');
        setSessionTime('');
        setSessionLocation('');
        setSessionNotes('');
        setIsModalOpen(false);
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold">Latihan</h2>
            <p className="text-gray-400">Jadwal, drills, dan panduan</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-2 rounded-full shadow-lg">
          <PlusIcon />
        </button>
      </div>

       <div className="flex bg-slate-800 rounded-lg p-1 space-x-1">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'schedule' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
        >
          Jadwal
        </button>
        <button
          onClick={() => setActiveTab('drills')}
          className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'drills' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
        >
          Drills
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'guide' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
        >
          Panduan
        </button>
      </div>

      {activeTab === 'schedule' && (
        <div>
          <h3 className="text-xl font-bold mb-4">Sesi Latihan Mendatang</h3>
           <div className="space-y-4">
            {sessionList.map(session => (
              <div key={session.id} className="bg-slate-800 rounded-lg p-4 space-y-3">
                 <div>
                    <h4 className="font-bold text-lg">{session.title}</h4>
                    <p className="text-sm text-indigo-400">{new Date(session.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                   <div className="border-t border-slate-700 pt-3 text-sm text-gray-400 space-y-2">
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{session.location}</span>
                      </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'drills' && (
        <div>
          <h3 className="text-xl font-bold mb-4">Drill Library</h3>
          <div className="space-y-4">
            {drills.map(drill => (
              <DrillCard key={drill.id} drill={drill} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'guide' && (
        <div>
          <h3 className="text-xl font-bold mb-4">Panduan untuk Pemula</h3>
           <div className="space-y-4">
                {beginnerGuides.map(guide => (
                    <BeginnerGuideCard key={guide.id} guide={guide} />
                ))}
          </div>
        </div>
      )}

       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Jadwalkan Sesi Latihan">
        <form className="space-y-4" onSubmit={handleScheduleSession}>
          <div>
            <label htmlFor="sessionTitle" className="block text-sm font-medium text-gray-300">Judul Sesi</label>
            <input type="text" id="sessionTitle" value={sessionTitle} onChange={e => setSessionTitle(e.target.value)} placeholder="e.g., Team Practice" className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300">Tanggal</label>
                <input type="date" id="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{colorScheme: 'dark'}} required />
            </div>
            <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-300">Waktu</label>
                <input type="time" id="time" value={sessionTime} onChange={e => setSessionTime(e.target.value)} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{colorScheme: 'dark'}} required/>
            </div>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300">Lokasi</label>
            <input type="text" id="location" value={sessionLocation} onChange={e => setSessionLocation(e.target.value)} placeholder="Nama venue" className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
           <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-300">Catatan</label>
            <textarea id="notes" rows={3} value={sessionNotes} onChange={e => setSessionNotes(e.target.value)} placeholder="Catatan tambahan untuk sesi latihan" className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Buat Jadwal
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default TrainingView;