import { createFileRoute } from '@tanstack/react-router';
import { type FormEvent, useState } from 'react';
import {
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  Clock,
  Gauge,
  KeyRound,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  Send,
  ShieldCheck,
  User,
} from 'lucide-react';
import heroImg from '@/assets/hero-tropical.jpg';
import plaqueImg from '@/assets/plaque-4d.jpg';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Coco Loc 971 — Location de voiture en Guadeloupe' },
      {
        name: 'description',
        content:
          'Coco Loc 971, location de voiture en Guadeloupe : choisissez vos dates, votre voiture et envoyez votre demande de réservation.',
      },
      { property: 'og:title', content: 'Coco Loc 971 — Location de voiture en Guadeloupe' },
      {
        property: 'og:description',
        content:
          'Une flotte simple, des tarifs lisibles et une réservation directe avec Coco Loc 971.',
      },
      { property: 'og:image', content: heroImg },
    ],
  }),
  component: Home,
});

const locations = [
  'Aéroport Pôle Caraïbes',
  'Pointe-à-Pitre',
  'Baie-Mahault',
  'Le Gosier',
  'Sainte-Anne',
  'Livraison à domicile',
];

const vehicles = [
  {
    name: 'Fiat Panda',
    range: 'Économique',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/2012%20Fiat%20Panda%20III.JPG?width=1200',
    alt: 'Fiat Panda',
    seats: '4 places',
    gearbox: 'Manuelle',
    luggage: '2 bagages',
    price: 60,
    weekly: 130,
  },
  {
    name: 'Clio 4',
    range: 'Compacte',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Renault%20Clio-IV%20Black.JPG?width=1200',
    alt: 'Renault Clio 4',
    seats: '5 places',
    gearbox: 'Manuelle',
    luggage: '3 bagages',
    price: 75,
    weekly: 150,
  },
  {
    name: 'Clio 5 automatique',
    range: 'Automatique',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Renault%20Clio%20V%20%2848220140297%29.jpg?width=1200',
    alt: 'Renault Clio 5',
    seats: '5 places',
    gearbox: 'Auto',
    luggage: '3 bagages',
    price: 85,
    weekly: 170,
  },
  {
    name: 'Renault Captur',
    range: 'SUV compact',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Renault%20Captur1.jpg?width=1200',
    alt: 'Renault Captur',
    seats: '5 places',
    gearbox: 'Manuelle',
    luggage: '4 bagages',
    price: 95,
    weekly: 190,
  },
];

const included = [
  { icon: Gauge, title: 'Kilométrage illimité' },
  { icon: ShieldCheck, title: 'Assurance incluse' },
  { icon: Plane, title: 'Aéroport ou livraison' },
];

const field =
  'mt-2 h-12 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/15';
const card = 'rounded-2xl border border-border bg-card shadow-soft';

