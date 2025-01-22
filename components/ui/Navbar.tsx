"use client";

import { motion } from "framer-motion";
import { Button } from "./button";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Import icons
import { useState } from "react";

const navLinks = [
    { href: "https://github.com/TalhaShahidKhan/next_short_url", label: "GitHub" },
    { href: "https//wa.me/+8801717051054", label: "Contact" },
    
] as const;

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div className="container mx-auto flex h-16 items-center justify-between">
                {/* Logo */}
                <motion.div
                    className="flex items-center space-x-2"
                >
                    <Link href="/">
                        <span className="text-xl font-mono font-semibold tracking-tight">
                            <span className="text-primary">&lt;&nbsp;</span>
                            <span className="text-foreground">Picolinks</span>
                            <span className="text-primary">&nbsp;/&gt;</span>
                        </span>
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    {navLinks.map((link) => (
                        <motion.div key={link.href} whileHover={{ scale: 1.05 }}>
                            <Button variant={link.variant} asChild>
                                <Link href={link.href}>{link.label}</Link>
                            </Button>
                        </motion.div>
                    ))}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="border-l pl-4 dark:border-gray-700"
                    >
                        <ModeToggle />
                    </motion.div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                <div className="pt-2 ">
                            <ModeToggle />
                        </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden border-t"
                >
                    <div className="container py-4 space-y-3">
                        {navLinks.map((link) => (
                            <div key={link.href} className="w-full">
                                <Button
                                    variant={link.variant}
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href={link.href}>{link.label}</Link>
                                </Button>
                            </div>
                        ))}
                        
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;