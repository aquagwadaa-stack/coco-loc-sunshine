import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
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
} from "lucide-react";
import heroImg from "@/assets/hero-tropical.jpg";
import plaqueImg from "@/assets/plaque-4d.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coco Loc 971 — Location voiture & plaques 4D/3D en Guadeloupe" },
      {
        name: "description",
        content:
          "Location de voitures économiques en Guadeloupe et pose de plaques d'immatriculation 4D et 3D Topaze. Réservez en ligne, livraison à domicile.",
      },
      { property: "og:title", content: "Coco Loc 971 — Le soleil, les clés, partez !" },
      {
        property: "og:description",
        content:
          "Location voiture & plaques d'immatriculation en Guadeloupe. Tarifs clairs, assurance incluse, kilométrage illimité.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const cars = [
  { name: "Fiat Panda / Twingo 3", tier: "Économique", seats: 4, icon: Car, dailyRate: 35 },
  { name: "Clio 4", tier: "Compacte", seats: 5, icon: CarFront, dailyRate: 42 },
  { name: "Clio 5 Automatique", tier: "Confort auto", seats: 5, icon: Settings2, dailyRate: 48 },
  { name: "Captur", tier: "SUV familial", seats: 5, icon: BadgeCheck, dailyRate: 55 },
];

const rentalPacks = [
  {
    name: "Week-end",
    sub: "Idéal escapade",
    prices: [60, 75, 85, 95],
    accent: "bg-sun",
  },
  {
    name: "3 jours",
    sub: "Court séjour",
    prices: [70, 85, 95, 105],
    accent: "bg-palm",
  },
  {
    name: "7 jours",
    sub: "Une semaine au soleil",
    prices: [130, 150, 170, 190],
    accent: "bg-ocean",
    popular: true,
  },
  {
    name: "14 jours",
    sub: "Long séjour",
    prices: [280, 300, 330, 360],
    accent: "bg-coral",
  },
];

const plaques = [
  { name: "Pack 2 plaques 4D", price: 55, badge: "Le + demandé" },
  { name: "Pack 2 plaques 3D Topaze", price: 65, badge: "Premium" },
  { name: "Plaque 4D simple", price: 29 },
  { name: "Plaque 3D Topaze simple", price: 35 },
];

const advantages = [
  { icon: Sparkles, title: "Voitures récentes", desc: "Flotte entretenue et propre." },
  { icon: ShieldCheck, title: "Assurance incluse", desc: "Roulez l'esprit léger." },
  { icon: Gauge, title: "Kilométrage illimité", desc: "Explorez toute l'île." },
  { icon: Truck, title: "Livraison à domicile", desc: "Aéroport, hôtel, où vous voulez." },
];

const detailedOptions = [
  { key: "airportWelcome", label: "Accueil aéroport", desc: "Rendez-vous à l'arrivée", price: 0 },
  { key: "homeDelivery", label: "Livraison à domicile", desc: "Adresse à confirmer", price: 10 },
  { key: "childSeat", label: "Siège enfant", desc: "Selon disponibilité", price: 5 },
  { key: "extraDriver", label: "Conducteur additionnel", desc: "Pièce d'identité demandée", price: 10 },
  { key: "plaqueService", label: "Ajouter une demande plaques", desc: "4D ou 3D Topaze", price: 0 },
] as const;

type QuickForm = {
  name: string;
  phone: string;
  service: string;
  date: string;
  message: string;
};

type DetailedForm = {
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  vehicle: string;
  pickupLocation: string;
  returnLocation: string;
  driverName: string;
  driverPhone: string;
  driverEmail: string;
  payment: string;
  confirmation: string;
  note: string;
};

type DetailOptionKey = (typeof detailedOptions)[number]["key"];

function getRentalDays(start: string, end: string) {
  if (!start || !end) return 0;

  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const diff = Math.ceil((endDate.getTime() - startDate.getTime()) / 86_400_000);

  return Number.isFinite(diff) && diff > 0 ? diff : 1;
}

function sendWhatsApp(text: string) {
  window.open(`https://wa.me/590691278794?text=${encodeURIComponent(text)}`, "_blank");
}

