<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | GitHub API Base URL
    |--------------------------------------------------------------------------
    |
    | The base URL for the GitHub API. By default, this is the public GitHub
    | API endpoint. You can change this if you're using GitHub Enterprise.
    |
    */

    'base_url' => env('GITHUB_API_URL', 'https://api.github.com'),

    /*
    |--------------------------------------------------------------------------
    | GitHub API Version
    |--------------------------------------------------------------------------
    |
    | The GitHub API version to use. This is sent in the Accept header.
    |
    */

    'version' => env('GITHUB_API_VERSION', '2022-11-28'),

    /*
    |--------------------------------------------------------------------------
    | Request Timeout
    |--------------------------------------------------------------------------
    |
    | The maximum number of seconds to wait for a response from GitHub.
    |
    */

    'timeout' => env('GITHUB_TIMEOUT', 10),

    /*
    |--------------------------------------------------------------------------
    | User Agent
    |--------------------------------------------------------------------------
    |
    | The User-Agent header to send with requests to GitHub. GitHub requires
    | all API requests to include a valid User-Agent header.
    |
    */

    'user_agent' => env('GITHUB_USER_AGENT', 'Hacktoberfest-Finder'),

];
