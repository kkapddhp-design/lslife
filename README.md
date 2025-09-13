# LSLife Gang Mod

A comprehensive gang modification for life simulation games that adds gang creation, management, territory control, and activities.

## Features

- **Gang Management**: Create and manage gangs with hierarchical structure
- **Territory Control**: Control territories for income and strategic advantage
- **Gang Activities**: Participate in heists, turf wars, and protection rackets
- **Reputation System**: Build gang reputation through activities and conflicts
- **Rank System**: Progress through gang ranks with different permissions

## Installation

1. Copy all mod files to your game's mod directory
2. Ensure the mod is enabled in your game settings
3. The mod will auto-initialize when the game starts

## Gang System

### Creating a Gang
- Maximum 10 gangs can exist simultaneously
- Each gang can have up to 20 members
- Gang leader has full control over gang operations

### Ranks
- **Initiate**: Basic member with chat and activity participation
- **Soldier**: Can invite new members
- **Lieutenant**: Can manage territories and kick members
- **Boss**: Full gang control and leadership

## Territory System

### Territory Control
- 5 territories available for control
- Each territory provides passive income
- Territories can be captured through turf wars
- Defense levels affect capture difficulty

### Available Territories
- **Downtown District**: High income, high strategic value
- **Industrial Zone**: Medium income, medium strategic value
- **Residential Area**: Low income, low strategic value
- **Harbor District**: Highest income, high strategic value
- **Shopping Center**: Medium-high income, medium strategic value

## Activities

### Heists
- **Cooldown**: 1 hour
- **Min Members**: 3
- **Rewards**: Money and reputation
- **Risk**: Medium

### Turf Wars
- **Duration**: 10 minutes
- **Min Members**: 5
- **Rewards**: Territory control and reputation
- **Risk**: High

### Protection Racket
- **Cooldown**: 30 minutes
- **Min Members**: 2
- **Rewards**: Money and reputation
- **Risk**: Low

## Configuration

The mod can be configured through `config/gang_config.json`:

- Adjust maximum gang and member counts
- Enable/disable specific activities
- Modify reward ranges and cooldowns
- Configure territory settings

## File Structure

```
lslife/
├── mod.json                     # Mod metadata and information
├── src/
│   ├── main.js                  # Main mod entry point
│   ├── gang_manager.js          # Gang creation and management
│   ├── territory_manager.js     # Territory control system
│   └── activity_manager.js      # Gang activities and missions
├── config/
│   └── gang_config.json         # Mod configuration
└── data/
    └── gangs.json              # Gang data storage
```

## API Usage

```javascript
// Initialize the mod
const gangMod = new GangMod();
gangMod.init();

// Create a new gang
const gang = gangMod.createGang('Blood Eagles', 'player123', 'Elite criminal organization');

// Get gang information
const gangInfo = gangMod.getGang('Blood Eagles');

// List all gangs
const allGangs = gangMod.listGangs();
```

## Version History

- **v1.0.0**: Initial release with core gang functionality

## License

This mod is provided as-is for educational and entertainment purposes.
