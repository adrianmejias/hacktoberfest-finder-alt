<?php

declare(strict_types=1);

namespace App\Services\GitHub\Facades;

use App\Services\GitHub\Contracts\GitHubContract;
use Illuminate\Support\Facades\Facade;

class GitHub extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return GitHubContract::class;
    }
}
