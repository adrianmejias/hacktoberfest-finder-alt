<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\McpController;
use App\Http\Controllers\Search\SearchController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class)->name('home');

Route::post('/search', SearchController::class)
    ->middleware(['throttle:10,1'])
    ->name('search');

Route::get('mcp', McpController::class)
    ->name('mcp');

Route::get('dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

require __DIR__.'/settings.php';
