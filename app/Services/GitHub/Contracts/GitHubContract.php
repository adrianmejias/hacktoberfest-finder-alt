<?php

declare(strict_types=1);

namespace App\Services\GitHub\Contracts;

use Illuminate\Support\Collection;

interface GitHubContract
{
    /**
     * Get all available languages from config
     */
    public function getAllLanguages(): array;

    /**
     * Validate if a language exists in the config
     */
    public function isValidLanguage(string $language): bool;

    /**
     * Get the base URI for the GitHub API
     */
    public function getBaseUri(): string;

    /**
     * Set the base URI for the GitHub API
     */
    public function setBaseUri(string $baseUri): self;

    /**
     * Set the page number for pagination
     */
    public function setPage(int $page): self;

    /**
     * Get the current page number
     */
    public function getPage(): int;

    /**
     * Get the current items per page
     */
    public function getPerPage(): int;

    /**
     * Set the items per page for pagination
     */
    public function setPerPage(int $perPage): self;

    /**
     * Set the language filter
     */
    public function setLanguage(string $language, bool $validate = false): self;

    /**
     * Get the current language filter
     */
    public function getLanguage(): ?string;

    /**
     * Set the labels filter
     */
    public function setLabels(array $labels): self;

    /**
     * Get the current labels filter
     */
    public function getLabels(): ?string;

    /**
     * Set the comments filter
     */
    public function setComments(int $count): self;

    /**
     * Get the current comments filter
     */
    public function getComments(): ?int;

    /**
     * Generate the GitHub API URL with query parameters
     */
    public function getUrl(?array $params = []): string;

    /**
     * Execute the GitHub API request and return results
     */
    public function execute(?array $params = []): Collection;
}
