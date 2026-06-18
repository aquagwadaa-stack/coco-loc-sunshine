import { createFileRoute } from '@tanstack/react-router';
import { type FormEvent, useState } from 'react';
import {
  BadgeCheck,
  CalendarDays,
  Car,
  CarFront,
  Check,
  ClipboardCheck,
  Clock,
  CreditCard,
  Gauge,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
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
      { title: 'Coco Loc 971 — Location voiture & plaques 4D/3D en Guadeloupe' },
      {
        name: 'description',
        content:
          'Location de voitures en Guadeloupe, packs dépannage et pose de plaques 4D / 3D Topaze. Demande rapide ou réservation complète par WhatsApp.',
      },
      { property: 'og:title', content: 'Coco Loc 971 — Le soleil, les clés, partez !' },
      {
        property: 'og:description',
        content:
          'Voitures prêtes à partir, tarifs clairs, kilométrage illimité, livraison pratique et plaques homologuées.',
      },
      { property: 'og:image', content: heroImg },
    ],
  }),
  component: Home,
});

const cars = [
  { name: 'Fiat Panda / Twingo 3', tier: 'Économique', seats: 4, icon: Car, prices: [60, 70, 130, 280] },
  { name: 'Clio 4', tier: 'Compacte', seats: 5, icon: CarFront, prices: [75, 85, 150, 300] },
  { name: 'Clio 5 Automatique', tier: 'Confort auto', seats: 5, icon: Settings2, prices: [85, 95, 170, 330] },
  { name: 'Captur', tier: 'SUV familial', seats: 5, icon: BadgeCheck, prices: [95, 105, 190, 360] },
];

const packs = [
  { name: 'Week-end', sub: 'Vendredi à dimanche', days: 2, color: 'bg-sun' },
  { name: '3 jours', sub: 'Séjour court', days: 3, color: 'bg-palm' },
  { name: '7 jours', sub: 'La formule la plus demandée', days: 7, color: 'bg-ocean', popular: true },
  { name: '14 jours', sub: 'Vacances longues', days: 14, color: 'bg-coral' },
];

const plaques = [
  { name: 'Pack 2 plaques 4D', price: 55, badge: 'Le + demandé' },
  { name: 'Pack 2 plaques 3D Topaze', price: 65, badge: 'Premium' },
  { name: 'Plaque 4D simple', price: 29 },
  { name: 'Plaque 3D Topaze simple', price: 35 },
];

const advantages = [
  { icon: Sparkles, title: 'Voitures récentes', desc: 'Flotte propre, entretenue et prête au départ.' },
  { icon: ShieldCheck, title: 'Assurance incluse', desc: 'Des formules claires pour rouler léger.' },
  { icon: Gauge, title: 'Kilométrage illimité', desc: 'Profitez de toute la Guadeloupe sans compter.' },
  { icon: Truck, title: 'Livraison pratique', desc: 'Aéroport, hôtel, domicile ou point de rendez-vous.' },
];

const options = [
  { key: 'airportWelcome', label: 'Accueil aéroport', desc: 'Rendez-vous à l’arrivée', price: 0 },
  { key: 'homeDelivery', label: 'Livraison dédiée', desc: 'Adresse à confirmer', price: 10 },
  { key: 'childSeat', label: 'Siège enfant', desc: 'Selon disponibilité', price: 5 },
  { key: 'extraDriver', label: 'Conducteur additionnel', desc: 'Pièce d’identité demandée', price: 10 },
  { key: 'plaqueService', label: 'Ajouter une demande plaques', desc: '4D ou 3D Topaze', price: 0 },
];

const field =
  'mt-1.5 h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-coral focus:ring-2 focus:ring-coral/20';
const area =
  'mt-1.5 min-h-28 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-coral focus:ring-2 focus:ring-coral/20';
const card = 'rounded-3xl border border-border bg-card shadow-soft';

function getDays(start: string, end: string) {
  if (!start || !end) return 0;
  const diff = Math.ceil((new Date(`${end}T00:00:00`).getTime() - new Date(`${start}T00:00:00`).getTime()) / 86400000);
  return Number.isFinite(diff) && diff > 0 ? diff : 1;
}

