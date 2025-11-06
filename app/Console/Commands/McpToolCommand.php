<?php

namespace App\Console\Commands;

use App\Mcp\Tools\GetCurrentHacktoberfestInfoTool;
use App\Mcp\Tools\GuideContributionProcessTool;
use App\Mcp\Tools\SuggestOpenSourceProjectsTool;
use Illuminate\Console\Command;
use Laravel\Mcp\Request;

class McpToolCommand extends Command
{
    protected $signature = 'mcp:call
                            {tool : The tool to call (hacktoberfest-info, suggest-projects, guide)}
                            {--year= : Year for hacktoberfest-info}
                            {--language= : Language for suggest-projects}
                            {--labels= : Labels for suggest-projects}
                            {--comments=0 : Comments count for suggest-projects}
                            {--page=1 : Page number for suggest-projects}
                            {--limit=5 : Limit for suggest-projects}
                            {--stage=all : Stage for guide}';

    protected $description = 'Call an MCP tool and see the output';

    public function handle(): int
    {
        $tool = $this->argument('tool');

        return match ($tool) {
            'hacktoberfest-info', 'info' => $this->callHacktoberfestInfo(),
            'suggest-projects', 'projects' => $this->callSuggestProjects(),
            'guide', 'contribution' => $this->callGuide(),
            default => $this->error("Unknown tool: {$tool}. Use: hacktoberfest-info, suggest-projects, guide"),
        };
    }

    protected function callHacktoberfestInfo(): int
    {
        $tool = app(GetCurrentHacktoberfestInfoTool::class);
        $request = new Request([
            'year' => $this->option('year') ?? date('Y'),
        ]);

        $response = $tool->handle($request);
        $this->line((string) $response->content());

        return 0;
    }

    protected function callSuggestProjects(): int
    {
        $tool = app(SuggestOpenSourceProjectsTool::class);
        $request = new Request([
            'language' => $this->option('language'),
            'labels' => $this->option('labels'),
            'comments' => (int) $this->option('comments'),
            'page' => (int) $this->option('page'),
            'limit' => (int) $this->option('limit'),
        ]);

        $response = $tool->handle($request);
        $this->line((string) $response->content());

        return 0;
    }

    protected function callGuide(): int
    {
        $tool = app(GuideContributionProcessTool::class);
        $request = new Request([
            'stage' => $this->option('stage'),
        ]);

        $response = $tool->handle($request);
        $this->line((string) $response->content());

        return 0;
    }
}
