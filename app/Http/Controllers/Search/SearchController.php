<?php

declare(strict_types=1);

namespace App\Http\Controllers\Search;

use App\Actions\GitHub\SearchIssue;
use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SearchRequest $request, SearchIssue $searchIssue): Response
    {
        $validated = $request->validated();
        $q = $validated['q'] ?? '';
        $language = $validated['language'] ?? null;
        $label = $validated['label'] ?? null;
        $comments = $validated['comments'] ?? null;
        $page = $validated['page'] ?? 1;
        $limit = $validated['limit'] ?? 10;

        //
        $results = $searchIssue->search([
            'q' => $q,
            'language' => $language,
            'label' => $label,
            'comments' => $comments,
            'page' => $page,
            'limit'=> $limit,
        ], true);

        // Transform GitHub API response to match frontend interface
        $transformedResults = [
            'total_amount' => $results['total_count'] ?? 0,
            'incomplete_results' => $results['incomplete_results'] ?? false,
            'items' => collect($results['items'] ?? [])
                ->map(function ($item) {
                    $repoUrl = $item['repository_url'] ?? '';
                    $repoName = Str::of($repoUrl)
                        ->replace('https://api.github.com/repos/', '')
                        ->toString();
                    $repoLink = 'https://github.com/'.$repoName;

                    return [
                        'repo_title' => $item['title'] ?? '',
                        'repo_url' => $item['html_url'] ?? '',
                        'repo_name' => $repoName,
                        'repo_link' => $repoLink,
                        'updated_at' => $item['updated_at'] ?? '',
                        'labels' => collect($item['labels'] ?? [])
                            ->map(fn ($label) => $label['name'])
                            ->toArray(),
                        'body' => $item['body'] ?? '',
                    ];
                })->toArray(),
        ];

        return Inertia::render('Welcome', [
            'query' => $q,
            'results' => $transformedResults,
            'canRegister' => true,
            'languages' => config('githublang', []),
            'selectedLanguage' => $language,
        ]);
    }
}
