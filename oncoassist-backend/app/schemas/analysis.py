from pydantic import BaseModel
from typing import List, Optional

class DrugRecommendation(BaseModel):
    name: str
    sensitivity: float

class AnalysisResponse(BaseModel):
    dataset: str
    prediction: str
    confidence: float
    clinical_note: str
    auc_roc: float
    fpr: List[float]
    tpr: List[float]
    top_genes: List[str]
    top_drugs: List[DrugRecommendation]