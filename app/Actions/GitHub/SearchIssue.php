<?php

declare(strict_types=1);

namespace App\Actions\GitHub;

use App\Actions\GitHub\Contracts\SearchIssues;
use Exception;
use GrahamCampbell\GitHub\Facades\GitHub;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class SearchIssue implements SearchIssues
{
    /**
     * Search GitHub issues based on the given input.
     *
     * @param  array<string, mixed>  $input
     */
    public function search(array $input, bool $useCache = false): array
    {
        $validated = Validator::make($input, [
            'q' => ['nullable', 'string', 'max:100'],
            'language' => ['nullable', 'string', 'max:50'],
            'label' => ['nullable', 'string', 'max:100'],
            'comments' => ['nullable', 'string', 'max:100'],
            'page' => ['nullable', 'integer', 'min:1'],
            'limit' => ['nullable', 'integer', 'min:1', 'max:100'],
        ])->validate();

        $cacheKey = Str::of('github.search.')
            ->append(values: md5(serialize($validated)))
            ->toString();
        $cacheTtl = app()->environment('production')
            ? now()->addMinutes(15)
            : now()->addSeconds(30);
        // Cache::forget($cacheKey); // Uncomment to clear cache for testing

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        //
        $results = $this->getResults($validated);

        if (! $useCache) {
            return $results;
        }

        if (! empty($results['error'] ?? null)) {
            return $results;
        }

        $results['cached_at'] = now()->toDateTimeString();
        $results['cache_key'] = $cacheKey;
        $results['cache_ttl'] = $cacheTtl->diffInMinutes(now());

        return Cache::remember(
            $cacheKey,
            $cacheTtl,
            fn () => $results
        );
    }

    /**
     * Generate the GitHub search query string.
     *
     * @param  array<string, mixed>  $input
     */
    private function getQueryString(array $input): string
    {
        $q = $input['q'] ?? '';
        $language = $input['language'] ?? null;
        $label = $input['label'] ?? null;
        $comments = $input['comments'] ?? null;
        $page = $input['page'] ?? 1;
        $limit = $input['limit'] ?? 10;
        $query = [
            'created' => sprintf('>%s', now()->startOfYear()->format('Y-m-d')),
            'state' => 'open',
        ];

        if ($language) {
            $query['language'] = $language;
        }

        if ($comments || $comments === '0') {
            $query['comments'] = $comments;
        }

        $queryString = Arr::join(
            Arr::map(
                $query,
                fn ($value, $key): string => sprintf('%s:%s', $key, $value)
            ),
            ' '
        );

        if ($label) {
            $labels = array_map('trim', explode(',', $label));
            $labelParts = [];
            foreach ($labels as $singleLabel) {
                $formattedLabel = Str::of($singleLabel)->when(
                    Str::of($singleLabel)->contains(' '),
                    fn ($str) => $str->wrap('"', '"')
                )->toString();
                $labelParts[] = 'label:'.$formattedLabel;
            }
            $queryString .= ' '.implode(' ', $labelParts);
        }

        return Str::of($queryString)
            ->when($q, fn ($str) => $str->prepend($q.' '))
            ->toString();
    }

    /**
     * Get search results from GitHub.
     *
     * @param  array<string, mixed>  $input
     */
    private function getResults(array $input): array
    {
        try {
            $q = $this->getQueryString($input);
            $results = GitHub::connection('none')->search()->issues($q);
        } catch (Exception $e) {
            Log::channel('githublog')->error('GitHub Issue Search Failed', [
                'q' => $q,
                'error' => $e->getMessage(),
            ]);

            return [
                'total_count' => 0,
                'incomplete_results' => false,
                // 'items' => [],
                'error' => $e->getMessage(),
            ];
        }

        Log::channel('githublog')->debug('GitHub Issue Search', [
            'q' => $q,
            'results' => [
                'total_count' => $results['total_count'],
                'incomplete_results' => $results['incomplete_results'],
                // 'items' => $results['items'],
            ],
        ]);

        return $results;
    }
}
