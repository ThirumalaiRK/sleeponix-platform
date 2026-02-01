import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (location.pathname === '/') return null;

    return (
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-slate-gray">
                <li>
                    <Link to="/" className="hover:text-brand-green transition-colors flex items-center">
                        <Home size={16} className="mr-1" />
                        <span>Home</span>
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const name = value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

                    return (
                        <li key={to} className="flex items-center">
                            <ChevronRight size={16} className="mx-1 text-gray-400" />
                            {last ? (
                                <span className="font-semibold text-brand-green" aria-current="page">
                                    {name}
                                </span>
                            ) : (
                                <Link to={to} className="hover:text-brand-green transition-colors">
                                    {name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
