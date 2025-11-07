<?php

declare(strict_types=1);

namespace App\Actions\GitHub;

use App\Actions\GitHub\Contracts\SearchIssues;
use Exception;
use GrahamCampbell\GitHub\Facades\GitHub;
use Illuminate\Support\Arr;
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
    public function search(array $input): array
    {
        Validator::make($input, [
            'language' => ['nullable', 'string', 'max:100'],
            'label' => ['nullable', 'string', 'max:100'],
            'comments' => ['nullable', 'string', 'max:100'],
            'page' => ['nullable', 'integer', 'min:1'],
        ])->validate();

        return $this->getResults($input);
    }

    /**
     * Generate the GitHub search query string.
     *
     * @param  array<string, mixed>  $input
     */
    private function generateQ(array $input): string
    {
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

        // TODO: handle comma separated labels
        if ($label) {
            $query['label'] = Str::of($label)->when(
                Str::of($label)->contains(' '),
                fn ($str) => $str->wrap('"', '"')
            )->toString();
        }

        if ($comments) {
            $query['comments'] = $comments;
        }

        return Str::of(
            Arr::join(
                Arr::map(
                    $query,
                    fn ($value, $key): string => sprintf('%s:%s', $key, $value)
                ),
                '+'
            )
        )->replace(':', '%3A')->toString();
    }

    /**
     * Get search results from GitHub.
     *
     * @param  array<string, mixed>  $input
     */
    private function getResults(array $input): array
    {
        $q = $this->generateQ($input);

        // TODO: figure out why this isn't working as expected
        try {
            $results = GitHub::connection('none')->search()->issues($q);
        } catch (Exception $e) {
            Log::channel('githublog')->error('GitHub Issue Search Failed', [
                'q' => $q,
                'error' => $e->getMessage(),
            ]);

            return [];
        }

        Log::channel('githublog')->debug('GitHub Issue Search', [
            'q' => $q,
            'results' => $results,
        ]);

        return $results;
    }
}
