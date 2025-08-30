export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      {/* Top bar */}
      <header className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 ring-1 ring-emerald-400/30">
            <span className="text-xl font-black text-emerald-300">T</span>
          </span>
          <span className="font-semibold tracking-wide">TaxConsult</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-200">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#why" className="hover:text-white">Why Us</a>
          <a href="#contact" className="hover:text-white">Contact</a>
          <a href="/login" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">Login</a>
          <a href="/signup" className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition">Sign Up</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Smart <span className="text-emerald-400">Tax Consultancy</span> for
              Businesses & Individuals
            </h1>
            <p className="mt-4 text-slate-200/80">
              NTN registration, return filing, compliance & audit assistance — sab kuch
              ek dashboard se. Secure, fast, and hassle-free.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/signup" className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-semibold transition">
                Get Started
              </a>
              <a href="/login" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition">
                Admin / Client Login
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6 text-center">
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="text-2xl font-bold">5k+</div>
                <div className="text-xs text-slate-200/70">Returns Filed</div>
              </div>
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-xs text-slate-200/70">On-time Compliance</div>
              </div>
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs text-slate-200/70">Support</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 bg-emerald-500/20 blur-3xl rounded-full" />
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-900/60 p-4">
                  <div className="text-sm text-slate-300">Client Overview</div>
                  <div className="mt-3 text-3xl font-bold">Ali Khan</div>
                  <div className="text-xs text-slate-400">NTN: 1234567</div>
                </div>
                <div className="rounded-xl bg-slate-900/60 p-4">
                  <div className="text-sm text-slate-300">Status</div>
                  <div className="mt-3 text-3xl font-bold text-emerald-400">Compliant</div>
                  <div className="text-xs text-slate-400">FY 2024–25</div>
                </div>
                <div className="rounded-xl bg-slate-900/60 p-4 col-span-2">
                  <div className="text-sm text-slate-300">Upcoming</div>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Withholding Statement</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 text-xs">Due Sep 10</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Monthly Sales Tax</span>
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-200 text-xs">Due Sep 15</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Income Tax Return</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 text-xs">Filed</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 text-xs text-slate-300/70">
                * Demo UI — actual data after login.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold">Services</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["NTN Registration", "Fast NTN creation with guidance."],
            ["Tax Return Filing", "Individual & corporate filings with review."],
            ["Sales Tax & STRN", "Registration and monthly statements."],
            ["Withholding Statements", "Timely submission & reconciliation."],
            ["Audit Support", "Pre-audit checks and representation."],
            ["Advisory", "Custom compliance & planning."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 hover:bg-white/10 transition">
              <div className="text-lg font-semibold">{title}</div>
              <div className="mt-2 text-sm text-slate-200/80">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section id="why" className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-400/20 p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold">Why choose TaxConsult?</h3>
          <ul className="mt-4 grid md:grid-cols-3 gap-3 text-slate-100/90">
            <li className="rounded-lg bg-white/5 p-4">Role-based dashboards (Admin/Client)</li>
            <li className="rounded-lg bg-white/5 p-4">Secure auth & data storage</li>
            <li className="rounded-lg bg-white/5 p-4">WhatsApp appointments & notifications</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-200/70 text-sm">© {new Date().getFullYear()} TaxConsult. All rights reserved.</p>
          <div className="text-sm">
            Need help? <a href="mailto:support@taxconsult.com" className="underline">support@taxconsult.com</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
