import { FileText } from "lucide-react";

const ProblemDescription = ({ description }) => {
  if (!description) return null;

  return (
    <div className="mb-10 animate-fade-in">
      
      <div className="flex items-center gap-2 mb-4 select-none">
        <FileText size={18} className="text-blue-400" />
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Problem Statement
        </h2>
      </div>

      <div className="text-sm sm:text-base text-slate-300 leading-relaxed sm:leading-8 whitespace-pre-wrap font-medium">
        {description}
      </div>

    </div>
  );
};

export default ProblemDescription;