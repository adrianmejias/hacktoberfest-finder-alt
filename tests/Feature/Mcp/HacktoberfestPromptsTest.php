<?php

use App\Mcp\Prompts\DescribeHacktoberfestPrompt;
use App\Mcp\Prompts\ExplainContributionProcessPrompt;
use App\Mcp\Prompts\FindProjectsToContributePrompt;
use App\Mcp\Servers\HacktoberfestServer;

test('describe hacktoberfest prompt requires experience level', function () {
    $response = HacktoberfestServer::prompt(DescribeHacktoberfestPrompt::class, []);

    $response->assertHasErrors([
        'Please specify your experience level (beginner, intermediate, or advanced).',
    ]);
});

test('describe hacktoberfest prompt validates experience level', function () {
    $response = HacktoberfestServer::prompt(DescribeHacktoberfestPrompt::class, [
        'experience_level' => 'expert',
    ]);

    $response->assertHasErrors([
        'Experience level must be: beginner, intermediate, or advanced.',
    ]);
});

test('describe hacktoberfest prompt works for beginner level', function () {
    $response = HacktoberfestServer::prompt(DescribeHacktoberfestPrompt::class, [
        'experience_level' => 'beginner',
    ]);

    $response
        ->assertOk()
        ->assertSee('HacktoberfestBot')
        ->assertSee('new to open source')
        ->assertSee('never contributed to an open-source project before');
});

test('describe hacktoberfest prompt works for intermediate level', function () {
    $response = HacktoberfestServer::prompt(DescribeHacktoberfestPrompt::class, [
        'experience_level' => 'intermediate',
    ]);

    $response
        ->assertOk()
        ->assertSee('some experience with git')
        ->assertSee('made a few contributions');
});

test('describe hacktoberfest prompt works for advanced level', function () {
    $response = HacktoberfestServer::prompt(DescribeHacktoberfestPrompt::class, [
        'experience_level' => 'advanced',
    ]);

    $response
        ->assertOk()
        ->assertSee('experienced open-source contributor')
        ->assertSee('maintainer')
        ->assertSee('mentoring newcomers');
});

test('describe hacktoberfest prompt accepts focus area', function () {
    $response = HacktoberfestServer::prompt(DescribeHacktoberfestPrompt::class, [
        'experience_level' => 'beginner',
        'focus_area' => 'web development',
    ]);

    $response
        ->assertOk()
        ->assertSee('web development');
});

test('find projects to contribute prompt requires languages', function () {
    $response = HacktoberfestServer::prompt(FindProjectsToContributePrompt::class, [
        'skill_level' => 'beginner',
    ]);

    $response->assertHasErrors([
        'Please specify at least one programming language you want to work with.',
    ]);
});

test('find projects to contribute prompt requires skill level', function () {
    $response = HacktoberfestServer::prompt(FindProjectsToContributePrompt::class, [
        'languages' => 'JavaScript, Python',
    ]);

    $response->assertHasErrors([
        'Please specify your skill level (beginner, intermediate, or advanced).',
    ]);
});

test('find projects to contribute prompt validates skill level', function () {
    $response = HacktoberfestServer::prompt(FindProjectsToContributePrompt::class, [
        'languages' => 'JavaScript',
        'skill_level' => 'novice',
    ]);

    $response->assertHasErrors([
        'Skill level must be: beginner, intermediate, or advanced.',
    ]);
});

test('find projects to contribute prompt works with required parameters', function () {
    $response = HacktoberfestServer::prompt(FindProjectsToContributePrompt::class, [
        'languages' => 'JavaScript, Python',
        'skill_level' => 'beginner',
    ]);

    $response
        ->assertOk()
        ->assertSee('HacktoberfestBot')
        ->assertSee('JavaScript, Python')
        ->assertSee('beginner');
});

