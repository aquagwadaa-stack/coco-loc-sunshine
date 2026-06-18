import { createFileRoute } from '@tanstack/react-router';
import { type FormEvent, useMemo, useState } from 'react';
import {
  BadgeCheck,
  CalendarDays,
  Car,
  CarFront,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  Gauge,
  Instagram,
  KeyRound,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sun,
  Truck,
  User,
} from 'lucide-react';
import heroImg from '@/assets/hero-tropical.jpg';
import plaqueImg from '@/assets/plaque-4d.jpg';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Coco Loc 971 — Location voiture en Guadeloupe' },
      {
        name: 'description',
        content:
          'Réservez une voiture en Guadeloupe avec Coco Loc 971 : moteur de recherche, véhicules disponibles, kilométrage illimité, options et confirmation WhatsApp.',
      },
      { property: 'og:title', content: 'Coco Loc 971 — Location de voiture en Guadeloupe' },
      {
        property: 'og:description',
        content:
          'Choisissez vos dates, votre véhicule, vos options et préparez votre réservation en ligne.',
      },
      { property: 'og:image', content: heroImg },
    ],
  }),
  component: Home,
});

const agencies = [
  'Aéroport Pôle Caraïbes',
  'Pointe-à-Pitre',
  'Baie-Mahault',
  'Le Gosier',
  'Sainte-Anne',
  'Livraison à domicile',
];

const vehicles = [
  {
    name: 'Fiat Panda / Twingo 3',
    category: 'Économique',
    seats: 4,
    transmission: 'Manuelle',
    luggage: '2 bagages',
    icon: Car,
    color: 'from-sky-500 to-emerald-500',
    prices: [60, 70, 130, 280],
    tags: ['Petit budget', 'Ville', 'Climatisée'],
  },
  {
    name: 'Clio 4',
    category: 'Compacte',
    seats: 5,
    transmission: 'Manuelle',
    luggage: '3 bagages',
    icon: CarFront,
    color: 'from-blue-600 to-cyan-500',
    prices: [75, 85, 150, 300],
    tags: ['Confort', 'Routes île', 'Km illimité'],
  },
  {
    name: 'Clio 5 Automatique',
    category: 'Automatique',
    seats: 5,
    transmission: 'Auto',
    luggage: '3 bagages',
    icon: Settings2,
    color: 'from-violet-600 to-blue-500',
    prices: [85, 95, 170, 330],
    tags: ['Automatique', 'Récent', 'Facile'],
  },
  {
    name: 'Captur',
    category: 'SUV',
    seats: 5,
    transmission: 'Manuelle',
    luggage: '4 bagages',
    icon: BadgeCheck,
    color: 'from-orange-500 to-rose-500',
    prices: [95, 105, 190, 360],
    tags: ['Famille', 'Hauteur', 'Confort'],
  },
];

const packs = [
  { name: 'Week-end', days: 2, label: '2 jours' },
  { name: '3 jours', days: 3, label: '3 jours' },
  { name: '7 jours', days: 7, label: '7 jours' },
  { name: '14 jours', days: 14, label: '14 jours' },
];

const extras = [
  { key: 'airport', label: 'Accueil aéroport', desc: 'Rendez-vous en zone arrivée', price: 0 },
  { key: 'delivery', label: 'Livraison dédiée', desc: 'Domicile, hôtel ou point de rendez-vous', price: 10 },
  { key: 'childSeat', label: 'Siège enfant', desc: 'Selon disponibilité', price: 5 },
  { key: 'secondDriver', label: 'Conducteur additionnel', desc: 'Pièce d’identité demandée', price: 10 },
  { key: 'plates', label: 'Ajouter une demande plaques', desc: '4D ou 3D Topaze', price: 0 },
];

const included = [
  { icon: Gauge, title: 'Kilométrage illimité', desc: 'Explorez Grande-Terre et Basse-Terre sans compteur.' },
  { icon: ShieldCheck, title: 'Assurance incluse', desc: 'Formules claires, conditions expliquées avant départ.' },
  { icon: Truck, title: 'Livraison possible', desc: 'Aéroport, hôtel, domicile ou point de rendez-vous.' },
];

