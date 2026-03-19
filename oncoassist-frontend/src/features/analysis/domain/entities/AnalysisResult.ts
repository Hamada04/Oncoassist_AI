export type CancerDataset = 'BLCA' | 'BRCA';
export type PredictionLabel = 'High-TMB' | 'Low-TMB' | 'Pre-menopause' | 'Post-menopause';

export interface DrugRecommendation {
  name: string;
  sensitivity: number;
}

export interface AnalysisResult {
  dataset: CancerDataset;
  prediction: PredictionLabel;
  confidence: number;
  clinicalNote: string;
  aucRoc: number;
  chartData: {
    fpr: number[];
    tpr: number[];
  };
  topGenes: string[];
  topDrugs: DrugRecommendation[];
}