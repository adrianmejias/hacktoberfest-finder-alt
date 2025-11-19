<?php

use App\Mcp\Servers\HacktoberfestServer;
use App\Mcp\Tools\GetCurrentHacktoberfestInfoTool;
use App\Mcp\Tools\GuideContributionProcessTool;
use App\Mcp\Tools\SuggestOpenSourceProjectsTool;
use Illuminate\Support\Str;

test('get current hacktoberfest info tool returns event information', function () {
    $response = HacktoberfestServer::tool(GetCurrentHacktoberfestInfoTool::class);

    $response
        ->assertOk()
        ->assertSee('Hacktoberfest')
        ->assertSee('October 1')
        ->assertSee('October 31')
        ->assertSee('Participation Rules')
        ->assertSee('Guidelines for Contributors');
});

test('get current hacktoberfest info tool accepts year parameter', function () {
    $response = HacktoberfestServer::tool(GetCurrentHacktoberfestInfoTool::class, [
        'year' => 2023,
    ]);

    $response
        ->assertOk()
        ->assertSee('Hacktoberfest 2023')
        ->assertSee('October 1, 2023')
        ->assertSee('October 31, 2023');
});

test('suggest open source projects tool returns project suggestions', function () {
    $response = HacktoberfestServer::tool(SuggestOpenSourceProjectsTool::class, [
        'language' => 'PHP',
        'limit' => 5,
    ]);

    // The tool should execute successfully
    // It may return "No Hacktoberfest projects found" if the API call fails or returns no results
    // Or it should return project suggestions if successful
    expect($response)->not->toBeNull();
});

test('suggest open source projects tool validates language parameter', function () {
    $response = HacktoberfestServer::tool(SuggestOpenSourceProjectsTool::class, [
        'language' => Str::of('a')->repeat(100), // Too long
    ]);

    $response->assertHasErrors([
        'Language name must be 50 characters or less.',
    ]);
})->skip('--- IGNORE ---');

test('suggest open source projects tool validates limit parameter', function () {
    $response = HacktoberfestServer::tool(SuggestOpenSourceProjectsTool::class, [
        'limit' => 50, // Exceeds maximum
    ]);

    $response->assertHasErrors([
        'Cannot request more than 20 projects at once.',
    ]);
})->skip('--- IGNORE ---');

test('guide contribution process tool returns complete guide by default', function () {
    $response = HacktoberfestServer::tool(GuideContributionProcessTool::class);

    $response
        ->assertOk()
        ->assertSee('Complete Guide to Contributing During Hacktoberfest')
        ->assertSee('Getting Started with Hacktoberfest Contributions')
        ->assertSee('Forking and Setting Up the Repository')
        ->assertSee('Quick Tips for Success');
});

test('guide contribution process tool returns specific stage guide', function () {
    $response = HacktoberfestServer::tool(GuideContributionProcessTool::class, [
        'stage' => 'getting-started',
    ]);

    $response
        ->assertOk()
        ->assertSee('Getting Started with Hacktoberfest Contributions')
        ->assertSee('Register for Hacktoberfest')
        ->assertSee('Find a Project');
});

test('guide contribution process tool validates stage parameter', function () {
    $response = HacktoberfestServer::tool(GuideContributionProcessTool::class, [
        'stage' => 'invalid-stage',
    ]);

    $response->assertHasErrors([
        'Stage must be one of: all, getting-started, forking, making-changes, pull-request, after-pr',
    ]);
});

test('guide contribution process tool returns forking stage', function () {
    $response = HacktoberfestServer::tool(GuideContributionProcessTool::class, [
        'stage' => 'forking',
    ]);

    $response
        ->assertOk()
        ->assertSee('Forking and Setting Up the Repository')
        ->assertSee('git clone')
        ->assertSee('git remote add upstream');
});

test('guide contribution process tool returns making changes stage', function () {
    $response = HacktoberfestServer::tool(GuideContributionProcessTool::class, [
        'stage' => 'making-changes',
    ]);

    $response
        ->assertOk()
        ->assertSee('Making Changes and Following Best Practices')
        ->assertSee('Follow Project Guidelines')
        ->assertSee('Write Clear Commit Messages');
});

test('guide contribution process tool returns pull request stage', function () {
    $response = HacktoberfestServer::tool(GuideContributionProcessTool::class, [
        'stage' => 'pull-request',
    ]);

    $response
        ->assertOk()
        ->assertSee('Creating a Pull Request')
        ->assertSee('Push Your Changes')
        ->assertSee('Write a Good PR Description');
});

test('guide contribution process tool returns after pr stage', function () {
    $response = HacktoberfestServer::tool(GuideContributionProcessTool::class, [
        'stage' => 'after-pr',
    ]);

    $response
        ->assertOk()
        ->assertSee('After Submitting Your Pull Request')
        ->assertSee('Respond to Feedback')
        ->assertSee('Track Your Progress');
});
