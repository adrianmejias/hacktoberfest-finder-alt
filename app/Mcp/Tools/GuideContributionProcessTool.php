<?php

namespace App\Mcp\Tools;

use Illuminate\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

class GuideContributionProcessTool extends Tool
{
    /**
     * The tool's description.
     */
    protected string $description = 'Provides step-by-step guidance on how to contribute to open-source projects during Hacktoberfest, with options for specific stages of the contribution process.';

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'stage' => 'sometimes|string|in:all,getting-started,forking,making-changes,pull-request,after-pr',
        ], [
            'stage.in' => 'Stage must be one of: all, getting-started, forking, making-changes, pull-request, after-pr',
        ]);

        $stage = $validated['stage'] ?? 'all';

        $guides = [
            'getting-started' => <<<'MARKDOWN'
# Getting Started with Hacktoberfest Contributions

## 1. Register for Hacktoberfest
- Visit https://hacktoberfest.com and register with your GitHub account
- Registration typically opens in late September

## 2. Find a Project
There are several ways to find projects:
- Search GitHub for repositories with the "hacktoberfest" topic
- Look for issues labeled "good first issue" or "help wanted"
- Use Hacktoberfest Finder or similar platforms
- Check out projects you already use and love

## 3. Choose the Right Issue
- Read the issue description carefully
- Check if someone is already working on it
- Ensure you understand what needs to be done
- Look for issues that match your skill level

## 4. Understand the Project
- Read the README.md file
- Check CONTRIBUTING.md for contribution guidelines
- Look at CODE_OF_CONDUCT.md
- Review recent pull requests to understand the project's standards
MARKDOWN,

            'forking' => <<<'MARKDOWN'
# Forking and Setting Up the Repository

## 1. Fork the Repository
Click the "Fork" button on the repository page to create a copy under your GitHub account.

## 2. Clone Your Fork
```bash
git clone https://github.com/YOUR-USERNAME/REPO-NAME.git
cd REPO-NAME
```

## 3. Add Upstream Remote
This allows you to keep your fork in sync with the original repository:
```bash
git remote add upstream https://github.com/ORIGINAL-OWNER/REPO-NAME.git
git remote -v  # Verify remotes are set correctly
```

## 4. Keep Your Fork Updated
Before starting work, sync with the upstream:
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

## 5. Create a New Branch
Always create a new branch for your changes:
```bash
git checkout -b descriptive-branch-name
```
Use descriptive names like: `fix-login-bug` or `add-dark-mode-feature`
MARKDOWN,

            'making-changes' => <<<'MARKDOWN'
# Making Changes and Following Best Practices

## 1. Follow Project Guidelines
- Adhere to the coding style used in the project
- Follow any linting or formatting requirements
- Write tests if the project requires them

## 2. Make Focused Changes
- Keep your changes focused on solving one issue
- Don't mix multiple unrelated changes in one PR
- Avoid reformatting code that isn't related to your change

## 3. Write Clear Commit Messages
```bash
git add .
git commit -m "Fix: Resolve login timeout issue (#123)"
```
Good commit message format:
- Use present tense ("Add feature" not "Added feature")
- Reference issue numbers when applicable
- Be descriptive but concise

## 4. Test Your Changes
- Run existing tests: `npm test` or `composer test`
- Test your changes manually
- Ensure you haven't broken existing functionality

## 5. Document Your Changes
- Update documentation if needed
- Add comments for complex code
- Update README.md if you changed functionality
MARKDOWN,

            'pull-request' => <<<'MARKDOWN'
# Creating a Pull Request

## 1. Push Your Changes
```bash
git push origin your-branch-name
```

## 2. Create the Pull Request
- Go to your fork on GitHub
- Click "Compare & pull request"
- Choose the correct base branch (usually `main` or `master`)
- Fill in the PR template if one exists

## 3. Write a Good PR Description
Include:
- **What** you changed
- **Why** you made the change
- **How** you implemented it
- Screenshots/GIFs for UI changes
- Reference the issue number: "Fixes #123"

Example:
```
## Description
This PR fixes the login timeout issue by extending the session timeout.

## Related Issue
Fixes #123

## Changes Made
- Increased session timeout from 30 to 60 minutes
- Added session refresh on user activity
- Updated session configuration documentation

## Testing
Tested on Chrome, Firefox, and Safari
```

## 4. Request Reviews
- Tag relevant maintainers if appropriate
- Wait patiently for feedback
- Be open to suggestions and changes
MARKDOWN,

            'after-pr' => <<<'MARKDOWN'
# After Submitting Your Pull Request

## 1. Respond to Feedback
- Check your notifications regularly
- Respond promptly to reviewer comments
- Make requested changes in your branch
- Push updates - they'll automatically appear in the PR

## 2. Making Changes After Review
```bash
# Make the requested changes
git add .
git commit -m "Address review feedback"
git push origin your-branch-name
```

## 3. Keep Your PR Updated
If the base branch changes while your PR is open:
```bash
git fetch upstream
git merge upstream/main
git push origin your-branch-name
```

## 4. Be Patient and Professional
- Maintainers are volunteers with limited time
- Be respectful even if your PR is rejected
- Learn from feedback
- Don't spam or pressure for merges

## 5. After Your PR is Merged
- Celebrate! 🎉
- Delete your branch:
  ```bash
  git branch -d your-branch-name
  git push origin --delete your-branch-name
  ```
- Update your fork:
  ```bash
  git fetch upstream
  git checkout main
  git merge upstream/main
  ```

## 6. Track Your Progress
- Check your Hacktoberfest profile
- Ensure your PRs are being counted
- PRs need to be in repos with the "hacktoberfest" topic
- PRs must be merged, approved, or have the "hacktoberfest-accepted" label
MARKDOWN,
        ];

        if ($stage === 'all') {
            $response = <<<'MARKDOWN'
# Complete Guide to Contributing During Hacktoberfest

This comprehensive guide will walk you through the entire process of contributing to open-source projects during Hacktoberfest.

MARKDOWN;
            foreach ($guides as $section) {
                $response .= "\n\n".$section."\n\n---";
            }

            $response .= <<<'MARKDOWN'


## Quick Tips for Success

1. **Quality Over Quantity**: Focus on meaningful contributions
2. **Communication is Key**: Ask questions if you're unsure
3. **Be Patient**: Reviews take time
4. **Learn and Grow**: Every contribution is a learning opportunity
5. **Have Fun**: Enjoy being part of the open-source community!

## Common Pitfalls to Avoid

- Don't make PRs just for the swag
- Avoid trivial changes (fixing typos in READMEs is often discouraged)
- Don't ignore contribution guidelines
- Don't create duplicate PRs
- Avoid making changes without discussing first on complex issues

## Resources

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
- [First Contributions](https://github.com/firstcontributions/first-contributions)
- [Hacktoberfest Official Resources](https://hacktoberfest.com/participation/)

Happy Contributing! 🚀
MARKDOWN;

            return Response::text($response);
        }

        if (isset($guides[$stage])) {
            return Response::text($guides[$stage]);
        }

        return Response::error('Invalid stage specified.');
    }

    /**
     * Get the tool's input schema.
     *
     * @return array<string, \Illuminate\JsonSchema\JsonSchema>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'stage' => $schema->string()
                ->description('Specific stage of the contribution process to get guidance for')
                ->enum(['all', 'getting-started', 'forking', 'making-changes', 'pull-request', 'after-pr'])
                ->default('all'),
        ];
    }
}
