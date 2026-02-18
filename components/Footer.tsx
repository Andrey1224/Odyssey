import React from "react";
import { Phone, MapPin } from "lucide-react";

export const Footer = () => (
    <footer className="bg-slate-900 text-slate-300 py-12 md:py-20 pb-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-lg">
            <div className="space-y-6">
                <h4 className="text-white font-serif text-2xl font-bold tracking-tight">Odyssey Baths</h4>
                <div className="flex gap-4">
                    <MapPin className="shrink-0 mt-1 text-teal-400" />
                    <p className="text-slate-300">
                        123 Accessibility Lane,<br />
                        Bath City, BA1 1AA
                    </p>
                </div>
                <div className="flex gap-4">
                    <Phone className="shrink-0 mt-1 text-teal-400" />
                    <div>
                        <p className="font-bold text-white text-xl">0800 123 4567</p>
                        <p className="text-sm text-slate-400 mt-1">Mon-Fri 9am - 5pm</p>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="text-white font-bold text-xl mb-6">Our Products</h4>
                <ul className="space-y-4">
                    <li><a href="/walk-in-baths" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Walk-in Baths</a></li>
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Walk-in Showers</a></li>
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Wet Rooms</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold text-xl mb-6">Customer Care</h4>
                <ul className="space-y-4">
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">About Our Family</a></li>
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Read Reviews</a></li>
                    <li><a href="/faq" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">FAQ</a></li>
                    <li><a href="/contact" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Contact Us</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold text-xl mb-6">Legal</h4>
                <ul className="space-y-4">
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Returns Policy</a></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} Odyssey Baths Ltd. Registered in UK.
        </div>
    </footer>
);
