<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Menampilkan semua produk (untuk halaman List)
     */
    public function index()
    {
        $products = Product::all();
        // Bungkus dengan 'data' agar konsisten dengan frontend
        return response()->json(['data' => $products]);
    }

    /**
     * Menyimpan produk baru (untuk halaman Create)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'description' => 'nullable|string',
        ]);

        $product = Product::create($validated);

        return response()->json(['data' => $product], 201);
    }

    /**
     * Menampilkan 1 produk detail (PENTING UNTUK HALAMAN EDIT)
     */
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json(['data' => $product]);
    }

    /**
     * Mengupdate produk (PENTING UNTUK TOMBOL SIMPAN EDIT)
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'description' => 'nullable|string',
        ]);

        $product->update($validated);

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product
        ]);
    }

    /**
     * Menghapus produk
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }

    // --- PERBAIKAN DI SINI UNTUK CHART ---
    public function dashboardStats()
    {
        $totalProducts = Product::count();
        $totalValue = Product::sum(DB::raw('price * stock'));
        $lowStock = Product::where('stock', '<', 10)->count();
        
        // Ambil data kategori dan jumlahnya menggunakan get() bukan pluck() dulu
        $categoriesData = Product::select('category', DB::raw('count(*) as total'))
            ->groupBy('category')
            ->get();

        // Pisahkan Label dan Data agar Chart.js bisa membacanya
        $labels = $categoriesData->pluck('category');
        $data = $categoriesData->pluck('total');

        return response()->json([
            'total_products' => $totalProducts,
            'total_value' => $totalValue,
            'low_stock' => $lowStock,
            // Struktur baru untuk chart
            'chart' => [
                'labels' => $labels,
                'data' => $data
            ]
        ]);
    }
}