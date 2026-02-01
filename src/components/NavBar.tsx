import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';
import boleLogo from '@/assets/bole-logo.png';

const navItems = [
  { name: '关于我们', path: '/about' },
  { name: '真实案例', path: '/cases' },
  { name: '联络方式', path: '/contact' },
];

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-lg shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="h-10 md:h-12 w-10 md:w-12 overflow-hidden flex items-center justify-center">
              <img
                src={boleLogo}
                alt="伯乐 AI"
                className="h-[110%] w-[110%] object-cover object-center"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  isActive(item.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-foreground transition-all duration-200 ${
                    isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link to="/contact">
              <Button
                size="sm"
                className="group bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 px-6 overflow-hidden relative"
              >
                <span className="flex items-center justify-center transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                  开始体验
                </span>
                <ArrowRight className="w-4 h-4 absolute inset-0 m-auto transition-all duration-300 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-soft-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-2 text-lg font-medium transition-colors ${
                isActive(item.path)
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full group bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 mt-4 overflow-hidden relative h-10">
              <span className="flex items-center justify-center transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                开始体验
              </span>
              <ArrowRight className="w-4 h-4 absolute inset-0 m-auto transition-all duration-300 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
