<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; // <--- INI PENTING BUAT NEMBAK PYTHON

class PredictionController extends Controller
{
    public function predict()
    {
        // 1. Ceritanya ini data penjualan 7 hari terakhir dari Database
        // (Nanti kalau mau canggih, tinggal ganti ini pake query DB)
        $dummySalesHistory = [10, 12, 11, 15, 18, 20, 22];

        // 2. Tembak API Python (Microservice)
        try {
            $response = Http::post('http://127.0.0.1:8000/predict', [
                'sales_history' => $dummySalesHistory
            ]);

            // 3. Ambil jawaban dari Python
            $aiResult = $response->json();

            // 4. Balikin ke Frontend (React)
            return response()->json([
                'success' => true,
                'product_name' => 'Kopi Kapal Api (Contoh)',
                'ai_analysis' => $aiResult
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal konek ke AI Service. Pastikan Python jalan!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}