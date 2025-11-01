<?php

declare(strict_types=1);

namespace App\Services\GitHub;

use App\Services\GitHub\Contracts\GitHubContract;
use Illuminate\Support\ServiceProvider;

class GitHubServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(GitHubContract::class, function ($app) {
            return new GitHub(
                baseUri: config('github.base_uri', 'https://api.github.com'),
                languages: config('github.languages', []),
                defaultQuery: config('github.default_query', [
                    'type' => 'issue',
                    'state' => 'open',
                ])
            );
        });

        $this->app->alias(GitHubContract::class, 'github');
    }
}
