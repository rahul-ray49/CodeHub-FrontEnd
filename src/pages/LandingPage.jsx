import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import NavigationBar2 from "./NavigationBar2";
import { 
  BookOpen, BadgeCheck, History, CircleHelp, Bot, SquarePlus, 
  FilePenLine, Flame, CodeXml, BrainCircuit, BarChart3, ListChecks,
  Video, Rocket, UserPlus 
} from "lucide-react";

const LandingPage = () => {
  const { user } = useSelector((state) => state?.auth);

  const commonOptions = [
    { icon: <ListChecks />, color: "from-sky-500 to-blue-600", routeTo: "/problemSection", heading: "Practice Problems", desc: "Master specific areas" },
    { icon: <Flame />, color: "from-orange-500 to-red-600", routeTo: "/problem-of-the-day", heading: "Daily Challenge", desc: "Stay consistent" },
    { icon: <History />, color: "from-pink-500 to-rose-600", routeTo: "/submission-history", heading: "Submissions", desc: "Review past attempts" },
    { icon: <BadgeCheck />, color: "from-emerald-400 to-teal-500", routeTo: "/solved", heading: "Solved Problems", desc: "View all accepted solutions and track your completed challenges." },
    { icon: <CircleHelp />, color: "from-amber-500 to-yellow-600", routeTo: "/help-page", heading: "Help Center", desc: "Get answers and support" },
  ];

  const adminOptions = [
    { icon: <SquarePlus />, color: "from-green-500 to-emerald-600", routeTo: "/admin-panel", heading: "Create Problem", desc: "Add new coding problems, examples, constraints and test cases." },
    { icon: <FilePenLine />, color: "from-sky-500 to-blue-600", routeTo: "/updateproblems", heading: "Update Problems", desc: "Edit existing problems, update statements and manage test cases." },
    { icon: <UserPlus />, color: "from-orange-500 to-red-600", routeTo: "/admin-register", heading: "Register Admin", desc: "Create a new administrator account to manage platform settings." },
    { icon: <Video />, color: "from-cyan-500 to-blue-600", routeTo: "/admin/video/upload", heading: "Video Solution", desc: "Upload detailed video explanations to help users understand logic." },
  ];

  const displayOptions = user?.role === "admin" ? [...commonOptions, ...adminOptions] : commonOptions;

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100">
      <NavigationBar2 />

      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <header className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" /> Next-Gen Coding Environment
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            CodeHub: Practice Smarter.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Integrated AI assistance, real-time compilation, and comprehensive tracking to master Data Structures and Algorithms.
          </p>
        </header>

        {/* Why Choose CodeHub Section */}
        <section className="mb-24 px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Everything you need to <span className="text-blue-500">Master DSA</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From practicing problems to deep-diving into video editorials, CodeHub is built to accelerate your learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <BookOpen />, title: "Master Algorithms", desc: "Tackle a vast library of challenges designed for top-tier interviews.", color: "text-blue-400" },
              { icon: <BrainCircuit />, title: "AI Analysis", desc: "Get real-time feedback on your code's time and space complexity.", color: "text-purple-400" },
              { icon: <Video />, title: "Video Editorials", desc: "Stuck? Watch expert video explanations to grasp complex logic.", color: "text-emerald-400" },
              { icon: <CircleHelp />, title: "Learn & Grow", desc: "Build resilience with guided solutions after you've tried your best.", color: "text-amber-400" }
            ].map((item, idx) => (
              <div key={idx} className="group relative bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-slate-600 transition-all duration-300">
                <div className={`mb-6 p-4 rounded-2xl bg-slate-800/50 inline-block ${item?.color}`}>
                  {item?.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item?.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item?.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Explore Section Header */}
        <div className="text-center mb-16">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white">Explore Features</h2>
          <p className="text-slate-500 mt-2">Navigate through your personalized dashboard</p>
        </div>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {displayOptions?.map((item, idx) => (
            <Link key={idx} to={item?.routeTo} className="group p-8 rounded-3xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 hover:border-slate-700 transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item?.color} flex items-center justify-center mb-6 shadow-lg shadow-black/20`}>
                <div className="text-white">{item?.icon}</div>
              </div>
              <h2 className="text-xl font-bold mb-2">{item?.heading}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{item?.desc}</p>
            </Link>
          ))}
        </section>

        {/* Help/AI Section */}
        <section className="bg-slate-900/30 border border-slate-800 p-10 rounded-3xl flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-4">Need Help? Ask CodeHub AI</h3>
            <p className="text-slate-400 mb-6">Supercharge your learning with our specialized coding assistant.</p>
            <ul className="space-y-3">
              {['Explain complex errors', 'Optimize your algorithms', 'Learn core concepts'].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300"><BadgeCheck className="w-5 h-5 text-emerald-500" /> {text}</li>
              ))}
            </ul>
          </div>
          <Link to="/chat/ai" className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-transform hover:scale-105 flex items-center gap-2">
            <Bot /> Start Chatting
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;