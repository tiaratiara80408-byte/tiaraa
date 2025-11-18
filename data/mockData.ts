import type { Player, Team, Match, Drill, TrainingSession, ChatMessage, Product, BeginnerGuide, User } from '../types';
import { MatchStatus, DrillDifficulty } from '../types';

export const mockUser: User = {
  id: 1,
  name: 'Pelatih Alex',
  email: 'coach@volleyapp.com',
  avatarUrl: `https://i.pravatar.cc/150?u=coach-alex`,
};

export const players: Player[] = [
  { id: 1, name: 'Ahmad Rizki', number: 1, position: 'Setter', stats: { totalPoints: 145, aces: 28, blocks: 15, errors: 12, efficiency: 92 } },
  { id: 2, name: 'Cahya Gumilang', number: 3, position: 'Middle Blocker', stats: { totalPoints: 210, aces: 15, blocks: 45, errors: 20, efficiency: 88 } },
  { id: 3, name: 'Dedi Firmansyah', number: 4, position: 'Outside Hitter', stats: { totalPoints: 305, aces: 35, blocks: 22, errors: 30, efficiency: 90 } },
  { id: 4, name: 'Eko Prasetyo', number: 7, position: 'Libero', stats: { totalPoints: 25, aces: 2, blocks: 5, errors: 5, efficiency: 95 } },
  { id: 5, name: 'Budi Santoso', number: 5, position: 'Outside Hitter', stats: { totalPoints: 256, aces: 20, blocks: 18, errors: 25, efficiency: 85 } },
  { id: 6, name: 'Fajar Maulana', number: 9, position: 'Opposite', stats: { totalPoints: 280, aces: 40, blocks: 25, errors: 28, efficiency: 89 } },
  { id: 7, name: 'Gede Wira', number: 10, position: 'Middle Blocker', stats: { totalPoints: 190, aces: 10, blocks: 50, errors: 18, efficiency: 91 } },
  { id: 8, name: 'Hadi Susanto', number: 11, position: 'Setter', stats: { totalPoints: 130, aces: 25, blocks: 10, errors: 15, efficiency: 93 } },
  { id: 9, name: 'Indra Wijaya', number: 12, position: 'Outside Hitter', stats: { totalPoints: 220, aces: 30, blocks: 20, errors: 22, efficiency: 87 } },
];

export const team: Team = {
  id: 1,
  name: 'Garuda Volley',
  category: 'Professional',
  roster: players,
};

export const matches: Match[] = [
  { id: 1, teamA: 'Garuda Volley', teamB: 'Nusantara Smashers', date: '2025-10-05', time: '15:00', location: 'GOR Bhinneka', status: MatchStatus.UPCOMING },
  { id: 2, teamA: 'Jakarta Thunder', teamB: 'Garuda Volley', date: '2025-10-08', time: '18:00', location: 'Istora Senayan', status: MatchStatus.UPCOMING },
  { id: 3, teamA: 'Garuda Volley', teamB: 'Bandung Strikers', date: '2025-09-28', time: '19:00', location: 'GOR Saparua', status: MatchStatus.COMPLETED, result: { teamAScore: 3, teamBScore: 1 } },
  { id: 4, teamA: 'Surabaya Power', teamB: 'Garuda Volley', date: '2025-09-21', time: '16:00', location: 'DBL Arena', status: MatchStatus.COMPLETED, result: { teamAScore: 2, teamBScore: 3 } },
];

export const drills: Drill[] = [
  { id: 1, title: 'Spike Technique Training', category: 'Attacking', description: 'Latihan teknik spike untuk meningkatkan power dan akurasi', difficulty: DrillDifficulty.INTERMEDIATE, duration: 30, playerCount: '6-8 pemain' },
  { id: 2, title: 'Blocking Drill', category: 'Defense', description: 'Latihan blocking timing dan positioning untuk pertahanan yang solid', difficulty: DrillDifficulty.ADVANCED, duration: 45, playerCount: '4-6 pemain' },
  { id: 3, title: 'Serve and Receive', category: 'Serving', description: 'Fokus pada akurasi servis dan efektivitas penerimaan bola pertama', difficulty: DrillDifficulty.BEGINNER, duration: 25, playerCount: 'Seluruh tim' },
  { id: 4, title: 'Setter Precision Practice', category: 'Setting', description: 'Meningkatkan konsistensi dan akurasi umpan setter ke berbagai posisi', difficulty: DrillDifficulty.INTERMEDIATE, duration: 30, playerCount: '2-4 pemain' },
];

export const trainingSessions: TrainingSession[] = [
    {id: 1, title: "Team Practice", date: "2025-10-03", time: "17:00", location: "GOR Bhinneka"},
    {id: 2, title: "Defensive Drills", date: "2025-10-06", time: "18:00", location: "Istora Senayan"},
];

