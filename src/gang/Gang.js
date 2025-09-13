/**
 * Gang - Represents a gang in the life simulation
 */

class Gang {
    constructor(name, type = 'General', territory = 'Unknown') {
        this.name = name;
        this.type = type;
        this.territory = territory;
        this.members = [];
        this.reputation = 50; // 0-100 scale
        this.resources = 1000; // Starting resources
        this.influence = 10; // Territory influence
        this.createdAt = new Date();
        this.activities = [];
    }

    /**
     * Add a member to the gang
     */
    addMember(member) {
        if (this.members.find(m => m.getName() === member.getName())) {
            throw new Error(`Member '${member.getName()}' already exists in gang`);
        }
        
        this.members.push(member);
        member.joinGang(this.name);
        this.updateInfluence();
    }

    /**
     * Remove a member from the gang
     */
    removeMember(memberName) {
        const index = this.members.findIndex(m => m.getName() === memberName);
        if (index === -1) {
            throw new Error(`Member '${memberName}' not found in gang`);
        }
        
        const member = this.members[index];
        this.members.splice(index, 1);
        member.leaveGang();
        this.updateInfluence();
        
        return member;
    }

    /**
     * Get member by name
     */
    getMember(memberName) {
        return this.members.find(m => m.getName() === memberName);
    }

    /**
     * Get all members
     */
    getMembers() {
        return [...this.members];
    }

    /**
     * Get member count
     */
    getMemberCount() {
        return this.members.length;
    }

    /**
     * Perform gang activity
     */
    performActivity() {
        const activities = [
            'patrolling_territory',
            'recruiting',
            'training',
            'resource_gathering',
            'reputation_building'
        ];
        
        const activity = activities[Math.floor(Math.random() * activities.length)];
        const success = Math.random() > 0.3; // 70% success rate
        
        switch (activity) {
            case 'patrolling_territory':
                if (success) {
                    this.influence += 1;
                    this.reputation += 1;
                }
                break;
            case 'recruiting':
                if (success && this.members.length < 50) {
                    // Simulated recruitment
                    this.reputation += 2;
                }
                break;
            case 'training':
                if (success) {
                    this.members.forEach(member => member.gainExperience(5));
                }
                break;
            case 'resource_gathering':
                if (success) {
                    this.resources += Math.floor(Math.random() * 100) + 50;
                }
                break;
            case 'reputation_building':
                if (success) {
                    this.reputation += Math.floor(Math.random() * 5) + 1;
                }
                break;
        }

        // Cap values
        this.reputation = Math.min(100, Math.max(0, this.reputation));
        this.influence = Math.min(100, Math.max(0, this.influence));
        
        this.activities.push({
            type: activity,
            success,
            timestamp: new Date()
        });

        // Keep only last 10 activities
        if (this.activities.length > 10) {
            this.activities = this.activities.slice(-10);
        }
    }

    /**
     * Update gang influence based on member count and reputation
     */
    updateInfluence() {
        const memberBonus = this.members.length * 0.5;
        const reputationBonus = this.reputation * 0.1;
        this.influence = Math.min(100, 10 + memberBonus + reputationBonus);
    }

    /**
     * Get gang information
     */
    getInfo() {
        return {
            name: this.name,
            type: this.type,
            territory: this.territory,
            memberCount: this.members.length,
            reputation: this.reputation,
            resources: this.resources,
            influence: this.influence,
            recentActivities: this.activities.slice(-3)
        };
    }

    // Getters
    getName() { return this.name; }
    getType() { return this.type; }
    getTerritory() { return this.territory; }
    getReputation() { return this.reputation; }
    getResources() { return this.resources; }
    getInfluence() { return this.influence; }
    getActivities() { return [...this.activities]; }
}

module.exports = Gang;