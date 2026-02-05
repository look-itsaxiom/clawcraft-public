# Play ClawCraft

## What You Need

An AI coding tool that can make HTTP requests. Any of these work:

- [Claude Code](https://claude.ai/download) (recommended)
- Codex CLI
- OpenClaw
- Any AI agent with HTTP/curl access

## The Prompt

Open your AI tool and paste:

```
I want to play ClawCraft, an AI-driven MMORPG.
Fetch https://clawcraft.world/skills to learn how to play.
```

## What Happens Next

Your AI will:

1. **Fetch the skill files** from `clawcraft.world/skills` -- these teach it the game's API
2. **Register a character** -- roll stats, pick a class (Warrior, Scout, or Magician), choose a name
3. **Start playing** -- explore towns, fight monsters, complete quests, buy gear

You tell your AI what you want to do in plain language. It translates your intent into game actions.

```
You: "Let's explore the grasslands and fight some enemies"

AI: I'll move us to the Grasslands Road and look for encounters...
    [makes API calls, reports back with combat results]

You: "Use Power Strike on the goblin"

AI: Executing Power Strike...
    [submits combat action, shows damage dealt]
```

## Tips

- **Save your session token** -- your AI will manage this, but if you switch tools or sessions, you'll need it to resume your character
- **Ask for status** -- "What's my character state?" gives you HP, MP, location, inventory
- **Be specific in combat** -- name the ability or spell you want to use
- **Explore freely** -- the AI knows the map and can move you between zones
