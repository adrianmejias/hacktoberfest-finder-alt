<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import WelcomeHeader from '@/components/WelcomeHeader.vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';

interface ToolParameter {
    name: string;
    type: string;
    required: boolean;
    description: string;
}

interface Tool {
    name: string;
    description: string;
    parameters: ToolParameter[];
}

interface Resource {
    uri: string;
    name: string;
    description: string;
}

interface Prompt {
    name: string;
    description: string;
}

interface SearchItem {
    repo_title: string;
    repo_url: string;
    repo_name: string;
    repo_link: string;
    updated_at: string;
    labels: string[];
    body: string;
}

interface SearchResult {
    total_amount: number;
    items: SearchItem[];
}

interface Props {
    canRegister: boolean;
    languages?: string[];
    query?: string;
    results?: SearchResult;
    selectedLanguage?: string | null;
    serverUrl: string;
    tools: Tool[];
    resources: Resource[];
    prompts: Prompt[];
}

withDefaults(
    defineProps<Props>(),
    {
        canRegister: true,
        selectedLanguage: localStorage.getItem('language') || null,
    },
);

const openSections = ref<Record<string, boolean>>({
    setup: false,
    tools: false,
    resources: false,
    prompts: false,
    examples: false,
});
</script>

<template>
    <Head title="MCP Server Guide">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossorigin="true"
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
        />
    </Head>
    <div
        class="bg-background text-foreground flex min-h-screen flex-col items-center p-6 lg:justify-center lg:p-8"
    >
        <WelcomeHeader
            :can-register="canRegister"
            :is-authenticated="!!$page.props.auth.user"
        />

        <div class="duration-750 starting:opacity-0 flex w-full items-center justify-center opacity-100 transition-opacity lg:grow">
            <main
                class="flex w-full max-w-[335px] flex-col gap-6 rounded-lg lg:max-w-4xl"
            >
            <!-- Hero Section -->
            <div class="mb-8">
                <h1 class="text-4xl font-bold tracking-tight">
                    MCP Server Guide
                </h1>
                <p class="text-muted-foreground mt-2 text-lg">
                    Connect this Hacktoberfest Finder to Claude Desktop or
                    Claude Code using the Model Context Protocol (MCP)
                </p>
            </div>

            <!-- What is MCP -->
            <Card class="mb-6">
                <CardHeader>
                    <CardTitle>What is MCP?</CardTitle>
                    <CardDescription>
                        Understanding Model Context Protocol
                    </CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <p>
                        The <strong>Model Context Protocol (MCP)</strong> is an
                        open protocol that enables AI applications to connect to
                        external data sources and tools. Think of it as a bridge
                        between Claude and this Hacktoberfest Finder
                        application.
                    </p>
                    <p>
                        By connecting Claude to this MCP server, you gain access
                        to:
                    </p>
                    <ul class="ml-6 list-disc space-y-1">
                        <li>
                            Real-time Hacktoberfest project search powered by
                            GitHub's API
                        </li>
                        <li>
                            Comprehensive Hacktoberfest event information and
                            guidelines
                        </li>
                        <li>
                            Step-by-step contribution guidance for open source
                            projects
                        </li>
                        <li>Pre-configured prompts for common tasks</li>
                    </ul>
                </CardContent>
            </Card>

            <!-- Server URL Alert -->
            <Alert class="mb-6">
                <AlertTitle>Server Endpoint</AlertTitle>
                <AlertDescription>
                    <code class="bg-muted rounded px-2 py-1 font-mono text-sm wrap-anywhere">
                        {{ serverUrl }}
                    </code>
                </AlertDescription>
            </Alert>

            <!-- Setup Instructions -->
            <Collapsible v-model:open="openSections.setup" class="mb-6">
                <Card>
                    <CardHeader>
                        <CollapsibleTrigger
                            class="flex w-full items-center justify-between"
                        >
                            <div class="text-left">
                                <CardTitle>Setup Instructions</CardTitle>
                                <CardDescription>
                                    Connect to Claude Desktop or Claude Code
                                </CardDescription>
                            </div>
                            <svg
                                class="size-5 transition-transform"
                                :class="{ 'rotate-180': openSections.setup }"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent>
                        <CardContent class="space-y-6">
                            <!-- Claude Desktop -->
                            <div>
                                <h3 class="mb-3 text-lg font-semibold">
                                    For Claude Desktop
                                </h3>

                                <div class="space-y-4">
                                    <div>
                                        <h4 class="mb-2 font-medium">
                                            1. Locate Config File
                                        </h4>
                                        <ul
                                            class="ml-6 list-disc space-y-1 text-sm"
                                        >
                                            <li>
                                                <strong>macOS/Linux:</strong>
                                                <code
                                                    class="bg-muted ml-1 rounded px-1 py-0.5 font-mono text-xs wrap-anywhere"
                                                >
                                                    ~/Library/Application
                                                    Support/Claude/claude_desktop_config.json
                                                </code>
                                            </li>
                                            <li>
                                                <strong>Windows:</strong>
                                                <code
                                                    class="bg-muted ml-1 rounded px-1 py-0.5 font-mono text-xs wrap-anywhere"
                                                >
                                                    %APPDATA%\Claude\claude_desktop_config.json
                                                </code>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 class="mb-2 font-medium">
                                            2. Add Configuration
                                        </h4>
                                        <pre
                                            class="bg-muted overflow-x-auto rounded-lg p-4 text-sm"
                                        ><code class="wrap-anywhere">{
  "mcpServers": {
    "hacktoberfest": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-fetch",
        "{{ serverUrl }}"
      ]
    }
  }
}</code></pre>
                                    </div>

                                    <div>
                                        <h4 class="mb-2 font-medium">
                                            3. Quick Setup (Terminal)
                                        </h4>
                                        <p
                                            class="text-muted-foreground mb-2 text-sm"
                                        >
                                            Run this command to automatically
                                            configure:
                                        </p>
                                        <pre
                                            class="bg-muted overflow-x-auto rounded-lg p-4 text-sm"
                                        ><code class="wrap-anywhere">mkdir -p ~/Library/Application\ Support/Claude
