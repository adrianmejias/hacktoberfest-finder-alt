<?php

declare(strict_types=1);

namespace App\Services\GitHub;

use App\Services\GitHub\Contracts\GitHubContract;
use App\Services\GitHub\Exceptions\GitHubException;
use Illuminate\Http\Client\Factory as Http;

class GitHubService implements GitHubContract
{
    /**
     * Create a new GitHub service instance.
     */
    public function __construct(
        protected Http $http,
        protected string $baseUrl = '',
        protected int $timeout = 10,
        protected string $userAgent = 'Hacktoberfest-Finder',
        protected string $version = '2022-11-28',
    ) {
        $this->baseUrl = $baseUrl ?: config('github.service.base_url');
        $this->timeout = $timeout ?: config('github.service.timeout');
        $this->userAgent = $userAgent ?: config('github.service.user_agent');
        $this->version = $version ?: config('github.service.version');
    }

    /**
     * Search GitHub issues.
     *
     * @param  string  $query  The search query string
     * @return array<string, mixed>
     *
     * @throws GitHubException
     */
    public function issues(string $query): array
    {
        $response = $this->http
            ->withHeaders([
                'Accept' => 'application/vnd.github+json',
                'X-GitHub-Api-Version' => $this->version,
                'User-Agent' => $this->userAgent,
            ])
            ->timeout($this->timeout)
            ->get("{$this->baseUrl}/search/issues", [
                'q' => $query,
            ]);

        if ($response->failed()) {
            $message = $response->json('message', 'GitHub API request failed');
            $status = $response->status();

            throw new GitHubException(
                message: "{$message} (HTTP {$status})",
                code: $status
            );
        }

        return $response->json();
    }
}
