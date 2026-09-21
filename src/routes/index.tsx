import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  X,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const description =
  "Achievers Homes offers the most comfortable student accommodation opposite University of Ilesa in Ilesa, Osun State. Explore our hostel, location and contact information.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Achievers Homes | The Most Comfortable Student Accommodation Opposite University of Ilesa" },
      { name: "description", content: description },
      {
        property: "og:title",
        content: "Achievers Homes | The Most Comfortable Student Accommodation Opposite University of Ilesa",
      },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: siteConfig.name,
          description,
          telephone: "+2348033036185",
          email: siteConfig.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ilesa",
            addressRegion: "Osun State",
            addressCountry: "NG",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});


const gallery = [
  {
    src: "/images/major-room.jpeg",
    alt: "Main accommodation room at Achievers Homes",
  },
  {
    src: "/images/kitchen.jpeg",
    alt: "Kitchen area at Achievers Homes",
  },
  {
    src: "/images/bathroom.jpeg",
    alt: "Bathroom at Achievers Homes",
  },
  {
    src: "/images/kitchen-cabinet.jpeg",
    alt: "Kitchen cabinet and storage area at Achievers Homes",
  },
  {
    src: "/images/room-big.jpeg",
    alt: "Spacious accommodation room at Achievers Homes",
  },
  {
    src: "/images/window.jpeg",
    alt: "Window and natural light inside Achievers Homes",
  },
  {
    src: "/images/kitchen-another-view.jpeg",
    alt: "Another view of the kitchen area at Achievers Homes",
  },
  {
    src: "/images/compound.jpeg",
    alt: "Exterior compound of Achievers Homes",
  },
  {
    src: "/images/bathroom-side.jpeg",
    alt: "Side view of the bathroom at Achievers Homes",
  },
  {
    src: "/images/toilet.jpeg",
    alt: "Toilet area at Achievers Homes",
  },
];

const navLinks = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Accommodation", "#accommodation"],
  ["Gallery", "#gallery"],
  ["Location", "#location"],
  ["Contact", "#contact"],
] as const;

const quickInfo: Array<{ icon: LucideIcon; label: string; value: string; href: string }> = [
  { icon: MapPin, label: "Location", value: "Opposite University of Ilesa", href: "#location" },
  { icon: Building2, label: "Accommodation", value: "The Most Comfortable Student Accommodation Opposite University of Ilesa", href: "#accommodation" },
  { icon: Phone, label: "Phone", value: siteConfig.phoneDisplay, href: siteConfig.phoneHref },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
];

