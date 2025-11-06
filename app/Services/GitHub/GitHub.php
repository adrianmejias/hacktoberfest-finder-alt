<?php

declare(strict_types=1);

namespace App\Services\GitHub;

use App\Services\GitHub\Contracts\GitHubContract;
use App\Services\GitHub\Exceptions\GitHubException;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class GitHub implements GitHubContract
{
    private string $baseUri;

    private array $languages;

    private int $page = 1;

    private int $perPage = 10;

    private array $q;

    public function __construct(
        string $baseUri,
        array $languages,
        array $defaultQuery
    ) {
        $this->baseUri = $baseUri;
        $this->languages = $languages;
        $this->q = $defaultQuery;
    }

    public function getAllLanguages(): array
    {
        return $this->languages;
    }

    public function isValidLanguage(string $language): bool
    {
        return in_array($language, $this->languages, true);
    }

    public function getBaseUri(): string
    {
        return $this->baseUri;
    }

    public function setBaseUri(string $baseUri): self
    {
        $this->baseUri = Str::of($baseUri)
            ->trim('/')
            ->toString();

        return $this;
    }

    public function setPage(int $page): self
    {
        $this->page = $page;

        return $this;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function setPerPage(int $perPage): self
    {
        $this->perPage = $perPage;

        return $this;
    }

    public function getPerPage(): int
    {
        return $this->perPage;
    }

    public function setLanguage(string $language, bool $validate = false): self
    {
        if ($validate && ! $this->isValidLanguage($language)) {
            throw new GitHubException("Invalid language: {$language}", 422);
        }

        $this->q['language'] = Str::of($language)
            ->replace('+', '%2B')
            ->replace('#', '%23')
            ->lower()
            ->toString();

        return $this;
    }

    public function getLanguage(): ?string
    {
        return $this->q['language'] ?? null;
    }

    public function setLabels(array $labels): self
    {
        $this->q['labels'] = Str::of(Arr::join($labels, ','))
            ->replace('+', '%2B')
            ->replace('#', '%23')
            ->lower()
            ->toString();

        return $this;
    }

    public function getLabels(): ?string
    {
        return $this->q['labels'] ?? null;
    }

    public function setComments(int $count): self
    {
        if (array_key_exists('comments', $this->q)) {
            unset($this->q['comments']);
        }

        $this->q['comments'] = $count;

        return $this;
    }

    public function getComments(): ?int
    {
        return $this->q['comments'] ?? null;
    }

    public function getUrl(?array $params = []): string
    {
        $q = Collection::make(array_merge($this->q, $params))
            ->map(fn ($value, $key) => "{$key}:{$value}")
            ->implode('+');

        return sprintf('%s/search/issues?page=%d&q=%s', $this->baseUri, $this->page, $q);
    }

    public function execute(?array $params = []): Collection
    {
        $response = Http::get($this->getUrl($params));

        if ($response->failed()) {
            throw new GitHubException(
                'Failed to retrieve issues from GitHub API',
                $response->status() ?: 500
            );
        }

        $data = $response->json();

        if (! isset($data['items'])) {
            throw new GitHubException('Invalid response from GitHub API: missing items key', 502);
        }

        $items = Collection::make($data['items'])->map(
            fn (array $item) => array_merge($item, [
                'repo_title' => Str::of($item['repository_url'])
                    ->afterLast('/')
                    ->toString(),
                'updated_at' => Carbon::parse($item['updated_at']),
            ])
        )->filter(function ($value, $key) {
            if ($key === 'items') {
                return Collection::make($value)->filter(function ($item) {
                    return $item['updated_at']->isCurrentYear();
                })->values();
            }

            return $value;
        });

        return Collection::make([
            // 'total_count' => (int) $response->json('total_count', 0),
            'total_count' => $items->count(),
            'items' => $items,
        ]);
    }
}