export const chatMessages: ChatMessage[] = [
    { id: 1, senderId: 3, senderName: 'Dedi F.', text: 'Guys, jangan lupa latihan besok jam 5 sore di GOR Bhinneka ya.', timestamp: '10:30 AM'},
    { id: 2, senderId: 1, senderName: 'Ahmad R.', text: 'Siap, Ded. Fokus ke set play baru kita ya.', timestamp: '10:31 AM'},
    { id: 3, senderId: 0, senderName: 'Coach', text: 'Betul, Ahmad. Pastikan semua sudah paham formasinya. Saya akan pantau dari pinggir lapangan.', timestamp: '10:35 AM'},
    { id: 4, senderId: 2, senderName: 'Cahya G.', text: 'Coach, untuk blocking, apa ada strategi khusus melawan Nusantara Smashers?', timestamp: '10:36 AM'},
    { id: 5, senderId: 0, senderName: 'Coach', text: 'Ada, nanti kita bahas di sesi teori sebelum latihan fisik. Pastikan datang tepat waktu.', timestamp: '10:38 AM'},
    { id: 6, senderId: 4, senderName: 'Eko P.', text: 'Diterima, Coach! Saya akan fokus pada receive drill.', timestamp: '10:40 AM'},
];

export const products: Product[] = [
  { id: 1, name: 'Jersey Tim Pro', price: 350000, imageUrl: 'https://images.unsplash.com/photo-1612892022396-c63f0b3d1b64?q=80&w=1887&auto=format&fit=crop', category: 'Apparel', description: 'Jersey resmi tim dengan bahan dry-fit berkualitas tinggi, menyerap keringat dan nyaman dipakai saat bertanding.', rating: 4.8 },
  { id: 2, name: 'Sepatu Voli SkyJump', price: 850000, imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d34?q=80&w=1887&auto=format&fit=crop', category: 'Footwear', description: 'Sepatu voli dengan teknologi bantalan responsif untuk lompatan maksimal dan cengkeraman kuat di lapangan.', rating: 4.9 },
  { id: 3, name: 'Bola Voli PowerServe', price: 500000, imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop', category: 'Equipment', description: 'Bola voli standar internasional, terbuat dari kulit sintetis premium untuk kontrol dan feel yang luar biasa.', rating: 4.7 },
  { id: 4, name: 'Knee Pad Pelindung', price: 250000, imageUrl: 'https://images.unsplash.com/photo-1578336231926-169f4a0818e3?q=80&w=1887&auto=format&fit=crop', category: 'Accessories', description: 'Pelindung lutut dengan busa EVA tebal untuk perlindungan optimal dari benturan saat melakukan diving.', rating: 4.6 },
  { id: 5, name: 'Tas Ransel Voli', price: 450000, imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop', category: 'Accessories', description: 'Tas ransel luas dengan kompartemen khusus untuk sepatu, bola, dan pakaian basah. Praktis dan stylish.', rating: 4.8 },
];

export const beginnerGuides: BeginnerGuide[] = [
  {
    id: 1,
    title: 'Teknik Dasar Servis Atas',
    description: 'Pelajari cara melakukan servis atas yang kuat dan akurat untuk memulai permainan.',
    steps: [
      { title: 'Posisi Awal', detail: 'Berdiri di belakang garis servis dengan kaki yang berlawanan dengan tangan pemukul di depan.' },
      { title: 'Lemparkan Bola', detail: 'Lemparkan bola lurus ke atas sedikit di depan bahu tangan pemukul, setinggi yang bisa Anda jangkau.' },
      { title: 'Ayunkan Tangan', detail: 'Ayunkan tangan pemukul ke belakang, tekuk siku, dan buka telapak tangan.' },
      { title: 'Pukul Bola', detail: 'Pukul bagian tengah bola dengan telapak tangan terbuka saat bola berada di titik tertinggi. Lanjutkan gerakan tangan ke depan (follow through).' },
    ],
  },
  {
    id: 2,
    title: 'Cara Passing Bawah (Dig)',
    description: 'Kuasai passing bawah untuk menerima servis atau serangan lawan dengan efektif.',
    steps: [
      { title: 'Sikap Kuda-kuda', detail: 'Buka kaki selebar bahu, tekuk lutut, dan condongkan badan ke depan. Jaga punggung tetap lurus.' },
      { title: 'Posisi Lengan', detail: 'Satukan kedua tangan, luruskan lengan ke depan. Pastikan pergelangan tangan rata dan terkunci.' },
      { title: 'Kontak Bola', detail: 'Arahkan bola agar mengenai area lengan bawah (antara pergelangan tangan dan siku).' },
      { title: 'Gerakan Mendorong', detail: 'Gunakan kaki untuk mendorong ke atas saat bola datang, bukan mengayunkan lengan. Arahkan bola ke target (setter).' },
    ],
  },
  {
    id: 3,
    title: 'Prinsip Dasar Blocking',
    description: 'Belajar cara membendung serangan lawan di depan net.',
    steps: [
      { title: 'Posisi di Net', detail: 'Berdiri dekat net dengan tangan di depan dada, siap bergerak ke kiri atau kanan.' },
      { title: 'Timing Lompatan', detail: 'Perhatikan pemukul lawan. Lompatlah sedikit setelah pemukul melompat untuk mencegat bola.' },
      { title: 'Penetrasi Tangan', detail: 'Saat melompat, luruskan tangan ke atas dan sedikit ke depan melewati net. Buka jari-jari selebar mungkin.' },
      { title: 'Mendarat dengan Aman', detail: 'Mendaratlah dengan kedua kaki dan tekuk lutut untuk mengurangi benturan.' },
    ],
  },
];