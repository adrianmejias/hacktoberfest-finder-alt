<?php

namespace App\Http\Controllers\Search;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Services\GitHub\Facades\GitHub;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Requests\SearchRequest;
use Illuminate\Support\Facades\Log;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SearchRequest $request): Response
    {
        $query = $request->input('q');
        $language = $request->input('language');
        $labels = $request->input('labels', []);
        $page = $request->input('page', 1);
        $results = [];

        if ($query) {
            $results = GitHub::setLanguage($language)
                ->setLabels($labels)
                ->setPage($page)
                ->execute([
                    'q' => $query,
                ]);
        }

        Log::channel('githublog')->debug('Search executed', [
            'query' => $query,
            'language' => $language,
            'labels' => $labels,
            'page' => $page,
            'results' => $results,
        ]);

        return Inertia::render('search/SearchResults', [
            'results' => $results,
            'query' => $query,
            'language' => $language,
            'labels' => $labels,
            'page' => $page,
        ]);
    }
}
