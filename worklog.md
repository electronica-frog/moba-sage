---
Task ID: 1
Agent: Main Agent
Task: Create github-manager skill using skill-creator

Work Log:
- Analyzed existing github-repo and github-sync skills for reference
- Designed comprehensive skill combining git CLI + GitHub REST API
- Created `scripts/git_operations.py` — full git CLI wrapper (clone, pull, push, add, commit, branch management, merge, log, diff, stash, tags, config, remote management)
- Created `scripts/github_api.py` — extended GitHub REST API client (file CRUD, repo info, issues, PRs, releases, commit history, search)
- Wrote comprehensive `SKILL.md` with all reference docs, workflow examples, and configuration guide
- Verified all imports and tested with real git repo
- Packaged skill to `/home/z/my-project/download/github-manager.skill`

Stage Summary:
- Skill `github-manager` created successfully at `/home/z/my-project/skills/github-manager/`
- Packaged as `github-manager.skill` in `/home/z/my-project/download/`
- Covers: clone, pull, push, commit, branch, merge, log, diff, stash, tags, file CRUD via API, issues, PRs, releases, search
- Zero external dependencies (uses only stdlib urllib + subprocess for git CLI)
