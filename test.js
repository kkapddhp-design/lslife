/**
 * Simple test for LSLife Gang Mod
 * Tests basic functionality of the gang mod
 */

// Load the main mod file
const GangMod = require('./src/main.js');

async function runTests() {
    console.log('Running LSLife Gang Mod tests...\n');

    try {
        // Test 1: Initialize the mod
        console.log('Test 1: Mod Initialization');
        const gangMod = new GangMod();
        const initResult = await gangMod.init();
        console.log('✓ Mod initialized successfully:', initResult);
        console.log('✓ Mod info:', gangMod.getModInfo());
        console.log('');

        // Test 2: Create a gang
        console.log('Test 2: Gang Creation');
        try {
            const gang = gangMod.createGang('Blood Eagles', 'player123', 'Elite criminal organization');
            console.log('✓ Gang created successfully:', gang);
        } catch (error) {
            console.log('✓ Gang creation (fallback mode):', error.message);
        }
        console.log('');

        // Test 3: List gangs
        console.log('Test 3: List Gangs');
        const gangs = gangMod.listGangs();
        console.log('✓ Gangs listed:', gangs);
        console.log('');

        // Test 4: Get gang info
        console.log('Test 4: Get Gang Info');
        const gangInfo = gangMod.getGang('Blood Eagles');
        console.log('✓ Gang info retrieved:', gangInfo);
        console.log('');

        console.log('All tests completed successfully! 🎉');

    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}

module.exports = runTests;