<?php

namespace App\Mcp\Resources;

use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Resource;

class OpenSourceProjectResource extends Resource
{
    /**
     * The resource's URI.
     */
    protected string $uri = 'hacktoberfest://projects/beginner-friendly';

    /**
     * The resource's description.
     */
    protected string $description = 'A curated list of beginner-friendly open-source projects and resources for Hacktoberfest participants.';

    /**
     * Handle the resource request.
     */
    public function handle(Request $request): Response
    {
        $content = <<<'MARKDOWN'
# Beginner-Friendly Open Source Projects

This resource provides a curated list of projects and platforms that are welcoming to newcomers and first-time contributors during Hacktoberfest.

## Finding Projects

### Official Platforms

1. **GitHub Topics**
   - Search: `topic:hacktoberfest`
   - URL: https://github.com/topics/hacktoberfest
   - Filter by language, stars, and recent activity

2. **Up For Grabs**
   - URL: https://up-for-grabs.net/
   - Curated list of projects with beginner-friendly issues
   - Filter by technology and tags

3. **Good First Issue**
   - URL: https://goodfirstissue.dev/
   - Projects specifically tagged for first-time contributors
   - Great for absolute beginners

4. **CodeTriage**
   - URL: https://www.codetriage.com/
   - Subscribe to projects to receive issues via email
   - Helps you stay engaged with projects

5. **First Timers Only**
   - URL: https://www.firsttimersonly.com/
   - Resources and projects designed for first-time contributors

## Project Categories

### Web Development

#### Frontend
- **freeCodeCamp** - Educational platform
- **React** - JavaScript library ecosystem
- **Vue.js** - Progressive framework
- **Tailwind CSS** - Utility-first CSS framework

#### Backend
- **Laravel** - PHP framework
- **Express.js** - Node.js framework
- **Django** - Python framework
- **Ruby on Rails** - Ruby framework

### Mobile Development
- **React Native** - Cross-platform mobile framework
- **Flutter** - Google's UI toolkit
- **Ionic** - Hybrid mobile framework

### DevOps & Tools
- **Docker** - Containerization platform
- **Kubernetes** - Container orchestration
- **Ansible** - Automation platform
- **Terraform** - Infrastructure as code

### Data Science & ML
- **scikit-learn** - Machine learning in Python
- **TensorFlow** - ML framework
- **pandas** - Data analysis library
- **Jupyter** - Interactive notebooks

### Documentation & Content
- **MDN Web Docs** - Web technology documentation
- **The Odin Project** - Web development curriculum
- **Awesome Lists** - Curated lists of resources

## Types of Contributions by Skill Level

### Complete Beginner
- Fix typos in documentation
- Add examples to documentation
- Translate documentation
- Report bugs
- Test features and provide feedback

### Some Experience
- Fix simple bugs
- Add tests
- Improve code comments
- Update dependencies
- Refactor small sections

### Intermediate
- Implement new features
- Optimize performance
- Write comprehensive tests
- Create tutorials
- Review pull requests

### Advanced
- Architect new features
- Major refactoring
- Security improvements
- Performance optimizations
- Mentoring contributors

## How to Choose a Project

### Questions to Ask

1. **Is the project active?**
   - Recent commits (within last month)
   - Maintainers responding to issues/PRs
   - Active community discussions

2. **Is it beginner-friendly?**
   - Has CONTRIBUTING.md file
   - Issues labeled "good first issue"
   - Welcoming tone in communications
   - Clear documentation

3. **Do I care about this project?**
   - Do I use this software?
   - Does it solve a problem I face?
   - Am I interested in the technology?

4. **Can I commit the time?**
   - How complex is the codebase?
   - Do I have time to see the PR through?
   - Can I handle potential revisions?

### Red Flags

⚠️ No activity in months
⚠️ Maintainers not responding
⚠️ Hostile or unwelcoming community
⚠️ No contribution guidelines
⚠️ Closed to new contributors
⚠️ Overly complex for beginners

## Programming Languages

### Popular for Hacktoberfest

1. **JavaScript/TypeScript** - Largest ecosystem
2. **Python** - Beginner-friendly, many projects
3. **Java** - Enterprise and Android projects
4. **Go** - Cloud and infrastructure tools
5. **PHP** - Web development
6. **Ruby** - Web frameworks
7. **C++** - Systems and performance
8. **Rust** - Systems programming
9. **Swift** - iOS development
10. **Kotlin** - Android development

## Awesome Hacktoberfest Projects Lists

### Curated Collections
- [Awesome Hacktoberfest](https://github.com/OtacilioN/awesome-hacktoberfest)
- [Hacktoberfest Projects](https://github.com/search?q=hacktoberfest)
- Language-specific awesome lists

## Tips for Project Selection

1. **Start Small**
   - Begin with documentation or tests
   - Build confidence before tackling features
   - Learn the codebase gradually

2. **Read the Docs**
   - README.md - Project overview
   - CONTRIBUTING.md - How to contribute
   - CODE_OF_CONDUCT.md - Community rules
   - LICENSE - Usage rights

3. **Explore the Codebase**
   - Clone and run the project locally
   - Read through the code structure
   - Check out recent PRs
   - Look at issue discussions

4. **Communicate First**
   - Comment on issues before starting
   - Ask questions if unclear
   - Propose your approach
   - Wait for maintainer acknowledgment

5. **Check Project Health**
   - Stars and forks (popularity)
   - Open vs closed issues
   - PR merge rate
   - Community size

## Resources for Learning

### Git & GitHub
- [GitHub Skills](https://skills.github.com/)
- [Git Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book/en/v2)

### Open Source Guides
- [Open Source Guides](https://opensource.guide/)
- [How to Contribute](https://opensource.guide/how-to-contribute/)
- [First Contributions](https://github.com/firstcontributions/first-contributions)

### Communities
- [Dev.to Hacktoberfest](https://dev.to/t/hacktoberfest)
- [Reddit r/hacktoberfest](https://reddit.com/r/hacktoberfest)
- Discord communities for specific projects

## Remember

🎯 **Quality Over Quantity** - One meaningful contribution is better than four trivial ones

🤝 **Build Relationships** - Open source is about community, not just code

📚 **Learn and Grow** - Every contribution is a learning opportunity

🌟 **Have Fun** - Enjoy the process and celebrate your achievements!

---

*Happy Hacking! 🎃*
MARKDOWN;

        return Response::text($content);
    }
}
