/**
 * Gang Member - Represents an individual gang member
 */

class GangMember {
    constructor(name, role = 'Member') {
        this.name = name;
        this.role = role;
        this.gang = null;
        this.experience = 0;
        this.loyalty = 50; // 0-100 scale
        this.skills = {
            combat: Math.floor(Math.random() * 20) + 10,
            stealth: Math.floor(Math.random() * 20) + 10,
            driving: Math.floor(Math.random() * 20) + 10,
            negotiation: Math.floor(Math.random() * 20) + 10
        };
        this.joinedAt = new Date();
        this.status = 'active'; // active, injured, inactive
    }

    /**
     * Join a gang
     */
    joinGang(gangName) {
        this.gang = gangName;
        this.loyalty = 60; // Slight loyalty boost when joining
    }

    /**
     * Leave the gang
     */
    leaveGang() {
        this.gang = null;
        this.loyalty = Math.max(0, this.loyalty - 20);
    }

    /**
     * Gain experience points
     */
    gainExperience(points) {
        this.experience += points;
        
        // Random skill improvements based on experience gained
        if (points >= 10) {
            const skillToImprove = Object.keys(this.skills)[Math.floor(Math.random() * 4)];
            this.skills[skillToImprove] = Math.min(100, this.skills[skillToImprove] + 1);
        }
        
        // Loyalty might increase with experience
        if (Math.random() < 0.3) {
            this.loyalty = Math.min(100, this.loyalty + 1);
        }
    }

    /**
     * Perform member activity
     */
    performActivity(activityType) {
        const activities = {
            patrol: () => {
                this.gainExperience(3);
                return 'Completed patrol duty';
            },
            training: () => {
                this.gainExperience(5);
                return 'Participated in training session';
            },
            mission: () => {
                const success = Math.random() > 0.4;
                if (success) {
                    this.gainExperience(10);
                    this.loyalty += 2;
                    return 'Mission completed successfully';
                } else {
                    this.status = Math.random() > 0.8 ? 'injured' : 'active';
                    return 'Mission failed';
                }
            },
            recruitment: () => {
                const success = this.skills.negotiation > 50 && Math.random() > 0.5;
                if (success) {
                    this.gainExperience(7);
                    return 'Successfully recruited new member';
                } else {
                    return 'Recruitment attempt failed';
                }
            }
        };

        const activity = activities[activityType];
        if (activity) {
            return activity();
        } else {
            return 'Unknown activity';
        }
    }

    /**
     * Recover from injury
     */
    recover() {
        if (this.status === 'injured') {
            this.status = 'active';
            return true;
        }
        return false;
    }

    /**
     * Get member's overall skill level
     */
    getOverallSkill() {
        const skillValues = Object.values(this.skills);
        return Math.floor(skillValues.reduce((sum, skill) => sum + skill, 0) / skillValues.length);
    }

    /**
     * Get member rank based on experience and loyalty
     */
    getRank() {
        if (this.experience >= 500 && this.loyalty >= 80) return 'Lieutenant';
        if (this.experience >= 200 && this.loyalty >= 60) return 'Veteran';
        if (this.experience >= 50 && this.loyalty >= 40) return 'Regular';
        return 'Rookie';
    }

    /**
     * Get member information
     */
    getInfo() {
        return {
            name: this.name,
            role: this.role,
            gang: this.gang,
            experience: this.experience,
            loyalty: this.loyalty,
            skills: { ...this.skills },
            overallSkill: this.getOverallSkill(),
            rank: this.getRank(),
            status: this.status,
            joinedAt: this.joinedAt
        };
    }

    // Getters
    getName() { return this.name; }
    getRole() { return this.role; }
    getGang() { return this.gang; }
    getExperience() { return this.experience; }
    getLoyalty() { return this.loyalty; }
    getSkills() { return { ...this.skills }; }
    getStatus() { return this.status; }
    
    // Setters
    setRole(role) { this.role = role; }
    setStatus(status) { this.status = status; }
}

module.exports = GangMember;