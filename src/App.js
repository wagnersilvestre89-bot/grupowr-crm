import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  Users, 
  Briefcase, 
  Target, 
  Activity, 
  Calendar as CalendarIcon, 
  Settings, 
  Building2,
  Plus, 
  Search, 
  Bell,
  ChevronDown,
  LogOut,
  Mail,
  MapPin,
  MoreHorizontal,
  Lock,
  Download,
  Filter,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Edit2,
  Trash2,
  UserPlus,
  X,
  Phone,
  DollarSign,
  RefreshCw,
  Kanban,
  GripVertical,
  CheckSquare,
  Clock,
  CalendarCheck,
  AlertCircle
} from 'lucide-react';

// --- DADOS SIMULADOS & CONFIGURAÇÕES ---

const INITIAL_LEADS = [
  { id: 1, nome: 'João Silva', empresa: 'Tech Corp', email: 'joao@techcorp.com', telefone: '(11) 99999-9999', status: 'Novo', temperatura: 'Quente', valorPotencial: 50000, dataCriacao: '2026-10-25', origem: 'Site', interesse: 'Sistema CRM', responsavel: 'Wagner Silvestre' },
  { id: 2, nome: 'Maria Souza', empresa: 'Design Studio', email: 'maria@design.com', telefone: '(11) 98888-8888', status: 'Qualificado', temperatura: 'Morno', valorPotencial: 25000, dataCriacao: '2026-10-20', origem: 'Indicação', interesse: 'Consultoria', responsavel: 'Márcio Stênio' },
  { id: 3, nome: 'Pedro Álvares', empresa: 'Navega S.A.', email: 'pedro@navega.com', telefone: '(21) 97777-7777', status: 'Em andamento', temperatura: 'Frio', valorPotencial: 100000, dataCriacao: '2026-10-15', origem: 'Campanha', interesse: 'Plano Enterprise', responsavel: 'Marcos Aurélio' }
];

const INITIAL_CONTACTS = [
  { id: 1, nome: 'Carlos Andrade', cargo: 'Diretor', empresa: 'Alecom', email: 'carlos@alecom.com', telefone: '(85) 97777-7777', tipo: 'Cliente', status: 'Ativo', responsavel: 'Wagner Silvestre', ultimaInteracao: '2026-10-26' },
  { id: 2, nome: 'Ana Rita', cargo: 'Gerente de Compras', empresa: 'Tela Fort', email: 'ana@telafort.com', telefone: '(85) 96666-6666', tipo: 'Parceiro', status: 'Ativo', responsavel: 'Paulo Minze', ultimaInteracao: '2026-10-25' }
];

const INITIAL_COMPANIES = [
  { id: 1, razaoSocial: 'Kelldrin Ltda', nomeFantasia: 'Kelldrin', cnpj: '11.111.111/0001-11', segmento: 'Tecnologia', porte: 'Média', cidade: 'Fortaleza/CE', contatoPrincipal: 'Carlos Andrade', telefone: '(85) 99999-9999', email: 'contato@kelldrin.com', responsavel: 'Wagner Silvestre', status: 'Cliente Ativo', ultimaInteracao: '2026-10-26' },
  { id: 2, razaoSocial: 'Consórcio Financeiro S.A', nomeFantasia: 'Consórcio Fin.', cnpj: '22.222.222/0001-22', segmento: 'Financeiro', porte: 'Grande', cidade: 'São Paulo/SP', contatoPrincipal: 'João Silva', telefone: '(11) 98888-8888', email: 'joao@consorcio.com', responsavel: 'Márcio Stênio', status: 'Prospect', ultimaInteracao: '2026-10-25' }
];

const PIPELINE_STAGES = ['Qualificação', 'Diagnóstico', 'Proposta', 'Negociação', 'Fechamento', 'Ganho', 'Perdido'];

const INITIAL_DEALS = [
  { id: 1, nome: 'Licença Anual CRM', empresaId: 1, contatoId: 1, valor: 150000, etapa: 'Proposta', probabilidade: 60, responsavel: 'Wagner Silvestre', dataCriacao: '2026-10-01', previsaoFechamento: '2026-11-15' },
  { id: 2, nome: 'Consultoria de Implantação', empresaId: 2, contatoId: null, valor: 45000, etapa: 'Negociação', probabilidade: 80, responsavel: 'Márcio Stênio', dataCriacao: '2026-10-10', previsaoFechamento: '2026-10-30' },
  { id: 3, nome: 'Upgrade de Plano', empresaId: 1, contatoId: 1, valor: 12000, etapa: 'Ganho', probabilidade: 100, responsavel: 'Wagner Silvestre', dataCriacao: '2026-09-15', previsaoFechamento: '2026-09-20' }
];

const INITIAL_ACTIVITIES = [
  { id: 1, titulo: 'Apresentação do Sistema', tipo: 'Reunião', descricao: 'Demonstração das funcionalidades do CRM.', dataInicio: '2026-10-28T14:00', dataFim: '2026-10-28T15:00', status: 'Pendente', prioridade: 'Alta', responsavel: 'Wagner Silvestre', leadId: 1, contatoId: null, empresaId: 1, negocioId: 1 },
  { id: 2, titulo: 'Follow-up de Proposta', tipo: 'Ligação', descricao: 'Ligar para confirmar recebimento da proposta.', dataInicio: '2026-10-27T10:00', dataFim: null, status: 'Concluída', prioridade: 'Média', responsavel: 'Márcio Stênio', leadId: null, contatoId: 2, empresaId: 2, negocioId: 2 },
  { id: 3, titulo: 'Envio de Contrato', tipo: 'E-mail', descricao: 'Enviar contrato atualizado.', dataInicio: '2026-10-25T16:00', dataFim: null, status: 'Pendente', prioridade: 'Urgente', responsavel: 'Wagner Silvestre', leadId: null, contatoId: 1, empresaId: 1, negocioId: 3 }
];

const TEAM_MEMBERS = [
  { id: 1, name: 'Wagner Silvestre', email: 'wagner@crm.com', role: 'Administrador e Vendedor', password: 'admin123', status: 'Ativo', initials: 'WS', color: 'bg-red-500', open: 6, won: 14, revenue: 482000, quota: 96, location: 'Fortaleza, CE' },
  { id: 2, name: 'Márcio Stênio', email: 'marcio@crm.com', role: 'Vendedor', password: 'vend123', status: 'Ativo', initials: 'MS', color: 'bg-blue-500', open: 8, won: 11, revenue: 356000, quota: 89, location: 'Fortaleza, CE' },
  { id: 3, name: 'Marcos Aurélio', email: 'marcos@crm.com', role: 'Vendedor', password: 'vend123', status: 'Ativo', initials: 'MA', color: 'bg-green-500', open: 5, won: 9, revenue: 274000, quota: 91, location: 'Fortaleza, CE' },
  { id: 4, name: 'Paulo Minze', email: 'paulo@crm.com', role: 'Vendedor', password: 'vend123', status: 'Ativo', initials: 'PM', color: 'bg-purple-500', open: 7, won: 6, revenue: 168000, quota: 56, location: 'Fortaleza, CE' },
];

const COMPANIES = ['Kelldrin', 'Consórcio Financeiro', 'Alecom', 'Tela Fort', 'Fertilizantes'];

const INITIAL_MEETINGS = [
  { id: 1, titulo: 'Apresentação de Resultados', data: '2026-10-28', horario: '15:00', observacoes: 'Levar os relatórios impressos.', lembreteAtivo: true }
];

// --- INTEGRAÇÃO SUPABASE (BANCO EM NUVEM) ---
const SUPABASE_URL = 'https://vdelutltpridmgtoifpo.supabase.co/rest/v1';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkZWx1dGx0cHJpZG1ndG9pZnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxODQ0MzYsImV4cCI6MjEwODc2MDQzNn0.-bfp1fuRfwpJCvjaI1VTpHz_vjVcaw64LS4hKdYPhKU';

// --- COMPONENTES REUTILIZÁVEIS ---
const Card = ({ children, className = '' }) => (
  <div className={`bg-[#18181b] rounded-xl border border-white/5 shadow-lg ${className}`}>
    {children}
  </div>
);

