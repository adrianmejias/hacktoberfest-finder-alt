<?php

use Inertia\Testing\AssertableInertia as Assert;

test('mcp guide page is accessible', function () {
    $response = $this->get(route('mcp'));

    $response->assertSuccessful();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Mcp')
    );
});

test('mcp guide page returns server url', function () {
    $response = $this->get(route('mcp'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Mcp')
        ->has('serverUrl')
        ->where('serverUrl', route('mcp.hacktoberfest'))
    );
});

test('mcp guide page returns all tools', function () {
    $response = $this->get(route('mcp'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Mcp')
        ->has('tools', 3)
        ->has('tools.0', fn (Assert $tool) => $tool
            ->where('name', 'suggest-open-source-projects')
            ->has('description')
            ->has('parameters', 6)
        )
        ->has('tools.1', fn (Assert $tool) => $tool
            ->where('name', 'get-current-hacktoberfest-info')
            ->has('description')
            ->has('parameters', 0)
        )
        ->has('tools.2', fn (Assert $tool) => $tool
            ->where('name', 'guide-contribution-process')
            ->has('description')
            ->has('parameters', 1)
        )
    );
});

test('mcp guide page tools have required parameter structure', function () {
    $response = $this->get(route('mcp'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Mcp')
        ->has('tools.0.parameters.0', fn (Assert $param) => $param
            ->where('name', 'q')
            ->where('type', 'string')
            ->where('required', true)
            ->has('description')
        )
    );
});

test('mcp guide page returns all resources', function () {
    $response = $this->get(route('mcp'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Mcp')
        ->has('resources', 3)
        ->has('resources.0', fn (Assert $resource) => $resource
            ->where('uri', 'hacktoberfest://event/current')
            ->where('name', 'Hacktoberfest Event')
            ->has('description')
        )
        ->has('resources.1', fn (Assert $resource) => $resource
            ->where('uri', 'hacktoberfest://project/template')
            ->where('name', 'Open Source Project')
            ->has('description')
        )
        ->has('resources.2', fn (Assert $resource) => $resource
            ->where('uri', 'hacktoberfest://guidelines/contribution')
            ->where('name', 'Contribution Guidelines')
            ->has('description')
        )
    );
});

test('mcp guide page returns all prompts', function () {
    $response = $this->get(route('mcp'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Mcp')
        ->has('prompts', 3)
        ->has('prompts.0', fn (Assert $prompt) => $prompt
            ->where('name', 'describe-hacktoberfest')
            ->has('description')
        )
        ->has('prompts.1', fn (Assert $prompt) => $prompt
            ->where('name', 'find-projects-to-contribute')
            ->has('description')
        )
        ->has('prompts.2', fn (Assert $prompt) => $prompt
            ->where('name', 'explain-contribution-process')
            ->has('description')
        )
    );
});

test('mcp guide page has correct suggest-open-source-projects tool parameters', function () {
    $response = $this->get(route('mcp'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Mcp')
        ->has('tools.0', fn (Assert $tool) => $tool
            ->where('name', 'suggest-open-source-projects')
            ->has('description')
            ->has('parameters.0', fn (Assert $param) => $param
                ->where('name', 'q')
                ->where('type', 'string')
                ->where('required', true)
                ->has('description')
            )
            ->has('parameters.1', fn (Assert $param) => $param
                ->where('name', 'language')
                ->where('type', 'string')
                ->where('required', false)
                ->has('description')
            )
            ->has('parameters.2', fn (Assert $param) => $param
                ->where('name', 'label')
                ->where('type', 'string')
                ->where('required', false)
                ->has('description')
            )
            ->has('parameters.3', fn (Assert $param) => $param
                ->where('name', 'comments')
                ->where('type', 'string')
                ->where('required', false)
                ->has('description')
            )
            ->has('parameters.4', fn (Assert $param) => $param
                ->where('name', 'page')
                ->where('type', 'integer')
                ->where('required', false)
                ->has('description')
            )
            ->has('parameters.5', fn (Assert $param) => $param
                ->where('name', 'limit')
                ->where('type', 'integer')
                ->where('required', false)
                ->has('description')
            )
        )
    );
});

test('mcp guide page has correct guide-contribution-process tool parameters', function () {
    $response = $this->get(route('mcp'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Mcp')
        ->has('tools.2', fn (Assert $tool) => $tool
            ->where('name', 'guide-contribution-process')
            ->has('description')
            ->has('parameters.0', fn (Assert $param) => $param
                ->where('name', 'step')
                ->where('type', 'string')
                ->where('required', false)
                ->has('description')
            )
        )
    );
});

test('mcp guide page can be accessed without authentication', function () {
    $response = $this->get(route('mcp'));

    $response->assertSuccessful();
});

test('mcp guide page has all required props structure', function () {
    $response = $this->get(route('mcp'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Mcp')
        ->has('serverUrl')
        ->has('tools')
        ->has('resources')
        ->has('prompts')
    );
});
