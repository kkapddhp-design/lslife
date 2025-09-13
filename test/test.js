/**
 * Simple test runner for LSLife Gang Mod
 */

const LSLifeGangMod = require('../src/index');
const GangManager = require('../src/gang/GangManager');
const Gang = require('../src/gang/Gang');
const GangMember = require('../src/gang/GangMember');

class TestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, testFunc) {
        this.tests.push({ name, testFunc });
    }

    async run() {
        console.log('🧪 Running LSLife Gang Mod Tests\n');

        for (const { name, testFunc } of this.tests) {
            try {
                await testFunc();
                console.log(`✅ ${name}`);
                this.passed++;
            } catch (error) {
                console.log(`❌ ${name}: ${error.message}`);
                this.failed++;
            }
        }

        console.log(`\n📊 Test Results: ${this.passed} passed, ${this.failed} failed`);
        return this.failed === 0;
    }

    assert(condition, message) {
        if (!condition) {
            throw new Error(message || 'Assertion failed');
        }
    }

    assertEqual(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(message || `Expected ${expected}, got ${actual}`);
        }
    }
}

// Create test instance
const test = new TestRunner();

// Test Gang creation and basic functionality
test.test('Gang creation and basic properties', () => {
    const gang = new Gang('Test Gang', 'Criminal', 'Downtown');
    
    test.assertEqual(gang.getName(), 'Test Gang');
    test.assertEqual(gang.getType(), 'Criminal');
    test.assertEqual(gang.getTerritory(), 'Downtown');
    test.assertEqual(gang.getMemberCount(), 0);
    test.assert(gang.getReputation() === 50);
});

// Test Gang Member creation and functionality
test.test('Gang Member creation and basic properties', () => {
    const member = new GangMember('John Doe', 'Member');
    
    test.assertEqual(member.getName(), 'John Doe');
    test.assertEqual(member.getRole(), 'Member');
    test.assertEqual(member.getGang(), null);
    test.assert(member.getExperience() === 0);
    test.assert(member.getLoyalty() === 50);
});

// Test adding members to gang
test.test('Adding members to gang', () => {
    const gang = new Gang('Test Gang');
    const member = new GangMember('Jane Smith');
    
    gang.addMember(member);
    
    test.assertEqual(gang.getMemberCount(), 1);
    test.assertEqual(member.getGang(), 'Test Gang');
    test.assert(gang.getMember('Jane Smith') !== undefined);
});

// Test gang manager initialization
test.test('Gang Manager initialization', async () => {
    const gangManager = new GangManager({
        maxGangs: 5,
        maxMembersPerGang: 25
    });
    
    await gangManager.initialize();
    
    test.assert(gangManager.getGangCount() === 3); // Default gangs created
    test.assert(gangManager.getTotalMembers() === 0); // No members initially
});

// Test gang manager gang creation
test.test('Gang Manager gang creation', async () => {
    const gangManager = new GangManager();
    await gangManager.initialize();
    
    const initialCount = gangManager.getGangCount();
    await gangManager.createGang('New Gang', 'Racing', 'Suburbs');
    
    test.assertEqual(gangManager.getGangCount(), initialCount + 1);
    test.assert(gangManager.getGang('New Gang') !== undefined);
});

// Test gang member addition via gang manager
test.test('Adding members via Gang Manager', async () => {
    const gangManager = new GangManager();
    await gangManager.initialize();
    
    await gangManager.createGang('Test Gang');
    const member = gangManager.addMemberToGang('Test Gang', 'Bob Wilson', 'Lieutenant');
    
    test.assertEqual(member.getName(), 'Bob Wilson');
    test.assertEqual(member.getRole(), 'Lieutenant');
    test.assertEqual(gangManager.getTotalMembers(), 1);
});

// Test gang activity simulation
test.test('Gang activity simulation', () => {
    const gang = new Gang('Active Gang');
    const initialReputation = gang.getReputation();
    
    // Perform multiple activities
    for (let i = 0; i < 5; i++) {
        gang.performActivity();
    }
    
    test.assert(gang.getActivities().length > 0);
    test.assert(gang.getActivities().length <= 5);
});

// Test member experience and skill progression
test.test('Member experience and skill progression', () => {
    const member = new GangMember('Skilled Member');
    const initialExperience = member.getExperience();
    const initialSkill = member.getOverallSkill();
    
    // Gain experience multiple times
    for (let i = 0; i < 10; i++) {
        member.gainExperience(10);
    }
    
    test.assert(member.getExperience() > initialExperience);
    test.assert(member.getRank() !== 'Rookie'); // Should have progressed
});

// Test main mod initialization
test.test('Main mod initialization', async () => {
    const mod = new LSLifeGangMod();
    const initialized = await mod.initialize();
    
    test.assert(initialized === true);
    test.assert(mod.isRunning === true);
    
    const status = mod.getStatus();
    test.assert(status.running === true);
    test.assert(status.gangs > 0);
    
    mod.stop();
});

// Run all tests
if (require.main === module) {
    test.run().then(success => {
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('Test runner error:', error);
        process.exit(1);
    });
}

module.exports = TestRunner;