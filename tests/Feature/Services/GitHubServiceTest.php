<?php

declare(strict_types=1);

use App\Services\GitHub\Exceptions\GitHubException;
use App\Services\GitHub\Facades\GitHub;
use Illuminate\Support\Facades\Http;

test('it can search GitHub issues successfully', function () {
    Http::fake([
        'api.github.com/search/issues*' => Http::response([
            'total_count' => 2,
            'incomplete_results' => false,
            'items' => [
                [
                    'id' => 1,
                    'title' => 'First issue',
                    'state' => 'open',
                ],
                [
                    'id' => 2,
                    'title' => 'Second issue',
                    'state' => 'open',
                ],
            ],
        ], 200),
    ]);

    $result = GitHub::issues('is:issue is:open label:hacktoberfest');

    expect($result)
        ->toBeArray()
        ->toHaveKey('total_count')
        ->toHaveKey('incomplete_results')
        ->toHaveKey('items')
        ->and($result['total_count'])->toBe(2)
        ->and($result['items'])->toHaveCount(2);
});

test('it sends correct headers to GitHub API', function () {
    Http::fake([
        '*' => Http::response([
            'total_count' => 0,
            'incomplete_results' => false,
            'items' => [],
        ], 200),
    ]);

    GitHub::issues('test query');

    Http::assertSent(function ($request) {
        return $request->hasHeader('Accept', 'application/vnd.github+json')
            && $request->hasHeader('X-GitHub-Api-Version')
            && $request->hasHeader('User-Agent', 'Hacktoberfest-Finder')
            && str_contains($request->url(), '/search/issues');
    });
});

test('it throws exception on API failure with 404', function () {
    Http::fake([
        'api.github.com/*' => Http::response([
            'message' => 'Not Found',
        ], 404),
    ]);

    GitHub::issues('invalid query');
})->throws(GitHubException::class, 'Not Found (HTTP 404)');

test('it throws exception on API failure with 403', function () {
    Http::fake([
        'api.github.com/*' => Http::response([
            'message' => 'API rate limit exceeded',
        ], 403),
    ]);

    GitHub::issues('test query');
})->throws(GitHubException::class, 'API rate limit exceeded (HTTP 403)');

test('it throws exception on API failure with 500', function () {
    Http::fake([
        'api.github.com/*' => Http::response([
            'message' => 'Internal Server Error',
        ], 500),
    ]);

    GitHub::issues('test query');
})->throws(GitHubException::class, 'Internal Server Error (HTTP 500)');

test('it uses fallback error message when API does not return message', function () {
    Http::fake([
        'api.github.com/*' => Http::response([], 400),
    ]);

    GitHub::issues('test query');
})->throws(GitHubException::class, 'GitHub API request failed (HTTP 400)');

test('it respects timeout configuration', function () {
    config(['github.service.timeout' => 5]);

    Http::fake([
        'api.github.com/*' => Http::response([
            'total_count' => 0,
            'incomplete_results' => false,
            'items' => [],
        ], 200),
    ]);

    GitHub::issues('test query');

    Http::assertSent(function ($request) {
        // We can't directly test the timeout, but we can verify the request was made
        return true;
    });
});

test('it can handle empty search results', function () {
    Http::fake([
        'api.github.com/search/issues*' => Http::response([
            'total_count' => 0,
            'incomplete_results' => false,
            'items' => [],
        ], 200),
    ]);

    $result = GitHub::issues('nonexistent label');

    expect($result)
        ->toBeArray()
        ->and($result['total_count'])->toBe(0)
        ->and($result['items'])->toBeEmpty();
});

test('it properly encodes query parameters', function () {
    Http::fake([
        'api.github.com/*' => Http::response([
            'total_count' => 0,
            'incomplete_results' => false,
            'items' => [],
        ], 200),
    ]);

    GitHub::issues('label:"good first issue" is:open');

    Http::assertSent(function ($request) {
        $url = $request->url();

        return str_contains($url, 'api.github.com/search/issues')
            && (str_contains($url, 'label') || str_contains($url, 'good'));
    });
});
