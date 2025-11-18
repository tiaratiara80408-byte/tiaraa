
import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import PlayerDetailModal from '../components/PlayerDetailModal';
import { team, matches } from '../data/mockData';
import { MatchStatus, Player } from '../types';
import { UsersIcon, ChartPieIcon, TrophyIcon, PlusIcon } from '../components/icons';

const TeamView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [roster, setRoster] = useState<Player[]>(team.roster);

  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerNumber, setNewPlayerNumber] = useState('');
  const [newPlayerPosition, setNewPlayerPosition] = useState('');

  const wins = matches.filter(m => m.status === MatchStatus.COMPLETED && ((m.teamA === team.name && m.result && m.result.teamAScore > m.result.teamBScore) || (m.teamB === team.name && m.result && m.result.teamBScore > m.result.teamAScore))).length;
  const losses = matches.filter(m => m.status === MatchStatus.COMPLETED).length - wins;
  const winRate = wins + losses > 0 ? ((wins / (wins + losses)) * 100).toFixed(0) : 0;

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleClosePlayerModal = () => {
    setSelectedPlayer(null);
  };

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName || !newPlayerNumber || !newPlayerPosition) return;

    const newPlayer: Player = {
      id: Math.max(...roster.map(p => p.id), 0) + 1,
      name: newPlayerName,
      number: parseInt(newPlayerNumber, 10),
      position: newPlayerPosition,
      stats: { totalPoints: 0, aces: 0, blocks: 0, errors: 0, efficiency: 0 }
    };

    setRoster(prevRoster => [...prevRoster, newPlayer]);
    setNewPlayerName('');
    setNewPlayerNumber('');
    setNewPlayerPosition('');
    setIsModalOpen(false);
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tim</h2>
          <p className="text-gray-400">Kelola tim dan roster pemain</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-2 rounded-full shadow-lg">
          <PlusIcon />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
          <StatCard label="Total Pemain" value={String(roster.length)} icon={<UsersIcon className="h-8 w-8" />} />
          <StatCard label="Menang / Kalah" value={`${wins} / ${losses}`} icon={<TrophyIcon className="h-8 w-8" />} />
          <StatCard label="Win Rate" value={`${winRate}%`} icon={<ChartPieIcon className="h-8 w-8" />} />
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Roster - {team.name}</h3>
        <div className="bg-slate-800 rounded-lg divide-y divide-slate-700">
          {roster.sort((a,b) => a.number - b.number).map(player => (
            <div key={player.id} className="flex items-center justify-between p-3 transition-colors hover:bg-slate-700/50 cursor-pointer" onClick={() => handlePlayerClick(player)}>
              <div className="flex items-center space-x-4">
                <span className="bg-indigo-500/20 text-indigo-400 font-bold h-9 w-9 flex items-center justify-center rounded-full text-sm">{player.number}</span>
                <div>
                  <p className="font-semibold">{player.name}</p>
                  <p className="text-xs text-gray-400">{player.position}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-indigo-400">{player.stats.totalPoints}</p>
                <p className="text-xs text-gray-500">Poin</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedPlayer && (
        <PlayerDetailModal player={selectedPlayer} onClose={handleClosePlayerModal} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Pemain Baru">
        <form className="space-y-4" onSubmit={handleAddPlayer}>
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-300">Nama Pemain</label>
            <input type="text" id="playerName" value={newPlayerName} onChange={e => setNewPlayerName(e.target.value)} placeholder="Masukkan nama pemain" className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="playerNumber" className="block text-sm font-medium text-gray-300">Nomor Punggung</label>
              <input type="number" id="playerNumber" value={newPlayerNumber} onChange={e => setNewPlayerNumber(e.target.value)} placeholder="e.g., 10" className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="playerPosition" className="block text-sm font-medium text-gray-300">Posisi</label>
              <select id="playerPosition" value={newPlayerPosition} onChange={e => setNewPlayerPosition(e.target.value)} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                <option value="">Pilih posisi</option>
                <option>Setter</option>
                <option>Outside Hitter</option>
                <option>Middle Blocker</option>
                <option>Opposite</option>
                <option>Libero</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Tambah Pemain
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default TeamView;