function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#home" className="group inline-flex items-center gap-3 transition-transform duration-300 hover:scale-105" aria-label="Achievers Homes home">
      <span
        className={`grid size-10 place-items-center rounded-[12px] font-display text-lg font-extrabold transition-colors duration-300 ${inverse ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}
      >
        A
      </span>
      <span className={`font-display text-lg font-bold ${inverse ? "text-hero-foreground" : "text-foreground"}`}>
        Achievers Homes
      </span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">{eyebrow}</p>
      <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
      {copy ? <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">{copy}</p> : null}
    </div>
  );
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  
  useEffect(() => {
    if (activeImage === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") setActiveImage((activeImage + 1) % gallery.length);
      if (event.key === "ArrowLeft") setActiveImage((activeImage - 1 + gallery.length) % gallery.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowBookingPopup(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);
  
  return (
    <div className="bg-background pb-16 text-foreground md:pb-0">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:px-12">
          <Wordmark/>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-105">
                {label}
              </a>
            ))}
            <Button asChild className="transition-transform duration-300 hover:scale-105 active:scale-95"><a href="#contact">Contact Us</a></Button>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden transition-transform duration-300 hover:scale-105 active:scale-95"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen ? (
          <nav className="border-t border-border bg-background px-5 py-5 lg:hidden animate-in slide-in-from-top-2 duration-300" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-7xl flex-col">
              {navLinks.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-border py-3.5 font-medium transition-colors hover:text-accent">
                  {label}
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <main>
        <section id="home" className="relative isolate min-h-[760px] overflow-hidden pt-20 sm:min-h-[820px]">
          <img
            src="/images/major-room.jpeg"
            alt="Main accommodation room at Achievers Homes"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 -z-10 bg-primary/75" />
          <div className="mx-auto flex min-h-[680px] max-w-7xl items-center px-5 py-20 sm:min-h-[740px] sm:px-8 lg:px-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-4xl">
              <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-hero-foreground/85">
                <MapPin className="size-4 text-accent"/> Opposite University of Ilesa
              </p>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] text-hero-foreground sm:text-6xl lg:text-7xl">
                The Most <span className="text-accent">Comfortable</span> Student Accommodation Opposite University of Ilesa
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-hero-foreground/80 sm:text-lg">
                Achievers Homes provides a convenient accommodation option for students looking for a comfortable place to stay opposite University of Ilesa in Ilesa, Osun State.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="transition-transform duration-300 hover:scale-105 active:scale-95 hover:shadow-lg" size="lg" variant="gold"><a href={siteConfig.phoneHref}><Phone/>Call Us</a></Button>
                <Button asChild className="transition-transform duration-300 hover:scale-105 active:scale-95" size="lg" variant="lightOutline"><a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp Us</a></Button>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Quick information" className="bg-background">
          <div className="mx-auto grid max-w-7xl divide-y divide-border px-5 py-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-8 lg:grid-cols-4 lg:px-12">
            {quickInfo.map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="group flex min-w-0 items-center gap-4 px-2 py-5 sm:px-6 transition-all duration-300 hover:bg-muted/50 rounded-lg">
                <Icon className="size-5 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110"/>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-muted-foreground">{label}</span>
                  <span className="block text-sm font-semibold leading-snug">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="bg-card py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
            <SectionHeading eyebrow="About us" title="About Achievers Homes"/>
            <div>
              <p className="text-xl leading-8 text-foreground sm:text-2xl sm:leading-9">
                Achievers Homes provides the most comfortable student accommodation opposite University of Ilesa in Ilesa, Osun State. We aim to provide students with a convenient place to stay while pursuing their studies.
              </p>
              <div className="mt-7 h-1 w-16 rounded-full bg-accent" />
            </div>
          </div>
        </section>

        <section id="accommodation" className="py-20 sm:py-28 overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
            <div className="relative group">
              <img
                src="/images/kitchen.jpeg"
                alt="Kitchen area at Achievers Homes"
                loading="lazy"
                width="1000"
                height="750"
                className="aspect-[4/3] w-full rounded-[24px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute -bottom-5 -right-3 rounded-[16px] bg-primary p-5 text-primary-foreground shadow-xl sm:right-5 transition-transform duration-500 group-hover:-translate-y-2">
                <p className="font-display text-2xl font-bold">Ilesa</p><p className="text-sm text-primary-foreground/70">Osun State, Nigeria</p>
              </div>
            </div>
            <div>
              <SectionHeading copy="Located opposite University of Ilesa, Achievers Homes offers comfortable student accommodation within easy reach of your academic environment. Explore our photos to get a better view of the accommodation and surroundings." eyebrow="The accommodation" title="A Convenient Place to Stay"/>
              <Button asChild className="mt-8 transition-transform duration-300 hover:scale-105 active:scale-95" size="lg" variant="outline"><a href="#gallery">View the gallery <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1"/></a></Button>
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-card py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <SectionHeading copy="Take a closer look at the accommodation spaces through photographs provided by Achievers Homes." eyebrow="Real photographs" title="Explore Achievers Homes"/>
              <p className="shrink-0 text-sm text-muted-foreground">Tap a photo to enlarge</p>
            </div>
            <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((image, index) => (
                <button key={image.src} type="button" onClick={() => setActiveImage(index)} className={`group overflow-hidden rounded-[20px] bg-muted text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${index === 0 ? "sm:row-span-2" : ""} shadow-sm hover:shadow-lg transition-shadow duration-300`} aria-label={`Open photo ${index + 1}: ${image.alt}`}>
                  <img src={image.src} alt={image.alt} loading="lazy" width="1000" height="750" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <SectionHeading copy="Watch this short guide to see how to get to Achievers Homes opposite University of Ilesa." eyebrow="Directions" title="Watch this short guide to see how to get to Achievers Homes from the University of Ilesa main gate."/>
            <div className="mt-10 aspect-video overflow-hidden rounded-[24px] bg-primary shadow-xl hover:shadow-2xl transition-shadow duration-300">
              {siteConfig.youtubeUrl ? (
                <iframe className="h-full w-full" src={siteConfig.youtubeUrl} title="How to get to Achievers Homes" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center text-primary-foreground">
                  <span className="grid size-16 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-500 hover:rotate-12"><Play className="ml-1 size-6"/></span>
                  <p className="mt-5 font-display text-xl font-semibold">Directions video coming soon</p>
                  <p className="mt-2 max-w-md text-sm text-primary-foreground/65">The official Achievers Homes route guide will appear here when the client’s YouTube link is available.</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <div className="mt-10 rounded-[24px] border border-border bg-card p-6 sm:p-8 transition-all duration-300 hover:shadow-md">
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 size-6 shrink-0 text-accent animate-bounce"/>

            <div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Directions from the University of Ilesa Main Gate
              </h3>

              <p className="mt-4 leading-7 text-muted-foreground">
                From the <strong className="font-bold text-foreground">University of Ilesa main gate</strong>, go straight from the gate. At the point where the road divides, take the left direction towards <strong className="font-bold text-foreground">Ibodi/ Ile Ife</strong>. Continue straight towards <strong className="font-bold text-foreground">Abanishe Area</strong> and look out for the <strong className="font-bold text-foreground">Golf Club signpost</strong> on your left.
              </p>

              <p className="mt-4 leading-7 text-muted-foreground">
                Continue until you reach the junction where the <strong className="font-bold text-foreground">transformer</strong> is located. At the transformer, turn right into the street and continue approximately <strong className="font-bold text-foreground">20 metres</strong>. The twin buildings ahead are <strong className="font-bold text-foreground">Achievers Homes</strong>.
              </p>

              <div className="mt-6 rounded-[16px] bg-muted p-4 border border-transparent transition-colors duration-300 hover:border-accent">
                <p className="font-semibold text-foreground">
                  Approximately <strong className="text-accent">300 metres</strong> from the University of Ilesa main gate.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <section className="bg-primary py-20 text-primary-foreground sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">Good to know</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">Why Achievers Homes?</h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] bg-primary-foreground/15 md:grid-cols-3">
              {[
                ["01", "Convenient Location", "Located opposite University of Ilesa."],
                ["02", "Comfortable Student Accommodation", "A place designed around the accommodation needs of students."],
                ["03", "Easy to Contact", "Reach Achievers Homes directly by phone, WhatsApp or email."],
              ].map(([number, title, copy]) => (
                <article key={title} className="bg-primary p-8 sm:p-10 transition-transform duration-300 hover:-translate-y-2 hover:bg-primary/90 hover:z-10 hover:shadow-2xl relative">
                  <span className="text-sm font-bold text-accent">{number}</span>
                  <h3 className="mt-8 text-2xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-primary-foreground/65">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="location" className="bg-card py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12">
            <SectionHeading copy="Achievers Homes is located opposite University of Ilesa, making it a highly practical and comfortable student accommodation option in Ilesa, Osun State." eyebrow="Location" title="Close to Your Academic Environment"/>
            <div className="rounded-[20px] border border-border bg-background p-8 sm:p-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <MapPin className="size-8 text-accent"/>
              <h3 className="mt-8 text-2xl font-bold">Achievers Homes</h3>
              <p className="mt-3 max-w-md leading-7 text-muted-foreground">{siteConfig.location}</p>
              <div className="mt-8 flex items-center gap-3 border-t border-border pt-6 text-sm font-medium"><Check className="size-5 text-accent"/> Located in the Abanise area, approximately 300 metres from the University of Ilesa main gate.</div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-primary-foreground sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="[&_h2]:!text-white [&_p:first-of-type]:!text-white [&_p:last-of-type]:!text-white/80">
              <SectionHeading copy="Achievers Homes provides practical accommodation spaces with features designed around everyday student living." eyebrow="Quality & Features" title="Designed for Comfortable Student Living"/>
            </div>
            
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["01", "Accommodation Rooms", "Comfortable accommodation spaces for student living."],
                ["02", "Kitchen Areas", "Dedicated kitchen areas with practical storage and cabinet spaces."],
                ["03", "Wardrobes", "Wardrobe spaces provided within the accommodation rooms."],
                ["04", "Private Bathrooms", "Dedicated bathroom spaces within the accommodation."],
                ["05", "Electrical Points", "Electrical sockets and fittings provided within the rooms."],
                ["06", "Lighting Points", "Lighting points provided throughout the accommodation spaces."],
              ].map(([number, title, copy]) => (
                <article
                  key={title}
                  className="rounded-[20px] border border-primary-foreground/10 bg-primary-foreground/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-foreground/10 hover:shadow-xl"
                >
                  <span className="text-sm font-bold text-accent">{number}</span>
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-primary-foreground/65">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="rounded-[24px] bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-16 lg:px-16 transition-all duration-500 hover:shadow-2xl">
              <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Contact us</p>
                  <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-5xl">Have Questions? Get in Touch</h2>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button asChild className="transition-transform duration-300 hover:scale-105 active:scale-95" size="lg" variant="gold"><a href={siteConfig.phoneHref}><Phone/>Call Us</a></Button>
                    <Button asChild className="transition-transform duration-300 hover:scale-105 active:scale-95" size="lg" variant="light"><a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp Us</a></Button>
                    <Button asChild className="transition-transform duration-300 hover:scale-105 active:scale-95" size="lg" variant="lightOutline"><a href={`mailto:${siteConfig.email}`}><Mail/>Email Us</a></Button>
                  </div>
                </div>
                <address className="space-y-5 not-italic text-primary-foreground/75">
                  <a href={siteConfig.phoneHref} className="group flex items-start gap-4 transition-colors hover:text-white"><Phone className="mt-0.5 size-5 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110"/><span><strong className="block text-sm text-primary-foreground">Phone</strong>{siteConfig.phoneDisplay}</span></a>
                  <a href={`mailto:${siteConfig.email}`} className="group flex min-w-0 items-start gap-4 transition-colors hover:text-white"><Mail className="mt-0.5 size-5 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110"/><span className="min-w-0 break-all"><strong className="block text-sm text-primary-foreground">Email</strong>{siteConfig.email}</span></a>
                  <div className="flex items-start gap-4"><MapPin className="mt-0.5 size-5 shrink-0 text-accent"/><span><strong className="block text-sm text-primary-foreground">Location</strong>{siteConfig.location}</span></div>
                </address>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-footer pb-24 pt-16 text-hero-foreground md:pb-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 border-b border-hero-foreground/15 pb-12 md:grid-cols-[1.3fr_0.7fr_1fr]">
            <div><Wordmark inverse/><p className="mt-5 max-w-sm leading-7 text-footer-muted">The most comfortable student accommodation opposite University of Ilesa in Ilesa, Osun State, Nigeria.</p></div>
            <div><h3 className="text-sm font-bold">Navigate</h3><nav className="mt-5 grid gap-3 text-sm text-footer-muted">{navLinks.map(([label, href]) => <a key={href} href={href} className="transition-colors duration-300 hover:text-accent">{label}</a>)}</nav></div>
            <div><h3 className="text-sm font-bold">Contact</h3><div className="mt-5 grid gap-3 text-sm text-footer-muted"><a href={siteConfig.phoneHref} className="transition-colors duration-300 hover:text-accent">{siteConfig.phoneDisplay}</a><a className="break-all transition-colors duration-300 hover:text-accent" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><p>{siteConfig.location}</p></div></div>
          </div>
          <p className="pt-8 text-sm text-footer-muted">© 2026 Achievers Homes. All rights reserved.</p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background p-3 md:hidden">
        <Button asChild className="transition-transform duration-300 active:scale-95" size="lg"><a href={siteConfig.phoneHref}><Phone/>Call</a></Button>
        <Button asChild className="transition-transform duration-300 active:scale-95" size="lg" variant="gold"><a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp</a></Button>
      </div>

      {showBookingPopup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 p-5 backdrop-blur-sm animate-in fade-in duration-500">
          <div
            className="relative w-full max-w-md rounded-[24px] bg-background p-7 shadow-2xl sm:p-8 animate-in zoom-in-95 duration-500"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-popup-title"
          >
            <button
              type="button"
              onClick={() => setShowBookingPopup(false)}
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground hover:rotate-90"
              aria-label="Close booking popup"
            >
              <X className="size-5"/>
            </button>

            <p className="text-xs font-bold uppercase tracking-wider text-accent">
              Achievers Homes
            </p>

            <h2
              id="booking-popup-title"
              className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl"
            >
              Looking for accommodation opposite University of Ilesa?
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Call us to book your room.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="flex-1 transition-transform duration-300 hover:scale-105 active:scale-95 hover:shadow-lg" size="lg" variant="gold">
                <a href={siteConfig.phoneHref}>
                  <Phone/>
                  Call Now
                </a>
              </Button>

              <Button asChild className="flex-1 transition-transform duration-300 hover:scale-105 active:scale-95" size="lg" variant="outline">
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle/>
                  WhatsApp
                </a>
              </Button>
            </div>

            <p className="mt-4 text-center text-sm font-semibold text-muted-foreground">
              {siteConfig.phoneDisplay}
            </p>
          </div>
        </div>
      ) : null}

      {activeImage !== null && gallery[activeImage] ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-primary/95 p-4 backdrop-blur-md animate-in fade-in duration-300" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setActiveImage(null)}>
          <Button className="absolute right-4 top-4 transition-transform duration-300 hover:scale-110 hover:rotate-90" onClick={() => setActiveImage(null)} size="icon" variant="light" aria-label="Close photo"><X/></Button>
          <Button className="absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110 hover:-translate-x-1" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage - 1 + gallery.length) % gallery.length); }} size="icon" variant="light" aria-label="Previous photo"><ChevronLeft/></Button>
          <img src={gallery[activeImage]?.src} alt={gallery[activeImage]?.alt} className="max-h-[85vh] max-w-[88vw] rounded-[16px] object-contain shadow-2xl animate-in zoom-in-95 duration-300" onClick={(event) => event.stopPropagation()} />
          <Button className="absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110 hover:translate-x-1" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + 1) % gallery.length); }} size="icon" variant="light" aria-label="Next photo"><ChevronRight/></Button>
        </div>
      ) : null}
    </div>
  );
}