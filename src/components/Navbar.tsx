import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 py-1 border-b-2 ${
      isActive
        ? 'text-[#6D28D9] border-[#6D28D9]'
        : 'text-slate-600 border-transparent hover:text-[#0F172A] hover:border-slate-300'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single clean brand wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#0B1120] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D28D9] rounded"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="24" height="24" rx="6" fill="#0B1120" />
            <path
              d="M7 12C7 9.23858 9.23858 7 12 7C14.12 7 15.9317 8.31932 16.662 10.1818H13.9491C13.4577 9.46716 12.773 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C12.773 15 13.4577 14.5328 13.9491 13.8182H16.662C15.9317 15.6807 14.12 17 12 17C9.23858 17 7 14.7614 7 12Z"
              fill="#A78BFA"
            />
          </svg>
          <span>CreatorSpace</span>
        </Link>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          <NavLink to="/creators" className={navLinkClass}>
            Creators
          </NavLink>
          <NavLink to="/services" className={navLinkClass}>
            Services
          </NavLink>
          <NavLink to="/wishlist" className={navLinkClass}>
            <span className="tabular-nums">
              Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ''}
            </span>
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </nav>

        {/* Zone 3: Primary action + Mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/inquiry"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D28D9]"
          >
            Send Inquiry
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#6D28D9]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center min-h-[44px] px-3 rounded-lg text-sm font-medium ${
                isActive
                  ? 'bg-[#F4F3FF] text-[#6D28D9]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/creators"
            className={({ isActive }) =>
              `flex items-center min-h-[44px] px-3 rounded-lg text-sm font-medium ${
                isActive
                  ? 'bg-[#F4F3FF] text-[#6D28D9]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Explore Creators
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `flex items-center min-h-[44px] px-3 rounded-lg text-sm font-medium ${
                isActive
                  ? 'bg-[#F4F3FF] text-[#6D28D9]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Explore Services
          </NavLink>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `flex items-center justify-between min-h-[44px] px-3 rounded-lg text-sm font-medium ${
                isActive
                  ? 'bg-[#F4F3FF] text-[#6D28D9]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            <span>Wishlist</span>
            <span className="tabular-nums text-xs text-slate-500">
              {wishlistCount} saved
            </span>
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center min-h-[44px] px-3 rounded-lg text-sm font-medium ${
                isActive
                  ? 'bg-[#F4F3FF] text-[#6D28D9]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Creator Dashboard
          </NavLink>
          <div className="pt-2">
            <Link
              to="/inquiry"
              className="flex items-center justify-center w-full min-h-[44px] px-4 py-2.5 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors"
            >
              Send Inquiry
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