cat &gt; ~/Library/Application\ Support/Claude/claude_desktop_config.json &lt;&lt; 'EOF'
{
  "mcpServers": {
    "hacktoberfest": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-fetch",
        "{{ serverUrl }}"
      ]
    }
  }
}
EOF</code></pre>
                                    </div>

                                    <div>
                                        <h4 class="mb-2 font-medium">
                                            4. Restart Claude Desktop
                                        </h4>
                                        <p
                                            class="text-muted-foreground text-sm"
                                        >
                                            Close and reopen Claude Desktop for
                                            changes to take effect.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <!-- VS Code (Claude Code) -->
                            <div>
                                <h3 class="mb-3 text-lg font-semibold">
                                    For VS Code (Claude Code Extension)
                                </h3>

                                <div class="space-y-4">
                                    <div>
                                        <h4 class="mb-2 font-medium">
                                            Option 1: Workspace Settings
                                        </h4>
                                        <p
                                            class="text-muted-foreground mb-2 text-sm"
                                        >
                                            Add to
                                            <code
                                                class="bg-muted rounded px-1 py-0.5 font-mono text-xs wrap-anywhere"
                                            >
                                                .vscode/settings.json
                                            </code>
                                        </p>
                                        <pre
                                            class="bg-muted overflow-x-auto rounded-lg p-4 text-sm"
                                        ><code class="wrap-anywhere">{
  "mcpServers": {
    "hacktoberfest": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-fetch",
        "{{ serverUrl }}"
      ]
    }
  }
}</code></pre>
                                    </div>

                                    <div>
                                        <h4 class="mb-2 font-medium">
                                            Option 2: User Settings
                                        </h4>
                                        <ol
                                            class="ml-6 list-decimal space-y-1 text-sm"
                                        >
                                            <li>
                                                Press
                                                <code
                                                    class="bg-muted rounded px-1 py-0.5 font-mono text-xs wrap-anywhere"
                                                >
                                                    Cmd/Ctrl + Shift + P
                                                </code>
                                            </li>
                                            <li>
                                                Search for "Preferences: Open
                                                User Settings (JSON)"
                                            </li>
                                            <li>
                                                Add the
                                                <code
                                                    class="bg-muted rounded px-1 py-0.5 font-mono text-xs wrap-anywhere"
                                                >
                                                    mcpServers
                                                </code>
                                                configuration
                                            </li>
                                            <li>Restart VS Code</li>
                                        </ol>
                                    </div>

                                    <div>
                                        <h4 class="mb-2 font-medium">
                                            Important
                                        </h4>
                                        <p
                                            class="text-muted-foreground mb-2 text-sm"
                                        >
                                            Make sure your Laravel development server is
                                            running before using the MCP server: <code class="bg-muted rounded px-1 py-0.5 font-mono text-xs wrap-anywhere">php artisan serve</code> or <code class="bg-muted rounded px-1 py-0.5 font-mono text-xs wrap-anywhere">composer dev</code>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            <!-- Available Tools -->
            <Collapsible v-model:open="openSections.tools" class="mb-6">
                <Card>
                    <CardHeader>
                        <CollapsibleTrigger
                            class="flex w-full items-center justify-between"
                        >
                            <div class="text-left">
                                <CardTitle>Available Tools</CardTitle>
                                <CardDescription>
                                    {{ tools.length }} AI-callable functions
                                </CardDescription>
                            </div>
                            <svg
                                class="size-5 transition-transform"
                                :class="{ 'rotate-180': openSections.tools }"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent>
                        <CardContent class="space-y-6">
                            <div
                                v-for="tool in tools"
                                :key="tool.name"
                                class="rounded-lg border p-4"
                            >
                                <h4
                                    class="mb-2 font-mono text-sm font-semibold"
                                >
                                    {{ tool.name }}
                                </h4>
                                <p class="text-muted-foreground mb-3 text-sm">
                                    {{ tool.description }}
                                </p>
                                <div
                                    v-if="tool.parameters.length > 0"
                                    class="space-y-2"
                                >
                                    <p class="text-xs font-medium">
                                        Parameters:
                                    </p>
                                    <div
                                        v-for="param in tool.parameters"
                                        :key="param.name"
                                        class="ml-4 text-sm"
                                    >
                                        <code
                                            class="bg-muted rounded px-1 py-0.5 font-mono text-xs wrap-anywhere"
                                        >
                                            {{ param.name }}
                                        </code>
                                        <span
                                            class="text-muted-foreground ml-1 text-xs"
                                        >
                                            ({{ param.type }})
                                            {{
                                                param.required
                                                    ? 'required'
                                                    : 'optional'
                                            }}
                                        </span>
                                        <p
                                            class="text-muted-foreground ml-4 mt-1 text-xs"
                                        >
                                            {{ param.description }}
                                        </p>
                                    </div>
                                </div>
                                <p v-else class="text-muted-foreground text-xs">
                                    No parameters required
                                </p>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            <!-- Available Resources -->
            <Collapsible v-model:open="openSections.resources" class="mb-6">
                <Card>
                    <CardHeader>
                        <CollapsibleTrigger
                            class="flex w-full items-center justify-between"
                        >
                            <div class="text-left">
                                <CardTitle>Available Resources</CardTitle>
                                <CardDescription>
                                    {{ resources.length }} static information
                                    resources
                                </CardDescription>
                            </div>
                            <svg
                                class="size-5 transition-transform"
                                :class="{
                                    'rotate-180': openSections.resources,
                                }"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent>
                        <CardContent class="space-y-4">
                            <div
                                v-for="resource in resources"
                                :key="resource.uri"
                                class="rounded-lg border p-4"
                            >
                                <h4 class="mb-1 font-semibold">
                                    {{ resource.name }}
                                </h4>
                                <p
                                    class="text-muted-foreground mb-2 font-mono text-xs"
                                >
                                    {{ resource.uri }}
                                </p>
                                <p class="text-muted-foreground text-sm">
                                    {{ resource.description }}
                                </p>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            <!-- Available Prompts -->
            <Collapsible v-model:open="openSections.prompts" class="mb-6">
                <Card>
                    <CardHeader>
                        <CollapsibleTrigger
                            class="flex w-full items-center justify-between"
                        >
                            <div class="text-left">
                                <CardTitle>Available Prompts</CardTitle>
                                <CardDescription>
                                    {{ prompts.length }} pre-built conversation
                                    starters
                                </CardDescription>
                            </div>
                            <svg
                                class="size-5 transition-transform"
                                :class="{ 'rotate-180': openSections.prompts }"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent>
                        <CardContent class="space-y-4">
                            <div
                                v-for="prompt in prompts"
                                :key="prompt.name"
                                class="rounded-lg border p-4"
                            >
                                <h4
                                    class="mb-2 font-mono text-sm font-semibold"
                                >
                                    {{ prompt.name }}
                                </h4>
                                <p class="text-muted-foreground text-sm">
                                    {{ prompt.description }}
                                </p>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            <!-- Usage Examples -->
            <Collapsible v-model:open="openSections.examples" class="mb-6">
                <Card>
                    <CardHeader>
                        <CollapsibleTrigger
                            class="flex w-full items-center justify-between"
                        >
                            <div class="text-left">
                                <CardTitle>Usage Examples</CardTitle>
                                <CardDescription>
                                    Try these prompts in Claude
                                </CardDescription>
                            </div>
                            <svg
                                class="size-5 transition-transform"
                                :class="{ 'rotate-180': openSections.examples }"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent>
                        <CardContent class="space-y-4">
                            <div class="rounded-lg border p-4">
                                <h4 class="mb-2 font-semibold">
                                    Find Projects
                                </h4>
                                <p class="text-muted-foreground mb-2 text-sm">
                                    "Find me some Hacktoberfest projects in
                                    Python with good first issues"
                                </p>
                                <p class="text-muted-foreground text-xs">
                                    This will use the
                                    <code
                                        class="bg-muted rounded px-1 py-0.5 font-mono wrap-anywhere"
                                    >
                                        suggest-open-source-projects
                                    </code>
                                    tool to search GitHub.
                                </p>
                            </div>

                            <div class="rounded-lg border p-4">
                                <h4 class="mb-2 font-semibold">
                                    Get Event Info
                                </h4>
                                <p class="text-muted-foreground mb-2 text-sm">
                                    "What are the rules for Hacktoberfest this
                                    year?"
                                </p>
                                <p class="text-muted-foreground text-xs">
                                    This will access the
                                    <code
                                        class="bg-muted rounded px-1 py-0.5 font-mono wrap-anywhere"
                                    >
                                        Hacktoberfest Event
                                    </code>
                                    resource.
                                </p>
                            </div>

                            <div class="rounded-lg border p-4">
                                <h4 class="mb-2 font-semibold">
                                    Contribution Help
                                </h4>
                                <p class="text-muted-foreground mb-2 text-sm">
                                    "How do I fork a repository and create a
                                    pull request?"
                                </p>
                                <p class="text-muted-foreground text-xs">
                                    This will use the
                                    <code
                                        class="bg-muted rounded px-1 py-0.5 font-mono wrap-anywhere"
                                    >
                                        guide-contribution-process
                                    </code>
                                    tool.
                                </p>
                            </div>

                            <div class="rounded-lg border p-4">
                                <h4 class="mb-2 font-semibold">
                                    Use Pre-built Prompts
                                </h4>
                                <p class="text-muted-foreground mb-2 text-sm">
                                    In Claude Desktop, look for the prompts icon
                                    and select
                                    <code
                                        class="bg-muted rounded px-1 py-0.5 font-mono text-xs wrap-anywhere"
                                    >
                                        find-projects-to-contribute
                                    </code>
                                </p>
                                <p class="text-muted-foreground text-xs">
                                    This starts an interactive conversation to
                                    find projects matching your skills.
                                </p>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            <!-- Learn More -->
            <Card>
                <CardHeader>
                    <CardTitle>Learn More</CardTitle>
                    <CardDescription>Additional resources</CardDescription>
                </CardHeader>
                <CardContent class="space-y-2">
                    <a
                        href="https://modelcontextprotocol.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-primary block text-sm hover:underline"
                    >
                        Model Context Protocol Documentation →
                    </a>
                    <a
                        href="https://github.com/laravel/mcp"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-primary block text-sm hover:underline"
                    >
                        Laravel MCP Package →
                    </a>
                    <a
                        href="https://hacktoberfest.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-primary block text-sm hover:underline"
                    >
                        Hacktoberfest Official Site →
                    </a>
                </CardContent>
            </Card>
            </main>
        </div>

        <AppFooter />
    </div>
</template>
