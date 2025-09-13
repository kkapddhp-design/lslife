/**
 * Gang Manager - Core gang system functionality
 */

const Gang = require('./Gang');
const GangMember = require('./GangMember');

class GangManager {
    constructor(config = {}) {
        this.config = {
            maxGangs: config.maxGangs || 10,
            maxMembersPerGang: config.maxMembersPerGang || 50,
            simulationInterval: config.simulationInterval || 5000,
            ...config
        };
        
        this.gangs = new Map();
        this.simulationTimer = null;
        this.isSimulating = false;
    }

    /**
     * Initialize the gang manager
     */
    async initialize() {
        console.log('⚙️ Initializing Gang Manager...');
        
        // Create some default gangs
        await this.createGang('The Shadow Collective', 'Criminal', 'Downtown');
        await this.createGang('Street Racers', 'Racing', 'Industrial District');
        await this.createGang('The Enforcers', 'Protection', 'Uptown');
        
        console.log(`📊 Initialized with ${this.gangs.size} gangs`);
    }

    /**
     * Create a new gang
     */
    async createGang(name, type = 'General', territory = 'Unknown') {
        if (this.gangs.size >= this.config.maxGangs) {
            throw new Error('Maximum number of gangs reached');
        }

        if (this.gangs.has(name)) {
            throw new Error(`Gang '${name}' already exists`);
        }

        const gang = new Gang(name, type, territory);
        this.gangs.set(name, gang);
        
        console.log(`🏴 Created gang: ${name} (${type}) in ${territory}`);
        return gang;
    }

    /**
     * Get a gang by name
     */
    getGang(name) {
        return this.gangs.get(name);
    }

    /**
     * Get all gangs
     */
    getAllGangs() {
        return Array.from(this.gangs.values());
    }

    /**
     * Add member to a gang
     */
    addMemberToGang(gangName, memberName, role = 'Member') {
        const gang = this.gangs.get(gangName);
        if (!gang) {
            throw new Error(`Gang '${gangName}' not found`);
        }

        if (gang.getMemberCount() >= this.config.maxMembersPerGang) {
            throw new Error('Gang is at maximum capacity');
        }

        const member = new GangMember(memberName, role);
        gang.addMember(member);
        
        console.log(`👤 Added ${memberName} as ${role} to ${gangName}`);
        return member;
    }

    /**
     * Start gang simulation
     */
    startSimulation() {
        if (this.isSimulating) return;
        
        this.isSimulating = true;
        console.log('🎮 Starting gang simulation...');
        
        this.simulationTimer = setInterval(() => {
            this.simulateGangActivity();
        }, this.config.simulationInterval);
    }

    /**
     * Stop gang simulation
     */
    stopSimulation() {
        if (this.simulationTimer) {
            clearInterval(this.simulationTimer);
            this.simulationTimer = null;
        }
        this.isSimulating = false;
        console.log('⏹️ Gang simulation stopped');
    }

    /**
     * Simulate gang activities
     */
    simulateGangActivity() {
        for (const gang of this.gangs.values()) {
            gang.performActivity();
        }
    }

    /**
     * Get total number of gangs
     */
    getGangCount() {
        return this.gangs.size;
    }

    /**
     * Get total number of members across all gangs
     */
    getTotalMembers() {
        return Array.from(this.gangs.values())
            .reduce((total, gang) => total + gang.getMemberCount(), 0);
    }

    /**
     * Get gang statistics
     */
    getStatistics() {
        const stats = {
            totalGangs: this.gangs.size,
            totalMembers: this.getTotalMembers(),
            gangsByType: {},
            gangsByTerritory: {}
        };

        for (const gang of this.gangs.values()) {
            const type = gang.getType();
            const territory = gang.getTerritory();
            
            stats.gangsByType[type] = (stats.gangsByType[type] || 0) + 1;
            stats.gangsByTerritory[territory] = (stats.gangsByTerritory[territory] || 0) + 1;
        }

        return stats;
    }
}

module.exports = GangManager;