<?php

declare(strict_types=1);

namespace App\Http\Controllers\Search;

use App\Actions\GitHub\SearchIssue;
use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
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
        $language = $validated['language'] ?? '';
        $label = $validated['label'] ?? null;
        $comments = $validated['comments'] ?? null;
        $page = $validated['page'] ?? 1;

        //
        $results = $searchIssue->search([
            'language' => $language,
            'label' => $label,
            'comments' => $comments,
            'page' => $page,
        ]);

        return Inertia::render('search/SearchResults', [
            'language' => $language,
            'label' => $label,
            'comments' => $comments,
            'page' => $page,
            //
            'results' => $results,
        ]);
    }
}
