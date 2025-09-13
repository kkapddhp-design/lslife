/**
 * Activity System
 * Manages gang activities, missions, and events
 */

class ActivityManager {
    constructor() {
        this.activities = new Map();
        this.activeActivities = new Map();
        this.cooldowns = new Map();
        this.config = null;
    }

    /**
     * Load configuration
     */
    loadConfig(config) {
        this.config = config;
        this.initializeActivities();
    }

    /**
     * Initialize available activities
     */
    initializeActivities() {
        const activities = this.config.activities;

        Object.keys(activities).forEach(activityType => {
            this.activities.set(activityType, activities[activityType]);
        });
    }

    /**
     * Start an activity
     */
    startActivity(activityType, gangName, participants) {
        const activity = this.activities.get(activityType);
        if (!activity || !activity.enabled) {
            throw new Error(`Activity "${activityType}" is not available`);
        }

        // Check cooldown
        const cooldownKey = `${gangName}_${activityType}`;
        const lastActivity = this.cooldowns.get(cooldownKey);
        if (lastActivity && Date.now() - lastActivity < activity.cooldown * 1000) {
            const remainingTime = Math.ceil((activity.cooldown * 1000 - (Date.now() - lastActivity)) / 1000);
            throw new Error(`Activity on cooldown. ${remainingTime} seconds remaining`);
        }

        // Check minimum participants
        if (participants.length < activity.minMembers) {
            throw new Error(`Minimum ${activity.minMembers} members required for this activity`);
        }

        // Create activity instance
        const activityInstance = {
            id: this.generateId(),
            type: activityType,
            gang: gangName,
            participants,
            startTime: Date.now(),
            status: 'active'
        };

        this.activeActivities.set(activityInstance.id, activityInstance);
        this.cooldowns.set(cooldownKey, Date.now());

        // Auto-complete after duration (if applicable)
        if (activity.duration) {
            setTimeout(() => {
                this.completeActivity(activityInstance.id);
            }, activity.duration * 1000);
        }

        return activityInstance;
    }

    /**
     * Complete an activity
     */
    completeActivity(activityId) {
        const activityInstance = this.activeActivities.get(activityId);
        if (!activityInstance) {
            throw new Error('Activity not found');
        }

        const activity = this.activities.get(activityInstance.type);
        const rewards = this.calculateRewards(activity, activityInstance.participants.length);

        activityInstance.status = 'completed';
        activityInstance.rewards = rewards;
        activityInstance.endTime = Date.now();

        this.activeActivities.delete(activityId);

        return {
            activityInstance,
            rewards
        };
    }

    /**
     * Calculate activity rewards
     */
    calculateRewards(activity, participantCount) {
        const rewards = {};

        if (activity.rewards.money) {
            const [min, max] = activity.rewards.money;
            const baseReward = min + Math.random() * (max - min);
            rewards.money = Math.floor(baseReward * Math.sqrt(participantCount));
        }

        if (activity.rewards.reputation) {
            const [min, max] = activity.rewards.reputation;
            const baseReward = min + Math.random() * (max - min);
            rewards.reputation = Math.floor(baseReward * Math.sqrt(participantCount));
        }

        if (activity.rewards.territory) {
            rewards.territory = true;
        }

        return rewards;
    }

    /**
     * Get active activities for gang
     */
    getGangActivities(gangName) {
        return Array.from(this.activeActivities.values())
            .filter(activity => activity.gang === gangName);
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    /**
     * List available activities
     */
    listActivities() {
        return Array.from(this.activities.entries())
            .filter(([, activity]) => activity.enabled)
            .map(([type, activity]) => ({ type, ...activity }));
    }
}

module.exports = ActivityManager;