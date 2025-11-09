<?php

declare(strict_types=1);

namespace App\Mcp\Tools;

use App\Actions\GitHub\SearchIssue;
use Exception;
use Illuminate\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

class SuggestOpenSourceProjectsTool extends Tool
{
    /**
     * The tool's description.
     */
    protected string $description = 'Searches and suggests open source projects for users to contribute to during Hacktoberfest based on their programming language preferences and skill level.';

    public function __construct(private SearchIssue $searchIssue)
    {
        //
    }

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'q' => ['required', 'string', 'max:100'],
            'language' => ['nullable', 'string', 'max:50'],
            'label' => ['nullable', 'string', 'max:100'],
            'comments' => ['nullable', 'string', 'max:100'],
            'page' => ['sometimes', 'integer', 'min:1'],
            'limit' => ['sometimes', 'integer', 'min:1', 'max:20'],
        ]);

        $q = $validated['q'] ?? '';
        $language = $validated['language'] ?? null;
        $label = $validated['label'] ?? null;
        $comments = $validated['comments'] ?? null;
        $page = $validated['page'] ?? 1;
        $limit = $validated['limit'] ?? 10;

        //
        try {
            $results = $this->searchIssue->search([
                'q' => $q,
                'language' => $language,
                'label' => $label,
                'comments' => $comments,
                'page' => $page,
                'limit' => $limit,
            ]);
        } catch (Exception $e) {
            return Response::text('An error occurred while searching for projects: '.$e->getMessage());
        }

        if (empty($results)) {
            return Response::text('No Hacktoberfest projects found'.
                ($language ? " for language: {$language}" : '').
                '. Try different search criteria or check back later.');
        }

        if (! array_key_exists('total_count', $results)) {
            return Response::text('No Hacktoberfest projects found'.
                ($language ? " for language: {$language}" : '').
                '. Try different search criteria or check back later.');
        }

        if (! $results['total_count']) {
            return Response::text('No Hacktoberfest projects found'.
                ($language ? " for language: {$language}" : '').
                '. Try different search criteria or check back later.');
        }

        // Format the results as markdown
        $markdown = view('mcp.suggest-open-source-projects', [
            'q' => $q,
            'language' => $language,
            'label' => $label,
            'comments' => $comments,
            'page' => $page,
            'limit' => $limit,
            //
            'total_count' => $results['total_count'],
            'incomplete_results' => $results['incomplete_results'],
            'items' => $results['items'],
        ])->render();

        return Response::text($markdown);
    }

    /**
     * Get the tool's input schema.
     *
     * @return array<string, \Illuminate\JsonSchema\JsonSchema>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'q' => $schema->string()
                ->description('Search query to find relevant open source projects')
                ->max(100),
            'language' => $schema->string()
                ->description('Programming language to filter projects by (e.g., "PHP", "JavaScript", "Python")')
                ->max(50),
            'label' => $schema->string()
                ->description('Additional label to filter issues by (default: "hacktoberfest, good first issue")')
                ->default('hacktoberfest, good first issue')
                ->max(100),
            'comments' => $schema->string()
                ->description('Minimum number of comments an issue should have to indicate activity')
                ->max(100),
            'page' => $schema->integer()
                ->description('Page number for paginated results')
                ->default(1)
                ->min(1),
            'limit' => $schema->integer()
                ->description('Number of projects to return (1-20)')
                ->default(10)
                ->min(1)
                ->max(20),
        ];
    }
}