// --- TELAS ---

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  // Estado de Nuvem
  const [isCloudSynced, setIsCloudSynced] = useState(false);
  const [syncStatus, setSyncStatus] = useState('offline');
  
  // Login State
  const [email, setEmail] = useState('wagner@crm.com');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeCompanyTab, setActiveCompanyTab] = useState(COMPANIES[0]);
  const [reportFilter, setReportFilter] = useState('esta_semana');

  // Calendar & Notifications State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // CRM Data State
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [activityTab, setActivityTab] = useState('todas');

  // Meeting & Alerts State
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);
  const [activeAlerts, setActiveAlerts] = useState([]);

  // Modal States
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  // Drag and Drop State
  const [draggedDealId, setDraggedDealId] = useState(null);

  // --- SUPABASE CLOUD SYNC ---
  React.useEffect(() => {
    // 1. Carregar dados da nuvem ao abrir o sistema
    fetch(`${SUPABASE_URL}/crm_state?id=eq.1&select=payload`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    })
    .then(res => {
      if(!res.ok) throw new Error("Tabela não encontrada ou erro de rede");
      return res.json();
    })
    .then(data => {
      if(data && data.length > 0 && data[0].payload) {
         const db = data[0].payload;
         if(db.leads) setLeads(db.leads);
         if(db.contacts) setContacts(db.contacts);
         if(db.companies) setCompanies(db.companies);
         if(db.deals) setDeals(db.deals);
         if(db.activities) setActivities(db.activities);
         if(db.meetings) setMeetings(db.meetings);
      }
      setIsCloudSynced(true);
      setSyncStatus('synced');
    })
    .catch(err => {
      console.error("Erro ao conectar no Supabase:", err);
      setIsCloudSynced(true);
    });
  }, []);

  React.useEffect(() => {
    // 2. Salvar automaticamente na nuvem sempre que algo mudar
    if(!isCloudSynced) return; 
    setSyncStatus('syncing');
    
    const currentState = { leads, contacts, companies, deals, activities, meetings };
    
    fetch(`${SUPABASE_URL}/crm_state?id=eq.1`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ payload: currentState })
    }).then(res => {
      if(res.ok) setSyncStatus('synced');
      else setSyncStatus('offline');
    }).catch(() => {
      setSyncStatus('offline');
    });
  }, [leads, contacts, companies, deals, activities, meetings, isCloudSynced]);

  // Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    const user = TEAM_MEMBERS.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setLoginError('');
    } else {
      setLoginError('E-mail ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const isAdmin = currentUser?.email === 'wagner@crm.com';

  // --- CRM HANDLERS ---
  const handleSaveLead = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLead = {
      id: editingLead ? editingLead.id : Date.now(),
      nome: formData.get('nome'),
      empresa: formData.get('empresa'),
      email: formData.get('email'),
      telefone: formData.get('telefone'),
      status: formData.get('status'),
      temperatura: formData.get('temperatura'),
      valorPotencial: Number(formData.get('valorPotencial')),
      origem: formData.get('origem'),
      interesse: formData.get('interesse'),
      responsavel: formData.get('responsavel'),
      dataCriacao: editingLead ? editingLead.dataCriacao : new Date().toISOString().split('T')[0]
    };

    if (editingLead) {
      setLeads(leads.map(l => l.id === editingLead.id ? newLead : l));
    } else {
      setLeads([newLead, ...leads]);
    }
    setIsLeadModalOpen(false);
    setEditingLead(null);
  };

  const handleDeleteLead = (id) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const handleConvertLead = (lead) => {
    if (lead.status === 'Convertido') return;
    
    setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'Convertido' } : l));
    
    const newContact = {
      id: Date.now(),
      nome: lead.nome,
      cargo: 'Não definido',
      empresa: lead.empresa,
      email: lead.email,
      telefone: lead.telefone,
      tipo: 'Prospect',
      status: 'Ativo',
      responsavel: lead.responsavel,
      ultimaInteracao: new Date().toISOString().split('T')[0]
    };
    setContacts([newContact, ...contacts]);
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = {
      id: editingContact ? editingContact.id : Date.now(),
      nome: formData.get('nome'),
      cargo: formData.get('cargo'),
      empresa: formData.get('empresa'),
      email: formData.get('email'),
      telefone: formData.get('telefone'),
      tipo: formData.get('tipo'),
      status: formData.get('status'),
      responsavel: formData.get('responsavel'),
      ultimaInteracao: editingContact ? editingContact.ultimaInteracao : new Date().toISOString().split('T')[0]
    };

    if (editingContact) {
      setContacts(contacts.map(c => c.id === editingContact.id ? newContact : c));
    } else {
      setContacts([newContact, ...contacts]);
    }
    setIsContactModalOpen(false);
    setEditingContact(null);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCompany = {
      id: editingCompany ? editingCompany.id : Date.now(),
      razaoSocial: formData.get('razaoSocial'),
      nomeFantasia: formData.get('nomeFantasia'),
      cnpj: formData.get('cnpj'),
      segmento: formData.get('segmento'),
      porte: formData.get('porte'),
      cidade: formData.get('cidade'),
      contatoPrincipal: formData.get('contatoPrincipal'),
      telefone: formData.get('telefone'),
      email: formData.get('email'),
      responsavel: formData.get('responsavel'),
      status: formData.get('status'),
      ultimaInteracao: editingCompany ? editingCompany.ultimaInteracao : new Date().toISOString().split('T')[0]
    };

    if (editingCompany) {
      setCompanies(companies.map(c => c.id === editingCompany.id ? newCompany : c));
    } else {
      setCompanies([newCompany, ...companies]);
    }
    setIsCompanyModalOpen(false);
    setEditingCompany(null);
  };

  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

  const handleSaveDeal = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDeal = {
      id: editingDeal ? editingDeal.id : Date.now(),
      nome: formData.get('nome'),
      empresaId: Number(formData.get('empresaId')),
      contatoId: formData.get('contatoId') ? Number(formData.get('contatoId')) : null,
      valor: Number(formData.get('valor')),
      etapa: formData.get('etapa'),
      probabilidade: Number(formData.get('probabilidade')),
      responsavel: formData.get('responsavel'),
      previsaoFechamento: formData.get('previsaoFechamento'),
      dataCriacao: editingDeal ? editingDeal.dataCriacao : new Date().toISOString().split('T')[0]
    };

    if (editingDeal) {
      setDeals(deals.map(d => d.id === editingDeal.id ? newDeal : d));
    } else {
      setDeals([newDeal, ...deals]);
    }
    setIsDealModalOpen(false);
    setEditingDeal(null);
  };

  const handleDeleteDeal = (id) => {
    setDeals(deals.filter(d => d.id !== id));
  };

  const handleSaveActivity = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newActivity = {
      id: editingActivity ? editingActivity.id : Date.now(),
      titulo: formData.get('titulo'),
      tipo: formData.get('tipo'),
      descricao: formData.get('descricao'),
      dataInicio: formData.get('dataInicio'),
      dataFim: formData.get('dataFim'),
      status: formData.get('status'),
      prioridade: formData.get('prioridade'),
      responsavel: formData.get('responsavel'),
      leadId: formData.get('leadId') ? Number(formData.get('leadId')) : null,
      contatoId: formData.get('contatoId') ? Number(formData.get('contatoId')) : null,
      empresaId: formData.get('empresaId') ? Number(formData.get('empresaId')) : null,
      negocioId: formData.get('negocioId') ? Number(formData.get('negocioId')) : null,
    };

    if (editingActivity) {
      setActivities(activities.map(a => a.id === editingActivity.id ? newActivity : a));
    } else {
      setActivities([newActivity, ...activities]);
    }
    setIsActivityModalOpen(false);
    setEditingActivity(null);
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const handleCompleteActivity = (id) => {
    setActivities(activities.map(a => a.id === id ? { ...a, status: 'Concluída' } : a));
  };

  // Calendar Meeting Handlers
  const handleSaveMeeting = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMeeting = {
      id: editingMeeting ? editingMeeting.id : Date.now(),
      titulo: formData.get('titulo'),
      data: formData.get('data'),
      horario: formData.get('horario'),
      observacoes: formData.get('observacoes'),
      lembreteAtivo: formData.get('lembreteAtivo') === 'on',
    };

    if (editingMeeting) {
      setMeetings(meetings.map(m => m.id === editingMeeting.id ? newMeeting : m));
    } else {
      setMeetings([...meetings, newMeeting]);
    }
    setIsMeetingModalOpen(false);
    setEditingMeeting(null);
  };

  const handleDeleteMeeting = (id) => {
    setMeetings(meetings.filter(m => m.id !== id));
    setIsMeetingModalOpen(false);
    setEditingMeeting(null);
  };

  // 5-Minute Reminder Effect
  React.useEffect(() => {
    if (!currentUser) return;

    const checkMeetingAlerts = () => {
      const now = new Date();
      const currentAlerts = [];

      meetings.forEach(m => {
        if (!m.lembreteAtivo || dismissedAlerts.includes(m.id)) return;

        const meetingDate = new Date(`${m.data}T${m.horario}:00`);
        const diffMs = meetingDate.getTime() - now.getTime();
        const diffMins = diffMs / (1000 * 60);

        if (diffMins > 0 && diffMins <= 5) {
          currentAlerts.push(m);
        }
      });

      setActiveAlerts(currentAlerts);
    };

    const alertInterval = setInterval(checkMeetingAlerts, 10000);
    checkMeetingAlerts();

    return () => clearInterval(alertInterval);
  }, [meetings, dismissedAlerts, currentUser]);

  // Kanban Drag and Drop Handlers
  const handleDragStart = (e, id) => {
    setDraggedDealId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id); 
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, novaEtapa) => {
    e.preventDefault();
    if (draggedDealId) {
      setDeals(deals.map(d => 
        d.id === draggedDealId ? { ...d, etapa: novaEtapa } : d
      ));
      setDraggedDealId(null);
    }
  };

  // Simulação de Notificações
  React.useEffect(() => {
    if (!currentUser) return;

    const checkNotifications = () => {
      const now = new Date();
      const newNotifications = [];

      activities.forEach(act => {
        if (!act.dataInicio || act.status === 'Concluída' || act.status === 'Cancelada') return;

        const activityDate = new Date(act.dataInicio);
        const timeDiff = activityDate.getTime() - now.getTime();
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));

        if (minutesDiff === 60) {
          newNotifications.push({ id: `1h-${act.id}`, actId: act.id, title: 'Falta 1 hora!', message: `A atividade "${act.titulo}" começa em 1 hora.`, time: new Date().toISOString(), read: false });
        }
        if (minutesDiff === 5) {
          newNotifications.push({ id: `5m-${act.id}`, actId: act.id, title: 'Começa em 5 minutos!', message: `A atividade "${act.titulo}" vai começar.`, time: new Date().toISOString(), read: false });
        }
      });

      if (newNotifications.length > 0) {
        setNotifications(prev => {
          const uniqueNew = newNotifications.filter(n => !prev.some(p => p.id === n.id));
          return [...uniqueNew, ...prev];
        });
      }
    };

    const interval = setInterval(checkNotifications, 60000);
    checkNotifications();
    
    return () => clearInterval(interval);
  }, [activities, currentUser]);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif) => {
    setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n));
    const act = activities.find(a => a.id === notif.actId);
    if (act) {
      setEditingActivity(act);
      setIsActivityModalOpen(true);
      setIsNotificationsOpen(false);
    }
  };

  // --- TELA DE LOGIN ---
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-zinc-300 font-sans">
        <Card className="w-full max-w-md p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Target size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-2">Acesso ao Grupo WR CRM</h2>
          <p className="text-center text-zinc-500 mb-8">Faça login para gerenciar suas vendas</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">E-mail</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#27272a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Senha</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#27272a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors mt-4"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 p-4 bg-white/5 rounded-lg text-xs text-zinc-400">
            <p className="font-semibold mb-1 text-zinc-300">Contas de teste:</p>
            <p>Admin: wagner@crm.com / admin123</p>
            <p>Vendedor: marcio@crm.com / vend123</p>
          </div>
        </Card>
      </div>
    );
  }

  // --- RENDERS DE CONTEÚDO PRINCIPAL ---
  const renderDashboard = () => {
    const valorFunil = deals.filter(d => !['Ganho', 'Perdido'].includes(d.etapa)).reduce((acc, d) => acc + d.valor, 0);
    const negociosFechados = deals.filter(d => d.etapa === 'Ganho');
    const receitaTotal = negociosFechados.reduce((acc, d) => acc + d.valor, 0);
    const leadsAtivosCount = leads.filter(l => !['Convertido', 'Perdido'].includes(l.status)).length;

    return (
      <div className="space-y-6">
        <Card className="p-6 bg-gradient-to-br from-[#18181b] to-[#121215]">
          <h2 className="text-xl font-bold text-white mb-2">Resumo Geral Integrado</h2>
          <p className="text-zinc-400 mb-6 text-sm">Os dados abaixo refletem a base de oportunidades real do seu CRM em tempo real.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Valor do Funil Aberto</p>
              <h3 className="text-3xl font-bold text-white">R$ {(valorFunil/1000).toFixed(0)}k</h3>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Negócios Ganhos</p>
              <h3 className="text-3xl font-bold text-white">{negociosFechados.length}</h3>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Leads Ativos</p>
              <h3 className="text-3xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {leadsAtivosCount}
              </h3>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col justify-between min-h-[200px]">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                <Target size={20} />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Receita Real</span>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400 mb-1">Receita Total Fechada</p>
              <h3 className="text-2xl font-bold text-white">R$ {(receitaTotal).toLocaleString('pt-BR')}</h3>
            </div>
            <div className="mt-4 flex justify-between items-center text-xs text-zinc-500 border-t border-white/5 pt-4">
              <span>Atualizado a partir do Funil</span>
              <span className="text-zinc-300">Hoje</span>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderLeads = () => {
    const novosLeads = leads.filter(l => l.status === 'Novo').length;
    const qualificados = leads.filter(l => l.status === 'Qualificado').length;
    const leadsConvertidos = leads.filter(l => l.status === 'Convertido').length;
    const taxaConversao = leads.length > 0 ? ((leadsConvertidos / leads.length) * 100).toFixed(1) : 0;

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">Leads</h1>
            <p className="text-zinc-400 text-sm mt-1">Gerencie captações e converta oportunidades.</p>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button 
                onClick={() => { setEditingLead(null); setIsLeadModalOpen(true); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm shadow-sm"
              >
                <Plus size={16} /> Novo Lead
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="p-4 border-t-2 border-t-blue-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Total de Leads</p>
             <h3 className="text-2xl font-bold text-white">{leads.length}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-emerald-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Novos Leads</p>
             <h3 className="text-2xl font-bold text-white">{novosLeads}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-yellow-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Qualificados</p>
             <h3 className="text-2xl font-bold text-white">{qualificados}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-purple-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Taxa Conversão</p>
             <h3 className="text-2xl font-bold text-white">{taxaConversao}%</h3>
          </Card>
        </div>

        <Card className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Nome / Empresa</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Contato</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Status</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Temperatura</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Valor Potencial</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white text-sm">{lead.nome}</p>
                    <p className="text-xs text-zinc-500">{lead.empresa}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-400">
                    <p>{lead.email}</p>
                    <p>{lead.telefone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      lead.status === 'Novo' ? 'bg-blue-500/20 text-blue-400' :
                      lead.status === 'Em andamento' ? 'bg-yellow-500/20 text-yellow-400' :
                      lead.status === 'Qualificado' ? 'bg-emerald-500/20 text-emerald-400' :
                      lead.status === 'Convertido' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      lead.temperatura === 'Quente' ? 'text-red-400 bg-red-500/10' :
                      lead.temperatura === 'Morno' ? 'text-yellow-400 bg-yellow-500/10' :
                      'text-blue-400 bg-blue-500/10'
                    }`}>
                      {lead.temperatura}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-zinc-300">
                    R$ {lead.valorPotencial.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {lead.status === 'Qualificado' && isAdmin && (
                        <button onClick={() => handleConvertLead(lead)} title="Converter para Contato" className="p-1.5 text-emerald-400 hover:bg-emerald-500/20 rounded transition-colors mr-2 flex items-center gap-1 text-xs font-semibold">
                          <RefreshCw size={14} /> Converter
                        </button>
                      )}
                      {isAdmin && (
                        <>
                          <button onClick={() => { setEditingLead(lead); setIsLeadModalOpen(true); }} className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Editar">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDeleteLead(lead.id)} className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors" title="Excluir">
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-zinc-500 text-sm">Nenhum lead encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    );
  };

  const renderTeam = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white mb-6">Equipe de Vendas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map(member => (
            <Card key={member.id} className="p-5 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${member.color}`}>
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{member.name}</h3>
                    <p className="text-xs text-zinc-400">{member.role}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Negócios Abertos:</span>
                  <span className="text-white font-medium">{member.open}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Negócios Ganhos:</span>
                  <span className="text-white font-medium">{member.won}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                  <span className="text-zinc-400">Receita Gerada:</span>
                  <span className="text-emerald-400 font-semibold">R$ {(member.revenue / 1000).toFixed(0)}k</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderReports = () => {
    const isDateInPeriod = (dateStr, period) => {
      if (!dateStr) return false;
      const date = new Date(dateStr + 'T12:00:00'); 
      const today = new Date();
      today.setHours(12,0,0,0);
      
      if (period === 'todos') return true;
      if (period === 'hoje') return date.toDateString() === today.toDateString();
      if (period === 'esta_semana') {
          const lastWeek = new Date(today);
          lastWeek.setDate(lastWeek.getDate() - 7);
          return date >= lastWeek && date <= today;
      }
      if (period === 'este_mes') return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      if (period === 'mes_passado') {
          const lastMonth = new Date(today);
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
      }
      return true;
    };

    const relLeads = leads.filter(l => isDateInPeriod(l.dataCriacao, reportFilter));
    const relContatos = contacts.filter(c => isDateInPeriod(c.ultimaInteracao, reportFilter) && c.tipo === 'Cliente');
    const relDealsCreated = deals.filter(d => isDateInPeriod(d.dataCriacao, reportFilter));
    const relDealsWon = deals.filter(d => d.etapa === 'Ganho' && (isDateInPeriod(d.dataCriacao, reportFilter) || isDateInPeriod(d.previsaoFechamento, reportFilter)));
    const projecaoDeals = deals.filter(d => !['Ganho', 'Perdido'].includes(d.etapa) && isDateInPeriod(d.previsaoFechamento, reportFilter));

    const valorProjecao = projecaoDeals.reduce((acc, d) => acc + d.valor, 0);
    const valorVendido = relDealsWon.reduce((acc, d) => acc + d.valor, 0);
    const taxaConversao = relLeads.length > 0 ? ((relContatos.length / relLeads.length) * 100).toFixed(1) : 0;

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">Relatórios Gerenciais</h1>
            <p className="text-zinc-400 text-sm mt-1">Análise de captação, funil de vendas e projeções financeiras.</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={reportFilter}
              onChange={(e) => setReportFilter(e.target.value)}
              className="bg-[#18181b] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="hoje">Hoje</option>
              <option value="esta_semana">Esta Semana (Últ. 7 dias)</option>
              <option value="este_mes">Este Mês</option>
              <option value="mes_passado">Mês Passado</option>
              <option value="todos">Todo o Período</option>
            </select>
            {isAdmin && (
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm border border-white/5 shadow-sm">
                <Download size={16} /> Exportar
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 border-l-2 border-l-blue-500">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Captação (Leads)</p>
                 <h3 className="text-3xl font-bold text-white">{relLeads.length}</h3>
               </div>
               <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Target size={20}/></div>
             </div>
             <p className="text-xs text-zinc-500 mt-4">Adicionados no período</p>
          </Card>
          
          <Card className="p-5 border-l-2 border-l-emerald-500">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Novos Clientes</p>
                 <h3 className="text-3xl font-bold text-white">{relContatos.length}</h3>
               </div>
               <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Users size={20}/></div>
             </div>
             <p className="text-xs text-zinc-500 mt-4">Clientes ativos no período</p>
          </Card>

          <Card className="p-5 border-l-2 border-l-orange-500">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Negócios Iniciados</p>
                 <h3 className="text-3xl font-bold text-white">{relDealsCreated.length}</h3>
               </div>
               <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400"><Briefcase size={20}/></div>
             </div>
             <p className="text-xs text-zinc-500 mt-4">Oportunidades abertas</p>
          </Card>

          <Card className="p-5 border-l-2 border-l-purple-500">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Vendas Realizadas</p>
                 <h3 className="text-3xl font-bold text-white">{relDealsWon.length}</h3>
               </div>
               <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><CheckCircle size={20}/></div>
             </div>
             <p className="text-xs text-zinc-500 mt-4">Negócios finalizados (Ganhos)</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-400"/>
              Métricas Financeiras
            </h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-[#202024] rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-300 font-medium">Vendas Finalizadas (Receita)</p>
                  <p className="text-xs text-zinc-500 mt-1">Valor ganho no período</p>
                </div>
                <h4 className="text-2xl font-bold text-emerald-400">R$ {valorVendido.toLocaleString('pt-BR')}</h4>
              </div>

              <div className="p-4 bg-[#202024] rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-300 font-medium">Projeção Disponível (Pipeline)</p>
                  <p className="text-xs text-zinc-500 mt-1">Negócios para fechamento no período</p>
                </div>
                <h4 className="text-2xl font-bold text-blue-400">R$ {valorProjecao.toLocaleString('pt-BR')}</h4>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Activity size={20} className="text-blue-400"/>
              Conversão de Captação
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">Captação para Venda (Período)</span>
                <span className="text-white font-medium">{taxaConversao}% de Eficiência</span>
              </div>
              
              <div className="relative pt-4">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-500/30 font-bold">
                      {relLeads.length}
                    </div>
                    <span className="text-xs text-zinc-400">Leads</span>
                  </div>
                  <div className="flex-1 h-px bg-white/10 mx-2"></div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-yellow-500/30 font-bold">
                      {relDealsCreated.length}
                    </div>
                    <span className="text-xs text-zinc-400">Negócios</span>
                  </div>
                  <div className="flex-1 h-px bg-white/10 mx-2"></div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/30 font-bold">
                      {relDealsWon.length}
                    </div>
                    <span className="text-xs text-zinc-400">Vendas</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#18181b] border border-white/5 rounded-lg">
                <p className="text-sm text-zinc-400 text-center">
                  Baseado no filtro atual, a equipe {relDealsWon.length > 0 ? 'conseguiu fechar vendas com sucesso!' : 'ainda está trabalhando nas negociações.'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderPlaceholder = (title) => (
    <div className="flex items-center justify-center h-64">
      <p className="text-zinc-500">O módulo de <span className="font-bold">{title}</span> está em desenvolvimento.</p>
    </div>
  );

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const days = [];
    let current = new Date(startDate);
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));
    const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
    const goToToday = () => setCurrentMonth(new Date());

    const calendarEvents = [
      ...meetings.map(m => ({
        id: `m-${m.id}`,
        type: 'meeting',
        titulo: m.titulo,
        data: m.data,
        horario: m.horario,
        dateTime: new Date(`${m.data}T${m.horario}:00`),
        originalData: m,
        colorClass: 'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20'
      })),
      ...activities.filter(a => a.dataInicio).map(a => {
        const [data, horario] = a.dataInicio.split('T');
        return {
          id: `a-${a.id}`,
          type: 'activity',
          titulo: `${a.tipo}: ${a.titulo}`,
          data: data,
          horario: horario || '00:00',
          dateTime: new Date(a.dataInicio),
          originalData: a,
          colorClass: 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20'
        };
      })
    ];

    const upcomingEvents = calendarEvents
      .filter(e => e.dateTime >= new Date())
      .sort((a, b) => a.dateTime - b.dateTime)
      .slice(0, 5);

    const handleEventClick = (event) => {
      if (event.type === 'meeting') {
        setEditingMeeting(event.originalData);
        setIsMeetingModalOpen(true);
      } else {
        setEditingActivity(event.originalData);
        setIsActivityModalOpen(true);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">Calendário</h1>
            <p className="text-zinc-400 text-sm mt-1">Agende suas reuniões e ative lembretes automáticos.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={goToToday} className="px-3 py-2 text-sm text-zinc-300 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">Hoje</button>
            <div className="flex items-center bg-[#18181b] border border-white/5 rounded-lg">
              <button onClick={prevMonth} className="p-2 text-zinc-400 hover:text-white transition-colors">&lt;</button>
              <span className="px-4 text-sm font-medium text-white capitalize min-w-[150px] text-center">{currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</span>
              <button onClick={nextMonth} className="p-2 text-zinc-400 hover:text-white transition-colors">&gt;</button>
            </div>
            <button 
              onClick={() => { setEditingMeeting(null); setIsMeetingModalOpen(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm shadow-sm"
            >
              <Plus size={16} /> Nova Reunião
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="p-0 overflow-hidden border-white/10">
              <div className="grid grid-cols-7 border-b border-white/10 bg-[#121215]">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="py-3 text-center text-xs font-semibold text-zinc-500 uppercase tracking-wider">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 auto-rows-[120px] bg-white/5 gap-px">
                {days.map((day, i) => {
                  const isCurrentMonth = day.getMonth() === month;
                  const isToday = day.toDateString() === new Date().toDateString();
                  
                  const dayEvents = calendarEvents.filter(e => {
                    const eDate = new Date(`${e.data}T00:00:00`);
                    return eDate.toDateString() === day.toDateString();
                  }).sort((a, b) => a.horario.localeCompare(b.horario));

                  return (
                    <div key={i} className={`bg-[#18181b] p-2 hover:bg-[#202024] transition-colors relative ${!isCurrentMonth ? 'opacity-40' : ''}`}>
                      <div className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full mb-1 ${isToday ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-zinc-400'}`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1 overflow-y-auto max-h-[80px] no-scrollbar">
                        {dayEvents.map(event => (
                          <div 
                            key={event.id} 
                            onClick={() => handleEventClick(event)}
                            className={`text-[10px] px-1.5 py-1 rounded cursor-pointer truncate border transition-colors ${event.colorClass}`}
                            title={event.titulo}
                          >
                            <span className="font-semibold">{event.horario}</span> - {event.titulo}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
          
          <div className="space-y-4">
             <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
               <CalendarIcon size={16} className="text-blue-400" />
               Próximos Compromissos
             </h3>
             {upcomingEvents.length === 0 ? (
               <Card className="p-4 text-center">
                 <p className="text-xs text-zinc-500">Nenhum compromisso futuro agendado.</p>
               </Card>
             ) : (
               upcomingEvents.map(event => (
                 <Card key={event.id} className="p-4 hover:border-white/20 transition-colors cursor-pointer" onClick={() => handleEventClick(event)}>
                   <h4 className="text-sm font-semibold text-white mb-1 leading-tight">{event.titulo}</h4>
                   <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                     <CalendarIcon size={12} /> {new Date(`${event.data}T00:00:00`).toLocaleDateString('pt-BR')}
                   </div>
                   <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium mt-1">
                     <Clock size={12} /> {event.horario}
                   </div>
                 </Card>
               ))
             )}
          </div>
        </div>
      </div>
    );
  };

  const renderActivities = () => {
    const isAtrasada = (act) => new Date(act.dataInicio) < new Date() && !['Concluída', 'Cancelada'].includes(act.status);

    const total = activities.length;
    const pendentes = activities.filter(a => a.status === 'Pendente').length;
    const emAndamento = activities.filter(a => a.status === 'Em andamento').length;
    const atrasadas = activities.filter(a => isAtrasada(a)).length;
    const concluidas = activities.filter(a => a.status === 'Concluída').length;

    let filteredActivities = activities;
    if (activityTab === 'minhas') filteredActivities = activities.filter(a => a.responsavel === currentUser?.name);
    else if (activityTab === 'pendentes') filteredActivities = activities.filter(a => a.status === 'Pendente');
    else if (activityTab === 'atrasadas') filteredActivities = activities.filter(a => isAtrasada(a));
    else if (activityTab === 'concluidas') filteredActivities = activities.filter(a => a.status === 'Concluída');

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">Atividades</h1>
            <p className="text-zinc-400 text-sm mt-1">Gerencie tarefas, contatos, reuniões e acompanhamentos comerciais.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setEditingActivity(null); setIsActivityModalOpen(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm shadow-sm"
            >
              <Plus size={16} /> Criar Atividade
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="p-4 border-t-2 border-t-blue-500">
             <p className="text-[10px] text-zinc-500 font-bold mb-1 uppercase tracking-wider">Total</p>
             <h3 className="text-2xl font-bold text-white">{total}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-yellow-500">
             <p className="text-[10px] text-zinc-500 font-bold mb-1 uppercase tracking-wider">Pendentes</p>
             <h3 className="text-2xl font-bold text-white">{pendentes}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-blue-400">
             <p className="text-[10px] text-zinc-500 font-bold mb-1 uppercase tracking-wider">Em Andamento</p>
             <h3 className="text-2xl font-bold text-white">{emAndamento}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-red-500">
             <p className="text-[10px] text-zinc-500 font-bold mb-1 uppercase tracking-wider">Atrasadas</p>
             <h3 className="text-2xl font-bold text-white">{atrasadas}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-emerald-500">
             <p className="text-[10px] text-zinc-500 font-bold mb-1 uppercase tracking-wider">Concluídas</p>
             <h3 className="text-2xl font-bold text-white">{concluidas}</h3>
          </Card>
        </div>

        <div className="flex space-x-1 border-b border-white/10 overflow-x-auto no-scrollbar">
          {[
            { id: 'todas', label: 'Todas' },
            { id: 'minhas', label: 'Minhas Atividades' },
            { id: 'pendentes', label: 'Pendentes' },
            { id: 'atrasadas', label: 'Atrasadas' },
            { id: 'concluidas', label: 'Concluídas' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActivityTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activityTab === tab.id 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Card className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Atividade</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Data / Hora</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Relacionado a</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Responsável</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Status</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map(act => {
                const isOverdue = isAtrasada(act);
                
                const relCompany = act.empresaId ? companies.find(c => c.id === act.empresaId)?.nomeFantasia : null;
                const relContact = act.contatoId ? contacts.find(c => c.id === act.contatoId)?.nome : null;
                const relDeal = act.negocioId ? deals.find(d => d.id === act.negocioId)?.nome : null;
                const relLead = act.leadId ? leads.find(l => l.id === act.leadId)?.nome : null;

                const hasRelations = relCompany || relContact || relDeal || relLead;

                return (
                  <tr key={act.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-2">
                        {act.status === 'Concluída' ? (
                           <CheckSquare size={16} className="text-emerald-500 mt-0.5 shrink-0"/>
                        ) : (
                           <Clock size={16} className={`${isOverdue ? 'text-red-400' : 'text-zinc-500'} mt-0.5 shrink-0`}/>
                        )}
                        <div>
                          <p className="font-medium text-white text-sm leading-tight">{act.titulo}</p>
                          <p className="text-[11px] text-zinc-500 font-medium uppercase mt-1">{act.tipo} • Prioridade {act.prioridade}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-400">
                      <p className={isOverdue ? 'text-red-400 font-medium' : 'text-zinc-300'}>
                        {new Date(act.dataInicio).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-400">
                      {hasRelations ? (
                        <div className="flex flex-col gap-0.5 text-xs">
                          {relCompany && <span className="flex items-center gap-1"><Building2 size={10} className="text-blue-400"/> {relCompany}</span>}
                          {relDeal && <span className="flex items-center gap-1"><Briefcase size={10} className="text-purple-400"/> {relDeal}</span>}
                          {relContact && <span className="flex items-center gap-1"><Users size={10} className="text-emerald-400"/> {relContact}</span>}
                          {relLead && <span className="flex items-center gap-1"><Target size={10} className="text-yellow-400"/> {relLead}</span>}
                        </div>
                      ) : (
                        <span className="text-zinc-600">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-300">
                      {act.responsavel}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider ${
                        act.status === 'Concluída' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                        act.status === 'Cancelada' ? 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20' : 
                        act.status === 'Em andamento' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        isOverdue ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {isOverdue && act.status !== 'Concluída' ? 'Atrasada' : act.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {act.status !== 'Concluída' && act.status !== 'Cancelada' && (
                          <button onClick={() => handleCompleteActivity(act.id)} className="p-1.5 text-emerald-400 hover:bg-emerald-500/20 rounded transition-colors mr-2" title="Concluir Atividade">
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button onClick={() => { setEditingActivity(act); setIsActivityModalOpen(true); }} className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Editar">
                          <Edit2 size={16} />
                        </button>
                        {(isAdmin || currentUser?.name === act.responsavel) && (
                          <button onClick={() => handleDeleteActivity(act.id)} className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors" title="Excluir">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredActivities.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    <CalendarCheck size={32} className="text-zinc-600 mx-auto mb-3"/>
                    <p className="text-zinc-500 font-medium">Nenhuma atividade encontrada nesta aba.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    );
  };

  const renderContacts = () => {
    const ativos = contacts.filter(c => c.status === 'Ativo').length;
    const clientes = contacts.filter(c => c.tipo === 'Cliente').length;
    
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">Contatos</h1>
            <p className="text-zinc-400 text-sm mt-1">Gestão de clientes, prospectos, parceiros e fornecedores.</p>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button 
                onClick={() => { setEditingContact(null); setIsContactModalOpen(true); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm shadow-sm"
              >
                <UserPlus size={16} /> Novo Contato
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 border-t-2 border-t-blue-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Total de Contatos</p>
             <h3 className="text-2xl font-bold text-white">{contacts.length}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-emerald-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Contatos Ativos</p>
             <h3 className="text-2xl font-bold text-white">{ativos}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-purple-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Clientes</p>
             <h3 className="text-2xl font-bold text-white">{clientes}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-orange-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Prospectos</p>
             <h3 className="text-2xl font-bold text-white">{contacts.filter(c => c.tipo === 'Prospect').length}</h3>
          </Card>
        </div>

        <Card className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Nome / Cargo</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Empresa</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Contato</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Tipo</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Status</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white text-sm">{contact.nome}</p>
                    <p className="text-xs text-zinc-500">{contact.cargo}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-300">{contact.empresa}</td>
                  <td className="px-4 py-3 text-sm text-zinc-400">
                    <p>{contact.email}</p>
                    <p>{contact.telefone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded bg-[#202024] text-zinc-300 font-medium border border-white/5">
                      {contact.tipo}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs flex items-center gap-1 font-medium ${contact.status === 'Ativo' ? 'text-emerald-400' : 'text-zinc-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${contact.status === 'Ativo' ? 'bg-emerald-400' : 'bg-zinc-500'}`}></span>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isAdmin && (
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => { setEditingContact(contact); setIsContactModalOpen(true); }} className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Editar">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDeleteContact(contact.id)} className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors" title="Excluir">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-zinc-500 text-sm">Nenhum contato encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    );
  };

  const renderCompanies = () => {
    const ativas = companies.filter(c => c.status === 'Cliente Ativo').length;
    const contatosVinculados = contacts.filter(c => c.empresa && c.empresa.trim() !== '').length;
    const negociosAbertos = deals.filter(d => !['Ganho', 'Perdido'].includes(d.etapa)).length;

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">Empresas</h1>
            <p className="text-zinc-400 text-sm mt-1">Organizações e relacionamentos comerciais.</p>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button 
                onClick={() => { setEditingCompany(null); setIsCompanyModalOpen(true); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm shadow-sm"
              >
                <Building2 size={16} /> Nova Empresa
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 border-t-2 border-t-blue-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Total de Empresas</p>
             <h3 className="text-2xl font-bold text-white">{companies.length}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-emerald-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Empresas Ativas</p>
             <h3 className="text-2xl font-bold text-white">{ativas}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-purple-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Contatos Vinculados</p>
             <h3 className="text-2xl font-bold text-white">{contatosVinculados}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-orange-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Negócios em Aberto</p>
             <h3 className="text-2xl font-bold text-white">{negociosAbertos}</h3>
          </Card>
        </div>

        <Card className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Empresa / CNPJ</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Segmento / Porte</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Contato / Local</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Responsável</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10">Status</th>
                <th className="px-4 py-3 text-xs text-zinc-500 uppercase font-semibold border-b border-white/10 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(company => (
                <tr key={company.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white text-sm">{company.razaoSocial}</p>
                    <p className="text-xs text-zinc-500">{company.cnpj}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-400">
                    <p>{company.segmento}</p>
                    <p className="text-xs text-zinc-500">{company.porte}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-400">
                    <p className="text-zinc-300">{company.contatoPrincipal}</p>
                    <p className="text-xs flex items-center gap-1 mt-0.5"><MapPin size={12}/> {company.cidade}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-300">
                    {company.responsavel}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      company.status === 'Cliente Ativo' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 
                      company.status === 'Prospect' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 
                      'bg-zinc-500/20 text-zinc-400 border border-zinc-500/20'
                    }`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isAdmin && (
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => { setEditingCompany(company); setIsCompanyModalOpen(true); }} className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Editar">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDeleteCompany(company.id)} className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors" title="Excluir">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {companies.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-zinc-500 text-sm">Nenhuma empresa encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    );
  };

  const renderDeals = () => {
    const pipelineAberto = deals.filter(d => !['Ganho', 'Perdido'].includes(d.etapa));
    const ganhos = deals.filter(d => d.etapa === 'Ganho');
    const perdidos = deals.filter(d => d.etapa === 'Perdido');
    
    const valorTotalPipeline = pipelineAberto.reduce((acc, d) => acc + d.valor, 0);
    const valorPonderado = pipelineAberto.reduce((acc, d) => acc + (d.valor * (d.probabilidade / 100)), 0);
    
    const totalFechados = ganhos.length + perdidos.length;
    const taxaConversao = totalFechados > 0 ? ((ganhos.length / totalFechados) * 100).toFixed(1) : 0;

    return (
      <div className="space-y-6 flex flex-col h-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">Negócios (Pipeline)</h1>
            <p className="text-zinc-400 text-sm mt-1">Acompanhe e mova oportunidades comerciais pelo funil.</p>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button 
                onClick={() => { setEditingDeal(null); setIsDealModalOpen(true); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm shadow-sm"
              >
                <Briefcase size={16} /> Novo Negócio
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 shrink-0">
          <Card className="p-4 border-t-2 border-t-blue-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Valor do Pipeline</p>
             <h3 className="text-2xl font-bold text-white" title={`R$ ${valorTotalPipeline.toLocaleString('pt-BR')}`}>
               R$ {(valorTotalPipeline/1000).toFixed(1)}k
             </h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-emerald-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Negócios Ganhos</p>
             <h3 className="text-2xl font-bold text-white">{ganhos.length}</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-purple-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Taxa de Conversão</p>
             <h3 className="text-2xl font-bold text-white">{taxaConversao}%</h3>
          </Card>
          <Card className="p-4 border-t-2 border-t-orange-500">
             <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Valor Ponderado (Proj.)</p>
             <h3 className="text-2xl font-bold text-white" title={`R$ ${valorPonderado.toLocaleString('pt-BR')}`}>
               R$ {(valorPonderado/1000).toFixed(1)}k
             </h3>
          </Card>
        </div>

        {/* KANBAN BOARD */}
        <div className="flex-1 overflow-x-auto pb-4 mt-2 -mx-2 px-2 flex space-x-4 min-h-[500px]">
          {PIPELINE_STAGES.map(stage => {
            const columnDeals = deals.filter(d => d.etapa === stage);
            const columnValue = columnDeals.reduce((acc, d) => acc + d.valor, 0);

            return (
              <div 
                key={stage} 
                className={`flex-shrink-0 w-80 bg-[#121215]/80 rounded-xl border border-white/5 flex flex-col max-h-full ${
                  draggedDealId ? 'border-dashed border-white/20 transition-all bg-[#18181b]/50' : ''
                }`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage)}
              >
                <div className="p-3 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#121215]/90 backdrop-blur-sm rounded-t-xl z-10">
                  <h3 className="font-semibold text-sm text-zinc-200 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      stage === 'Ganho' ? 'bg-emerald-500' :
                      stage === 'Perdido' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}></span>
                    {stage} <span className="text-zinc-500 font-normal">({columnDeals.length})</span>
                  </h3>
                  <span className="text-xs font-medium text-zinc-400 bg-white/5 px-2 py-1 rounded">
                    R$ {(columnValue/1000).toFixed(1)}k
                  </span>
                </div>
                
                <div className="p-3 flex-1 overflow-y-auto space-y-3 no-scrollbar min-h-[150px]">
                  {columnDeals.map(deal => {
                    const company = companies.find(c => c.id === deal.empresaId);
                    
                    return (
                      <div 
                        key={deal.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, deal.id)}
                        className="bg-[#202024] p-3 rounded-lg border border-white/5 shadow-sm hover:border-white/20 transition-all cursor-grab active:cursor-grabbing group relative"
                      >
                        {isAdmin && (
                           <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                             <button onClick={() => { setEditingDeal(deal); setIsDealModalOpen(true); }} className="p-1 text-zinc-400 hover:text-white bg-[#18181b] rounded" title="Editar"><Edit2 size={12}/></button>
                           </div>
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm text-white pr-6 leading-tight">{deal.nome}</h4>
                        </div>
                        <div className="mb-3 space-y-1">
                          <p className="text-xs text-zinc-400 flex items-center gap-1.5"><Building2 size={12}/> {company?.nomeFantasia || 'Sem empresa'}</p>
                          <p className="text-xs text-zinc-400 flex items-center gap-1.5"><Users size={12}/> {deal.responsavel}</p>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-white/5">
                          <span className="text-sm font-semibold text-zinc-200">
                            R$ {deal.valor.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-medium">
                            {deal.probabilidade}%
                          </span>
                        </div>
                      </div>
                    )
                  })}
                  {columnDeals.length === 0 && (
                    <div className="h-20 border-2 border-dashed border-white/5 rounded-lg flex items-center justify-center text-xs text-zinc-600 font-medium">
                      Arraste para cá
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'equipe': return renderTeam();
      case 'relatorios': return renderReports();
      case 'leads': return renderLeads();
      case 'contatos': return renderContacts();
      case 'empresas': return renderCompanies();
      case 'negocios': return renderDeals();
      case 'atividades': return renderActivities();
      case 'calendario': return renderCalendar();
      case 'configuracoes': return renderPlaceholder('Configurações');
      default: return renderDashboard();
    }
  };

  // --- MENU LATERAL (SIDEBAR) ---
  const SIDEBAR_GROUPS = [
    {
      title: 'Visão Geral',
      items: [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' }
      ]
    },
    {
      title: 'Análise',
      items: [
        { id: 'relatorios', icon: BarChart2, label: 'Relatórios' }
      ]
    },
    {
      title: 'CRM',
      items: [
        { id: 'leads', icon: Target, label: 'Leads' },
        { id: 'contatos', icon: Users, label: 'Contatos' },
        { id: 'empresas', icon: Building2, label: 'Empresas' },
        { id: 'negocios', icon: Briefcase, label: 'Negócios' }
      ]
    },
    {
      title: 'Engajamento',
      items: [
        { id: 'atividades', icon: Activity, label: 'Atividades' },
        { id: 'calendario', icon: CalendarIcon, label: 'Calendário' }
      ]
    },
    {
      title: 'Espaço de Trabalho',
      items: [
        { id: 'equipe', icon: Users, label: 'Equipe' }
      ]
    },
    {
      title: 'Sistema',
      items: [
        { id: 'configuracoes', icon: Settings, label: 'Configurações' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] flex font-sans text-zinc-300 selection:bg-blue-500/30 overflow-hidden">
      
      {/* MODALS (Formulários Flutuantes) */}
      {isMeetingModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg bg-[#121215] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CalendarIcon size={20} className="text-blue-500"/> 
                {editingMeeting ? 'Editar Reunião' : 'Nova Reunião'}
              </h2>
              <button onClick={() => setIsMeetingModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors bg-white/5 p-1 rounded-md"><X size={18}/></button>
            </div>
            <form onSubmit={handleSaveMeeting} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Título da reunião *</label>
                <input required type="text" name="titulo" defaultValue={editingMeeting?.titulo} placeholder="Ex: Alinhamento Estratégico" className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Data *</label>
                  <input required type="date" name="data" defaultValue={editingMeeting?.data || new Date().toISOString().split('T')[0]} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Horário de início *</label>
                  <input required type="time" name="horario" defaultValue={editingMeeting?.horario || '09:00'} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm [color-scheme:dark]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Observações opcionais</label>
                <textarea name="observacoes" defaultValue={editingMeeting?.observacoes} rows="3" placeholder="Pauta da reunião, links, etc." className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm resize-none"></textarea>
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg mt-2">
                <input type="checkbox" id="lembrete" name="lembreteAtivo" defaultChecked={editingMeeting ? editingMeeting.lembreteAtivo : true} className="w-4 h-4 rounded border-white/20 bg-[#18181b] text-blue-600 focus:ring-blue-500 focus:ring-offset-[#121215] cursor-pointer" />
                <label htmlFor="lembrete" className="text-sm font-medium text-zinc-300 cursor-pointer flex-1">
                  Ativar lembrete no dia da reunião
                </label>
                <Bell size={16} className="text-blue-400" />
              </div>

              <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
                {editingMeeting ? (
                  <button type="button" onClick={() => handleDeleteMeeting(editingMeeting.id)} className="text-sm font-medium text-red-400 hover:text-red-300 px-2 py-1 rounded transition-colors flex items-center gap-1">
                    <Trash2 size={16}/> Excluir
                  </button>
                ) : <div></div>}
                
                <div className="flex gap-3">
                  <button type="button" onClick={() => setIsMeetingModalOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancelar</button>
                  <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
                    Salvar reunião
                  </button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      )}

      {isLeadModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-[#121215] p-6 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Target size={20} className="text-blue-500"/> {editingLead ? 'Editar Lead' : 'Novo Lead'}</h2>
              <button onClick={() => setIsLeadModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors bg-white/5 p-1 rounded-md"><X size={18}/></button>
            </div>
            <form onSubmit={handleSaveLead} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2">Informações Principais</div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Nome Completo *</label>
                  <input required type="text" name="nome" defaultValue={editingLead?.nome} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Empresa</label>
                  <input type="text" name="empresa" defaultValue={editingLead?.empresa} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                
                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2 mt-2">Contato</div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">E-mail</label>
                  <input type="email" name="email" defaultValue={editingLead?.email} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Telefone / WhatsApp</label>
                  <input type="text" name="telefone" defaultValue={editingLead?.telefone} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>

                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2 mt-2">Status da Oportunidade</div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Status</label>
                  <select name="status" defaultValue={editingLead?.status || 'Novo'} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option>Novo</option>
                    <option>Em andamento</option>
                    <option>Qualificado</option>
                    <option>Convertido</option>
                    <option>Perdido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Temperatura</label>
                  <select name="temperatura" defaultValue={editingLead?.temperatura || 'Morno'} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option>Frio</option>
                    <option>Morno</option>
                    <option>Quente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Valor Potencial (R$)</label>
                  <input type="number" name="valorPotencial" defaultValue={editingLead?.valorPotencial || 0} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Responsável</label>
                  <select name="responsavel" defaultValue={editingLead?.responsavel || currentUser?.name} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    {TEAM_MEMBERS.map(m => <option key={m.id}>{m.name}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2 mt-2">Marketing</div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Origem do Lead</label>
                  <input type="text" name="origem" defaultValue={editingLead?.origem} placeholder="Ex: Site, Indicação, Instagram" className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Interesse</label>
                  <input type="text" name="interesse" defaultValue={editingLead?.interesse} placeholder="Ex: Produto, Consultoria" className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsLeadModalOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">Salvar Lead</button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-[#121215] p-6 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Users size={20} className="text-emerald-500"/> {editingContact ? 'Editar Contato' : 'Novo Contato'}</h2>
              <button onClick={() => setIsContactModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors bg-white/5 p-1 rounded-md"><X size={18}/></button>
            </div>
            <form onSubmit={handleSaveContact} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2">Dados Profissionais</div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Nome Completo *</label>
                  <input required type="text" name="nome" defaultValue={editingContact?.nome} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Cargo</label>
                  <input type="text" name="cargo" defaultValue={editingContact?.cargo} placeholder="Ex: Diretor, CEO, Gerente" className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Empresa Vinculada</label>
                  <input type="text" name="empresa" defaultValue={editingContact?.empresa} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>

                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2 mt-2">Canais de Contato</div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">E-mail Corporativo</label>
                  <input type="email" name="email" defaultValue={editingContact?.email} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Telefone / Celular</label>
                  <input type="text" name="telefone" defaultValue={editingContact?.telefone} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>

                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2 mt-2">Relacionamento</div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Tipo de Contato</label>
                  <select name="tipo" defaultValue={editingContact?.tipo || 'Prospect'} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option>Cliente</option>
                    <option>Prospect</option>
                    <option>Parceiro</option>
                    <option>Fornecedor</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Status</label>
                  <select name="status" defaultValue={editingContact?.status || 'Ativo'} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option>Ativo</option>
                    <option>Inativo</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Responsável pela Conta</label>
                  <select name="responsavel" defaultValue={editingContact?.responsavel || currentUser?.name} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    {TEAM_MEMBERS.map(m => <option key={m.id}>{m.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsContactModalOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20">Salvar Contato</button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {isCompanyModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl bg-[#121215] p-6 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Building2 size={20} className="text-blue-500"/> {editingCompany ? 'Editar Empresa' : 'Nova Empresa'}</h2>
              <button onClick={() => setIsCompanyModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors bg-white/5 p-1 rounded-md"><X size={18}/></button>
            </div>
            <form onSubmit={handleSaveCompany} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2">Identificação da Empresa</div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Razão Social *</label>
                  <input required type="text" name="razaoSocial" defaultValue={editingCompany?.razaoSocial} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Nome Fantasia</label>
                  <input type="text" name="nomeFantasia" defaultValue={editingCompany?.nomeFantasia} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">CNPJ</label>
                  <input type="text" name="cnpj" defaultValue={editingCompany?.cnpj} placeholder="00.000.000/0001-00" className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Segmento</label>
                  <input type="text" name="segmento" defaultValue={editingCompany?.segmento} placeholder="Ex: Tecnologia, Varejo" className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Porte</label>
                  <select name="porte" defaultValue={editingCompany?.porte || 'Média'} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option>MEI</option>
                    <option>Microempresa</option>
                    <option>Pequena</option>
                    <option>Média</option>
                    <option>Grande</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Cidade / UF</label>
                  <input type="text" name="cidade" defaultValue={editingCompany?.cidade} placeholder="Ex: Fortaleza / CE" className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>

                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2 mt-2">Relacionamento e Contatos</div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Contato Principal</label>
                  <input type="text" name="contatoPrincipal" defaultValue={editingCompany?.contatoPrincipal} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Telefone Comercial</label>
                  <input type="text" name="telefone" defaultValue={editingCompany?.telefone} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">E-mail Corporativo</label>
                  <input type="email" name="email" defaultValue={editingCompany?.email} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Status Comercial</label>
                  <select name="status" defaultValue={editingCompany?.status || 'Prospect'} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option>Prospect</option>
                    <option>Cliente Ativo</option>
                    <option>Inativo</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Responsável Interno</label>
                  <select name="responsavel" defaultValue={editingCompany?.responsavel || currentUser?.name} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    {TEAM_MEMBERS.map(m => <option key={m.id}>{m.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsCompanyModalOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">Salvar Empresa</button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {isDealModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl bg-[#121215] p-6 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Briefcase size={20} className="text-blue-500"/> {editingDeal ? 'Editar Negócio' : 'Novo Negócio'}</h2>
              <button onClick={() => setIsDealModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors bg-white/5 p-1 rounded-md"><X size={18}/></button>
            </div>
            <form onSubmit={handleSaveDeal} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2">Informações da Oportunidade</div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Nome do Negócio *</label>
                  <input required type="text" name="nome" defaultValue={editingDeal?.nome} placeholder="Ex: Licença Anual - Plano Enterprise" className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Empresa Associada *</label>
                  <select required name="empresaId" defaultValue={editingDeal?.empresaId || ''} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option value="" disabled>Selecione uma empresa</option>
                    {companies.map(c => <option key={c.id} value={c.id}>{c.nomeFantasia || c.razaoSocial}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Contato Principal</label>
                  <select name="contatoId" defaultValue={editingDeal?.contatoId || ''} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option value="">Nenhum</option>
                    {contacts.map(c => <option key={c.id} value={c.id}>{c.nome} ({c.empresa})</option>)}
                  </select>
                </div>

                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2 mt-2">Valores e Pipeline</div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Valor Estimado (R$)</label>
                  <input required type="number" name="valor" defaultValue={editingDeal?.valor || 0} min="0" className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Probabilidade de Fechamento (%)</label>
                  <input required type="number" name="probabilidade" defaultValue={editingDeal?.probabilidade || 50} min="0" max="100" className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Etapa Atual *</label>
                  <select required name="etapa" defaultValue={editingDeal?.etapa || 'Qualificação'} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    {PIPELINE_STAGES.map(stage => <option key={stage} value={stage}>{stage}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Previsão de Fechamento</label>
                  <input required type="date" name="previsaoFechamento" defaultValue={editingDeal?.previsaoFechamento || new Date().toISOString().split('T')[0]} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm [color-scheme:dark]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Responsável Comercial</label>
                  <select name="responsavel" defaultValue={editingDeal?.responsavel || currentUser?.name} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    {TEAM_MEMBERS.map(m => <option key={m.id}>{m.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsDealModalOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">Salvar Negócio</button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {isActivityModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl bg-[#121215] p-6 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Activity size={20} className="text-blue-500"/> {editingActivity ? 'Editar Atividade' : 'Nova Atividade'}</h2>
              <button onClick={() => setIsActivityModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors bg-white/5 p-1 rounded-md"><X size={18}/></button>
            </div>
            <form onSubmit={handleSaveActivity} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2">Informações da Atividade</div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Título da Atividade *</label>
                  <input required type="text" name="titulo" defaultValue={editingActivity?.titulo} placeholder="Ex: Reunião de Alinhamento" className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm" />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Tipo *</label>
                  <select required name="tipo" defaultValue={editingActivity?.tipo || 'Ligação'} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option>Ligação</option>
                    <option>E-mail</option>
                    <option>Reunião</option>
                    <option>Tarefa</option>
                    <option>Visita comercial</option>
                    <option>Acompanhamento de lead</option>
                    <option>Demonstração ou apresentação</option>
                    <option>Proposta comercial</option>
                    <option>Retorno ao cliente</option>
                    <option>Atividade personalizada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Prioridade</label>
                  <select name="prioridade" defaultValue={editingActivity?.prioridade || 'Média'} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option>Baixa</option>
                    <option>Média</option>
                    <option>Alta</option>
                    <option>Urgente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Data/Hora de Início *</label>
                  <input required type="datetime-local" name="dataInicio" defaultValue={editingActivity?.dataInicio || new Date().toISOString().slice(0,16)} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Data/Hora de Término</label>
                  <input type="datetime-local" name="dataFim" defaultValue={editingActivity?.dataFim || ''} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm [color-scheme:dark]" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Descrição e Observações</label>
                  <textarea name="descricao" defaultValue={editingActivity?.descricao} rows="3" placeholder="Detalhes, pauta da reunião ou próximos passos..." className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm resize-none"></textarea>
                </div>

                <div className="md:col-span-2 text-sm font-semibold text-zinc-300 border-b border-white/5 pb-2 mt-2">Relacionamentos & Atribuição</div>
                
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Responsável</label>
                  <select name="responsavel" defaultValue={editingActivity?.responsavel || currentUser?.name} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    {TEAM_MEMBERS.map(m => <option key={m.id}>{m.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Status</label>
                  <select name="status" defaultValue={editingActivity?.status || 'Pendente'} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option>Pendente</option>
                    <option>Em andamento</option>
                    <option>Concluída</option>
                    <option>Cancelada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Empresa Relacionada</label>
                  <select name="empresaId" defaultValue={editingActivity?.empresaId || ''} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option value="">Nenhuma</option>
                    {companies.map(c => <option key={c.id} value={c.id}>{c.nomeFantasia || c.razaoSocial}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Negócio Relacionado</label>
                  <select name="negocioId" defaultValue={editingActivity?.negocioId || ''} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option value="">Nenhum</option>
                    {deals.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Contato Relacionado</label>
                  <select name="contatoId" defaultValue={editingActivity?.contatoId || ''} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option value="">Nenhum</option>
                    {contacts.map(c => <option key={c.id} value={c.id}>{c.nome} ({c.empresa})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Lead Relacionado</label>
                  <select name="leadId" defaultValue={editingActivity?.leadId || ''} className="w-full bg-[#18181b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm appearance-none">
                    <option value="">Nenhum</option>
                    {leads.map(l => <option key={l.id} value={l.id}>{l.nome} ({l.empresa})</option>)}
                  </select>
                </div>

              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsActivityModalOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">Salvar Atividade</button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111111] border-r border-white/5 flex flex-col flex-shrink-0 h-screen">
        {/* Logo/Header */}
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Target size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white leading-tight">Grupo WR</h2>
              <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">CRM</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
          {SIDEBAR_GROUPS.map((group, index) => (
            <div key={index} className="mb-6 px-4">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === item.id 
                        ? 'bg-white/10 text-white' 
                        : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                    }`}
                  >
                    <item.icon size={18} className={activeTab === item.id ? 'text-blue-400' : ''} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${currentUser.color}`}>
                {currentUser.initials}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate max-w-[120px]">{currentUser.name}</p>
                <p className="text-xs text-zinc-500 truncate max-w-[120px]">{currentUser.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-zinc-500 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all" title="Sair">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-sm z-10 flex-shrink-0">
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <LayoutDashboard size={18} />
            <span className="text-zinc-300 font-medium capitalize">
              {SIDEBAR_GROUPS.flatMap(g => g.items).find(i => i.id === activeTab)?.label}
            </span>

            {/* Indicador de Status da Nuvem */}
            <div className="ml-4 flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-[10px] font-medium uppercase tracking-wider border border-white/5 transition-all">
              {syncStatus === 'syncing' && <><RefreshCw size={10} className="animate-spin text-blue-400" /> Sincronizando</>}
              {syncStatus === 'synced' && <><CheckCircle size={10} className="text-emerald-400" /> Nuvem Ativa</>}
              {syncStatus === 'offline' && <><AlertCircle size={10} className="text-red-400" /> Offline</>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="bg-[#18181b] border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors w-64"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 border border-white/10 rounded px-1.5 bg-[#27272a]">⌘K</span>
            </div>
            
            <div className="relative">
              <button 
                className="relative text-zinc-400 hover:text-white transition-colors"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#121215] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="p-3 border-b border-white/10 flex justify-between items-center bg-[#18181b]">
                    <h3 className="font-semibold text-white text-sm">Notificações</h3>
                    {unreadNotifications > 0 && (
                      <button onClick={markAllRead} className="text-[10px] text-blue-400 hover:text-blue-300">Marcar lidas</button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-zinc-500 text-sm">Nenhuma notificação.</div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => handleNotificationClick(n)}
                          className={`p-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${!n.read ? 'bg-blue-500/5' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-sm text-zinc-200">{n.title}</span>
                            {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></span>}
                          </div>
                          <p className="text-xs text-zinc-400 mb-1">{n.message}</p>
                          <p className="text-[10px] text-zinc-500">{new Date(n.time).toLocaleTimeString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {isAdmin && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 transition-colors">
                <Plus size={16} /> Criar
              </button>
            )}
          </div>
        </header>

        {/* Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth no-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* ALERTAS DE REUNIÃO (OVERLAY) */}
      {activeAlerts.length > 0 && (
        <div className="fixed top-6 right-6 z-[100] flex flex-col gap-4">
          {activeAlerts.map(alert => (
            <div key={alert.id} className="w-80 bg-[#18181b] border border-blue-500/40 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)] rounded-xl p-4 transform transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <Bell size={16} className="animate-pulse" />
                  Reunião em 5 minutos
                </div>
                <button onClick={() => setDismissedAlerts([...dismissedAlerts, alert.id])} className="text-zinc-500 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
                  <X size={16} />
                </button>
              </div>
              <h3 className="text-white font-medium text-base leading-tight mb-1">{alert.titulo}</h3>
              <p className="text-zinc-400 text-sm mb-4">Horário agendado: {alert.horario}</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setDismissedAlerts([...dismissedAlerts, alert.id]);
                    setActiveTab('calendario');
                    setEditingMeeting(alert);
                    setIsMeetingModalOpen(true);
                  }} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-lg transition-colors text-center"
                >
                  Ver reunião
                </button>
                <button 
                  onClick={() => setDismissedAlerts([...dismissedAlerts, alert.id])} 
                  className="flex-1 bg-white/10 hover:bg-white/20 text-zinc-300 text-xs font-medium py-2 rounded-lg transition-colors text-center"
                >
                  Fechar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}