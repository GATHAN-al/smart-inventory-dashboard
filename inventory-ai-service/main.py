from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

app = FastAPI()

# 1. Definisikan bentuk data yang boleh dikirim oleh Laravel
class SalesData(BaseModel):
    # Contoh input: [10, 12, 15, 14, 20] (Penjualan harian)
    sales_history: list[int] 

@app.get("/")
def read_root():
    return {"status": "AI Service is Running", "version": "1.0.0"}

@app.post("/predict")
def predict_sales(data: SalesData):
    # --- LOGIKA AI MULAI DI SINI ---
    
    # 1. Ambil data history dari request
    sales = data.sales_history
    
    # Kalau datanya dikit banget, gak usah prediksi
    if len(sales) < 3:
        return {"error": "Data kurang, butuh minimal 3 hari data penjualan."}

    # 2. Siapkan sumbu X (Hari ke-n) dan Y (Jumlah Penjualan)
    # X = [0, 1, 2, 3...]
    # Y = [10, 12, 15, 14...]
    X = np.array(range(len(sales))).reshape(-1, 1)
    y = np.array(sales)

    # 3. Latih Model (Training) pakai Linear Regression
    # "Pelajari pola garis lurus dari data ini"
    model = LinearRegression()
    model.fit(X, y)

    # 4. Prediksi 7 hari ke depan
    last_day = len(sales)
    future_days = np.array(range(last_day, last_day + 7)).reshape(-1, 1)
    predictions = model.predict(future_days)
    
    # Bulatkan hasil prediksi (gak mungkin jual 10.5 barang kan?)
    predicted_sales = [int(p) if p > 0 else 0 for p in predictions]
    total_restock_needed = sum(predicted_sales)

    # 5. Balikin hasil ke Laravel
    return {
        "status": "success",
        "trend": "increasing" if model.coef_[0] > 0 else "decreasing",
        "next_7_days_forecast": predicted_sales,
        "recommended_restock": total_restock_needed,
        "note": f"Berdasarkan tren, kamu perlu nyetok minimal {total_restock_needed} barang buat aman seminggu ke depan."
    }