<?php

namespace App\Mcp\Prompts;

use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Prompt;
use Laravel\Mcp\Server\Prompts\Argument;

class FindProjectsToContributePrompt extends Prompt
{
    /**
     * The prompt's description.
     */
    protected string $description = 'Helps users discover suitable Hacktoberfest projects based on their programming language preferences and skill level.';

    /**
     * Handle the prompt request.
     *
     * @return array<int, \Laravel\Mcp\Response>
     */
    public function handle(Request $request): array
    {
        $validated = $request->validate([
            'languages' => 'required|string|max:200',
            'skill_level' => 'required|string|in:beginner,intermediate,advanced',
            'interests' => 'sometimes|string|max:300',
        ], [
            'languages.required' => 'Please specify at least one programming language you want to work with.',
            'skill_level.required' => 'Please specify your skill level (beginner, intermediate, or advanced).',
            'skill_level.in' => 'Skill level must be: beginner, intermediate, or advanced.',
        ]);

        $languages = $validated['languages'];
        $skillLevel = $validated['skill_level'];
        $interests = $validated['interests'] ?? 'general open source projects';

        $systemMessage = <<<'SYSTEM'
You are HacktoberfestBot, an expert at matching developers with suitable open-source projects for Hacktoberfest.
You provide personalized project recommendations based on the user's skills, interests, and experience level.
Always suggest specific, active projects with good first issues.
Be encouraging and provide practical next steps.
SYSTEM;

        $skillDescriptions = [
            'beginner' => 'I\'m new to open source and looking for beginner-friendly projects with good documentation and supportive communities',
            'intermediate' => 'I have some open source experience and want to work on moderately complex issues that will help me grow',
            'advanced' => 'I\'m an experienced contributor looking for challenging projects where I can make significant impact',
        ];

        $userMessage = <<<USER
I want to find Hacktoberfest projects to contribute to. Here are my details:

**Programming Languages:** {$languages}
**Skill Level:** {$skillLevel} - {$skillDescriptions[$skillLevel]}
**Interests:** {$interests}

Can you suggest some specific projects I should look at? Please provide:
1. Project names and why they're good fits for me
2. What types of contributions I could make
3. Where to find issues labeled for Hacktoberfest
4. Tips for getting started with each project

I want to make meaningful contributions that align with my skills and help me learn.
USER;

        return [
            Response::text($systemMessage)->asAssistant(),
            Response::text($userMessage),
        ];
    }

    /**
     * Get the prompt's arguments.
     *
     * @return array<int, \Laravel\Mcp\Server\Prompts\Argument>
     */
    public function arguments(): array
    {
        return [
            new Argument(
                name: 'languages',
                description: 'Programming languages you want to work with (comma-separated, e.g., "JavaScript, Python, Go")',
                required: true
            ),
            new Argument(
                name: 'skill_level',
                description: 'Your skill level: beginner, intermediate, or advanced',
                required: true
            ),
            new Argument(
                name: 'interests',
                description: 'Optional: Specific areas of interest or types of projects (e.g., "web frameworks", "data science", "DevOps tools", "game development")',
                required: false
            ),
        ];
    }
}
