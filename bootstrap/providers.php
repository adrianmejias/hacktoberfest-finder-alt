<?php

use App\Providers\AppServiceProvider;
use App\Providers\FortifyServiceProvider;
use App\Services\GitHub\Providers\GitHubServiceProvider;

return [
    AppServiceProvider::class,
    FortifyServiceProvider::class,
    GitHubServiceProvider::class,
];
