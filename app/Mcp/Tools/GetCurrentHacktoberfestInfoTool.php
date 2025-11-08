<?php

namespace App\Mcp\Tools;

use Illuminate\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

class GetCurrentHacktoberfestInfoTool extends Tool
{
    /**
     * The tool's description.
     */
    protected string $description = 'Fetches the current Hacktoberfest event information, including start and end dates, rules, guidelines, and participation requirements.';

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response
    {
        $year = $request->get('year', date('Y'));

        // Hacktoberfest always runs in October
        $info = <<<MARKDOWN
# Hacktoberfest {$year}

## Event Dates
- **Start Date:** October 1, {$year}
- **End Date:** October 31, {$year}

## Participation Rules
1. **Register:** Sign up on the official Hacktoberfest website between September 26 and October 31
2. **Contribute:** Make 4 valid pull/merge requests (PRs/MRs) between October 1-31 in any time zone
3. **Valid Contributions:** PRs/MRs must be to participating public repositories with the "hacktoberfest" topic
4. **Quality Over Quantity:** Contributions must be meaningful - spam or low-quality PRs will be marked as invalid

## Guidelines for Contributors
- **Read the Contributing Guidelines:** Always check CONTRIBUTING.md before starting work
- **Choose Good First Issues:** Look for issues labeled "good first issue" or "hacktoberfest"
- **Communicate:** Comment on issues before starting work to avoid duplicate efforts
- **Be Patient:** Maintainers may take time to review your contributions
- **Follow Code of Conduct:** Be respectful and professional in all interactions

## Rewards
- Complete 4 valid PRs to earn a digital reward badge
- Top contributors may receive special recognition from sponsors
- Gain valuable open-source experience and expand your portfolio

## Resources
- Official Website: https://hacktoberfest.com
- Participating Repositories: Search for "hacktoberfest" topic on GitHub
- Getting Started: https://hacktoberfest.com/participation

Remember: Hacktoberfest is about quality contributions and supporting open source, not just collecting swag!
MARKDOWN;

        return Response::text($info);
    }

    /**
     * Get the tool's input schema.
     *
     * @return array<string, \Illuminate\JsonSchema\JsonSchema>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'year' => $schema->integer()
                ->description('The year to get Hacktoberfest information for (defaults to current year)')
                ->default((int) date('Y'))
                ->min(2014), // Hacktoberfest started in 2014
        ];
    }
}
