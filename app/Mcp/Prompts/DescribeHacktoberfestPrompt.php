<?php

namespace App\Mcp\Prompts;

use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Prompt;
use Laravel\Mcp\Server\Prompts\Argument;

class DescribeHacktoberfestPrompt extends Prompt
{
    /**
     * The prompt's description.
     */
    protected string $description = 'Generates a comprehensive explanation of Hacktoberfest tailored to the user\'s experience level and interests.';

    /**
     * Handle the prompt request.
     *
     * @return array<int, \Laravel\Mcp\Response>
     */
    public function handle(Request $request): array
    {
        $validated = $request->validate([
            'experience_level' => 'required|string|in:beginner,intermediate,advanced',
            'focus_area' => 'sometimes|string|max:100',
        ], [
            'experience_level.required' => 'Please specify your experience level (beginner, intermediate, or advanced).',
            'experience_level.in' => 'Experience level must be: beginner, intermediate, or advanced.',
        ]);

        $experienceLevel = $validated['experience_level'];
        $focusArea = $validated['focus_area'] ?? null;

        // System message for the AI assistant
        $systemMessage = <<<'SYSTEM'
You are HacktoberfestBot, a friendly and knowledgeable assistant helping users participate in Hacktoberfest.
Your responses should be encouraging, informative, and tailored to the user's experience level.
Focus on practical advice and actionable steps.
SYSTEM;

        // User message based on experience level
        $userMessages = [
            'beginner' => <<<'USER'
I'm new to open source and Hacktoberfest. I have basic programming knowledge but have never contributed to an open-source project before. Can you explain Hacktoberfest to me and help me understand how I can get started? What should I know as a complete beginner?
USER,
            'intermediate' => <<<'USER'
I have some experience with git and have made a few contributions to open source before. I want to participate in Hacktoberfest this year and maximize my impact. Can you explain how Hacktoberfest works and provide strategies for finding good projects to contribute to at my level?
USER,
            'advanced' => <<<'USER'
I'm an experienced open-source contributor and want to make meaningful contributions during Hacktoberfest. Can you explain the event structure, how I can help as a maintainer, and strategies for making high-impact contributions? I'm also interested in mentoring newcomers.
USER,
        ];

        if ($focusArea) {
            $userMessages[$experienceLevel] .= "\n\nI'm particularly interested in: {$focusArea}";
        }

        $responses = [
            Response::text($systemMessage)->asAssistant(),
            Response::text($userMessages[$experienceLevel]),
        ];

        return $responses;
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
                name: 'experience_level',
                description: 'Your experience level with open source: beginner (new to open source), intermediate (some contributions), or advanced (regular contributor/maintainer)',
                required: true
            ),
            new Argument(
                name: 'focus_area',
                description: 'Optional: Specific area of interest (e.g., "web development", "Python", "documentation", "machine learning")',
                required: false
            ),
        ];
    }
}