test('find projects to contribute prompt includes interests', function () {
    $response = HacktoberfestServer::prompt(FindProjectsToContributePrompt::class, [
        'languages' => 'PHP',
        'skill_level' => 'intermediate',
        'interests' => 'web frameworks, API development',
    ]);

    $response
        ->assertOk()
        ->assertSee('web frameworks, API development');
});

test('find projects to contribute prompt tailors message to skill level', function () {
    $beginnerResponse = HacktoberfestServer::prompt(FindProjectsToContributePrompt::class, [
        'languages' => 'Python',
        'skill_level' => 'beginner',
    ]);

    $beginnerResponse
        ->assertOk()
        ->assertSee('beginner-friendly')
        ->assertSee('good documentation');

    $advancedResponse = HacktoberfestServer::prompt(FindProjectsToContributePrompt::class, [
        'languages' => 'Python',
        'skill_level' => 'advanced',
    ]);

    $advancedResponse
        ->assertOk()
        ->assertSee('challenging projects')
        ->assertSee('significant impact');
});

test('explain contribution process prompt requires scenario', function () {
    $response = HacktoberfestServer::prompt(ExplainContributionProcessPrompt::class, []);

    $response->assertHasErrors([
        'Please specify the scenario you need help with.',
    ]);
});

test('explain contribution process prompt validates scenario', function () {
    $response = HacktoberfestServer::prompt(ExplainContributionProcessPrompt::class, [
        'scenario' => 'advanced-contribution',
    ]);

    $response->assertHasErrors([
        'Scenario must be one of: first-time, bug-fix, feature-add, documentation, after-rejection.',
    ]);
});

test('explain contribution process prompt works for first time scenario', function () {
    $response = HacktoberfestServer::prompt(ExplainContributionProcessPrompt::class, [
        'scenario' => 'first-time',
    ]);

    $response
        ->assertOk()
        ->assertSee('never contributed to open source before')
        ->assertSee('git workflow')
        ->assertSee('fork, clone, branch, commit, push');
});

test('explain contribution process prompt works for bug fix scenario', function () {
    $response = HacktoberfestServer::prompt(ExplainContributionProcessPrompt::class, [
        'scenario' => 'bug-fix',
    ]);

    $response
        ->assertOk()
        ->assertSee('found a bug')
        ->assertSee('reproduce and document')
        ->assertSee('tests, edge cases');
});

test('explain contribution process prompt works for feature add scenario', function () {
    $response = HacktoberfestServer::prompt(ExplainContributionProcessPrompt::class, [
        'scenario' => 'feature-add',
    ]);

    $response
        ->assertOk()
        ->assertSee('add a new feature')
        ->assertSee('propose a new feature')
        ->assertSee('write tests for new functionality');
});

test('explain contribution process prompt works for documentation scenario', function () {
    $response = HacktoberfestServer::prompt(ExplainContributionProcessPrompt::class, [
        'scenario' => 'documentation',
    ]);

    $response
        ->assertOk()
        ->assertSee('contribute to documentation')
        ->assertSee('types of documentation contributions')
        ->assertSee('technical writing');
});

test('explain contribution process prompt works for after rejection scenario', function () {
    $response = HacktoberfestServer::prompt(ExplainContributionProcessPrompt::class, [
        'scenario' => 'after-rejection',
    ]);

    $response
        ->assertOk()
        ->assertSee('pull request')
        ->assertSee('rejected')
        ->assertSee('professionally respond')
        ->assertSee('learn from the rejection');
});

test('explain contribution process prompt accepts project type', function () {
    $response = HacktoberfestServer::prompt(ExplainContributionProcessPrompt::class, [
        'scenario' => 'first-time',
        'project_type' => 'web framework',
    ]);

    $response
        ->assertOk()
        ->assertSee('web framework');
});

test('explain contribution process prompt uses default project type', function () {
    $response = HacktoberfestServer::prompt(ExplainContributionProcessPrompt::class, [
        'scenario' => 'bug-fix',
    ]);

    $response
        ->assertOk()
        ->assertSee('a typical open source project');
});
