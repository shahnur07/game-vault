import { useEffect, useState } from "react";
import {
    FaBars,
    FaBookOpen,
    FaCalendarDays,
    FaGamepad,
    FaHeart,
    FaRightFromBracket,
    FaXmark
} from "react-icons/fa6";

function MobileNav({
    username,
    currentView,
    setCurrentView,
    onLogout
}) {
    const [menuOpen, setMenuOpen] = useState(false);

    const userInitial = username?.slice(0, 1).toUpperCase() || "U";

    const currentLabel = {
        home: "Discover",
        vault: "Vault",
        favorites: "Favorites",
        events: "Events"
    }[currentView] || "GameVault";

    const navItems = [
        {
            key: "home",
            label: "Discover",
            icon: <FaGamepad size={19} />
        },
        {
            key: "vault",
            label: "Vault",
            icon: <FaBookOpen size={18} />
        },
        {
            key: "favorites",
            label: "Favorites",
            icon: <FaHeart size={17} />
        },
        {
            key: "events",
            label: "Events",
            icon: <FaCalendarDays size={18} />
        }
    ];

    const navigateTo = (view) => {
        setCurrentView(view);
        setMenuOpen(false);
    };

    useEffect(() => {
        if (!menuOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [menuOpen]);

    return (
        <div className="mobile-nav-wrap">
            <div className="mobile-profile-row mobile-menu-bar">
                <button
                    type="button"
                    aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="mobile-menu-toggle"
                >
                    {menuOpen ? <FaXmark size={16} /> : <FaBars size={16} />}
                </button>

                <div className="mobile-menu-title">
                    <strong>GameVault</strong>
                    <span>{currentLabel}</span>
                </div>
            </div>

            {menuOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        className="mobile-nav-backdrop"
                        onClick={() => setMenuOpen(false)}
                    />

                    <div className="mobile-nav mobile-nav-menu" role="menu" aria-label="Mobile navigation">
                        {navItems.map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                aria-label={`Go to ${item.label}`}
                                className={`mobile-nav-btn ${currentView === item.key ? "active" : ""}`}
                                onClick={() => navigateTo(item.key)}
                            >
                                <span className="mobile-nav-icon">{item.icon}</span>
                                <span className="mobile-nav-label">{item.label}</span>
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={() => {
                                setMenuOpen(false);
                                onLogout();
                            }}
                            className="mobile-nav-btn mobile-nav-logout"
                        >
                            <span className="mobile-nav-icon">
                                <FaRightFromBracket size={17} />
                            </span>
                            <span className="mobile-nav-label">Sign out</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default MobileNav;
