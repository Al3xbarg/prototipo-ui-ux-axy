'use client'

import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Eye,
  FileText,
  Filter,
  Gauge,
  Heart,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  MoreHorizontal,
  PackageOpen,
  Palette,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Store,
  Trash2,
  TrendingUp,
  Upload,
  Users,
  X,
  Zap,
} from 'lucide-react'

const vehicles = [
  { id: 1, brand: 'Toyota', model: 'Corolla XEI', year: '2024', km: '32.000 km', price: '$98.900.000', fuel: 'Gasolina', transmission: 'Automático', type: 'Sedán', status: 'Publicado', image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=900&q=85', featured: true },
  { id: 2, brand: 'Mazda', model: 'CX-5 Grand Touring', year: '2023', km: '18.400 km', price: '$139.900.000', fuel: 'Gasolina', transmission: 'Automático', type: 'SUV', status: 'Publicado', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85', featured: true },
  { id: 3, brand: 'Kia', model: 'Sportage Zenith', year: '2024', km: '12.800 km', price: '$129.900.000', fuel: 'Gasolina', transmission: 'Automático', type: 'SUV', status: 'Publicado', image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=85', featured: true },
  { id: 4, brand: 'Chevrolet', model: 'Onix Premier', year: '2023', km: '24.500 km', price: '$74.900.000', fuel: 'Gasolina', transmission: 'Automático', type: 'Hatchback', status: 'Publicado', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=85', featured: false },
  { id: 5, brand: 'Renault', model: 'Duster Intens', year: '2022', km: '44.200 km', price: '$68.900.000', fuel: 'Gasolina', transmission: 'Manual', type: 'SUV', status: 'Reservado', image: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=900&q=85', featured: false },
  { id: 6, brand: 'Ford', model: 'Ranger XLT', year: '2024', km: '9.100 km', price: '$179.900.000', fuel: 'Diésel', transmission: 'Automático', type: 'Pick-up', status: 'Publicado', image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=900&q=85', featured: false },
]

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Vehículos', icon: PackageOpen },
  { label: 'Destacados', icon: Star },
  { label: 'Usuarios', icon: Users },
  { label: 'Estadísticas', icon: BarChart3 },
  { label: 'Configuración', icon: Settings },
]

type View = 'home' | 'catalog' | 'detail' | 'login' | 'admin'

export default function Page() {
  const [view, setView] = useState<View>('home')
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0])
  const [adminSection, setAdminSection] = useState('Dashboard')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')

  const filteredVehicles = useMemo(() => vehicles.filter((vehicle) => `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(search.toLowerCase())), [search])

  const openVehicle = (vehicle: typeof vehicles[number]) => {
    setSelectedVehicle(vehicle)
    setView('detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  if (view === 'login') return <Login onBack={() => setView('home')} onLogin={() => { setView('admin'); notify('Bienvenido a tu panel AXYSO PAV') }} />
  if (view === 'admin') return <Admin section={adminSection} setSection={setAdminSection} onExit={() => setView('home')} notify={notify} />

  return (
    <div className="site-shell">
      <header className="public-header">
        <button className="brand" onClick={() => setView('home')} aria-label="FZ Autos inicio"><span className="brand-mark">FZ</span><span>FZ <em>autos</em></span></button>
        <nav className={mobileMenu ? 'public-nav open' : 'public-nav'}>
          <button className={view === 'home' ? 'active' : ''} onClick={() => { setView('home'); setMobileMenu(false) }}>Inicio</button>
          <button className={view === 'catalog' || view === 'detail' ? 'active' : ''} onClick={() => { setView('catalog'); setMobileMenu(false) }}>Vehículos <span className="nav-count">06</span></button>
          <button onClick={() => { setView('home'); setMobileMenu(false); notify('Conoce más sobre FZ Autos') }}>Nosotros</button>
          <button onClick={() => { setView('home'); setMobileMenu(false); notify('Escríbenos al WhatsApp de FZ Autos') }}>Contacto</button>
        </nav>
        <div className="header-actions"><button className="header-phone" onClick={() => notify('Línea FZ Autos: +57 310 555 0182')}><MessageCircle size={16} /> +57 310 555 0182</button><button className="button dark small" onClick={() => notify('Abriendo WhatsApp...')}>Contactar</button><button className="menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menú"><Menu size={22} /></button></div>
      </header>

      {view === 'home' && <Home onCatalog={() => setView('catalog')} onVehicle={openVehicle} />}
      {view === 'catalog' && <Catalog vehicles={filteredVehicles} search={search} setSearch={setSearch} showFilters={showFilters} setShowFilters={setShowFilters} onVehicle={openVehicle} />}
      {view === 'detail' && <Detail vehicle={selectedVehicle} onBack={() => setView('catalog')} onVehicle={openVehicle} onNotify={notify} />}
      <footer className="public-footer"><div><button className="brand footer-brand" onClick={() => setView('home')}><span className="brand-mark">FZ</span><span>FZ <em>autos</em></span></button><p>Vehículos seleccionados para<br />personas que saben elegir.</p><button className="admin-access" onClick={() => setView('login')}>Acceso concesionario</button></div><div><h4>Explora</h4><button onClick={() => setView('catalog')}>Vehículos disponibles</button><button>Sobre nosotros</button></div><div><h4>Contacto</h4><p>+57 310 555 0182<br />hola@fzautos.co<br />Cra. 19 # 93-52, Bogotá</p></div><div><h4>Horarios</h4><p>Lun — Vie &nbsp; 8:00 — 18:00<br />Sábados &nbsp; 9:00 — 14:00</p></div></footer>
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </div>
  )
}

function Home({ onCatalog, onVehicle }: { onCatalog: () => void, onVehicle: (v: typeof vehicles[number]) => void }) {
  return <main>
    <section className="hero"><div className="hero-copy"><p className="eyebrow">FZ AUTOS <span>·</span> BOGOTÁ</p><h1>Encuentra el vehículo<br /><i>que te mueve.</i></h1><p className="hero-description">Una selección honesta de vehículos inspeccionados,<br className="desktop" /> con la atención que esperas.</p><div className="hero-actions"><button className="button light" onClick={onCatalog}>Ver vehículos <ArrowRight size={16} /></button><button className="text-button light-text" onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })}>Conócenos <ArrowRight size={15} /></button></div></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1800&q=90" alt="Vehículo deportivo en carretera" /><div className="hero-image-caption"><span>01 / 03</span><span className="caption-line" /><span>Selección FZ</span></div></div><div className="hero-scroll">SCROLL <span /></div></section>
    <section className="section featured"><div className="section-head"><div><p className="eyebrow">INVENTARIO SELECCIONADO</p><h2>Vehículos destacados</h2></div><button className="text-button" onClick={onCatalog}>Ver todo el inventario <ArrowRight size={15} /></button></div><div className="vehicle-grid featured-grid">{vehicles.slice(0, 3).map((v) => <VehicleCard key={v.id} vehicle={v} onClick={() => onVehicle(v)} />)}</div></section>
    <section className="why" id="why"><div className="why-intro"><p className="eyebrow">LA DIFERENCIA FZ</p><h2>Comprar un vehículo<br /><i>debería sentirse bien.</i></h2><p>Sin presión, sin letras pequeñas. Solo vehículos que conocemos y un equipo que está para ayudarte a elegir.</p></div><div className="why-list"><div><span>01</span><div><h3>Inventario curado</h3><p>Cada vehículo pasa por una inspección de 120 puntos antes de llegar a nuestra vitrina.</p></div></div><div><span>02</span><div><h3>Transparencia primero</h3><p>Historial, estado real y acompañamiento claro en cada paso de tu compra.</p></div></div><div><span>03</span><div><h3>Atención humana</h3><p>Hablamos contigo por WhatsApp, sin bots ni formularios interminables.</p></div></div></div></section>
    <section className="closing-cta"><p className="eyebrow">TU PRÓXIMO CAPÍTULO</p><h2>¿Listo para encontrarlo?</h2><button className="button light" onClick={onCatalog}>Explorar inventario <ArrowRight size={16} /></button></section>
  </main>
}

function VehicleCard({ vehicle, onClick }: { vehicle: typeof vehicles[number], onClick: () => void }) {
  return <article className="vehicle-card"><button className="card-image" onClick={onClick}><img src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} />{vehicle.featured && <span className="featured-label"><Star size={12} fill="currentColor" /> Destacado</span>}<span className="view-arrow"><ArrowUpRight /></span></button><div className="vehicle-card-body"><div><p className="vehicle-brand">{vehicle.brand}</p><h3>{vehicle.model}</h3></div><button className="heart" aria-label="Guardar vehículo"><Heart size={17} /></button><div className="vehicle-meta"><span>{vehicle.year}</span><span>{vehicle.km}</span><span>{vehicle.transmission}</span></div><div className="vehicle-price"><strong>{vehicle.price}</strong><button onClick={onClick}>Ver vehículo <ArrowRight size={14} /></button></div></div></article>
}

function Catalog({ vehicles: list, search, setSearch, showFilters, setShowFilters, onVehicle }: { vehicles: typeof vehicles, search: string, setSearch: (v: string) => void, showFilters: boolean, setShowFilters: (v: boolean) => void, onVehicle: (v: typeof vehicles[number]) => void }) {
  return <main className="catalog-page"><div className="catalog-hero"><div><p className="eyebrow">FZ AUTOS / INVENTARIO</p><h1>Vehículos disponibles</h1><p>La selección completa de vehículos inspeccionados de FZ Autos.</p></div><div className="catalog-count"><strong>06</strong><span>vehículos<br />disponibles</span></div></div><div className="catalog-toolbar"><div className="search-field"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar marca o modelo" />{search && <button onClick={() => setSearch('')}><X size={14} /></button>}</div><button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={16} /> Filtros <span>3</span></button><button className="sort-button">Más recientes <ChevronDown size={15} /></button></div><div className="catalog-layout"><aside className={showFilters ? 'filters open' : 'filters'}><div className="filter-header"><h3>Filtrar inventario</h3><button onClick={() => setShowFilters(false)}><X size={17} /></button></div>{['Marca', 'Modelo', 'Rango de precio', 'Año', 'Tipo de vehículo', 'Transmisión'].map((f, i) => <button className="filter-row" key={f}>{f}<span>{i === 0 ? 'Todas' : <ChevronDown size={15} />}</span></button>)}<button className="button dark filter-apply" onClick={() => setShowFilters(false)}>Aplicar filtros</button></aside><section className="catalog-results"><div className="results-head"><p><strong>{list.length}</strong> vehículos encontrados</p><span>Vista cuadrícula <span className="view-dots">▪▪▪</span></span></div>{list.length ? <div className="vehicle-grid">{list.map((v) => <VehicleCard key={v.id} vehicle={v} onClick={() => onVehicle(v)} />)}</div> : <div className="empty-state"><Search size={25} /><h3>No encontramos ese vehículo</h3><p>Prueba con otra marca o modelo.</p></div>}</section></div></main>
}

function Detail({ vehicle, onBack, onVehicle, onNotify }: { vehicle: typeof vehicles[number], onBack: () => void, onVehicle: (v: typeof vehicles[number]) => void, onNotify: (s: string) => void }) {
  return <main className="detail-page"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Volver al inventario</button><div className="detail-layout"><section><div className="detail-main-image"><img src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} /><span className="image-counter">01 / 04</span></div><div className="thumb-row">{[vehicle.image, vehicles[1].image, vehicles[2].image, vehicles[3].image].map((image, i) => <button className={i === 0 ? 'thumb active' : 'thumb'} key={image}><img src={image} alt="" /></button>)}</div></section><section className="detail-info"><p className="eyebrow">{vehicle.brand} / {vehicle.year}</p><h1>{vehicle.model}</h1><p className="detail-version">Versión Grand Touring · Único dueño</p><strong className="detail-price">{vehicle.price}</strong><div className="spec-grid"><div><span>Año</span><strong>{vehicle.year}</strong></div><div><span>Kilometraje</span><strong>{vehicle.km}</strong></div><div><span>Combustible</span><strong>{vehicle.fuel}</strong></div><div><span>Transmisión</span><strong>{vehicle.transmission}</strong></div></div><div className="detail-actions"><button className="button whatsapp" onClick={() => onNotify('Abriendo WhatsApp con tu consulta...')}><MessageCircle size={18} /> Consultar por WhatsApp</button><button className="save-button"><Heart size={17} /> Guardar</button></div><div className="detail-description"><h3>Sobre este vehículo</h3><p>Un vehículo excepcional, con el equilibrio perfecto entre diseño, confort y tecnología. Ha sido revisado por nuestro equipo y cuenta con historial de mantenimiento al día. Listo para acompañarte en tu próximo camino.</p></div><div className="trust-note"><ShieldCheck size={20} /><span><strong>Compra con confianza.</strong> Inspección FZ de 120 puntos incluida.</span></div></section></div><section className="similar"><div className="section-head"><div><p className="eyebrow">SIGUE EXPLORANDO</p><h2>También podría interesarte</h2></div><button className="text-button" onClick={onBack}>Ver inventario <ArrowRight size={15} /></button></div><div className="vehicle-grid">{vehicles.filter((v) => v.id !== vehicle.id).slice(0, 3).map((v) => <VehicleCard key={v.id} vehicle={v} onClick={() => onVehicle(v)} />)}</div></section></main>
}

function Login({ onBack, onLogin }: { onBack: () => void, onLogin: () => void }) {
  return <main className="login-page"><div className="login-brand"><span className="ax-logo">AX</span><span>AXYSO <em>PAV</em></span></div><div className="login-card"><p className="eyebrow">PANEL DE ADMINISTRACIÓN</p><h1>Bienvenido de nuevo.</h1><p className="login-subtitle">Administra el inventario de tu concesionario desde un solo lugar.</p><label>Correo electrónico<input type="email" placeholder="tu@concesionario.com" defaultValue="admin@fzautos.co" /></label><label>Contraseña<div className="password-input"><input type="password" placeholder="••••••••" defaultValue="password" /><Eye size={16} /></div></label><div className="login-options"><label className="checkbox"><input type="checkbox" defaultChecked /> Recordarme</label><button>¿Olvidaste tu contraseña?</button></div><button className="button dark full" onClick={onLogin}>Iniciar sesión <ArrowRight size={16} /></button><button className="back-login" onClick={onBack}><ArrowLeft size={15} /> Volver al sitio público</button></div><p className="login-foot">AXYSO PAV · Plataforma de Administración Vehicular</p></main>
}

function Admin({ section, setSection, onExit, notify }: { section: string, setSection: (s: string) => void, onExit: () => void, notify: (s: string) => void }) {
  const [sidebar, setSidebar] = useState(false)
  return <div className="admin-shell"><aside className={sidebar ? 'admin-sidebar open' : 'admin-sidebar'}><div className="admin-logo"><span className="ax-logo">AX</span><span>AXYSO <em>PAV</em></span></div><div className="workspace"><span className="fz-mini">FZ</span><div><strong>FZ Autos</strong><small>Plan Profesional</small></div><ChevronDown size={14} /></div><nav className="admin-nav"><p>MENÚ PRINCIPAL</p>{navItems.map(({ label, icon: Icon }) => <button className={section === label ? 'active' : ''} key={label} onClick={() => { setSection(label); setSidebar(false) }}><Icon size={17} />{label}{label === 'Vehículos' && <span className="nav-badge">6</span>}</button>)}<p className="nav-space">CUENTA</p><button onClick={() => notify('Abriendo centro de ayuda')}><CircleHelp size={17} />Ayuda y soporte</button></nav><button className="admin-logout" onClick={onExit}><LogOut size={17} />Cerrar sesión</button></aside><div className="admin-content"><header className="admin-header"><button className="admin-menu" onClick={() => setSidebar(!sidebar)}><Menu size={20} /></button><div><p>FZ Autos <ChevronRight size={13} /> <strong>{section}</strong></p></div><div className="admin-header-right"><button className="icon-button"><Bell size={18} /><i /></button><span className="admin-divider" /><div className="admin-user"><span>MC</span><div><strong>María Camila</strong><small>Administrador</small></div><ChevronDown size={14} /></div></div></header>{section === 'Dashboard' && <Dashboard onNotify={notify} />}{section === 'Vehículos' && <AdminVehicles onNotify={notify} />}{section === 'Destacados' && <Featured onNotify={notify} />}{section === 'Usuarios' && <UsersPage onNotify={notify} />}{section === 'Estadísticas' && <Stats />}{section === 'Configuración' && <SettingsPage onNotify={notify} />}</div></div>
}

function AdminTitle({ eyebrow, title, description, action }: { eyebrow?: string, title: string, description?: string, action?: React.ReactNode }) { return <div className="admin-title"><div><p className="eyebrow">{eyebrow || 'RESUMEN GENERAL'}</p><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div> }
function Dashboard({ onNotify }: { onNotify: (s: string) => void }) { return <main className="admin-main"><AdminTitle title="Buenos días, María Camila" description="Este es el resumen de lo que está pasando con tu concesionario." action={<button className="button dark" onClick={() => onNotify('Formulario de nuevo vehículo listo')}><Plus size={16} /> Nuevo vehículo</button>} /><div className="metric-grid"><Metric icon={PackageOpen} label="Vehículos publicados" value="24" delta="+12%" /><Metric icon={FileText} label="En borrador" value="08" delta="3 pendientes" muted /><Metric icon={Eye} label="Visualizaciones" value="8.492" delta="+18,4%" /><Metric icon={MessageCircle} label="Contactos WhatsApp" value="186" delta="+24,8%" /></div><div className="dashboard-grid"><section className="panel chart-panel"><div className="panel-head"><div><h2>Rendimiento del inventario</h2><p>Visualizaciones y contactos generados</p></div><button className="select-button">Últimos 30 días <ChevronDown size={14} /></button></div><div className="chart-legend"><span><i className="blue-dot" /> Visualizaciones</span><span><i className="orange-dot" /> Contactos</span></div><div className="chart"><div className="y-labels"><span>1.200</span><span>800</span><span>400</span><span>0</span></div><div className="chart-area"><div className="grid-lines"><i /><i /><i /><i /></div><svg viewBox="0 0 600 180" preserveAspectRatio="none" aria-label="Gráfico de rendimiento"><path d="M0 140 C30 135 50 145 80 125 S120 110 145 120 S185 70 220 95 S260 110 290 75 S340 105 365 72 S405 60 430 84 S465 52 490 65 S540 30 600 40" fill="none" stroke="#3457d5" strokeWidth="3" /><path d="M0 160 C50 155 65 160 100 148 S150 150 180 135 S230 145 260 126 S300 145 330 124 S370 135 400 114 S445 125 480 104 S530 112 600 96" fill="none" stroke="#e7a36b" strokeWidth="3" /></svg><div className="x-labels"><span>01 Jun</span><span>08 Jun</span><span>15 Jun</span><span>22 Jun</span><span>30 Jun</span></div></div></div></section><section className="panel"><div className="panel-head"><div><h2>Vehículos más vistos</h2><p>Últimos 30 días</p></div><button className="more-button"><MoreHorizontal size={18} /></button></div><div className="most-viewed">{vehicles.slice(0, 4).map((v, i) => <div className="most-row" key={v.id}><span className="rank">0{i + 1}</span><img src={v.image} alt="" /><div><strong>{v.brand} {v.model}</strong><small>{[1284, 986, 742, 518][i]} visualizaciones</small></div><span className="trend">+{[24, 18, 12, 8][i]}%</span></div>)}</div><button className="panel-link">Ver todos los vehículos <ArrowRight size={14} /></button></section></div><section className="panel activity-panel"><div className="panel-head"><div><h2>Actividad reciente</h2><p>Lo último que ha ocurrido en tu cuenta</p></div><button className="text-button">Ver todo <ArrowRight size={14} /></button></div><div className="activity-list"><Activity icon={PackageOpen} text="Mazda CX-5 Grand Touring fue publicado" time="Hace 18 min" color="blue" /><Activity icon={MessageCircle} text="Nuevo contacto por Toyota Corolla XEI" time="Hace 42 min" color="green" /><Activity icon={Pencil} text="Se actualizó el precio de Kia Sportage Zenith" time="Ayer, 16:24" color="orange" /></div></section></main> }
function Metric({ icon: Icon, label, value, delta, muted }: { icon: typeof PackageOpen, label: string, value: string, delta: string, muted?: boolean }) { return <div className="metric"><div className="metric-icon"><Icon size={18} /></div><p>{label}</p><strong>{value}</strong><span className={muted ? 'metric-delta muted' : 'metric-delta'}>{!muted && <TrendingUp size={13} />} {delta}</span></div> }
function Activity({ icon: Icon, text, time, color }: { icon: typeof PackageOpen, text: string, time: string, color: string }) { return <div className="activity"><span className={`activity-icon ${color}`}><Icon size={16} /></span><span><strong>{text}</strong><small>{time}</small></span></div> }

function AdminVehicles({ onNotify }: { onNotify: (s: string) => void }) { return <main className="admin-main"><AdminTitle eyebrow="INVENTARIO / 24 PUBLICADOS" title="Vehículos" description="Administra y organiza todo tu inventario." action={<button className="button dark" onClick={() => onNotify('Formulario de nuevo vehículo listo')}><Plus size={16} /> Nuevo vehículo</button>} /><div className="admin-toolbar"><div className="search-field"><Search size={16} /><input placeholder="Buscar vehículo..." /></div><button className="outline-button"><Filter size={15} /> Filtros</button><button className="outline-button">Todos los estados <ChevronDown size={14} /></button></div><div className="table-panel"><table><thead><tr><th>VEHÍCULO</th><th>PRECIO</th><th>ESTADO</th><th>DESTACADO</th><th>ACTUALIZADO</th><th /></tr></thead><tbody>{vehicles.map((v, i) => <tr key={v.id}><td><div className="table-vehicle"><img src={v.image} alt="" /><span><strong>{v.brand} {v.model}</strong><small>{v.year} · {v.km}</small></span></div></td><td><strong>{v.price}</strong></td><td><span className={`status ${v.status.toLowerCase()}`}>{v.status}</span></td><td>{v.featured ? <span className="star-status"><Star size={14} fill="currentColor" /> Sí</span> : <span className="not-featured">—</span>}</td><td><span className="updated">{i + 1} {i === 0 ? 'hora' : 'días'}</span></td><td><button className="more-button"><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table></div></main> }
function Featured({ onNotify }: { onNotify: (s: string) => void }) { return <main className="admin-main"><AdminTitle eyebrow="MERCHANDISING" title="Vehículos destacados" description="Elige qué vehículos aparecen primero en tu sitio público." action={<button className="button dark" onClick={() => onNotify('Orden actualizado')}><Check size={16} /> Guardar orden</button>} /><div className="featured-admin-grid">{vehicles.slice(0, 4).map((v, i) => <div className="featured-admin-card" key={v.id}><span className="drag">⋮⋮</span><span className="admin-rank">0{i + 1}</span><img src={v.image} alt="" /><div><p>{v.brand}</p><h3>{v.model}</h3><span>{v.year} · {v.price}</span></div><button className={v.featured ? 'featured-toggle on' : 'featured-toggle'} onClick={() => onNotify(v.featured ? 'Vehículo quitado de destacados' : 'Vehículo destacado')}><Star size={15} fill={v.featured ? 'currentColor' : 'none'} /> {v.featured ? 'Destacado' : 'Destacar'}</button></div>)}</div></main> }
function UsersPage({ onNotify }: { onNotify: (s: string) => void }) { return <main className="admin-main"><AdminTitle eyebrow="EQUIPO" title="Usuarios" description="Administra quién puede acceder al panel." action={<button className="button dark" onClick={() => onNotify('Invitación lista para enviar')}><Plus size={16} /> Invitar usuario</button>} /><div className="table-panel"><table><thead><tr><th>USUARIO</th><th>ROL</th><th>ESTADO</th><th>ÚLTIMO ACCESO</th><th /></tr></thead><tbody><tr><td><div className="table-vehicle"><span className="avatar blue">MC</span><span><strong>María Camila Torres</strong><small>admin@fzautos.co</small></span></div></td><td>Administrador</td><td><span className="status publicado">Activo</span></td><td>Hoy, 09:12</td><td><MoreHorizontal size={18} /></td></tr><tr><td><div className="table-vehicle"><span className="avatar orange">JP</span><span><strong>Juan Pablo Ríos</strong><small>ventas@fzautos.co</small></span></div></td><td>Usuario</td><td><span className="status publicado">Activo</span></td><td>Ayer, 17:40</td><td><MoreHorizontal size={18} /></td></tr><tr><td><div className="table-vehicle"><span className="avatar gray">LS</span><span><strong>Laura Sánchez</strong><small>laura@fzautos.co</small></span></div></td><td>Usuario</td><td><span className="status borrador">Invitación pendiente</span></td><td>—</td><td><MoreHorizontal size={18} /></td></tr></tbody></table></div></main> }
function Stats() { return <main className="admin-main"><AdminTitle eyebrow="ANALÍTICA" title="Estadísticas" description="Entiende cómo las personas descubren tu inventario." action={<button className="select-button">Últimos 30 días <ChevronDown size={14} /></button>} /><div className="stats-metrics"><Metric icon={Eye} label="Visitas al sitio" value="12.840" delta="+18,4%" /><Metric icon={PackageOpen} label="Vistas de vehículos" value="8.492" delta="+12,8%" /><Metric icon={MessageCircle} label="Clics en WhatsApp" value="186" delta="+24,8%" /></div><div className="panel large-stats"><div className="panel-head"><div><h2>Actividad del sitio</h2><p>Comparativa de visitas, vistas y contactos</p></div><div className="chart-legend"><span><i className="blue-dot" /> Visitas</span><span><i className="orange-dot" /> WhatsApp</span></div></div><div className="chart tall"><div className="y-labels"><span>2.000</span><span>1.000</span><span>500</span><span>0</span></div><div className="chart-area"><div className="grid-lines"><i /><i /><i /><i /></div><svg viewBox="0 0 700 220" preserveAspectRatio="none"><path d="M0 170 C50 160 65 180 110 135 S170 150 205 125 S255 142 290 100 S350 128 385 93 S425 115 470 72 S530 97 565 52 S620 72 700 28" fill="none" stroke="#3457d5" strokeWidth="3" /><path d="M0 200 C80 195 90 205 150 185 S210 194 270 175 S340 190 400 157 S470 180 520 145 S600 156 700 125" fill="none" stroke="#e7a36b" strokeWidth="3" /></svg><div className="x-labels"><span>01 Jun</span><span>08 Jun</span><span>15 Jun</span><span>22 Jun</span><span>30 Jun</span></div></div></div></div></main> }
function SettingsPage({ onNotify }: { onNotify: (s: string) => void }) { return <main className="admin-main"><AdminTitle eyebrow="CONFIGURACIÓN DEL CONCESIONARIO" title="Tu concesionario" description="Personaliza la identidad y la información de tu sitio público." action={<button className="button dark" onClick={() => onNotify('Cambios guardados correctamente')}><Check size={16} /> Guardar cambios</button>} /><div className="settings-layout"><div className="settings-nav"><button className="active"><Store size={16} /> Información general</button><button><Palette size={16} /> Identidad visual</button><button><MessageCircle size={16} /> Canales de contacto</button><button><Zap size={16} /> Dominio y publicación</button></div><div className="settings-form"><section className="form-section"><div><h2>Información general</h2><p>Estos datos aparecen en tu sitio público.</p></div><div className="form-grid"><label>Nombre comercial<input defaultValue="FZ Autos" /></label><label>Teléfono<input defaultValue="+57 310 555 0182" /></label><label className="wide">Descripción<textarea defaultValue="Vehículos seleccionados para personas que saben elegir." /></label><label className="wide">Dirección<input defaultValue="Cra. 19 # 93-52, Bogotá, Colombia" /></label></div></section><section className="form-section"><div><h2>Identidad visual</h2><p>Define cómo se ve tu concesionario.</p></div><div className="logo-upload"><span className="fz-mini">FZ</span><div><strong>Logo del concesionario</strong><small>PNG o SVG · Máximo 2 MB</small></div><button className="outline-button"><Upload size={15} /> Cambiar</button></div><div className="color-row"><label>Color principal<div className="color-input"><i style={{ background: '#17233f' }} />#17233F</div></label><label>Color de acento<div className="color-input"><i style={{ background: '#e7a36b' }} />#E7A36B</div></label></div></section></div></div></main> }
