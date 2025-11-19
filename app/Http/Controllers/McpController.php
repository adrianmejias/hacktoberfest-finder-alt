<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class McpController extends Controller
{
    public function __invoke(): Response
    {
        $serverUrl = route('mcp.hacktoberfest');

        return Inertia::render('Mcp', [
            'canRegister' => Features::enabled(Features::registration()),
            'languages' => config('github.languages', []),
            'serverUrl' => $serverUrl,
            'tools' => [
                [
                    'name' => 'suggest-open-source-projects',
                    'description' => 'Searches and suggests open source projects for users to contribute to during Hacktoberfest based on their programming language preferences and skill level.',
                    'parameters' => [
                        ['name' => 'q', 'type' => 'string', 'required' => true, 'description' => 'Search query to find relevant open source projects'],
                        ['name' => 'language', 'type' => 'string', 'required' => false, 'description' => 'Programming language to filter projects by (e.g., "PHP", "JavaScript", "Python")'],
                        ['name' => 'label', 'type' => 'string', 'required' => false, 'description' => 'Additional label to filter issues by (default: "hacktoberfest, good first issue")'],
                        ['name' => 'comments', 'type' => 'string', 'required' => false, 'description' => 'Minimum number of comments an issue should have to indicate activity'],
                        ['name' => 'page', 'type' => 'integer', 'required' => false, 'description' => 'Page number for paginated results (default: 1)'],
                        ['name' => 'limit', 'type' => 'integer', 'required' => false, 'description' => 'Number of projects to return 1-20 (default: 10)'],
                    ],
                ],
                [
                    'name' => 'get-current-hacktoberfest-info',
                    'description' => 'Retrieves comprehensive information about Hacktoberfest including dates, rules, and participation guidelines.',
                    'parameters' => [],
                ],
                [
                    'name' => 'guide-contribution-process',
                    'description' => 'Provides step-by-step guidance on contributing to open source projects, including GitHub workflow and best practices.',
                    'parameters' => [
                        ['name' => 'step', 'type' => 'string', 'required' => false, 'description' => 'Specific contribution step to get guidance on (e.g., "fork", "clone", "commit", "pull-request")'],
                    ],
                ],
            ],
            'resources' => [
                [
                    'uri' => 'hacktoberfest://event/current',
                    'name' => 'Hacktoberfest Event',
                    'description' => 'Comprehensive information about the Hacktoberfest event, including history, mission, and current year details.',
                ],
                [
                    'uri' => 'hacktoberfest://project/template',
                    'name' => 'Open Source Project',
                    'description' => 'Information about participating in and contributing to open source projects during Hacktoberfest.',
                ],
                [
                    'uri' => 'hacktoberfest://guidelines/contribution',
                    'name' => 'Contribution Guidelines',
                    'description' => 'Best practices and guidelines for making meaningful contributions to open source projects.',
                ],
            ],
            'prompts' => [
                [
                    'name' => 'describe-hacktoberfest',
                    'description' => 'Get a comprehensive overview of Hacktoberfest, its purpose, and how to participate.',
                ],
                [
                    'name' => 'find-projects-to-contribute',
                    'description' => 'Interactive prompt to help discover suitable open source projects based on your interests and skills.',
                ],
                [
                    'name' => 'explain-contribution-process',
                    'description' => 'Step-by-step explanation of the contribution process from finding issues to submitting pull requests.',
                ],
            ],
        ]);
    }
}
