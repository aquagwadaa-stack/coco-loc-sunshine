import { createFileRoute } from '@tanstack/react-router';
import { type FormEvent, useState } from 'react';
import {
  BadgeCheck,
  CalendarCheck,
  Check,
  Clock,
  FileText,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Wrench,
} from 'lucide-react';
import plaqueImg from '@/assets/plaque-4d.jpg';

export const Route = createFileRoute('/plaques')({
  head: () => ({
    meta: [
      { title: 'Coco Loc Plaques - Plaques 4D et 3D Topaze en Guadeloupe' },
      {
        name: 'description',
        content:
          'Demandez vos plaques 4D ou 3D Topaze avec Coco Loc : tarifs, pose comprise, dépose ancienne plaque et demande de rendez-vous.',
      },
    ],
  }),
  component: PlaquesPage,
});

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

const field =
  'mt-2 h-12 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/15';

function PlaquesPage() {
  const [plateRequest, setPlateRequest] = useState({
    name: '',
    phone: '',
    offer: plateOffers[0].title,
    plateNumber: '',
    note: '',
  });
  const [plateRequestRef, setPlateRequestRef] = useState('');

  function updatePlateRequest(key: keyof typeof plateRequest, value: string) {
    setPlateRequest((current) => ({ ...current, [key]: value }));
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
          <a href='/' className='flex items-center gap-2'>
            <span className='grid h-10 w-10 place-items-center rounded-lg bg-ocean text-white'>
              <KeyRound className='h-5 w-5' />
            </span>
            <span>
              <span className='block font-display text-lg font-black leading-none'>Coco Loc</span>
              <span className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>Plaques</span>
            </span>
          </a>
          <nav className='hidden items-center gap-7 text-sm font-bold md:flex'>
            <a href='/' className='hover:text-ocean'>Location voitures</a>
            <a href='#tarifs' className='hover:text-ocean'>Tarifs</a>
            <a href='#demande' className='hover:text-ocean'>Demande</a>
          </nav>
          <a href='#demande' className='inline-flex h-10 items-center gap-2 rounded-lg bg-coral px-4 text-sm font-black text-white'>
            <CalendarCheck className='h-4 w-4' />Demander
          </a>
        </div>
      </header>

      <main>
        <section className='bg-sea px-4 pb-16 pt-28 text-white sm:px-6 lg:pb-20'>
          <div className='mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-center'>
            <img src={plaqueImg} alt='Plaques Coco Loc' className='w-full max-w-md rounded-2xl border border-white/20 object-cover shadow-glow' />
            <div>
              <p className='text-xs font-black uppercase tracking-widest text-white/70'>Coco Loc Plaques</p>
              <h1 className='mt-3 font-display text-5xl font-black leading-none sm:text-7xl'>Plaques 4D & 3D Topaze</h1>
              <p className='mt-5 max-w-2xl text-base leading-7 text-white/82'>
                Vente et pose de plaques conformes à la réglementation, avec dépose de l’ancienne plaque et pose comprise sur rendez-vous.
              </p>
              <div className='mt-7 grid gap-3 sm:grid-cols-3'>
                <PlateBenefit icon={Wrench} text='Pose comprise' />
                <PlateBenefit icon={FileText} text='Service homologué' />
                <PlateBenefit icon={Clock} text='Sur rendez-vous' />
              </div>
            </div>
          </div>
        </section>

        <section id='tarifs' className='px-4 py-16 sm:px-6 lg:py-20'>
          <div className='mx-auto max-w-7xl'>
            <SectionIntro
              eyebrow='Tarifs'
              title='Choisissez votre finition'
              text='Les prix sont affichés clairement, avec la pose comprise pour chaque prestation.'
            />
            <div className='mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
              {plateOffers.map((offer) => (
                <article key={offer.title} className='rounded-2xl border border-border bg-card p-5 shadow-soft'>
                  <h3 className='font-display text-2xl font-black'>{offer.title}</h3>
                  <p className='mt-3 font-display text-5xl font-black text-ocean'>{offer.price}€</p>
                  <div className='mt-5 grid gap-2 text-sm text-muted-foreground'>
                    {offer.details.map((detail) => (
                      <div key={detail} className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-palm' />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id='demande' className='bg-muted/45 px-4 py-16 sm:px-6 lg:py-20'>
          <div className='mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]'>
            <div>
              <SectionIntro
                eyebrow='Rendez-vous'
                title='Préparer la pose'
                text='La demande permet de préciser la prestation, l’immatriculation et le créneau souhaité avant confirmation.'
              />
              <div className='mt-7 grid gap-4 text-sm text-muted-foreground'>
                <InfoLine icon={MapPin} text='Pose sur rendez-vous, avec possibilité de préciser le lieu souhaité dans la demande.' />
                <InfoLine icon={FileText} text='Indiquez votre immatriculation et la finition voulue pour préparer la prestation.' />
                <InfoLine icon={Phone} text='Contact direct au 06 91 27 87 94 pour confirmer l’horaire de pose.' />
              </div>
            </div>

            <form onSubmit={submitPlateRequest} className='rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-7'>
              <div className='flex items-center gap-3'>
                <Wrench className='h-6 w-6 text-ocean' />
                <h2 className='font-display text-3xl font-black'>Demande plaques</h2>
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
                  <div className='flex items-start gap-3'>
                    <BadgeCheck className='mt-0.5 h-5 w-5 text-palm' />
                    <div>
                      <p className='font-black'>Demande enregistrée</p>
                      <p className='mt-1 text-muted-foreground'>Référence {plateRequestRef}. Coco Loc revient vers vous pour confirmer le rendez-vous.</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className='border-t border-border bg-card px-4 py-8 sm:px-6'>
        <div className='mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center'>
          <p><strong className='text-foreground'>Coco Loc Plaques</strong> · Plaques 4D / 3D Topaze</p>
          <div className='flex flex-wrap gap-4'>
            <a className='inline-flex items-center gap-2' href='tel:0691278794'><Phone className='h-4 w-4' />06 91 27 87 94</a>
            <a className='inline-flex items-center gap-2' href='mailto:cocoloc97-1@outlook.fr'><Mail className='h-4 w-4' />cocoloc97-1@outlook.fr</a>
            <a href='/'>Location voitures</a>
          </div>
        </div>
      </footer>
    </div>
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

function PlateBenefit({ icon: Icon, text }: { icon: typeof Wrench; text: string }) {
  return (
    <div className='flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 px-4 py-3'>
      <Icon className='h-5 w-5 text-sun' />
      <span className='text-sm font-black'>{text}</span>
    </div>
  );
}

function InfoLine({ icon: Icon, text }: { icon: typeof Wrench; text: string }) {
  return (
    <div className='flex gap-3 rounded-2xl border border-border bg-card p-4'>
      <Icon className='mt-0.5 h-5 w-5 shrink-0 text-ocean' />
      <p>{text}</p>
    </div>
  );
}
