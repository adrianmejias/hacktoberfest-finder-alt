<?php

declare(strict_types=1);

namespace App\Services\GitHub\Facades;

use App\Services\GitHub\Contracts\GitHubContract;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Facade;

/**
 * @method static array getAllLanguages()
 * @method static bool isValidLanguage(string $language)
 * @method static string getBaseUri()
 * @method static \App\Services\GitHub\Contracts\GitHubContract setBaseUri(string $baseUri)
 * @method static \App\Services\GitHub\Contracts\GitHubContract setPage(int $page)
 * @method static int getPage()
 * @method static \App\Services\GitHub\Contracts\GitHubContract setPerPage(int $perPage)
 * @method static int getPerPage()
 * @method static \App\Services\GitHub\Contracts\GitHubContract setLanguage(string $language, bool $validate = false)
 * @method static string|null getLanguage()
 * @method static \App\Services\GitHub\Contracts\GitHubContract setLabels(array $labels)
 * @method static string|null getLabels()
 * @method static \App\Services\GitHub\Contracts\GitHubContract setComments(int $count)
 * @method static int|null getComments()
 * @method static string getUrl(array|null $params = [])
 * @method static Collection execute(array|null $params = [])
 *
 * @see \App\Services\GitHub\Contracts\GitHubContract
 */
class GitHub extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return GitHubContract::class;
    }
}
