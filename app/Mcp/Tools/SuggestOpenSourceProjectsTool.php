<?php

namespace App\Mcp\Tools;

use App\Services\GitHub\Exceptions\GitHubException;
use App\Services\GitHub\Facades\GitHub;
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

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'language' => ['sometimes', 'string', 'max:50'],
            'label' => ['sometimes', 'string', 'max:100'],
            'comments' => ['sometimes', 'integer', 'min:0'],
            'page' => ['sometimes', 'integer', 'min:1'],
            'limit' => ['sometimes', 'integer', 'min:1', 'max:20'],
        ], [
            'language.max' => 'Language name must be 50 characters or less.',
            'label.max' => 'Label must be 100 characters or less.',
            'comments.min' => 'Comments count must be at least 0.',
            'page.min' => 'Page number must be at least 1.',
            'limit.min' => 'Limit must be at least 1.',
            'limit.max' => 'Cannot request more than 20 projects at once.',
        ]);

        $language = $validated['language'] ?? null;
        $label = $validated['label'] ?? 'good first issue';
        $page = $validated['page'] ?? 1;
        $limit = $validated['limit'] ?? 10;

        // Use the GitHub service to search for issues
        try {
            GitHub::setLabels(['hacktoberfest', $label])
                ->setPage($page)
                ->setPerPage($limit);

            if ($language) {
                GitHub::setLanguage($language);
            }

            $results = GitHub::execute();
        } catch (GitHubException $e) {
            return Response::error('Failed to fetch projects: '.$e->getMessage());
        }

        if ($results->isEmpty()) {
            return Response::text('No Hacktoberfest projects found'.
                ($language ? " for language: {$language}" : '').
                '. Try different search criteria or check back later.');
        }

        if (! $results->get('total_count')) {
            return Response::text('No Hacktoberfest projects found'.
                ($language ? " for language: {$language}" : '').
                '. Try different search criteria or check back later.');
        }

        // Format the results as markdown
        $markdown = view('mcp.suggest-open-source-projects', [
            'items' => $results->get('items', []),
            'language' => $language,
            'label' => $label,
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
            'language' => $schema->string()
                ->description('Programming language to filter projects by (e.g., "PHP", "JavaScript", "Python")')
                ->maxLength(50),
            'label' => $schema->string()
                ->description('Additional label to filter issues by (default: "good first issue")')
                ->default('good first issue')
                ->maxLength(100),
            'limit' => $schema->integer()
                ->description('Number of projects to return (1-20)')
                ->default(10)
                ->minimum(1)
                ->maximum(20),
        ];
    }
}
