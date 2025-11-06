<?php

use App\Mcp\Resources\ContributionGuidelineResource;
use App\Mcp\Resources\HacktoberfestEventResource;
use App\Mcp\Resources\OpenSourceProjectResource;
use App\Mcp\Servers\HacktoberfestServer;

test('hacktoberfest event resource returns comprehensive event information', function () {
    $response = HacktoberfestServer::resource(HacktoberfestEventResource::class);

    $response
        ->assertOk()
        ->assertSee('What is Hacktoberfest?')
        ->assertSee('History')
        ->assertSee('Participation Requirements')
        ->assertSee('2014')
        ->assertSee('DigitalOcean');
});

test('hacktoberfest event resource includes event schedule', function () {
    $response = HacktoberfestServer::resource(HacktoberfestEventResource::class);

    $response
        ->assertOk()
        ->assertSee('Event Schedule')
        ->assertSee('Registration Period')
        ->assertSee('Contribution Period')
        ->assertSee('October 1')
        ->assertSee('October 31');
});

test('hacktoberfest event resource includes contribution requirements', function () {
    $response = HacktoberfestServer::resource(HacktoberfestEventResource::class);

    $response
        ->assertOk()
        ->assertSee('For Contributors')
        ->assertSee('For Maintainers')
        ->assertSee('Make 4 valid pull requests')
        ->assertSee('hacktoberfest');
});

test('hacktoberfest event resource includes community guidelines', function () {
    $response = HacktoberfestServer::resource(HacktoberfestEventResource::class);

    $response
        ->assertOk()
        ->assertSee('Community Guidelines')
        ->assertSee("Do's")
        ->assertSee("Don'ts")
        ->assertSee('Make meaningful contributions');
});

test('open source project resource returns project recommendations', function () {
    $response = HacktoberfestServer::resource(OpenSourceProjectResource::class);

    $response
        ->assertOk()
        ->assertSee('Beginner-Friendly Open Source Projects')
        ->assertSee('Finding Projects')
        ->assertSee('Official Platforms');
});

test('open source project resource includes project categories', function () {
    $response = HacktoberfestServer::resource(OpenSourceProjectResource::class);

    $response
        ->assertOk()
        ->assertSee('Project Categories')
        ->assertSee('Web Development')
        ->assertSee('Frontend')
        ->assertSee('Backend')
        ->assertSee('Mobile Development');
});

test('open source project resource includes contribution levels', function () {
    $response = HacktoberfestServer::resource(OpenSourceProjectResource::class);

    $response
        ->assertOk()
        ->assertSee('Types of Contributions by Skill Level')
        ->assertSee('Complete Beginner')
        ->assertSee('Some Experience')
        ->assertSee('Intermediate')
        ->assertSee('Advanced');
});

test('open source project resource includes project selection tips', function () {
    $response = HacktoberfestServer::resource(OpenSourceProjectResource::class);

    $response
        ->assertOk()
        ->assertSee('How to Choose a Project')
        ->assertSee('Questions to Ask')
        ->assertSee('Is the project active?')
        ->assertSee('Red Flags');
});

test('open source project resource includes programming languages', function () {
    $response = HacktoberfestServer::resource(OpenSourceProjectResource::class);

    $response
        ->assertOk()
        ->assertSee('Programming Languages')
        ->assertSee('JavaScript/TypeScript')
        ->assertSee('Python')
        ->assertSee('PHP')
        ->assertSee('Popular for Hacktoberfest');
});

test('contribution guideline resource returns best practices', function () {
    $response = HacktoberfestServer::resource(ContributionGuidelineResource::class);

    $response
        ->assertOk()
        ->assertSee('Open Source Contribution Best Practices')
        ->assertSee('Core Principles')
        ->assertSee('Quality Over Quantity');
});

test('contribution guideline resource includes before contributing section', function () {
    $response = HacktoberfestServer::resource(ContributionGuidelineResource::class);

    $response
        ->assertOk()
        ->assertSee('Before Contributing')
        ->assertSee('Research the Project')
        ->assertSee('Choose the Right Issue')
        ->assertSee('README.md')
        ->assertSee('CONTRIBUTING.md');
});

test('contribution guideline resource includes making contribution section', function () {
    $response = HacktoberfestServer::resource(ContributionGuidelineResource::class);

    $response
        ->assertOk()
        ->assertSee('Making Your Contribution')
        ->assertSee('Claim the Issue')
        ->assertSee('Fork and Branch')
        ->assertSee('Follow Coding Standards')
        ->assertSee('Commit Messages');
});

test('contribution guideline resource includes commit message examples', function () {
    $response = HacktoberfestServer::resource(ContributionGuidelineResource::class);

    $response
        ->assertOk()
        ->assertSee('Good Commit Message Format')
        ->assertSee('feat:')
        ->assertSee('fix:')
        ->assertSee('docs:');
});

test('contribution guideline resource includes what makes good contribution', function () {
    $response = HacktoberfestServer::resource(ContributionGuidelineResource::class);

    $response
        ->assertOk()
        ->assertSee('What Makes a Good Contribution?')
        ->assertSee('Code Contributions')
        ->assertSee('Documentation Contributions')
        ->assertSee('Non-Code Contributions');
});

test('contribution guideline resource includes common mistakes section', function () {
    $response = HacktoberfestServer::resource(ContributionGuidelineResource::class);

    $response
        ->assertOk()
        ->assertSee('Common Mistakes to Avoid')
        ->assertSee('Spam Contributions')
        ->assertSee('Ignoring Guidelines')
        ->assertSee('Poor Communication');
});

test('contribution guideline resource includes dealing with rejection', function () {
    $response = HacktoberfestServer::resource(ContributionGuidelineResource::class);

    $response
        ->assertOk()
        ->assertSee('Dealing with Rejection')
        ->assertSee('Stay Professional')
        ->assertSee('Learn and Improve');
});

test('contribution guideline resource includes hacktoberfest specific guidelines', function () {
    $response = HacktoberfestServer::resource(ContributionGuidelineResource::class);

    $response
        ->assertOk()
        ->assertSee('Hacktoberfest-Specific Guidelines')
        ->assertSee('Four Quality PRs')
        ->assertSee('Spam Prevention')
        ->assertSee('What Counts as Spam?');
});
