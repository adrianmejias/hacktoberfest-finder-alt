<?php

use App\Services\GitHub\GitHub;
use App\Services\GitHub\Exceptions\GitHubException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

beforeEach(function () {
    $this->github = new GitHub(
        baseUri: config('github.base_uri', 'https://api.github.com'),
        languages: config('github.languages', []),
        defaultQuery: config('github.default_query', [
            'type' => 'issue',
            'state' => 'open',
        ])
    );
});

it('can set and get base URI', function () {
    $this->github->setBaseUri('https://custom.api.github.com/');

    expect($this->github->getBaseUri())->toBe('https://custom.api.github.com');
});

it('trims trailing slashes from base URI', function () {
    $this->github->setBaseUri('https://custom.api.github.com/');

    expect($this->github->getBaseUri())->toBe('https://custom.api.github.com');
});

it('can set and get page', function () {
    $this->github->setPage(3);

    expect($this->github->getPage())->toBe(3);
});

it('has default page value of 1', function () {
    expect($this->github->getPage())->toBe(1);
});

it('can set and get language', function () {
    $this->github->setLanguage('C++');

    expect($this->github->getLanguage())->toBe('c%2b%2b');
});

it('encodes special characters in language', function () {
    $this->github->setLanguage('C#');

    expect($this->github->getLanguage())->toBe('c%23');
});

it('converts language to lowercase', function () {
    $this->github->setLanguage('JavaScript');

    expect($this->github->getLanguage())->toBe('javascript');
});

it('can set and get labels', function () {
    $this->github->setLabels(['good first issue', 'help wanted']);

    expect($this->github->getLabels())->toBe('good first issue,help wanted');
});

it('converts labels to lowercase', function () {
    $this->github->setLabels(['Good First Issue', 'Help Wanted']);

    expect($this->github->getLabels())->toBe('good first issue,help wanted');
});

it('can set and get comments', function () {
    $this->github->setComments(0);

    expect($this->github->getComments())->toBe(0);
});

it('can chain setter methods', function () {
    $result = $this->github
        ->setLanguage('PHP')
        ->setLabels(['bug'])
        ->setComments(5)
        ->setPage(2);

    expect($result)->toBe($this->github);
});

it('generates correct URL with query parameters', function () {
    $url = $this->github
        ->setLanguage('JavaScript')
        ->setLabels(['good first issue'])
        ->setPage(2)
        ->getUrl();

    expect($url)->toContain('https://api.github.com/search/issues')
        ->and($url)->toContain('page=2')
        ->and($url)->toContain('type:issue')
        ->and($url)->toContain('state:open')
        ->and($url)->toContain('language:javascript')
        ->and($url)->toContain('labels:good first issue');
});

it('can execute a GitHub API request', function () {
    Http::fake([
        'api.github.com/*' => Http::response([
            'total_count' => 2,
            'items' => [
                [
                    'id' => 1,
                    'title' => 'Test Issue 1',
                    'repository_url' => 'https://api.github.com/repos/owner/repo1',
                    'updated_at' => now()->toIso8601String(),
                ],
                [
                    'id' => 2,
                    'title' => 'Test Issue 2',
                    'repository_url' => 'https://api.github.com/repos/owner/repo2',
                    'updated_at' => now()->toIso8601String(),
                ],
            ],
        ], 200),
    ]);

    $response = $this->github
        ->setLanguage('JavaScript')
        ->setLabels(['good first issue'])
        ->setComments(0)
        ->setPage(1)
        ->execute();

    expect($response)->toBeInstanceOf(Collection::class)
        ->and($response->has('items'))->toBeTrue()
        ->and($response->has('total_count'))->toBeTrue()
        ->and($response->get('items'))->toHaveCount(2)
        ->and($response->get('items')->first())->toHaveKey('repo_title');
});

it('throws exception when API request fails', function () {
    Http::fake([
        'api.github.com/*' => Http::response([], 500),
    ]);

    $this->github->execute();
})->throws(GitHubException::class, 'Failed to retrieve issues from GitHub API');

it('throws exception when API response is missing items key', function () {
    Http::fake([
        'api.github.com/*' => Http::response([
            'total_count' => 0,
        ], 200),
    ]);

    $this->github->execute();
})->throws(GitHubException::class, 'Invalid response from GitHub API: missing items key');

it('can get all languages from config', function () {
    $languages = $this->github->getAllLanguages();

    expect($languages)->toBeArray()
        ->and($languages)->toContain('JavaScript')
        ->and($languages)->toContain('C++')
        ->and($languages)->toContain('Ruby')
        ->and(count($languages))->toBeGreaterThan(100);
});

it('can validate if language exists', function () {
    expect($this->github->isValidLanguage('JavaScript'))->toBeTrue()
        ->and($this->github->isValidLanguage('Python'))->toBeTrue()
        ->and($this->github->isValidLanguage('C++'))->toBeTrue()
        ->and($this->github->isValidLanguage('PHP'))->toBeTrue();
});

it('returns false for invalid language', function () {
    expect($this->github->isValidLanguage('NotARealLanguage'))->toBeFalse()
        ->and($this->github->isValidLanguage('FakeScript'))->toBeFalse()
        ->and($this->github->isValidLanguage(''))->toBeFalse();
});

it('can set language with validation enabled', function () {
    $this->github->setLanguage('JavaScript', true);

    expect($this->github->getLanguage())->toBe('javascript');
});

it('throws exception when setting invalid language with validation', function () {
    $this->github->setLanguage('NotARealLanguage', true);
})->throws(GitHubException::class, 'Invalid language: NotARealLanguage');
