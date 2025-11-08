<?php

declare(strict_types=1);

/*
 * This file is part of Laravel GitHub.
 *
 * (c) Graham Campbell <hello@gjcampbell.co.uk>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

return [

    /*
    |--------------------------------------------------------------------------
    | Default Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the connections below you wish to use as
    | your default connection for all work. Of course, you may use many
    | connections at once using the manager class.
    |
    */

    'default' => env('GITHUB_CONNECTION', 'main'),

    /*
    |--------------------------------------------------------------------------
    | GitHub Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the connections setup for your application. Example
    | configuration has been included, but you may add as many connections as
    | you would like. Note that the 5 supported authentication methods are:
    | "application", "jwt", "none", "private", and "token".
    |
    */

    'connections' => [

        'main' => [
            'method' => 'token',
            'token' => env('GITHUB_TOKEN', 'your-github-token'),
            'backoff' => env('GITHUB_BACKOFF_ENABLED', false),
            'cache' => env('GITHUB_CACHE_ENABLED', false),
            'version' => env('GITHUB_VERSION', 'v3'),
            'enterprise' => env('GITHUB_ENTERPRISE_ENABLED', false),
        ],

        'app' => [
            'method' => 'application',
            'clientId' => env('GITHUB_CLIENT_ID', 'your-client-id'),
            'clientSecret' => env('GITHUB_CLIENT_SECRET', 'your-client-secret'),
            'backoff' => env('GITHUB_BACKOFF_ENABLED', false),
            'cache' => env('GITHUB_CACHE_ENABLED', false),
            'version' => env('GITHUB_VERSION', 'v3'),
            'enterprise' => env('GITHUB_ENTERPRISE_ENABLED', false),
        ],

        'jwt' => [
            'method' => 'jwt',
            'token' => env('GITHUB_JWT_TOKEN', 'your-jwt-token'),
            'backoff' => env('GITHUB_BACKOFF_ENABLED', false),
            'cache' => env('GITHUB_CACHE_ENABLED', false),
            'version' => env('GITHUB_VERSION', 'v3'),
            'enterprise' => env('GITHUB_ENTERPRISE_ENABLED', false),
        ],

        'private' => [
            'method' => 'private',
            'appId' => env('GITHUB_APP_ID', 'your-github-app-id'),
            'keyPath' => env('GITHUB_PRIVATE_KEY_PATH', 'your-private-key-path'),
            'key' => env('GITHUB_PRIVATE_KEY_CONTENT', 'your-private-key-content'),
            'passphrase' => env('GITHUB_PRIVATE_KEY_PASSPHRASE', null),
            'backoff' => env('GITHUB_BACKOFF_ENABLED', false),
            'cache' => env('GITHUB_CACHE_ENABLED', false),
            'version' => env('GITHUB_VERSION', 'v3'),
            'enterprise' => env('GITHUB_ENTERPRISE_ENABLED', false),
        ],

        'none' => [
            'method' => 'none',
            'backoff' => env('GITHUB_BACKOFF_ENABLED', false),
            'cache' => env('GITHUB_CACHE_ENABLED', false),
            'version' => env('GITHUB_VERSION', 'v3'),
            'enterprise' => env('GITHUB_ENTERPRISE_ENABLED', false),
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | HTTP Cache
    |--------------------------------------------------------------------------
    |
    | Here are each of the cache configurations setup for your application.
    | Only the "illuminate" driver is provided out of the box. Example
    | configuration has been included.
    |
    */

    'cache' => [

        'main' => [
            'driver' => 'illuminate',
            'connector' => env('GITHUB_CACHE_CONNECTOR', null), // null means use default driver
            'min' => env('GITHUB_CACHE_MIN', 43200),
            'max' => env('GITHUB_CACHE_MAX', 172800),
        ],

        'app' => [
            'driver' => 'illuminate',
            'connector' => env('GITHUB_CACHE_CONNECTOR', null),
            'min' => env('GITHUB_CACHE_MIN', 43200),
            'max' => env('GITHUB_CACHE_MAX', 172800),
        ],

        'jwt' => [
            'driver' => 'illuminate',
            'connector' => env('GITHUB_CACHE_CONNECTOR', null),
            'min' => env('GITHUB_CACHE_MIN', 43200),
            'max' => env('GITHUB_CACHE_MAX', 172800),
        ],

        'private' => [
            'driver' => 'illuminate',
            'connector' => env('GITHUB_CACHE_CONNECTOR', null),
            'min' => env('GITHUB_CACHE_MIN', 43200),
            'max' => env('GITHUB_CACHE_MAX', 172800),
        ],

        'none' => [
            'driver' => 'illuminate',
            'connector' => env('GITHUB_CACHE_CONNECTOR', null),
            'min' => env('GITHUB_CACHE_MIN', 43200),
            'max' => env('GITHUB_CACHE_MAX', 172800),
        ],

    ],

];
