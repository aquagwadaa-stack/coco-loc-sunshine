import { createFileRoute } from '@tanstack/react-router';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Baby,
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  FileText,
  Gauge,
  Home as HomeIcon,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  User,
  Wrench,
} from 'lucide-react';
import heroImg from '@/assets/hero-tropical.jpg';
import plaqueImg from '@/assets/plaque-4d.jpg';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Coco Loc 971 - Location de voiture en Guadeloupe' },
      {
        name: 'description',
        content:
          'Réservez votre voiture de location en Guadeloupe avec Coco Loc 971 : dates, lieu de prise en charge, véhicule, options et confirmation en ligne.',
      },
      { property: 'og:title', content: 'Coco Loc 971 - Location de voiture en Guadeloupe' },
      {
        property: 'og:description',
        content:
          'Location de voitures en Guadeloupe avec prise en charge à l’aéroport, livraison possible et réservation en ligne.',
      },
      { property: 'og:image', content: heroImg },
    ],
  }),
  component: Home,
});

type Vehicle = {
  name: string;
  range: string;
  image: string;
  alt: string;
  seats: string;
  gearbox: string;
  luggage: string;
  packages: {
    weekend: number;
    threeDays: number;
    week: number;
    longStay: number;
  };
  busyOffsets: number[];
};

const locations = [
  'Aéroport Guadeloupe Maryse Condé',
  'Pointe-à-Pitre',
  'Baie-Mahault',
  'Le Gosier',
  'Sainte-Anne',
  'Livraison à domicile',
];

const vehicles: Vehicle[] = [
  {
    name: 'Fiat Panda',
    range: 'Économique',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/2012%20Fiat%20Panda%20III.JPG?width=1200',
    alt: 'Fiat Panda',
    seats: '4 places',
    gearbox: 'Manuelle',
    luggage: '2 bagages',
    packages: { weekend: 60, threeDays: 70, week: 130, longStay: 280 },
    busyOffsets: [-1, 5],
  },
  {
    name: 'Twingo 3',
    range: 'Économique',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Renault%20Twingo%20III%20in%20Aardenburg.jpg?width=1200',
    alt: 'Renault Twingo 3',
    seats: '4 places',
    gearbox: 'Manuelle',
    luggage: '2 bagages',
    packages: { weekend: 60, threeDays: 70, week: 130, longStay: 280 },
    busyOffsets: [4],
  },
  {
    name: 'Clio 4',
    range: 'Compacte',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Renault%20Clio-IV%20Black.JPG?width=1200',
    alt: 'Renault Clio 4',
    seats: '5 places',
    gearbox: 'Manuelle',
    luggage: '3 bagages',
    packages: { weekend: 75, threeDays: 85, week: 150, longStay: 300 },
    busyOffsets: [-2, 6],
  },
  {
    name: 'Clio 5 automatique',
    range: 'Automatique',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Renault%20Clio%20V%20%2848220140297%29.jpg?width=1200',
    alt: 'Renault Clio 5',
    seats: '5 places',
    gearbox: 'Auto',
    luggage: '3 bagages',
    packages: { weekend: 85, threeDays: 95, week: 170, longStay: 330 },
    busyOffsets: [3],
  },
  {
    name: 'Renault Captur',
    range: 'SUV compact',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Renault%20Captur1.jpg?width=1200',
    alt: 'Renault Captur',
    seats: '5 places',
    gearbox: 'Manuelle',
    luggage: '4 bagages',
    packages: { weekend: 95, threeDays: 105, week: 190, longStay: 360 },
    busyOffsets: [-1, 7],
  },
];

const included = [
  { icon: Gauge, title: 'Kilométrage illimité' },
  { icon: ShieldCheck, title: 'Assurance incluse' },
  { icon: Plane, title: 'Aéroport ou livraison' },
];

const serviceHighlights = [
  {
    icon: Plane,
    title: 'Départ aéroport',
    text: 'Prise en charge à l’aéroport Guadeloupe Maryse Condé et restitution simple en fin de séjour.',
  },
  {
    icon: HomeIcon,
    title: 'Livraison à domicile',
    text: 'Livraison possible selon le secteur, pratique pour les hôtels, logements et déplacements locaux.',
  },
  {
    icon: CreditCard,
    title: 'Acompte possible',
    text: 'Réservation sécurisée avec acompte, puis règlement du solde au moment de la remise du véhicule.',
  },
  {
    icon: ShieldCheck,
    title: 'Location sereine',
    text: 'Assurance incluse, kilométrage illimité et véhicules adaptés aux routes de Guadeloupe.',
  },
];

