import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#0B1120] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          <div className="md:col-span-5 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect width="24" height="24" rx="6" fill="#1E1B4B" />
                <path
                  d="M7 12C7 9.23858 9.23858 7 12 7C14.12 7 15.9317 8.31932 16.662 10.1818H13.9491C13.4577 9.46716 12.773 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C12.773 15 13.4577 14.5328 13.9491 13.8182H16.662C15.9317 15.6807 14.12 17 12 17C9.23858 17 7 14.7614 7 12Z"
                  fill="#A78BFA"
                />
              </svg>
              <span>CreatorSpace</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              A curated creative services marketplace connecting product teams,
              founders, and marketing leads with vetted independent designers,
              engineers, filmmakers, and brand strategists.
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-white">Marketplace</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  Explore Services
                </Link>
              </li>
              <li>
                <Link to="/creators" className="text-slate-400 hover:text-white transition-colors">
                  Browse Creators
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-slate-400 hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link to="/inquiry" className="text-slate-400 hover:text-white transition-colors">
                  Submit Project Brief
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-white">Categories</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/services?category=Branding"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Branding &amp; Visual Identity
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=UI%2FUX%20Design"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  UI/UX &amp; Design Systems
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=Web%20Development"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Web &amp; Frontend Engineering
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=Video%20Editing"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Video Editing &amp; Photography
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-white">For Creators</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                  Creator Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard?action=new"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  List a New Service
                </Link>
              </li>
              <li>
                <Link to="/inquiry" className="text-slate-400 hover:text-white transition-colors">
                  Client Inquiry Desk
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CreatorSpace Marketplace. All rights reserved.</p>
          <p>Fixed-scope creative packages · Direct creator collaboration</p>
        </div>
      </div>
    </footer>
  );
}
