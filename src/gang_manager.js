/**
 * Gang Management System
 * Handles gang creation, membership, and operations
 */

class GangManager {
    constructor() {
        this.gangs = new Map();
        this.memberToGang = new Map();
        this.config = null;
    }

    /**
     * Load configuration
     */
    loadConfig(config) {
        this.config = config;
    }

    /**
     * Create a new gang
     */
    createGang(name, leader, description = '') {
        if (this.gangs.has(name)) {
            throw new Error(`Gang "${name}" already exists`);
        }

        if (this.memberToGang.has(leader)) {
            throw new Error(`${leader} is already in a gang`);
        }

        if (this.gangs.size >= this.config.gangSettings.maxGangs) {
            throw new Error('Maximum number of gangs reached');
        }

        const gang = {
            id: this.generateId(),
            name,
            leader,
            description,
            members: [{
                id: leader,
                rank: 'Boss',
                joinedAt: new Date()
            }],
            territories: [],
            reputation: 0,
            money: 0,
            createdAt: new Date(),
            lastActivity: new Date()
        };

        this.gangs.set(name, gang);
        this.memberToGang.set(leader, name);

        return gang;
    }

    /**
     * Add member to gang
     */
    addMember(gangName, memberId, invitedBy) {
        const gang = this.gangs.get(gangName);
        if (!gang) {
            throw new Error(`Gang "${gangName}" not found`);
        }

        if (this.memberToGang.has(memberId)) {
            throw new Error(`${memberId} is already in a gang`);
        }

        if (gang.members.length >= this.config.gangSettings.maxMembers) {
            throw new Error('Gang is at maximum capacity');
        }

        const member = {
            id: memberId,
            rank: 'Initiate',
            joinedAt: new Date(),
            invitedBy
        };

        gang.members.push(member);
        this.memberToGang.set(memberId, gangName);

        return member;
    }

    /**
     * Remove member from gang
     */
    removeMember(gangName, memberId) {
        const gang = this.gangs.get(gangName);
        if (!gang) {
            throw new Error(`Gang "${gangName}" not found`);
        }

        if (gang.leader === memberId) {
            throw new Error('Cannot remove gang leader');
        }

        gang.members = gang.members.filter(member => member.id !== memberId);
        this.memberToGang.delete(memberId);

        return true;
    }

    /**
     * Get gang by name
     */
    getGang(name) {
        return this.gangs.get(name);
    }

    /**
     * Get gang by member ID
     */
    getGangByMember(memberId) {
        const gangName = this.memberToGang.get(memberId);
        return gangName ? this.gangs.get(gangName) : null;
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    /**
     * List all gangs
     */
    listGangs() {
        return Array.from(this.gangs.values());
    }
}

module.exports = GangManager;