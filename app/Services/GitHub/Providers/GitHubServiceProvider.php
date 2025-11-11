<?php

declare(strict_types=1);

namespace App\Services\GitHub\Providers;

use App\Services\GitHub\Contracts\GitHubContract;
use App\Services\GitHub\GitHubService;
use Illuminate\Support\ServiceProvider;

class GitHubServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(GitHubContract::class, function ($app) {
            return new GitHubService(
                http: $app->make('Illuminate\Http\Client\Factory'),
                baseUrl: config('github.service.base_url'),
                timeout: config('github.service.timeout'),
                userAgent: config('github.service.user_agent'),
                version: config('github.service.version'),
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