function dateOffset(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function sendWhatsApp(lines: string[]) {
  const message = encodeURIComponent(lines.join(String.fromCharCode(10)));
  window.open(`https://wa.me/590691278794?text=${message}`, '_blank');
}

function Home() {
  const [pickupDate, setPickupDate] = useState(dateOffset(2));
  const [returnDate, setReturnDate] = useState(dateOffset(9));
  const [pickupTime, setPickupTime] = useState('09:00');
  const [location, setLocation] = useState('Aéroport Pôle Caraïbes');
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[1].name);
  const [driver, setDriver] = useState({ name: '', phone: '', note: '' });

  const vehicle = vehicles.find((item) => item.name === selectedVehicle) ?? vehicles[1];

  function updateDriver(key: keyof typeof driver, value: string) {
    setDriver((current) => ({ ...current, [key]: value }));
  }

  function submitBooking(event: FormEvent) {
    event.preventDefault();
    if (!driver.name || !driver.phone) return;

    sendWhatsApp([
      'Bonjour Coco Loc 971,',
      '',
      'Je souhaite réserver une voiture.',
      `Voiture : ${vehicle.name}`,
      `Départ : ${location} le ${pickupDate} à ${pickupTime}`,
      `Retour : ${returnDate}`,
      `Conducteur : ${driver.name}`,
      `Téléphone : ${driver.phone}`,
      `Note : ${driver.note || 'Aucune précision'}`,
    ]);
  }

  return (
    <div className='min-h-screen bg-background'>
      <header className='fixed top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-md'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6'>
          <a href='#top' className='flex items-center gap-2'>
            <span className='grid h-10 w-10 place-items-center rounded-lg bg-ocean text-white'>
              <KeyRound className='h-5 w-5' />
            </span>
            <span>
              <span className='block font-display text-lg font-black leading-none'>Coco Loc</span>
              <span className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>Guadeloupe</span>
            </span>
          </a>
          <nav className='hidden items-center gap-7 text-sm font-bold md:flex'>
            <a href='#cars' className='hover:text-ocean'>Voitures</a>
            <a href='#booking' className='hover:text-ocean'>Réserver</a>
            <a href='#plates' className='hover:text-ocean'>Plaques</a>
          </nav>
          <a href='tel:0691278794' className='inline-flex h-10 items-center gap-2 rounded-lg bg-coral px-4 text-sm font-black text-white'>
            <Phone className='h-4 w-4' />06 91 27 87 94
          </a>
        </div>
      </header>

      <section id='top' className='relative min-h-[92vh] overflow-hidden pt-20'>
        <img src={heroImg} alt='Voiture Coco Loc en Guadeloupe' className='absolute inset-0 h-full w-full object-cover object-[72%_center] md:object-center' />
        <div className='absolute inset-0 bg-gradient-to-r from-background via-background/82 to-background/15' />
        <div className='relative mx-auto flex min-h-[calc(92vh-5rem)] max-w-7xl items-center px-4 py-16 sm:px-6'>
          <div className='max-w-2xl'>
            <p className='inline-flex rounded-full border border-border bg-card/85 px-4 py-2 text-xs font-black uppercase tracking-widest text-ocean shadow-soft'>
              Location de voitures · Guadeloupe
            </p>
            <h1 className='mt-6 font-display text-6xl font-black leading-[0.94] tracking-tight sm:text-8xl'>
              Coco Loc
            </h1>
            <p className='mt-6 max-w-xl text-lg leading-8 text-muted-foreground'>
              Le soleil, les clés, partez. Des voitures simples à réserver pour vos déplacements en Guadeloupe.
            </p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <a href='#cars' className='inline-flex h-12 items-center gap-2 rounded-lg bg-ocean px-5 text-sm font-black text-white shadow-soft'>
                Voir les voitures <ChevronRight className='h-4 w-4' />
              </a>
              <a href='#booking' className='inline-flex h-12 items-center rounded-lg border border-border bg-card/85 px-5 text-sm font-black'>
                Réserver
              </a>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className='border-y border-border bg-card px-4 py-6 sm:px-6'>
          <div className='mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_1fr_1.2fr_auto] md:items-end'>
            <DateField label='Départ' value={pickupDate} onChange={setPickupDate} />
            <DateField label='Retour' value={returnDate} onChange={setReturnDate} />
            <label className='text-sm font-bold'>
              Lieu
              <select className={field} value={location} onChange={(event) => setLocation(event.target.value)}>
                {locations.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <a href='#cars' className='inline-flex h-12 items-center justify-center rounded-lg bg-foreground px-5 text-sm font-black text-background'>
              Choisir
            </a>
          </div>
        </section>

        <section id='cars' className='px-4 py-20 sm:px-6 lg:py-24'>
          <div className='mx-auto max-w-7xl'>
            <SectionIntro eyebrow='Nos voitures' title='Choisissez simplement votre véhicule' text='Une flotte courte, lisible, avec les prix principaux affichés sans faire chercher.' />

            <div className='mt-10 grid gap-6 lg:grid-cols-4'>
              {vehicles.map((item) => (
                <article key={item.name} className={`${card} overflow-hidden ${selectedVehicle === item.name ? 'ring-2 ring-ocean' : ''}`}>
                  <img src={item.image} alt={item.alt} className='h-52 w-full bg-muted object-cover' />
                  <div className='p-5'>
                    <div className='text-xs font-black uppercase tracking-widest text-coral'>{item.range}</div>
                    <h3 className='mt-2 font-display text-2xl font-black'>{item.name}</h3>
                    <div className='mt-4 grid gap-2 text-sm text-muted-foreground'>
                      <Spec icon={User} text={item.seats} />
                      <Spec icon={Car} text={`${item.gearbox} · ${item.luggage}`} />
                    </div>
                    <div className='mt-5 flex items-end justify-between gap-3'>
                      <div>
                        <p className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>À partir de</p>
                        <p className='font-display text-4xl font-black text-ocean'>{item.price}€</p>
                        <p className='text-xs font-semibold text-muted-foreground'>7 jours : {item.weekly}€</p>
                      </div>
                      <button
                        type='button'
                        onClick={() => {
                          setSelectedVehicle(item.name);
                          document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className='inline-flex h-11 items-center rounded-lg bg-coral px-4 text-sm font-black text-white'
                      >
                        Réserver
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id='booking' className='bg-muted/45 px-4 py-20 sm:px-6 lg:py-24'>
          <div className='mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start'>
            <aside className={`${card} overflow-hidden`}>
              <img src={vehicle.image} alt={vehicle.alt} className='h-72 w-full bg-muted object-cover' />
              <div className='p-6'>
                <p className='text-xs font-black uppercase tracking-widest text-coral'>Votre choix</p>
                <h2 className='mt-2 font-display text-4xl font-black'>{vehicle.name}</h2>
                <div className='mt-5 grid gap-3 text-sm'>
                  <Summary label='Départ' value={`${location} · ${pickupDate} · ${pickupTime}`} />
                  <Summary label='Retour' value={returnDate} />
                  <Summary label='Tarif' value={`à partir de ${vehicle.price}€`} />
                </div>
              </div>
            </aside>

            <form onSubmit={submitBooking} className={`${card} p-5 sm:p-7`}>
              <SectionIntro eyebrow='Réservation' title='Envoyer une demande' text='On garde ça simple : vos dates, la voiture, vos coordonnées, et Coco Loc confirme la disponibilité.' compact />
              <div className='mt-7 grid gap-4 sm:grid-cols-2'>
                <label className='text-sm font-bold'>
                  Nom
                  <input className={field} value={driver.name} onChange={(event) => updateDriver('name', event.target.value)} required />
                </label>
                <label className='text-sm font-bold'>
                  Téléphone
                  <input className={field} type='tel' value={driver.phone} onChange={(event) => updateDriver('phone', event.target.value)} required />
                </label>
              </div>
              <div className='mt-4 grid gap-4 sm:grid-cols-2'>
                <label className='text-sm font-bold'>
                  Heure de départ
                  <input className={field} type='time' value={pickupTime} onChange={(event) => setPickupTime(event.target.value)} />
                </label>
                <label className='text-sm font-bold'>
                  Voiture
                  <select className={field} value={selectedVehicle} onChange={(event) => setSelectedVehicle(event.target.value)}>
                    {vehicles.map((item) => <option key={item.name}>{item.name}</option>)}
                  </select>
                </label>
              </div>
              <label className='mt-4 block text-sm font-bold'>
                Message
                <textarea
                  className='mt-2 min-h-28 w-full rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/15'
                  value={driver.note}
                  onChange={(event) => updateDriver('note', event.target.value)}
                  placeholder='Numéro de vol, adresse de livraison, besoin particulier...'
                />
              </label>
              <button type='submit' className='mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-coral text-base font-black text-white shadow-glow'>
                <Send className='h-5 w-5' />Envoyer sur WhatsApp
              </button>
            </form>
          </div>
        </section>

        <section className='px-4 py-16 sm:px-6'>
          <div className='mx-auto grid max-w-7xl gap-4 md:grid-cols-3'>
            {included.map((item) => (
              <div key={item.title} className='flex items-center gap-4 border-t border-border py-5'>
                <item.icon className='h-7 w-7 text-ocean' />
                <p className='font-bold'>{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section id='plates' className='bg-sea px-4 py-16 text-white sm:px-6'>
          <div className='mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center'>
            <img src={plaqueImg} alt='Plaques Coco Loc' className='w-full max-w-md rounded-2xl border border-white/20 object-cover shadow-glow' />
            <div>
              <p className='text-xs font-black uppercase tracking-widest text-white/70'>Service en plus</p>
              <h2 className='mt-3 font-display text-4xl font-black'>Plaques 4D & 3D Topaze</h2>
              <p className='mt-4 max-w-xl text-white/82'>Le service plaques reste disponible, mais la page met d’abord en avant la location de voiture.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className='border-t border-border bg-card px-4 py-8 sm:px-6'>
        <div className='mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center'>
          <p><strong className='text-foreground'>Coco Loc 971</strong> · Location voiture en Guadeloupe</p>
          <div className='flex flex-wrap gap-4'>
            <a href='tel:0691278794'>06 91 27 87 94</a>
            <a href='mailto:cocoloc97-1@outlook.fr'>cocoloc97-1@outlook.fr</a>
            <a href='https://instagram.com/coco.loc971'>@coco.loc971</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className='text-sm font-bold'>
      {label}
      <span className='relative block'>
        <CalendarDays className='pointer-events-none absolute left-3 top-[calc(50%+4px)] h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <input className={`${field} pl-9`} type='date' value={value} onChange={(event) => onChange(event.target.value)} />
      </span>
    </label>
  );
}

function SectionIntro({ eyebrow, title, text, compact }: { eyebrow: string; title: string; text: string; compact?: boolean }) {
  return (
    <div className={compact ? 'max-w-xl' : 'max-w-2xl'}>
      <p className='text-xs font-black uppercase tracking-widest text-coral'>{eyebrow}</p>
      <h2 className={`${compact ? 'text-3xl' : 'text-4xl sm:text-5xl'} mt-2 font-display font-black tracking-tight`}>{title}</h2>
      <p className='mt-3 text-sm leading-6 text-muted-foreground sm:text-base'>{text}</p>
    </div>
  );
}

function Spec({ icon: Icon, text }: { icon: typeof Car; text: string }) {
  return (
    <div className='flex items-center gap-2'>
      <Icon className='h-4 w-4 text-ocean' />
      <span>{text}</span>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between gap-4 border-t border-border pt-3'>
      <span className='text-muted-foreground'>{label}</span>
      <span className='text-right font-bold'>{value}</span>
    </div>
  );
}