const bookingSteps = [
  {
    icon: CalendarCheck,
    title: '1. Sélectionnez votre séjour',
    text: 'Indiquez vos dates, vos horaires et le lieu de prise en charge souhaité.',
  },
  {
    icon: Car,
    title: '2. Choisissez le véhicule',
    text: 'Comparez les modèles disponibles et ajoutez les options utiles à votre trajet.',
  },
  {
    icon: BadgeCheck,
    title: '3. Confirmez la réservation',
    text: 'Recevez une référence de réservation avec le récapitulatif du véhicule et du montant.',
  },
];

const plateOffers = [
  {
    title: 'Pack 2 plaques 4D',
    price: 55,
    details: ['2 plaques 4D', 'Dépose ancienne plaque', 'Pose comprise'],
  },
  {
    title: 'Pack 2 plaques 3D Topaze',
    price: 65,
    details: ['2 plaques 3D Topaze', 'Dépose ancienne plaque', 'Pose comprise'],
  },
  {
    title: 'Plaque 4D simple',
    price: 29,
    details: ['1 plaque 4D', 'Dépose ancienne plaque', 'Pose comprise'],
  },
  {
    title: 'Plaque 3D Topaze simple',
    price: 35,
    details: ['1 plaque 3D Topaze', 'Dépose ancienne plaque', 'Pose comprise'],
  },
];

const extras = [
  { id: 'siege-enfant', title: 'Siège enfant', price: 15, icon: Baby },
  { id: 'conducteur-additionnel', title: 'Conducteur additionnel', price: 20, icon: User },
  { id: 'livraison-zone', title: 'Livraison hors agence', price: 25, icon: Plane },
];

const paymentMethods = [
  'Carte bancaire à la confirmation',
  'Acompte puis solde à la remise',
  'Paiement en agence',
];

const field =
  'mt-2 h-12 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/15';
const card = 'rounded-2xl border border-border bg-card shadow-soft';
const dayMs = 24 * 60 * 60 * 1000;
const initialPickupDate = '2026-06-21';
const initialReturnDate = '2026-06-28';

function toInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function dateOffset(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toInputDate(date);
}

function addDays(value: string, days: number) {
  const date = parseDate(value);
  date.setDate(date.getDate() + days);
  return toInputDate(date);
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(parseDate(value));
}

function rentalDays(start: string, end: string) {
  const diff = parseDate(end).getTime() - parseDate(start).getTime();
  return Math.max(1, Math.ceil(diff / dayMs));
}

function packageLabel(days: number) {
  if (days <= 2) return 'Forfait week-end';
  if (days <= 3) return 'Forfait 3 jours';
  if (days <= 7) return 'Forfait 7 jours';
  if (days <= 14) return 'Long séjour';
  return 'Séjour sur mesure';
}

function estimatePrice(vehicle: Vehicle, days: number) {
  if (days <= 2) return vehicle.packages.weekend;
  if (days <= 3) return vehicle.packages.threeDays;
  if (days <= 7) return vehicle.packages.week;
  if (days <= 14) return vehicle.packages.longStay;
  return Math.ceil((vehicle.packages.longStay / 14) * days);
}

