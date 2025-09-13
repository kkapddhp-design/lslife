/**
 * LSLife Gang Mod - Main Entry Point
 * 
 * This mod adds comprehensive gang functionality to life simulation games
 * including gang creation, management, territory control, and activities.
 */

// Import managers (if using Node.js modules)
let GangManager, TerritoryManager, ActivityManager;

if (typeof require !== 'undefined') {
    GangManager = require('./gang_manager.js');
    TerritoryManager = require('./territory_manager.js');
    ActivityManager = require('./activity_manager.js');
}

class GangMod {
    constructor() {
        this.gangManager = null;
        this.territoryManager = null;
        this.activityManager = null;
        this.config = null;
        this.initialized = false;
    }

    /**
     * Initialize the gang mod
     */
    async init() {
        if (this.initialized) return;
        
        console.log('Initializing LSLife Gang Mod v1.0.0');
        
        try {
            // Load configuration
            await this.loadConfig();
            
            // Initialize managers
            this.gangManager = new (GangManager || class {});
            this.territoryManager = new (TerritoryManager || class {});
            this.activityManager = new (ActivityManager || class {});
            
            // Setup systems
            if (this.gangManager.loadConfig) this.gangManager.loadConfig(this.config);
            if (this.territoryManager.loadConfig) this.territoryManager.loadConfig(this.config);
            if (this.activityManager.loadConfig) this.activityManager.loadConfig(this.config);
            
            this.initialized = true;
            console.log('Gang mod initialized successfully');
            
            return true;
        } catch (error) {
            console.error('Failed to initialize gang mod:', error);
            return false;
        }
    }

    /**
     * Load configuration
     */
    async loadConfig() {
        // Default configuration if external loading fails
        this.config = {
            gangSettings: {
                maxMembers: 20,
                maxGangs: 10,
                territoryControlEnabled: true,
                gangWarEnabled: true,
                reputationSystem: true
            },
            territorySettings: {
                captureTime: 300,
                defenseBonus: 1.5,
                incomeMultiplier: 1.2,
                maxTerritories: 5
            },
            activities: {
                heists: {
                    enabled: true,
                    cooldown: 3600,
                    minMembers: 3,
                    rewards: {
                        money: [1000, 5000],
                        reputation: [10, 50]
                    }
                },
                turf_wars: {
                    enabled: true,
                    duration: 600,
                    minMembers: 5,
                    rewards: {
                        territory: true,
                        reputation: [20, 100]
                    }
                },
                protection_racket: {
                    enabled: true,
                    cooldown: 1800,
                    minMembers: 2,
                    rewards: {
                        money: [500, 2000],
                        reputation: [5, 25]
                    }
                }
            }
        };
    }

    /**
     * Create a new gang
     */
    createGang(name, leader, description = '') {
        if (!this.initialized) {
            throw new Error('Gang mod not initialized');
        }
        
        if (this.gangManager && this.gangManager.createGang) {
            return this.gangManager.createGang(name, leader, description);
        }
        
        // Fallback implementation
        return {
            name,
            leader,
            description,
            members: [{ id: leader, rank: 'Boss', joinedAt: new Date() }],
            territories: [],
            reputation: 0,
            createdAt: new Date()
        };
    }

    /**
     * Get gang information
     */
    getGang(name) {
        if (this.gangManager && this.gangManager.getGang) {
            return this.gangManager.getGang(name);
        }
        return null;
    }

    /**
     * List all gangs
     */
    listGangs() {
        if (this.gangManager && this.gangManager.listGangs) {
            return this.gangManager.listGangs();
        }
        return [];
    }

    /**
     * Add member to gang
     */
    addMember(gangName, memberId, invitedBy) {
        if (this.gangManager && this.gangManager.addMember) {
            return this.gangManager.addMember(gangName, memberId, invitedBy);
        }
        throw new Error('Gang manager not available');
    }

    /**
     * Capture territory
     */
    captureTerritory(territoryName, gangName, attackerCount) {
        if (this.territoryManager && this.territoryManager.captureTerritory) {
            return this.territoryManager.captureTerritory(territoryName, gangName, attackerCount);
        }
        throw new Error('Territory manager not available');
    }

    /**
     * Start gang activity
     */
    startActivity(activityType, gangName, participants) {
        if (this.activityManager && this.activityManager.startActivity) {
            return this.activityManager.startActivity(activityType, gangName, participants);
        }
        throw new Error('Activity manager not available');
    }

    /**
     * Get mod information
     */
    getModInfo() {
        return {
            name: 'LSLife Gang Mod',
            version: '1.0.0',
            initialized: this.initialized,
            features: [
                'Gang creation and management',
                'Territory control system',
                'Gang hierarchy and roles',
                'Gang activities and missions'
            ]
        };
    }
}

// Export the mod
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GangMod;
} else if (typeof window !== 'undefined') {
    window.GangMod = GangMod;
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
    const gangMod = new GangMod();
    gangMod.init();
}