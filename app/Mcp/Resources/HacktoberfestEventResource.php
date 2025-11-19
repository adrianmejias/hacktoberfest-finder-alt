<?php

namespace App\Mcp\Resources;

use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Resource;

class HacktoberfestEventResource extends Resource
{
    /**
     * The resource's URI.
     */
    protected string $uri = 'hacktoberfest://event/current';

    /**
     * The resource's description.
     */
    protected string $description = 'Comprehensive information about the Hacktoberfest event, including history, mission, and current year details.';

    /**
     * Handle the resource request.
     */
    public function handle(Request $request): Response
    {
        $content = <<<'MARKDOWN'
# Hacktoberfest Event Information

## What is Hacktoberfest?

Hacktoberfest is a month-long celebration of open-source software run by DigitalOcean in partnership with various sponsors. The event encourages people to contribute to open-source projects and helps grow the open-source community.

## History

- **Founded:** 2014
- **Organizer:** DigitalOcean (in partnership with GitHub, Twilio, and other sponsors)
- **Growth:** Started with a few thousand participants and has grown to hundreds of thousands worldwide
- **Mission:** To support and celebrate open source while encouraging meaningful contributions

## Event Schedule (Annual)

### Registration Period
- Opens: Late September (typically September 26)
- Closes: October 31

### Contribution Period
- Start: October 1 at 12:00 AM in any time zone
- End: October 31 at 11:59 PM in any time zone

### Review Period
- November: Maintainer review and validation period
- December: Rewards distributed (historically)

## Participation Requirements

### For Contributors

1. **Registration**
   - Create an account on hacktoberfest.com
   - Link your GitHub or GitLab account
   - Agree to the participation rules

2. **Contribution Goals**
   - Make 4 valid pull requests (PRs) or merge requests (MRs)
   - PRs must be to participating public repositories
   - Contributions must be made between October 1-31

3. **Valid Contributions**
   - PR/MR must not be spam or marked as invalid
   - Must be merged, approved by maintainer, or have "hacktoberfest-accepted" label
   - Must be in repositories with "hacktoberfest" topic
   - Low-quality PRs (minor typos, automated PRs) may be marked as invalid

### For Maintainers

1. **Opt-In Your Repository**
   - Add "hacktoberfest" topic to your repository
   - Or apply "hacktoberfest-accepted" label to specific issues/PRs

2. **Quality Control**
   - Review PRs promptly
   - Mark spam or invalid PRs with "spam" or "invalid" labels
   - Provide constructive feedback

## Types of Contributions

### Code Contributions
- Bug fixes
- New features
- Performance improvements
- Security patches
- Test coverage

### Non-Code Contributions
- Documentation improvements
- Translation
- Design assets
- Tutorial creation
- Issue triage

## Rewards and Recognition

### Historical Rewards
- **2014-2021:** Limited edition T-shirts
- **2022:** Digital badges and tree planting option
- **2023+:** Digital reward kit, badges, and recognition

### Additional Benefits
- Portfolio building
- Learning opportunities
- Networking with developers
- Contributing to projects you use
- Supporting open source sustainability

## Community Guidelines

### Do's
✅ Make meaningful contributions
✅ Read contribution guidelines
✅ Communicate with maintainers
✅ Test your changes
✅ Write clear PR descriptions
✅ Be patient with reviews
✅ Learn from feedback

### Don'ts
❌ Submit spam or low-quality PRs
❌ Make trivial changes just for swag
❌ Ignore project guidelines
❌ Create duplicate PRs
❌ Pressure maintainers
❌ Be disrespectful

## Official Resources

- **Website:** https://hacktoberfest.com
- **FAQs:** https://hacktoberfest.com/participation
- **Discord:** Official Hacktoberfest Discord community
- **Social Media:** @hacktoberfest on Twitter/X

## Impact

Hacktoberfest has:
- Generated millions of pull requests
- Connected hundreds of thousands of contributors
- Supported thousands of open-source projects
- Helped newcomers start their open-source journey
- Raised awareness about open-source sustainability

## Tips for Success

1. Start early (don't wait until the last week)
2. Focus on quality over quantity
3. Choose projects you care about
4. Learn from code reviews
5. Build relationships in communities
6. Have fun and enjoy the journey!

---

*Remember: Hacktoberfest is about celebrating open source, learning, and building community - not just about getting rewards.*
MARKDOWN;

        return Response::text($content);
    }
}