function Home() {
  const [pickupDate, setPickupDate] = useState(initialPickupDate);
  const [returnDate, setReturnDate] = useState(initialReturnDate);
  const [pickupTime, setPickupTime] = useState('09:00');
  const [returnTime, setReturnTime] = useState('09:00');
  const [pickupLocation, setPickupLocation] = useState('Aéroport Guadeloupe Maryse Condé');
  const [returnLocation, setReturnLocation] = useState('Aéroport Guadeloupe Maryse Condé');
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[1].name);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [payment, setPayment] = useState(paymentMethods[0]);
  const [bookingRef, setBookingRef] = useState('');
  const [driver, setDriver] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    flight: '',
    note: '',
  });
  const [plateRequest, setPlateRequest] = useState({
    name: '',
    phone: '',
    offer: plateOffers[0].title,
    plateNumber: '',
    note: '',
  });
  const [plateRequestRef, setPlateRequestRef] = useState('');

  useEffect(() => {
    setPickupDate(dateOffset(2));
    setReturnDate(dateOffset(9));
  }, []);

  const vehicle = vehicles.find((item) => item.name === selectedVehicle) ?? vehicles[1];
  const days = rentalDays(pickupDate, returnDate);
  const basePrice = estimatePrice(vehicle, days);
  const extrasTotal = selectedExtras.reduce((total, extraId) => {
    const extra = extras.find((item) => item.id === extraId);
    return total + (extra?.price ?? 0);
  }, 0);
  const total = basePrice + extrasTotal;

  const planning = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => {
      const offset = index - 2;
      const value = addDays(pickupDate, offset);
      const selected = value >= pickupDate && value < returnDate;
      const busy = vehicle.busyOffsets.includes(offset);
      return {
        value,
        selected,
        status: selected ? 'Votre séjour' : busy ? 'Réservé' : 'Disponible',
      };
    });
  }, [pickupDate, returnDate, vehicle]);

  function updateDriver(key: keyof typeof driver, value: string) {
    setDriver((current) => ({ ...current, [key]: value }));
  }

  function updatePlateRequest(key: keyof typeof plateRequest, value: string) {
    setPlateRequest((current) => ({ ...current, [key]: value }));
  }

  function toggleExtra(extraId: string) {
    setSelectedExtras((current) =>
      current.includes(extraId) ? current.filter((item) => item !== extraId) : [...current, extraId],
    );
  }

  function submitBooking(event: FormEvent) {
    event.preventDefault();
    const randomPart = Math.floor(10000 + Math.random() * 90000);
    setBookingRef(`CL-${new Date().getFullYear()}-${randomPart}`);
  }

  function submitPlateRequest(event: FormEvent) {
    event.preventDefault();
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    setPlateRequestRef(`PL-${new Date().getFullYear()}-${randomPart}`);
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
            <a href='#services' className='hover:text-ocean'>Services</a>
            <a href='#cars' className='hover:text-ocean'>Véhicules</a>
            <a href='#booking' className='hover:text-ocean'>Réservation</a>
            <a href='#plates' className='hover:text-ocean'>Plaques</a>
          </nav>
          <a href='#booking' className='inline-flex h-10 items-center gap-2 rounded-lg bg-coral px-4 text-sm font-black text-white'>
            <CalendarCheck className='h-4 w-4' />Réserver
          </a>
        </div>
      </header>

      <section id='top' className='relative min-h-[92vh] overflow-hidden pt-20'>
        <img src={heroImg} alt='Voiture Coco Loc en Guadeloupe' className='absolute inset-0 h-full w-full object-cover object-[72%_center] md:object-center' />
        <div className='absolute inset-0 bg-gradient-to-r from-background via-background/84 to-background/10' />
        <div className='relative mx-auto flex min-h-[calc(92vh-5rem)] max-w-7xl items-center px-4 py-16 sm:px-6'>
          <div className='max-w-2xl'>
            <p className='inline-flex rounded-full border border-border bg-card/85 px-4 py-2 text-xs font-black uppercase tracking-widest text-ocean shadow-soft'>
              Location de voitures en Guadeloupe
            </p>
            <h1 className='mt-6 font-display text-6xl font-black leading-[0.94] tracking-tight sm:text-8xl'>
              Coco Loc
            </h1>
            <p className='mt-6 max-w-xl text-lg leading-8 text-muted-foreground'>
              Réservez votre véhicule pour l’aéroport, vos déplacements professionnels ou votre séjour sur l’île.
            </p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <a href='#booking' className='inline-flex h-12 items-center gap-2 rounded-lg bg-ocean px-5 text-sm font-black text-white shadow-soft'>
                Lancer la réservation <ChevronRight className='h-4 w-4' />
              </a>
              <a href='#cars' className='inline-flex h-12 items-center rounded-lg border border-border bg-card/85 px-5 text-sm font-black'>
                Voir la flotte
              </a>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className='border-y border-border bg-card px-4 py-6 sm:px-6'>
          <div className='mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_1fr_1.15fr_1.15fr_auto] md:items-end'>
            <DateField label='Départ' value={pickupDate} onChange={setPickupDate} />
            <DateField label='Retour' value={returnDate} onChange={setReturnDate} />
            <LocationField label='Prise en charge' value={pickupLocation} onChange={setPickupLocation} />
            <LocationField label='Restitution' value={returnLocation} onChange={setReturnLocation} />
            <a href='#booking' className='inline-flex h-12 items-center justify-center rounded-lg bg-foreground px-5 text-sm font-black text-background'>
              Rechercher
            </a>
          </div>
        </section>

        <section id='services' className='px-4 py-16 sm:px-6 lg:py-20'>
          <div className='mx-auto max-w-7xl'>
            <SectionIntro
              eyebrow='Services inclus'
              title='Une location pensée pour bouger facilement'
              text='Coco Loc mise sur l’essentiel : récupérer la voiture au bon endroit, comprendre le tarif et partir sans mauvaise surprise.'
            />
            <div className='mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {serviceHighlights.map((item) => (
                <article key={item.title} className={`${card} p-5`}>
                  <item.icon className='h-7 w-7 text-ocean' />
                  <h3 className='mt-4 font-display text-2xl font-black'>{item.title}</h3>
                  <p className='mt-3 text-sm leading-6 text-muted-foreground'>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id='cars' className='px-4 py-20 sm:px-6 lg:py-24'>
          <div className='mx-auto max-w-7xl'>
            <SectionIntro eyebrow='Flotte Coco Loc' title='Choisissez votre véhicule' text='Cinq véhicules disponibles, des tarifs lisibles et les informations utiles avant de réserver.' />

            <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
              {vehicles.map((item) => (
                <article key={item.name} className={`${card} overflow-hidden ${selectedVehicle === item.name ? 'ring-2 ring-ocean' : ''}`}>
                  <img src={item.image} alt={item.alt} className='h-52 w-full bg-muted object-cover' />
                  <div className='p-5'>
                    <div className='text-xs font-black uppercase tracking-widest text-coral'>{item.range}</div>
                    <h3 className='mt-2 font-display text-2xl font-black'>{item.name}</h3>
                    <div className='mt-4 grid gap-2 text-sm text-muted-foreground'>
                      <Spec icon={User} text={item.seats} />
                      <Spec icon={Car} text={item.gearbox} />
                      <Spec icon={Briefcase} text={item.luggage} />
                    </div>
                    <div className='mt-5 flex items-end justify-between gap-3'>
                      <div>
                        <p className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>Week-end</p>
                        <p className='font-display text-4xl font-black text-ocean'>{item.packages.weekend}€</p>
                        <p className='text-xs font-semibold text-muted-foreground'>7 jours : {item.packages.week}€</p>
                      </div>
                      <button
                        type='button'
                        onClick={() => {
                          setSelectedVehicle(item.name);
                          document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className='inline-flex h-11 items-center rounded-lg bg-coral px-4 text-sm font-black text-white'
                      >
                        Choisir
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id='booking' className='bg-muted/45 px-4 py-20 sm:px-6 lg:py-24'>
          <div className='mx-auto max-w-7xl'>
            <SectionIntro eyebrow='Réservation en ligne' title='Finalisez votre location' text='Sélectionnez vos dates, ajoutez vos options et confirmez votre véhicule en quelques étapes.' />

            <div className='mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start'>
              <aside className={`${card} overflow-hidden`}>
                <img src={vehicle.image} alt={vehicle.alt} className='h-72 w-full bg-muted object-cover' />
                <div className='p-6'>
                  <p className='text-xs font-black uppercase tracking-widest text-coral'>Véhicule sélectionné</p>
                  <h2 className='mt-2 font-display text-4xl font-black'>{vehicle.name}</h2>
                  <div className='mt-5 grid gap-3 text-sm'>
                    <Summary label='Départ' value={`${pickupLocation} · ${pickupDate} · ${pickupTime}`} />
                    <Summary label='Retour' value={`${returnLocation} · ${returnDate} · ${returnTime}`} />
                    <Summary label='Durée' value={`${days} jour${days > 1 ? 's' : ''} · ${packageLabel(days)}`} />
                    <Summary label='Total estimé' value={`${total}€`} highlight />
                  </div>

                  <div className='mt-7'>
                    <div className='flex items-center justify-between gap-4'>
                      <h3 className='font-display text-2xl font-black'>Planning</h3>
                      <span className='rounded-full bg-palm/12 px-3 py-1 text-xs font-black text-palm'>Disponibilité</span>
                    </div>
                    <div className='mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5'>
                      {planning.map((day) => (
                        <div
                          key={day.value}
                          className={`rounded-lg border p-3 text-sm ${
                            day.selected
                              ? 'border-ocean bg-ocean text-white'
                              : day.status === 'Réservé'
                                ? 'border-border bg-muted text-muted-foreground'
                                : 'border-border bg-background'
                          }`}
                        >
                          <p className='font-black capitalize'>{formatShortDate(day.value)}</p>
                          <p className='mt-1 text-xs font-bold opacity-80'>{day.status}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              <form onSubmit={submitBooking} className={`${card} p-5 sm:p-7`}>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <DateField label='Date de départ' value={pickupDate} onChange={setPickupDate} />
                  <DateField label='Date de retour' value={returnDate} onChange={setReturnDate} />
                  <label className='text-sm font-bold'>
                    Heure de départ
                    <input className={field} type='time' value={pickupTime} onChange={(event) => setPickupTime(event.target.value)} />
                  </label>
                  <label className='text-sm font-bold'>
                    Heure de retour
                    <input className={field} type='time' value={returnTime} onChange={(event) => setReturnTime(event.target.value)} />
                  </label>
                  <LocationField label='Prise en charge' value={pickupLocation} onChange={setPickupLocation} />
                  <LocationField label='Restitution' value={returnLocation} onChange={setReturnLocation} />
                  <label className='text-sm font-bold sm:col-span-2'>
                    Véhicule
                    <select className={field} value={selectedVehicle} onChange={(event) => setSelectedVehicle(event.target.value)}>
                      {vehicles.map((item) => <option key={item.name}>{item.name}</option>)}
                    </select>
                  </label>
                </div>

                <div className='mt-7 border-t border-border pt-6'>
                  <h3 className='font-display text-2xl font-black'>Options</h3>
                  <div className='mt-4 grid gap-3 sm:grid-cols-3'>
                    {extras.map((extra) => (
                      <button
                        key={extra.id}
                        type='button'
                        onClick={() => toggleExtra(extra.id)}
                        className={`rounded-lg border p-4 text-left transition ${
                          selectedExtras.includes(extra.id)
                            ? 'border-ocean bg-ocean text-white'
                            : 'border-border bg-background hover:border-ocean/60'
                        }`}
                      >
                        <extra.icon className='h-5 w-5' />
                        <span className='mt-3 block text-sm font-black'>{extra.title}</span>
                        <span className='mt-1 block text-xs font-bold opacity-75'>+ {extra.price}€</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className='mt-7 border-t border-border pt-6'>
                  <h3 className='font-display text-2xl font-black'>Conducteur</h3>
                  <div className='mt-4 grid gap-4 sm:grid-cols-2'>
                    <label className='text-sm font-bold'>
                      Prénom
                      <input className={field} value={driver.firstName} onChange={(event) => updateDriver('firstName', event.target.value)} required />
                    </label>
                    <label className='text-sm font-bold'>
                      Nom
                      <input className={field} value={driver.lastName} onChange={(event) => updateDriver('lastName', event.target.value)} required />
                    </label>
                    <label className='text-sm font-bold'>
                      Email
                      <input className={field} type='email' value={driver.email} onChange={(event) => updateDriver('email', event.target.value)} required />
                    </label>
                    <label className='text-sm font-bold'>
                      Téléphone
                      <input className={field} type='tel' value={driver.phone} onChange={(event) => updateDriver('phone', event.target.value)} required />
                    </label>
                    <label className='text-sm font-bold'>
                      Vol ou arrivée
                      <input className={field} value={driver.flight} onChange={(event) => updateDriver('flight', event.target.value)} placeholder='Ex : AF758' />
                    </label>
                    <label className='text-sm font-bold'>
                      Paiement
                      <select className={field} value={payment} onChange={(event) => setPayment(event.target.value)}>
                        {paymentMethods.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className='mt-4 block text-sm font-bold'>
                    Informations complémentaires
                    <textarea
                      className='mt-2 min-h-24 w-full rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/15'
                      value={driver.note}
                      onChange={(event) => updateDriver('note', event.target.value)}
                      placeholder='Adresse de livraison, horaires de vol, besoin particulier...'
                    />
                  </label>
                </div>

                <div className='mt-7 rounded-xl border border-border bg-background p-5'>
                  <div className='grid gap-3 text-sm'>
                    <Summary label='Forfait' value={`${packageLabel(days)} · ${basePrice}€`} />
                    <Summary label='Options' value={`${extrasTotal}€`} />
                    <Summary label='Paiement' value={payment} />
                    <Summary label='Total' value={`${total}€`} highlight />
                  </div>
                </div>

                <button type='submit' className='mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-coral text-base font-black text-white shadow-glow'>
                  <CreditCard className='h-5 w-5' />Confirmer ma réservation
                </button>

                {bookingRef && (
                  <div role='status' className='mt-5 rounded-xl border border-palm/30 bg-palm/10 p-5 text-sm'>
                    <div className='flex items-start gap-3'>
                      <BadgeCheck className='mt-0.5 h-5 w-5 text-palm' />
                      <div>
                        <p className='font-black text-foreground'>Réservation confirmée</p>
                        <p className='mt-1 text-muted-foreground'>
                          Référence {bookingRef}. Votre véhicule est réservé pour les dates sélectionnées.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        <section className='px-4 py-16 sm:px-6 lg:py-20'>
          <div className='mx-auto max-w-7xl'>
            <SectionIntro
              eyebrow='Déroulé'
              title='Une réservation claire jusqu’à la remise des clés'
              text='Le client voit son trajet, son véhicule, ses options et le montant avant de confirmer.'
            />
            <div className='mt-9 grid gap-4 md:grid-cols-3'>
              {bookingSteps.map((item) => (
                <article key={item.title} className='border-t border-border py-5'>
                  <item.icon className='h-7 w-7 text-ocean' />
                  <h3 className='mt-4 font-display text-2xl font-black'>{item.title}</h3>
                  <p className='mt-2 text-sm leading-6 text-muted-foreground'>{item.text}</p>
                </article>
              ))}
            </div>
            <div className='mt-8 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-3'>
              {included.map((item) => (
                <div key={item.title} className='flex items-center gap-3 px-2 py-3'>
                  <item.icon className='h-6 w-6 text-palm' />
                  <p className='font-black'>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id='plates' className='bg-sea px-4 py-20 text-white sm:px-6 lg:py-24'>
          <div className='mx-auto max-w-7xl'>
            <div className='grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center'>
              <img src={plaqueImg} alt='Plaques Coco Loc' className='w-full max-w-md rounded-2xl border border-white/20 object-cover shadow-glow' />
              <div>
                <p className='text-xs font-black uppercase tracking-widest text-white/70'>Plaques d’immatriculation</p>
                <h2 className='mt-3 font-display text-4xl font-black sm:text-5xl'>Vente et pose de plaques 4D & 3D Topaze</h2>
                <p className='mt-4 max-w-2xl text-white/82'>
                  Plaques conformes à la réglementation, pose comprise sur rendez-vous et finitions disponibles pour voiture récente ou remplacement.
                </p>
                <div className='mt-6 grid gap-3 sm:grid-cols-3'>
                  <PlateBenefit icon={Wrench} text='Pose comprise' />
                  <PlateBenefit icon={FileText} text='Service homologué' />
                  <PlateBenefit icon={Clock} text='Sur rendez-vous' />
                </div>
              </div>
            </div>

            <div className='mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
              {plateOffers.map((offer) => (
                <article key={offer.title} className='rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm'>
                  <h3 className='font-display text-2xl font-black'>{offer.title}</h3>
                  <p className='mt-3 font-display text-5xl font-black text-sun'>{offer.price}€</p>
                  <div className='mt-5 grid gap-2 text-sm text-white/86'>
                    {offer.details.map((detail) => (
                      <div key={detail} className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-sun' />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className='mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]'>
              <div className='rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm'>
                <h3 className='font-display text-3xl font-black'>Préparer la pose</h3>
                <div className='mt-5 grid gap-4 text-sm text-white/86'>
                  <div className='flex gap-3'>
                    <MapPin className='mt-0.5 h-5 w-5 text-sun' />
                    <p>Pose sur rendez-vous, avec possibilité de préciser le lieu souhaité dans la demande.</p>
                  </div>
                  <div className='flex gap-3'>
                    <FileText className='mt-0.5 h-5 w-5 text-sun' />
                    <p>Indiquez votre immatriculation et la finition voulue pour préparer la prestation.</p>
                  </div>
                  <div className='flex gap-3'>
                    <Phone className='mt-0.5 h-5 w-5 text-sun' />
                    <p>Contact direct au 06 91 27 87 94 pour confirmer l’horaire de pose.</p>
                  </div>
                </div>
              </div>

              <form onSubmit={submitPlateRequest} className='rounded-2xl border border-border bg-card p-5 text-foreground shadow-soft sm:p-7'>
                <div className='flex items-center gap-3'>
                  <Wrench className='h-6 w-6 text-ocean' />
                  <h3 className='font-display text-3xl font-black'>Demande plaques</h3>
                </div>
                <div className='mt-5 grid gap-4 sm:grid-cols-2'>
                  <label className='text-sm font-bold'>
                    Nom
                    <input className={field} value={plateRequest.name} onChange={(event) => updatePlateRequest('name', event.target.value)} required />
                  </label>
                  <label className='text-sm font-bold'>
                    Téléphone
                    <input className={field} type='tel' value={plateRequest.phone} onChange={(event) => updatePlateRequest('phone', event.target.value)} required />
                  </label>
                  <label className='text-sm font-bold'>
                    Prestation
                    <select className={field} value={plateRequest.offer} onChange={(event) => updatePlateRequest('offer', event.target.value)}>
                      {plateOffers.map((offer) => <option key={offer.title}>{offer.title}</option>)}
                    </select>
                  </label>
                  <label className='text-sm font-bold'>
                    Immatriculation
                    <input className={field} value={plateRequest.plateNumber} onChange={(event) => updatePlateRequest('plateNumber', event.target.value)} placeholder='Ex : AB-123-CD' />
                  </label>
                </div>
                <label className='mt-4 block text-sm font-bold'>
                  Message
                  <textarea
                    className='mt-2 min-h-24 w-full rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/15'
                    value={plateRequest.note}
                    onChange={(event) => updatePlateRequest('note', event.target.value)}
                    placeholder='Jour souhaité, lieu de pose, précision sur les plaques...'
                  />
                </label>
                <button type='submit' className='mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-ocean text-base font-black text-white'>
                  <CalendarCheck className='h-5 w-5' />Envoyer ma demande
                </button>
                {plateRequestRef && (
                  <div role='status' className='mt-5 rounded-xl border border-palm/30 bg-palm/10 p-5 text-sm'>
                    <p className='font-black'>Demande enregistrée</p>
                    <p className='mt-1 text-muted-foreground'>Référence {plateRequestRef}. Coco Loc revient vers vous pour confirmer le rendez-vous.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className='border-t border-border bg-card px-4 py-8 sm:px-6'>
        <div className='mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center'>
          <p><strong className='text-foreground'>Coco Loc 971</strong> · Location voiture en Guadeloupe</p>
          <div className='flex flex-wrap gap-4'>
            <a className='inline-flex items-center gap-2' href='tel:0691278794'><Phone className='h-4 w-4' />06 91 27 87 94</a>
            <a className='inline-flex items-center gap-2' href='mailto:cocoloc97-1@outlook.fr'><Mail className='h-4 w-4' />cocoloc97-1@outlook.fr</a>
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

function LocationField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className='text-sm font-bold'>
      {label}
      <select className={field} value={value} onChange={(event) => onChange(event.target.value)}>
        {locations.map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className='max-w-2xl'>
      <p className='text-xs font-black uppercase tracking-widest text-coral'>{eyebrow}</p>
      <h2 className='mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl'>{title}</h2>
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

function PlateBenefit({ icon: Icon, text }: { icon: typeof Car; text: string }) {
  return (
    <div className='flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 px-4 py-3'>
      <Icon className='h-5 w-5 text-sun' />
      <span className='text-sm font-black'>{text}</span>
    </div>
  );
}

function Summary({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className='flex justify-between gap-4 border-t border-border pt-3'>
      <span className='text-muted-foreground'>{label}</span>
      <span className={`text-right font-bold ${highlight ? 'text-ocean' : ''}`}>{value}</span>
    </div>
  );
}
