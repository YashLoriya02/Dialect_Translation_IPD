import os
import pandas as pd
import faiss
import joblib
from sentence_transformers import SentenceTransformer

EMBEDDING_CACHE_PATH = "corpus_embeddings.joblib"
DATA_PATH = "data/Marathi_Full_Standardized.csv"

def init_embeddings():
    df = pd.read_csv(DATA_PATH)
    df = df[["Dialect_Sentence", "English_Translation", "Hindi_Translation"]].dropna().reset_index(drop=True)
    df.columns = ["query", "english", "hindi"]

    model = SentenceTransformer("intfloat/multilingual-e5-base")

    if os.path.exists(EMBEDDING_CACHE_PATH):
        print("🔁 Loading cached embeddings...")
        corpus_embeddings = joblib.load(EMBEDDING_CACHE_PATH)
    else:
        print("🧠 Computing and saving embeddings...")
        corpus_embeddings = model.encode(df["query"].tolist(), show_progress_bar=True, convert_to_numpy=True)
        joblib.dump(corpus_embeddings, EMBEDDING_CACHE_PATH)

    embedding_dim = corpus_embeddings.shape[1]
    index = faiss.IndexFlatL2(embedding_dim)
    index.add(corpus_embeddings)

    return df, index, model
