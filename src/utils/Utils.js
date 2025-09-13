/**
 * Utility functions for the gang mod system
 */

class Utils {
    /**
     * Generate a random name for gang members
     */
    static generateRandomName() {
        const firstNames = [
            'Alex', 'Blake', 'Casey', 'Drew', 'Ellis', 'Finley', 'Gray', 'Hunter',
            'Ivory', 'Jesse', 'Kane', 'Lee', 'Morgan', 'Nova', 'Oakley', 'Phoenix',
            'Quinn', 'River', 'Sage', 'Taylor', 'Uma', 'Vale', 'Winter', 'Zara'
        ];
        
        const lastNames = [
            'Anderson', 'Brown', 'Chen', 'Davis', 'Evans', 'Foster', 'Garcia', 'Harris',
            'Jackson', 'Kim', 'Lopez', 'Miller', 'Nelson', 'O\'Brien', 'Parker', 'Quinn',
            'Rodriguez', 'Smith', 'Thompson', 'Underwood', 'Valdez', 'Wilson', 'Young', 'Zhang'
        ];
        
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        return `${firstName} ${lastName}`;
    }

    /**
     * Generate a random gang name
     */
    static generateRandomGangName() {
        const adjectives = [
            'Shadow', 'Iron', 'Blood', 'Steel', 'Dark', 'Wild', 'Fire', 'Storm',
            'Night', 'Silver', 'Golden', 'Crimson', 'Thunder', 'Lightning', 'Venom'
        ];
        
        const nouns = [
            'Wolves', 'Eagles', 'Serpents', 'Lions', 'Tigers', 'Dragons', 'Panthers',
            'Collective', 'Brotherhood', 'Alliance', 'Society', 'Order', 'Legion', 'Clan'
        ];
        
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        
        return `${adjective} ${noun}`;
    }

    /**
     * Calculate distance between two points (for territory calculations)
     */
    static calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    /**
     * Format time duration in a human-readable format
     */
    static formatDuration(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ${hours % 24}h`;
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    }

    /**
     * Generate random coordinates within a territory
     */
    static generateTerritoryCoords(territory) {
        const territoryBounds = {
            'Downtown': { x: [0, 100], y: [0, 100] },
            'Industrial District': { x: [100, 200], y: [0, 100] },
            'Uptown': { x: [0, 100], y: [100, 200] },
            'Suburbs': { x: [100, 200], y: [100, 200] },
            'Waterfront': { x: [0, 200], y: [200, 250] },
            'Old Town': { x: [50, 150], y: [50, 150] }
        };

        const bounds = territoryBounds[territory] || { x: [0, 100], y: [0, 100] };
        
        return {
            x: Math.random() * (bounds.x[1] - bounds.x[0]) + bounds.x[0],
            y: Math.random() * (bounds.y[1] - bounds.y[0]) + bounds.y[0]
        };
    }

    /**
     * Validate gang configuration
     */
    static validateGangConfig(config) {
        const required = ['maxGangs', 'maxMembersPerGang', 'simulationInterval'];
        const missing = required.filter(key => !(key in config));
        
        if (missing.length > 0) {
            throw new Error(`Missing required config: ${missing.join(', ')}`);
        }

        if (config.maxGangs <= 0 || config.maxMembersPerGang <= 0) {
            throw new Error('Gang and member limits must be positive numbers');
        }

        if (config.simulationInterval < 1000) {
            throw new Error('Simulation interval must be at least 1000ms');
        }

        return true;
    }

    /**
     * Get random element from array
     */
    static randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Clamp a value between min and max
     */
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * Interpolate between two values
     */
    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    /**
     * Generate a weighted random choice
     */
    static weightedRandom(choices, weights) {
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < choices.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return choices[i];
            }
        }
        
        return choices[choices.length - 1];
    }

    /**
     * Create a simple logger
     */
    static createLogger(prefix = 'GANG') {
        return {
            info: (message) => console.log(`[${prefix}] ℹ️ ${message}`),
            warn: (message) => console.log(`[${prefix}] ⚠️ ${message}`),
            error: (message) => console.log(`[${prefix}] ❌ ${message}`),
            success: (message) => console.log(`[${prefix}] ✅ ${message}`)
        };
    }
}

module.exports = Utils;