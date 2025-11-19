<?php

declare(strict_types=1);

namespace App\Services\GitHub\Contracts;

interface GitHubContract
{
    /**
     * Search GitHub issues.
     *
     * @param  string  $query  The search query string
     * @return array<string, mixed>
     *
     * @throws \App\Services\GitHub\Exceptions\GitHubException
     */
    public function issues(string $query): array;
}
