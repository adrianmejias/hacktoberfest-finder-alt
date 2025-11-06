# Hacktoberfest Project Suggestions

@if ($language)
**Language:** {{ $language }}
@endif

**Label:** {{ $label }}
**Found:** {{ $results->count() }} projects
---

@php $number = 1; @endphp
@foreach ($results as $item)
@php
    $repo = $item['repository_url'] ?? 'N/A';
    $repoName = Str::of($repo)->replace('https://api.github.com/repos/', '')->__toString();
    $repoUrl = Str::of('https://github.com')->append($repoName)->__toString();
@endphp

## {{ $number }}. {{ $item['title'] ?? '' }}
**Repository:** [{{ $repoName }}]({{ $repoUrl }})
**Issue:** [{{ $item['title'] ?? '' }}]({{ $item['html_url'] ?? '' }})

@if (!empty($item['labels']))
@php $labels = array_map(fn($l) => $l['name'], $item['labels']); @endphp
**Labels:** {{ implode(', ', $labels) }}
@endif

**Description:**
@if (!empty($item['body']))
{{ Str::of($item['body'])->limit(200) }}
@else
No description provided.
@endif
---
@php $number++; @endphp
@endforeach

**Tip:** Click on the issue links to view full details and start contributing!
