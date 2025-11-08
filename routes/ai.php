<?php

use App\Mcp\Servers\HacktoberfestServer;
use Laravel\Mcp\Facades\Mcp;

// Mcp::web('/mcp/demo', \App\Mcp\Servers\PublicServer::class);

Mcp::web('/mcp/hacktoberfest', HacktoberfestServer::class)
    // ->middleware(['throttle:mcp'])
    ->name('mcp.hacktoberfest');