function Home() {
  const [quickForm, setQuickForm] = useState<QuickForm>({
    name: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  const [detailedForm, setDetailedForm] = useState<DetailedForm>({
    pickupDate: "",
    returnDate: "",
    pickupTime: "09:00",
    returnTime: "09:00",
    vehicle: "Clio 4",
    pickupLocation: "Aéroport Pôle Caraïbes",
    returnLocation: "Même lieu",
    driverName: "",
    driverPhone: "",
    driverEmail: "",
    payment: "Paiement à la récupération",
    confirmation: "Confirmation WhatsApp",
    note: "",
  });

  const [selectedOptions, setSelectedOptions] = useState<Record<DetailOptionKey, boolean>>({
    airportWelcome: true,
    homeDelivery: false,
    childSeat: false,
    extraDriver: false,
    plaqueService: false,
  });

  const selectedCar = cars.find((car) => car.name === detailedForm.vehicle) ?? cars[1];
  const rentalDays = getRentalDays(detailedForm.pickupDate, detailedForm.returnDate);
  const optionTotal = detailedOptions.reduce(
    (sum, option) => sum + (selectedOptions[option.key] ? option.price : 0),
    0,
  );
  const estimatedTotal = rentalDays > 0 ? rentalDays * selectedCar.dailyRate + optionTotal : 0;

  const setQuickField = (key: keyof QuickForm, value: string) => {
    setQuickForm((current) => ({ ...current, [key]: value }));
  };

  const setDetailedField = (key: keyof DetailedForm, value: string) => {
    setDetailedForm((current) => ({ ...current, [key]: value }));
  };

  const onQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.phone || !quickForm.service) {
      toast.error("Merci de remplir nom, téléphone et service.");
      return;
    }

    sendWhatsApp(
      [
        "Bonjour Coco Loc 971,",
        "",
        "Je souhaite faire une demande rapide.",
        `Nom : ${quickForm.name}`,
        `Téléphone : ${quickForm.phone}`,
        `Service : ${quickForm.service}`,
        `Date souhaitée : ${quickForm.date || "À préciser"}`,
        `Message : ${quickForm.message || "Aucun message ajouté"}`,
      ].join("\n"),
    );
    toast.success("Demande prête sur WhatsApp.");
  };

  const onDetailedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !detailedForm.driverName ||
      !detailedForm.driverPhone ||
      !detailedForm.pickupDate ||
      !detailedForm.returnDate ||
      !detailedForm.vehicle
    ) {
      toast.error("Merci de compléter conducteur, téléphone, dates et véhicule.");
      return;
    }

    const options = detailedOptions
      .filter((option) => selectedOptions[option.key])
      .map((option) => `${option.label}${option.price ? ` (+${option.price}€)` : ""}`)
      .join(", ");

    sendWhatsApp(
      [
        "Bonjour Coco Loc 971,",
        "",
        "Je souhaite réserver un véhicule.",
        `Conducteur : ${detailedForm.driverName}`,
        `Téléphone : ${detailedForm.driverPhone}`,
        `Email : ${detailedForm.driverEmail || "Non renseigné"}`,
        `Véhicule : ${detailedForm.vehicle}`,
        `Départ : ${detailedForm.pickupDate} à ${detailedForm.pickupTime}`,
        `Retour : ${detailedForm.returnDate} à ${detailedForm.returnTime}`,
        `Lieu de récupération : ${detailedForm.pickupLocation}`,
        `Lieu de retour : ${detailedForm.returnLocation}`,
        `Options : ${options || "Aucune option"}`,
        `Paiement : ${detailedForm.payment}`,
        `Confirmation : ${detailedForm.confirmation}`,
        `Estimation : ${rentalDays} jour(s), ${estimatedTotal}€`,
        `Note : ${detailedForm.note || "Aucune note ajoutée"}`,
      ].join("\n"),
    );
    toast.success("Réservation prête sur WhatsApp.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-tropical text-white shadow-soft">
              <Sun className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold">Coco Loc</div>
              <div className="text-[10px] tracking-widest text-muted-foreground">GUADELOUPE · 971</div>
            </div>
          </a>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <a href="#location" className="hover:text-primary">Location</a>
            <a href="#plaques" className="hover:text-primary">Plaques</a>
            <a href="#avantages" className="hover:text-primary">Avantages</a>
            <a href="#reservation" className="hover:text-primary">Réserver</a>
          </nav>
          <Button asChild size="sm" className="bg-coral text-white hover:bg-coral/90 shadow-soft">
            <a href="tel:0691278794"><Phone className="mr-1 h-4 w-4" />06 91 27 87 94</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <img
          src={heroImg}
          alt="Plage tropicale en Guadeloupe avec voiture"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-semibold shadow-soft backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-palm animate-pulse" />
              Location & Plaques · Guadeloupe 971
            </div>
            <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Coco <span className="text-coral">Loc</span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-ocean font-bold italic">
                Le soleil, les clés, partez !
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Location de voitures récentes et pose de plaques d'immatriculation
              4D & 3D Topaze. Livraison à domicile, assurance incluse, kilométrage illimité.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-coral text-white hover:bg-coral/90 shadow-glow h-14 px-8 text-base font-semibold">
                <a href="#reservation">Réserver maintenant →</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base border-2 hover:bg-tropical hover:text-white hover:border-transparent">
                <a href="https://instagram.com/coco.loc971" target="_blank" rel="noreferrer">
                  <Instagram className="mr-2 h-5 w-5" />@coco.loc971
                </a>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { v: "À partir de 50€", l: "Pack dépannage" },
                { v: "4 modèles", l: "au choix" },
                { v: "0 frais", l: "kilométriques" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-border bg-card/70 backdrop-blur px-3 py-3 text-center shadow-soft">
                  <div className="text-sm font-bold text-ocean">{s.v}</div>
                  <div className="text-[11px] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Notre flotte" title="Choisissez votre voiture" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cars.map((c, i) => (
              <div
                key={c.name}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-tropical opacity-10 transition group-hover:opacity-20" />
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-tropical text-white shadow-soft">
                  <c.icon className="h-7 w-7" />
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-coral">
                  Catégorie {i + 1}
                </div>
                <h3 className="mt-1 font-display text-xl font-bold">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.tier}</p>
                <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                  <User className="h-4 w-4 text-ocean" />
                  <span>{c.seats} places</span>
                </div>
              </div>
            ))}
          </div>

          {/* PRICING */}
          <div className="mt-16">
            <h3 className="font-display text-2xl font-bold sm:text-3xl">Tarifs location</h3>
            <p className="text-muted-foreground">Prix par catégorie : Panda/Twingo · Clio 4 · Clio 5 auto · Captur</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {rentalPacks.map((p) => (
                <div
                  key={p.name}
                  className={`relative overflow-hidden rounded-3xl border-2 p-6 shadow-soft transition hover:-translate-y-1 ${
                    p.popular ? "border-coral bg-card" : "border-border bg-card"
                  }`}
                >
                  {p.popular && (
                    <span className="absolute right-4 top-4 rounded-full bg-coral px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Populaire
                    </span>
                  )}
                  <div className={`inline-block h-2 w-12 rounded-full ${p.accent}`} />
                  <h4 className="mt-3 font-display text-2xl font-black">Pack {p.name}</h4>
                  <p className="text-sm text-muted-foreground">{p.sub}</p>
                  <ul className="mt-5 space-y-2">
                    {p.prices.map((price, idx) => (
                      <li key={idx} className="flex items-center justify-between rounded-xl bg-muted px-3 py-2 text-sm">
                        <span className="text-muted-foreground">{["Panda/Twingo", "Clio 4", "Clio 5 auto", "Captur"][idx]}</span>
                        <span className="font-bold text-ocean">{price}€</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Dépannage */}
            <div className="mt-6 rounded-3xl border-2 border-dashed border-palm bg-palm/5 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-palm">Spécial locaux 971</div>
                  <h4 className="mt-1 font-display text-2xl font-bold">Pack dépannage</h4>
                  <p className="text-sm text-muted-foreground">Pour les Guadeloupéens, dépannage rapide.</p>
                </div>
                <div className="flex gap-3">
                  <div className="rounded-2xl bg-card border border-border px-5 py-3 text-center shadow-soft">
                    <div className="text-[10px] uppercase text-muted-foreground tracking-wider">2 jours</div>
                    <div className="font-display text-2xl font-black text-palm">50€</div>
                  </div>
                  <div className="rounded-2xl bg-card border border-border px-5 py-3 text-center shadow-soft">
                    <div className="text-[10px] uppercase text-muted-foreground tracking-wider">3 jours</div>
                    <div className="font-display text-2xl font-black text-palm">70€</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLAQUES */}
      <section id="plaques" className="relative overflow-hidden bg-sea py-24 px-4 sm:px-6 text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" /> Vente & pose
              </div>
              <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl">
                Plaques 4D & 3D Topaze
              </h2>
              <p className="mt-4 max-w-md text-white/85">
                Plaques homologuées, pose soignée. Donnez du style à votre véhicule avec un rendu net et premium.
              </p>
              <img
                src={plaqueImg}
                alt="Plaque d'immatriculation 4D"
                width={1024}
                height={768}
                loading="lazy"
                className="mt-8 rounded-3xl shadow-glow border-4 border-white/20"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {plaques.map((p) => (
                <div
                  key={p.name}
                  className="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 transition hover:bg-white/15"
                >
                  {p.badge && (
                    <span className="absolute -top-2 right-4 rounded-full bg-sun px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-5xl font-black">{p.price}</span>
                    <span className="text-2xl font-bold">€</span>
                  </div>
                  <Button asChild className="mt-4 w-full bg-coral text-white hover:bg-coral/90 border-0">
                    <a href="#reservation">Commander</a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section id="avantages" className="py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Pourquoi Coco Loc" title="Tout ce qu'il faut, rien en plus" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a) => (
              <div key={a.title} className="rounded-3xl bg-card border border-border p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-tropical text-white shadow-soft">
                  <a.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section id="reservation" className="py-24 px-4 sm:px-6 bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.35fr]">
          <div>
            <SectionTitle eyebrow="Réservation" title="Deux façons de réserver" />
            <p className="mt-4 text-muted-foreground max-w-md">
              Choisissez une demande rapide pour aller droit au but, ou une réservation complète
              avec dates, véhicule, options, paiement et mode de confirmation.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                { icon: MessageCircle, title: "Rapide", text: "Parfait pour une question, un dépannage ou une disponibilité." },
                { icon: ClipboardCheck, title: "Complète", text: "Sélection du véhicule, du créneau, des options et du règlement." },
                { icon: CreditCard, title: "Flexible", text: "Paiement au retrait, acompte ou paiement en ligne sécurisé." },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl bg-card border border-border p-5 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sunset text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              {[
                { icon: Phone, label: "06 91 27 87 94", href: "tel:0691278794" },
                { icon: Mail, label: "cocoloc97-1@outlook.fr", href: "mailto:cocoloc97-1@outlook.fr" },
                { icon: Instagram, label: "@coco.loc971", href: "https://instagram.com/coco.loc971" },
                { icon: MapPin, label: "Guadeloupe · 971", href: "#" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-4 rounded-2xl bg-card border border-border p-4 shadow-soft transition hover:border-coral hover:-translate-y-0.5"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-tropical text-white">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">{c.label}</span>
                </a>
              ))}
            </div>
          </div>

          <Tabs defaultValue="quick" className="rounded-3xl bg-card border border-border p-4 shadow-glow sm:p-6">
            <TabsList className="grid h-auto w-full grid-cols-2 rounded-2xl bg-muted p-1">
              <TabsTrigger value="quick" className="rounded-xl py-3 text-sm font-bold">
                Réservation rapide
              </TabsTrigger>
              <TabsTrigger value="complete" className="rounded-xl py-3 text-sm font-bold">
                Réservation complète
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quick" className="mt-6">
              <form onSubmit={onQuickSubmit} className="grid gap-4">
                <div className="rounded-2xl border-l-4 border-palm bg-palm/5 p-4">
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 text-palm" />
                    <p className="text-sm">
                      <strong>Réponse rapide</strong> — disponible 7j/7 pour réservation et dépannage local.
                    </p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="quick-name">Nom complet *</Label>
                  <Input
                    id="quick-name"
                    required
                    maxLength={80}
                    value={quickForm.name}
                    onChange={(e) => setQuickField("name", e.target.value)}
                    className="mt-1.5 h-12"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <Label htmlFor="quick-phone">Téléphone *</Label>
                  <Input
                    id="quick-phone"
                    type="tel"
                    required
                    maxLength={20}
                    value={quickForm.phone}
                    onChange={(e) => setQuickField("phone", e.target.value)}
                    className="mt-1.5 h-12"
                    placeholder="06 90 ..."
                  />
                </div>
                <div>
                  <Label>Service *</Label>
                  <Select value={quickForm.service} onValueChange={(v) => setQuickField("service", v)}>
                    <SelectTrigger className="mt-1.5 h-12">
                      <SelectValue placeholder="Choisissez un service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Location Panda/Twingo">Location Panda / Twingo</SelectItem>
                      <SelectItem value="Location Clio 4">Location Clio 4</SelectItem>
                      <SelectItem value="Location Clio 5 auto">Location Clio 5 auto</SelectItem>
                      <SelectItem value="Location Captur">Location Captur</SelectItem>
                      <SelectItem value="Pack dépannage">Pack dépannage local</SelectItem>
                      <SelectItem value="Plaques 4D">Plaques 4D</SelectItem>
                      <SelectItem value="Plaques 3D Topaze">Plaques 3D Topaze</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quick-date">Date souhaitée</Label>
                  <Input
                    id="quick-date"
                    type="date"
                    value={quickForm.date}
                    onChange={(e) => setQuickField("date", e.target.value)}
                    className="mt-1.5 h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="quick-msg">Message</Label>
                  <Textarea
                    id="quick-msg"
                    rows={4}
                    maxLength={500}
                    value={quickForm.message}
                    onChange={(e) => setQuickField("message", e.target.value)}
                    className="mt-1.5"
                    placeholder="Lieu de livraison, durée, options..."
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 bg-coral text-white hover:bg-coral/90 shadow-glow text-base font-semibold">
                  <Send className="mr-2 h-5 w-5" />
                  Envoyer ma demande
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="complete" className="mt-6">
              <form onSubmit={onDetailedSubmit} className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Véhicule *</Label>
                    <Select value={detailedForm.vehicle} onValueChange={(v) => setDetailedField("vehicle", v)}>
                      <SelectTrigger className="mt-1.5 h-12">
                        <SelectValue placeholder="Sélectionner une voiture" />
                      </SelectTrigger>
                      <SelectContent>
                        {cars.map((car) => (
                          <SelectItem key={car.name} value={car.name}>
                            {car.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Mode de paiement</Label>
                    <Select value={detailedForm.payment} onValueChange={(v) => setDetailedField("payment", v)}>
                      <SelectTrigger className="mt-1.5 h-12">
                        <SelectValue placeholder="Choisir le paiement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paiement à la récupération">Paiement à la récupération</SelectItem>
                        <SelectItem value="Acompte à la confirmation">Acompte à la confirmation</SelectItem>
                        <SelectItem value="Paiement en ligne sécurisé">Paiement en ligne sécurisé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="pickup-date">Départ *</Label>
                    <div className="mt-1.5 grid gap-2 sm:grid-cols-[1fr_auto]">
                      <div className="relative">
                        <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="pickup-date"
                          type="date"
                          required
                          value={detailedForm.pickupDate}
                          onChange={(e) => setDetailedField("pickupDate", e.target.value)}
                          className="h-12 pl-10"
                        />
                      </div>
                      <div className="relative sm:w-28">
                        <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="time"
                          value={detailedForm.pickupTime}
                          onChange={(e) => setDetailedField("pickupTime", e.target.value)}
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="return-date">Retour *</Label>
                    <div className="mt-1.5 grid gap-2 sm:grid-cols-[1fr_auto]">
                      <div className="relative">
                        <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="return-date"
                          type="date"
                          required
                          value={detailedForm.returnDate}
                          onChange={(e) => setDetailedField("returnDate", e.target.value)}
                          className="h-12 pl-10"
                        />
                      </div>
                      <div className="relative sm:w-28">
                        <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="time"
                          value={detailedForm.returnTime}
                          onChange={(e) => setDetailedField("returnTime", e.target.value)}
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Lieu de récupération</Label>
                    <Select value={detailedForm.pickupLocation} onValueChange={(v) => setDetailedField("pickupLocation", v)}>
                      <SelectTrigger className="mt-1.5 h-12">
                        <SelectValue placeholder="Choisir un lieu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aéroport Pôle Caraïbes">Aéroport Pôle Caraïbes</SelectItem>
                        <SelectItem value="Pointe-à-Pitre">Pointe-à-Pitre</SelectItem>
                        <SelectItem value="Baie-Mahault">Baie-Mahault</SelectItem>
                        <SelectItem value="Le Gosier">Le Gosier</SelectItem>
                        <SelectItem value="Sainte-Anne">Sainte-Anne</SelectItem>
                        <SelectItem value="Autre lieu à préciser">Autre lieu à préciser</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Lieu de retour</Label>
                    <Select value={detailedForm.returnLocation} onValueChange={(v) => setDetailedField("returnLocation", v)}>
                      <SelectTrigger className="mt-1.5 h-12">
                        <SelectValue placeholder="Choisir un lieu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Même lieu">Même lieu</SelectItem>
                        <SelectItem value="Aéroport Pôle Caraïbes">Aéroport Pôle Caraïbes</SelectItem>
                        <SelectItem value="Pointe-à-Pitre">Pointe-à-Pitre</SelectItem>
                        <SelectItem value="Autre lieu à préciser">Autre lieu à préciser</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Options</Label>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    {detailedOptions.map((option) => (
                      <label
                        key={option.key}
                        className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-muted/40 p-4 transition hover:border-coral"
                      >
                        <Checkbox
                          checked={selectedOptions[option.key]}
                          onCheckedChange={(checked) =>
                            setSelectedOptions((current) => ({
                              ...current,
                              [option.key]: Boolean(checked),
                            }))
                          }
                          className="mt-1"
                        />
                        <span>
                          <span className="block text-sm font-bold">{option.label}</span>
                          <span className="block text-xs text-muted-foreground">
                            {option.desc}
                            {option.price ? ` · +${option.price}€` : " · inclus"}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="driver-name">Conducteur *</Label>
                    <Input
                      id="driver-name"
                      required
                      value={detailedForm.driverName}
                      onChange={(e) => setDetailedField("driverName", e.target.value)}
                      className="mt-1.5 h-12"
                      placeholder="Nom complet"
                    />
                  </div>
                  <div>
                    <Label htmlFor="driver-phone">Téléphone *</Label>
                    <Input
                      id="driver-phone"
                      type="tel"
                      required
                      value={detailedForm.driverPhone}
                      onChange={(e) => setDetailedField("driverPhone", e.target.value)}
                      className="mt-1.5 h-12"
                      placeholder="06 90 ..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="driver-email">Email</Label>
                    <Input
                      id="driver-email"
                      type="email"
                      value={detailedForm.driverEmail}
                      onChange={(e) => setDetailedField("driverEmail", e.target.value)}
                      className="mt-1.5 h-12"
                      placeholder="email@exemple.fr"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
                  <div>
                    <Label>Mode de confirmation</Label>
                    <Select value={detailedForm.confirmation} onValueChange={(v) => setDetailedField("confirmation", v)}>
                      <SelectTrigger className="mt-1.5 h-12">
                        <SelectValue placeholder="Choisir la confirmation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Confirmation WhatsApp">Confirmation WhatsApp</SelectItem>
                        <SelectItem value="Confirmation téléphone">Confirmation téléphone</SelectItem>
                        <SelectItem value="Confirmation email">Confirmation email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="detailed-note">Informations complémentaires</Label>
                    <Input
                      id="detailed-note"
                      value={detailedForm.note}
                      onChange={(e) => setDetailedField("note", e.target.value)}
                      className="mt-1.5 h-12"
                      placeholder="Numéro de vol, adresse, besoin précis..."
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-coral/30 bg-coral/5 p-5">
                  <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-bold text-coral">
                        <ClipboardCheck className="h-4 w-4" />
                        Résumé de réservation
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {detailedForm.vehicle} · {rentalDays || "Dates à choisir"} jour(s) · {detailedForm.pickupLocation}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {detailedForm.payment} · {detailedForm.confirmation}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-card border border-border px-5 py-4 text-center shadow-soft">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Estimation</div>
                      <div className="font-display text-3xl font-black text-coral">
                        {estimatedTotal ? `${estimatedTotal}€` : "—"}
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="h-14 bg-coral text-white hover:bg-coral/90 shadow-glow text-base font-semibold">
                  <Send className="mr-2 h-5 w-5" />
                  Valider la réservation
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-tropical text-white">
                <Sun className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-bold">Coco Loc 971</div>
                <div className="text-[10px] tracking-widest text-muted-foreground">GUADELOUPE</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Location de voitures & plaques d'immatriculation 4D / 3D Topaze.
              Le soleil, les clés, partez !
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="tel:0691278794" className="hover:text-coral">06 91 27 87 94</a></li>
              <li><a href="mailto:cocoloc97-1@outlook.fr" className="hover:text-coral">cocoloc97-1@outlook.fr</a></li>
              <li><a href="https://instagram.com/coco.loc971" className="hover:text-coral">@coco.loc971</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#location" className="hover:text-coral">Location voitures</a></li>
              <li><a href="#plaques" className="hover:text-coral">Plaques 4D & 3D</a></li>
              <li><a href="#reservation" className="hover:text-coral">Réserver</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Coco Loc 971 · Guadeloupe
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full bg-coral/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-coral">
        {eyebrow}
      </div>
      <h2 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
