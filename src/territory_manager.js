/**
 * Territory System
 * Manages gang territories and control mechanics
 */

class TerritoryManager {
    constructor() {
        this.territories = new Map();
        this.config = null;
    }

    /**
     * Load configuration
     */
    loadConfig(config) {
        this.config = config;
        this.initializeDefaultTerritories();
    }

    /**
     * Initialize default territories
     */
    initializeDefaultTerritories() {
        const defaultTerritories = [
            { name: 'Downtown District', income: 1000, strategic_value: 'high' },
            { name: 'Industrial Zone', income: 800, strategic_value: 'medium' },
            { name: 'Residential Area', income: 600, strategic_value: 'low' },
            { name: 'Harbor District', income: 1200, strategic_value: 'high' },
            { name: 'Shopping Center', income: 900, strategic_value: 'medium' }
        ];

        defaultTerritories.forEach(territory => {
            this.territories.set(territory.name, {
                ...territory,
                controlledBy: null,
                contestedBy: null,
                defenseLevel: 0,
                lastCaptured: null
            });
        });
    }

    /**
     * Attempt to capture territory
     */
    captureTerritory(territoryName, gangName, attackerCount) {
        const territory = this.territories.get(territoryName);
        if (!territory) {
            throw new Error(`Territory "${territoryName}" not found`);
        }

        if (territory.controlledBy === gangName) {
            throw new Error('Gang already controls this territory');
        }

        // Calculate capture chance based on attacker count and defense
        const captureChance = this.calculateCaptureChance(attackerCount, territory.defenseLevel);
        const success = Math.random() < captureChance;

        if (success) {
            const previousOwner = territory.controlledBy;
            territory.controlledBy = gangName;
            territory.lastCaptured = new Date();
            territory.defenseLevel = 1;

            return {
                success: true,
                previousOwner,
                territory: territory.name
            };
        }

        return {
            success: false,
            reason: 'Failed to capture territory'
        };
    }

    /**
     * Calculate territory capture chance
     */
    calculateCaptureChance(attackerCount, defenseLevel) {
        const baseChance = 0.6;
        const attackerBonus = attackerCount * 0.1;
        const defenseReduction = defenseLevel * 0.15;

        return Math.max(0.1, Math.min(0.9, baseChance + attackerBonus - defenseReduction));
    }

    /**
     * Get territories controlled by gang
     */
    getGangTerritories(gangName) {
        return Array.from(this.territories.values())
            .filter(territory => territory.controlledBy === gangName);
    }

    /**
     * Calculate gang income from territories
     */
    calculateTerritoryIncome(gangName) {
        const territories = this.getGangTerritories(gangName);
        const multiplier = this.config.territorySettings.incomeMultiplier;

        return territories.reduce((total, territory) => {
            return total + (territory.income * multiplier);
        }, 0);
    }

    /**
     * List all territories
     */
    listTerritories() {
        return Array.from(this.territories.values());
    }

    /**
     * Get territory info
     */
    getTerritory(name) {
        return this.territories.get(name);
    }
}

module.exports = TerritoryManager;