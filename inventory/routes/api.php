<?php
use App\Http\Controllers\Api\PredictionController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// Public routes (Login/Register)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/predict-stock', [PredictionController::class, 'predict']);
// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('products', ProductController::class);
    Route::get('/dashboard-stats', [ProductController::class, 'dashboardStats']);
    Route::post('/logout', [AuthController::class, 'logout']);
});