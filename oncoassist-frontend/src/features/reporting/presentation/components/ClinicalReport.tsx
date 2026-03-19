import { motion } from 'framer-motion';
import { FileText, Download, ShieldCheck, Activity, Pill, ChevronRight } from 'lucide-react';
import RocChart from './RocChart';
interface ClinicalReportProps {
  data: any; // أو استخدم النوع AnalysisResult الذي عرفناه
}

const ClinicalReport: React.FC<ClinicalReportProps> = ({ data }) => {
  // بيانات تجريبية (Mock Data) لمحاكاة النتيجة
  const result = {
    dataset: "BLCA",
    prediction: "High-TMB",
    confidence: 0.94,
    aucRoc: 0.99,
    clinicalNote: "High TMB suggests significant immunotherapy benefit.",
    topGenes: [
      { name: "FGFR3", impact: 0.82 },
      { name: "TP53", impact: 0.61 },
      { name: "ERBB2", impact: 0.43 }
    ],
    drugs: [
      { name: "Pembrolizumab", sens: 0.84 },
      { name: "Atezolizumab", sens: 0.79 }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-5xl mx-auto p-6 space-y-6 pb-20"
    >
      {/* Header التقرير */}
      <div className="flex justify-between items-end border-b pb-6">
        <div>
          <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Clinical Analysis Result</span>
          <h1 className="text-4xl font-black text-slate-900 mt-1">OncoAssist AI Report</h1>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg">
          <Download size={18} /> Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* العمود الأيسر: النتيجة الأساسية */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
              <ShieldCheck size={48} className="text-emerald-500 opacity-20" />
            </div>
            <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-4">Primary Prediction</h3>
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-black text-blue-600">{result.prediction}</span>
              <span className="text-2xl font-bold text-emerald-500">{result.confidence * 100}% Confidence</span>
            </div>
            <p className="mt-6 text-slate-600 leading-relaxed text-lg border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-3 rounded-r-lg">
              {result.clinicalNote}
            </p>
          </div>

          {/* منحنى ROC */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <Activity className="text-blue-500" /> Model Performance (AUC-ROC)
              </h3>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">AUC: {result.aucRoc}</span>
            </div>
            <RocChart fpr={[0, 0.1, 0.2, 0.5, 1]} tpr={[0, 0.7, 0.85, 0.95, 1]} />
          </div>
        </div>

        {/* العمود الأيمن: الجينات والأدوية */}
        <div className="space-y-6">
          {/* الجينات الأكثر تأثيراً */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
               Top Genomic Drivers
            </h3>
            <div className="space-y-4">
              {result.topGenes.map((gene) => (
                <div key={gene.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-mono">{gene.name}</span>
                    <span className="text-slate-400">{(gene.impact * 100).toFixed(0)}% Impact</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${gene.impact * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* التوصيات الدوائية */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800">
              <Pill className="text-rose-500" /> Suggested Drugs (GDSC)
            </h3>
            <div className="space-y-3">
              {result.drugs.map((drug) => (
                <div key={drug.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                  <div>
                    <p className="font-bold text-slate-800">{drug.name}</p>
                    <p className="text-xs text-slate-500">Sensitivity: {drug.sens}</p>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClinicalReport;