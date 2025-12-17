<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    // GET /api/products
    public function index()
    {
        return response()->json(Product::latest()->get());
    }

    // POST /api/products
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'description' => 'nullable|string'
        ]);

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    // PUT /api/products/{id}
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'category' => 'string',
            'price' => 'numeric',
            'stock' => 'integer',
            'description' => 'nullable|string'
        ]);

        $product->update($validated);
        return response()->json($product);
    }

    // DELETE /api/products/{id}
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }

    // GET /api/dashboard-stats
    public function dashboardStats()
    {
        $totalProducts = Product::count();
        // Calculate Total Inventory Value (Price * Stock)
        $totalValue = Product::sum(DB::raw('price * stock'));
        $lowStock = Product::where('stock', '<', 10)->count();

        // Data for Bar Chart: Stock per Category
        $stockPerCategory = Product::select('category', DB::raw('sum(stock) as total_stock'))
            ->groupBy('category')
            ->get();

        return response()->json([
            'total_products' => $totalProducts,
            'total_value' => $totalValue,
            'low_stock' => $lowStock,
            'chart_data' => $stockPerCategory
        ]);
    }
}
