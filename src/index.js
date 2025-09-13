/**
 * LSLife Gang Mod - Main Entry Point
 * Manages gang systems within the life simulation
 */

const GangManager = require('./gang/GangManager');
const config = require('../config/config.json');

class LSLifeGangMod {
    constructor() {
        this.gangManager = new GangManager(config.gang);
        this.isRunning = false;
    }

    /**
     * Initialize the gang mod system
     */
    async initialize() {
        console.log('🏴 LSLife Gang Mod v1.0.0 - Initializing...');
        
        try {
            await this.gangManager.initialize();
            this.isRunning = true;
            console.log('✅ Gang mod system initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize gang mod:', error.message);
            return false;
        }
    }

    /**
     * Start the gang mod system
     */
    async start() {
        if (!this.isRunning) {
            await this.initialize();
        }
        
        console.log('🚀 Gang mod system is now running');
        this.gangManager.startSimulation();
    }

    /**
     * Stop the gang mod system
     */
    stop() {
        if (this.isRunning) {
            this.gangManager.stopSimulation();
            this.isRunning = false;
            console.log('🛑 Gang mod system stopped');
        }
    }

    /**
     * Get system status
     */
    getStatus() {
        return {
            running: this.isRunning,
            gangs: this.gangManager.getGangCount(),
            members: this.gangManager.getTotalMembers()
        };
    }
}

// Start the mod if run directly
if (require.main === module) {
    const mod = new LSLifeGangMod();
    
    // Handle command line arguments
    const args = process.argv.slice(2);
    const isDev = args.includes('--dev');
    
    if (isDev) {
        console.log('🔧 Running in development mode');
    }
    
    mod.start().catch(error => {
        console.error('Failed to start gang mod:', error);
        process.exit(1);
    });
    
    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n📯 Received SIGINT, shutting down gracefully...');
        mod.stop();
        process.exit(0);
    });
}

module.exports = LSLifeGangMod;