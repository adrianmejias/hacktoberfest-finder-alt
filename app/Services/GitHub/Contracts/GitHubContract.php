<?php

declare(strict_types=1);

namespace App\Services\GitHub\Contracts;

use App\Services\GitHub\Exceptions\GitHubException;

interface GitHubContract
{
    /**
     * Search GitHub issues.
     *
     * @param  string  $query  The search query string
     * @return array<string, mixed>
     *
     * @throws GitHubException
     */
    public function issues(string $query): array;
}
