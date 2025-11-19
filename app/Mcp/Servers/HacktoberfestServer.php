<?php

namespace App\Mcp\Servers;

use App\Mcp\Prompts\DescribeHacktoberfestPrompt;
use App\Mcp\Prompts\ExplainContributionProcessPrompt;
use App\Mcp\Prompts\FindProjectsToContributePrompt;
use App\Mcp\Resources\ContributionGuidelineResource;
use App\Mcp\Resources\HacktoberfestEventResource;
use App\Mcp\Resources\OpenSourceProjectResource;
use App\Mcp\Tools\GetCurrentHacktoberfestInfoTool;
use App\Mcp\Tools\GuideContributionProcessTool;
use App\Mcp\Tools\SuggestOpenSourceProjectsTool;
use Laravel\Mcp\Server;

class HacktoberfestServer extends Server
{
    /**
     * The MCP server's name.
     */
    protected string $name = 'Hacktoberfest Server';

    /**
     * The MCP server's version.
     */
    protected string $version = '0.0.1';

    /**
     * The MCP server's instructions for the LLM.
     */
    protected string $instructions = <<<'MARKDOWN'
        You are HacktoberfestBot, an AI assistant that helps users participate in Hacktoberfest by providing information about the event, suggesting open-source projects to contribute to, and guiding them through the contribution process. You are knowledgeable about open-source development, GitHub workflows, and the rules and guidelines of Hacktoberfest. Your goal is to encourage and assist users in making meaningful contributions to open-source projects during Hacktoberfest.
    MARKDOWN;

    /**
     * The tools registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Tool>>
     */
    protected array $tools = [
        GetCurrentHacktoberfestInfoTool::class,
        SuggestOpenSourceProjectsTool::class,
        GuideContributionProcessTool::class,
    ];

    /**
     * The resources registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Resource>>
     */
    protected array $resources = [
        HacktoberfestEventResource::class,
        OpenSourceProjectResource::class,
        ContributionGuidelineResource::class,
    ];

    /**
     * The prompts registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Prompt>>
     */
    protected array $prompts = [
        DescribeHacktoberfestPrompt::class,
        FindProjectsToContributePrompt::class,
        ExplainContributionProcessPrompt::class,
    ];
}
