<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleETag
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! in_array($request->getMethod(), ['GET', 'HEAD'], true)) {
            return $next($request);
        }

        /** @var Response $response */
        $response = $next($request);

        if (! $response->isSuccessful()) {
            return $response;
        }

        $etag = sprintf('"%s"', md5((string) $response->getContent()));
        $etags = $request->getETags();

        if ($etags && in_array($etag, $etags, true)) {
            return $response->setNotModified();
        }

        return $response->setETag($etag);
    }
}
