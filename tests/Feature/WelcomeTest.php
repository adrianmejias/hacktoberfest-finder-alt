<?php

use App\Actions\GitHub\SearchIssue;
use Inertia\Testing\AssertableInertia as Assert;

it('can search without language parameter', function () {
    $mock = $this->mock(SearchIssue::class);
    $mock->shouldReceive('search')
        ->once()
        ->andReturn([
            'total_count' => 2,
            'incomplete_results' => false,
            'items' => [
                [
                    'title' => 'Test Issue 1',
                    'html_url' => 'https://github.com/test/repo/issues/1',
                    'repository_url' => 'https://api.github.com/repos/test/repo',
                    'updated_at' => '2025-01-01T00:00:00Z',
                    'labels' => [
                        ['name' => 'hacktoberfest'],
                        ['name' => 'good first issue'],
                    ],
                    'body' => 'Test issue description 1',
                ],
                [
                    'title' => 'Test Issue 2',
                    'html_url' => 'https://github.com/test/repo/issues/2',
                    'repository_url' => 'https://api.github.com/repos/test/repo',
                    'updated_at' => '2025-01-02T00:00:00Z',
                    'labels' => [],
                    'body' => 'Test issue description 2',
                ],
            ],
        ]);

    $this->instance(SearchIssue::class, $mock);

    $response = $this->withoutMiddleware()
        ->post('/search', [
            'q' => 'test query',
        ]);

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Welcome')
        ->has('query')
        ->where('query', 'test query')
        ->has('results')
        ->has('results.total_amount')
        ->where('results.total_amount', 2)
        ->has('results.items', 2)
        ->has('results.items.0', fn (Assert $item) => $item
            ->where('repo_title', 'Test Issue 1')
            ->where('repo_url', 'https://github.com/test/repo/issues/1')
            ->where('repo_name', 'test/repo')
            ->where('repo_link', 'https://github.com/test/repo')
            ->where('updated_at', '2025-01-01T00:00:00Z')
            ->where('labels', ['hacktoberfest', 'good first issue'])
            ->where('body', 'Test issue description 1')
        )
    );
});

it('can search with null language parameter', function () {
    $mock = $this->mock(SearchIssue::class);
    $mock->shouldReceive('search')
        ->once()
        ->with(Mockery::on(
            fn ($arg) => $arg['q'] === 'test query' && $arg['language'] === null
        ), true)
        ->andReturn([
            'total_count' => 0,
            'incomplete_results' => false,
            'items' => [],
        ]);

    $this->instance(SearchIssue::class, $mock);

    $response = $this->withoutMiddleware()
        ->post('/search', [
            'q' => 'test query',
            'language' => null,
        ]);

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Welcome')
        ->where('query', 'test query')
        ->where('selectedLanguage', null)
        ->where('results.total_amount', 0)
        ->has('results.items', 0)
    );
});

it('can search with specific language parameter', function () {
    $mock = $this->mock(SearchIssue::class);
    $mock->shouldReceive('search')
        ->once()
        ->with(Mockery::on(
            fn ($arg) => $arg['q'] === 'test query' && $arg['language'] === 'JavaScript'
        ), true)
        ->andReturn([
            'total_count' => 1,
            'incomplete_results' => false,
            'items' => [
                [
                    'title' => 'JavaScript Issue',
                    'html_url' => 'https://github.com/test/js-repo/issues/1',
                    'repository_url' => 'https://api.github.com/repos/test/js-repo',
                    'updated_at' => '2025-01-03T00:00:00Z',
                    'labels' => [['name' => 'javascript']],
                    'body' => 'A JavaScript related issue',
                ],
            ],
        ]);

    $this->instance(SearchIssue::class, $mock);

    $response = $this->withoutMiddleware()
        ->post('/search', [
            'q' => 'test query',
            'language' => 'JavaScript',
        ]);

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Welcome')
        ->where('query', 'test query')
        ->where('selectedLanguage', 'JavaScript')
        ->where('results.total_amount', 1)
        ->where('results.incomplete_results', false)
        ->has('results.items.0', fn (Assert $item) => $item
            ->where('repo_title', 'JavaScript Issue')
            ->where('repo_url', 'https://github.com/test/js-repo/issues/1')
            ->where('repo_name', 'test/js-repo')
            ->where('repo_link', 'https://github.com/test/js-repo')
            ->where('updated_at', '2025-01-03T00:00:00Z')
            ->where('labels', ['javascript'])
            ->where('body', 'A JavaScript related issue')
        )
    );
});
