<?php

use App\Actions\GitHub\SearchIssue;

beforeEach(function () {
    $this->searchIssue = app(SearchIssue::class);
});

test('generate query string', function () {
    $input = [
        'language' => 'php',
        'label' => 'hacktoberfest',
        'comments' => '>=0',
    ];

    $reflection = new ReflectionClass($this->searchIssue);
    $method = $reflection->getMethod('getQueryString');
    $method->setAccessible(true);

    $queryString = $method->invokeArgs($this->searchIssue, [$input]);

    expect($queryString)->toBe('created:>'.now()->startOfYear()->format('Y-m-d').' state:open language:php comments:>=0 label:hacktoberfest');
});

test('search issues with valid input', function () {
    $results = $this->searchIssue->search([
        'language' => 'php',
        'label' => 'hacktoberfest',
        'comments' => '>=0',
    ]);

    expect($results)->toBeArray();
    expect($results)->toHaveKeys(['total_count', 'incomplete_results', 'items']);
    expect($results['total_count'])->toBeGreaterThanOrEqual(1);
    expect($results['items'])->toBeArray();
});

test('search issues with invalid input', function () {
    $results = $this->searchIssue->search([
        'language' => 'invalid_language',
        'label' => 'invalid_label',
        'comments' => 'invalid_comments',
    ]);

    expect($results)->toBeArray();
    expect($results)->toHaveKeys(['total_count', 'incomplete_results', 'items', 'error']);
    expect($results['total_count'])->toBe(0);
    expect($results['items'])->toBeArray();
    expect($results['error'])->toBe('Validation Failed: Field "q" is invalid, for resource "Search": ""invalid_comments" is not a numeric value - please provide an integer value"');
});
