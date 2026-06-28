import { Link } from "react-router-dom";
import {
  FaGithub,
  FaEnvelope,
  FaCode
} from "react-icons/fa";
import { SiGeeksforgeeks } from "react-icons/si";

const Footer = () => {
    return (
        <footer className="border-t border-slate-800 bg-[#0B1120] mt-20">

            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    

                    <div>

                        <div className="flex items-center gap-3">

                            <FaCode className="text-3xl text-blue-500" />

                            <h2 className="text-3xl font-bold text-white">
                                CodeHub
                            </h2>

                        </div>

                        <p className="text-slate-400 mt-3">
                            Empowering developers. Building the future.
                        </p>

                    </div>

                    

                    <div className="flex items-center gap-8 text-slate-300">

                        <a
                            href="https://github.com/rahul-ray49"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 hover:text-blue-400 transition"
                        >
                            <FaGithub />
                            GitHub
                        </a>

                        <a
                            href="https://www.geeksforgeeks.org/profile/rahulray7msk"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 hover:text-green-400 transition"
                        >
                            <SiGeeksforgeeks />
                            GeeksforGeeks
                        </a>

                        <a
                            href="mailto:rahulrayrazzzzz@gmail.com"
                            className="flex items-center gap-2 hover:text-yellow-400 transition"
                        >
                            <FaEnvelope />
                            Contact
                        </a>

                    </div>

                   

                    <div className="text-center md:text-right">

                        <p className="text-slate-300">
                            Made with
                            <span className="text-red-500 mx-1">❤️</span>
                            by
                            <span className="text-blue-400 font-semibold ml-1">
                               Rahul Kumar Ray
                            </span>
                        </p>

                        <p className="text-slate-500 mt-2 text-sm">
                            © 2026 CodeHub. All rights reserved.
                        </p>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;