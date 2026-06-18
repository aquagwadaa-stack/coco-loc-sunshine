import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Car,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  Gauge,
  Sparkles,
  Check,
  Sun,
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
  { name: "Fiat Panda / Twingo 3", tier: "Économique", seats: 4, emoji: "🚗" },
  { name: "Clio 4", tier: "Compacte", seats: 5, emoji: "🚙" },
  { name: "Clio 5 Automatique", tier: "Confort auto", seats: 5, emoji: "🚘" },
  { name: "Captur", tier: "SUV familial", seats: 5, emoji: "🚐" },
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

function Home() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) {
      toast.error("Merci de remplir nom, téléphone et service.");
      return;
    }
    const text = `Bonjour Coco Loc 971,%0A%0ANom: ${form.name}%0ATéléphone: ${form.phone}%0AService: ${form.service}%0ADate: ${form.date}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/590691278794?text=${text}`, "_blank");
    toast.success("Demande envoyée ! Nous vous recontactons rapidement.");
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
                <div className="text-5xl">{c.emoji}</div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-coral">
                  Catégorie {i + 1}
                </div>
                <h3 className="mt-1 font-display text-xl font-bold">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.tier}</p>
                <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                  <Car className="h-4 w-4 text-ocean" />
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
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionTitle eyebrow="Réservation" title="Réservez en 30 secondes" />
            <p className="mt-4 text-muted-foreground max-w-md">
              Remplissez le formulaire, nous vous recontactons par WhatsApp pour confirmer votre véhicule et la livraison.
            </p>

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
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-sunset text-white">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">{c.label}</span>
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border-l-4 border-palm bg-palm/5 p-4">
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 text-palm" />
                <p className="text-sm">
                  <strong>Réponse rapide</strong> — disponible 7j/7 pour réservation et dépannage local.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-glow"
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <Input id="name" required maxLength={80} value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 h-12" placeholder="Jean Dupont" />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone *</Label>
                <Input id="phone" type="tel" required maxLength={20} value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1.5 h-12" placeholder="06 90 ..." />
              </div>
              <div>
                <Label>Service *</Label>
                <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
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
                <Label htmlFor="date">Date souhaitée</Label>
                <Input id="date" type="date" value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="mt-1.5 h-12" />
              </div>
              <div>
                <Label htmlFor="msg">Message</Label>
                <Textarea id="msg" rows={4} maxLength={500} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5" placeholder="Lieu de livraison, durée, options..." />
              </div>
              <Button type="submit" size="lg" className="h-14 bg-coral text-white hover:bg-coral/90 shadow-glow text-base font-semibold">
                Envoyer ma demande →
              </Button>
            </div>
          </form>
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
