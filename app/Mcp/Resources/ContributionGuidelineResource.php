<?php

namespace App\Mcp\Resources;

use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Resource;

class ContributionGuidelineResource extends Resource
{
    /**
     * The resource's URI.
     */
    protected string $uri = 'hacktoberfest://guidelines/contribution-best-practices';

    /**
     * The resource's description.
     */
    protected string $description = 'Best practices and guidelines for making quality contributions to open-source projects during Hacktoberfest.';

    /**
     * Handle the resource request.
     */
    public function handle(Request $request): Response
    {
        $content = <<<'MARKDOWN'
# Open Source Contribution Best Practices

This resource outlines best practices for making quality contributions to open-source projects, with a focus on Hacktoberfest participation.

## Core Principles

### 1. Quality Over Quantity
- Focus on meaningful contributions
- Don't chase rewards with minimal effort
- Take time to understand the project
- Make contributions you're proud of

### 2. Respect and Professionalism
- Be respectful to maintainers and contributors
- Follow the code of conduct
- Accept criticism gracefully
- Give constructive feedback

### 3. Communication is Key
- Ask questions before starting work
- Keep maintainers informed of progress
- Respond promptly to feedback
- Be clear and concise in communications

## Before Contributing

### Research the Project

1. **Read the Documentation**
   - README.md - Understand what the project does
   - CONTRIBUTING.md - Learn contribution process
   - CODE_OF_CONDUCT.md - Understand community standards
   - LICENSE - Know usage terms

2. **Explore the Codebase**
   - Clone the repository
   - Run the project locally
   - Review the file structure
   - Read existing code

3. **Check Project Activity**
   - Recent commits and releases
   - Open issues and PRs
   - Maintainer responsiveness
   - Community engagement

### Choose the Right Issue

✅ **Good Issue Characteristics:**
- Clearly defined problem
- Labeled "good first issue" or "help wanted"
- No one else is working on it
- Matches your skill level
- Has maintainer engagement

❌ **Avoid:**
- Stale issues (no activity for months)
- Complex issues without proper context
- Issues already assigned to someone
- Vague or poorly described problems

## Making Your Contribution

### 1. Claim the Issue
```markdown
Hi! I'd like to work on this issue.
I plan to [brief description of approach].
Is this approach acceptable? Is anyone already working on this?
```

### 2. Fork and Branch
```bash
# Fork the repository on GitHub
git clone https://github.com/YOUR-USERNAME/PROJECT.git
cd PROJECT

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL-OWNER/PROJECT.git

# Create a feature branch
git checkout -b fix-issue-123
```

### 3. Follow Coding Standards

#### Code Style
- Match the existing code style
- Use the project's linter/formatter
- Follow language conventions
- Keep changes consistent

#### Code Quality
- Write clean, readable code
- Add comments for complex logic
- Remove commented-out code
- No debug console.logs or print statements

#### Testing
- Write tests for new features
- Ensure existing tests pass
- Test edge cases
- Manual testing before submission

### 4. Commit Messages

#### Good Commit Message Format:
```
Type: Short summary (50 chars or less)

More detailed explanation if needed. Wrap at 72 characters.
Explain what changed and why, not how.

- Bullet points are fine
- Reference issues: Fixes #123

Co-authored-by: Name <email>
```

#### Types:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting, missing semicolons
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

#### Examples:
```bash
# Good
git commit -m "fix: resolve memory leak in data processing (#123)"
git commit -m "feat: add dark mode toggle to settings page"
git commit -m "docs: update installation instructions for Windows"

# Bad
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "asdfasdf"
```

### 5. Create a Quality Pull Request

#### PR Title
- Clear and descriptive
- Reference issue number
- Follow project conventions

```
Fix: Memory leak in data processing (#123)
Feature: Add dark mode support
Docs: Update Windows installation guide
```

#### PR Description Template

```markdown
## Description
Brief summary of changes and motivation.

## Related Issue
Fixes #123

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature)
- [ ] Documentation update

## Changes Made
- Specific change 1
- Specific change 2
- Specific change 3

## How Has This Been Tested?
Describe your testing process.

## Screenshots (if applicable)
Before: [image]
After: [image]

## Checklist
- [ ] My code follows the project's style
- [ ] I have performed a self-review
- [ ] I have commented complex code
- [ ] I have updated documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests
- [ ] All tests pass locally
```

### 6. After Submission

#### Respond to Feedback
- Monitor notifications
- Respond within 24-48 hours
- Ask for clarification if needed
- Make requested changes promptly

#### Updating Your PR
```bash
# Make requested changes
git add .
git commit -m "Address review feedback"
git push origin fix-issue-123
```

#### If Changes Conflict
```bash
# Update your branch with latest main
git fetch upstream
git rebase upstream/main
git push --force-with-lease origin fix-issue-123
```

## What Makes a Good Contribution?

### Code Contributions

✅ **Good:**
- Fixes actual bugs
- Adds requested features
- Improves performance
- Enhances security
- Adds missing tests
- Refactors unclear code

❌ **Bad:**
- Fixing minor typos as separate PRs
- Whitespace-only changes
- Reformatting code without permission
- Adding dependencies unnecessarily
- Making unsolicited redesigns

### Documentation Contributions

✅ **Good:**
- Fixing errors or outdated info
- Adding missing documentation
- Improving clarity
- Adding examples
- Translating content
- Creating tutorials

❌ **Bad:**
- Fixing single typos in README
- Changing personal preferences
- Adding unnecessary complexity
- Grammar nitpicking without value

### Non-Code Contributions

- Triaging issues
- Helping in discussions
- Creating design assets
- Writing tests
- Improving accessibility
- Performance testing

## Common Mistakes to Avoid

### 1. Spam Contributions
❌ Multiple PRs for trivial changes
❌ Automated or script-generated PRs
❌ Changes that add no value
❌ Copying code without attribution

### 2. Ignoring Guidelines
❌ Not reading CONTRIBUTING.md
❌ Skipping tests
❌ Ignoring code style
❌ Not following PR template

### 3. Poor Communication
❌ Not responding to feedback
❌ Being defensive or rude
❌ Demanding quick reviews
❌ Ignoring maintainer requests

### 4. Technical Issues
❌ Breaking existing functionality
❌ Not testing changes
❌ Introducing bugs
❌ Creating merge conflicts

## Dealing with Rejection

### If Your PR is Rejected

1. **Stay Professional**
   - Don't take it personally
   - Ask for clarification
   - Learn from feedback

2. **Understand Why**
   - Not aligned with project goals
   - Doesn't meet quality standards
   - Duplicate of existing work
   - Project constraints

3. **Learn and Improve**
   - Review the feedback
   - Ask questions
   - Try another issue
   - Apply lessons learned

## Hacktoberfest-Specific Guidelines

### Rules Reminder

1. **Four Quality PRs**
   - Make 4 PRs between Oct 1-31
   - To participating repositories
   - Must be merged or approved

2. **Spam Prevention**
   - Don't create spammy PRs
   - Avoid automated contributions
   - Focus on meaningful changes
   - Respect maintainer time

3. **Repository Requirements**
   - Must have "hacktoberfest" topic
   - Or PR labeled "hacktoberfest-accepted"
   - Must be public repository
   - Must not be excluded

### What Counts as Spam?

❌ PRs labeled as "spam"
❌ PRs labeled as "invalid"
❌ PRs in repositories that ban Hacktoberfest
❌ Automated PRs without value
❌ Trivial changes (whitespace only)
❌ Duplicate PRs

### Maintaining Your Reputation

✅ Make meaningful contributions
✅ Follow project guidelines
✅ Communicate effectively
✅ Be patient and respectful
✅ Learn from experience

## Resources

### Learning
- [First Contributions](https://github.com/firstcontributions/first-contributions)
- [Open Source Guide](https://opensource.guide/)
- [GitHub Skills](https://skills.github.com/)

### Tools
- [GitHub CLI](https://cli.github.com/)
- [GitHub Desktop](https://desktop.github.com/)
- [Git Documentation](https://git-scm.com/doc)

### Communities
- [Hacktoberfest Discord](https://discord.gg/hacktoberfest)
- [Dev.to Hacktoberfest](https://dev.to/t/hacktoberfest)
- Project-specific communities

## Final Tips

1. **Start Early** - Don't wait until the last week
2. **Choose Wisely** - Pick projects you care about
3. **Read Everything** - All docs, all guidelines
4. **Ask Questions** - Better to ask than assume
5. **Be Patient** - Reviews take time
6. **Learn Always** - Every PR is a lesson
7. **Give Back** - Help others in the community
8. **Have Fun** - Enjoy the journey!

---

*Remember: Open source is about building community and creating value, not just merging code. Make contributions you're proud of!* 🌟
MARKDOWN;

        return Response::text($content);
    }
}
