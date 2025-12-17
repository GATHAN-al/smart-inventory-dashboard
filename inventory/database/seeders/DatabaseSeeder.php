<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Buat User Admin untuk Login
        // Menggunakan updateOrCreate agar tidak error jika dijalankan berulang
        User::updateOrCreate(
            ['email' => 'admin@example.com'], // Cek berdasarkan email
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
            ]
        );

        // 2. Buat Data Produk Dummy
        $categories = ['Electronics', 'Furniture', 'Clothing', 'Books'];
        
        foreach ($categories as $category) {
            // Pastikan Anda sudah membuat ProductFactory sebelumnya
            Product::factory(5)->create(['category' => $category]);
        }
    }
}