<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Search\SearchController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class)->name('home');

Route::post('/search', SearchController::class)->name('search');

Route::get('dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
