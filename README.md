# LSLife Gang Mod

A comprehensive gang modification system for life simulation games. This mod adds gang mechanics, territory control, member management, and dynamic gang activities to enhance the gaming experience.

## Features

🏴 **Gang Management**
- Create and manage multiple gangs with different types (Criminal, Racing, Protection, etc.)
- Gang reputation, resources, and territory influence systems
- Automatic gang activity simulation

👥 **Member System**
- Individual gang members with unique skills and progression
- Role-based hierarchy (Rookie → Regular → Veteran → Lieutenant)
- Experience and loyalty tracking
- Dynamic skill development

🎮 **Simulation Engine**
- Real-time gang activity simulation
- Territory patrol and control mechanics
- Resource gathering and reputation building
- Member training and recruitment

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kkapddhp-design/lslife.git
cd lslife
```

2. Install dependencies (Node.js 14+ required):
```bash
npm install
```

## Usage

### Start the Gang Mod System
```bash
npm start
```

### Development Mode
```bash
npm run dev
```

### Run Tests
```bash
npm test
```

### Build
```bash
npm run build
```

## Configuration

The system can be configured via `config/config.json`:

- `maxGangs`: Maximum number of gangs (default: 10)
- `maxMembersPerGang`: Maximum members per gang (default: 50)
- `simulationInterval`: Activity simulation interval in milliseconds (default: 5000)
- Gang types: Criminal, Racing, Protection, Smuggling, Territory Control, General
- Available territories: Downtown, Industrial District, Uptown, Suburbs, Waterfront, Old Town

## Gang System Overview

### Gang Properties
- **Name**: Unique gang identifier
- **Type**: Gang specialization (affects available activities)
- **Territory**: Area of influence
- **Reputation**: 0-100 scale affecting gang effectiveness
- **Resources**: In-game currency/materials
- **Influence**: Territory control level

### Member Properties
- **Skills**: Combat, Stealth, Driving, Negotiation (0-100 each)
- **Experience**: Gained through activities
- **Loyalty**: Affects member reliability (0-100)
- **Rank**: Automatic progression based on experience and loyalty
- **Status**: Active, Injured, or Inactive

### Activities
- **Patrolling Territory**: Increases influence and reputation
- **Recruiting**: Adds new members (success based on negotiation skill)
- **Training**: Improves member skills and experience
- **Resource Gathering**: Increases gang resources
- **Reputation Building**: Improves gang standing

## API Usage

```javascript
const LSLifeGangMod = require('./src/index');

// Initialize the mod
const mod = new LSLifeGangMod();
await mod.initialize();

// Get system status
const status = mod.getStatus();
console.log(`Running: ${status.running}, Gangs: ${status.gangs}, Members: ${status.members}`);

// Start simulation
mod.start();
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Author

Created by kkapddhp-design