const plaques = [
  { name: 'Pack 2 plaques 4D', price: 55, badge: 'Pose comprise' },
  { name: 'Pack 2 plaques 3D Topaze', price: 65, badge: 'Topaze' },
  { name: 'Plaque 4D simple', price: 29, badge: 'Avant ou arrière' },
  { name: 'Plaque 3D Topaze simple', price: 35, badge: 'Avant ou arrière' },
];

const field =
  'mt-1.5 h-12 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/15';
const area =
  'mt-1.5 min-h-24 w-full rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/15';
const card = 'rounded-2xl border border-border bg-card shadow-soft';

function getRentalDays(start: string, end: string) {
  if (!start || !end) return 0;
  const startTime = new Date(`${start}T00:00:00`).getTime();
  const endTime = new Date(`${end}T00:00:00`).getTime();
  const days = Math.ceil((endTime - startTime) / 86400000);
  return Number.isFinite(days) && days > 0 ? days : 1;
}

function getPack(days: number) {
  if (!days) return null;
  if (days <= 2) return { ...packs[0], index: 0 };
  if (days <= 3) return { ...packs[1], index: 1 };
  if (days <= 7) return { ...packs[2], index: 2 };
  if (days <= 14) return { ...packs[3], index: 3 };
  return null;
}

function getDateOffset(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function sendWhatsApp(lines: string[]) {
  const text = encodeURIComponent(lines.join(String.fromCharCode(10)));
  window.open(`https://wa.me/590691278794?text=${text}`, '_blank');
}

function Home() {
  const [search, setSearch] = useState({
    pickup: 'Aéroport Pôle Caraïbes',
    returnPlace: 'Même lieu',
    pickupDate: getDateOffset(2),
    pickupTime: '09:00',
    returnDate: getDateOffset(9),
    returnTime: '09:00',
    category: 'Toutes catégories',
    promo: '',
  });
  const [driver, setDriver] = useState({ name: '', phone: '', email: '', note: '' });
  const [payment, setPayment] = useState('Paiement à la récupération');
  const [confirmation, setConfirmation] = useState('Confirmation WhatsApp');
  const [selectedVehicle, setSelectedVehicle] = useState('Clio 4');
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({
    airport: true,
    delivery: false,
    childSeat: false,
    secondDriver: false,
    plates: false,
  });

  const selectedCar = vehicles.find((vehicle) => vehicle.name === selectedVehicle) ?? vehicles[1];
  const days = getRentalDays(search.pickupDate, search.returnDate);
  const pack = getPack(days);
  const extraTotal = extras.reduce((total, extra) => total + (selectedExtras[extra.key] ? extra.price : 0), 0);
  const vehicleTotal = pack ? selectedCar.prices[pack.index] : 0;
  const total = vehicleTotal + extraTotal;
  const resultLabel = pack ? `Pack ${pack.name}` : days > 14 ? 'Long séjour sur mesure' : 'Dates à choisir';
  const durationLabel = days ? `${days} jour${days > 1 ? 's' : ''}` : 'durée à calculer';

  const filteredVehicles = useMemo(() => {
    if (search.category === 'Toutes catégories') return vehicles;
    return vehicles.filter((vehicle) => vehicle.category === search.category);
  }, [search.category]);

  function updateSearch(key: keyof typeof search, value: string) {
    setSearch((current) => ({ ...current, [key]: value }));
  }

  function updateDriver(key: keyof typeof driver, value: string) {
    setDriver((current) => ({ ...current, [key]: value }));
  }

  function submitBooking(event: FormEvent) {
    event.preventDefault();
    if (!driver.name || !driver.phone || !search.pickupDate || !search.returnDate) return;
    const optionList = extras
      .filter((extra) => selectedExtras[extra.key])
      .map((extra) => `${extra.label}${extra.price ? ` (+${extra.price}€)` : ''}`)
      .join(', ');

    sendWhatsApp([
      'Bonjour Coco Loc 971,',
      '',
      'Je souhaite réserver une voiture.',
      `Véhicule : ${selectedVehicle}`,
      `Formule : ${resultLabel} (${durationLabel})`,
      `Départ : ${search.pickup} le ${search.pickupDate} à ${search.pickupTime}`,
      `Retour : ${search.returnPlace} le ${search.returnDate} à ${search.returnTime}`,
      `Options : ${optionList || 'Aucune option'}`,
      `Paiement : ${payment}`,
      `Confirmation : ${confirmation}`,
      `Tarif indicatif : ${total ? `${total}€` : 'à confirmer'}`,
      `Conducteur : ${driver.name}`,
      `Téléphone : ${driver.phone}`,
      `Email : ${driver.email || 'Non renseigné'}`,
      `Note : ${driver.note || 'Aucune note'}`,
    ]);
  }

  return (
    <div className='min-h-screen bg-background'>
      <header className='fixed top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-md'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6'>
          <a href='#top' className='flex items-center gap-2'>
            <span className='grid h-10 w-10 place-items-center rounded-lg bg-ocean text-white shadow-soft'>
              <KeyRound className='h-5 w-5' />
            </span>
            <span className='leading-tight'>
              <span className='block font-display text-lg font-bold'>Coco Loc</span>
              <span className='block text-[10px] font-semibold tracking-widest text-muted-foreground'>LOCATION AUTO · 971</span>
            </span>
          </a>
          <nav className='hidden gap-6 text-sm font-semibold md:flex'>
            <a href='#search' className='hover:text-ocean'>Réserver</a>
            <a href='#fleet' className='hover:text-ocean'>Véhicules</a>
            <a href='#included' className='hover:text-ocean'>Inclus</a>
            <a href='#plates' className='hover:text-ocean'>Plaques</a>
          </nav>
          <a href='tel:0691278794' className='inline-flex h-10 items-center gap-2 rounded-lg bg-coral px-4 text-sm font-bold text-white shadow-soft'>
            <Phone className='h-4 w-4' />06 91 27 87 94
          </a>
        </div>
      </header>

      <section id='top' className='relative overflow-hidden pt-20'>
        <img src={heroImg} alt='Voiture de location en Guadeloupe' className='absolute inset-x-0 top-0 h-[92vh] min-h-[760px] w-full object-cover object-[72%_center] md:object-center' />
        <div className='absolute inset-x-0 top-0 h-[92vh] min-h-[760px] bg-gradient-to-r from-background via-background/85 to-background/20' />
        <div className='relative mx-auto grid min-h-[86vh] max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-12'>
          <div>
            <div className='inline-flex items-center gap-2 rounded-full border border-border bg-card/85 px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-soft'>
              <Plane className='h-4 w-4 text-ocean' /> Aéroport · hôtels · domicile
            </div>
            <h1 className='mt-5 max-w-2xl font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl'>
              Location de voiture en Guadeloupe
            </h1>
            <p className='mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg'>
              Choisissez votre agence, vos dates, votre catégorie et préparez une réservation claire avec Coco Loc 971.
            </p>
            <div className='mt-7 grid max-w-2xl gap-3 sm:grid-cols-3'>
              <Trust icon={Gauge} title='Km illimité' />
              <Trust icon={ShieldCheck} title='Assurance incluse' />
              <Trust icon={MessageCircle} title='Confirmation WhatsApp' />
            </div>
          </div>

          <form id='search' className={`${card} p-4 sm:p-6`} onSubmit={(event) => event.preventDefault()}>
            <div className='flex items-center justify-between gap-4 border-b border-border pb-4'>
              <div>
                <div className='text-xs font-bold uppercase tracking-widest text-coral'>Réserver un véhicule</div>
                <h2 className='font-display text-2xl font-black'>Rechercher une disponibilité</h2>
              </div>
              <span className='hidden rounded-full bg-palm/10 px-3 py-1 text-xs font-bold text-palm sm:inline-flex'>Prix sans surprise</span>
            </div>

            <div className='mt-5 grid gap-4 md:grid-cols-2'>
              <SelectField label='Lieu de départ' value={search.pickup} values={agencies} onChange={(value) => updateSearch('pickup', value)} icon={MapPin} />
              <SelectField label='Lieu de retour' value={search.returnPlace} values={['Même lieu', ...agencies]} onChange={(value) => updateSearch('returnPlace', value)} icon={MapPin} />
            </div>
            <div className='mt-4 grid gap-4 md:grid-cols-2'>
              <DateTime label='Départ' date={search.pickupDate} time={search.pickupTime} onDate={(value) => updateSearch('pickupDate', value)} onTime={(value) => updateSearch('pickupTime', value)} />
              <DateTime label='Retour' date={search.returnDate} time={search.returnTime} onDate={(value) => updateSearch('returnDate', value)} onTime={(value) => updateSearch('returnTime', value)} />
            </div>
            <div className='mt-4 grid gap-4 md:grid-cols-[1fr_0.85fr]'>
              <SelectField label='Catégorie souhaitée' value={search.category} values={['Toutes catégories', 'Économique', 'Compacte', 'Automatique', 'SUV']} onChange={(value) => updateSearch('category', value)} icon={Car} />
              <TextField label='Code promo' value={search.promo} onChange={(value) => updateSearch('promo', value)} placeholder='Optionnel' />
            </div>
            <a href='#fleet' className='mt-5 inline-flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-ocean text-base font-black text-white shadow-glow'>
              <Search className='h-5 w-5' />Voir les véhicules
            </a>
            <div className='mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3'>
              <span>Âge conducteur à confirmer</span>
              <span>Permis + pièce d’identité</span>
              <span>Caution selon véhicule</span>
            </div>
          </form>
        </div>
      </section>

      <section id='fleet' className='px-4 py-20 sm:px-6 lg:py-24'>
        <div className='mx-auto max-w-7xl'>
          <div className='flex flex-col justify-between gap-4 md:flex-row md:items-end'>
            <SectionTitle eyebrow='Véhicules disponibles' title='Choisissez votre catégorie' />
            <div className='rounded-2xl bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground'>
              {durationLabel} · {resultLabel} · {search.pickup}
            </div>
          </div>

          <div className='mt-8 grid gap-5 lg:grid-cols-4'>
            {filteredVehicles.map((vehicle) => {
              const price = pack ? vehicle.prices[pack.index] : null;
              return (
                <article key={vehicle.name} className={`${card} overflow-hidden transition hover:-translate-y-1 hover:shadow-glow`}>
                  <div className={`relative grid h-44 place-items-center bg-gradient-to-br ${vehicle.color} text-white`}>
                    <vehicle.icon className='h-24 w-24 opacity-95' />
                    <span className='absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-foreground'>{vehicle.category}</span>
                  </div>
                  <div className='p-5'>
                    <h3 className='font-display text-xl font-black'>{vehicle.name}</h3>
                    <div className='mt-3 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground'>
                      <MiniSpec icon={User} text={`${vehicle.seats} places`} />
                      <MiniSpec icon={Settings2} text={vehicle.transmission} />
                      <MiniSpec icon={Car} text={vehicle.luggage} />
                    </div>
                    <div className='mt-4 flex flex-wrap gap-2'>
                      {vehicle.tags.map((tag) => (
                        <span key={tag} className='rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground'>{tag}</span>
                      ))}
                    </div>
                    <div className='mt-5 flex items-end justify-between gap-3'>
                      <div>
                        <div className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>Tarif indicatif</div>
                        <div className='font-display text-3xl font-black text-ocean'>{price ? `${price}€` : 'Sur devis'}</div>
                      </div>
                      <button
                        type='button'
                        onClick={() => {
                          setSelectedVehicle(vehicle.name);
                          document.querySelector('#checkout')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className='inline-flex h-11 items-center gap-1 rounded-lg bg-coral px-4 text-sm font-black text-white'
                      >
                        Choisir <ChevronRight className='h-4 w-4' />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id='checkout' className='bg-muted/40 px-4 py-20 sm:px-6 lg:py-24'>
        <form onSubmit={submitBooking} className='mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start'>
          <div className={`${card} p-5 sm:p-7`}>
            <SectionTitle eyebrow='Finaliser' title='Informations de réservation' />
            <div className='mt-6 grid gap-4 md:grid-cols-3'>
              <TextField label='Conducteur *' value={driver.name} onChange={(value) => updateDriver('name', value)} required />
              <TextField label='Téléphone *' type='tel' value={driver.phone} onChange={(value) => updateDriver('phone', value)} required />
              <TextField label='Email' type='email' value={driver.email} onChange={(value) => updateDriver('email', value)} />
            </div>
            <div className='mt-5 grid gap-4 md:grid-cols-2'>
              <SelectField label='Paiement' value={payment} values={['Paiement à la récupération', 'Acompte à la confirmation', 'Paiement en ligne sécurisé']} onChange={setPayment} icon={CreditCard} />
              <SelectField label='Confirmation' value={confirmation} values={['Confirmation WhatsApp', 'Confirmation téléphone', 'Confirmation email']} onChange={setConfirmation} icon={MessageCircle} />
            </div>
            <div className='mt-6'>
              <div className='text-sm font-bold'>Options</div>
              <div className='mt-3 grid gap-3 sm:grid-cols-2'>
                {extras.map((extra) => (
                  <label key={extra.key} className='flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background p-4 text-sm transition hover:border-ocean'>
                    <input
                      type='checkbox'
                      checked={selectedExtras[extra.key]}
                      onChange={(event) => setSelectedExtras((current) => ({ ...current, [extra.key]: event.target.checked }))}
                      className='mt-1'
                    />
                    <span>
                      <strong>{extra.label}</strong>
                      <span className='block text-xs text-muted-foreground'>{extra.desc}{extra.price ? ` · +${extra.price}€` : ' · inclus'}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <label className='mt-5 block text-sm font-bold'>
              Informations complémentaires
              <textarea className={area} value={driver.note} onChange={(event) => updateDriver('note', event.target.value)} placeholder='Numéro de vol, adresse de livraison, besoin particulier...' />
            </label>
          </div>

          <aside className={`${card} sticky top-24 overflow-hidden`}>
            <div className='bg-ocean px-5 py-5 text-white sm:px-7'>
              <div className='text-xs font-bold uppercase tracking-widest text-white/75'>Votre réservation</div>
              <h3 className='mt-1 font-display text-2xl font-black'>{selectedCar.name}</h3>
            </div>
            <div className='p-5 sm:p-7'>
              <div className='grid gap-3 text-sm'>
                <SummaryLine label='Départ' value={`${search.pickup} · ${search.pickupDate || 'date'} ${search.pickupTime}`} />
                <SummaryLine label='Retour' value={`${search.returnPlace} · ${search.returnDate || 'date'} ${search.returnTime}`} />
                <SummaryLine label='Durée' value={`${durationLabel} · ${resultLabel}`} />
                <SummaryLine label='Options' value={`${extras.filter((extra) => selectedExtras[extra.key]).length} sélectionnée(s)`} />
              </div>
              <div className='mt-6 rounded-2xl bg-muted p-4'>
                <SummaryLine label='Véhicule' value={vehicleTotal ? `${vehicleTotal}€` : 'à confirmer'} strong />
                <SummaryLine label='Options' value={`${extraTotal}€`} strong />
                <div className='mt-4 flex items-end justify-between border-t border-border pt-4'>
                  <span className='text-sm font-bold text-muted-foreground'>Total indicatif</span>
                  <span className='font-display text-4xl font-black text-coral'>{total ? `${total}€` : '—'}</span>
                </div>
              </div>
              <button type='submit' className='mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-coral text-base font-black text-white shadow-glow'>
                <Send className='h-5 w-5' />Préparer la réservation
              </button>
              <p className='mt-3 text-xs leading-5 text-muted-foreground'>Le tarif reste indicatif jusqu’à confirmation des disponibilités, caution et conditions de départ.</p>
            </div>
          </aside>
        </form>
      </section>

      <section id='included' className='px-4 py-20 sm:px-6 lg:py-24'>
        <div className='mx-auto max-w-7xl'>
          <SectionTitle eyebrow='Inclus' title='Une location claire avant le départ' />
          <div className='mt-10 grid gap-5 md:grid-cols-3'>
            {included.map((item) => (
              <div key={item.title} className={`${card} p-6`}>
                <item.icon className='h-8 w-8 text-ocean' />
                <h3 className='mt-4 font-display text-xl font-black'>{item.title}</h3>
                <p className='mt-2 text-sm leading-6 text-muted-foreground'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id='plates' className='bg-sea px-4 py-20 text-white sm:px-6 lg:py-24'>
        <div className='mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center'>
          <div>
            <div className='inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-black uppercase tracking-wider'>Service additionnel</div>
            <h2 className='mt-4 font-display text-3xl font-black sm:text-5xl'>Plaques 4D & 3D Topaze</h2>
            <p className='mt-4 max-w-lg text-white/85'>Un service complémentaire pour les clients Coco Loc : plaques homologuées, pose soignée, rendez-vous simple.</p>
            <img src={plaqueImg} alt='Plaque 4D' className='mt-7 w-full max-w-md rounded-2xl border-4 border-white/20 shadow-glow' />
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            {plaques.map((plaque) => (
              <div key={plaque.name} className='rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md'>
                <div className='text-sm font-bold text-white/75'>{plaque.badge || 'Sur rendez-vous'}</div>
                <h3 className='mt-2 font-display text-xl font-black'>{plaque.name}</h3>
                <div className='mt-4 font-display text-5xl font-black'>{plaque.price}€</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className='border-t border-border bg-card px-4 py-10 sm:px-6'>
        <div className='mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center'>
          <div className='flex items-center gap-2'>
            <span className='grid h-10 w-10 place-items-center rounded-lg bg-ocean text-white'><Sun className='h-5 w-5' /></span>
            <span><strong className='block font-display'>Coco Loc 971</strong><span className='text-xs text-muted-foreground'>Location voiture · Guadeloupe</span></span>
          </div>
          <div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
            <a href='tel:0691278794'>06 91 27 87 94</a>
            <a href='mailto:cocoloc97-1@outlook.fr'>cocoloc97-1@outlook.fr</a>
            <a href='https://instagram.com/coco.loc971'>@coco.loc971</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className='max-w-2xl'>
      <div className='inline-flex rounded-full bg-coral/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-coral'>{eyebrow}</div>
      <h2 className='mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl'>{title}</h2>
    </div>
  );
}

function Trust({ icon: Icon, title }: { icon: typeof Gauge; title: string }) {
  return <div className='flex items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3 text-sm font-bold shadow-soft'><Icon className='h-5 w-5 text-ocean' />{title}</div>;
}

function SelectField({ label, value, values, onChange, icon: Icon }: { label: string; value: string; values: string[]; onChange: (value: string) => void; icon?: typeof Car }) {
  return (
    <label className='block text-sm font-bold'>
      {label}
      <span className='relative block'>
        {Icon && <Icon className='pointer-events-none absolute left-3 top-[calc(50%+3px)] h-4 w-4 -translate-y-1/2 text-muted-foreground' />}
        <select className={`${field} ${Icon ? 'pl-9' : ''}`} value={value} onChange={(event) => onChange(event.target.value)}>
          {values.map((item) => <option key={item}>{item}</option>)}
        </select>
      </span>
    </label>
  );
}

function TextField({ label, value, onChange, type = 'text', placeholder, required }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; required?: boolean }) {
  return <label className='block text-sm font-bold'>{label}<input className={field} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required={required} /></label>;
}

function DateTime({ label, date, time, onDate, onTime }: { label: string; date: string; time: string; onDate: (value: string) => void; onTime: (value: string) => void }) {
  return (
    <div>
      <div className='text-sm font-bold'>{label}</div>
      <div className='mt-1.5 grid gap-2 sm:grid-cols-[1fr_112px]'>
        <span className='relative'><CalendarDays className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' /><input type='date' className={`${field} mt-0 pl-9`} value={date} onChange={(event) => onDate(event.target.value)} /></span>
        <span className='relative'><Clock className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' /><input type='time' className={`${field} mt-0 pl-9`} value={time} onChange={(event) => onTime(event.target.value)} /></span>
      </div>
    </div>
  );
}

function MiniSpec({ icon: Icon, text }: { icon: typeof User; text: string }) {
  return <div className='rounded-xl bg-muted px-2 py-2'><Icon className='mx-auto mb-1 h-4 w-4 text-ocean' />{text}</div>;
}

function SummaryLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className='flex justify-between gap-4 py-1'><span className='text-muted-foreground'>{label}</span><span className={strong ? 'font-black text-foreground' : 'font-semibold text-foreground'}>{value}</span></div>;
}
