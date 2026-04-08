<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleCacheHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     * @param  string  $maxAge  Maximum cache age in seconds (default: 3600)
     * @param  string  $visibility  Cache visibility: 'public' or 'private' (default: 'public')
     */
    public function handle(Request $request, Closure $next, string $maxAge = '3600', string $visibility = 'public'): Response
    {
        /** @var Response $response */
        $response = $next($request);

        if (! $response->isSuccessful()) {
            return $response;
        }

        if (! in_array($request->getMethod(), ['GET', 'HEAD'], true)) {
            return $response;
        }

        $cacheControl = sprintf(
            '%s, max-age=%d, must-revalidate',
            $visibility,
            (int) $maxAge
        );

        $response->headers->set('Cache-Control', $cacheControl);
        $response->headers->set('Pragma', 'cache');
        // $response->headers->set('Expires', gmdate('D, d M Y H:i:s', time() + (int) $maxAge) . ' GMT');
        $response->headers->set('Expires', now()->addSeconds((int) $maxAge)->toRfc7231String());

        return $response;
    }
}
