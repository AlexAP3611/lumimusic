<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('abc123.'),
            'role' => 'admin'
            ]
        );
        User::firstOrCreate(
            ['email' => 'test@test.com'],
            [
            'name' => 'Test',
            'email' => 'test@test.com',
            'password' => bcrypt('abc123.'),
            'role' => 'user'
            ]
        );
    }
}
