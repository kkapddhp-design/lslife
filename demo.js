/**
 * LSLife Gang Mod Demo
 * Demonstrates the gang mod functionality
 */

const GangMod = require('./src/main.js');

async function runDemo() {
    console.log('🎮 LSLife Gang Mod Demo\n');
    console.log('='.repeat(50));

    // Initialize the mod
    const gangMod = new GangMod();
    await gangMod.init();

    console.log('\n📋 Mod Information:');
    const modInfo = gangMod.getModInfo();
    console.log(`Name: ${modInfo.name}`);
    console.log(`Version: ${modInfo.version}`);
    console.log(`Features: ${modInfo.features.join(', ')}`);

    console.log('\n🏗️  Creating Gangs:');
    
    // Create multiple gangs
    const gangs = [
        { name: 'Blood Eagles', leader: 'player1', desc: 'Elite criminal organization' },
        { name: 'Street Wolves', leader: 'player2', desc: 'Underground street crew' },
        { name: 'Iron Serpents', leader: 'player3', desc: 'Ruthless gang from the docks' }
    ];

    gangs.forEach(gang => {
        try {
            const created = gangMod.createGang(gang.name, gang.leader, gang.desc);
            console.log(`✓ Created "${gang.name}" led by ${gang.leader}`);
        } catch (error) {
            console.log(`✗ Failed to create "${gang.name}": ${error.message}`);
        }
    });

    console.log('\n📊 Gang Statistics:');
    const allGangs = gangMod.listGangs();
    console.log(`Total Gangs: ${allGangs.length}`);
    
    allGangs.forEach(gang => {
        console.log(`\n🏴 ${gang.name}`);
        console.log(`  Leader: ${gang.leader}`);
        console.log(`  Members: ${gang.members.length}`);
        console.log(`  Reputation: ${gang.reputation}`);
        console.log(`  Created: ${gang.createdAt.toLocaleDateString()}`);
    });

    console.log('\n🎯 Gang Activities Available:');
    const activities = [
        { name: 'Heists', cooldown: '1 hour', members: 3, risk: 'Medium' },
        { name: 'Turf Wars', duration: '10 minutes', members: 5, risk: 'High' },
        { name: 'Protection Racket', cooldown: '30 minutes', members: 2, risk: 'Low' }
    ];

    activities.forEach(activity => {
        console.log(`• ${activity.name}:`);
        console.log(`  Min Members: ${activity.members}`);
        console.log(`  Risk Level: ${activity.risk}`);
        if (activity.cooldown) console.log(`  Cooldown: ${activity.cooldown}`);
        if (activity.duration) console.log(`  Duration: ${activity.duration}`);
    });

    console.log('\n🗺️  Available Territories:');
    const territories = [
        { name: 'Downtown District', income: '$1,000', value: 'High' },
        { name: 'Industrial Zone', income: '$800', value: 'Medium' },
        { name: 'Residential Area', income: '$600', value: 'Low' },
        { name: 'Harbor District', income: '$1,200', value: 'High' },
        { name: 'Shopping Center', income: '$900', value: 'Medium' }
    ];

    territories.forEach(territory => {
        console.log(`• ${territory.name}:`);
        console.log(`  Income: ${territory.income}/hour`);
        console.log(`  Strategic Value: ${territory.value}`);
    });

    console.log('\n' + '='.repeat(50));
    console.log('🎉 Demo completed! The LSLife Gang Mod is ready to use!');
    console.log('\nTo integrate this mod into your game:');
    console.log('1. Import the GangMod class');
    console.log('2. Initialize with gangMod.init()');
    console.log('3. Use the API methods to create and manage gangs');
}

// Run demo if this file is executed directly
if (require.main === module) {
    runDemo().catch(console.error);
}

module.exports = runDemo;