function getPack(days: number) {
  if (!days) return null;
  if (days <= 2) return { ...packs[0], index: 0 };
  if (days <= 3) return { ...packs[1], index: 1 };
  if (days <= 7) return { ...packs[2], index: 2 };
  if (days <= 14) return { ...packs[3], index: 3 };
  return null;
}

function sendWhatsApp(lines: string[]) {
  window.open(`https://wa.me/590691278794?text=${encodeURIComponent(lines.join(String.fromCharCode(10)))}`, '_blank');
}

function Home() {
  const [mode, setMode] = useState<'quick' | 'complete'>('quick');
  const [quick, setQuick] = useState({ name: '', phone: '', service: '', date: '', message: '' });
  const [booking, setBooking] = useState({
    vehicle: 'Clio 4',
    payment: 'Paiement à la récupération',
    pickupDate: '',
    pickupTime: '09:00',
    returnDate: '',
    returnTime: '09:00',
    pickupLocation: 'Aéroport Pôle Caraïbes',
    returnLocation: 'Même lieu',
    driverName: '',
    driverPhone: '',
    driverEmail: '',
    confirmation: 'Confirmation WhatsApp',
    note: '',
  });
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({
    airportWelcome: true,
    homeDelivery: false,
    childSeat: false,
    extraDriver: false,
    plaqueService: false,
  });

  const selectedCar = cars.find((car) => car.name === booking.vehicle) ?? cars[1];
  const days = getDays(booking.pickupDate, booking.returnDate);
  const pack = getPack(days);
  const optionsTotal = options.reduce((sum, option) => sum + (selectedOptions[option.key] ? option.price : 0), 0);
  const total = pack ? selectedCar.prices[pack.index] + optionsTotal : 0;
  const packLabel = pack ? `Pack ${pack.name}` : days > 14 ? 'Long séjour sur mesure' : 'Pack calculé après dates';
  const durationLabel = days ? `${days} jour${days > 1 ? 's' : ''}` : 'dates à choisir';
  const selectedCount = options.filter((option) => selectedOptions[option.key]).length;

  const setQuickField = (key: keyof typeof quick, value: string) => setQuick((current) => ({ ...current, [key]: value }));
  const setBookingField = (key: keyof typeof booking, value: string) => setBooking((current) => ({ ...current, [key]: value }));

  function submitQuick(event: FormEvent) {
    event.preventDefault();
    if (!quick.name || !quick.phone || !quick.service) return;
    sendWhatsApp([
      'Bonjour Coco Loc 971,',
      '',
      'Je souhaite faire une demande rapide.',
      `Nom : ${quick.name}`,
      `Téléphone : ${quick.phone}`,
      `Service : ${quick.service}`,
      `Date souhaitée : ${quick.date || 'À préciser'}`,
      `Message : ${quick.message || 'Aucun message ajouté'}`,
    ]);
  }

  function submitBooking(event: FormEvent) {
    event.preventDefault();
    if (!booking.driverName || !booking.driverPhone || !booking.pickupDate || !booking.returnDate) return;
    const optionList = options
      .filter((option) => selectedOptions[option.key])
      .map((option) => `${option.label}${option.price ? ` (+${option.price}€)` : ''}`)
      .join(', ');
    sendWhatsApp([
      'Bonjour Coco Loc 971,',
      '',
      'Je souhaite réserver un véhicule.',
      `Conducteur : ${booking.driverName}`,
      `Téléphone : ${booking.driverPhone}`,
      `Email : ${booking.driverEmail || 'Non renseigné'}`,
      `Véhicule : ${booking.vehicle}`,
      `Départ : ${booking.pickupDate} à ${booking.pickupTime}`,
      `Retour : ${booking.returnDate} à ${booking.returnTime}`,
      `Lieu de récupération : ${booking.pickupLocation}`,
      `Lieu de retour : ${booking.returnLocation}`,
      `Options : ${optionList || 'Aucune option'}`,
      `Paiement : ${booking.payment}`,
      `Confirmation : ${booking.confirmation}`,
      `Tarif indicatif : ${pack ? `${pack.name}, ${total}€` : 'à confirmer'}`,
      `Note : ${booking.note || 'Aucune note ajoutée'}`,
    ]);
  }

  return (
    <div className='min-h-screen bg-background'>
      <header className='fixed top-0 z-50 w-full border-b border-border/50 bg-background/75 backdrop-blur-md'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6'>
          <a href='#top' className='flex items-center gap-2'>
            <span className='grid h-10 w-10 place-items-center rounded-full bg-tropical text-white shadow-soft'>
              <Sun className='h-5 w-5' />
            </span>
            <span className='leading-tight'>
              <span className='block font-display text-lg font-bold'>Coco Loc</span>
              <span className='block text-[10px] tracking-widest text-muted-foreground'>GUADELOUPE · 971</span>
            </span>
          </a>
          <nav className='hidden gap-6 text-sm font-medium md:flex'>
            <a href='#location' className='hover:text-primary'>Location</a>
            <a href='#plaques' className='hover:text-primary'>Plaques</a>
            <a href='#avantages' className='hover:text-primary'>Avantages</a>
            <a href='#reservation' className='hover:text-primary'>Réserver</a>
          </nav>
          <a href='tel:0691278794' className='inline-flex h-10 items-center gap-2 rounded-xl bg-coral px-4 text-sm font-bold text-white shadow-soft'>
            <Phone className='h-4 w-4' />06 91 27 87 94
          </a>
        </div>
      </header>

      <section id='top' className='relative flex min-h-[84vh] items-center overflow-hidden pt-20'>
        <img src={heroImg} alt='Plage tropicale en Guadeloupe avec voiture' className='absolute inset-0 h-full w-full object-cover object-center' />
        <div className='absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent' />
        <div className='relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-12'>
          <div className='max-w-2xl'>
            <div className='inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-semibold shadow-soft backdrop-blur'>
              <span className='h-2 w-2 rounded-full bg-palm' />Location voiture · plaques 4D/3D · Guadeloupe 971
            </div>
            <h1 className='mt-5 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl'>
              Coco <span className='text-coral'>Loc</span>
              <span className='mt-3 block text-2xl font-bold italic text-ocean sm:text-4xl lg:text-5xl'>Le soleil, les clés, partez !</span>
            </h1>
            <p className='mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg'>
              Louez une voiture prête à partir, ajoutez vos plaques homologuées si besoin, et confirmez tout simplement par WhatsApp.
            </p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <a href='#reservation' className='inline-flex h-13 items-center rounded-xl bg-coral px-7 text-base font-bold text-white shadow-glow'>Faire une demande →</a>
              <a href='https://instagram.com/coco.loc971' target='_blank' rel='noreferrer' className='inline-flex h-13 items-center gap-2 rounded-xl border-2 border-border bg-card px-7 text-base font-bold shadow-soft'>
                <Instagram className='h-5 w-5' />@coco.loc971
              </a>
            </div>
            <div className='mt-7 grid max-w-md grid-cols-3 gap-4'>
              {[
                ['50€', 'dépannage local'],
                ['4 modèles', 'selon besoin'],
                ['WhatsApp', 'confirmation rapide'],
              ].map(([value, label]) => (
                <div key={label} className='rounded-2xl border border-border bg-card/75 px-3 py-3 text-center shadow-soft backdrop-blur'>
                  <div className='text-sm font-bold text-ocean'>{value}</div>
                  <div className='text-[11px] text-muted-foreground'>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id='location' className='px-4 pb-20 pt-12 sm:px-6 lg:pb-24 lg:pt-14'>
        <div className='mx-auto max-w-7xl'>
          <SectionTitle eyebrow='Notre flotte' title='Une voiture adaptée à chaque trajet' />
          <div className='mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
            {cars.map((car, index) => (
              <div key={car.name} className={`${card} relative overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-glow`}>
                <div className='absolute -right-6 -top-6 h-24 w-24 rounded-full bg-tropical opacity-10' />
                <span className='grid h-14 w-14 place-items-center rounded-2xl bg-tropical text-white shadow-soft'>
                  <car.icon className='h-7 w-7' />
                </span>
                <div className='mt-4 text-xs font-bold uppercase tracking-wider text-coral'>Catégorie {index + 1}</div>
                <h3 className='mt-1 font-display text-xl font-bold'>{car.name}</h3>
                <p className='text-sm text-muted-foreground'>{car.tier}</p>
                <div className='mt-4 flex items-center gap-3 text-sm text-muted-foreground'>
                  <User className='h-4 w-4 text-ocean' />{car.seats} places
                </div>
              </div>
            ))}
          </div>
          <div className='mt-16'>
            <h3 className='font-display text-2xl font-bold sm:text-3xl'>Tarifs location</h3>
            <p className='mt-2 max-w-2xl text-muted-foreground'>Des packs lisibles pour comparer vite : Panda/Twingo, Clio 4, Clio 5 automatique et Captur.</p>
            <div className='mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
              {packs.map((pack, packIndex) => (
                <div key={pack.name} className={`${card} relative overflow-hidden border-2 p-6 ${pack.popular ? 'border-coral' : ''}`}>
                  {pack.popular && <span className='absolute right-4 top-4 rounded-full bg-coral px-3 py-1 text-[10px] font-bold uppercase text-white'>Populaire</span>}
                  <span className={`block h-2 w-12 rounded-full ${pack.color}`} />
                  <h4 className='mt-3 font-display text-[1.65rem] font-black leading-tight'>Pack {pack.name}</h4>
                  <p className='text-sm text-muted-foreground'>{pack.sub}</p>
                  <ul className='mt-5 space-y-2'>
                    {cars.map((car) => (
                      <li key={car.name} className='flex items-center justify-between rounded-xl bg-muted px-3 py-2 text-sm'>
                        <span className='text-muted-foreground'>{car.name.replace('Fiat ', '').replace(' / Twingo 3', '/Twingo')}</span>
                        <span className='font-bold text-ocean'>{car.prices[packIndex]}€</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className='mt-6 rounded-3xl border-2 border-dashed border-palm bg-palm/5 p-6 sm:p-8'>
              <div className='flex flex-wrap items-center justify-between gap-4'>
                <div>
                  <div className='text-xs font-bold uppercase tracking-widest text-palm'>Spécial locaux 971</div>
                  <h4 className='mt-1 font-display text-2xl font-bold'>Pack dépannage</h4>
                  <p className='text-sm text-muted-foreground'>Une solution courte durée quand il faut repartir vite.</p>
                </div>
                <div className='flex gap-3'>
                  <Price label='2 jours' value='50€' />
                  <Price label='3 jours' value='70€' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='plaques' className='relative overflow-hidden bg-sea px-4 py-20 text-white sm:px-6 lg:py-24'>
        <div className='relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center'>
          <div>
            <div className='inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur'>
              <Sparkles className='h-3.5 w-3.5' />Vente & pose
            </div>
            <h2 className='mt-4 font-display text-3xl font-black sm:text-5xl'>Plaques 4D & 3D Topaze</h2>
            <p className='mt-4 max-w-lg text-white/85'>Plaques homologuées, rendu premium et pose soignée sur rendez-vous. Une offre simple, lisible et prête à commander.</p>
            <img src={plaqueImg} alt='Plaque d’immatriculation 4D' className='mt-8 w-full max-w-md rounded-2xl border-4 border-white/20 object-cover shadow-glow' />
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            {plaques.map((plaque) => (
              <div key={plaque.name} className='relative rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md'>
                {plaque.badge && <span className='absolute -top-2 right-4 rounded-full bg-sun px-3 py-1 text-[10px] font-bold uppercase text-foreground'>{plaque.badge}</span>}
                <h3 className='font-display text-xl font-bold'>{plaque.name}</h3>
                <div className='mt-4 flex items-baseline gap-1'>
                  <span className='font-display text-5xl font-black'>{plaque.price}</span><span className='text-2xl font-bold'>€</span>
                </div>
                <a href='#reservation' className='mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-coral font-bold text-white'>Commander</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id='avantages' className='px-4 py-20 sm:px-6 lg:py-24'>
        <div className='mx-auto max-w-7xl'>
          <SectionTitle eyebrow='Pourquoi Coco Loc' title='Un service simple à comprendre' />
          <div className='mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
            {advantages.map((advantage) => (
              <div key={advantage.title} className={`${card} p-6 transition hover:-translate-y-1 hover:shadow-glow`}>
                <span className='grid h-12 w-12 place-items-center rounded-2xl bg-tropical text-white shadow-soft'><advantage.icon className='h-6 w-6' /></span>
                <h3 className='mt-4 font-display text-lg font-bold'>{advantage.title}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>{advantage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id='reservation' className='bg-muted/40 px-4 py-20 sm:px-6 lg:py-24'>
        <div className='mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.35fr] lg:items-start'>
          <div>
            <SectionTitle eyebrow='Réservation' title='Deux parcours, un seul contact' />
            <p className='mt-4 max-w-md text-muted-foreground'>Le client peut aller vite avec une demande simple, ou remplir une réservation complète avec véhicule, créneau, options, paiement et confirmation.</p>
            <div className='mt-8 grid gap-4'>
              {[
                { icon: MessageCircle, title: 'Demande rapide', text: 'Nom, téléphone, service et message : idéal pour une disponibilité ou un dépannage.' },
                { icon: ClipboardCheck, title: 'Réservation complète', text: 'Dates, véhicule, lieux, options et coordonnées conducteur dans un parcours clair.' },
                { icon: CreditCard, title: 'Paiement adaptable', text: 'Retrait, acompte ou paiement en ligne selon l’organisation choisie.' },
              ].map((item) => (
                <div key={item.title} className={`${card} p-5`}>
                  <div className='flex items-start gap-4'>
                    <span className='grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sunset text-white'><item.icon className='h-5 w-5' /></span>
                    <span><h3 className='font-display text-lg font-bold'>{item.title}</h3><p className='text-sm text-muted-foreground'>{item.text}</p></span>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-8 hidden space-y-4 lg:block'>
              {[
                [Phone, '06 91 27 87 94', 'tel:0691278794'],
                [Mail, 'cocoloc97-1@outlook.fr', 'mailto:cocoloc97-1@outlook.fr'],
                [Instagram, '@coco.loc971', 'https://instagram.com/coco.loc971'],
                [MapPin, 'Guadeloupe · 971', '#'],
              ].map(([Icon, label, href]) => (
                <a key={String(label)} href={String(href)} className={`${card} flex items-center gap-4 p-4 font-semibold`}>
                  <span className='grid h-11 w-11 place-items-center rounded-xl bg-tropical text-white'><Icon className='h-5 w-5' /></span>{String(label)}
                </a>
              ))}
            </div>
          </div>

          <div className={`${card} self-start p-4 shadow-glow sm:p-6`}>
            <div className='grid rounded-2xl bg-muted p-1 text-xs font-bold sm:text-sm'>
              <div className='grid grid-cols-2'>
                <button type='button' onClick={() => setMode('quick')} className={`rounded-xl py-3 ${mode === 'quick' ? 'bg-card shadow-soft' : ''}`}>Demande rapide</button>
                <button type='button' onClick={() => setMode('complete')} className={`rounded-xl py-3 ${mode === 'complete' ? 'bg-card shadow-soft' : ''}`}>Réservation complète</button>
              </div>
            </div>

            {mode === 'quick' ? (
              <form onSubmit={submitQuick} className='mt-6 grid gap-4'>
                <Notice>Demande directe — le message est préparé pour WhatsApp avec les informations essentielles.</Notice>
                <TextField label='Nom complet *' value={quick.name} onChange={(value) => setQuickField('name', value)} required />
                <TextField label='Téléphone *' type='tel' value={quick.phone} onChange={(value) => setQuickField('phone', value)} required />
                <label className='text-sm font-medium'>Service *<select className={field} value={quick.service} onChange={(event) => setQuickField('service', event.target.value)} required>
                  <option value=''>Choisissez un service</option>
                  {['Location Panda/Twingo', 'Location Clio 4', 'Location Clio 5 auto', 'Location Captur', 'Pack dépannage local', 'Plaques 4D', 'Plaques 3D Topaze'].map((service) => <option key={service}>{service}</option>)}
                </select></label>
                <TextField label='Date souhaitée' type='date' value={quick.date} onChange={(value) => setQuickField('date', value)} />
                <label className='text-sm font-medium'>Message<textarea className={area} value={quick.message} onChange={(event) => setQuickField('message', event.target.value)} placeholder='Exemple : Clio 4 pour 7 jours, récupération à l’aéroport.' /></label>
                <SubmitButton>Préparer ma demande</SubmitButton>
              </form>
            ) : (
              <form onSubmit={submitBooking} className='mt-6 grid gap-6'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <SelectField label='Véhicule *' value={booking.vehicle} onChange={(value) => setBookingField('vehicle', value)} values={cars.map((car) => car.name)} />
                  <SelectField label='Mode de paiement' value={booking.payment} onChange={(value) => setBookingField('payment', value)} values={['Paiement à la récupération', 'Acompte à la confirmation', 'Paiement en ligne sécurisé']} />
                </div>
                <div className='grid gap-4 md:grid-cols-2'>
                  <DateTime label='Départ *' date={booking.pickupDate} time={booking.pickupTime} onDate={(value) => setBookingField('pickupDate', value)} onTime={(value) => setBookingField('pickupTime', value)} />
                  <DateTime label='Retour *' date={booking.returnDate} time={booking.returnTime} onDate={(value) => setBookingField('returnDate', value)} onTime={(value) => setBookingField('returnTime', value)} />
                </div>
                <div className='grid gap-4 md:grid-cols-2'>
                  <SelectField label='Lieu de récupération' value={booking.pickupLocation} onChange={(value) => setBookingField('pickupLocation', value)} values={['Aéroport Pôle Caraïbes', 'Pointe-à-Pitre', 'Baie-Mahault', 'Le Gosier', 'Sainte-Anne', 'Autre lieu à préciser']} />
                  <SelectField label='Lieu de retour' value={booking.returnLocation} onChange={(value) => setBookingField('returnLocation', value)} values={['Même lieu', 'Aéroport Pôle Caraïbes', 'Pointe-à-Pitre', 'Autre lieu à préciser']} />
                </div>
                <div>
                  <div className='text-sm font-medium'>Options</div>
                  <div className='mt-2 grid gap-3 sm:grid-cols-2'>
                    {options.map((option) => (
                      <label key={option.key} className='flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-muted/40 p-4 text-sm'>
                        <input type='checkbox' checked={selectedOptions[option.key]} onChange={(event) => setSelectedOptions((current) => ({ ...current, [option.key]: event.target.checked }))} className='mt-1' />
                        <span><strong>{option.label}</strong><span className='block text-xs text-muted-foreground'>{option.desc}{option.price ? ` · +${option.price}€` : ' · inclus'}</span></span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className='grid gap-4 md:grid-cols-3'>
                  <TextField label='Conducteur *' value={booking.driverName} onChange={(value) => setBookingField('driverName', value)} required />
                  <TextField label='Téléphone *' type='tel' value={booking.driverPhone} onChange={(value) => setBookingField('driverPhone', value)} required />
                  <TextField label='Email' type='email' value={booking.driverEmail} onChange={(value) => setBookingField('driverEmail', value)} />
                </div>
                <div className='grid gap-4 md:grid-cols-2'>
                  <SelectField label='Mode de confirmation' value={booking.confirmation} onChange={(value) => setBookingField('confirmation', value)} values={['Confirmation WhatsApp', 'Confirmation téléphone', 'Confirmation email']} />
                  <TextField label='Informations complémentaires' value={booking.note} onChange={(value) => setBookingField('note', value)} placeholder='Numéro de vol, adresse, besoin précis...' />
                </div>
                <div className='rounded-3xl border border-coral/30 bg-coral/5 p-5'>
                  <div className='grid gap-4 md:grid-cols-[1fr_auto] md:items-center'>
                    <div>
                      <div className='flex items-center gap-2 text-sm font-bold text-coral'><ClipboardCheck className='h-4 w-4' />Résumé de réservation</div>
                      <p className='mt-2 text-sm text-muted-foreground'>{booking.vehicle} · {packLabel} · {durationLabel}</p>
                      <p className='mt-1 text-xs text-muted-foreground'>{selectedCount} option(s) sélectionnée(s) · {booking.payment} · {booking.confirmation}</p>
                    </div>
                    <div className='rounded-2xl border border-border bg-card px-5 py-4 text-center shadow-soft'>
                      <div className='text-[10px] uppercase tracking-widest text-muted-foreground'>Tarif indicatif</div>
                      <div className='font-display text-3xl font-black text-coral'>{total ? `${total}€` : '—'}</div>
                    </div>
                  </div>
                </div>
                <SubmitButton>Préparer la réservation</SubmitButton>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className='border-t border-border bg-card'>
        <div className='mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3'>
          <div><Logo /><p className='mt-4 max-w-xs text-sm text-muted-foreground'>Location de voitures & plaques d’immatriculation 4D / 3D Topaze. Le soleil, les clés, partez !</p></div>
          <div><h4 className='font-display font-bold'>Contact</h4><ul className='mt-3 space-y-2 text-sm text-muted-foreground'><li>06 91 27 87 94</li><li>cocoloc97-1@outlook.fr</li><li>@coco.loc971</li></ul></div>
          <div><h4 className='font-display font-bold'>Services</h4><ul className='mt-3 space-y-2 text-sm text-muted-foreground'><li>Location voitures</li><li>Plaques 4D & 3D</li><li>Réserver</li></ul></div>
        </div>
        <div className='border-t border-border py-5 text-center text-xs text-muted-foreground'>© {new Date().getFullYear()} Coco Loc 971 · Guadeloupe</div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className='max-w-2xl'><div className='inline-flex rounded-full bg-coral/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-coral'>{eyebrow}</div><h2 className='mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl'>{title}</h2></div>;
}

function Price({ label, value }: { label: string; value: string }) {
  return <div className='rounded-2xl border border-border bg-card px-5 py-3 text-center shadow-soft'><div className='text-[10px] uppercase tracking-wider text-muted-foreground'>{label}</div><div className='font-display text-2xl font-black text-palm'>{value}</div></div>;
}

function Notice({ children }: { children: string }) {
  return <div className='rounded-2xl border-l-4 border-palm bg-palm/5 p-4 text-sm'><div className='flex gap-3'><Check className='mt-0.5 h-5 w-5 text-palm' />{children}</div></div>;
}

function TextField({ label, value, onChange, type = 'text', placeholder, required }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; required?: boolean }) {
  return <label className='text-sm font-medium'>{label}<input className={field} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required={required} /></label>;
}

function SelectField({ label, value, values, onChange }: { label: string; value: string; values: string[]; onChange: (value: string) => void }) {
  return <label className='text-sm font-medium'>{label}<select className={field} value={value} onChange={(event) => onChange(event.target.value)}>{values.map((item) => <option key={item}>{item}</option>)}</select></label>;
}

function DateTime({ label, date, time, onDate, onTime }: { label: string; date: string; time: string; onDate: (value: string) => void; onTime: (value: string) => void }) {
  return <div><div className='text-sm font-medium'>{label}</div><div className='mt-1.5 grid gap-2 sm:grid-cols-[1fr_auto]'><span className='relative'><CalendarDays className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' /><input type='date' className={`${field} mt-0 pl-10`} value={date} onChange={(event) => onDate(event.target.value)} required /></span><span className='relative sm:w-28'><Clock className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' /><input type='time' className={`${field} mt-0 pl-10`} value={time} onChange={(event) => onTime(event.target.value)} /></span></div></div>;
}

function SubmitButton({ children }: { children: string }) {
  return <button type='submit' className='inline-flex h-14 items-center justify-center rounded-xl bg-coral text-base font-bold text-white shadow-glow'><Send className='mr-2 h-5 w-5' />{children}</button>;
}

function Logo() {
  return <div className='flex items-center gap-2'><span className='grid h-10 w-10 place-items-center rounded-full bg-tropical text-white'><Sun className='h-5 w-5' /></span><span><span className='block font-display text-lg font-bold'>Coco Loc 971</span><span className='block text-[10px] tracking-widest text-muted-foreground'>GUADELOUPE</span></span></div>;
}
