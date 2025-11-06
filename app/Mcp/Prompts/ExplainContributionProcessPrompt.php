<?php

namespace App\Mcp\Prompts;

use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Prompt;
use Laravel\Mcp\Server\Prompts\Argument;

class ExplainContributionProcessPrompt extends Prompt
{
    /**
     * The prompt's description.
     */
    protected string $description = 'Provides detailed, step-by-step guidance for the open source contribution process tailored to specific scenarios.';

    /**
     * Handle the prompt request.
     *
     * @return array<int, \Laravel\Mcp\Response>
     */
    public function handle(Request $request): array
    {
        $validated = $request->validate([
            'scenario' => 'required|string|in:first-time,bug-fix,feature-add,documentation,after-rejection',
            'project_type' => 'sometimes|string|max:100',
        ], [
            'scenario.required' => 'Please specify the scenario you need help with.',
            'scenario.in' => 'Scenario must be one of: first-time, bug-fix, feature-add, documentation, after-rejection.',
        ]);

        $scenario = $validated['scenario'];
        $projectType = $validated['project_type'] ?? 'a typical open source project';

        $systemMessage = <<<'SYSTEM'
You are HacktoberfestBot, an experienced open source contributor and mentor.
You provide clear, step-by-step guidance for contributing to open source projects.
Your instructions should be detailed, actionable, and include actual command examples.
Be encouraging and anticipate common questions or concerns.
SYSTEM;

        $scenarioQuestions = [
            'first-time' => <<<USER
I've never contributed to open source before and I'm nervous about making my first contribution to {$projectType}.
Can you walk me through the entire process from start to finish?
I want to know:
1. How to set up my development environment
2. How to find and claim an issue
3. The complete git workflow (fork, clone, branch, commit, push, PR)
4. How to write a good pull request
5. What to expect during code review
6. Common mistakes to avoid

Please provide specific commands and detailed explanations for each step.
USER,
            'bug-fix' => <<<USER
I found a bug in {$projectType} that I want to fix for Hacktoberfest.
I've identified the issue but I'm not sure about the best approach for contributing the fix.
Can you guide me through:
1. How to reproduce and document the bug
2. The proper way to discuss the bug with maintainers before fixing
3. How to write a good bug fix (tests, edge cases, etc.)
4. Best practices for the commit message and PR description
5. How to handle if my fix is rejected or if there's a better solution

I want to make sure my contribution is high quality and follows best practices.
USER,
            'feature-add' => <<<USER
I want to add a new feature to {$projectType} during Hacktoberfest.
Can you help me understand:
1. How to propose a new feature to maintainers
2. What to include in a feature proposal
3. How to break down a feature into manageable PRs
4. How to write tests for new functionality
5. How to document the new feature
6. Best practices for implementing features in an existing codebase

I want to ensure my feature aligns with the project's goals and is implemented correctly.
USER,
            'documentation' => <<<USER
I want to contribute to documentation for {$projectType} as part of Hacktoberfest.
I need guidance on:
1. What types of documentation contributions are valuable
2. How to find documentation that needs improvement
3. Best practices for technical writing
4. How to test documentation changes
5. The review process for documentation PRs
6. Common mistakes in documentation contributions

I want to make sure my documentation contributions are truly helpful and not just trivial changes.
USER,
            'after-rejection' => <<<USER
My pull request to {$projectType} was rejected or requires major changes and I'm not sure how to proceed.
Can you help me understand:
1. How to professionally respond to rejection
2. How to ask for clarification on feedback
3. Whether to revise my PR or start fresh
4. How to learn from the rejection
5. When to move on to a different issue
6. How to maintain a positive relationship with the project

I want to handle this professionally and learn from the experience.
USER,
        ];

        return [
            Response::text($systemMessage)->asAssistant(),
            Response::text($scenarioQuestions[$scenario]),
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
                name: 'scenario',
                description: 'The contribution scenario: first-time (never contributed before), bug-fix (fixing a bug), feature-add (adding new feature), documentation (docs contribution), or after-rejection (handling rejected PR)',
                required: true
            ),
            new Argument(
                name: 'project_type',
                description: 'Optional: Type of project (e.g., "web framework", "CLI tool", "library"). Helps tailor the advice.',
                required: false
            ),
        ];
    }
}
