'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$2$2 = require('node:crypto');
var require$$3$2 = require('node:path');
var require$$4$2 = require('node:net');
var require$$5$2 = require('node:fs');
var require$$0$5 = require('events');
var require$$1$3 = require('https');
var require$$2$3 = require('http');
var require$$3$3 = require('net');
var require$$4$3 = require('tls');
var require$$1$2 = require('crypto');
var require$$0$4 = require('stream');
var require$$7 = require('url');
var require$$0$2 = require('zlib');
var require$$0$3 = require('buffer');

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var main = {};

var dist$4 = {};

var Client$1 = {};

var v10$l = {};

var v10$k = {};

var common$7 = {};

Object.defineProperty(common$7, "__esModule", { value: true });

(function (exports) {
	/**
	 * Types extracted from https://discord.com/developers/docs/topics/gateway
	 */
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.VoiceChannelEffectSendAnimationType = exports.GatewayDispatchEvents = exports.GatewayIntentBits = exports.GatewayCloseCodes = exports.GatewayOpcodes = exports.GatewayVersion = void 0;
	__exportStar(common$7, exports);
	exports.GatewayVersion = '10';
	/**
	 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
	 */
	var GatewayOpcodes;
	(function (GatewayOpcodes) {
	    /**
	     * An event was dispatched
	     */
	    GatewayOpcodes[GatewayOpcodes["Dispatch"] = 0] = "Dispatch";
	    /**
	     * A bidirectional opcode to maintain an active gateway connection.
	     * Fired periodically by the client, or fired by the gateway to request an immediate heartbeat from the client.
	     */
	    GatewayOpcodes[GatewayOpcodes["Heartbeat"] = 1] = "Heartbeat";
	    /**
	     * Starts a new session during the initial handshake
	     */
	    GatewayOpcodes[GatewayOpcodes["Identify"] = 2] = "Identify";
	    /**
	     * Update the client's presence
	     */
	    GatewayOpcodes[GatewayOpcodes["PresenceUpdate"] = 3] = "PresenceUpdate";
	    /**
	     * Used to join/leave or move between voice channels
	     */
	    GatewayOpcodes[GatewayOpcodes["VoiceStateUpdate"] = 4] = "VoiceStateUpdate";
	    /**
	     * Resume a previous session that was disconnected
	     */
	    GatewayOpcodes[GatewayOpcodes["Resume"] = 6] = "Resume";
	    /**
	     * You should attempt to reconnect and resume immediately
	     */
	    GatewayOpcodes[GatewayOpcodes["Reconnect"] = 7] = "Reconnect";
	    /**
	     * Request information about offline guild members in a large guild
	     */
	    GatewayOpcodes[GatewayOpcodes["RequestGuildMembers"] = 8] = "RequestGuildMembers";
	    /**
	     * The session has been invalidated. You should reconnect and identify/resume accordingly
	     */
	    GatewayOpcodes[GatewayOpcodes["InvalidSession"] = 9] = "InvalidSession";
	    /**
	     * Sent immediately after connecting, contains the `heartbeat_interval` to use
	     */
	    GatewayOpcodes[GatewayOpcodes["Hello"] = 10] = "Hello";
	    /**
	     * Sent in response to receiving a heartbeat to acknowledge that it has been received
	     */
	    GatewayOpcodes[GatewayOpcodes["HeartbeatAck"] = 11] = "HeartbeatAck";
	    /**
	     * Request information about soundboard sounds in a set of guilds
	     */
	    GatewayOpcodes[GatewayOpcodes["RequestSoundboardSounds"] = 31] = "RequestSoundboardSounds";
	})(GatewayOpcodes || (exports.GatewayOpcodes = GatewayOpcodes = {}));
	/**
	 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
	 */
	var GatewayCloseCodes;
	(function (GatewayCloseCodes) {
	    /**
	     * We're not sure what went wrong. Try reconnecting?
	     */
	    GatewayCloseCodes[GatewayCloseCodes["UnknownError"] = 4000] = "UnknownError";
	    /**
	     * You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that!
	     *
	     * See https://discord.com/developers/docs/topics/gateway-events#payload-structure
	     */
	    GatewayCloseCodes[GatewayCloseCodes["UnknownOpcode"] = 4001] = "UnknownOpcode";
	    /**
	     * You sent an invalid payload to us. Don't do that!
	     *
	     * See https://discord.com/developers/docs/topics/gateway#sending-events
	     */
	    GatewayCloseCodes[GatewayCloseCodes["DecodeError"] = 4002] = "DecodeError";
	    /**
	     * You sent us a payload prior to identifying
	     *
	     * See https://discord.com/developers/docs/topics/gateway-events#identify
	     */
	    GatewayCloseCodes[GatewayCloseCodes["NotAuthenticated"] = 4003] = "NotAuthenticated";
	    /**
	     * The account token sent with your identify payload is incorrect
	     *
	     * See https://discord.com/developers/docs/topics/gateway-events#identify
	     */
	    GatewayCloseCodes[GatewayCloseCodes["AuthenticationFailed"] = 4004] = "AuthenticationFailed";
	    /**
	     * You sent more than one identify payload. Don't do that!
	     */
	    GatewayCloseCodes[GatewayCloseCodes["AlreadyAuthenticated"] = 4005] = "AlreadyAuthenticated";
	    /**
	     * The sequence sent when resuming the session was invalid. Reconnect and start a new session
	     *
	     * See https://discord.com/developers/docs/topics/gateway-events#resume
	     */
	    GatewayCloseCodes[GatewayCloseCodes["InvalidSeq"] = 4007] = "InvalidSeq";
	    /**
	     * Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this
	     */
	    GatewayCloseCodes[GatewayCloseCodes["RateLimited"] = 4008] = "RateLimited";
	    /**
	     * Your session timed out. Reconnect and start a new one
	     */
	    GatewayCloseCodes[GatewayCloseCodes["SessionTimedOut"] = 4009] = "SessionTimedOut";
	    /**
	     * You sent us an invalid shard when identifying
	     *
	     * See https://discord.com/developers/docs/topics/gateway#sharding
	     */
	    GatewayCloseCodes[GatewayCloseCodes["InvalidShard"] = 4010] = "InvalidShard";
	    /**
	     * The session would have handled too many guilds - you are required to shard your connection in order to connect
	     *
	     * See https://discord.com/developers/docs/topics/gateway#sharding
	     */
	    GatewayCloseCodes[GatewayCloseCodes["ShardingRequired"] = 4011] = "ShardingRequired";
	    /**
	     * You sent an invalid version for the gateway
	     */
	    GatewayCloseCodes[GatewayCloseCodes["InvalidAPIVersion"] = 4012] = "InvalidAPIVersion";
	    /**
	     * You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value
	     *
	     * See https://discord.com/developers/docs/topics/gateway#gateway-intents
	     */
	    GatewayCloseCodes[GatewayCloseCodes["InvalidIntents"] = 4013] = "InvalidIntents";
	    /**
	     * You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not
	     * enabled or are not whitelisted for
	     *
	     * See https://discord.com/developers/docs/topics/gateway#gateway-intents
	     *
	     * See https://discord.com/developers/docs/topics/gateway#privileged-intents
	     */
	    GatewayCloseCodes[GatewayCloseCodes["DisallowedIntents"] = 4014] = "DisallowedIntents";
	})(GatewayCloseCodes || (exports.GatewayCloseCodes = GatewayCloseCodes = {}));
	/**
	 * https://discord.com/developers/docs/topics/gateway#list-of-intents
	 */
	var GatewayIntentBits;
	(function (GatewayIntentBits) {
	    GatewayIntentBits[GatewayIntentBits["Guilds"] = 1] = "Guilds";
	    GatewayIntentBits[GatewayIntentBits["GuildMembers"] = 2] = "GuildMembers";
	    GatewayIntentBits[GatewayIntentBits["GuildModeration"] = 4] = "GuildModeration";
	    /**
	     * @deprecated This is the old name for {@apilink GatewayIntentBits#GuildModeration}
	     */
	    GatewayIntentBits[GatewayIntentBits["GuildBans"] = 4] = "GuildBans";
	    GatewayIntentBits[GatewayIntentBits["GuildEmojisAndStickers"] = 8] = "GuildEmojisAndStickers";
	    GatewayIntentBits[GatewayIntentBits["GuildIntegrations"] = 16] = "GuildIntegrations";
	    GatewayIntentBits[GatewayIntentBits["GuildWebhooks"] = 32] = "GuildWebhooks";
	    GatewayIntentBits[GatewayIntentBits["GuildInvites"] = 64] = "GuildInvites";
	    GatewayIntentBits[GatewayIntentBits["GuildVoiceStates"] = 128] = "GuildVoiceStates";
	    GatewayIntentBits[GatewayIntentBits["GuildPresences"] = 256] = "GuildPresences";
	    GatewayIntentBits[GatewayIntentBits["GuildMessages"] = 512] = "GuildMessages";
	    GatewayIntentBits[GatewayIntentBits["GuildMessageReactions"] = 1024] = "GuildMessageReactions";
	    GatewayIntentBits[GatewayIntentBits["GuildMessageTyping"] = 2048] = "GuildMessageTyping";
	    GatewayIntentBits[GatewayIntentBits["DirectMessages"] = 4096] = "DirectMessages";
	    GatewayIntentBits[GatewayIntentBits["DirectMessageReactions"] = 8192] = "DirectMessageReactions";
	    GatewayIntentBits[GatewayIntentBits["DirectMessageTyping"] = 16384] = "DirectMessageTyping";
	    GatewayIntentBits[GatewayIntentBits["MessageContent"] = 32768] = "MessageContent";
	    GatewayIntentBits[GatewayIntentBits["GuildScheduledEvents"] = 65536] = "GuildScheduledEvents";
	    GatewayIntentBits[GatewayIntentBits["AutoModerationConfiguration"] = 1048576] = "AutoModerationConfiguration";
	    GatewayIntentBits[GatewayIntentBits["AutoModerationExecution"] = 2097152] = "AutoModerationExecution";
	    GatewayIntentBits[GatewayIntentBits["GuildMessagePolls"] = 16777216] = "GuildMessagePolls";
	    GatewayIntentBits[GatewayIntentBits["DirectMessagePolls"] = 33554432] = "DirectMessagePolls";
	})(GatewayIntentBits || (exports.GatewayIntentBits = GatewayIntentBits = {}));
	/**
	 * https://discord.com/developers/docs/topics/gateway-events#receive-events
	 */
	var GatewayDispatchEvents;
	(function (GatewayDispatchEvents) {
	    GatewayDispatchEvents["ApplicationCommandPermissionsUpdate"] = "APPLICATION_COMMAND_PERMISSIONS_UPDATE";
	    GatewayDispatchEvents["AutoModerationActionExecution"] = "AUTO_MODERATION_ACTION_EXECUTION";
	    GatewayDispatchEvents["AutoModerationRuleCreate"] = "AUTO_MODERATION_RULE_CREATE";
	    GatewayDispatchEvents["AutoModerationRuleDelete"] = "AUTO_MODERATION_RULE_DELETE";
	    GatewayDispatchEvents["AutoModerationRuleUpdate"] = "AUTO_MODERATION_RULE_UPDATE";
	    GatewayDispatchEvents["ChannelCreate"] = "CHANNEL_CREATE";
	    GatewayDispatchEvents["ChannelDelete"] = "CHANNEL_DELETE";
	    GatewayDispatchEvents["ChannelPinsUpdate"] = "CHANNEL_PINS_UPDATE";
	    GatewayDispatchEvents["ChannelUpdate"] = "CHANNEL_UPDATE";
	    GatewayDispatchEvents["EntitlementCreate"] = "ENTITLEMENT_CREATE";
	    GatewayDispatchEvents["EntitlementDelete"] = "ENTITLEMENT_DELETE";
	    GatewayDispatchEvents["EntitlementUpdate"] = "ENTITLEMENT_UPDATE";
	    GatewayDispatchEvents["GuildAuditLogEntryCreate"] = "GUILD_AUDIT_LOG_ENTRY_CREATE";
	    GatewayDispatchEvents["GuildBanAdd"] = "GUILD_BAN_ADD";
	    GatewayDispatchEvents["GuildBanRemove"] = "GUILD_BAN_REMOVE";
	    GatewayDispatchEvents["GuildCreate"] = "GUILD_CREATE";
	    GatewayDispatchEvents["GuildDelete"] = "GUILD_DELETE";
	    GatewayDispatchEvents["GuildEmojisUpdate"] = "GUILD_EMOJIS_UPDATE";
	    GatewayDispatchEvents["GuildIntegrationsUpdate"] = "GUILD_INTEGRATIONS_UPDATE";
	    GatewayDispatchEvents["GuildMemberAdd"] = "GUILD_MEMBER_ADD";
	    GatewayDispatchEvents["GuildMemberRemove"] = "GUILD_MEMBER_REMOVE";
	    GatewayDispatchEvents["GuildMembersChunk"] = "GUILD_MEMBERS_CHUNK";
	    GatewayDispatchEvents["GuildMemberUpdate"] = "GUILD_MEMBER_UPDATE";
	    GatewayDispatchEvents["GuildRoleCreate"] = "GUILD_ROLE_CREATE";
	    GatewayDispatchEvents["GuildRoleDelete"] = "GUILD_ROLE_DELETE";
	    GatewayDispatchEvents["GuildRoleUpdate"] = "GUILD_ROLE_UPDATE";
	    GatewayDispatchEvents["GuildScheduledEventCreate"] = "GUILD_SCHEDULED_EVENT_CREATE";
	    GatewayDispatchEvents["GuildScheduledEventDelete"] = "GUILD_SCHEDULED_EVENT_DELETE";
	    GatewayDispatchEvents["GuildScheduledEventUpdate"] = "GUILD_SCHEDULED_EVENT_UPDATE";
	    GatewayDispatchEvents["GuildScheduledEventUserAdd"] = "GUILD_SCHEDULED_EVENT_USER_ADD";
	    GatewayDispatchEvents["GuildScheduledEventUserRemove"] = "GUILD_SCHEDULED_EVENT_USER_REMOVE";
	    GatewayDispatchEvents["GuildSoundboardSoundCreate"] = "GUILD_SOUNDBOARD_SOUND_CREATE";
	    GatewayDispatchEvents["GuildSoundboardSoundDelete"] = "GUILD_SOUNDBOARD_SOUND_DELETE";
	    GatewayDispatchEvents["GuildSoundboardSoundsUpdate"] = "GUILD_SOUNDBOARD_SOUNDS_UPDATE";
	    GatewayDispatchEvents["GuildSoundboardSoundUpdate"] = "GUILD_SOUNDBOARD_SOUND_UPDATE";
	    GatewayDispatchEvents["GuildStickersUpdate"] = "GUILD_STICKERS_UPDATE";
	    GatewayDispatchEvents["GuildUpdate"] = "GUILD_UPDATE";
	    GatewayDispatchEvents["IntegrationCreate"] = "INTEGRATION_CREATE";
	    GatewayDispatchEvents["IntegrationDelete"] = "INTEGRATION_DELETE";
	    GatewayDispatchEvents["IntegrationUpdate"] = "INTEGRATION_UPDATE";
	    GatewayDispatchEvents["InteractionCreate"] = "INTERACTION_CREATE";
	    GatewayDispatchEvents["InviteCreate"] = "INVITE_CREATE";
	    GatewayDispatchEvents["InviteDelete"] = "INVITE_DELETE";
	    GatewayDispatchEvents["MessageCreate"] = "MESSAGE_CREATE";
	    GatewayDispatchEvents["MessageDelete"] = "MESSAGE_DELETE";
	    GatewayDispatchEvents["MessageDeleteBulk"] = "MESSAGE_DELETE_BULK";
	    GatewayDispatchEvents["MessagePollVoteAdd"] = "MESSAGE_POLL_VOTE_ADD";
	    GatewayDispatchEvents["MessagePollVoteRemove"] = "MESSAGE_POLL_VOTE_REMOVE";
	    GatewayDispatchEvents["MessageReactionAdd"] = "MESSAGE_REACTION_ADD";
	    GatewayDispatchEvents["MessageReactionRemove"] = "MESSAGE_REACTION_REMOVE";
	    GatewayDispatchEvents["MessageReactionRemoveAll"] = "MESSAGE_REACTION_REMOVE_ALL";
	    GatewayDispatchEvents["MessageReactionRemoveEmoji"] = "MESSAGE_REACTION_REMOVE_EMOJI";
	    GatewayDispatchEvents["MessageUpdate"] = "MESSAGE_UPDATE";
	    GatewayDispatchEvents["PresenceUpdate"] = "PRESENCE_UPDATE";
	    GatewayDispatchEvents["Ready"] = "READY";
	    GatewayDispatchEvents["Resumed"] = "RESUMED";
	    GatewayDispatchEvents["StageInstanceCreate"] = "STAGE_INSTANCE_CREATE";
	    GatewayDispatchEvents["StageInstanceDelete"] = "STAGE_INSTANCE_DELETE";
	    GatewayDispatchEvents["StageInstanceUpdate"] = "STAGE_INSTANCE_UPDATE";
	    GatewayDispatchEvents["SubscriptionCreate"] = "SUBSCRIPTION_CREATE";
	    GatewayDispatchEvents["SubscriptionDelete"] = "SUBSCRIPTION_DELETE";
	    GatewayDispatchEvents["SubscriptionUpdate"] = "SUBSCRIPTION_UPDATE";
	    GatewayDispatchEvents["ThreadCreate"] = "THREAD_CREATE";
	    GatewayDispatchEvents["ThreadDelete"] = "THREAD_DELETE";
	    GatewayDispatchEvents["ThreadListSync"] = "THREAD_LIST_SYNC";
	    GatewayDispatchEvents["ThreadMembersUpdate"] = "THREAD_MEMBERS_UPDATE";
	    GatewayDispatchEvents["ThreadMemberUpdate"] = "THREAD_MEMBER_UPDATE";
	    GatewayDispatchEvents["ThreadUpdate"] = "THREAD_UPDATE";
	    GatewayDispatchEvents["TypingStart"] = "TYPING_START";
	    GatewayDispatchEvents["UserUpdate"] = "USER_UPDATE";
	    GatewayDispatchEvents["VoiceChannelEffectSend"] = "VOICE_CHANNEL_EFFECT_SEND";
	    GatewayDispatchEvents["VoiceServerUpdate"] = "VOICE_SERVER_UPDATE";
	    GatewayDispatchEvents["VoiceStateUpdate"] = "VOICE_STATE_UPDATE";
	    GatewayDispatchEvents["WebhooksUpdate"] = "WEBHOOKS_UPDATE";
	})(GatewayDispatchEvents || (exports.GatewayDispatchEvents = GatewayDispatchEvents = {}));
	/**
	 * https://discord.com/developers/docs/topics/gateway-events#voice-channel-effect-send-animation-types
	 */
	var VoiceChannelEffectSendAnimationType;
	(function (VoiceChannelEffectSendAnimationType) {
	    /**
	     * A fun animation, sent by a Nitro subscriber
	     */
	    VoiceChannelEffectSendAnimationType[VoiceChannelEffectSendAnimationType["Premium"] = 0] = "Premium";
	    /**
	     * The standard animation
	     */
	    VoiceChannelEffectSendAnimationType[VoiceChannelEffectSendAnimationType["Basic"] = 1] = "Basic";
	})(VoiceChannelEffectSendAnimationType || (exports.VoiceChannelEffectSendAnimationType = VoiceChannelEffectSendAnimationType = {}));
	// #endregion Shared
	
} (v10$k));

var mod$9 = /*@__PURE__*/getDefaultExportFromCjs(v10$k);

const GatewayCloseCodes$1 = mod$9.GatewayCloseCodes;
const GatewayDispatchEvents$1 = mod$9.GatewayDispatchEvents;
const GatewayIntentBits$1 = mod$9.GatewayIntentBits;
const GatewayOpcodes$1 = mod$9.GatewayOpcodes;
const GatewayVersion$1 = mod$9.GatewayVersion;
const VoiceChannelEffectSendAnimationType = mod$9.VoiceChannelEffectSendAnimationType;

var v10$j = /*#__PURE__*/Object.freeze({
	__proto__: null,
	GatewayCloseCodes: GatewayCloseCodes$1,
	GatewayDispatchEvents: GatewayDispatchEvents$1,
	GatewayIntentBits: GatewayIntentBits$1,
	GatewayOpcodes: GatewayOpcodes$1,
	GatewayVersion: GatewayVersion$1,
	VoiceChannelEffectSendAnimationType: VoiceChannelEffectSendAnimationType,
	default: mod$9
});

var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(v10$j);

var globals$3 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FormattingPatterns = void 0;
	/**
	 * https://discord.com/developers/docs/reference#message-formatting-formats
	 */
	exports.FormattingPatterns = {
	    /**
	     * Regular expression for matching a user mention, strictly without a nickname
	     *
	     * The `id` group property is present on the `exec` result of this expression
	     */
	    User: /<@(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching a user mention, strictly with a nickname
	     *
	     * The `id` group property is present on the `exec` result of this expression
	     *
	     * @deprecated Passing `!` in user mentions is no longer necessary / supported, and future message contents won't have it
	     */
	    UserWithNickname: /<@!(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching a user mention, with or without a nickname
	     *
	     * The `id` group property is present on the `exec` result of this expression
	     *
	     * @deprecated Passing `!` in user mentions is no longer necessary / supported, and future message contents won't have it
	     */
	    UserWithOptionalNickname: /<@!?(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching a channel mention
	     *
	     * The `id` group property is present on the `exec` result of this expression
	     */
	    Channel: /<#(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching a role mention
	     *
	     * The `id` group property is present on the `exec` result of this expression
	     */
	    Role: /<@&(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching a application command mention
	     *
	     * The `fullName` (possibly including `name`, `subcommandOrGroup` and `subcommand`) and `id` group properties are present on the `exec` result of this expression
	     */
	    SlashCommand: 
	    // eslint-disable-next-line unicorn/no-unsafe-regex
	    /<\/(?<fullName>(?<name>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32})(?: (?<subcommandOrGroup>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?(?: (?<subcommand>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?):(?<id>\d{17,20})>/u,
	    /**
	     * Regular expression for matching a custom emoji, either static or animated
	     *
	     * The `animated`, `name` and `id` group properties are present on the `exec` result of this expression
	     */
	    Emoji: /<(?<animated>a)?:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching strictly an animated custom emoji
	     *
	     * The `animated`, `name` and `id` group properties are present on the `exec` result of this expression
	     */
	    AnimatedEmoji: /<(?<animated>a):(?<name>\w{2,32}):(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching strictly a static custom emoji
	     *
	     * The `name` and `id` group properties are present on the `exec` result of this expression
	     */
	    StaticEmoji: /<:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching a timestamp, either default or custom styled
	     *
	     * The `timestamp` and `style` group properties are present on the `exec` result of this expression
	     */
	    // eslint-disable-next-line prefer-named-capture-group
	    Timestamp: /<t:(?<timestamp>-?\d{1,13})(:(?<style>[DFRTdft]))?>/,
	    /**
	     * Regular expression for matching strictly default styled timestamps
	     *
	     * The `timestamp` group property is present on the `exec` result of this expression
	     */
	    DefaultStyledTimestamp: /<t:(?<timestamp>-?\d{1,13})>/,
	    /**
	     * Regular expression for matching strictly custom styled timestamps
	     *
	     * The `timestamp` and `style` group properties are present on the `exec` result of this expression
	     */
	    StyledTimestamp: /<t:(?<timestamp>-?\d{1,13}):(?<style>[DFRTdft])>/,
	    /**
	     * Regular expression for matching a guild navigation mention
	     *
	     * The `type` group property is present on the `exec` result of this expression
	     */
	    GuildNavigation: /<id:(?<type>customize|browse|guide|linked-roles)>/,
	    /**
	     * Regular expression for matching a linked role mention
	     *
	     * The `id` group property is present on the `exec` result of this expression
	     */
	    LinkedRole: /<id:linked-roles:(?<id>\d{17,20})>/,
	};
	/**
	 * Freezes the formatting patterns
	 *
	 * @internal
	 */
	Object.freeze(exports.FormattingPatterns);
	
} (globals$3));

var mod$8 = /*@__PURE__*/getDefaultExportFromCjs(globals$3);

const FormattingPatterns$1 = mod$8.FormattingPatterns;

var globals$2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	FormattingPatterns: FormattingPatterns$1,
	default: mod$8
});

var require$$1$1 = /*@__PURE__*/getAugmentedNamespace(globals$2);

var v10$i = {};

var common$6 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PermissionFlagsBits = void 0;
	/**
	 * https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
	 *
	 * These flags are exported as `BigInt`s and NOT numbers. Wrapping them in `Number()`
	 * may cause issues, try to use BigInts as much as possible or modules that can
	 * replicate them in some way
	 */
	exports.PermissionFlagsBits = {
	    /**
	     * Allows creation of instant invites
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    CreateInstantInvite: 1n << 0n,
	    /**
	     * Allows kicking members
	     */
	    // eslint-disable-next-line sonarjs/no-identical-expressions
	    KickMembers: 1n << 1n,
	    /**
	     * Allows banning members
	     */
	    BanMembers: 1n << 2n,
	    /**
	     * Allows all permissions and bypasses channel permission overwrites
	     */
	    Administrator: 1n << 3n,
	    /**
	     * Allows management and editing of channels
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    ManageChannels: 1n << 4n,
	    /**
	     * Allows management and editing of the guild
	     */
	    ManageGuild: 1n << 5n,
	    /**
	     * Allows for the addition of reactions to messages
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    AddReactions: 1n << 6n,
	    /**
	     * Allows for viewing of audit logs
	     */
	    ViewAuditLog: 1n << 7n,
	    /**
	     * Allows for using priority speaker in a voice channel
	     *
	     * Applies to channel types: Voice
	     */
	    PrioritySpeaker: 1n << 8n,
	    /**
	     * Allows the user to go live
	     *
	     * Applies to channel types: Voice, Stage
	     */
	    Stream: 1n << 9n,
	    /**
	     * Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    ViewChannel: 1n << 10n,
	    /**
	     * Allows for sending messages in a channel and creating threads in a forum
	     * (does not allow sending messages in threads)
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    SendMessages: 1n << 11n,
	    /**
	     * Allows for sending of `/tts` messages
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    SendTTSMessages: 1n << 12n,
	    /**
	     * Allows for deletion of other users messages
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    ManageMessages: 1n << 13n,
	    /**
	     * Links sent by users with this permission will be auto-embedded
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    EmbedLinks: 1n << 14n,
	    /**
	     * Allows for uploading images and files
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    AttachFiles: 1n << 15n,
	    /**
	     * Allows for reading of message history
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    ReadMessageHistory: 1n << 16n,
	    /**
	     * Allows for using the `@everyone` tag to notify all users in a channel,
	     * and the `@here` tag to notify all online users in a channel
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    MentionEveryone: 1n << 17n,
	    /**
	     * Allows the usage of custom emojis from other servers
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    UseExternalEmojis: 1n << 18n,
	    /**
	     * Allows for viewing guild insights
	     */
	    ViewGuildInsights: 1n << 19n,
	    /**
	     * Allows for joining of a voice channel
	     *
	     * Applies to channel types: Voice, Stage
	     */
	    Connect: 1n << 20n,
	    /**
	     * Allows for speaking in a voice channel
	     *
	     * Applies to channel types: Voice
	     */
	    Speak: 1n << 21n,
	    /**
	     * Allows for muting members in a voice channel
	     *
	     * Applies to channel types: Voice, Stage
	     */
	    MuteMembers: 1n << 22n,
	    /**
	     * Allows for deafening of members in a voice channel
	     *
	     * Applies to channel types: Voice
	     */
	    DeafenMembers: 1n << 23n,
	    /**
	     * Allows for moving of members between voice channels
	     *
	     * Applies to channel types: Voice, Stage
	     */
	    MoveMembers: 1n << 24n,
	    /**
	     * Allows for using voice-activity-detection in a voice channel
	     *
	     * Applies to channel types: Voice
	     */
	    UseVAD: 1n << 25n,
	    /**
	     * Allows for modification of own nickname
	     */
	    ChangeNickname: 1n << 26n,
	    /**
	     * Allows for modification of other users nicknames
	     */
	    ManageNicknames: 1n << 27n,
	    /**
	     * Allows management and editing of roles
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    ManageRoles: 1n << 28n,
	    /**
	     * Allows management and editing of webhooks
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    ManageWebhooks: 1n << 29n,
	    /**
	     * Allows management and editing of emojis, stickers, and soundboard sounds
	     *
	     * @deprecated This is the old name for {@apilink PermissionFlagsBits#ManageGuildExpressions}
	     */
	    ManageEmojisAndStickers: 1n << 30n,
	    /**
	     * Allows for editing and deleting emojis, stickers, and soundboard sounds created by all users
	     */
	    ManageGuildExpressions: 1n << 30n,
	    /**
	     * Allows members to use application commands, including slash commands and context menu commands
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    UseApplicationCommands: 1n << 31n,
	    /**
	     * Allows for requesting to speak in stage channels
	     *
	     * Applies to channel types: Stage
	     */
	    RequestToSpeak: 1n << 32n,
	    /**
	     * Allows for editing and deleting scheduled events created by all users
	     *
	     * Applies to channel types: Voice, Stage
	     */
	    ManageEvents: 1n << 33n,
	    /**
	     * Allows for deleting and archiving threads, and viewing all private threads
	     *
	     * Applies to channel types: Text
	     */
	    ManageThreads: 1n << 34n,
	    /**
	     * Allows for creating public and announcement threads
	     *
	     * Applies to channel types: Text
	     */
	    CreatePublicThreads: 1n << 35n,
	    /**
	     * Allows for creating private threads
	     *
	     * Applies to channel types: Text
	     */
	    CreatePrivateThreads: 1n << 36n,
	    /**
	     * Allows the usage of custom stickers from other servers
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    UseExternalStickers: 1n << 37n,
	    /**
	     * Allows for sending messages in threads
	     *
	     * Applies to channel types: Text
	     */
	    SendMessagesInThreads: 1n << 38n,
	    /**
	     * Allows for using Activities (applications with the {@apilink ApplicationFlags.Embedded} flag) in a voice channel
	     *
	     * Applies to channel types: Voice
	     */
	    UseEmbeddedActivities: 1n << 39n,
	    /**
	     * Allows for timing out users to prevent them from sending or reacting to messages in chat and threads,
	     * and from speaking in voice and stage channels
	     */
	    ModerateMembers: 1n << 40n,
	    /**
	     * Allows for viewing role subscription insights
	     */
	    ViewCreatorMonetizationAnalytics: 1n << 41n,
	    /**
	     * Allows for using soundboard in a voice channel
	     *
	     * Applies to channel types: Voice
	     */
	    UseSoundboard: 1n << 42n,
	    /**
	     * Allows for creating emojis, stickers, and soundboard sounds, and editing and deleting those created by the current user
	     */
	    CreateGuildExpressions: 1n << 43n,
	    /**
	     * Allows for creating scheduled events, and editing and deleting those created by the current user
	     *
	     * Applies to channel types: Voice, Stage
	     */
	    CreateEvents: 1n << 44n,
	    /**
	     * Allows the usage of custom soundboard sounds from other servers
	     *
	     * Applies to channel types: Voice
	     */
	    UseExternalSounds: 1n << 45n,
	    /**
	     * Allows sending voice messages
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    SendVoiceMessages: 1n << 46n,
	    /**
	     * Allows sending polls
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    SendPolls: 1n << 49n,
	    /**
	     * Allows user-installed apps to send public responses. When disabled, users will still be allowed to use their apps but the responses will be ephemeral. This only applies to apps not also installed to the server
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    UseExternalApps: 1n << 50n,
	};
	/**
	 * Freeze the object of bits, preventing any modifications to it
	 *
	 * @internal
	 */
	Object.freeze(exports.PermissionFlagsBits);
	
} (common$6));

var application$3 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/application
 */
Object.defineProperty(application$3, "__esModule", { value: true });
application$3.ApplicationRoleConnectionMetadataType = application$3.ApplicationFlags = void 0;
/**
 * https://discord.com/developers/docs/resources/application#application-object-application-flags
 */
var ApplicationFlags$3;
(function (ApplicationFlags) {
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["EmbeddedReleased"] = 2] = "EmbeddedReleased";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["ManagedEmoji"] = 4] = "ManagedEmoji";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["EmbeddedIAP"] = 8] = "EmbeddedIAP";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["GroupDMCreate"] = 16] = "GroupDMCreate";
    /**
     * Indicates if an app uses the Auto Moderation API
     */
    ApplicationFlags[ApplicationFlags["ApplicationAutoModerationRuleCreateBadge"] = 64] = "ApplicationAutoModerationRuleCreateBadge";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["RPCHasConnected"] = 2048] = "RPCHasConnected";
    /**
     * Intent required for bots in 100 or more servers to receive `presence_update` events
     */
    ApplicationFlags[ApplicationFlags["GatewayPresence"] = 4096] = "GatewayPresence";
    /**
     * Intent required for bots in under 100 servers to receive `presence_update` events, found in Bot Settings
     */
    ApplicationFlags[ApplicationFlags["GatewayPresenceLimited"] = 8192] = "GatewayPresenceLimited";
    /**
     * Intent required for bots in 100 or more servers to receive member-related events like `guild_member_add`.
     * See list of member-related events [under `GUILD_MEMBERS`](https://discord.com/developers/docs/topics/gateway#list-of-intents)
     */
    ApplicationFlags[ApplicationFlags["GatewayGuildMembers"] = 16384] = "GatewayGuildMembers";
    /**
     * Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found in Bot Settings.
     * See list of member-related events [under `GUILD_MEMBERS`](https://discord.com/developers/docs/topics/gateway#list-of-intents)
     */
    ApplicationFlags[ApplicationFlags["GatewayGuildMembersLimited"] = 32768] = "GatewayGuildMembersLimited";
    /**
     * Indicates unusual growth of an app that prevents verification
     */
    ApplicationFlags[ApplicationFlags["VerificationPendingGuildLimit"] = 65536] = "VerificationPendingGuildLimit";
    /**
     * Indicates if an app is embedded within the Discord client (currently unavailable publicly)
     */
    ApplicationFlags[ApplicationFlags["Embedded"] = 131072] = "Embedded";
    /**
     * Intent required for bots in 100 or more servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055)
     */
    ApplicationFlags[ApplicationFlags["GatewayMessageContent"] = 262144] = "GatewayMessageContent";
    /**
     * Intent required for bots in under 100 servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055),
     * found in Bot Settings
     */
    ApplicationFlags[ApplicationFlags["GatewayMessageContentLimited"] = 524288] = "GatewayMessageContentLimited";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["EmbeddedFirstParty"] = 1048576] = "EmbeddedFirstParty";
    /**
     * Indicates if an app has registered global [application commands](https://discord.com/developers/docs/interactions/application-commands)
     */
    ApplicationFlags[ApplicationFlags["ApplicationCommandBadge"] = 8388608] = "ApplicationCommandBadge";
})(ApplicationFlags$3 || (application$3.ApplicationFlags = ApplicationFlags$3 = {}));
/**
 * https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-type
 */
var ApplicationRoleConnectionMetadataType$3;
(function (ApplicationRoleConnectionMetadataType) {
    /**
     * The metadata value (`integer`) is less than or equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerLessThanOrEqual"] = 1] = "IntegerLessThanOrEqual";
    /**
     * The metadata value (`integer`) is greater than or equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerGreaterThanOrEqual"] = 2] = "IntegerGreaterThanOrEqual";
    /**
     * The metadata value (`integer`) is equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerEqual"] = 3] = "IntegerEqual";
    /**
     * The metadata value (`integer`) is not equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerNotEqual"] = 4] = "IntegerNotEqual";
    /**
     * The metadata value (`ISO8601 string`) is less than or equal to the guild's configured value (`integer`; days before current date)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["DatetimeLessThanOrEqual"] = 5] = "DatetimeLessThanOrEqual";
    /**
     * The metadata value (`ISO8601 string`) is greater than or equal to the guild's configured value (`integer`; days before current date)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["DatetimeGreaterThanOrEqual"] = 6] = "DatetimeGreaterThanOrEqual";
    /**
     * The metadata value (`integer`) is equal to the guild's configured value (`integer`; `1`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["BooleanEqual"] = 7] = "BooleanEqual";
    /**
     * The metadata value (`integer`) is not equal to the guild's configured value (`integer`; `1`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["BooleanNotEqual"] = 8] = "BooleanNotEqual";
})(ApplicationRoleConnectionMetadataType$3 || (application$3.ApplicationRoleConnectionMetadataType = ApplicationRoleConnectionMetadataType$3 = {}));

var auditLog$3 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/audit-log
 */
Object.defineProperty(auditLog$3, "__esModule", { value: true });
auditLog$3.AuditLogOptionsType = auditLog$3.AuditLogEvent = void 0;
/**
 * https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
 */
var AuditLogEvent$3;
(function (AuditLogEvent) {
    AuditLogEvent[AuditLogEvent["GuildUpdate"] = 1] = "GuildUpdate";
    AuditLogEvent[AuditLogEvent["ChannelCreate"] = 10] = "ChannelCreate";
    AuditLogEvent[AuditLogEvent["ChannelUpdate"] = 11] = "ChannelUpdate";
    AuditLogEvent[AuditLogEvent["ChannelDelete"] = 12] = "ChannelDelete";
    AuditLogEvent[AuditLogEvent["ChannelOverwriteCreate"] = 13] = "ChannelOverwriteCreate";
    AuditLogEvent[AuditLogEvent["ChannelOverwriteUpdate"] = 14] = "ChannelOverwriteUpdate";
    AuditLogEvent[AuditLogEvent["ChannelOverwriteDelete"] = 15] = "ChannelOverwriteDelete";
    AuditLogEvent[AuditLogEvent["MemberKick"] = 20] = "MemberKick";
    AuditLogEvent[AuditLogEvent["MemberPrune"] = 21] = "MemberPrune";
    AuditLogEvent[AuditLogEvent["MemberBanAdd"] = 22] = "MemberBanAdd";
    AuditLogEvent[AuditLogEvent["MemberBanRemove"] = 23] = "MemberBanRemove";
    AuditLogEvent[AuditLogEvent["MemberUpdate"] = 24] = "MemberUpdate";
    AuditLogEvent[AuditLogEvent["MemberRoleUpdate"] = 25] = "MemberRoleUpdate";
    AuditLogEvent[AuditLogEvent["MemberMove"] = 26] = "MemberMove";
    AuditLogEvent[AuditLogEvent["MemberDisconnect"] = 27] = "MemberDisconnect";
    AuditLogEvent[AuditLogEvent["BotAdd"] = 28] = "BotAdd";
    AuditLogEvent[AuditLogEvent["RoleCreate"] = 30] = "RoleCreate";
    AuditLogEvent[AuditLogEvent["RoleUpdate"] = 31] = "RoleUpdate";
    AuditLogEvent[AuditLogEvent["RoleDelete"] = 32] = "RoleDelete";
    AuditLogEvent[AuditLogEvent["InviteCreate"] = 40] = "InviteCreate";
    AuditLogEvent[AuditLogEvent["InviteUpdate"] = 41] = "InviteUpdate";
    AuditLogEvent[AuditLogEvent["InviteDelete"] = 42] = "InviteDelete";
    AuditLogEvent[AuditLogEvent["WebhookCreate"] = 50] = "WebhookCreate";
    AuditLogEvent[AuditLogEvent["WebhookUpdate"] = 51] = "WebhookUpdate";
    AuditLogEvent[AuditLogEvent["WebhookDelete"] = 52] = "WebhookDelete";
    AuditLogEvent[AuditLogEvent["EmojiCreate"] = 60] = "EmojiCreate";
    AuditLogEvent[AuditLogEvent["EmojiUpdate"] = 61] = "EmojiUpdate";
    AuditLogEvent[AuditLogEvent["EmojiDelete"] = 62] = "EmojiDelete";
    AuditLogEvent[AuditLogEvent["MessageDelete"] = 72] = "MessageDelete";
    AuditLogEvent[AuditLogEvent["MessageBulkDelete"] = 73] = "MessageBulkDelete";
    AuditLogEvent[AuditLogEvent["MessagePin"] = 74] = "MessagePin";
    AuditLogEvent[AuditLogEvent["MessageUnpin"] = 75] = "MessageUnpin";
    AuditLogEvent[AuditLogEvent["IntegrationCreate"] = 80] = "IntegrationCreate";
    AuditLogEvent[AuditLogEvent["IntegrationUpdate"] = 81] = "IntegrationUpdate";
    AuditLogEvent[AuditLogEvent["IntegrationDelete"] = 82] = "IntegrationDelete";
    AuditLogEvent[AuditLogEvent["StageInstanceCreate"] = 83] = "StageInstanceCreate";
    AuditLogEvent[AuditLogEvent["StageInstanceUpdate"] = 84] = "StageInstanceUpdate";
    AuditLogEvent[AuditLogEvent["StageInstanceDelete"] = 85] = "StageInstanceDelete";
    AuditLogEvent[AuditLogEvent["StickerCreate"] = 90] = "StickerCreate";
    AuditLogEvent[AuditLogEvent["StickerUpdate"] = 91] = "StickerUpdate";
    AuditLogEvent[AuditLogEvent["StickerDelete"] = 92] = "StickerDelete";
    AuditLogEvent[AuditLogEvent["GuildScheduledEventCreate"] = 100] = "GuildScheduledEventCreate";
    AuditLogEvent[AuditLogEvent["GuildScheduledEventUpdate"] = 101] = "GuildScheduledEventUpdate";
    AuditLogEvent[AuditLogEvent["GuildScheduledEventDelete"] = 102] = "GuildScheduledEventDelete";
    AuditLogEvent[AuditLogEvent["ThreadCreate"] = 110] = "ThreadCreate";
    AuditLogEvent[AuditLogEvent["ThreadUpdate"] = 111] = "ThreadUpdate";
    AuditLogEvent[AuditLogEvent["ThreadDelete"] = 112] = "ThreadDelete";
    AuditLogEvent[AuditLogEvent["ApplicationCommandPermissionUpdate"] = 121] = "ApplicationCommandPermissionUpdate";
    AuditLogEvent[AuditLogEvent["AutoModerationRuleCreate"] = 140] = "AutoModerationRuleCreate";
    AuditLogEvent[AuditLogEvent["AutoModerationRuleUpdate"] = 141] = "AutoModerationRuleUpdate";
    AuditLogEvent[AuditLogEvent["AutoModerationRuleDelete"] = 142] = "AutoModerationRuleDelete";
    AuditLogEvent[AuditLogEvent["AutoModerationBlockMessage"] = 143] = "AutoModerationBlockMessage";
    AuditLogEvent[AuditLogEvent["AutoModerationFlagToChannel"] = 144] = "AutoModerationFlagToChannel";
    AuditLogEvent[AuditLogEvent["AutoModerationUserCommunicationDisabled"] = 145] = "AutoModerationUserCommunicationDisabled";
    AuditLogEvent[AuditLogEvent["CreatorMonetizationRequestCreated"] = 150] = "CreatorMonetizationRequestCreated";
    AuditLogEvent[AuditLogEvent["CreatorMonetizationTermsAccepted"] = 151] = "CreatorMonetizationTermsAccepted";
    AuditLogEvent[AuditLogEvent["OnboardingPromptCreate"] = 163] = "OnboardingPromptCreate";
    AuditLogEvent[AuditLogEvent["OnboardingPromptUpdate"] = 164] = "OnboardingPromptUpdate";
    AuditLogEvent[AuditLogEvent["OnboardingPromptDelete"] = 165] = "OnboardingPromptDelete";
    AuditLogEvent[AuditLogEvent["OnboardingCreate"] = 166] = "OnboardingCreate";
    AuditLogEvent[AuditLogEvent["OnboardingUpdate"] = 167] = "OnboardingUpdate";
    AuditLogEvent[AuditLogEvent["HomeSettingsCreate"] = 190] = "HomeSettingsCreate";
    AuditLogEvent[AuditLogEvent["HomeSettingsUpdate"] = 191] = "HomeSettingsUpdate";
})(AuditLogEvent$3 || (auditLog$3.AuditLogEvent = AuditLogEvent$3 = {}));
var AuditLogOptionsType$3;
(function (AuditLogOptionsType) {
    AuditLogOptionsType["Role"] = "0";
    AuditLogOptionsType["Member"] = "1";
})(AuditLogOptionsType$3 || (auditLog$3.AuditLogOptionsType = AuditLogOptionsType$3 = {}));

var autoModeration$3 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/auto-moderation
 */
Object.defineProperty(autoModeration$3, "__esModule", { value: true });
autoModeration$3.AutoModerationActionType = autoModeration$3.AutoModerationRuleEventType = autoModeration$3.AutoModerationRuleKeywordPresetType = autoModeration$3.AutoModerationRuleTriggerType = void 0;
/**
 * https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types
 */
var AutoModerationRuleTriggerType$3;
(function (AutoModerationRuleTriggerType) {
    /**
     * Check if content contains words from a user defined list of keywords (Maximum of 6 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["Keyword"] = 1] = "Keyword";
    /**
     * Check if content represents generic spam (Maximum of 1 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["Spam"] = 3] = "Spam";
    /**
     * Check if content contains words from internal pre-defined wordsets (Maximum of 1 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["KeywordPreset"] = 4] = "KeywordPreset";
    /**
     * Check if content contains more mentions than allowed (Maximum of 1 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["MentionSpam"] = 5] = "MentionSpam";
    /**
     * Check if member profile contains words from a user defined list of keywords (Maximum of 1 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["MemberProfile"] = 6] = "MemberProfile";
})(AutoModerationRuleTriggerType$3 || (autoModeration$3.AutoModerationRuleTriggerType = AutoModerationRuleTriggerType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-preset-types
 */
var AutoModerationRuleKeywordPresetType$3;
(function (AutoModerationRuleKeywordPresetType) {
    /**
     * Words that may be considered forms of swearing or cursing
     */
    AutoModerationRuleKeywordPresetType[AutoModerationRuleKeywordPresetType["Profanity"] = 1] = "Profanity";
    /**
     * Words that refer to sexually explicit behavior or activity
     */
    AutoModerationRuleKeywordPresetType[AutoModerationRuleKeywordPresetType["SexualContent"] = 2] = "SexualContent";
    /**
     * Personal insults or words that may be considered hate speech
     */
    AutoModerationRuleKeywordPresetType[AutoModerationRuleKeywordPresetType["Slurs"] = 3] = "Slurs";
})(AutoModerationRuleKeywordPresetType$3 || (autoModeration$3.AutoModerationRuleKeywordPresetType = AutoModerationRuleKeywordPresetType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types
 */
var AutoModerationRuleEventType$3;
(function (AutoModerationRuleEventType) {
    /**
     * When a member sends or edits a message in the guild
     */
    AutoModerationRuleEventType[AutoModerationRuleEventType["MessageSend"] = 1] = "MessageSend";
    /**
     * When a member edits their profile
     */
    AutoModerationRuleEventType[AutoModerationRuleEventType["MemberUpdate"] = 2] = "MemberUpdate";
})(AutoModerationRuleEventType$3 || (autoModeration$3.AutoModerationRuleEventType = AutoModerationRuleEventType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types
 */
var AutoModerationActionType$3;
(function (AutoModerationActionType) {
    /**
     * Blocks a member's message and prevents it from being posted.
     * A custom explanation can be specified and shown to members whenever their message is blocked
     */
    AutoModerationActionType[AutoModerationActionType["BlockMessage"] = 1] = "BlockMessage";
    /**
     * Logs user content to a specified channel
     */
    AutoModerationActionType[AutoModerationActionType["SendAlertMessage"] = 2] = "SendAlertMessage";
    /**
     * Timeout user for specified duration, this action type can be set if the bot has `MODERATE_MEMBERS` permission
     */
    AutoModerationActionType[AutoModerationActionType["Timeout"] = 3] = "Timeout";
    /**
     * Prevents a member from using text, voice, or other interactions
     */
    AutoModerationActionType[AutoModerationActionType["BlockMemberInteraction"] = 4] = "BlockMemberInteraction";
})(AutoModerationActionType$3 || (autoModeration$3.AutoModerationActionType = AutoModerationActionType$3 = {}));

var channel$5 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/channel
 */
Object.defineProperty(channel$5, "__esModule", { value: true });
channel$5.ChannelFlags = channel$5.SelectMenuDefaultValueType = channel$5.TextInputStyle = channel$5.ButtonStyle = channel$5.ComponentType = channel$5.AllowedMentionsTypes = channel$5.AttachmentFlags = channel$5.EmbedType = channel$5.ThreadMemberFlags = channel$5.ThreadAutoArchiveDuration = channel$5.OverwriteType = channel$5.MessageFlags = channel$5.MessageReferenceType = channel$5.MessageActivityType = channel$5.MessageType = channel$5.VideoQualityMode = channel$5.ChannelType = channel$5.ForumLayoutType = channel$5.SortOrderType = void 0;
/**
 * https://discord.com/developers/docs/resources/channel/#channel-object-sort-order-types
 */
var SortOrderType$3;
(function (SortOrderType) {
    /**
     * Sort forum posts by activity
     */
    SortOrderType[SortOrderType["LatestActivity"] = 0] = "LatestActivity";
    /**
     * Sort forum posts by creation time (from most recent to oldest)
     */
    SortOrderType[SortOrderType["CreationDate"] = 1] = "CreationDate";
})(SortOrderType$3 || (channel$5.SortOrderType = SortOrderType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/channel/#channel-object-forum-layout-types
 */
var ForumLayoutType$3;
(function (ForumLayoutType) {
    /**
     * No default has been set for forum channel
     */
    ForumLayoutType[ForumLayoutType["NotSet"] = 0] = "NotSet";
    /**
     * Display posts as a list
     */
    ForumLayoutType[ForumLayoutType["ListView"] = 1] = "ListView";
    /**
     * Display posts as a collection of tiles
     */
    ForumLayoutType[ForumLayoutType["GalleryView"] = 2] = "GalleryView";
})(ForumLayoutType$3 || (channel$5.ForumLayoutType = ForumLayoutType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#channel-object-channel-types
 */
var ChannelType$3;
(function (ChannelType) {
    /**
     * A text channel within a guild
     */
    ChannelType[ChannelType["GuildText"] = 0] = "GuildText";
    /**
     * A direct message between users
     */
    ChannelType[ChannelType["DM"] = 1] = "DM";
    /**
     * A voice channel within a guild
     */
    ChannelType[ChannelType["GuildVoice"] = 2] = "GuildVoice";
    /**
     * A direct message between multiple users
     */
    ChannelType[ChannelType["GroupDM"] = 3] = "GroupDM";
    /**
     * An organizational category that contains up to 50 channels
     *
     * See https://support.discord.com/hc/articles/115001580171
     */
    ChannelType[ChannelType["GuildCategory"] = 4] = "GuildCategory";
    /**
     * A channel that users can follow and crosspost into their own guild
     *
     * See https://support.discord.com/hc/articles/360032008192
     */
    ChannelType[ChannelType["GuildAnnouncement"] = 5] = "GuildAnnouncement";
    /**
     * A temporary sub-channel within a Guild Announcement channel
     */
    ChannelType[ChannelType["AnnouncementThread"] = 10] = "AnnouncementThread";
    /**
     * A temporary sub-channel within a Guild Text or Guild Forum channel
     */
    ChannelType[ChannelType["PublicThread"] = 11] = "PublicThread";
    /**
     * A temporary sub-channel within a Guild Text channel that is only viewable by those invited and those with the Manage Threads permission
     */
    ChannelType[ChannelType["PrivateThread"] = 12] = "PrivateThread";
    /**
     * A voice channel for hosting events with an audience
     *
     * See https://support.discord.com/hc/articles/1500005513722
     */
    ChannelType[ChannelType["GuildStageVoice"] = 13] = "GuildStageVoice";
    /**
     * The channel in a Student Hub containing the listed servers
     *
     * See https://support.discord.com/hc/articles/4406046651927
     */
    ChannelType[ChannelType["GuildDirectory"] = 14] = "GuildDirectory";
    /**
     * A channel that can only contain threads
     */
    ChannelType[ChannelType["GuildForum"] = 15] = "GuildForum";
    /**
     * A channel like forum channels but contains media for server subscriptions
     *
     * See https://creator-support.discord.com/hc/articles/14346342766743
     */
    ChannelType[ChannelType["GuildMedia"] = 16] = "GuildMedia";
    // EVERYTHING BELOW THIS LINE SHOULD BE OLD NAMES FOR RENAMED ENUM MEMBERS //
    /**
     * A channel that users can follow and crosspost into their own guild
     *
     * @deprecated This is the old name for {@apilink ChannelType#GuildAnnouncement}
     *
     * See https://support.discord.com/hc/articles/360032008192
     */
    ChannelType[ChannelType["GuildNews"] = 5] = "GuildNews";
    /**
     * A temporary sub-channel within a Guild Announcement channel
     *
     * @deprecated This is the old name for {@apilink ChannelType#AnnouncementThread}
     */
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    ChannelType[ChannelType["GuildNewsThread"] = 10] = "GuildNewsThread";
    /**
     * A temporary sub-channel within a Guild Text channel
     *
     * @deprecated This is the old name for {@apilink ChannelType#PublicThread}
     */
    ChannelType[ChannelType["GuildPublicThread"] = 11] = "GuildPublicThread";
    /**
     * A temporary sub-channel within a Guild Text channel that is only viewable by those invited and those with the Manage Threads permission
     *
     * @deprecated This is the old name for {@apilink ChannelType#PrivateThread}
     */
    ChannelType[ChannelType["GuildPrivateThread"] = 12] = "GuildPrivateThread";
})(ChannelType$3 || (channel$5.ChannelType = ChannelType$3 = {}));
var VideoQualityMode$3;
(function (VideoQualityMode) {
    /**
     * Discord chooses the quality for optimal performance
     */
    VideoQualityMode[VideoQualityMode["Auto"] = 1] = "Auto";
    /**
     * 720p
     */
    VideoQualityMode[VideoQualityMode["Full"] = 2] = "Full";
})(VideoQualityMode$3 || (channel$5.VideoQualityMode = VideoQualityMode$3 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-types
 */
var MessageType$3;
(function (MessageType) {
    MessageType[MessageType["Default"] = 0] = "Default";
    MessageType[MessageType["RecipientAdd"] = 1] = "RecipientAdd";
    MessageType[MessageType["RecipientRemove"] = 2] = "RecipientRemove";
    MessageType[MessageType["Call"] = 3] = "Call";
    MessageType[MessageType["ChannelNameChange"] = 4] = "ChannelNameChange";
    MessageType[MessageType["ChannelIconChange"] = 5] = "ChannelIconChange";
    MessageType[MessageType["ChannelPinnedMessage"] = 6] = "ChannelPinnedMessage";
    MessageType[MessageType["UserJoin"] = 7] = "UserJoin";
    MessageType[MessageType["GuildBoost"] = 8] = "GuildBoost";
    MessageType[MessageType["GuildBoostTier1"] = 9] = "GuildBoostTier1";
    MessageType[MessageType["GuildBoostTier2"] = 10] = "GuildBoostTier2";
    MessageType[MessageType["GuildBoostTier3"] = 11] = "GuildBoostTier3";
    MessageType[MessageType["ChannelFollowAdd"] = 12] = "ChannelFollowAdd";
    MessageType[MessageType["GuildDiscoveryDisqualified"] = 14] = "GuildDiscoveryDisqualified";
    MessageType[MessageType["GuildDiscoveryRequalified"] = 15] = "GuildDiscoveryRequalified";
    MessageType[MessageType["GuildDiscoveryGracePeriodInitialWarning"] = 16] = "GuildDiscoveryGracePeriodInitialWarning";
    MessageType[MessageType["GuildDiscoveryGracePeriodFinalWarning"] = 17] = "GuildDiscoveryGracePeriodFinalWarning";
    MessageType[MessageType["ThreadCreated"] = 18] = "ThreadCreated";
    MessageType[MessageType["Reply"] = 19] = "Reply";
    MessageType[MessageType["ChatInputCommand"] = 20] = "ChatInputCommand";
    MessageType[MessageType["ThreadStarterMessage"] = 21] = "ThreadStarterMessage";
    MessageType[MessageType["GuildInviteReminder"] = 22] = "GuildInviteReminder";
    MessageType[MessageType["ContextMenuCommand"] = 23] = "ContextMenuCommand";
    MessageType[MessageType["AutoModerationAction"] = 24] = "AutoModerationAction";
    MessageType[MessageType["RoleSubscriptionPurchase"] = 25] = "RoleSubscriptionPurchase";
    MessageType[MessageType["InteractionPremiumUpsell"] = 26] = "InteractionPremiumUpsell";
    MessageType[MessageType["StageStart"] = 27] = "StageStart";
    MessageType[MessageType["StageEnd"] = 28] = "StageEnd";
    MessageType[MessageType["StageSpeaker"] = 29] = "StageSpeaker";
    /**
     * @unstable https://github.com/discord/discord-api-docs/pull/5927#discussion_r1107678548
     */
    MessageType[MessageType["StageRaiseHand"] = 30] = "StageRaiseHand";
    MessageType[MessageType["StageTopic"] = 31] = "StageTopic";
    MessageType[MessageType["GuildApplicationPremiumSubscription"] = 32] = "GuildApplicationPremiumSubscription";
    MessageType[MessageType["GuildIncidentAlertModeEnabled"] = 36] = "GuildIncidentAlertModeEnabled";
    MessageType[MessageType["GuildIncidentAlertModeDisabled"] = 37] = "GuildIncidentAlertModeDisabled";
    MessageType[MessageType["GuildIncidentReportRaid"] = 38] = "GuildIncidentReportRaid";
    MessageType[MessageType["GuildIncidentReportFalseAlarm"] = 39] = "GuildIncidentReportFalseAlarm";
    MessageType[MessageType["PurchaseNotification"] = 44] = "PurchaseNotification";
    MessageType[MessageType["PollResult"] = 46] = "PollResult";
})(MessageType$3 || (channel$5.MessageType = MessageType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-activity-types
 */
var MessageActivityType$3;
(function (MessageActivityType) {
    MessageActivityType[MessageActivityType["Join"] = 1] = "Join";
    MessageActivityType[MessageActivityType["Spectate"] = 2] = "Spectate";
    MessageActivityType[MessageActivityType["Listen"] = 3] = "Listen";
    MessageActivityType[MessageActivityType["JoinRequest"] = 5] = "JoinRequest";
})(MessageActivityType$3 || (channel$5.MessageActivityType = MessageActivityType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#message-reference-types
 */
var MessageReferenceType$3;
(function (MessageReferenceType) {
    /**
     * A standard reference used by replies
     */
    MessageReferenceType[MessageReferenceType["Default"] = 0] = "Default";
    /**
     * Reference used to point to a message at a point in time
     */
    MessageReferenceType[MessageReferenceType["Forward"] = 1] = "Forward";
})(MessageReferenceType$3 || (channel$5.MessageReferenceType = MessageReferenceType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-flags
 */
var MessageFlags$3;
(function (MessageFlags) {
    /**
     * This message has been published to subscribed channels (via Channel Following)
     */
    MessageFlags[MessageFlags["Crossposted"] = 1] = "Crossposted";
    /**
     * This message originated from a message in another channel (via Channel Following)
     */
    MessageFlags[MessageFlags["IsCrosspost"] = 2] = "IsCrosspost";
    /**
     * Do not include any embeds when serializing this message
     */
    MessageFlags[MessageFlags["SuppressEmbeds"] = 4] = "SuppressEmbeds";
    /**
     * The source message for this crosspost has been deleted (via Channel Following)
     */
    MessageFlags[MessageFlags["SourceMessageDeleted"] = 8] = "SourceMessageDeleted";
    /**
     * This message came from the urgent message system
     */
    MessageFlags[MessageFlags["Urgent"] = 16] = "Urgent";
    /**
     * This message has an associated thread, which shares its id
     */
    MessageFlags[MessageFlags["HasThread"] = 32] = "HasThread";
    /**
     * This message is only visible to the user who invoked the Interaction
     */
    MessageFlags[MessageFlags["Ephemeral"] = 64] = "Ephemeral";
    /**
     * This message is an Interaction Response and the bot is "thinking"
     */
    MessageFlags[MessageFlags["Loading"] = 128] = "Loading";
    /**
     * This message failed to mention some roles and add their members to the thread
     */
    MessageFlags[MessageFlags["FailedToMentionSomeRolesInThread"] = 256] = "FailedToMentionSomeRolesInThread";
    /**
     * @unstable This message flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    MessageFlags[MessageFlags["ShouldShowLinkNotDiscordWarning"] = 1024] = "ShouldShowLinkNotDiscordWarning";
    /**
     * This message will not trigger push and desktop notifications
     */
    MessageFlags[MessageFlags["SuppressNotifications"] = 4096] = "SuppressNotifications";
    /**
     * This message is a voice message
     */
    MessageFlags[MessageFlags["IsVoiceMessage"] = 8192] = "IsVoiceMessage";
})(MessageFlags$3 || (channel$5.MessageFlags = MessageFlags$3 = {}));
var OverwriteType$3;
(function (OverwriteType) {
    OverwriteType[OverwriteType["Role"] = 0] = "Role";
    OverwriteType[OverwriteType["Member"] = 1] = "Member";
})(OverwriteType$3 || (channel$5.OverwriteType = OverwriteType$3 = {}));
var ThreadAutoArchiveDuration$3;
(function (ThreadAutoArchiveDuration) {
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneHour"] = 60] = "OneHour";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneDay"] = 1440] = "OneDay";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["ThreeDays"] = 4320] = "ThreeDays";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneWeek"] = 10080] = "OneWeek";
})(ThreadAutoArchiveDuration$3 || (channel$5.ThreadAutoArchiveDuration = ThreadAutoArchiveDuration$3 = {}));
var ThreadMemberFlags$3;
(function (ThreadMemberFlags) {
    /**
     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ThreadMemberFlags[ThreadMemberFlags["HasInteracted"] = 1] = "HasInteracted";
    /**
     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ThreadMemberFlags[ThreadMemberFlags["AllMessages"] = 2] = "AllMessages";
    /**
     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ThreadMemberFlags[ThreadMemberFlags["OnlyMentions"] = 4] = "OnlyMentions";
    /**
     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ThreadMemberFlags[ThreadMemberFlags["NoMessages"] = 8] = "NoMessages";
})(ThreadMemberFlags$3 || (channel$5.ThreadMemberFlags = ThreadMemberFlags$3 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-types
 *
 * @deprecated *Embed types should be considered deprecated and might be removed in a future API version*
 */
var EmbedType$3;
(function (EmbedType) {
    /**
     * Generic embed rendered from embed attributes
     */
    EmbedType["Rich"] = "rich";
    /**
     * Image embed
     */
    EmbedType["Image"] = "image";
    /**
     * Video embed
     */
    EmbedType["Video"] = "video";
    /**
     * Animated gif image embed rendered as a video embed
     */
    EmbedType["GIFV"] = "gifv";
    /**
     * Article embed
     */
    EmbedType["Article"] = "article";
    /**
     * Link embed
     */
    EmbedType["Link"] = "link";
    /**
     * Auto moderation alert embed
     *
     * @unstable This embed type is currently not documented by Discord, but it is returned in the auto moderation system messages.
     */
    EmbedType["AutoModerationMessage"] = "auto_moderation_message";
    /**
     * Poll result embed
     */
    EmbedType["PollResult"] = "poll_result";
})(EmbedType$3 || (channel$5.EmbedType = EmbedType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure-attachment-flags
 */
var AttachmentFlags$3;
(function (AttachmentFlags) {
    /**
     * This attachment has been edited using the remix feature on mobile
     */
    AttachmentFlags[AttachmentFlags["IsRemix"] = 4] = "IsRemix";
})(AttachmentFlags$3 || (channel$5.AttachmentFlags = AttachmentFlags$3 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types
 */
var AllowedMentionsTypes$3;
(function (AllowedMentionsTypes) {
    /**
     * Controls @everyone and @here mentions
     */
    AllowedMentionsTypes["Everyone"] = "everyone";
    /**
     * Controls role mentions
     */
    AllowedMentionsTypes["Role"] = "roles";
    /**
     * Controls user mentions
     */
    AllowedMentionsTypes["User"] = "users";
})(AllowedMentionsTypes$3 || (channel$5.AllowedMentionsTypes = AllowedMentionsTypes$3 = {}));
/**
 * https://discord.com/developers/docs/interactions/message-components#component-object-component-types
 */
var ComponentType$3;
(function (ComponentType) {
    /**
     * Action Row component
     */
    ComponentType[ComponentType["ActionRow"] = 1] = "ActionRow";
    /**
     * Button component
     */
    ComponentType[ComponentType["Button"] = 2] = "Button";
    /**
     * Select menu for picking from defined text options
     */
    ComponentType[ComponentType["StringSelect"] = 3] = "StringSelect";
    /**
     * Text Input component
     */
    ComponentType[ComponentType["TextInput"] = 4] = "TextInput";
    /**
     * Select menu for users
     */
    ComponentType[ComponentType["UserSelect"] = 5] = "UserSelect";
    /**
     * Select menu for roles
     */
    ComponentType[ComponentType["RoleSelect"] = 6] = "RoleSelect";
    /**
     * Select menu for users and roles
     */
    ComponentType[ComponentType["MentionableSelect"] = 7] = "MentionableSelect";
    /**
     * Select menu for channels
     */
    ComponentType[ComponentType["ChannelSelect"] = 8] = "ChannelSelect";
    // EVERYTHING BELOW THIS LINE SHOULD BE OLD NAMES FOR RENAMED ENUM MEMBERS //
    /**
     * Select menu for picking from defined text options
     *
     * @deprecated This is the old name for {@apilink ComponentType#StringSelect}
     */
    ComponentType[ComponentType["SelectMenu"] = 3] = "SelectMenu";
})(ComponentType$3 || (channel$5.ComponentType = ComponentType$3 = {}));
/**
 * https://discord.com/developers/docs/interactions/message-components#button-object-button-styles
 */
var ButtonStyle$3;
(function (ButtonStyle) {
    ButtonStyle[ButtonStyle["Primary"] = 1] = "Primary";
    ButtonStyle[ButtonStyle["Secondary"] = 2] = "Secondary";
    ButtonStyle[ButtonStyle["Success"] = 3] = "Success";
    ButtonStyle[ButtonStyle["Danger"] = 4] = "Danger";
    ButtonStyle[ButtonStyle["Link"] = 5] = "Link";
    ButtonStyle[ButtonStyle["Premium"] = 6] = "Premium";
})(ButtonStyle$3 || (channel$5.ButtonStyle = ButtonStyle$3 = {}));
/**
 * https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-styles
 */
var TextInputStyle$3;
(function (TextInputStyle) {
    TextInputStyle[TextInputStyle["Short"] = 1] = "Short";
    TextInputStyle[TextInputStyle["Paragraph"] = 2] = "Paragraph";
})(TextInputStyle$3 || (channel$5.TextInputStyle = TextInputStyle$3 = {}));
/**
 * https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-default-value-structure
 */
var SelectMenuDefaultValueType$3;
(function (SelectMenuDefaultValueType) {
    SelectMenuDefaultValueType["Channel"] = "channel";
    SelectMenuDefaultValueType["Role"] = "role";
    SelectMenuDefaultValueType["User"] = "user";
})(SelectMenuDefaultValueType$3 || (channel$5.SelectMenuDefaultValueType = SelectMenuDefaultValueType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#channel-object-channel-flags
 */
var ChannelFlags$3;
(function (ChannelFlags) {
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["GuildFeedRemoved"] = 1] = "GuildFeedRemoved";
    /**
     * This thread is pinned to the top of its parent forum channel
     */
    ChannelFlags[ChannelFlags["Pinned"] = 2] = "Pinned";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["ActiveChannelsRemoved"] = 4] = "ActiveChannelsRemoved";
    /**
     * Whether a tag is required to be specified when creating a thread in a forum channel.
     * Tags are specified in the `applied_tags` field
     */
    ChannelFlags[ChannelFlags["RequireTag"] = 16] = "RequireTag";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["IsSpam"] = 32] = "IsSpam";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["IsGuildResourceChannel"] = 128] = "IsGuildResourceChannel";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["ClydeAI"] = 256] = "ClydeAI";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["IsScheduledForDeletion"] = 512] = "IsScheduledForDeletion";
    /**
     * Whether media download options are hidden.
     */
    ChannelFlags[ChannelFlags["HideMediaDownloadOptions"] = 32768] = "HideMediaDownloadOptions";
})(ChannelFlags$3 || (channel$5.ChannelFlags = ChannelFlags$3 = {}));

var emoji$3 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/emoji
 */
Object.defineProperty(emoji$3, "__esModule", { value: true });

var gateway$3 = {};

/**
 * Types extracted from
 *  - https://discord.com/developers/docs/topics/gateway
 *  - https://discord.com/developers/docs/topics/gateway-events
 */
Object.defineProperty(gateway$3, "__esModule", { value: true });
gateway$3.ActivityFlags = gateway$3.ActivityType = gateway$3.ActivityPlatform = gateway$3.PresenceUpdateStatus = void 0;
/**
 * https://discord.com/developers/docs/topics/gateway-events#update-presence-status-types
 */
var PresenceUpdateStatus$3;
(function (PresenceUpdateStatus) {
    PresenceUpdateStatus["Online"] = "online";
    PresenceUpdateStatus["DoNotDisturb"] = "dnd";
    PresenceUpdateStatus["Idle"] = "idle";
    /**
     * Invisible and shown as offline
     */
    PresenceUpdateStatus["Invisible"] = "invisible";
    PresenceUpdateStatus["Offline"] = "offline";
})(PresenceUpdateStatus$3 || (gateway$3.PresenceUpdateStatus = PresenceUpdateStatus$3 = {}));
/**
 * @unstable This enum is currently not documented by Discord but has known values which we will try to keep up to date.
 * Values might be added or removed without a major version bump.
 */
var ActivityPlatform$3;
(function (ActivityPlatform) {
    ActivityPlatform["Desktop"] = "desktop";
    ActivityPlatform["Xbox"] = "xbox";
    ActivityPlatform["Samsung"] = "samsung";
    ActivityPlatform["IOS"] = "ios";
    ActivityPlatform["Android"] = "android";
    ActivityPlatform["Embedded"] = "embedded";
    ActivityPlatform["PS4"] = "ps4";
    ActivityPlatform["PS5"] = "ps5";
})(ActivityPlatform$3 || (gateway$3.ActivityPlatform = ActivityPlatform$3 = {}));
/**
 * https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types
 */
var ActivityType$3;
(function (ActivityType) {
    /**
     * Playing {game}
     */
    ActivityType[ActivityType["Playing"] = 0] = "Playing";
    /**
     * Streaming {details}
     */
    ActivityType[ActivityType["Streaming"] = 1] = "Streaming";
    /**
     * Listening to {name}
     */
    ActivityType[ActivityType["Listening"] = 2] = "Listening";
    /**
     * Watching {details}
     */
    ActivityType[ActivityType["Watching"] = 3] = "Watching";
    /**
     * {emoji} {state}
     */
    ActivityType[ActivityType["Custom"] = 4] = "Custom";
    /**
     * Competing in {name}
     */
    ActivityType[ActivityType["Competing"] = 5] = "Competing";
})(ActivityType$3 || (gateway$3.ActivityType = ActivityType$3 = {}));
/**
 * https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-flags
 */
var ActivityFlags$3;
(function (ActivityFlags) {
    ActivityFlags[ActivityFlags["Instance"] = 1] = "Instance";
    ActivityFlags[ActivityFlags["Join"] = 2] = "Join";
    ActivityFlags[ActivityFlags["Spectate"] = 4] = "Spectate";
    ActivityFlags[ActivityFlags["JoinRequest"] = 8] = "JoinRequest";
    ActivityFlags[ActivityFlags["Sync"] = 16] = "Sync";
    ActivityFlags[ActivityFlags["Play"] = 32] = "Play";
    ActivityFlags[ActivityFlags["PartyPrivacyFriends"] = 64] = "PartyPrivacyFriends";
    ActivityFlags[ActivityFlags["PartyPrivacyVoiceChannel"] = 128] = "PartyPrivacyVoiceChannel";
    ActivityFlags[ActivityFlags["Embedded"] = 256] = "Embedded";
})(ActivityFlags$3 || (gateway$3.ActivityFlags = ActivityFlags$3 = {}));

var guild$3 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/guild
 */
Object.defineProperty(guild$3, "__esModule", { value: true });
guild$3.GuildOnboardingPromptType = guild$3.GuildOnboardingMode = guild$3.MembershipScreeningFieldType = guild$3.GuildWidgetStyle = guild$3.IntegrationExpireBehavior = guild$3.GuildMemberFlags = guild$3.GuildFeature = guild$3.GuildSystemChannelFlags = guild$3.GuildHubType = guild$3.GuildPremiumTier = guild$3.GuildVerificationLevel = guild$3.GuildNSFWLevel = guild$3.GuildMFALevel = guild$3.GuildExplicitContentFilter = guild$3.GuildDefaultMessageNotifications = void 0;
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
 */
var GuildDefaultMessageNotifications$3;
(function (GuildDefaultMessageNotifications) {
    GuildDefaultMessageNotifications[GuildDefaultMessageNotifications["AllMessages"] = 0] = "AllMessages";
    GuildDefaultMessageNotifications[GuildDefaultMessageNotifications["OnlyMentions"] = 1] = "OnlyMentions";
})(GuildDefaultMessageNotifications$3 || (guild$3.GuildDefaultMessageNotifications = GuildDefaultMessageNotifications$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
 */
var GuildExplicitContentFilter$3;
(function (GuildExplicitContentFilter) {
    GuildExplicitContentFilter[GuildExplicitContentFilter["Disabled"] = 0] = "Disabled";
    GuildExplicitContentFilter[GuildExplicitContentFilter["MembersWithoutRoles"] = 1] = "MembersWithoutRoles";
    GuildExplicitContentFilter[GuildExplicitContentFilter["AllMembers"] = 2] = "AllMembers";
})(GuildExplicitContentFilter$3 || (guild$3.GuildExplicitContentFilter = GuildExplicitContentFilter$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
 */
var GuildMFALevel$3;
(function (GuildMFALevel) {
    GuildMFALevel[GuildMFALevel["None"] = 0] = "None";
    GuildMFALevel[GuildMFALevel["Elevated"] = 1] = "Elevated";
})(GuildMFALevel$3 || (guild$3.GuildMFALevel = GuildMFALevel$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level
 */
var GuildNSFWLevel$3;
(function (GuildNSFWLevel) {
    GuildNSFWLevel[GuildNSFWLevel["Default"] = 0] = "Default";
    GuildNSFWLevel[GuildNSFWLevel["Explicit"] = 1] = "Explicit";
    GuildNSFWLevel[GuildNSFWLevel["Safe"] = 2] = "Safe";
    GuildNSFWLevel[GuildNSFWLevel["AgeRestricted"] = 3] = "AgeRestricted";
})(GuildNSFWLevel$3 || (guild$3.GuildNSFWLevel = GuildNSFWLevel$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-verification-level
 */
var GuildVerificationLevel$3;
(function (GuildVerificationLevel) {
    /**
     * Unrestricted
     */
    GuildVerificationLevel[GuildVerificationLevel["None"] = 0] = "None";
    /**
     * Must have verified email on account
     */
    GuildVerificationLevel[GuildVerificationLevel["Low"] = 1] = "Low";
    /**
     * Must be registered on Discord for longer than 5 minutes
     */
    GuildVerificationLevel[GuildVerificationLevel["Medium"] = 2] = "Medium";
    /**
     * Must be a member of the guild for longer than 10 minutes
     */
    GuildVerificationLevel[GuildVerificationLevel["High"] = 3] = "High";
    /**
     * Must have a verified phone number
     */
    GuildVerificationLevel[GuildVerificationLevel["VeryHigh"] = 4] = "VeryHigh";
})(GuildVerificationLevel$3 || (guild$3.GuildVerificationLevel = GuildVerificationLevel$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-premium-tier
 */
var GuildPremiumTier$3;
(function (GuildPremiumTier) {
    GuildPremiumTier[GuildPremiumTier["None"] = 0] = "None";
    GuildPremiumTier[GuildPremiumTier["Tier1"] = 1] = "Tier1";
    GuildPremiumTier[GuildPremiumTier["Tier2"] = 2] = "Tier2";
    GuildPremiumTier[GuildPremiumTier["Tier3"] = 3] = "Tier3";
})(GuildPremiumTier$3 || (guild$3.GuildPremiumTier = GuildPremiumTier$3 = {}));
var GuildHubType$3;
(function (GuildHubType) {
    GuildHubType[GuildHubType["Default"] = 0] = "Default";
    GuildHubType[GuildHubType["HighSchool"] = 1] = "HighSchool";
    GuildHubType[GuildHubType["College"] = 2] = "College";
})(GuildHubType$3 || (guild$3.GuildHubType = GuildHubType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags
 */
var GuildSystemChannelFlags$3;
(function (GuildSystemChannelFlags) {
    /**
     * Suppress member join notifications
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressJoinNotifications"] = 1] = "SuppressJoinNotifications";
    /**
     * Suppress server boost notifications
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressPremiumSubscriptions"] = 2] = "SuppressPremiumSubscriptions";
    /**
     * Suppress server setup tips
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressGuildReminderNotifications"] = 4] = "SuppressGuildReminderNotifications";
    /**
     * Hide member join sticker reply buttons
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressJoinNotificationReplies"] = 8] = "SuppressJoinNotificationReplies";
    /**
     * Suppress role subscription purchase and renewal notifications
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressRoleSubscriptionPurchaseNotifications"] = 16] = "SuppressRoleSubscriptionPurchaseNotifications";
    /**
     * Hide role subscription sticker reply buttons
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressRoleSubscriptionPurchaseNotificationReplies"] = 32] = "SuppressRoleSubscriptionPurchaseNotificationReplies";
})(GuildSystemChannelFlags$3 || (guild$3.GuildSystemChannelFlags = GuildSystemChannelFlags$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-guild-features
 */
var GuildFeature$3;
(function (GuildFeature) {
    /**
     * Guild has access to set an animated guild banner image
     */
    GuildFeature["AnimatedBanner"] = "ANIMATED_BANNER";
    /**
     * Guild has access to set an animated guild icon
     */
    GuildFeature["AnimatedIcon"] = "ANIMATED_ICON";
    /**
     * Guild is using the old permissions configuration behavior
     *
     * See https://discord.com/developers/docs/change-log#upcoming-application-command-permission-changes
     */
    GuildFeature["ApplicationCommandPermissionsV2"] = "APPLICATION_COMMAND_PERMISSIONS_V2";
    /**
     * Guild has set up auto moderation rules
     */
    GuildFeature["AutoModeration"] = "AUTO_MODERATION";
    /**
     * Guild has access to set a guild banner image
     */
    GuildFeature["Banner"] = "BANNER";
    /**
     * Guild can enable welcome screen, Membership Screening and discovery, and receives community updates
     */
    GuildFeature["Community"] = "COMMUNITY";
    /**
     * Guild has enabled monetization
     */
    GuildFeature["CreatorMonetizableProvisional"] = "CREATOR_MONETIZABLE_PROVISIONAL";
    /**
     * Guild has enabled the role subscription promo page
     */
    GuildFeature["CreatorStorePage"] = "CREATOR_STORE_PAGE";
    /**
     * Guild has been set as a support server on the App Directory
     */
    GuildFeature["DeveloperSupportServer"] = "DEVELOPER_SUPPORT_SERVER";
    /**
     * Guild is able to be discovered in the directory
     */
    GuildFeature["Discoverable"] = "DISCOVERABLE";
    /**
     * Guild is able to be featured in the directory
     */
    GuildFeature["Featurable"] = "FEATURABLE";
    /**
     * Guild is listed in a directory channel
     */
    GuildFeature["HasDirectoryEntry"] = "HAS_DIRECTORY_ENTRY";
    /**
     * Guild is a Student Hub
     *
     * See https://support.discord.com/hc/articles/4406046651927
     *
     * @unstable This feature is currently not documented by Discord, but has known value
     */
    GuildFeature["Hub"] = "HUB";
    /**
     * Guild has disabled invite usage, preventing users from joining
     */
    GuildFeature["InvitesDisabled"] = "INVITES_DISABLED";
    /**
     * Guild has access to set an invite splash background
     */
    GuildFeature["InviteSplash"] = "INVITE_SPLASH";
    /**
     * Guild is in a Student Hub
     *
     * See https://support.discord.com/hc/articles/4406046651927
     *
     * @unstable This feature is currently not documented by Discord, but has known value
     */
    GuildFeature["LinkedToHub"] = "LINKED_TO_HUB";
    /**
     * Guild has enabled Membership Screening
     */
    GuildFeature["MemberVerificationGateEnabled"] = "MEMBER_VERIFICATION_GATE_ENABLED";
    /**
     * Guild has enabled monetization
     *
     * @unstable This feature is no longer documented by Discord
     */
    GuildFeature["MonetizationEnabled"] = "MONETIZATION_ENABLED";
    /**
     * Guild has increased custom sticker slots
     */
    GuildFeature["MoreStickers"] = "MORE_STICKERS";
    /**
     * Guild has access to create news channels
     */
    GuildFeature["News"] = "NEWS";
    /**
     * Guild is partnered
     */
    GuildFeature["Partnered"] = "PARTNERED";
    /**
     * Guild can be previewed before joining via Membership Screening or the directory
     */
    GuildFeature["PreviewEnabled"] = "PREVIEW_ENABLED";
    /**
     * Guild has access to create private threads
     */
    GuildFeature["PrivateThreads"] = "PRIVATE_THREADS";
    /**
     * Guild has disabled alerts for join raids in the configured safety alerts channel
     */
    GuildFeature["RaidAlertsDisabled"] = "RAID_ALERTS_DISABLED";
    GuildFeature["RelayEnabled"] = "RELAY_ENABLED";
    /**
     * Guild is able to set role icons
     */
    GuildFeature["RoleIcons"] = "ROLE_ICONS";
    /**
     * Guild has role subscriptions that can be purchased
     */
    GuildFeature["RoleSubscriptionsAvailableForPurchase"] = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE";
    /**
     * Guild has enabled role subscriptions
     */
    GuildFeature["RoleSubscriptionsEnabled"] = "ROLE_SUBSCRIPTIONS_ENABLED";
    /**
     * Guild has enabled ticketed events
     */
    GuildFeature["TicketedEventsEnabled"] = "TICKETED_EVENTS_ENABLED";
    /**
     * Guild has access to set a vanity URL
     */
    GuildFeature["VanityURL"] = "VANITY_URL";
    /**
     * Guild is verified
     */
    GuildFeature["Verified"] = "VERIFIED";
    /**
     * Guild has access to set 384kbps bitrate in voice (previously VIP voice servers)
     */
    GuildFeature["VIPRegions"] = "VIP_REGIONS";
    /**
     * Guild has enabled the welcome screen
     */
    GuildFeature["WelcomeScreenEnabled"] = "WELCOME_SCREEN_ENABLED";
    /**
     * Guild has created soundboard sounds
     */
    GuildFeature["Soundboard"] = "SOUNDBOARD";
})(GuildFeature$3 || (guild$3.GuildFeature = GuildFeature$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags
 */
var GuildMemberFlags$3;
(function (GuildMemberFlags) {
    /**
     * Member has left and rejoined the guild
     */
    GuildMemberFlags[GuildMemberFlags["DidRejoin"] = 1] = "DidRejoin";
    /**
     * Member has completed onboarding
     */
    GuildMemberFlags[GuildMemberFlags["CompletedOnboarding"] = 2] = "CompletedOnboarding";
    /**
     * Member is exempt from guild verification requirements
     */
    GuildMemberFlags[GuildMemberFlags["BypassesVerification"] = 4] = "BypassesVerification";
    /**
     * Member has started onboarding
     */
    GuildMemberFlags[GuildMemberFlags["StartedOnboarding"] = 8] = "StartedOnboarding";
    /**
     * Member is a guest and can only access the voice channel they were invited to
     */
    GuildMemberFlags[GuildMemberFlags["IsGuest"] = 16] = "IsGuest";
    /**
     * Member has started Server Guide new member actions
     */
    GuildMemberFlags[GuildMemberFlags["StartedHomeActions"] = 32] = "StartedHomeActions";
    /**
     * Member has completed Server Guide new member actions
     */
    GuildMemberFlags[GuildMemberFlags["CompletedHomeActions"] = 64] = "CompletedHomeActions";
    /**
     * Member's username, display name, or nickname is blocked by AutoMod
     */
    GuildMemberFlags[GuildMemberFlags["AutomodQuarantinedUsernameOrGuildNickname"] = 128] = "AutomodQuarantinedUsernameOrGuildNickname";
    /**
     * @deprecated
     */
    GuildMemberFlags[GuildMemberFlags["AutomodQuarantinedBio"] = 256] = "AutomodQuarantinedBio";
    /**
     * Member has dismissed the DM settings upsell
     */
    GuildMemberFlags[GuildMemberFlags["DmSettingsUpsellAcknowledged"] = 512] = "DmSettingsUpsellAcknowledged";
})(GuildMemberFlags$3 || (guild$3.GuildMemberFlags = GuildMemberFlags$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors
 */
var IntegrationExpireBehavior$3;
(function (IntegrationExpireBehavior) {
    IntegrationExpireBehavior[IntegrationExpireBehavior["RemoveRole"] = 0] = "RemoveRole";
    IntegrationExpireBehavior[IntegrationExpireBehavior["Kick"] = 1] = "Kick";
})(IntegrationExpireBehavior$3 || (guild$3.IntegrationExpireBehavior = IntegrationExpireBehavior$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options
 */
var GuildWidgetStyle$3;
(function (GuildWidgetStyle) {
    /**
     * Shield style widget with Discord icon and guild members online count
     */
    GuildWidgetStyle["Shield"] = "shield";
    /**
     * Large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget
     */
    GuildWidgetStyle["Banner1"] = "banner1";
    /**
     * Smaller widget style with guild icon, name and online count. Split on the right with Discord logo
     */
    GuildWidgetStyle["Banner2"] = "banner2";
    /**
     * Large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right
     */
    GuildWidgetStyle["Banner3"] = "banner3";
    /**
     * Large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget
     * and a "JOIN MY SERVER" button at the bottom
     */
    GuildWidgetStyle["Banner4"] = "banner4";
})(GuildWidgetStyle$3 || (guild$3.GuildWidgetStyle = GuildWidgetStyle$3 = {}));
var MembershipScreeningFieldType$3;
(function (MembershipScreeningFieldType) {
    /**
     * Server Rules
     */
    MembershipScreeningFieldType["Terms"] = "TERMS";
})(MembershipScreeningFieldType$3 || (guild$3.MembershipScreeningFieldType = MembershipScreeningFieldType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-mode
 */
var GuildOnboardingMode$3;
(function (GuildOnboardingMode) {
    /**
     * Counts only Default Channels towards constraints
     */
    GuildOnboardingMode[GuildOnboardingMode["OnboardingDefault"] = 0] = "OnboardingDefault";
    /**
     * Counts Default Channels and Questions towards constraints
     */
    GuildOnboardingMode[GuildOnboardingMode["OnboardingAdvanced"] = 1] = "OnboardingAdvanced";
})(GuildOnboardingMode$3 || (guild$3.GuildOnboardingMode = GuildOnboardingMode$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-types
 */
var GuildOnboardingPromptType$3;
(function (GuildOnboardingPromptType) {
    GuildOnboardingPromptType[GuildOnboardingPromptType["MultipleChoice"] = 0] = "MultipleChoice";
    GuildOnboardingPromptType[GuildOnboardingPromptType["Dropdown"] = 1] = "Dropdown";
})(GuildOnboardingPromptType$3 || (guild$3.GuildOnboardingPromptType = GuildOnboardingPromptType$3 = {}));

var guildScheduledEvent$3 = {};

Object.defineProperty(guildScheduledEvent$3, "__esModule", { value: true });
guildScheduledEvent$3.GuildScheduledEventPrivacyLevel = guildScheduledEvent$3.GuildScheduledEventStatus = guildScheduledEvent$3.GuildScheduledEventEntityType = guildScheduledEvent$3.GuildScheduledEventRecurrenceRuleMonth = guildScheduledEvent$3.GuildScheduledEventRecurrenceRuleWeekday = guildScheduledEvent$3.GuildScheduledEventRecurrenceRuleFrequency = void 0;
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-frequency
 */
var GuildScheduledEventRecurrenceRuleFrequency$3;
(function (GuildScheduledEventRecurrenceRuleFrequency) {
    GuildScheduledEventRecurrenceRuleFrequency[GuildScheduledEventRecurrenceRuleFrequency["Yearly"] = 0] = "Yearly";
    GuildScheduledEventRecurrenceRuleFrequency[GuildScheduledEventRecurrenceRuleFrequency["Monthly"] = 1] = "Monthly";
    GuildScheduledEventRecurrenceRuleFrequency[GuildScheduledEventRecurrenceRuleFrequency["Weekly"] = 2] = "Weekly";
    GuildScheduledEventRecurrenceRuleFrequency[GuildScheduledEventRecurrenceRuleFrequency["Daily"] = 3] = "Daily";
})(GuildScheduledEventRecurrenceRuleFrequency$3 || (guildScheduledEvent$3.GuildScheduledEventRecurrenceRuleFrequency = GuildScheduledEventRecurrenceRuleFrequency$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-weekday
 */
var GuildScheduledEventRecurrenceRuleWeekday$3;
(function (GuildScheduledEventRecurrenceRuleWeekday) {
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Monday"] = 0] = "Monday";
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Tuesday"] = 1] = "Tuesday";
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Wednesday"] = 2] = "Wednesday";
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Thursday"] = 3] = "Thursday";
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Friday"] = 4] = "Friday";
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Saturday"] = 5] = "Saturday";
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Sunday"] = 6] = "Sunday";
})(GuildScheduledEventRecurrenceRuleWeekday$3 || (guildScheduledEvent$3.GuildScheduledEventRecurrenceRuleWeekday = GuildScheduledEventRecurrenceRuleWeekday$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-month
 */
var GuildScheduledEventRecurrenceRuleMonth$3;
(function (GuildScheduledEventRecurrenceRuleMonth) {
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["January"] = 1] = "January";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["February"] = 2] = "February";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["March"] = 3] = "March";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["April"] = 4] = "April";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["May"] = 5] = "May";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["June"] = 6] = "June";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["July"] = 7] = "July";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["August"] = 8] = "August";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["September"] = 9] = "September";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["October"] = 10] = "October";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["November"] = 11] = "November";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["December"] = 12] = "December";
})(GuildScheduledEventRecurrenceRuleMonth$3 || (guildScheduledEvent$3.GuildScheduledEventRecurrenceRuleMonth = GuildScheduledEventRecurrenceRuleMonth$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types
 */
var GuildScheduledEventEntityType$3;
(function (GuildScheduledEventEntityType) {
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["StageInstance"] = 1] = "StageInstance";
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["Voice"] = 2] = "Voice";
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["External"] = 3] = "External";
})(GuildScheduledEventEntityType$3 || (guildScheduledEvent$3.GuildScheduledEventEntityType = GuildScheduledEventEntityType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status
 */
var GuildScheduledEventStatus$3;
(function (GuildScheduledEventStatus) {
    GuildScheduledEventStatus[GuildScheduledEventStatus["Scheduled"] = 1] = "Scheduled";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Active"] = 2] = "Active";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Completed"] = 3] = "Completed";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Canceled"] = 4] = "Canceled";
})(GuildScheduledEventStatus$3 || (guildScheduledEvent$3.GuildScheduledEventStatus = GuildScheduledEventStatus$3 = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level
 */
var GuildScheduledEventPrivacyLevel$3;
(function (GuildScheduledEventPrivacyLevel) {
    /**
     * The scheduled event is only accessible to guild members
     */
    GuildScheduledEventPrivacyLevel[GuildScheduledEventPrivacyLevel["GuildOnly"] = 2] = "GuildOnly";
})(GuildScheduledEventPrivacyLevel$3 || (guildScheduledEvent$3.GuildScheduledEventPrivacyLevel = GuildScheduledEventPrivacyLevel$3 = {}));

var interactions$3 = {};

var applicationCommands$1 = {};

var chatInput$1 = {};

var attachment$1 = {};

Object.defineProperty(attachment$1, "__esModule", { value: true });

var base$3 = {};

Object.defineProperty(base$3, "__esModule", { value: true });

var boolean$1 = {};

Object.defineProperty(boolean$1, "__esModule", { value: true });

var channel$4 = {};

Object.defineProperty(channel$4, "__esModule", { value: true });

var integer$1 = {};

Object.defineProperty(integer$1, "__esModule", { value: true });

var mentionable$1 = {};

Object.defineProperty(mentionable$1, "__esModule", { value: true });

var number$1 = {};

Object.defineProperty(number$1, "__esModule", { value: true });

var role$1 = {};

Object.defineProperty(role$1, "__esModule", { value: true });

var shared$1 = {};

Object.defineProperty(shared$1, "__esModule", { value: true });
shared$1.ApplicationCommandOptionType = void 0;
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
 */
var ApplicationCommandOptionType$3;
(function (ApplicationCommandOptionType) {
    ApplicationCommandOptionType[ApplicationCommandOptionType["Subcommand"] = 1] = "Subcommand";
    ApplicationCommandOptionType[ApplicationCommandOptionType["SubcommandGroup"] = 2] = "SubcommandGroup";
    ApplicationCommandOptionType[ApplicationCommandOptionType["String"] = 3] = "String";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Integer"] = 4] = "Integer";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Boolean"] = 5] = "Boolean";
    ApplicationCommandOptionType[ApplicationCommandOptionType["User"] = 6] = "User";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Channel"] = 7] = "Channel";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Role"] = 8] = "Role";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Mentionable"] = 9] = "Mentionable";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Number"] = 10] = "Number";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Attachment"] = 11] = "Attachment";
})(ApplicationCommandOptionType$3 || (shared$1.ApplicationCommandOptionType = ApplicationCommandOptionType$3 = {}));

var string$1 = {};

Object.defineProperty(string$1, "__esModule", { value: true });

var subcommand$1 = {};

Object.defineProperty(subcommand$1, "__esModule", { value: true });

var subcommandGroup$1 = {};

Object.defineProperty(subcommandGroup$1, "__esModule", { value: true });

var user$5 = {};

Object.defineProperty(user$5, "__esModule", { value: true });

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(attachment$1, exports);
	__exportStar(base$3, exports);
	__exportStar(boolean$1, exports);
	__exportStar(channel$4, exports);
	__exportStar(integer$1, exports);
	__exportStar(mentionable$1, exports);
	__exportStar(number$1, exports);
	__exportStar(role$1, exports);
	__exportStar(shared$1, exports);
	__exportStar(string$1, exports);
	__exportStar(subcommand$1, exports);
	__exportStar(subcommandGroup$1, exports);
	__exportStar(user$5, exports);
	
} (chatInput$1));

var contextMenu$1 = {};

Object.defineProperty(contextMenu$1, "__esModule", { value: true });

var permissions$3 = {};

Object.defineProperty(permissions$3, "__esModule", { value: true });
permissions$3.APIApplicationCommandPermissionsConstant = permissions$3.ApplicationCommandPermissionType = void 0;
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type
 */
var ApplicationCommandPermissionType$3;
(function (ApplicationCommandPermissionType) {
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["Role"] = 1] = "Role";
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["User"] = 2] = "User";
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["Channel"] = 3] = "Channel";
})(ApplicationCommandPermissionType$3 || (permissions$3.ApplicationCommandPermissionType = ApplicationCommandPermissionType$3 = {}));
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-constants
 */
permissions$3.APIApplicationCommandPermissionsConstant = {
    // eslint-disable-next-line unicorn/prefer-native-coercion-functions
    Everyone: (guildId) => String(guildId),
    AllChannels: (guildId) => String(BigInt(guildId) - 1n),
};

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EntryPointCommandHandlerType = exports.InteractionContextType = exports.ApplicationIntegrationType = exports.ApplicationCommandType = void 0;
	__exportStar(chatInput$1, exports);
	__exportStar(contextMenu$1, exports);
	__exportStar(permissions$3, exports);
	/**
	 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
	 */
	var ApplicationCommandType;
	(function (ApplicationCommandType) {
	    /**
	     * Slash commands; a text-based command that shows up when a user types `/`
	     */
	    ApplicationCommandType[ApplicationCommandType["ChatInput"] = 1] = "ChatInput";
	    /**
	     * A UI-based command that shows up when you right click or tap on a user
	     */
	    ApplicationCommandType[ApplicationCommandType["User"] = 2] = "User";
	    /**
	     * A UI-based command that shows up when you right click or tap on a message
	     */
	    ApplicationCommandType[ApplicationCommandType["Message"] = 3] = "Message";
	    /**
	     * A UI-based command that represents the primary way to invoke an app's Activity
	     */
	    ApplicationCommandType[ApplicationCommandType["PrimaryEntryPoint"] = 4] = "PrimaryEntryPoint";
	})(ApplicationCommandType || (exports.ApplicationCommandType = ApplicationCommandType = {}));
	/**
	 * https://discord.com/developers/docs/resources/application#application-object-application-integration-types
	 */
	var ApplicationIntegrationType;
	(function (ApplicationIntegrationType) {
	    /**
	     * App is installable to servers
	     */
	    ApplicationIntegrationType[ApplicationIntegrationType["GuildInstall"] = 0] = "GuildInstall";
	    /**
	     * App is installable to users
	     */
	    ApplicationIntegrationType[ApplicationIntegrationType["UserInstall"] = 1] = "UserInstall";
	})(ApplicationIntegrationType || (exports.ApplicationIntegrationType = ApplicationIntegrationType = {}));
	/**
	 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types
	 */
	var InteractionContextType;
	(function (InteractionContextType) {
	    /**
	     * Interaction can be used within servers
	     */
	    InteractionContextType[InteractionContextType["Guild"] = 0] = "Guild";
	    /**
	     * Interaction can be used within DMs with the app's bot user
	     */
	    InteractionContextType[InteractionContextType["BotDM"] = 1] = "BotDM";
	    /**
	     * Interaction can be used within Group DMs and DMs other than the app's bot user
	     */
	    InteractionContextType[InteractionContextType["PrivateChannel"] = 2] = "PrivateChannel";
	})(InteractionContextType || (exports.InteractionContextType = InteractionContextType = {}));
	/**
	 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-entry-point-command-handler-types
	 */
	var EntryPointCommandHandlerType;
	(function (EntryPointCommandHandlerType) {
	    /**
	     * The app handles the interaction using an interaction token
	     */
	    EntryPointCommandHandlerType[EntryPointCommandHandlerType["AppHandler"] = 1] = "AppHandler";
	    /**
	     * Discord handles the interaction by launching an Activity and sending a follow-up message without coordinating with
	     * the app
	     */
	    EntryPointCommandHandlerType[EntryPointCommandHandlerType["DiscordLaunchActivity"] = 2] = "DiscordLaunchActivity";
	})(EntryPointCommandHandlerType || (exports.EntryPointCommandHandlerType = EntryPointCommandHandlerType = {}));
	
} (applicationCommands$1));

var autocomplete$1 = {};

Object.defineProperty(autocomplete$1, "__esModule", { value: true });

var base$2 = {};

Object.defineProperty(base$2, "__esModule", { value: true });

var messageComponents$1 = {};

Object.defineProperty(messageComponents$1, "__esModule", { value: true });

var modalSubmit$1 = {};

Object.defineProperty(modalSubmit$1, "__esModule", { value: true });

var ping$1 = {};

Object.defineProperty(ping$1, "__esModule", { value: true });

var responses$1 = {};

Object.defineProperty(responses$1, "__esModule", { value: true });
responses$1.InteractionResponseType = responses$1.InteractionType = void 0;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type
 */
var InteractionType$3;
(function (InteractionType) {
    InteractionType[InteractionType["Ping"] = 1] = "Ping";
    InteractionType[InteractionType["ApplicationCommand"] = 2] = "ApplicationCommand";
    InteractionType[InteractionType["MessageComponent"] = 3] = "MessageComponent";
    InteractionType[InteractionType["ApplicationCommandAutocomplete"] = 4] = "ApplicationCommandAutocomplete";
    InteractionType[InteractionType["ModalSubmit"] = 5] = "ModalSubmit";
})(InteractionType$3 || (responses$1.InteractionType = InteractionType$3 = {}));
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
 */
var InteractionResponseType$3;
(function (InteractionResponseType) {
    /**
     * ACK a `Ping`
     */
    InteractionResponseType[InteractionResponseType["Pong"] = 1] = "Pong";
    /**
     * Respond to an interaction with a message
     */
    InteractionResponseType[InteractionResponseType["ChannelMessageWithSource"] = 4] = "ChannelMessageWithSource";
    /**
     * ACK an interaction and edit to a response later, the user sees a loading state
     */
    InteractionResponseType[InteractionResponseType["DeferredChannelMessageWithSource"] = 5] = "DeferredChannelMessageWithSource";
    /**
     * ACK a button interaction and update it to a loading state
     */
    InteractionResponseType[InteractionResponseType["DeferredMessageUpdate"] = 6] = "DeferredMessageUpdate";
    /**
     * ACK a button interaction and edit the message to which the button was attached
     */
    InteractionResponseType[InteractionResponseType["UpdateMessage"] = 7] = "UpdateMessage";
    /**
     * For autocomplete interactions
     */
    InteractionResponseType[InteractionResponseType["ApplicationCommandAutocompleteResult"] = 8] = "ApplicationCommandAutocompleteResult";
    /**
     * Respond to an interaction with an modal for a user to fill-out
     */
    InteractionResponseType[InteractionResponseType["Modal"] = 9] = "Modal";
    /**
     * Respond to an interaction with an upgrade button, only available for apps with monetization enabled
     *
     * @deprecated See https://discord.com/developers/docs/change-log#premium-apps-new-premium-button-style-deep-linking-url-schemes
     */
    InteractionResponseType[InteractionResponseType["PremiumRequired"] = 10] = "PremiumRequired";
    /**
     * Launch the Activity associated with the app.
     *
     * @remarks
     * Only available for apps with Activities enabled
     */
    InteractionResponseType[InteractionResponseType["LaunchActivity"] = 12] = "LaunchActivity";
})(InteractionResponseType$3 || (responses$1.InteractionResponseType = InteractionResponseType$3 = {}));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(applicationCommands$1, exports);
	__exportStar(autocomplete$1, exports);
	__exportStar(base$2, exports);
	__exportStar(messageComponents$1, exports);
	__exportStar(modalSubmit$1, exports);
	__exportStar(ping$1, exports);
	__exportStar(responses$1, exports);
	
} (interactions$3));

var invite$3 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/invite
 */
Object.defineProperty(invite$3, "__esModule", { value: true });
invite$3.InviteTargetType = invite$3.InviteType = void 0;
/**
 * https://discord.com/developers/docs/resources/invite#invite-object-invite-types
 */
var InviteType$3;
(function (InviteType) {
    InviteType[InviteType["Guild"] = 0] = "Guild";
    InviteType[InviteType["GroupDM"] = 1] = "GroupDM";
    InviteType[InviteType["Friend"] = 2] = "Friend";
})(InviteType$3 || (invite$3.InviteType = InviteType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types
 */
var InviteTargetType$3;
(function (InviteTargetType) {
    InviteTargetType[InviteTargetType["Stream"] = 1] = "Stream";
    InviteTargetType[InviteTargetType["EmbeddedApplication"] = 2] = "EmbeddedApplication";
})(InviteTargetType$3 || (invite$3.InviteTargetType = InviteTargetType$3 = {}));

var monetization$3 = {};

Object.defineProperty(monetization$3, "__esModule", { value: true });
monetization$3.SubscriptionStatus = monetization$3.SKUType = monetization$3.SKUFlags = monetization$3.EntitlementType = void 0;
/**
 * https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-types
 */
var EntitlementType$3;
(function (EntitlementType) {
    /**
     * Entitlement was purchased by user
     */
    EntitlementType[EntitlementType["Purchase"] = 1] = "Purchase";
    /**
     * Entitlement for Discord Nitro subscription
     */
    EntitlementType[EntitlementType["PremiumSubscription"] = 2] = "PremiumSubscription";
    /**
     * Entitlement was gifted by developer
     */
    EntitlementType[EntitlementType["DeveloperGift"] = 3] = "DeveloperGift";
    /**
     * Entitlement was purchased by a dev in application test mode
     */
    EntitlementType[EntitlementType["TestModePurchase"] = 4] = "TestModePurchase";
    /**
     * Entitlement was granted when the SKU was free
     */
    EntitlementType[EntitlementType["FreePurchase"] = 5] = "FreePurchase";
    /**
     * Entitlement was gifted by another user
     */
    EntitlementType[EntitlementType["UserGift"] = 6] = "UserGift";
    /**
     * Entitlement was claimed by user for free as a Nitro Subscriber
     */
    EntitlementType[EntitlementType["PremiumPurchase"] = 7] = "PremiumPurchase";
    /**
     * Entitlement was purchased as an app subscription
     */
    EntitlementType[EntitlementType["ApplicationSubscription"] = 8] = "ApplicationSubscription";
})(EntitlementType$3 || (monetization$3.EntitlementType = EntitlementType$3 = {}));
/**
 * https://discord.com/developers/docs/monetization/skus#sku-object-sku-flags
 */
var SKUFlags$3;
(function (SKUFlags) {
    /**
     * SKU is available for purchase
     */
    SKUFlags[SKUFlags["Available"] = 4] = "Available";
    /**
     * Recurring SKU that can be purchased by a user and applied to a single server.
     * Grants access to every user in that server.
     */
    SKUFlags[SKUFlags["GuildSubscription"] = 128] = "GuildSubscription";
    /**
     * Recurring SKU purchased by a user for themselves. Grants access to the purchasing user in every server.
     */
    SKUFlags[SKUFlags["UserSubscription"] = 256] = "UserSubscription";
})(SKUFlags$3 || (monetization$3.SKUFlags = SKUFlags$3 = {}));
/**
 * https://discord.com/developers/docs/resources/sku#sku-object-sku-types
 */
var SKUType$3;
(function (SKUType) {
    /**
     * Durable one-time purchase
     */
    SKUType[SKUType["Durable"] = 2] = "Durable";
    /**
     * Consumable one-time purchase
     */
    SKUType[SKUType["Consumable"] = 3] = "Consumable";
    /**
     * Represents a recurring subscription
     */
    SKUType[SKUType["Subscription"] = 5] = "Subscription";
    /**
     * System-generated group for each Subscription SKU created
     */
    SKUType[SKUType["SubscriptionGroup"] = 6] = "SubscriptionGroup";
})(SKUType$3 || (monetization$3.SKUType = SKUType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/subscription#subscription-statuses
 */
var SubscriptionStatus$1;
(function (SubscriptionStatus) {
    /**
     * Subscription is active and scheduled to renew.
     */
    SubscriptionStatus[SubscriptionStatus["Active"] = 0] = "Active";
    /**
     * Subscription is active but will not renew.
     */
    SubscriptionStatus[SubscriptionStatus["Ending"] = 1] = "Ending";
    /**
     * Subscription is inactive and not being charged.
     */
    SubscriptionStatus[SubscriptionStatus["Inactive"] = 2] = "Inactive";
})(SubscriptionStatus$1 || (monetization$3.SubscriptionStatus = SubscriptionStatus$1 = {}));

var oauth2$3 = {};

/**
 * Types extracted from https://discord.com/developers/docs/topics/oauth2
 */
Object.defineProperty(oauth2$3, "__esModule", { value: true });
oauth2$3.OAuth2Scopes = void 0;
var OAuth2Scopes$3;
(function (OAuth2Scopes) {
    /**
     * For oauth2 bots, this puts the bot in the user's selected guild by default
     */
    OAuth2Scopes["Bot"] = "bot";
    /**
     * Allows [/users/@me/connections](https://discord.com/developers/docs/resources/user#get-user-connections)
     * to return linked third-party accounts
     *
     * See https://discord.com/developers/docs/resources/user#get-user-connections
     */
    OAuth2Scopes["Connections"] = "connections";
    /**
     * Allows your app to see information about the user's DMs and group DMs - requires Discord approval
     */
    OAuth2Scopes["DMChannelsRead"] = "dm_channels.read";
    /**
     * Enables [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) to return an `email`
     *
     * See https://discord.com/developers/docs/resources/user#get-current-user
     */
    OAuth2Scopes["Email"] = "email";
    /**
     * Allows [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) without `email`
     *
     * See https://discord.com/developers/docs/resources/user#get-current-user
     */
    OAuth2Scopes["Identify"] = "identify";
    /**
     * Allows [/users/@me/guilds](https://discord.com/developers/docs/resources/user#get-current-user-guilds)
     * to return basic information about all of a user's guilds
     *
     * See https://discord.com/developers/docs/resources/user#get-current-user-guilds
     */
    OAuth2Scopes["Guilds"] = "guilds";
    /**
     * Allows [/guilds/{guild.id}/members/{user.id}](https://discord.com/developers/docs/resources/guild#add-guild-member)
     * to be used for joining users to a guild
     *
     * See https://discord.com/developers/docs/resources/guild#add-guild-member
     */
    OAuth2Scopes["GuildsJoin"] = "guilds.join";
    /**
     * Allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild
     *
     * See https://discord.com/developers/docs/resources/user#get-current-user-guild-member
     */
    OAuth2Scopes["GuildsMembersRead"] = "guilds.members.read";
    /**
     * Allows your app to join users to a group dm
     *
     * See https://discord.com/developers/docs/resources/channel#group-dm-add-recipient
     */
    OAuth2Scopes["GroupDMJoins"] = "gdm.join";
    /**
     * For local rpc server api access, this allows you to read messages from all client channels
     * (otherwise restricted to channels/guilds your app creates)
     */
    OAuth2Scopes["MessagesRead"] = "messages.read";
    /**
     * Allows your app to update a user's connection and metadata for the app
     */
    OAuth2Scopes["RoleConnectionsWrite"] = "role_connections.write";
    /**
     * For local rpc server access, this allows you to control a user's local Discord client - requires Discord approval
     */
    OAuth2Scopes["RPC"] = "rpc";
    /**
     * For local rpc server api access, this allows you to receive notifications pushed out to the user - requires Discord approval
     */
    OAuth2Scopes["RPCNotificationsRead"] = "rpc.notifications.read";
    /**
     * This generates a webhook that is returned in the oauth token response for authorization code grants
     */
    OAuth2Scopes["WebhookIncoming"] = "webhook.incoming";
    /**
     * Allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval
     */
    OAuth2Scopes["Voice"] = "voice";
    /**
     * Allows your app to upload/update builds for a user's applications - requires Discord approval
     */
    OAuth2Scopes["ApplicationsBuildsUpload"] = "applications.builds.upload";
    /**
     * Allows your app to read build data for a user's applications
     */
    OAuth2Scopes["ApplicationsBuildsRead"] = "applications.builds.read";
    /**
     * Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications
     */
    OAuth2Scopes["ApplicationsStoreUpdate"] = "applications.store.update";
    /**
     * Allows your app to read entitlements for a user's applications
     */
    OAuth2Scopes["ApplicationsEntitlements"] = "applications.entitlements";
    /**
     * Allows your app to know a user's friends and implicit relationships - requires Discord approval
     */
    OAuth2Scopes["RelationshipsRead"] = "relationships.read";
    /**
     * Allows your app to fetch data from a user's "Now Playing/Recently Played" list - requires Discord approval
     */
    OAuth2Scopes["ActivitiesRead"] = "activities.read";
    /**
     * Allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)
     *
     * See https://discord.com/developers/docs/game-sdk/activities
     */
    OAuth2Scopes["ActivitiesWrite"] = "activities.write";
    /**
     * Allows your app to use Application Commands in a guild
     *
     * See https://discord.com/developers/docs/interactions/application-commands
     */
    OAuth2Scopes["ApplicationsCommands"] = "applications.commands";
    /**
     * Allows your app to update its Application Commands via this bearer token - client credentials grant only
     *
     * See https://discord.com/developers/docs/interactions/application-commands
     */
    OAuth2Scopes["ApplicationsCommandsUpdate"] = "applications.commands.update";
    /**
     * Allows your app to update permissions for its commands using a Bearer token - client credentials grant only
     *
     * See https://discord.com/developers/docs/interactions/application-commands
     */
    OAuth2Scopes["ApplicationCommandsPermissionsUpdate"] = "applications.commands.permissions.update";
})(OAuth2Scopes$3 || (oauth2$3.OAuth2Scopes = OAuth2Scopes$3 = {}));

var permissions$2 = {};

/**
 * Types extracted from https://discord.com/developers/docs/topics/permissions
 */
Object.defineProperty(permissions$2, "__esModule", { value: true });
permissions$2.RoleFlags = void 0;
/**
 * https://discord.com/developers/docs/topics/permissions#role-object-role-flags
 */
var RoleFlags$3;
(function (RoleFlags) {
    /**
     * Role can be selected by members in an onboarding prompt
     */
    RoleFlags[RoleFlags["InPrompt"] = 1] = "InPrompt";
})(RoleFlags$3 || (permissions$2.RoleFlags = RoleFlags$3 = {}));

var poll$3 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/poll
 */
Object.defineProperty(poll$3, "__esModule", { value: true });
poll$3.PollLayoutType = void 0;
/**
 * https://discord.com/developers/docs/resources/poll#layout-type
 */
var PollLayoutType$3;
(function (PollLayoutType) {
    /**
     * The, uhm, default layout type
     */
    PollLayoutType[PollLayoutType["Default"] = 1] = "Default";
})(PollLayoutType$3 || (poll$3.PollLayoutType = PollLayoutType$3 = {}));

var soundboard$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/soundboard
 */
Object.defineProperty(soundboard$1, "__esModule", { value: true });

var stageInstance$3 = {};

Object.defineProperty(stageInstance$3, "__esModule", { value: true });
stageInstance$3.StageInstancePrivacyLevel = void 0;
/**
 * https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level
 */
var StageInstancePrivacyLevel$3;
(function (StageInstancePrivacyLevel) {
    /**
     * The stage instance is visible publicly, such as on stage discovery
     *
     * @deprecated
     */
    StageInstancePrivacyLevel[StageInstancePrivacyLevel["Public"] = 1] = "Public";
    /**
     * The stage instance is visible to only guild members
     */
    StageInstancePrivacyLevel[StageInstancePrivacyLevel["GuildOnly"] = 2] = "GuildOnly";
})(StageInstancePrivacyLevel$3 || (stageInstance$3.StageInstancePrivacyLevel = StageInstancePrivacyLevel$3 = {}));

var sticker$3 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/sticker
 */
Object.defineProperty(sticker$3, "__esModule", { value: true });
sticker$3.StickerFormatType = sticker$3.StickerType = void 0;
/**
 * https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types
 */
var StickerType$3;
(function (StickerType) {
    /**
     * An official sticker in a pack
     */
    StickerType[StickerType["Standard"] = 1] = "Standard";
    /**
     * A sticker uploaded to a guild for the guild's members
     */
    StickerType[StickerType["Guild"] = 2] = "Guild";
})(StickerType$3 || (sticker$3.StickerType = StickerType$3 = {}));
/**
 * https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types
 */
var StickerFormatType$3;
(function (StickerFormatType) {
    StickerFormatType[StickerFormatType["PNG"] = 1] = "PNG";
    StickerFormatType[StickerFormatType["APNG"] = 2] = "APNG";
    StickerFormatType[StickerFormatType["Lottie"] = 3] = "Lottie";
    StickerFormatType[StickerFormatType["GIF"] = 4] = "GIF";
})(StickerFormatType$3 || (sticker$3.StickerFormatType = StickerFormatType$3 = {}));

var teams$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/topics/teams
 */
Object.defineProperty(teams$1, "__esModule", { value: true });
teams$1.TeamMemberRole = teams$1.TeamMemberMembershipState = void 0;
/**
 * https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum
 */
var TeamMemberMembershipState$3;
(function (TeamMemberMembershipState) {
    TeamMemberMembershipState[TeamMemberMembershipState["Invited"] = 1] = "Invited";
    TeamMemberMembershipState[TeamMemberMembershipState["Accepted"] = 2] = "Accepted";
})(TeamMemberMembershipState$3 || (teams$1.TeamMemberMembershipState = TeamMemberMembershipState$3 = {}));
/**
 * https://discord.com/developers/docs/topics/teams#team-member-roles-team-member-role-types
 */
var TeamMemberRole$3;
(function (TeamMemberRole) {
    TeamMemberRole["Admin"] = "admin";
    TeamMemberRole["Developer"] = "developer";
    TeamMemberRole["ReadOnly"] = "read_only";
})(TeamMemberRole$3 || (teams$1.TeamMemberRole = TeamMemberRole$3 = {}));

var template$3 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/guild-template
 */
Object.defineProperty(template$3, "__esModule", { value: true });

var user$4 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/user
 */
Object.defineProperty(user$4, "__esModule", { value: true });
user$4.ConnectionVisibility = user$4.ConnectionService = user$4.UserPremiumType = user$4.UserFlags = void 0;
/**
 * https://discord.com/developers/docs/resources/user#user-object-user-flags
 */
var UserFlags$3;
(function (UserFlags) {
    /**
     * Discord Employee
     */
    UserFlags[UserFlags["Staff"] = 1] = "Staff";
    /**
     * Partnered Server Owner
     */
    UserFlags[UserFlags["Partner"] = 2] = "Partner";
    /**
     * HypeSquad Events Member
     */
    UserFlags[UserFlags["Hypesquad"] = 4] = "Hypesquad";
    /**
     * Bug Hunter Level 1
     */
    UserFlags[UserFlags["BugHunterLevel1"] = 8] = "BugHunterLevel1";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["MFASMS"] = 16] = "MFASMS";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["PremiumPromoDismissed"] = 32] = "PremiumPromoDismissed";
    /**
     * House Bravery Member
     */
    UserFlags[UserFlags["HypeSquadOnlineHouse1"] = 64] = "HypeSquadOnlineHouse1";
    /**
     * House Brilliance Member
     */
    UserFlags[UserFlags["HypeSquadOnlineHouse2"] = 128] = "HypeSquadOnlineHouse2";
    /**
     * House Balance Member
     */
    UserFlags[UserFlags["HypeSquadOnlineHouse3"] = 256] = "HypeSquadOnlineHouse3";
    /**
     * Early Nitro Supporter
     */
    UserFlags[UserFlags["PremiumEarlySupporter"] = 512] = "PremiumEarlySupporter";
    /**
     * User is a [team](https://discord.com/developers/docs/topics/teams)
     */
    UserFlags[UserFlags["TeamPseudoUser"] = 1024] = "TeamPseudoUser";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["HasUnreadUrgentMessages"] = 8192] = "HasUnreadUrgentMessages";
    /**
     * Bug Hunter Level 2
     */
    UserFlags[UserFlags["BugHunterLevel2"] = 16384] = "BugHunterLevel2";
    /**
     * Verified Bot
     */
    UserFlags[UserFlags["VerifiedBot"] = 65536] = "VerifiedBot";
    /**
     * Early Verified Bot Developer
     */
    UserFlags[UserFlags["VerifiedDeveloper"] = 131072] = "VerifiedDeveloper";
    /**
     * Moderator Programs Alumni
     */
    UserFlags[UserFlags["CertifiedModerator"] = 262144] = "CertifiedModerator";
    /**
     * Bot uses only [HTTP interactions](https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction) and is shown in the online member list
     */
    UserFlags[UserFlags["BotHTTPInteractions"] = 524288] = "BotHTTPInteractions";
    /**
     * User has been identified as spammer
     *
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["Spammer"] = 1048576] = "Spammer";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["DisablePremium"] = 2097152] = "DisablePremium";
    /**
     * User is an [Active Developer](https://support-dev.discord.com/hc/articles/10113997751447)
     */
    UserFlags[UserFlags["ActiveDeveloper"] = 4194304] = "ActiveDeveloper";
    /**
     * User's account has been [quarantined](https://support.discord.com/hc/articles/6461420677527) based on recent activity
     *
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     * @privateRemarks
     *
     * This value would be 1 << 44, but bit shifting above 1 << 30 requires bigints
     */
    UserFlags[UserFlags["Quarantined"] = 17592186044416] = "Quarantined";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     * @privateRemarks
     *
     * This value would be 1 << 50, but bit shifting above 1 << 30 requires bigints
     */
    UserFlags[UserFlags["Collaborator"] = 1125899906842624] = "Collaborator";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     * @privateRemarks
     *
     * This value would be 1 << 51, but bit shifting above 1 << 30 requires bigints
     */
    UserFlags[UserFlags["RestrictedCollaborator"] = 2251799813685248] = "RestrictedCollaborator";
})(UserFlags$3 || (user$4.UserFlags = UserFlags$3 = {}));
/**
 * https://discord.com/developers/docs/resources/user#user-object-premium-types
 */
var UserPremiumType$3;
(function (UserPremiumType) {
    UserPremiumType[UserPremiumType["None"] = 0] = "None";
    UserPremiumType[UserPremiumType["NitroClassic"] = 1] = "NitroClassic";
    UserPremiumType[UserPremiumType["Nitro"] = 2] = "Nitro";
    UserPremiumType[UserPremiumType["NitroBasic"] = 3] = "NitroBasic";
})(UserPremiumType$3 || (user$4.UserPremiumType = UserPremiumType$3 = {}));
var ConnectionService$3;
(function (ConnectionService) {
    ConnectionService["AmazonMusic"] = "amazon-music";
    ConnectionService["BattleNet"] = "battlenet";
    ConnectionService["BungieNet"] = "bungie";
    ConnectionService["Domain"] = "domain";
    ConnectionService["eBay"] = "ebay";
    ConnectionService["EpicGames"] = "epicgames";
    ConnectionService["Facebook"] = "facebook";
    ConnectionService["GitHub"] = "github";
    ConnectionService["Instagram"] = "instagram";
    ConnectionService["LeagueOfLegends"] = "leagueoflegends";
    ConnectionService["PayPal"] = "paypal";
    ConnectionService["PlayStationNetwork"] = "playstation";
    ConnectionService["Reddit"] = "reddit";
    ConnectionService["RiotGames"] = "riotgames";
    ConnectionService["Roblox"] = "roblox";
    ConnectionService["Spotify"] = "spotify";
    ConnectionService["Skype"] = "skype";
    ConnectionService["Steam"] = "steam";
    ConnectionService["TikTok"] = "tiktok";
    ConnectionService["Twitch"] = "twitch";
    ConnectionService["X"] = "twitter";
    /**
     * @deprecated This is the old name for {@apilink ConnectionService#X}
     */
    ConnectionService["Twitter"] = "twitter";
    ConnectionService["Xbox"] = "xbox";
    ConnectionService["YouTube"] = "youtube";
})(ConnectionService$3 || (user$4.ConnectionService = ConnectionService$3 = {}));
var ConnectionVisibility$3;
(function (ConnectionVisibility) {
    /**
     * Invisible to everyone except the user themselves
     */
    ConnectionVisibility[ConnectionVisibility["None"] = 0] = "None";
    /**
     * Visible to everyone
     */
    ConnectionVisibility[ConnectionVisibility["Everyone"] = 1] = "Everyone";
})(ConnectionVisibility$3 || (user$4.ConnectionVisibility = ConnectionVisibility$3 = {}));

var voice$3 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/voice
 */
Object.defineProperty(voice$3, "__esModule", { value: true });

var webhook$3 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/webhook
 */
Object.defineProperty(webhook$3, "__esModule", { value: true });
webhook$3.WebhookType = void 0;
var WebhookType$3;
(function (WebhookType) {
    /**
     * Incoming Webhooks can post messages to channels with a generated token
     */
    WebhookType[WebhookType["Incoming"] = 1] = "Incoming";
    /**
     * Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels
     */
    WebhookType[WebhookType["ChannelFollower"] = 2] = "ChannelFollower";
    /**
     * Application webhooks are webhooks used with Interactions
     */
    WebhookType[WebhookType["Application"] = 3] = "Application";
})(WebhookType$3 || (webhook$3.WebhookType = WebhookType$3 = {}));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(common$6, exports);
	__exportStar(application$3, exports);
	__exportStar(auditLog$3, exports);
	__exportStar(autoModeration$3, exports);
	__exportStar(channel$5, exports);
	__exportStar(emoji$3, exports);
	__exportStar(gateway$3, exports);
	__exportStar(guild$3, exports);
	__exportStar(guildScheduledEvent$3, exports);
	__exportStar(interactions$3, exports);
	__exportStar(invite$3, exports);
	__exportStar(monetization$3, exports);
	__exportStar(oauth2$3, exports);
	__exportStar(permissions$2, exports);
	__exportStar(poll$3, exports);
	__exportStar(soundboard$1, exports);
	__exportStar(stageInstance$3, exports);
	__exportStar(sticker$3, exports);
	__exportStar(teams$1, exports);
	__exportStar(template$3, exports);
	__exportStar(user$4, exports);
	__exportStar(voice$3, exports);
	__exportStar(webhook$3, exports);
	
} (v10$i));

var mod$7 = /*@__PURE__*/getDefaultExportFromCjs(v10$i);

const APIApplicationCommandPermissionsConstant$1 = mod$7.APIApplicationCommandPermissionsConstant;
const ActivityFlags$2 = mod$7.ActivityFlags;
const ActivityPlatform$2 = mod$7.ActivityPlatform;
const ActivityType$2 = mod$7.ActivityType;
const AllowedMentionsTypes$2 = mod$7.AllowedMentionsTypes;
const ApplicationCommandOptionType$2 = mod$7.ApplicationCommandOptionType;
const ApplicationCommandPermissionType$2 = mod$7.ApplicationCommandPermissionType;
const ApplicationCommandType$1 = mod$7.ApplicationCommandType;
const ApplicationFlags$2 = mod$7.ApplicationFlags;
const ApplicationIntegrationType$1 = mod$7.ApplicationIntegrationType;
const ApplicationRoleConnectionMetadataType$2 = mod$7.ApplicationRoleConnectionMetadataType;
const AttachmentFlags$2 = mod$7.AttachmentFlags;
const AuditLogEvent$2 = mod$7.AuditLogEvent;
const AuditLogOptionsType$2 = mod$7.AuditLogOptionsType;
const AutoModerationActionType$2 = mod$7.AutoModerationActionType;
const AutoModerationRuleEventType$2 = mod$7.AutoModerationRuleEventType;
const AutoModerationRuleKeywordPresetType$2 = mod$7.AutoModerationRuleKeywordPresetType;
const AutoModerationRuleTriggerType$2 = mod$7.AutoModerationRuleTriggerType;
const ButtonStyle$2 = mod$7.ButtonStyle;
const ChannelFlags$2 = mod$7.ChannelFlags;
const ChannelType$2 = mod$7.ChannelType;
const ComponentType$2 = mod$7.ComponentType;
const ConnectionService$2 = mod$7.ConnectionService;
const ConnectionVisibility$2 = mod$7.ConnectionVisibility;
const EmbedType$2 = mod$7.EmbedType;
const EntitlementType$2 = mod$7.EntitlementType;
const EntryPointCommandHandlerType = mod$7.EntryPointCommandHandlerType;
const ForumLayoutType$2 = mod$7.ForumLayoutType;
const GuildDefaultMessageNotifications$2 = mod$7.GuildDefaultMessageNotifications;
const GuildExplicitContentFilter$2 = mod$7.GuildExplicitContentFilter;
const GuildFeature$2 = mod$7.GuildFeature;
const GuildHubType$2 = mod$7.GuildHubType;
const GuildMFALevel$2 = mod$7.GuildMFALevel;
const GuildMemberFlags$2 = mod$7.GuildMemberFlags;
const GuildNSFWLevel$2 = mod$7.GuildNSFWLevel;
const GuildOnboardingMode$2 = mod$7.GuildOnboardingMode;
const GuildOnboardingPromptType$2 = mod$7.GuildOnboardingPromptType;
const GuildPremiumTier$2 = mod$7.GuildPremiumTier;
const GuildScheduledEventEntityType$2 = mod$7.GuildScheduledEventEntityType;
const GuildScheduledEventPrivacyLevel$2 = mod$7.GuildScheduledEventPrivacyLevel;
const GuildScheduledEventRecurrenceRuleFrequency$2 = mod$7.GuildScheduledEventRecurrenceRuleFrequency;
const GuildScheduledEventRecurrenceRuleMonth$2 = mod$7.GuildScheduledEventRecurrenceRuleMonth;
const GuildScheduledEventRecurrenceRuleWeekday$2 = mod$7.GuildScheduledEventRecurrenceRuleWeekday;
const GuildScheduledEventStatus$2 = mod$7.GuildScheduledEventStatus;
const GuildSystemChannelFlags$2 = mod$7.GuildSystemChannelFlags;
const GuildVerificationLevel$2 = mod$7.GuildVerificationLevel;
const GuildWidgetStyle$2 = mod$7.GuildWidgetStyle;
const IntegrationExpireBehavior$2 = mod$7.IntegrationExpireBehavior;
const InteractionContextType$1 = mod$7.InteractionContextType;
const InteractionResponseType$2 = mod$7.InteractionResponseType;
const InteractionType$2 = mod$7.InteractionType;
const InviteTargetType$2 = mod$7.InviteTargetType;
const InviteType$2 = mod$7.InviteType;
const MembershipScreeningFieldType$2 = mod$7.MembershipScreeningFieldType;
const MessageActivityType$2 = mod$7.MessageActivityType;
const MessageFlags$2 = mod$7.MessageFlags;
const MessageReferenceType$2 = mod$7.MessageReferenceType;
const MessageType$2 = mod$7.MessageType;
const OAuth2Scopes$2 = mod$7.OAuth2Scopes;
const OverwriteType$2 = mod$7.OverwriteType;
const PermissionFlagsBits$1 = mod$7.PermissionFlagsBits;
const PollLayoutType$2 = mod$7.PollLayoutType;
const PresenceUpdateStatus$2 = mod$7.PresenceUpdateStatus;
const RoleFlags$2 = mod$7.RoleFlags;
const SKUFlags$2 = mod$7.SKUFlags;
const SKUType$2 = mod$7.SKUType;
const SelectMenuDefaultValueType$2 = mod$7.SelectMenuDefaultValueType;
const SortOrderType$2 = mod$7.SortOrderType;
const StageInstancePrivacyLevel$2 = mod$7.StageInstancePrivacyLevel;
const StickerFormatType$2 = mod$7.StickerFormatType;
const StickerType$2 = mod$7.StickerType;
const SubscriptionStatus = mod$7.SubscriptionStatus;
const TeamMemberMembershipState$2 = mod$7.TeamMemberMembershipState;
const TeamMemberRole$2 = mod$7.TeamMemberRole;
const TextInputStyle$2 = mod$7.TextInputStyle;
const ThreadAutoArchiveDuration$2 = mod$7.ThreadAutoArchiveDuration;
const ThreadMemberFlags$2 = mod$7.ThreadMemberFlags;
const UserFlags$2 = mod$7.UserFlags;
const UserPremiumType$2 = mod$7.UserPremiumType;
const VideoQualityMode$2 = mod$7.VideoQualityMode;
const WebhookType$2 = mod$7.WebhookType;

var v10$h = /*#__PURE__*/Object.freeze({
	__proto__: null,
	APIApplicationCommandPermissionsConstant: APIApplicationCommandPermissionsConstant$1,
	ActivityFlags: ActivityFlags$2,
	ActivityPlatform: ActivityPlatform$2,
	ActivityType: ActivityType$2,
	AllowedMentionsTypes: AllowedMentionsTypes$2,
	ApplicationCommandOptionType: ApplicationCommandOptionType$2,
	ApplicationCommandPermissionType: ApplicationCommandPermissionType$2,
	ApplicationCommandType: ApplicationCommandType$1,
	ApplicationFlags: ApplicationFlags$2,
	ApplicationIntegrationType: ApplicationIntegrationType$1,
	ApplicationRoleConnectionMetadataType: ApplicationRoleConnectionMetadataType$2,
	AttachmentFlags: AttachmentFlags$2,
	AuditLogEvent: AuditLogEvent$2,
	AuditLogOptionsType: AuditLogOptionsType$2,
	AutoModerationActionType: AutoModerationActionType$2,
	AutoModerationRuleEventType: AutoModerationRuleEventType$2,
	AutoModerationRuleKeywordPresetType: AutoModerationRuleKeywordPresetType$2,
	AutoModerationRuleTriggerType: AutoModerationRuleTriggerType$2,
	ButtonStyle: ButtonStyle$2,
	ChannelFlags: ChannelFlags$2,
	ChannelType: ChannelType$2,
	ComponentType: ComponentType$2,
	ConnectionService: ConnectionService$2,
	ConnectionVisibility: ConnectionVisibility$2,
	EmbedType: EmbedType$2,
	EntitlementType: EntitlementType$2,
	EntryPointCommandHandlerType: EntryPointCommandHandlerType,
	ForumLayoutType: ForumLayoutType$2,
	GuildDefaultMessageNotifications: GuildDefaultMessageNotifications$2,
	GuildExplicitContentFilter: GuildExplicitContentFilter$2,
	GuildFeature: GuildFeature$2,
	GuildHubType: GuildHubType$2,
	GuildMFALevel: GuildMFALevel$2,
	GuildMemberFlags: GuildMemberFlags$2,
	GuildNSFWLevel: GuildNSFWLevel$2,
	GuildOnboardingMode: GuildOnboardingMode$2,
	GuildOnboardingPromptType: GuildOnboardingPromptType$2,
	GuildPremiumTier: GuildPremiumTier$2,
	GuildScheduledEventEntityType: GuildScheduledEventEntityType$2,
	GuildScheduledEventPrivacyLevel: GuildScheduledEventPrivacyLevel$2,
	GuildScheduledEventRecurrenceRuleFrequency: GuildScheduledEventRecurrenceRuleFrequency$2,
	GuildScheduledEventRecurrenceRuleMonth: GuildScheduledEventRecurrenceRuleMonth$2,
	GuildScheduledEventRecurrenceRuleWeekday: GuildScheduledEventRecurrenceRuleWeekday$2,
	GuildScheduledEventStatus: GuildScheduledEventStatus$2,
	GuildSystemChannelFlags: GuildSystemChannelFlags$2,
	GuildVerificationLevel: GuildVerificationLevel$2,
	GuildWidgetStyle: GuildWidgetStyle$2,
	IntegrationExpireBehavior: IntegrationExpireBehavior$2,
	InteractionContextType: InteractionContextType$1,
	InteractionResponseType: InteractionResponseType$2,
	InteractionType: InteractionType$2,
	InviteTargetType: InviteTargetType$2,
	InviteType: InviteType$2,
	MembershipScreeningFieldType: MembershipScreeningFieldType$2,
	MessageActivityType: MessageActivityType$2,
	MessageFlags: MessageFlags$2,
	MessageReferenceType: MessageReferenceType$2,
	MessageType: MessageType$2,
	OAuth2Scopes: OAuth2Scopes$2,
	OverwriteType: OverwriteType$2,
	PermissionFlagsBits: PermissionFlagsBits$1,
	PollLayoutType: PollLayoutType$2,
	PresenceUpdateStatus: PresenceUpdateStatus$2,
	RoleFlags: RoleFlags$2,
	SKUFlags: SKUFlags$2,
	SKUType: SKUType$2,
	SelectMenuDefaultValueType: SelectMenuDefaultValueType$2,
	SortOrderType: SortOrderType$2,
	StageInstancePrivacyLevel: StageInstancePrivacyLevel$2,
	StickerFormatType: StickerFormatType$2,
	StickerType: StickerType$2,
	SubscriptionStatus: SubscriptionStatus,
	TeamMemberMembershipState: TeamMemberMembershipState$2,
	TeamMemberRole: TeamMemberRole$2,
	TextInputStyle: TextInputStyle$2,
	ThreadAutoArchiveDuration: ThreadAutoArchiveDuration$2,
	ThreadMemberFlags: ThreadMemberFlags$2,
	UserFlags: UserFlags$2,
	UserPremiumType: UserPremiumType$2,
	VideoQualityMode: VideoQualityMode$2,
	WebhookType: WebhookType$2,
	default: mod$7
});

var require$$2$1 = /*@__PURE__*/getAugmentedNamespace(v10$h);

var v10$g = {};

var common$5 = {};

Object.defineProperty(common$5, "__esModule", { value: true });
common$5.Locale = common$5.RESTJSONErrorCodes = void 0;
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes
 */
var RESTJSONErrorCodes$3;
(function (RESTJSONErrorCodes) {
    RESTJSONErrorCodes[RESTJSONErrorCodes["GeneralError"] = 0] = "GeneralError";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownAccount"] = 10001] = "UnknownAccount";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownApplication"] = 10002] = "UnknownApplication";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownChannel"] = 10003] = "UnknownChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuild"] = 10004] = "UnknownGuild";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownIntegration"] = 10005] = "UnknownIntegration";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownInvite"] = 10006] = "UnknownInvite";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownMember"] = 10007] = "UnknownMember";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownMessage"] = 10008] = "UnknownMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownPermissionOverwrite"] = 10009] = "UnknownPermissionOverwrite";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownProvider"] = 10010] = "UnknownProvider";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownRole"] = 10011] = "UnknownRole";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownToken"] = 10012] = "UnknownToken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownUser"] = 10013] = "UnknownUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownEmoji"] = 10014] = "UnknownEmoji";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownWebhook"] = 10015] = "UnknownWebhook";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownWebhookService"] = 10016] = "UnknownWebhookService";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSession"] = 10020] = "UnknownSession";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownAsset"] = 10021] = "UnknownAsset";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownBan"] = 10026] = "UnknownBan";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSKU"] = 10027] = "UnknownSKU";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStoreListing"] = 10028] = "UnknownStoreListing";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownEntitlement"] = 10029] = "UnknownEntitlement";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownBuild"] = 10030] = "UnknownBuild";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownLobby"] = 10031] = "UnknownLobby";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownBranch"] = 10032] = "UnknownBranch";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStoreDirectoryLayout"] = 10033] = "UnknownStoreDirectoryLayout";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownRedistributable"] = 10036] = "UnknownRedistributable";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGiftCode"] = 10038] = "UnknownGiftCode";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStream"] = 10049] = "UnknownStream";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownPremiumServerSubscribeCooldown"] = 10050] = "UnknownPremiumServerSubscribeCooldown";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildTemplate"] = 10057] = "UnknownGuildTemplate";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownDiscoverableServerCategory"] = 10059] = "UnknownDiscoverableServerCategory";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSticker"] = 10060] = "UnknownSticker";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStickerPack"] = 10061] = "UnknownStickerPack";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownInteraction"] = 10062] = "UnknownInteraction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownApplicationCommand"] = 10063] = "UnknownApplicationCommand";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownVoiceState"] = 10065] = "UnknownVoiceState";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownApplicationCommandPermissions"] = 10066] = "UnknownApplicationCommandPermissions";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStageInstance"] = 10067] = "UnknownStageInstance";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildMemberVerificationForm"] = 10068] = "UnknownGuildMemberVerificationForm";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildWelcomeScreen"] = 10069] = "UnknownGuildWelcomeScreen";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildScheduledEvent"] = 10070] = "UnknownGuildScheduledEvent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildScheduledEventUser"] = 10071] = "UnknownGuildScheduledEventUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownTag"] = 10087] = "UnknownTag";
    RESTJSONErrorCodes[RESTJSONErrorCodes["BotsCannotUseThisEndpoint"] = 20001] = "BotsCannotUseThisEndpoint";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OnlyBotsCanUseThisEndpoint"] = 20002] = "OnlyBotsCanUseThisEndpoint";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ExplicitContentCannotBeSentToTheDesiredRecipient"] = 20009] = "ExplicitContentCannotBeSentToTheDesiredRecipient";
    RESTJSONErrorCodes[RESTJSONErrorCodes["NotAuthorizedToPerformThisActionOnThisApplication"] = 20012] = "NotAuthorizedToPerformThisActionOnThisApplication";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ActionCannotBePerformedDueToSlowmodeRateLimit"] = 20016] = "ActionCannotBePerformedDueToSlowmodeRateLimit";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheMazeIsntMeantForYou"] = 20017] = "TheMazeIsntMeantForYou";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OnlyTheOwnerOfThisAccountCanPerformThisAction"] = 20018] = "OnlyTheOwnerOfThisAccountCanPerformThisAction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["AnnouncementEditLimitExceeded"] = 20022] = "AnnouncementEditLimitExceeded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnderMinimumAge"] = 20024] = "UnderMinimumAge";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ChannelSendRateLimit"] = 20028] = "ChannelSendRateLimit";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerSendRateLimit"] = 20029] = "ServerSendRateLimit";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords"] = 20031] = "StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords";
    RESTJSONErrorCodes[RESTJSONErrorCodes["GuildPremiumSubscriptionLevelTooLow"] = 20035] = "GuildPremiumSubscriptionLevelTooLow";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildsReached"] = 30001] = "MaximumNumberOfGuildsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfFriendsReached"] = 30002] = "MaximumNumberOfFriendsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPinsReachedForTheChannel"] = 30003] = "MaximumNumberOfPinsReachedForTheChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfRecipientsReached"] = 30004] = "MaximumNumberOfRecipientsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildRolesReached"] = 30005] = "MaximumNumberOfGuildRolesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfWebhooksReached"] = 30007] = "MaximumNumberOfWebhooksReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfEmojisReached"] = 30008] = "MaximumNumberOfEmojisReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfReactionsReached"] = 30010] = "MaximumNumberOfReactionsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGroupDMsReached"] = 30011] = "MaximumNumberOfGroupDMsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildChannelsReached"] = 30013] = "MaximumNumberOfGuildChannelsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfAttachmentsInAMessageReached"] = 30015] = "MaximumNumberOfAttachmentsInAMessageReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfInvitesReached"] = 30016] = "MaximumNumberOfInvitesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfAnimatedEmojisReached"] = 30018] = "MaximumNumberOfAnimatedEmojisReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfServerMembersReached"] = 30019] = "MaximumNumberOfServerMembersReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfServerCategoriesReached"] = 30030] = "MaximumNumberOfServerCategoriesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["GuildAlreadyHasTemplate"] = 30031] = "GuildAlreadyHasTemplate";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfApplicationCommandsReached"] = 30032] = "MaximumNumberOfApplicationCommandsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumThreadParticipantsReached"] = 30033] = "MaximumThreadParticipantsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumDailyApplicationCommandCreatesReached"] = 30034] = "MaximumDailyApplicationCommandCreatesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfNonGuildMemberBansHasBeenExceeded"] = 30035] = "MaximumNumberOfNonGuildMemberBansHasBeenExceeded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfBanFetchesHasBeenReached"] = 30037] = "MaximumNumberOfBanFetchesHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfUncompletedGuildScheduledEventsReached"] = 30038] = "MaximumNumberOfUncompletedGuildScheduledEventsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfStickersReached"] = 30039] = "MaximumNumberOfStickersReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPruneRequestsHasBeenReached"] = 30040] = "MaximumNumberOfPruneRequestsHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached"] = 30042] = "MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfEditsToMessagesOlderThanOneHourReached"] = 30046] = "MaximumNumberOfEditsToMessagesOlderThanOneHourReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPinnedThreadsInForumHasBeenReached"] = 30047] = "MaximumNumberOfPinnedThreadsInForumHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfTagsInForumHasBeenReached"] = 30048] = "MaximumNumberOfTagsInForumHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["BitrateIsTooHighForChannelOfThisType"] = 30052] = "BitrateIsTooHighForChannelOfThisType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPremiumEmojisReached"] = 30056] = "MaximumNumberOfPremiumEmojisReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfWebhooksPerGuildReached"] = 30058] = "MaximumNumberOfWebhooksPerGuildReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfChannelPermissionOverwritesReached"] = 30060] = "MaximumNumberOfChannelPermissionOverwritesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheChannelsForThisGuildAreTooLarge"] = 30061] = "TheChannelsForThisGuildAreTooLarge";
    RESTJSONErrorCodes[RESTJSONErrorCodes["Unauthorized"] = 40001] = "Unauthorized";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VerifyYourAccount"] = 40002] = "VerifyYourAccount";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OpeningDirectMessagesTooFast"] = 40003] = "OpeningDirectMessagesTooFast";
    RESTJSONErrorCodes[RESTJSONErrorCodes["SendMessagesHasBeenTemporarilyDisabled"] = 40004] = "SendMessagesHasBeenTemporarilyDisabled";
    RESTJSONErrorCodes[RESTJSONErrorCodes["RequestEntityTooLarge"] = 40005] = "RequestEntityTooLarge";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FeatureTemporarilyDisabledServerSide"] = 40006] = "FeatureTemporarilyDisabledServerSide";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UserBannedFromThisGuild"] = 40007] = "UserBannedFromThisGuild";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ConnectionHasBeenRevoked"] = 40012] = "ConnectionHasBeenRevoked";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OnlyConsumableSKUsCanBeConsumed"] = 40018] = "OnlyConsumableSKUsCanBeConsumed";
    RESTJSONErrorCodes[RESTJSONErrorCodes["YouCanOnlyDeleteSandboxEntitlements"] = 40019] = "YouCanOnlyDeleteSandboxEntitlements";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TargetUserIsNotConnectedToVoice"] = 40032] = "TargetUserIsNotConnectedToVoice";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThisMessageWasAlreadyCrossposted"] = 40033] = "ThisMessageWasAlreadyCrossposted";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ApplicationCommandWithThatNameAlreadyExists"] = 40041] = "ApplicationCommandWithThatNameAlreadyExists";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ApplicationInteractionFailedToSend"] = 40043] = "ApplicationInteractionFailedToSend";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendAMessageInAForumChannel"] = 40058] = "CannotSendAMessageInAForumChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InteractionHasAlreadyBeenAcknowledged"] = 40060] = "InteractionHasAlreadyBeenAcknowledged";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TagNamesMustBeUnique"] = 40061] = "TagNamesMustBeUnique";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServiceResourceIsBeingRateLimited"] = 40062] = "ServiceResourceIsBeingRateLimited";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThereAreNoTagsAvailableThatCanBeSetByNonModerators"] = 40066] = "ThereAreNoTagsAvailableThatCanBeSetByNonModerators";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TagRequiredToCreateAForumPostInThisChannel"] = 40067] = "TagRequiredToCreateAForumPostInThisChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["AnEntitlementHasAlreadyBeenGrantedForThisResource"] = 40074] = "AnEntitlementHasAlreadyBeenGrantedForThisResource";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThisInteractionHasHitTheMaximumNumberOfFollowUpMessages"] = 40094] = "ThisInteractionHasHitTheMaximumNumberOfFollowUpMessages";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CloudflareIsBlockingYourRequest"] = 40333] = "CloudflareIsBlockingYourRequest";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MissingAccess"] = 50001] = "MissingAccess";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidAccountType"] = 50002] = "InvalidAccountType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExecuteActionOnDMChannel"] = 50003] = "CannotExecuteActionOnDMChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["GuildWidgetDisabled"] = 50004] = "GuildWidgetDisabled";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEditMessageAuthoredByAnotherUser"] = 50005] = "CannotEditMessageAuthoredByAnotherUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendAnEmptyMessage"] = 50006] = "CannotSendAnEmptyMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendMessagesToThisUser"] = 50007] = "CannotSendMessagesToThisUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendMessagesInNonTextChannel"] = 50008] = "CannotSendMessagesInNonTextChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ChannelVerificationLevelTooHighForYouToGainAccess"] = 50009] = "ChannelVerificationLevelTooHighForYouToGainAccess";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OAuth2ApplicationDoesNotHaveBot"] = 50010] = "OAuth2ApplicationDoesNotHaveBot";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OAuth2ApplicationLimitReached"] = 50011] = "OAuth2ApplicationLimitReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidOAuth2State"] = 50012] = "InvalidOAuth2State";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MissingPermissions"] = 50013] = "MissingPermissions";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidToken"] = 50014] = "InvalidToken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["NoteWasTooLong"] = 50015] = "NoteWasTooLong";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ProvidedTooFewOrTooManyMessagesToDelete"] = 50016] = "ProvidedTooFewOrTooManyMessagesToDelete";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidMFALevel"] = 50017] = "InvalidMFALevel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MessageCanOnlyBePinnedInTheChannelItWasSentIn"] = 50019] = "MessageCanOnlyBePinnedInTheChannelItWasSentIn";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InviteCodeInvalidOrTaken"] = 50020] = "InviteCodeInvalidOrTaken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExecuteActionOnSystemMessage"] = 50021] = "CannotExecuteActionOnSystemMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExecuteActionOnThisChannelType"] = 50024] = "CannotExecuteActionOnThisChannelType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidOAuth2AccessToken"] = 50025] = "InvalidOAuth2AccessToken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MissingRequiredOAuth2Scope"] = 50026] = "MissingRequiredOAuth2Scope";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidWebhookToken"] = 50027] = "InvalidWebhookToken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidRole"] = 50028] = "InvalidRole";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidRecipients"] = 50033] = "InvalidRecipients";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OneOfTheMessagesProvidedWasTooOldForBulkDelete"] = 50034] = "OneOfTheMessagesProvidedWasTooOldForBulkDelete";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidFormBodyOrContentType"] = 50035] = "InvalidFormBodyOrContentType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InviteAcceptedToGuildWithoutTheBotBeingIn"] = 50036] = "InviteAcceptedToGuildWithoutTheBotBeingIn";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidActivityAction"] = 50039] = "InvalidActivityAction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidAPIVersion"] = 50041] = "InvalidAPIVersion";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FileUploadedExceedsMaximumSize"] = 50045] = "FileUploadedExceedsMaximumSize";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidFileUploaded"] = 50046] = "InvalidFileUploaded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSelfRedeemThisGift"] = 50054] = "CannotSelfRedeemThisGift";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidGuild"] = 50055] = "InvalidGuild";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidSKU"] = 50057] = "InvalidSKU";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidRequestOrigin"] = 50067] = "InvalidRequestOrigin";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidMessageType"] = 50068] = "InvalidMessageType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["PaymentSourceRequiredToRedeemGift"] = 50070] = "PaymentSourceRequiredToRedeemGift";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotModifyASystemWebhook"] = 50073] = "CannotModifyASystemWebhook";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotDeleteChannelRequiredForCommunityGuilds"] = 50074] = "CannotDeleteChannelRequiredForCommunityGuilds";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEditStickersWithinMessage"] = 50080] = "CannotEditStickersWithinMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidStickerSent"] = 50081] = "InvalidStickerSent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidActionOnArchivedThread"] = 50083] = "InvalidActionOnArchivedThread";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidThreadNotificationSettings"] = 50084] = "InvalidThreadNotificationSettings";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ParameterEarlierThanCreation"] = 50085] = "ParameterEarlierThanCreation";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CommunityServerChannelsMustBeTextChannels"] = 50086] = "CommunityServerChannelsMustBeTextChannels";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor"] = 50091] = "TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerNotAvailableInYourLocation"] = 50095] = "ServerNotAvailableInYourLocation";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerNeedsMonetizationEnabledToPerformThisAction"] = 50097] = "ServerNeedsMonetizationEnabledToPerformThisAction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerNeedsMoreBoostsToPerformThisAction"] = 50101] = "ServerNeedsMoreBoostsToPerformThisAction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["RequestBodyContainsInvalidJSON"] = 50109] = "RequestBodyContainsInvalidJSON";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ProvidedFileIsInvalid"] = 50110] = "ProvidedFileIsInvalid";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ProvidedFileDurationExceedsMaximumLength"] = 50124] = "ProvidedFileDurationExceedsMaximumLength";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OwnerCannotBePendingMember"] = 50131] = "OwnerCannotBePendingMember";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OwnershipCannotBeMovedToABotUser"] = 50132] = "OwnershipCannotBeMovedToABotUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FailedToResizeAssetBelowTheMinimumSize"] = 50138] = "FailedToResizeAssetBelowTheMinimumSize";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji"] = 50144] = "CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotConvertBetweenPremiumEmojiAndNormalEmoji"] = 50145] = "CannotConvertBetweenPremiumEmojiAndNormalEmoji";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UploadedFileNotFound"] = 50146] = "UploadedFileNotFound";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesDoNotSupportAdditionalContent"] = 50159] = "VoiceMessagesDoNotSupportAdditionalContent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesMustHaveASingleAudioAttachment"] = 50160] = "VoiceMessagesMustHaveASingleAudioAttachment";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesMustHaveSupportingMetadata"] = 50161] = "VoiceMessagesMustHaveSupportingMetadata";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesCannotBeEdited"] = 50162] = "VoiceMessagesCannotBeEdited";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotDeleteGuildSubscriptionIntegration"] = 50163] = "CannotDeleteGuildSubscriptionIntegration";
    RESTJSONErrorCodes[RESTJSONErrorCodes["YouCannotSendVoiceMessagesInThisChannel"] = 50173] = "YouCannotSendVoiceMessagesInThisChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheUserAccountMustFirstBeVerified"] = 50178] = "TheUserAccountMustFirstBeVerified";
    RESTJSONErrorCodes[RESTJSONErrorCodes["YouDoNotHavePermissionToSendThisSticker"] = 50600] = "YouDoNotHavePermissionToSendThisSticker";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TwoFactorAuthenticationIsRequired"] = 60003] = "TwoFactorAuthenticationIsRequired";
    RESTJSONErrorCodes[RESTJSONErrorCodes["NoUsersWithDiscordTagExist"] = 80004] = "NoUsersWithDiscordTagExist";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ReactionWasBlocked"] = 90001] = "ReactionWasBlocked";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UserCannotUseBurstReactions"] = 90002] = "UserCannotUseBurstReactions";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ApplicationNotYetAvailable"] = 110001] = "ApplicationNotYetAvailable";
    RESTJSONErrorCodes[RESTJSONErrorCodes["APIResourceOverloaded"] = 130000] = "APIResourceOverloaded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheStageIsAlreadyOpen"] = 150006] = "TheStageIsAlreadyOpen";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotReplyWithoutPermissionToReadMessageHistory"] = 160002] = "CannotReplyWithoutPermissionToReadMessageHistory";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThreadAlreadyCreatedForMessage"] = 160004] = "ThreadAlreadyCreatedForMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThreadLocked"] = 160005] = "ThreadLocked";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumActiveThreads"] = 160006] = "MaximumActiveThreads";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumActiveAnnouncementThreads"] = 160007] = "MaximumActiveAnnouncementThreads";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidJSONForUploadedLottieFile"] = 170001] = "InvalidJSONForUploadedLottieFile";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UploadedLottiesCannotContainRasterizedImages"] = 170002] = "UploadedLottiesCannotContainRasterizedImages";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerMaximumFramerateExceeded"] = 170003] = "StickerMaximumFramerateExceeded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerFrameCountExceedsMaximumOf1000Frames"] = 170004] = "StickerFrameCountExceedsMaximumOf1000Frames";
    RESTJSONErrorCodes[RESTJSONErrorCodes["LottieAnimationMaximumDimensionsExceeded"] = 170005] = "LottieAnimationMaximumDimensionsExceeded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerFramerateIsTooSmallOrTooLarge"] = 170006] = "StickerFramerateIsTooSmallOrTooLarge";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerAnimationDurationExceedsMaximumOf5Seconds"] = 170007] = "StickerAnimationDurationExceedsMaximumOf5Seconds";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotUpdateAFinishedEvent"] = 180000] = "CannotUpdateAFinishedEvent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FailedToCreateStageNeededForStageEvent"] = 180002] = "FailedToCreateStageNeededForStageEvent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MessageWasBlockedByAutomaticModeration"] = 200000] = "MessageWasBlockedByAutomaticModeration";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TitleWasBlockedByAutomaticModeration"] = 200001] = "TitleWasBlockedByAutomaticModeration";
    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId"] = 220001] = "WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId";
    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId"] = 220002] = "WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId";
    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhooksCanOnlyCreateThreadsInForumChannels"] = 220003] = "WebhooksCanOnlyCreateThreadsInForumChannels";
    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhookServicesCannotBeUsedInForumChannels"] = 220004] = "WebhookServicesCannotBeUsedInForumChannels";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MessageBlockedByHarmfulLinksFilter"] = 240000] = "MessageBlockedByHarmfulLinksFilter";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEnableOnboardingRequirementsAreNotMet"] = 350000] = "CannotEnableOnboardingRequirementsAreNotMet";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotUpdateOnboardingWhileBelowRequirements"] = 350001] = "CannotUpdateOnboardingWhileBelowRequirements";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FailedToBanUsers"] = 500000] = "FailedToBanUsers";
    RESTJSONErrorCodes[RESTJSONErrorCodes["PollVotingBlocked"] = 520000] = "PollVotingBlocked";
    RESTJSONErrorCodes[RESTJSONErrorCodes["PollExpired"] = 520001] = "PollExpired";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidChannelTypeForPollCreation"] = 520002] = "InvalidChannelTypeForPollCreation";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEditAPollMessage"] = 520003] = "CannotEditAPollMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotUseAnEmojiIncludedWithThePoll"] = 520004] = "CannotUseAnEmojiIncludedWithThePoll";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExpireANonPollMessage"] = 520006] = "CannotExpireANonPollMessage";
})(RESTJSONErrorCodes$3 || (common$5.RESTJSONErrorCodes = RESTJSONErrorCodes$3 = {}));
/**
 * https://discord.com/developers/docs/reference#locales
 */
var Locale$3;
(function (Locale) {
    Locale["Indonesian"] = "id";
    Locale["EnglishUS"] = "en-US";
    Locale["EnglishGB"] = "en-GB";
    Locale["Bulgarian"] = "bg";
    Locale["ChineseCN"] = "zh-CN";
    Locale["ChineseTW"] = "zh-TW";
    Locale["Croatian"] = "hr";
    Locale["Czech"] = "cs";
    Locale["Danish"] = "da";
    Locale["Dutch"] = "nl";
    Locale["Finnish"] = "fi";
    Locale["French"] = "fr";
    Locale["German"] = "de";
    Locale["Greek"] = "el";
    Locale["Hindi"] = "hi";
    Locale["Hungarian"] = "hu";
    Locale["Italian"] = "it";
    Locale["Japanese"] = "ja";
    Locale["Korean"] = "ko";
    Locale["Lithuanian"] = "lt";
    Locale["Norwegian"] = "no";
    Locale["Polish"] = "pl";
    Locale["PortugueseBR"] = "pt-BR";
    Locale["Romanian"] = "ro";
    Locale["Russian"] = "ru";
    Locale["SpanishES"] = "es-ES";
    Locale["SpanishLATAM"] = "es-419";
    Locale["Swedish"] = "sv-SE";
    Locale["Thai"] = "th";
    Locale["Turkish"] = "tr";
    Locale["Ukrainian"] = "uk";
    Locale["Vietnamese"] = "vi";
})(Locale$3 || (common$5.Locale = Locale$3 = {}));

var application$2 = {};

Object.defineProperty(application$2, "__esModule", { value: true });

var auditLog$2 = {};

Object.defineProperty(auditLog$2, "__esModule", { value: true });

var autoModeration$2 = {};

Object.defineProperty(autoModeration$2, "__esModule", { value: true });

var channel$3 = {};

Object.defineProperty(channel$3, "__esModule", { value: true });
channel$3.ReactionType = void 0;
/**
 * https://discord.com/developers/docs/resources/channel#get-reactions-reaction-types
 */
var ReactionType$3;
(function (ReactionType) {
    ReactionType[ReactionType["Normal"] = 0] = "Normal";
    ReactionType[ReactionType["Super"] = 1] = "Super";
})(ReactionType$3 || (channel$3.ReactionType = ReactionType$3 = {}));

var emoji$2 = {};

Object.defineProperty(emoji$2, "__esModule", { value: true });

var gateway$2 = {};

Object.defineProperty(gateway$2, "__esModule", { value: true });

var guild$2 = {};

Object.defineProperty(guild$2, "__esModule", { value: true });

var guildScheduledEvent$2 = {};

Object.defineProperty(guildScheduledEvent$2, "__esModule", { value: true });

var interactions$2 = {};

Object.defineProperty(interactions$2, "__esModule", { value: true });

var invite$2 = {};

Object.defineProperty(invite$2, "__esModule", { value: true });

var monetization$2 = {};

Object.defineProperty(monetization$2, "__esModule", { value: true });
monetization$2.EntitlementOwnerType = void 0;
/**
 * https://discord.com/developers/docs/resources/entitlement#create-test-entitlement
 */
var EntitlementOwnerType$3;
(function (EntitlementOwnerType) {
    EntitlementOwnerType[EntitlementOwnerType["Guild"] = 1] = "Guild";
    EntitlementOwnerType[EntitlementOwnerType["User"] = 2] = "User";
})(EntitlementOwnerType$3 || (monetization$2.EntitlementOwnerType = EntitlementOwnerType$3 = {}));

var oauth2$2 = {};

Object.defineProperty(oauth2$2, "__esModule", { value: true });

var poll$2 = {};

Object.defineProperty(poll$2, "__esModule", { value: true });

var soundboard = {};

Object.defineProperty(soundboard, "__esModule", { value: true });

var stageInstance$2 = {};

Object.defineProperty(stageInstance$2, "__esModule", { value: true });

var sticker$2 = {};

Object.defineProperty(sticker$2, "__esModule", { value: true });

var template$2 = {};

Object.defineProperty(template$2, "__esModule", { value: true });

var user$3 = {};

Object.defineProperty(user$3, "__esModule", { value: true });

var voice$2 = {};

Object.defineProperty(voice$2, "__esModule", { value: true });

var webhook$2 = {};

Object.defineProperty(webhook$2, "__esModule", { value: true });

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OAuth2Routes = exports.RouteBases = exports.CDNRoutes = exports.ImageFormat = exports.StickerPackApplicationId = exports.Routes = exports.APIVersion = void 0;
	__exportStar(common$5, exports);
	__exportStar(application$2, exports);
	__exportStar(auditLog$2, exports);
	__exportStar(autoModeration$2, exports);
	__exportStar(channel$3, exports);
	__exportStar(emoji$2, exports);
	__exportStar(gateway$2, exports);
	__exportStar(guild$2, exports);
	__exportStar(guildScheduledEvent$2, exports);
	__exportStar(interactions$2, exports);
	__exportStar(invite$2, exports);
	__exportStar(monetization$2, exports);
	__exportStar(oauth2$2, exports);
	__exportStar(poll$2, exports);
	__exportStar(soundboard, exports);
	__exportStar(stageInstance$2, exports);
	__exportStar(sticker$2, exports);
	__exportStar(template$2, exports);
	__exportStar(user$3, exports);
	__exportStar(voice$2, exports);
	__exportStar(webhook$2, exports);
	exports.APIVersion = '10';
	exports.Routes = {
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/role-connections/metadata`
	     * - PUT `/applications/{application.id}/role-connections/metadata`
	     */
	    applicationRoleConnectionMetadata(applicationId) {
	        return `/applications/${applicationId}/role-connections/metadata`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/auto-moderation/rules`
	     * - POST `/guilds/{guild.id}/auto-moderation/rules`
	     */
	    guildAutoModerationRules(guildId) {
	        return `/guilds/${guildId}/auto-moderation/rules`;
	    },
	    /**
	     * Routes for:
	     * - GET    `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
	     * - PATCH  `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
	     * - DELETE `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
	     */
	    guildAutoModerationRule(guildId, ruleId) {
	        return `/guilds/${guildId}/auto-moderation/rules/${ruleId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/audit-logs`
	     */
	    guildAuditLog(guildId) {
	        return `/guilds/${guildId}/audit-logs`;
	    },
	    /**
	     * Route for:
	     * - GET    `/channels/{channel.id}`
	     * - PATCH  `/channels/{channel.id}`
	     * - DELETE `/channels/{channel.id}`
	     */
	    channel(channelId) {
	        return `/channels/${channelId}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/channels/{channel.id}/messages`
	     * - POST `/channels/{channel.id}/messages`
	     */
	    channelMessages(channelId) {
	        return `/channels/${channelId}/messages`;
	    },
	    /**
	     * Route for:
	     * - GET    `/channels/{channel.id}/messages/{message.id}`
	     * - PATCH  `/channels/{channel.id}/messages/{message.id}`
	     * - DELETE `/channels/{channel.id}/messages/{message.id}`
	     */
	    channelMessage(channelId, messageId) {
	        return `/channels/${channelId}/messages/${messageId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/messages/{message.id}/crosspost`
	     */
	    channelMessageCrosspost(channelId, messageId) {
	        return `/channels/${channelId}/messages/${messageId}/crosspost`;
	    },
	    /**
	     * Route for:
	     * - PUT    `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
	     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
	     *
	     * **Note**: You need to URL encode the emoji yourself
	     */
	    channelMessageOwnReaction(channelId, messageId, emoji) {
	        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`;
	    },
	    /**
	     * Route for:
	     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/{user.id}`
	     *
	     * **Note**: You need to URL encode the emoji yourself
	     */
	    channelMessageUserReaction(channelId, messageId, emoji, userId) {
	        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}`;
	    },
	    /**
	     * Route for:
	     * - GET    `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
	     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
	     *
	     * **Note**: You need to URL encode the emoji yourself
	     */
	    channelMessageReaction(channelId, messageId, emoji) {
	        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}`;
	    },
	    /**
	     * Route for:
	     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions`
	     */
	    channelMessageAllReactions(channelId, messageId) {
	        return `/channels/${channelId}/messages/${messageId}/reactions`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/messages/bulk-delete`
	     */
	    channelBulkDelete(channelId) {
	        return `/channels/${channelId}/messages/bulk-delete`;
	    },
	    /**
	     * Route for:
	     * - PUT    `/channels/{channel.id}/permissions/{overwrite.id}`
	     * - DELETE `/channels/{channel.id}/permissions/{overwrite.id}`
	     */
	    channelPermission(channelId, overwriteId) {
	        return `/channels/${channelId}/permissions/${overwriteId}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/channels/{channel.id}/invites`
	     * - POST `/channels/{channel.id}/invites`
	     */
	    channelInvites(channelId) {
	        return `/channels/${channelId}/invites`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/followers`
	     */
	    channelFollowers(channelId) {
	        return `/channels/${channelId}/followers`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/typing`
	     */
	    channelTyping(channelId) {
	        return `/channels/${channelId}/typing`;
	    },
	    /**
	     * Route for:
	     * - GET `/channels/{channel.id}/pins`
	     */
	    channelPins(channelId) {
	        return `/channels/${channelId}/pins`;
	    },
	    /**
	     * Route for:
	     * - PUT    `/channels/{channel.id}/pins/{message.id}`
	     * - DELETE `/channels/{channel.id}/pins/{message.id}`
	     */
	    channelPin(channelId, messageId) {
	        return `/channels/${channelId}/pins/${messageId}`;
	    },
	    /**
	     * Route for:
	     * - PUT    `/channels/{channel.id}/recipients/{user.id}`
	     * - DELETE `/channels/{channel.id}/recipients/{user.id}`
	     */
	    channelRecipient(channelId, userId) {
	        return `/channels/${channelId}/recipients/${userId}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/emojis`
	     * - POST `/guilds/{guild.id}/emojis`
	     */
	    guildEmojis(guildId) {
	        return `/guilds/${guildId}/emojis`;
	    },
	    /**
	     * Route for:
	     * - GET    `/guilds/{guild.id}/emojis/{emoji.id}`
	     * - PATCH  `/guilds/{guild.id}/emojis/{emoji.id}`
	     * - DELETE `/guilds/{guild.id}/emojis/{emoji.id}`
	     */
	    guildEmoji(guildId, emojiId) {
	        return `/guilds/${guildId}/emojis/${emojiId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/guilds`
	     */
	    guilds() {
	        return '/guilds';
	    },
	    /**
	     * Route for:
	     * - GET    `/guilds/{guild.id}`
	     * - PATCH  `/guilds/{guild.id}`
	     * - DELETE `/guilds/{guild.id}`
	     */
	    guild(guildId) {
	        return `/guilds/${guildId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/preview`
	     */
	    guildPreview(guildId) {
	        return `/guilds/${guildId}/preview`;
	    },
	    /**
	     * Route for:
	     * - GET   `/guilds/{guild.id}/channels`
	     * - POST  `/guilds/{guild.id}/channels`
	     * - PATCH `/guilds/{guild.id}/channels`
	     */
	    guildChannels(guildId) {
	        return `/guilds/${guildId}/channels`;
	    },
	    /**
	     * Route for:
	     * - GET    `/guilds/{guild.id}/members/{user.id}`
	     * - PUT    `/guilds/{guild.id}/members/{user.id}`
	     * - PATCH  `/guilds/{guild.id}/members/@me`
	     * - PATCH  `/guilds/{guild.id}/members/{user.id}`
	     * - DELETE `/guilds/{guild.id}/members/{user.id}`
	     */
	    guildMember(guildId, userId = '@me') {
	        return `/guilds/${guildId}/members/${userId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/members`
	     */
	    guildMembers(guildId) {
	        return `/guilds/${guildId}/members`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/members/search`
	     */
	    guildMembersSearch(guildId) {
	        return `/guilds/${guildId}/members/search`;
	    },
	    /**
	     * Route for:
	     * - PATCH `/guilds/{guild.id}/members/@me/nick`
	     *
	     * @deprecated Use {@link Routes.guildMember} instead.
	     */
	    guildCurrentMemberNickname(guildId) {
	        return `/guilds/${guildId}/members/@me/nick`;
	    },
	    /**
	     * Route for:
	     * - PUT    `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
	     * - DELETE `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
	     */
	    guildMemberRole(guildId, memberId, roleId) {
	        return `/guilds/${guildId}/members/${memberId}/roles/${roleId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/guilds/{guild.id}/mfa`
	     */
	    guildMFA(guildId) {
	        return `/guilds/${guildId}/mfa`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/bans`
	     */
	    guildBans(guildId) {
	        return `/guilds/${guildId}/bans`;
	    },
	    /**
	     * Route for:
	     * - GET    `/guilds/{guild.id}/bans/{user.id}`
	     * - PUT    `/guilds/{guild.id}/bans/{user.id}`
	     * - DELETE `/guilds/{guild.id}/bans/{user.id}`
	     */
	    guildBan(guildId, userId) {
	        return `/guilds/${guildId}/bans/${userId}`;
	    },
	    /**
	     * Route for:
	     * - GET   `/guilds/{guild.id}/roles`
	     * - POST  `/guilds/{guild.id}/roles`
	     * - PATCH `/guilds/{guild.id}/roles`
	     */
	    guildRoles(guildId) {
	        return `/guilds/${guildId}/roles`;
	    },
	    /**
	     * Route for:
	     * - GET    `/guilds/{guild.id}/roles/{role.id}`
	     * - PATCH  `/guilds/{guild.id}/roles/{role.id}`
	     * - DELETE `/guilds/{guild.id}/roles/{role.id}`
	     */
	    guildRole(guildId, roleId) {
	        return `/guilds/${guildId}/roles/${roleId}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/prune`
	     * - POST `/guilds/{guild.id}/prune`
	     */
	    guildPrune(guildId) {
	        return `/guilds/${guildId}/prune`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/regions`
	     */
	    guildVoiceRegions(guildId) {
	        return `/guilds/${guildId}/regions`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/invites`
	     */
	    guildInvites(guildId) {
	        return `/guilds/${guildId}/invites`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/integrations`
	     */
	    guildIntegrations(guildId) {
	        return `/guilds/${guildId}/integrations`;
	    },
	    /**
	     * Route for:
	     * - DELETE `/guilds/{guild.id}/integrations/{integration.id}`
	     */
	    guildIntegration(guildId, integrationId) {
	        return `/guilds/${guildId}/integrations/${integrationId}`;
	    },
	    /**
	     * Route for:
	     * - GET   `/guilds/{guild.id}/widget`
	     * - PATCH `/guilds/{guild.id}/widget`
	     */
	    guildWidgetSettings(guildId) {
	        return `/guilds/${guildId}/widget`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/widget.json`
	     */
	    guildWidgetJSON(guildId) {
	        return `/guilds/${guildId}/widget.json`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/vanity-url`
	     */
	    guildVanityUrl(guildId) {
	        return `/guilds/${guildId}/vanity-url`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/widget.png`
	     */
	    guildWidgetImage(guildId) {
	        return `/guilds/${guildId}/widget.png`;
	    },
	    /**
	     * Route for:
	     * - GET    `/invites/{invite.code}`
	     * - DELETE `/invites/{invite.code}`
	     */
	    invite(code) {
	        return `/invites/${code}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/templates/{template.code}`
	     * - POST `/guilds/templates/{template.code}`
	     */
	    template(code) {
	        return `/guilds/templates/${code}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/templates`
	     * - POST `/guilds/{guild.id}/templates`
	     */
	    guildTemplates(guildId) {
	        return `/guilds/${guildId}/templates`;
	    },
	    /**
	     * Route for:
	     * - PUT    `/guilds/{guild.id}/templates/{template.code}`
	     * - PATCH  `/guilds/{guild.id}/templates/{template.code}`
	     * - DELETE `/guilds/{guild.id}/templates/{template.code}`
	     */
	    guildTemplate(guildId, code) {
	        return `/guilds/${guildId}/templates/${code}`;
	    },
	    /**
	     * Route for:
	     * - GET `/channels/{channel.id}/polls/{message.id}/answers/{answer_id}`
	     */
	    pollAnswerVoters(channelId, messageId, answerId) {
	        return `/channels/${channelId}/polls/${messageId}/answers/${answerId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/polls/{message.id}/expire`
	     */
	    expirePoll(channelId, messageId) {
	        return `/channels/${channelId}/polls/${messageId}/expire`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/threads`
	     * - POST `/channels/{channel.id}/messages/{message.id}/threads`
	     */
	    threads(parentId, messageId) {
	        const parts = ['', 'channels', parentId];
	        if (messageId)
	            parts.push('messages', messageId);
	        parts.push('threads');
	        return parts.join('/');
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/threads/active`
	     */
	    guildActiveThreads(guildId) {
	        return `/guilds/${guildId}/threads/active`;
	    },
	    /**
	     * Route for:
	     * - GET `/channels/{channel.id}/threads/archived/public`
	     * - GET `/channels/{channel.id}/threads/archived/private`
	     */
	    channelThreads(channelId, archivedStatus) {
	        return `/channels/${channelId}/threads/archived/${archivedStatus}`;
	    },
	    /**
	     * Route for:
	     * - GET `/channels/{channel.id}/users/@me/threads/archived/private`
	     */
	    channelJoinedArchivedThreads(channelId) {
	        return `/channels/${channelId}/users/@me/threads/archived/private`;
	    },
	    /**
	     * Route for:
	     * - GET    `/channels/{thread.id}/thread-members`
	     * - GET    `/channels/{thread.id}/thread-members/{user.id}`
	     * - PUT    `/channels/{thread.id}/thread-members/@me`
	     * - PUT    `/channels/{thread.id}/thread-members/{user.id}`
	     * - DELETE `/channels/{thread.id}/thread-members/@me`
	     * - DELETE `/channels/{thread.id}/thread-members/{user.id}`
	     */
	    threadMembers(threadId, userId) {
	        const parts = ['', 'channels', threadId, 'thread-members'];
	        if (userId)
	            parts.push(userId);
	        return parts.join('/');
	    },
	    /**
	     * Route for:
	     * - GET   `/users/@me`
	     * - GET   `/users/{user.id}`
	     * - PATCH `/users/@me`
	     *
	     * @param [userId] The user ID, defaulted to `@me`
	     */
	    user(userId = '@me') {
	        return `/users/${userId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/users/@me/applications/{application.id}/role-connection`
	     * - PUT `/users/@me/applications/{application.id}/role-connection`
	     */
	    userApplicationRoleConnection(applicationId) {
	        return `/users/@me/applications/${applicationId}/role-connection`;
	    },
	    /**
	     * Route for:
	     * - GET `/users/@me/guilds`
	     */
	    userGuilds() {
	        return `/users/@me/guilds`;
	    },
	    /**
	     * Route for:
	     * - GET `/users/@me/guilds/{guild.id}/member`
	     */
	    userGuildMember(guildId) {
	        return `/users/@me/guilds/${guildId}/member`;
	    },
	    /**
	     * Route for:
	     * - DELETE `/users/@me/guilds/{guild.id}`
	     */
	    userGuild(guildId) {
	        return `/users/@me/guilds/${guildId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/users/@me/channels`
	     */
	    userChannels() {
	        return `/users/@me/channels`;
	    },
	    /**
	     * Route for:
	     * - GET `/users/@me/connections`
	     */
	    userConnections() {
	        return `/users/@me/connections`;
	    },
	    /**
	     * Route for:
	     * - GET `/voice/regions`
	     */
	    voiceRegions() {
	        return `/voice/regions`;
	    },
	    /**
	     * Route for:
	     * - GET  `/channels/{channel.id}/webhooks`
	     * - POST `/channels/{channel.id}/webhooks`
	     */
	    channelWebhooks(channelId) {
	        return `/channels/${channelId}/webhooks`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/webhooks`
	     */
	    guildWebhooks(guildId) {
	        return `/guilds/${guildId}/webhooks`;
	    },
	    /**
	     * Route for:
	     * - GET    `/webhooks/{webhook.id}`
	     * - GET    `/webhooks/{webhook.id}/{webhook.token}`
	     * - PATCH  `/webhooks/{webhook.id}`
	     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}`
	     * - DELETE `/webhooks/{webhook.id}`
	     * - DELETE `/webhooks/{webhook.id}/{webhook.token}`
	     * - POST   `/webhooks/{webhook.id}/{webhook.token}`
	     *
	     * - POST   `/webhooks/{application.id}/{interaction.token}`
	     */
	    webhook(webhookId, webhookToken) {
	        const parts = ['', 'webhooks', webhookId];
	        if (webhookToken)
	            parts.push(webhookToken);
	        return parts.join('/');
	    },
	    /**
	     * Route for:
	     * - GET    `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
	     * - GET    `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
	     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
	     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
	     * - DELETE `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
	     * - DELETE `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
	     *
	     * - PATCH  `/webhooks/{application.id}/{interaction.token}/messages/@original`
	     * - PATCH  `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
	     * - DELETE `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
	     */
	    webhookMessage(webhookId, webhookToken, messageId = '@original') {
	        return `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/webhooks/{webhook.id}/{webhook.token}/github`
	     * - POST `/webhooks/{webhook.id}/{webhook.token}/slack`
	     */
	    webhookPlatform(webhookId, webhookToken, platform) {
	        return `/webhooks/${webhookId}/${webhookToken}/${platform}`;
	    },
	    /**
	     * Route for:
	     * - GET `/gateway`
	     */
	    gateway() {
	        return `/gateway`;
	    },
	    /**
	     * Route for:
	     * - GET `/gateway/bot`
	     */
	    gatewayBot() {
	        return `/gateway/bot`;
	    },
	    /**
	     * Route for:
	     * - GET `/oauth2/applications/@me`
	     */
	    oauth2CurrentApplication() {
	        return `/oauth2/applications/@me`;
	    },
	    /**
	     * Route for:
	     * - GET `/oauth2/@me`
	     */
	    oauth2CurrentAuthorization() {
	        return `/oauth2/@me`;
	    },
	    /**
	     * Route for:
	     * - GET `/oauth2/authorize`
	     */
	    oauth2Authorization() {
	        return `/oauth2/authorize`;
	    },
	    /**
	     * Route for:
	     * - POST `/oauth2/token`
	     */
	    oauth2TokenExchange() {
	        return `/oauth2/token`;
	    },
	    /**
	     * Route for:
	     * - POST `/oauth2/token/revoke`
	     */
	    oauth2TokenRevocation() {
	        return `/oauth2/token/revoke`;
	    },
	    /**
	     * Route for:
	     * - GET  `/applications/{application.id}/commands`
	     * - PUT  `/applications/{application.id}/commands`
	     * - POST `/applications/{application.id}/commands`
	     */
	    applicationCommands(applicationId) {
	        return `/applications/${applicationId}/commands`;
	    },
	    /**
	     * Route for:
	     * - GET    `/applications/{application.id}/commands/{command.id}`
	     * - PATCH  `/applications/{application.id}/commands/{command.id}`
	     * - DELETE `/applications/{application.id}/commands/{command.id}`
	     */
	    applicationCommand(applicationId, commandId) {
	        return `/applications/${applicationId}/commands/${commandId}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/applications/{application.id}/guilds/{guild.id}/commands`
	     * - PUT  `/applications/{application.id}/guilds/{guild.id}/commands`
	     * - POST `/applications/{application.id}/guilds/{guild.id}/commands`
	     */
	    applicationGuildCommands(applicationId, guildId) {
	        return `/applications/${applicationId}/guilds/${guildId}/commands`;
	    },
	    /**
	     * Route for:
	     * - GET    `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
	     * - PATCH  `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
	     * - DELETE `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
	     */
	    applicationGuildCommand(applicationId, guildId, commandId) {
	        return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/interactions/{interaction.id}/{interaction.token}/callback`
	     */
	    interactionCallback(interactionId, interactionToken) {
	        return `/interactions/${interactionId}/${interactionToken}/callback`;
	    },
	    /**
	     * Route for:
	     * - GET   `/guilds/{guild.id}/member-verification`
	     * - PATCH `/guilds/{guild.id}/member-verification`
	     */
	    guildMemberVerification(guildId) {
	        return `/guilds/${guildId}/member-verification`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/voice-states/@me`
	     * - GET `/guilds/{guild.id}/voice-states/{user.id}`
	     * - PATCH `/guilds/{guild.id}/voice-states/@me`
	     * - PATCH `/guilds/{guild.id}/voice-states/{user.id}`
	     */
	    guildVoiceState(guildId, userId = '@me') {
	        return `/guilds/${guildId}/voice-states/${userId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
	     * - PUT `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
	     */
	    guildApplicationCommandsPermissions(applicationId, guildId) {
	        return `/applications/${applicationId}/guilds/${guildId}/commands/permissions`;
	    },
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
	     * - PUT `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
	     */
	    applicationCommandPermissions(applicationId, guildId, commandId) {
	        return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`;
	    },
	    /**
	     * Route for:
	     * - GET   `/guilds/{guild.id}/welcome-screen`
	     * - PATCH `/guilds/{guild.id}/welcome-screen`
	     */
	    guildWelcomeScreen(guildId) {
	        return `/guilds/${guildId}/welcome-screen`;
	    },
	    /**
	     * Route for:
	     * - POST `/stage-instances`
	     */
	    stageInstances() {
	        return `/stage-instances`;
	    },
	    /**
	     * Route for:
	     * - GET `/stage-instances/{channel.id}`
	     * - PATCH `/stage-instances/{channel.id}`
	     * - DELETE `/stage-instances/{channel.id}`
	     */
	    stageInstance(channelId) {
	        return `/stage-instances/${channelId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/stickers/{sticker.id}`
	     */
	    sticker(stickerId) {
	        return `/stickers/${stickerId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/sticker-packs`
	     */
	    stickerPacks() {
	        return '/sticker-packs';
	    },
	    /**
	     * Route for:
	     * - GET `/sticker-packs/{pack.id}`
	     */
	    stickerPack(packId) {
	        return `/sticker-packs/${packId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/sticker-packs`
	     *
	     * @deprecated Use {@link Routes.stickerPacks} instead.
	     */
	    nitroStickerPacks() {
	        return '/sticker-packs';
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/stickers`
	     * - POST `/guilds/{guild.id}/stickers`
	     */
	    guildStickers(guildId) {
	        return `/guilds/${guildId}/stickers`;
	    },
	    /**
	     * Route for:
	     * - GET    `/guilds/{guild.id}/stickers/{sticker.id}`
	     * - PATCH  `/guilds/{guild.id}/stickers/{sticker.id}`
	     * - DELETE `/guilds/{guild.id}/stickers/{sticker.id}`
	     */
	    guildSticker(guildId, stickerId) {
	        return `/guilds/${guildId}/stickers/${stickerId}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/scheduled-events`
	     * - POST `/guilds/{guild.id}/scheduled-events`
	     */
	    guildScheduledEvents(guildId) {
	        return `/guilds/${guildId}/scheduled-events`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
	     * - PATCH `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
	     * - DELETE `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
	     */
	    guildScheduledEvent(guildId, guildScheduledEventId) {
	        return `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}/users`
	     */
	    guildScheduledEventUsers(guildId, guildScheduledEventId) {
	        return `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}/users`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/onboarding`
	     * - PUT `/guilds/{guild.id}/onboarding`
	     */
	    guildOnboarding(guildId) {
	        return `/guilds/${guildId}/onboarding`;
	    },
	    /**
	     * Route for:
	     * - GET `/applications/@me`
	     * - PATCH `/applications/@me`
	     */
	    currentApplication() {
	        return '/applications/@me';
	    },
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/entitlements`
	     * - POST `/applications/{application.id}/entitlements`
	     */
	    entitlements(applicationId) {
	        return `/applications/${applicationId}/entitlements`;
	    },
	    /**
	     * Route for:
	     * - DELETE `/applications/{application.id}/entitlements/{entitlement.id}`
	     */
	    entitlement(applicationId, entitlementId) {
	        return `/applications/${applicationId}/entitlements/${entitlementId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/skus`
	     */
	    skus(applicationId) {
	        return `/applications/${applicationId}/skus`;
	    },
	    /**
	     * Route for:
	     * - POST `/guilds/{guild.id}/bulk-ban`
	     */
	    guildBulkBan(guildId) {
	        return `/guilds/${guildId}/bulk-ban`;
	    },
	    /**
	     * Route for:
	     * - POST `/applications/{application.id}/entitlements/{entitlement.id}/consume`
	     */
	    consumeEntitlement(applicationId, entitlementId) {
	        return `/applications/${applicationId}/entitlements/${entitlementId}/consume`;
	    },
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/emojis`
	     * - POST `/applications/{application.id}/emojis`
	     */
	    applicationEmojis(applicationId) {
	        return `/applications/${applicationId}/emojis`;
	    },
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/emojis/{emoji.id}`
	     * - PATCH `/applications/{application.id}/emojis/{emoji.id}`
	     * - DELETE `/applications/{application.id}/emojis/{emoji.id}`
	     */
	    applicationEmoji(applicationId, emojiId) {
	        return `/applications/${applicationId}/emojis/${emojiId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/skus/{sku.id}/subscriptions`
	     */
	    skuSubscriptions(skuId) {
	        return `/skus/${skuId}/subscriptions`;
	    },
	    /**
	     * Route for:
	     * - GET `/skus/{sku.id}/subscriptions/{subscription.id}`
	     */
	    skuSubscription(skuId, subscriptionId) {
	        return `/skus/${skuId}/subscriptions/${subscriptionId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/send-soundboard-sound`
	     */
	    sendSoundboardSound(channelId) {
	        return `/channels/${channelId}/send-soundboard-sound`;
	    },
	    /**
	     * Route for:
	     * - GET `/soundboard-default-sounds`
	     */
	    soundboardDefaultSounds() {
	        return '/soundboard-default-sounds';
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/soundboard-sounds`
	     * - POST `/guilds/{guild.id}/soundboard-sounds`
	     */
	    guildSoundboardSounds(guildId) {
	        return `/guilds/${guildId}/soundboard-sounds`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/soundboard-sounds/{sound.id}`
	     * - PATCH `/guilds/{guild.id}/soundboard-sounds/{sound.id}`
	     * - DELETE `/guilds/{guild.id}/soundboard-sounds/{sound.id}`
	     */
	    guildSoundboardSound(guildId, soundId) {
	        return `/guilds/${guildId}/soundboard-sounds/${soundId}`;
	    },
	};
	exports.StickerPackApplicationId = '710982414301790216';
	var ImageFormat;
	(function (ImageFormat) {
	    ImageFormat["JPEG"] = "jpeg";
	    ImageFormat["PNG"] = "png";
	    ImageFormat["WebP"] = "webp";
	    ImageFormat["GIF"] = "gif";
	    ImageFormat["Lottie"] = "json";
	})(ImageFormat || (exports.ImageFormat = ImageFormat = {}));
	exports.CDNRoutes = {
	    /**
	     * Route for:
	     * - GET `/emojis/{emoji.id}.{png|jpeg|webp|gif}`
	     *
	     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    emoji(emojiId, format) {
	        return `/emojis/${emojiId}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/icons/{guild.id}/{guild.icon}.{png|jpeg|webp|gif}`
	     *
	     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    guildIcon(guildId, guildIcon, format) {
	        return `/icons/${guildId}/${guildIcon}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/splashes/{guild.id}/{guild.splash}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    guildSplash(guildId, guildSplash, format) {
	        return `/splashes/${guildId}/${guildSplash}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/discovery-splashes/{guild.id}/{guild.discovery_splash}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    guildDiscoverySplash(guildId, guildDiscoverySplash, format) {
	        return `/discovery-splashes/${guildId}/${guildDiscoverySplash}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/banners/{guild.id}/{guild.banner}.{png|jpeg|webp|gif}`
	     *
	     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    guildBanner(guildId, guildBanner, format) {
	        return `/banners/${guildId}/${guildBanner}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/banners/{user.id}/{user.banner}.{png|jpeg|webp|gif}`
	     *
	     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    userBanner(userId, userBanner, format) {
	        return `/banners/${userId}/${userBanner}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/embed/avatars/{index}.png`
	     *
	     * The value for `index` parameter depends on whether the user is [migrated to the new username system](https://discord.com/developers/docs/change-log#unique-usernames-on-discord).
	     * For users on the new username system, `index` will be `(user.id >> 22) % 6`.
	     * For users on the legacy username system, `index` will be `user.discriminator % 5`.
	     *
	     * This route supports the extension: PNG
	     */
	    defaultUserAvatar(index) {
	        return `/embed/avatars/${index}.png`;
	    },
	    /**
	     * Route for:
	     * - GET `/avatars/{user.id}/{user.avatar}.{png|jpeg|webp|gif}`
	     *
	     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    userAvatar(userId, userAvatar, format) {
	        return `/avatars/${userId}/${userAvatar}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/users/{user.id}/avatars/{guild_member.avatar}.{png|jpeg|webp|gif}`
	     *
	     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    guildMemberAvatar(guildId, userId, memberAvatar, format) {
	        return `/guilds/${guildId}/users/${userId}/avatars/${memberAvatar}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/avatar-decorations/{user.id}/{user.avatar_decoration}.png`
	     *
	     * This route supports the extension: PNG
	     *
	     * @deprecated Use {@link CDNRoutes.avatarDecoration} instead.
	     */
	    userAvatarDecoration(userId, userAvatarDecoration) {
	        return `/avatar-decorations/${userId}/${userAvatarDecoration}.png`;
	    },
	    /**
	     * Route for:
	     * - GET `/avatar-decoration-presets/{avatar_decoration_data_asset}.png`
	     *
	     * This route supports the extension: PNG
	     */
	    avatarDecoration(avatarDecorationDataAsset) {
	        return `/avatar-decoration-presets/${avatarDecorationDataAsset}.png`;
	    },
	    /**
	     * Route for:
	     * - GET `/app-icons/{application.id}/{application.icon}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    applicationIcon(applicationId, applicationIcon, format) {
	        return `/app-icons/${applicationId}/${applicationIcon}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/app-icons/{application.id}/{application.cover_image}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    applicationCover(applicationId, applicationCoverImage, format) {
	        return `/app-icons/${applicationId}/${applicationCoverImage}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/app-assets/{application.id}/{application.asset_id}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    applicationAsset(applicationId, applicationAssetId, format) {
	        return `/app-assets/${applicationId}/${applicationAssetId}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/app-assets/{application.id}/achievements/{achievement.id}/icons/{achievement.icon}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    achievementIcon(applicationId, achievementId, achievementIconHash, format) {
	        return `/app-assets/${applicationId}/achievements/${achievementId}/icons/${achievementIconHash}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/app-assets/710982414301790216/store/{sticker_pack.banner.asset_id}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    stickerPackBanner(stickerPackBannerAssetId, format) {
	        return `/app-assets/${exports.StickerPackApplicationId}/store/${stickerPackBannerAssetId}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/app-assets/${application.id}/store/${asset.id}.{png|jpeg|webp}}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    storePageAsset(applicationId, assetId, format = ImageFormat.PNG) {
	        return `/app-assets/${applicationId}/store/${assetId}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/team-icons/{team.id}/{team.icon}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    teamIcon(teamId, teamIcon, format) {
	        return `/team-icons/${teamId}/${teamIcon}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/stickers/{sticker.id}.{png|json}`
	     *
	     * This route supports the extensions: PNG, Lottie, GIF
	     */
	    sticker(stickerId, format) {
	        return `/stickers/${stickerId}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/role-icons/{role.id}/{role.icon}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    roleIcon(roleId, roleIcon, format) {
	        return `/role-icons/${roleId}/${roleIcon}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guild-events/{guild_scheduled_event.id}/{guild_scheduled_event.image}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    guildScheduledEventCover(guildScheduledEventId, guildScheduledEventCoverImage, format) {
	        return `/guild-events/${guildScheduledEventId}/${guildScheduledEventCoverImage}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/${guild.id}/users/${user.id}/banners/${guild_member.banner}.{png|jpeg|webp|gif}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    guildMemberBanner(guildId, userId, guildMemberBanner, format) {
	        return `/guilds/${guildId}/users/${userId}/banners/${guildMemberBanner}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/soundboard-sounds/${sound.id}`
	     */
	    soundboardSound(soundId) {
	        return `/soundboard-sounds/${soundId}`;
	    },
	};
	exports.RouteBases = {
	    api: `https://discord.com/api/v${exports.APIVersion}`,
	    cdn: 'https://cdn.discordapp.com',
	    media: 'https://media.discordapp.net',
	    invite: 'https://discord.gg',
	    template: 'https://discord.new',
	    gift: 'https://discord.gift',
	    scheduledEvent: 'https://discord.com/events',
	};
	// Freeze bases object
	Object.freeze(exports.RouteBases);
	exports.OAuth2Routes = {
	    authorizationURL: `${exports.RouteBases.api}${exports.Routes.oauth2Authorization()}`,
	    tokenURL: `${exports.RouteBases.api}${exports.Routes.oauth2TokenExchange()}`,
	    /**
	     * See https://tools.ietf.org/html/rfc7009
	     */
	    tokenRevocationURL: `${exports.RouteBases.api}${exports.Routes.oauth2TokenRevocation()}`,
	};
	// Freeze OAuth2 route object
	Object.freeze(exports.OAuth2Routes);
	
} (v10$g));

var mod$6 = /*@__PURE__*/getDefaultExportFromCjs(v10$g);

const APIVersion$1 = mod$6.APIVersion;
const CDNRoutes$1 = mod$6.CDNRoutes;
const EntitlementOwnerType$2 = mod$6.EntitlementOwnerType;
const ImageFormat$1 = mod$6.ImageFormat;
const Locale$2 = mod$6.Locale;
const OAuth2Routes$1 = mod$6.OAuth2Routes;
const RESTJSONErrorCodes$2 = mod$6.RESTJSONErrorCodes;
const ReactionType$2 = mod$6.ReactionType;
const RouteBases$1 = mod$6.RouteBases;
const Routes$1 = mod$6.Routes;
const StickerPackApplicationId$1 = mod$6.StickerPackApplicationId;

var v10$f = /*#__PURE__*/Object.freeze({
	__proto__: null,
	APIVersion: APIVersion$1,
	CDNRoutes: CDNRoutes$1,
	EntitlementOwnerType: EntitlementOwnerType$2,
	ImageFormat: ImageFormat$1,
	Locale: Locale$2,
	OAuth2Routes: OAuth2Routes$1,
	RESTJSONErrorCodes: RESTJSONErrorCodes$2,
	ReactionType: ReactionType$2,
	RouteBases: RouteBases$1,
	Routes: Routes$1,
	StickerPackApplicationId: StickerPackApplicationId$1,
	default: mod$6
});

var require$$3$1 = /*@__PURE__*/getAugmentedNamespace(v10$f);

var v10$e = {};

var common$4 = {};

Object.defineProperty(common$4, "__esModule", { value: true });
common$4.RPCCloseEventCodes = common$4.RPCErrorCodes = void 0;
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-error-codes
 */
var RPCErrorCodes$3;
(function (RPCErrorCodes) {
    RPCErrorCodes[RPCErrorCodes["UnknownError"] = 1000] = "UnknownError";
    RPCErrorCodes[RPCErrorCodes["InvalidPayload"] = 4000] = "InvalidPayload";
    RPCErrorCodes[RPCErrorCodes["InvalidCommand"] = 4002] = "InvalidCommand";
    RPCErrorCodes[RPCErrorCodes["InvalidGuild"] = 4003] = "InvalidGuild";
    RPCErrorCodes[RPCErrorCodes["InvalidEvent"] = 4004] = "InvalidEvent";
    RPCErrorCodes[RPCErrorCodes["InvalidChannel"] = 4005] = "InvalidChannel";
    RPCErrorCodes[RPCErrorCodes["InvalidPermissions"] = 4006] = "InvalidPermissions";
    RPCErrorCodes[RPCErrorCodes["InvalidClientId"] = 4007] = "InvalidClientId";
    RPCErrorCodes[RPCErrorCodes["InvalidOrigin"] = 4008] = "InvalidOrigin";
    RPCErrorCodes[RPCErrorCodes["InvalidToken"] = 4009] = "InvalidToken";
    RPCErrorCodes[RPCErrorCodes["InvalidUser"] = 4010] = "InvalidUser";
    RPCErrorCodes[RPCErrorCodes["OAuth2Error"] = 5000] = "OAuth2Error";
    RPCErrorCodes[RPCErrorCodes["SelectChannelTimedOut"] = 5001] = "SelectChannelTimedOut";
    RPCErrorCodes[RPCErrorCodes["GetGuildTimedOut"] = 5002] = "GetGuildTimedOut";
    RPCErrorCodes[RPCErrorCodes["SelectVoiceForceRequired"] = 5003] = "SelectVoiceForceRequired";
    RPCErrorCodes[RPCErrorCodes["CaptureShortcutAlreadyListening"] = 5004] = "CaptureShortcutAlreadyListening";
})(RPCErrorCodes$3 || (common$4.RPCErrorCodes = RPCErrorCodes$3 = {}));
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-close-event-codes
 */
var RPCCloseEventCodes$3;
(function (RPCCloseEventCodes) {
    RPCCloseEventCodes[RPCCloseEventCodes["InvalidClientId"] = 4000] = "InvalidClientId";
    RPCCloseEventCodes[RPCCloseEventCodes["InvalidOrigin"] = 4001] = "InvalidOrigin";
    RPCCloseEventCodes[RPCCloseEventCodes["RateLimited"] = 4002] = "RateLimited";
    RPCCloseEventCodes[RPCCloseEventCodes["TokenRevoked"] = 4003] = "TokenRevoked";
    RPCCloseEventCodes[RPCCloseEventCodes["InvalidVersion"] = 4004] = "InvalidVersion";
    RPCCloseEventCodes[RPCCloseEventCodes["InvalidEncoding"] = 4005] = "InvalidEncoding";
})(RPCCloseEventCodes$3 || (common$4.RPCCloseEventCodes = RPCCloseEventCodes$3 = {}));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(common$4, exports);
	
} (v10$e));

var mod$5 = /*@__PURE__*/getDefaultExportFromCjs(v10$e);

const RPCCloseEventCodes$2 = mod$5.RPCCloseEventCodes;
const RPCErrorCodes$2 = mod$5.RPCErrorCodes;

var v10$d = /*#__PURE__*/Object.freeze({
	__proto__: null,
	RPCCloseEventCodes: RPCCloseEventCodes$2,
	RPCErrorCodes: RPCErrorCodes$2,
	default: mod$5
});

var require$$4$1 = /*@__PURE__*/getAugmentedNamespace(v10$d);

var v10$c = {};

Object.defineProperty(v10$c, "__esModule", { value: true });
v10$c.isDMInteraction = isDMInteraction$3;
v10$c.isGuildInteraction = isGuildInteraction$3;
v10$c.isApplicationCommandDMInteraction = isApplicationCommandDMInteraction$3;
v10$c.isApplicationCommandGuildInteraction = isApplicationCommandGuildInteraction$3;
v10$c.isMessageComponentDMInteraction = isMessageComponentDMInteraction$3;
v10$c.isMessageComponentGuildInteraction = isMessageComponentGuildInteraction$3;
v10$c.isLinkButton = isLinkButton$3;
v10$c.isInteractionButton = isInteractionButton$3;
v10$c.isMessageComponentInteraction = isMessageComponentInteraction$3;
v10$c.isMessageComponentButtonInteraction = isMessageComponentButtonInteraction$3;
v10$c.isMessageComponentSelectMenuInteraction = isMessageComponentSelectMenuInteraction$3;
v10$c.isChatInputApplicationCommandInteraction = isChatInputApplicationCommandInteraction$3;
v10$c.isContextMenuApplicationCommandInteraction = isContextMenuApplicationCommandInteraction$3;
const index_1$1 = require$$2$1;
// Interactions
/**
 * A type-guard check for DM interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction was received in a DM channel
 */
function isDMInteraction$3(interaction) {
    return Reflect.has(interaction, 'user');
}
/**
 * A type-guard check for guild interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction was received in a guild
 */
function isGuildInteraction$3(interaction) {
    return Reflect.has(interaction, 'guild_id');
}
// ApplicationCommandInteractions
/**
 * A type-guard check for DM application command interactions
 *
 * @param interaction The application command interaction to check against
 * @returns A boolean that indicates if the application command interaction was received in a DM channel
 */
function isApplicationCommandDMInteraction$3(interaction) {
    return isDMInteraction$3(interaction);
}
/**
 * A type-guard check for guild application command interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the application command interaction was received in a guild
 */
function isApplicationCommandGuildInteraction$3(interaction) {
    return isGuildInteraction$3(interaction);
}
// MessageComponentInteractions
/**
 * A type-guard check for DM message component interactions
 *
 * @param interaction The message component interaction to check against
 * @returns A boolean that indicates if the message component interaction was received in a DM channel
 */
function isMessageComponentDMInteraction$3(interaction) {
    return isDMInteraction$3(interaction);
}
/**
 * A type-guard check for guild message component interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the message component interaction was received in a guild
 */
function isMessageComponentGuildInteraction$3(interaction) {
    return isGuildInteraction$3(interaction);
}
// Buttons
/**
 * A type-guard check for buttons that have a `url` attached to them.
 *
 * @param component The button to check against
 * @returns A boolean that indicates if the button has a `url` attached to it
 */
function isLinkButton$3(component) {
    return component.style === index_1$1.ButtonStyle.Link;
}
/**
 * A type-guard check for buttons that have a `custom_id` attached to them.
 *
 * @param component The button to check against
 * @returns A boolean that indicates if the button has a `custom_id` attached to it
 */
function isInteractionButton$3(component) {
    return component.style !== index_1$1.ButtonStyle.Link;
}
// Message Components
/**
 * A type-guard check for message component interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction is a message component
 */
function isMessageComponentInteraction$3(interaction) {
    return interaction.type === index_1$1.InteractionType.MessageComponent;
}
/**
 * A type-guard check for button message component interactions
 *
 * @param interaction The message component interaction to check against
 * @returns A boolean that indicates if the message component is a button
 */
function isMessageComponentButtonInteraction$3(interaction) {
    return interaction.data.component_type === index_1$1.ComponentType.Button;
}
/**
 * A type-guard check for select menu message component interactions
 *
 * @param interaction The message component interaction to check against
 * @returns A boolean that indicates if the message component is a select menu
 */
function isMessageComponentSelectMenuInteraction$3(interaction) {
    return [
        index_1$1.ComponentType.StringSelect,
        index_1$1.ComponentType.UserSelect,
        index_1$1.ComponentType.RoleSelect,
        index_1$1.ComponentType.MentionableSelect,
        index_1$1.ComponentType.ChannelSelect,
    ].includes(interaction.data.component_type);
}
// Application Commands
/**
 * A type-guard check for chat input application commands.
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction is a chat input application command
 */
function isChatInputApplicationCommandInteraction$3(interaction) {
    return interaction.data.type === index_1$1.ApplicationCommandType.ChatInput;
}
/**
 * A type-guard check for context menu application commands.
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction is a context menu application command
 */
function isContextMenuApplicationCommandInteraction$3(interaction) {
    return (interaction.data.type === index_1$1.ApplicationCommandType.Message ||
        interaction.data.type === index_1$1.ApplicationCommandType.User);
}

const isApplicationCommandDMInteraction$2 = v10$c.isApplicationCommandDMInteraction;
const isApplicationCommandGuildInteraction$2 = v10$c.isApplicationCommandGuildInteraction;
const isChatInputApplicationCommandInteraction$2 = v10$c.isChatInputApplicationCommandInteraction;
const isContextMenuApplicationCommandInteraction$2 = v10$c.isContextMenuApplicationCommandInteraction;
const isDMInteraction$2 = v10$c.isDMInteraction;
const isGuildInteraction$2 = v10$c.isGuildInteraction;
const isInteractionButton$2 = v10$c.isInteractionButton;
const isLinkButton$2 = v10$c.isLinkButton;
const isMessageComponentButtonInteraction$2 = v10$c.isMessageComponentButtonInteraction;
const isMessageComponentDMInteraction$2 = v10$c.isMessageComponentDMInteraction;
const isMessageComponentGuildInteraction$2 = v10$c.isMessageComponentGuildInteraction;
const isMessageComponentInteraction$2 = v10$c.isMessageComponentInteraction;
const isMessageComponentSelectMenuInteraction$2 = v10$c.isMessageComponentSelectMenuInteraction;

var v10$b = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: v10$c,
	isApplicationCommandDMInteraction: isApplicationCommandDMInteraction$2,
	isApplicationCommandGuildInteraction: isApplicationCommandGuildInteraction$2,
	isChatInputApplicationCommandInteraction: isChatInputApplicationCommandInteraction$2,
	isContextMenuApplicationCommandInteraction: isContextMenuApplicationCommandInteraction$2,
	isDMInteraction: isDMInteraction$2,
	isGuildInteraction: isGuildInteraction$2,
	isInteractionButton: isInteractionButton$2,
	isLinkButton: isLinkButton$2,
	isMessageComponentButtonInteraction: isMessageComponentButtonInteraction$2,
	isMessageComponentDMInteraction: isMessageComponentDMInteraction$2,
	isMessageComponentGuildInteraction: isMessageComponentGuildInteraction$2,
	isMessageComponentInteraction: isMessageComponentInteraction$2,
	isMessageComponentSelectMenuInteraction: isMessageComponentSelectMenuInteraction$2
});

var require$$5$1 = /*@__PURE__*/getAugmentedNamespace(v10$b);

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Utils = void 0;
	__exportStar(require$$0$1, exports);
	__exportStar(require$$1$1, exports);
	__exportStar(require$$2$1, exports);
	__exportStar(require$$3$1, exports);
	__exportStar(require$$4$1, exports);
	exports.Utils = require$$5$1;
	
} (v10$l));

var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$3 = Object.getOwnPropertyNames;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __name$5 = (target, value) => __defProp$5(target, "name", { value, configurable: true });
var __export$3 = (target, all) => {
  for (var name in all)
    __defProp$5(target, name, { get: all[name], enumerable: true });
};
var __copyProps$3 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames$3(from))
      if (!__hasOwnProp$3.call(to, key) && key !== except)
        __defProp$5(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc$3(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS$3 = (mod) => __copyProps$3(__defProp$5({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports$2 = {};
__export$3(src_exports$2, {
  AbortError: () => AbortError,
  AsyncEventEmitter: () => AsyncEventEmitter
});
var dist$3 = __toCommonJS$3(src_exports$2);
function validateListener(input) {
  if (typeof input !== "function") {
    throw new TypeError(`The listener argument must be a function. Received ${typeof input}`);
  }
}
__name$5(validateListener, "validateListener");
function validateAbortSignal(input) {
  if (input && !(input instanceof AbortSignal)) {
    throw new TypeError(`The signal option must be an AbortSignal. Received ${input}`);
  }
}
__name$5(validateAbortSignal, "validateAbortSignal");
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) {
    list[index] = list[index + 1];
  }
  list.pop();
}
__name$5(spliceOne, "spliceOne");
function arrayClone(arr) {
  switch (arr.length) {
    case 2:
      return [arr[0], arr[1]];
    case 3:
      return [arr[0], arr[1], arr[2]];
    case 4:
      return [arr[0], arr[1], arr[2], arr[3]];
    case 5:
      return [arr[0], arr[1], arr[2], arr[3], arr[4]];
    case 6:
      return [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]];
  }
  return arr.slice();
}
__name$5(arrayClone, "arrayClone");
function identicalSequenceRange(a, b) {
  for (let i = 0; i < a.length - 3; i++) {
    const pos = b.indexOf(a[i]);
    if (pos !== -1) {
      const rest = b.length - pos;
      if (rest > 3) {
        let len = 1;
        const maxLen = Math.min(a.length - i, rest);
        while (maxLen > len && a[i + len] === b[pos + len]) {
          len++;
        }
        if (len > 3) {
          return [len, i];
        }
      }
    }
  }
  return [0, 0];
}
__name$5(identicalSequenceRange, "identicalSequenceRange");
function enhanceStackTrace(err, own) {
  let ctorInfo = "";
  try {
    const { name } = this.constructor;
    if (name !== "AsyncEventEmitter") ctorInfo = ` on ${name} instance`;
  } catch {
  }
  const sep = `
Emitted 'error' event${ctorInfo} at:
`;
  const errStack = err.stack.split("\n").slice(1);
  const ownStack = own.stack.split("\n").slice(1);
  const { 0: len, 1: off } = identicalSequenceRange(ownStack, errStack);
  if (len > 0) {
    ownStack.splice(off + 1, len - 2, "    [... lines matching original stack trace ...]");
  }
  return err.stack + sep + ownStack.join("\n");
}
__name$5(enhanceStackTrace, "enhanceStackTrace");
var _AsyncEventEmitter = class _AsyncEventEmitter {
  constructor() {
    this._events = {
      __proto__: null
    };
    this._eventCount = 0;
    this._maxListeners = 10;
    this._internalPromiseMap = /* @__PURE__ */ new Map();
    this._wrapperId = 0n;
  }
  addListener(eventName, listener) {
    validateListener(listener);
    const wrapped = this._wrapListener(eventName, listener, false);
    this._addListener(eventName, wrapped, false);
    return this;
  }
  on(eventName, listener) {
    return this.addListener(eventName, listener);
  }
  once(eventName, listener) {
    validateListener(listener);
    const wrapped = this._wrapListener(eventName, listener, true);
    this._addListener(eventName, wrapped, false);
    return this;
  }
  removeListener(eventName, listener) {
    validateListener(listener);
    const events = this._events;
    const eventList = events[eventName];
    if (eventList === void 0) {
      return this;
    }
    if (eventList === listener || eventList.listener === listener) {
      if (--this._eventCount === 0) {
        this._events = { __proto__: null };
      } else {
        delete events[eventName];
        if (events.removeListener) {
          this.emit(
            "removeListener",
            eventName,
            eventList.listener ?? eventList
          );
        }
      }
    } else if (typeof eventList !== "function") {
      let position = -1;
      for (let i = eventList.length - 1; i >= 0; i--) {
        if (eventList[i] === listener || eventList[i].listener === listener) {
          position = i;
          break;
        }
      }
      if (position < 0) {
        return this;
      }
      if (position === 0) {
        eventList.shift();
      } else {
        spliceOne(eventList, position);
      }
      if (eventList.length === 0) {
        delete events[eventName];
        --this._eventCount;
      }
      if (events.removeListener !== void 0) {
        this.emit("removeListener", eventName, listener);
      }
    }
    return this;
  }
  off(eventName, listener) {
    return this.removeListener(eventName, listener);
  }
  removeAllListeners(event) {
    const events = this._events;
    if (events.removeListener === void 0) {
      if (!event) {
        this._events = { __proto__: null };
        this._eventCount = 0;
      } else if (events[event] !== void 0) {
        if (--this._eventCount === 0) {
          this._events = { __proto__: null };
        } else {
          delete events[event];
        }
      }
      return this;
    }
    if (!event) {
      for (const key of Reflect.ownKeys(events)) {
        if (key === "removeListener") {
          continue;
        }
        this.removeAllListeners(key);
      }
      this.removeAllListeners("removeListener");
      this._events = { __proto__: null };
      this._eventCount = 0;
      return this;
    }
    const listeners = events[event];
    if (typeof listeners === "function") {
      this.removeListener(event, listeners);
    } else if (listeners !== void 0) {
      for (let i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(event, listeners[i]);
      }
    }
    return this;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(`Expected to get a non-negative number for "setMaxListeners", got ${n} instead`);
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return this._maxListeners;
  }
  listeners(eventName) {
    const eventList = this._events[eventName];
    if (eventList === void 0) {
      return [];
    }
    if (typeof eventList === "function") {
      return [eventList.listener ?? eventList];
    }
    const ret = arrayClone(eventList);
    for (let i = 0; i < ret.length; ++i) {
      const orig = ret[i].listener;
      if (typeof orig === "function") {
        ret[i] = orig;
      }
    }
    return ret;
  }
  rawListeners(eventName) {
    const eventList = this._events[eventName];
    if (eventList === void 0) {
      return [];
    }
    if (typeof eventList === "function") {
      return [eventList];
    }
    return arrayClone(eventList);
  }
  emit(eventName, ...args) {
    let doError = eventName === "error";
    const events = this._events;
    if (events !== void 0) {
      doError = doError && events.error === void 0;
    } else if (!doError) {
      return false;
    }
    if (doError) {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        try {
          const capture = {};
          Error.captureStackTrace(capture, _AsyncEventEmitter.prototype.emit);
          Object.defineProperty(er, "stack", {
            value: enhanceStackTrace.call(this, er, capture),
            configurable: true
          });
        } catch {
        }
        throw er;
      }
      const stringifiedError = String(er);
      const err = new Error(`Unhandled 'error' event emitted, received ${stringifiedError}`);
      err.context = er;
      throw err;
    }
    const handlers = events[eventName];
    if (handlers === void 0) {
      return false;
    }
    if (typeof handlers === "function") {
      const result = handlers.apply(this, args);
      if (result !== void 0 && result !== null) {
        handleMaybeAsync(this, result);
      }
    } else {
      const len = handlers.length;
      const listeners = arrayClone(handlers);
      for (let i = 0; i < len; ++i) {
        const result = listeners[i].apply(this, args);
        if (result !== void 0 && result !== null) {
          handleMaybeAsync(this, result);
        }
      }
    }
    return true;
  }
  listenerCount(eventName) {
    const events = this._events;
    if (events === void 0) {
      return 0;
    }
    const eventListeners = events[eventName];
    if (typeof eventListeners === "function") {
      return 1;
    }
    return eventListeners?.length ?? 0;
  }
  prependListener(eventName, listener) {
    validateListener(listener);
    const wrapped = this._wrapListener(eventName, listener, false);
    this._addListener(eventName, wrapped, true);
    return this;
  }
  prependOnceListener(eventName, listener) {
    validateListener(listener);
    const wrapped = this._wrapListener(eventName, listener, true);
    this._addListener(eventName, wrapped, true);
    return this;
  }
  eventNames() {
    return this._eventCount > 0 ? Reflect.ownKeys(this._events) : [];
  }
  async waitForAllListenersToComplete() {
    const promises = [...this._internalPromiseMap.values()];
    if (promises.length === 0) {
      return false;
    }
    await Promise.all(promises);
    return true;
  }
  _addListener(eventName, wrappedListener, prepend) {
    if (this._events.newListener !== void 0) {
      this.emit(
        "newListener",
        eventName,
        wrappedListener.listener ?? wrappedListener
      );
    }
    let existing = this._events[eventName];
    if (existing === void 0) {
      existing = this._events[eventName] = wrappedListener;
      ++this._eventCount;
    } else if (typeof existing === "function") {
      existing = this._events[eventName] = prepend ? [wrappedListener, existing] : [existing, wrappedListener];
    } else if (prepend) {
      existing.unshift(wrappedListener);
    } else {
      existing.push(wrappedListener);
    }
    const existingWarnedAboutMaxListeners = Reflect.get(existing, "_hasWarnedAboutMaxListeners");
    if (this._maxListeners > 0 && existing.length > this._maxListeners && !existingWarnedAboutMaxListeners) {
      Reflect.set(existing, "_hasWarnedAboutMaxListeners", true);
      const warningMessage = [
        `Possible AsyncEventEmitter memory leak detected. ${existing.length} ${String(
          eventName
        )} listeners added to ${this.constructor.name}.`,
        `Use emitter.setMaxListeners() to increase the limit.`
      ].join(" ");
      console.warn(warningMessage);
    }
  }
  _wrapListener(eventName, listener, once) {
    if (!once) {
      return listener;
    }
    const state = {
      fired: false,
      wrapFn: void 0,
      eventEmitter: this,
      eventName,
      listener
    };
    const aliased = onceWrapper;
    const wrapped = aliased.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }
  static listenerCount(emitter, eventName) {
    return emitter.listenerCount(eventName);
  }
  static async once(emitter, eventName, options = {}) {
    const signal = options?.signal;
    validateAbortSignal(signal);
    if (signal?.aborted) {
      throw new AbortError(void 0, { cause: getReason(signal) });
    }
    return new Promise((resolve, reject) => {
      const errorListener = /* @__PURE__ */ __name$5((err) => {
        emitter.removeListener(eventName, resolver);
        if (signal) {
          eventTargetAgnosticRemoveListener(emitter, eventName, abortListener);
        }
        reject(err);
      }, "errorListener");
      const resolver = /* @__PURE__ */ __name$5((...args) => {
        emitter.removeListener("error", errorListener);
        if (signal) {
          eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
        }
        resolve(args);
      }, "resolver");
      emitter.once(eventName, resolver);
      if (eventName !== "error") {
        emitter.once("error", errorListener);
      }
      const abortListener = /* @__PURE__ */ __name$5(() => {
        eventTargetAgnosticRemoveListener(emitter, eventName, resolver);
        eventTargetAgnosticRemoveListener(emitter, "error", errorListener);
        reject(new AbortError(void 0, { cause: getReason(signal) }));
      }, "abortListener");
      if (signal) {
        eventTargetAgnosticAddListener(signal, "abort", abortListener, { once: true });
      }
    });
  }
  static on(emitter, eventName, options = {}) {
    const signal = options?.signal;
    validateAbortSignal(signal);
    if (signal?.aborted) {
      throw new AbortError(void 0, { cause: getReason(signal) });
    }
    const unconsumedEvents = [];
    const unconsumedPromises = [];
    let error = null;
    let finished = false;
    const abortListener = /* @__PURE__ */ __name$5(() => {
      errorHandler(new AbortError(void 0, { cause: getReason(signal) }));
    }, "abortListener");
    const eventHandler = /* @__PURE__ */ __name$5((...args) => {
      const promise = unconsumedPromises.shift();
      if (promise) {
        promise.resolve(createIterResult(args, false));
      } else {
        unconsumedEvents.push(args);
      }
    }, "eventHandler");
    const errorHandler = /* @__PURE__ */ __name$5((err) => {
      finished = true;
      const toError = unconsumedPromises.shift();
      if (toError) {
        toError.reject(err);
      } else {
        error = err;
      }
      void iterator.return();
    }, "errorHandler");
    const iterator = Object.setPrototypeOf(
      {
        next() {
          const value = unconsumedEvents.shift();
          if (value) {
            return Promise.resolve(createIterResult(value, false));
          }
          if (error) {
            const p = Promise.reject(error);
            error = null;
            return p;
          }
          if (finished) {
            return Promise.resolve(createIterResult(void 0, true));
          }
          return new Promise((resolve, reject) => {
            unconsumedPromises.push({ resolve, reject });
          });
        },
        return() {
          emitter.off(eventName, eventHandler);
          emitter.off("error", errorHandler);
          if (signal) {
            eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
          }
          finished = true;
          const doneResult = createIterResult(void 0, true);
          for (const promise of unconsumedPromises) {
            promise.resolve(doneResult);
          }
          return Promise.resolve(doneResult);
        },
        throw(err) {
          if (!err || !(err instanceof Error)) {
            throw new TypeError(
              `Expected Error instance to be thrown in AsyncEventEmitter.AsyncIterator. Got ${err}`
            );
          }
          error = err;
          emitter.off(eventName, eventHandler);
          emitter.off("error", errorHandler);
        },
        [Symbol.asyncIterator]() {
          return this;
        }
      },
      AsyncIteratorPrototype
    );
    emitter.on(eventName, eventHandler);
    if (eventName !== "error") {
      emitter.on("error", errorHandler);
    }
    if (signal) {
      eventTargetAgnosticAddListener(signal, "abort", abortListener);
    }
    return iterator;
  }
};
__name$5(_AsyncEventEmitter, "AsyncEventEmitter");
var AsyncEventEmitter = _AsyncEventEmitter;
function onceWrapper() {
  if (!this.fired) {
    this.eventEmitter.removeListener(this.eventName, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) {
      return this.listener.call(this.eventEmitter);
    }
    return this.listener.apply(this.eventEmitter, arguments);
  }
}
__name$5(onceWrapper, "onceWrapper");
function getReason(signal) {
  return signal?.reason;
}
__name$5(getReason, "getReason");
function eventTargetAgnosticRemoveListener(emitter, name, listener, flags) {
  if (typeof emitter.off === "function") {
    emitter.off(name, listener);
  } else if (typeof emitter.removeEventListener === "function") {
    emitter.removeEventListener(name, listener, flags);
  }
}
__name$5(eventTargetAgnosticRemoveListener, "eventTargetAgnosticRemoveListener");
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === "function") {
    if (flags?.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === "function") {
    emitter.addEventListener(name, listener, flags);
  }
}
__name$5(eventTargetAgnosticAddListener, "eventTargetAgnosticAddListener");
var AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
}).prototype);
function createIterResult(value, done) {
  return { value, done };
}
__name$5(createIterResult, "createIterResult");
var _AbortError = class _AbortError extends Error {
  constructor(message = "The operation was aborted", options = void 0) {
    if (options !== void 0 && typeof options !== "object") {
      throw new TypeError(`Failed to create AbortError: options is not an object or undefined`);
    }
    super(message, options);
    this.code = "ABORT_ERR";
    this.name = "AbortError";
  }
};
__name$5(_AbortError, "AbortError");
var AbortError = _AbortError;
function handleMaybeAsync(emitter, result) {
  try {
    const the = result.then;
    const fin = result.finally;
    if (typeof the === "function") {
      the.call(result, void 0, (error) => {
        setTimeout(() => {
          emitter.emit("error", error);
        }, 0);
      });
    }
    if (typeof fin === "function") {
      const promiseId = String(++emitter["_wrapperId"]);
      emitter["_internalPromiseMap"].set(promiseId, result);
      fin.call(result, /* @__PURE__ */ __name$5(function final() {
        emitter["_internalPromiseMap"].delete(promiseId);
      }, "final"));
    }
  } catch (err) {
    emitter.emit("error", err);
  }
}
__name$5(handleMaybeAsync, "handleMaybeAsync");

var IPC = {};

var Transport$1 = {};

Object.defineProperty(Transport$1, "__esModule", { value: true });
Transport$1.Transport = Transport$1.CUSTOM_RPC_ERROR_CODE = Transport$1.RPC_ERROR_CODE = Transport$1.RPC_CLOSE_CODE = void 0;
const async_event_emitter_1$1 = dist$3;
var RPC_CLOSE_CODE;
(function (RPC_CLOSE_CODE) {
    RPC_CLOSE_CODE[RPC_CLOSE_CODE["CLOSE_NORMAL"] = 1000] = "CLOSE_NORMAL";
    RPC_CLOSE_CODE[RPC_CLOSE_CODE["CLOSE_UNSUPPORTED"] = 1003] = "CLOSE_UNSUPPORTED";
    RPC_CLOSE_CODE[RPC_CLOSE_CODE["CLOSE_ABNORMAL"] = 1006] = "CLOSE_ABNORMAL";
    RPC_CLOSE_CODE[RPC_CLOSE_CODE["INVALID_CLIENTID"] = 4000] = "INVALID_CLIENTID";
    RPC_CLOSE_CODE[RPC_CLOSE_CODE["INVALID_ORIGIN"] = 4001] = "INVALID_ORIGIN";
    RPC_CLOSE_CODE[RPC_CLOSE_CODE["RATELIMITED"] = 4002] = "RATELIMITED";
    RPC_CLOSE_CODE[RPC_CLOSE_CODE["TOKEN_REVOKED"] = 4003] = "TOKEN_REVOKED";
    RPC_CLOSE_CODE[RPC_CLOSE_CODE["INVALID_VERSION"] = 4004] = "INVALID_VERSION";
    RPC_CLOSE_CODE[RPC_CLOSE_CODE["INVALID_ENCODING"] = 4005] = "INVALID_ENCODING";
})(RPC_CLOSE_CODE || (Transport$1.RPC_CLOSE_CODE = RPC_CLOSE_CODE = {}));
var RPC_ERROR_CODE;
(function (RPC_ERROR_CODE) {
    RPC_ERROR_CODE[RPC_ERROR_CODE["UNKNOWN_ERROR"] = 1000] = "UNKNOWN_ERROR";
    RPC_ERROR_CODE[RPC_ERROR_CODE["SERVICE_UNAVAILABLE"] = 1001] = "SERVICE_UNAVAILABLE";
    RPC_ERROR_CODE[RPC_ERROR_CODE["TRANSACTION_ABORTED"] = 1002] = "TRANSACTION_ABORTED";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_PAYLOAD"] = 4000] = "INVALID_PAYLOAD";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_COMMAND"] = 4002] = "INVALID_COMMAND";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_GUILD"] = 4003] = "INVALID_GUILD";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_EVENT"] = 4004] = "INVALID_EVENT";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_CHANNEL"] = 4005] = "INVALID_CHANNEL";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_PERMISSIONS"] = 4006] = "INVALID_PERMISSIONS";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_CLIENTID"] = 4007] = "INVALID_CLIENTID";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_ORIGIN"] = 4008] = "INVALID_ORIGIN";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_TOKEN"] = 4009] = "INVALID_TOKEN";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_USER"] = 4010] = "INVALID_USER";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_INVITE"] = 4011] = "INVALID_INVITE";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_ACTIVITY_JOIN_REQUEST"] = 4012] = "INVALID_ACTIVITY_JOIN_REQUEST";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_ENTITLEMENT"] = 4015] = "INVALID_ENTITLEMENT";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_GIFT_CODE"] = 4016] = "INVALID_GIFT_CODE";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_GUILD_TEMPLATE"] = 4017] = "INVALID_GUILD_TEMPLATE";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_SOUND"] = 4018] = "INVALID_SOUND";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_PROVIDER"] = 4019] = "INVALID_PROVIDER";
    RPC_ERROR_CODE[RPC_ERROR_CODE["OAUTH2_ERROR"] = 5000] = "OAUTH2_ERROR";
    RPC_ERROR_CODE[RPC_ERROR_CODE["SELECT_CHANNEL_TIMED_OUT"] = 5001] = "SELECT_CHANNEL_TIMED_OUT";
    RPC_ERROR_CODE[RPC_ERROR_CODE["GET_GUILD_TIMED_OUT"] = 5002] = "GET_GUILD_TIMED_OUT";
    RPC_ERROR_CODE[RPC_ERROR_CODE["SELECT_VOICE_FORCE_REQUIRED"] = 5003] = "SELECT_VOICE_FORCE_REQUIRED";
    RPC_ERROR_CODE[RPC_ERROR_CODE["INVALID_ACTIVITY_SECRET"] = 5005] = "INVALID_ACTIVITY_SECRET";
    RPC_ERROR_CODE[RPC_ERROR_CODE["NO_ELIGIBLE_ACTIVITY"] = 5006] = "NO_ELIGIBLE_ACTIVITY";
    RPC_ERROR_CODE[RPC_ERROR_CODE["PURCHASE_CANCELED"] = 5008] = "PURCHASE_CANCELED";
    RPC_ERROR_CODE[RPC_ERROR_CODE["PURCHASE_ERROR"] = 5009] = "PURCHASE_ERROR";
    RPC_ERROR_CODE[RPC_ERROR_CODE["UNAUTHORIZED_FOR_ACHIEVEMENT"] = 5010] = "UNAUTHORIZED_FOR_ACHIEVEMENT";
    RPC_ERROR_CODE[RPC_ERROR_CODE["RATE_LIMITED"] = 5011] = "RATE_LIMITED";
    RPC_ERROR_CODE[RPC_ERROR_CODE["UNAUTHORIZED_FOR_APPLICATION"] = 5012] = "UNAUTHORIZED_FOR_APPLICATION";
    RPC_ERROR_CODE[RPC_ERROR_CODE["NO_CONNECTION_FOUND"] = 5013] = "NO_CONNECTION_FOUND";
})(RPC_ERROR_CODE || (Transport$1.RPC_ERROR_CODE = RPC_ERROR_CODE = {}));
var CUSTOM_RPC_ERROR_CODE;
(function (CUSTOM_RPC_ERROR_CODE) {
    CUSTOM_RPC_ERROR_CODE[CUSTOM_RPC_ERROR_CODE["CONNECTION_ENDED"] = 0] = "CONNECTION_ENDED";
    CUSTOM_RPC_ERROR_CODE[CUSTOM_RPC_ERROR_CODE["CONNECTION_TIMEOUT"] = 1] = "CONNECTION_TIMEOUT";
    CUSTOM_RPC_ERROR_CODE[CUSTOM_RPC_ERROR_CODE["COULD_NOT_CONNECT"] = 2] = "COULD_NOT_CONNECT";
})(CUSTOM_RPC_ERROR_CODE || (Transport$1.CUSTOM_RPC_ERROR_CODE = CUSTOM_RPC_ERROR_CODE = {}));
class Transport extends async_event_emitter_1$1.AsyncEventEmitter {
    get isConnected() {
        return false;
    }
    constructor(options) {
        super();
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = options.client;
    }
}
Transport$1.Transport = Transport;

var RPCError$1 = {};

Object.defineProperty(RPCError$1, "__esModule", { value: true });
RPCError$1.RPCError = void 0;
const Transport_1$3 = Transport$1;
class RPCError extends Error {
    get name() {
        return `${{ ...Transport_1$3.CUSTOM_RPC_ERROR_CODE, ...Transport_1$3.RPC_ERROR_CODE }[this.code]}`;
    }
    constructor(errorCode, message, options) {
        super(message, options);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        this.code = errorCode;
        this.message = message ?? this.message;
    }
}
RPCError$1.RPCError = RPCError;

var __importDefault$1 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(IPC, "__esModule", { value: true });
IPC.IPCTransport = IPC.IPC_OPCODE = void 0;
const Transport_1$2 = Transport$1;
const RPCError_1$2 = RPCError$1;
const node_crypto_1$1 = __importDefault$1(require$$2$2);
const node_path_1 = __importDefault$1(require$$3$2);
const node_net_1 = __importDefault$1(require$$4$2);
const node_fs_1 = __importDefault$1(require$$5$2);
var IPC_OPCODE;
(function (IPC_OPCODE) {
    IPC_OPCODE[IPC_OPCODE["HANDSHAKE"] = 0] = "HANDSHAKE";
    IPC_OPCODE[IPC_OPCODE["FRAME"] = 1] = "FRAME";
    IPC_OPCODE[IPC_OPCODE["CLOSE"] = 2] = "CLOSE";
    IPC_OPCODE[IPC_OPCODE["PING"] = 3] = "PING";
    IPC_OPCODE[IPC_OPCODE["PONG"] = 4] = "PONG";
})(IPC_OPCODE || (IPC.IPC_OPCODE = IPC_OPCODE = {}));
const defaultPathList = [
    {
        platform: ["win32"],
        format: (id) => `\\\\?\\pipe\\discord-ipc-${id}`
    },
    {
        platform: ["darwin", "linux"],
        format: (id) => {
            // macOS / Linux path
            const { env: { XDG_RUNTIME_DIR, TMPDIR, TMP, TEMP } } = process;
            const prefix = node_fs_1.default.realpathSync(XDG_RUNTIME_DIR ?? TMPDIR ?? TMP ?? TEMP ?? `${node_path_1.default.sep}tmp`);
            return node_path_1.default.join(prefix, `discord-ipc-${id}`);
        }
    },
    {
        platform: ["linux"],
        format: (id) => {
            // snap
            const { env: { XDG_RUNTIME_DIR, TMPDIR, TMP, TEMP } } = process;
            const prefix = node_fs_1.default.realpathSync(XDG_RUNTIME_DIR ?? TMPDIR ?? TMP ?? TEMP ?? `${node_path_1.default.sep}tmp`);
            return node_path_1.default.join(prefix, "snap.discord", `discord-ipc-${id}`);
        }
    },
    {
        platform: ["linux"],
        format: (id) => {
            // flatpak
            const { env: { XDG_RUNTIME_DIR, TMPDIR, TMP, TEMP } } = process;
            const prefix = node_fs_1.default.realpathSync(XDG_RUNTIME_DIR ?? TMPDIR ?? TMP ?? TEMP ?? `${node_path_1.default.sep}tmp`);
            return node_path_1.default.join(prefix, "app", "com.discordapp.Discord", `discord-ipc-${id}`);
        }
    }
];
const createSocket = async (path) => {
    return new Promise((resolve, reject) => {
        const onError = () => {
            socket.removeListener("conect", onConnect);
            reject();
        };
        const onConnect = () => {
            socket.removeListener("error", onError);
            resolve(socket);
        };
        const socket = node_net_1.default.createConnection(path);
        socket.once("connect", onConnect);
        socket.once("error", onError);
    });
};
class IPCTransport extends Transport_1$2.Transport {
    get isConnected() {
        return this.socket !== undefined && this.socket.readyState === "open";
    }
    constructor(options) {
        super(options);
        Object.defineProperty(this, "pathList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "socket", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.pathList = options.pathList ?? defaultPathList;
    }
    async getSocket() {
        if (this.socket)
            return this.socket;
        const pathList = this.pathList ?? defaultPathList;
        const pipeId = this.client.pipeId;
        return new Promise(async (resolve, reject) => {
            for (const pat of pathList) {
                const tryCreateSocket = async (path) => {
                    const socket = await createSocket(path).catch(() => undefined);
                    return socket;
                };
                const handleSocketId = async (id) => {
                    if (!pat.platform.includes(process.platform))
                        return;
                    const socketPath = pat.format(id);
                    if (process.platform !== "win32" && !node_fs_1.default.existsSync(node_path_1.default.dirname(socketPath)))
                        return;
                    return await tryCreateSocket(socketPath);
                };
                if (pipeId) {
                    const socket = await handleSocketId(pipeId);
                    if (socket)
                        return resolve(socket);
                }
                else {
                    for (let i = 0; i < 10; i++) {
                        const socket = await handleSocketId(i);
                        if (socket)
                            return resolve(socket);
                    }
                }
            }
            reject(new RPCError_1$2.RPCError(Transport_1$2.CUSTOM_RPC_ERROR_CODE.COULD_NOT_CONNECT, "Could not connect"));
        });
    }
    async connect() {
        if (!this.socket)
            this.socket = await this.getSocket();
        this.emit("open");
        this.send({
            v: 1,
            client_id: this.client.clientId
        }, IPC_OPCODE.HANDSHAKE);
        this.socket.on("readable", () => {
            let data = Buffer.alloc(0);
            do {
                if (!this.isConnected)
                    break;
                const chunk = this.socket?.read();
                if (!chunk)
                    break;
                this.client.emit("debug", `SERVER => CLIENT | ${chunk
                    .toString("hex")
                    .match(/.{1,2}/g)
                    ?.join(" ")
                    .toUpperCase()}`);
                data = Buffer.concat([data, chunk]);
            } while (true);
            if (data.length < 8) {
                if (data.length === 0)
                    return;
                // TODO : Handle error
                this.client.emit("debug", "SERVER => CLIENT | Malformed packet, invalid payload");
                return;
            }
            const op = data.readUInt32LE(0);
            const length = data.readUInt32LE(4);
            if (data.length !== length + 8) {
                // TODO : Handle error
                this.client.emit("debug", "SERVER => CLIENT | Malformed packet, invalid payload");
                return;
            }
            let parsedData;
            try {
                parsedData = JSON.parse(data.subarray(8, length + 8).toString());
            }
            catch {
                // TODO : Handle error
                this.client.emit("debug", "SERVER => CLIENT | Malformed packet, invalid payload");
                return;
            }
            this.client.emit("debug", `SERVER => CLIENT | OPCODE.${IPC_OPCODE[op]} |`, parsedData);
            switch (op) {
                case IPC_OPCODE.FRAME: {
                    if (!data)
                        break;
                    this.emit("message", parsedData);
                    break;
                }
                case IPC_OPCODE.CLOSE: {
                    this.emit("close", parsedData);
                    break;
                }
                case IPC_OPCODE.PING: {
                    this.send(parsedData, IPC_OPCODE.PONG);
                    this.emit("ping");
                    break;
                }
            }
        });
        this.socket.on("close", () => {
            this.socket = undefined;
            this.emit("close", "Closed by Discord");
        });
    }
    send(message, op = IPC_OPCODE.FRAME) {
        this.client.emit("debug", `CLIENT => SERVER | OPCODE.${IPC_OPCODE[op]} |`, message);
        const dataBuffer = message ? Buffer.from(JSON.stringify(message)) : Buffer.alloc(0);
        const packet = Buffer.alloc(8);
        packet.writeUInt32LE(op, 0);
        packet.writeUInt32LE(dataBuffer.length, 4);
        this.socket?.write(Buffer.concat([packet, dataBuffer]));
    }
    ping() {
        this.send(node_crypto_1$1.default.randomUUID(), IPC_OPCODE.PING);
    }
    close() {
        if (!this.socket)
            return Promise.resolve();
        return new Promise((resolve) => {
            this.socket.once("close", () => {
                this.emit("close", "Closed by client");
                this.socket = undefined;
                resolve();
            });
            this.socket.end();
        });
    }
}
IPC.IPCTransport = IPCTransport;

var WebSocket$3 = {};

var bufferUtil$1 = {exports: {}};

const BINARY_TYPES$2 = ['nodebuffer', 'arraybuffer', 'fragments'];
const hasBlob$1 = typeof Blob !== 'undefined';

if (hasBlob$1) BINARY_TYPES$2.push('blob');

var constants = {
  BINARY_TYPES: BINARY_TYPES$2,
  EMPTY_BUFFER: Buffer.alloc(0),
  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  hasBlob: hasBlob$1,
  kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
  kListener: Symbol('kListener'),
  kStatusCode: Symbol('status-code'),
  kWebSocket: Symbol('websocket'),
  NOOP: () => {}
};

var unmask$1;
var mask;

const { EMPTY_BUFFER: EMPTY_BUFFER$3 } = constants;

const FastBuffer$2 = Buffer[Symbol.species];

/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */
function concat$1(list, totalLength) {
  if (list.length === 0) return EMPTY_BUFFER$3;
  if (list.length === 1) return list[0];

  const target = Buffer.allocUnsafe(totalLength);
  let offset = 0;

  for (let i = 0; i < list.length; i++) {
    const buf = list[i];
    target.set(buf, offset);
    offset += buf.length;
  }

  if (offset < totalLength) {
    return new FastBuffer$2(target.buffer, target.byteOffset, offset);
  }

  return target;
}

/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */
function _mask(source, mask, output, offset, length) {
  for (let i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
}

/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */
function _unmask(buffer, mask) {
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] ^= mask[i & 3];
  }
}

/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} buf The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 * @public
 */
function toArrayBuffer$1(buf) {
  if (buf.length === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
}

/**
 * Converts `data` to a `Buffer`.
 *
 * @param {*} data The data to convert
 * @return {Buffer} The buffer
 * @throws {TypeError}
 * @public
 */
function toBuffer$2(data) {
  toBuffer$2.readOnly = true;

  if (Buffer.isBuffer(data)) return data;

  let buf;

  if (data instanceof ArrayBuffer) {
    buf = new FastBuffer$2(data);
  } else if (ArrayBuffer.isView(data)) {
    buf = new FastBuffer$2(data.buffer, data.byteOffset, data.byteLength);
  } else {
    buf = Buffer.from(data);
    toBuffer$2.readOnly = false;
  }

  return buf;
}

bufferUtil$1.exports = {
  concat: concat$1,
  mask: _mask,
  toArrayBuffer: toArrayBuffer$1,
  toBuffer: toBuffer$2,
  unmask: _unmask
};

/* istanbul ignore else  */
if (!process.env.WS_NO_BUFFER_UTIL) {
  try {
    const bufferUtil = require('bufferutil');

    mask = bufferUtil$1.exports.mask = function (source, mask, output, offset, length) {
      if (length < 48) _mask(source, mask, output, offset, length);
      else bufferUtil.mask(source, mask, output, offset, length);
    };

    unmask$1 = bufferUtil$1.exports.unmask = function (buffer, mask) {
      if (buffer.length < 32) _unmask(buffer, mask);
      else bufferUtil.unmask(buffer, mask);
    };
  } catch (e) {
    // Continue regardless of the error.
  }
}

var bufferUtilExports = bufferUtil$1.exports;

const kDone = Symbol('kDone');
const kRun = Symbol('kRun');

/**
 * A very simple job queue with adjustable concurrency. Adapted from
 * https://github.com/STRML/async-limiter
 */
let Limiter$1 = class Limiter {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(concurrency) {
    this[kDone] = () => {
      this.pending--;
      this[kRun]();
    };
    this.concurrency = concurrency || Infinity;
    this.jobs = [];
    this.pending = 0;
  }

  /**
   * Adds a job to the queue.
   *
   * @param {Function} job The job to run
   * @public
   */
  add(job) {
    this.jobs.push(job);
    this[kRun]();
  }

  /**
   * Removes a job from the queue and runs it if possible.
   *
   * @private
   */
  [kRun]() {
    if (this.pending === this.concurrency) return;

    if (this.jobs.length) {
      const job = this.jobs.shift();

      this.pending++;
      job(this[kDone]);
    }
  }
};

var limiter = Limiter$1;

const zlib = require$$0$2;

const bufferUtil = bufferUtilExports;
const Limiter = limiter;
const { kStatusCode: kStatusCode$2 } = constants;

const FastBuffer$1 = Buffer[Symbol.species];
const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
const kPerMessageDeflate = Symbol('permessage-deflate');
const kTotalLength = Symbol('total-length');
const kCallback = Symbol('callback');
const kBuffers = Symbol('buffers');
const kError$1 = Symbol('error');

//
// We limit zlib concurrency, which prevents severe memory fragmentation
// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
// and https://github.com/websockets/ws/issues/1202
//
// Intentionally global; it's the global thread pool that's an issue.
//
let zlibLimiter;

/**
 * permessage-deflate implementation.
 */
let PerMessageDeflate$4 = class PerMessageDeflate {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} [options] Configuration options
   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
   *     for, or request, a custom client window size
   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
   *     acknowledge disabling of client context takeover
   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
   *     calls to zlib
   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
   *     use of a custom server window size
   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
   *     disabling of server context takeover
   * @param {Number} [options.threshold=1024] Size (in bytes) below which
   *     messages should not be compressed if context takeover is disabled
   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
   *     deflate
   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
   *     inflate
   * @param {Boolean} [isServer=false] Create the instance in either server or
   *     client mode
   * @param {Number} [maxPayload=0] The maximum allowed message length
   */
  constructor(options, isServer, maxPayload) {
    this._maxPayload = maxPayload | 0;
    this._options = options || {};
    this._threshold =
      this._options.threshold !== undefined ? this._options.threshold : 1024;
    this._isServer = !!isServer;
    this._deflate = null;
    this._inflate = null;

    this.params = null;

    if (!zlibLimiter) {
      const concurrency =
        this._options.concurrencyLimit !== undefined
          ? this._options.concurrencyLimit
          : 10;
      zlibLimiter = new Limiter(concurrency);
    }
  }

  /**
   * @type {String}
   */
  static get extensionName() {
    return 'permessage-deflate';
  }

  /**
   * Create an extension negotiation offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  offer() {
    const params = {};

    if (this._options.serverNoContextTakeover) {
      params.server_no_context_takeover = true;
    }
    if (this._options.clientNoContextTakeover) {
      params.client_no_context_takeover = true;
    }
    if (this._options.serverMaxWindowBits) {
      params.server_max_window_bits = this._options.serverMaxWindowBits;
    }
    if (this._options.clientMaxWindowBits) {
      params.client_max_window_bits = this._options.clientMaxWindowBits;
    } else if (this._options.clientMaxWindowBits == null) {
      params.client_max_window_bits = true;
    }

    return params;
  }

  /**
   * Accept an extension negotiation offer/response.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Object} Accepted configuration
   * @public
   */
  accept(configurations) {
    configurations = this.normalizeParams(configurations);

    this.params = this._isServer
      ? this.acceptAsServer(configurations)
      : this.acceptAsClient(configurations);

    return this.params;
  }

  /**
   * Releases all resources used by the extension.
   *
   * @public
   */
  cleanup() {
    if (this._inflate) {
      this._inflate.close();
      this._inflate = null;
    }

    if (this._deflate) {
      const callback = this._deflate[kCallback];

      this._deflate.close();
      this._deflate = null;

      if (callback) {
        callback(
          new Error(
            'The deflate stream was closed while data was being processed'
          )
        );
      }
    }
  }

  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsServer(offers) {
    const opts = this._options;
    const accepted = offers.find((params) => {
      if (
        (opts.serverNoContextTakeover === false &&
          params.server_no_context_takeover) ||
        (params.server_max_window_bits &&
          (opts.serverMaxWindowBits === false ||
            (typeof opts.serverMaxWindowBits === 'number' &&
              opts.serverMaxWindowBits > params.server_max_window_bits))) ||
        (typeof opts.clientMaxWindowBits === 'number' &&
          !params.client_max_window_bits)
      ) {
        return false;
      }

      return true;
    });

    if (!accepted) {
      throw new Error('None of the extension offers can be accepted');
    }

    if (opts.serverNoContextTakeover) {
      accepted.server_no_context_takeover = true;
    }
    if (opts.clientNoContextTakeover) {
      accepted.client_no_context_takeover = true;
    }
    if (typeof opts.serverMaxWindowBits === 'number') {
      accepted.server_max_window_bits = opts.serverMaxWindowBits;
    }
    if (typeof opts.clientMaxWindowBits === 'number') {
      accepted.client_max_window_bits = opts.clientMaxWindowBits;
    } else if (
      accepted.client_max_window_bits === true ||
      opts.clientMaxWindowBits === false
    ) {
      delete accepted.client_max_window_bits;
    }

    return accepted;
  }

  /**
   * Accept the extension negotiation response.
   *
   * @param {Array} response The extension negotiation response
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsClient(response) {
    const params = response[0];

    if (
      this._options.clientNoContextTakeover === false &&
      params.client_no_context_takeover
    ) {
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    }

    if (!params.client_max_window_bits) {
      if (typeof this._options.clientMaxWindowBits === 'number') {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      }
    } else if (
      this._options.clientMaxWindowBits === false ||
      (typeof this._options.clientMaxWindowBits === 'number' &&
        params.client_max_window_bits > this._options.clientMaxWindowBits)
    ) {
      throw new Error(
        'Unexpected or invalid parameter "client_max_window_bits"'
      );
    }

    return params;
  }

  /**
   * Normalize parameters.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Array} The offers/response with normalized parameters
   * @private
   */
  normalizeParams(configurations) {
    configurations.forEach((params) => {
      Object.keys(params).forEach((key) => {
        let value = params[key];

        if (value.length > 1) {
          throw new Error(`Parameter "${key}" must have only a single value`);
        }

        value = value[0];

        if (key === 'client_max_window_bits') {
          if (value !== true) {
            const num = +value;
            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
            value = num;
          } else if (!this._isServer) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else if (key === 'server_max_window_bits') {
          const num = +value;
          if (!Number.isInteger(num) || num < 8 || num > 15) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
          value = num;
        } else if (
          key === 'client_no_context_takeover' ||
          key === 'server_no_context_takeover'
        ) {
          if (value !== true) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else {
          throw new Error(`Unknown parameter "${key}"`);
        }

        params[key] = value;
      });
    });

    return configurations;
  }

  /**
   * Decompress data. Concurrency limited.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  decompress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._decompress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Compress data. Concurrency limited.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  compress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._compress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _decompress(data, fin, callback) {
    const endpoint = this._isServer ? 'client' : 'server';

    if (!this._inflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._inflate = zlib.createInflateRaw({
        ...this._options.zlibInflateOptions,
        windowBits
      });
      this._inflate[kPerMessageDeflate] = this;
      this._inflate[kTotalLength] = 0;
      this._inflate[kBuffers] = [];
      this._inflate.on('error', inflateOnError);
      this._inflate.on('data', inflateOnData);
    }

    this._inflate[kCallback] = callback;

    this._inflate.write(data);
    if (fin) this._inflate.write(TRAILER);

    this._inflate.flush(() => {
      const err = this._inflate[kError$1];

      if (err) {
        this._inflate.close();
        this._inflate = null;
        callback(err);
        return;
      }

      const data = bufferUtil.concat(
        this._inflate[kBuffers],
        this._inflate[kTotalLength]
      );

      if (this._inflate._readableState.endEmitted) {
        this._inflate.close();
        this._inflate = null;
      } else {
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];

        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._inflate.reset();
        }
      }

      callback(null, data);
    });
  }

  /**
   * Compress data.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _compress(data, fin, callback) {
    const endpoint = this._isServer ? 'server' : 'client';

    if (!this._deflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._deflate = zlib.createDeflateRaw({
        ...this._options.zlibDeflateOptions,
        windowBits
      });

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      this._deflate.on('data', deflateOnData);
    }

    this._deflate[kCallback] = callback;

    this._deflate.write(data);
    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
      if (!this._deflate) {
        //
        // The deflate stream was closed while data was being processed.
        //
        return;
      }

      let data = bufferUtil.concat(
        this._deflate[kBuffers],
        this._deflate[kTotalLength]
      );

      if (fin) {
        data = new FastBuffer$1(data.buffer, data.byteOffset, data.length - 4);
      }

      //
      // Ensure that the callback will not be called again in
      // `PerMessageDeflate#cleanup()`.
      //
      this._deflate[kCallback] = null;

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
        this._deflate.reset();
      }

      callback(null, data);
    });
  }
};

var permessageDeflate = PerMessageDeflate$4;

/**
 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function deflateOnData(chunk) {
  this[kBuffers].push(chunk);
  this[kTotalLength] += chunk.length;
}

/**
 * The listener of the `zlib.InflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function inflateOnData(chunk) {
  this[kTotalLength] += chunk.length;

  if (
    this[kPerMessageDeflate]._maxPayload < 1 ||
    this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
  ) {
    this[kBuffers].push(chunk);
    return;
  }

  this[kError$1] = new RangeError('Max payload size exceeded');
  this[kError$1].code = 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH';
  this[kError$1][kStatusCode$2] = 1009;
  this.removeListener('data', inflateOnData);
  this.reset();
}

/**
 * The listener of the `zlib.InflateRaw` stream `'error'` event.
 *
 * @param {Error} err The emitted error
 * @private
 */
function inflateOnError(err) {
  //
  // There is no need to call `Zlib#close()` as the handle is automatically
  // closed when an error is emitted.
  //
  this[kPerMessageDeflate]._inflate = null;
  err[kStatusCode$2] = 1007;
  this[kCallback](err);
}

var validation = {exports: {}};

var isValidUTF8_1;

const { isUtf8 } = require$$0$3;

const { hasBlob } = constants;

//
// Allowed token characters:
//
// '!', '#', '$', '%', '&', ''', '*', '+', '-',
// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
//
// tokenChars[32] === 0 // ' '
// tokenChars[33] === 1 // '!'
// tokenChars[34] === 0 // '"'
// ...
//
// prettier-ignore
const tokenChars$2 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];

/**
 * Checks if a status code is allowed in a close frame.
 *
 * @param {Number} code The status code
 * @return {Boolean} `true` if the status code is valid, else `false`
 * @public
 */
function isValidStatusCode$2(code) {
  return (
    (code >= 1000 &&
      code <= 1014 &&
      code !== 1004 &&
      code !== 1005 &&
      code !== 1006) ||
    (code >= 3000 && code <= 4999)
  );
}

/**
 * Checks if a given buffer contains only correct UTF-8.
 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
 * Markus Kuhn.
 *
 * @param {Buffer} buf The buffer to check
 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
 * @public
 */
function _isValidUTF8(buf) {
  const len = buf.length;
  let i = 0;

  while (i < len) {
    if ((buf[i] & 0x80) === 0) {
      // 0xxxxxxx
      i++;
    } else if ((buf[i] & 0xe0) === 0xc0) {
      // 110xxxxx 10xxxxxx
      if (
        i + 1 === len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i] & 0xfe) === 0xc0 // Overlong
      ) {
        return false;
      }

      i += 2;
    } else if ((buf[i] & 0xf0) === 0xe0) {
      // 1110xxxx 10xxxxxx 10xxxxxx
      if (
        i + 2 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80) || // Overlong
        (buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0) // Surrogate (U+D800 - U+DFFF)
      ) {
        return false;
      }

      i += 3;
    } else if ((buf[i] & 0xf8) === 0xf0) {
      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      if (
        i + 3 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i + 3] & 0xc0) !== 0x80 ||
        (buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80) || // Overlong
        (buf[i] === 0xf4 && buf[i + 1] > 0x8f) ||
        buf[i] > 0xf4 // > U+10FFFF
      ) {
        return false;
      }

      i += 4;
    } else {
      return false;
    }
  }

  return true;
}

/**
 * Determines whether a value is a `Blob`.
 *
 * @param {*} value The value to be tested
 * @return {Boolean} `true` if `value` is a `Blob`, else `false`
 * @private
 */
function isBlob$2(value) {
  return (
    hasBlob &&
    typeof value === 'object' &&
    typeof value.arrayBuffer === 'function' &&
    typeof value.type === 'string' &&
    typeof value.stream === 'function' &&
    (value[Symbol.toStringTag] === 'Blob' ||
      value[Symbol.toStringTag] === 'File')
  );
}

validation.exports = {
  isBlob: isBlob$2,
  isValidStatusCode: isValidStatusCode$2,
  isValidUTF8: _isValidUTF8,
  tokenChars: tokenChars$2
};

if (isUtf8) {
  isValidUTF8_1 = validation.exports.isValidUTF8 = function (buf) {
    return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
  };
} /* istanbul ignore else  */ else if (!process.env.WS_NO_UTF_8_VALIDATE) {
  try {
    const isValidUTF8 = require('utf-8-validate');

    isValidUTF8_1 = validation.exports.isValidUTF8 = function (buf) {
      return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
    };
  } catch (e) {
    // Continue regardless of the error.
  }
}

var validationExports = validation.exports;

const { Writable } = require$$0$4;

const PerMessageDeflate$3 = permessageDeflate;
const {
  BINARY_TYPES: BINARY_TYPES$1,
  EMPTY_BUFFER: EMPTY_BUFFER$2,
  kStatusCode: kStatusCode$1,
  kWebSocket: kWebSocket$3
} = constants;
const { concat, toArrayBuffer, unmask } = bufferUtilExports;
const { isValidStatusCode: isValidStatusCode$1, isValidUTF8 } = validationExports;

const FastBuffer = Buffer[Symbol.species];

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;
const DEFER_EVENT = 6;

/**
 * HyBi Receiver implementation.
 *
 * @extends Writable
 */
let Receiver$1 = class Receiver extends Writable {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} [options] Options object
   * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
   *     multiple times in the same tick
   * @param {String} [options.binaryType=nodebuffer] The type for binary data
   * @param {Object} [options.extensions] An object containing the negotiated
   *     extensions
   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
   *     client or server mode
   * @param {Number} [options.maxPayload=0] The maximum allowed message length
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   */
  constructor(options = {}) {
    super();

    this._allowSynchronousEvents =
      options.allowSynchronousEvents !== undefined
        ? options.allowSynchronousEvents
        : true;
    this._binaryType = options.binaryType || BINARY_TYPES$1[0];
    this._extensions = options.extensions || {};
    this._isServer = !!options.isServer;
    this._maxPayload = options.maxPayload | 0;
    this._skipUTF8Validation = !!options.skipUTF8Validation;
    this[kWebSocket$3] = undefined;

    this._bufferedBytes = 0;
    this._buffers = [];

    this._compressed = false;
    this._payloadLength = 0;
    this._mask = undefined;
    this._fragmented = 0;
    this._masked = false;
    this._fin = false;
    this._opcode = 0;

    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragments = [];

    this._errored = false;
    this._loop = false;
    this._state = GET_INFO;
  }

  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   * @private
   */
  _write(chunk, encoding, cb) {
    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

    this._bufferedBytes += chunk.length;
    this._buffers.push(chunk);
    this.startLoop(cb);
  }

  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(n) {
    this._bufferedBytes -= n;

    if (n === this._buffers[0].length) return this._buffers.shift();

    if (n < this._buffers[0].length) {
      const buf = this._buffers[0];
      this._buffers[0] = new FastBuffer(
        buf.buffer,
        buf.byteOffset + n,
        buf.length - n
      );

      return new FastBuffer(buf.buffer, buf.byteOffset, n);
    }

    const dst = Buffer.allocUnsafe(n);

    do {
      const buf = this._buffers[0];
      const offset = dst.length - n;

      if (n >= buf.length) {
        dst.set(this._buffers.shift(), offset);
      } else {
        dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
        this._buffers[0] = new FastBuffer(
          buf.buffer,
          buf.byteOffset + n,
          buf.length - n
        );
      }

      n -= buf.length;
    } while (n > 0);

    return dst;
  }

  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(cb) {
    this._loop = true;

    do {
      switch (this._state) {
        case GET_INFO:
          this.getInfo(cb);
          break;
        case GET_PAYLOAD_LENGTH_16:
          this.getPayloadLength16(cb);
          break;
        case GET_PAYLOAD_LENGTH_64:
          this.getPayloadLength64(cb);
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          this.getData(cb);
          break;
        case INFLATING:
        case DEFER_EVENT:
          this._loop = false;
          return;
      }
    } while (this._loop);

    if (!this._errored) cb();
  }

  /**
   * Reads the first two bytes of a frame.
   *
   * @param {Function} cb Callback
   * @private
   */
  getInfo(cb) {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    const buf = this.consume(2);

    if ((buf[0] & 0x30) !== 0x00) {
      const error = this.createError(
        RangeError,
        'RSV2 and RSV3 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_2_3'
      );

      cb(error);
      return;
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate$3.extensionName]) {
      const error = this.createError(
        RangeError,
        'RSV1 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_1'
      );

      cb(error);
      return;
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        const error = this.createError(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );

        cb(error);
        return;
      }

      if (!this._fragmented) {
        const error = this.createError(
          RangeError,
          'invalid opcode 0',
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );

        cb(error);
        return;
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        const error = this.createError(
          RangeError,
          `invalid opcode ${this._opcode}`,
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );

        cb(error);
        return;
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        const error = this.createError(
          RangeError,
          'FIN must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_FIN'
        );

        cb(error);
        return;
      }

      if (compressed) {
        const error = this.createError(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );

        cb(error);
        return;
      }

      if (
        this._payloadLength > 0x7d ||
        (this._opcode === 0x08 && this._payloadLength === 1)
      ) {
        const error = this.createError(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          true,
          1002,
          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
        );

        cb(error);
        return;
      }
    } else {
      const error = this.createError(
        RangeError,
        `invalid opcode ${this._opcode}`,
        true,
        1002,
        'WS_ERR_INVALID_OPCODE'
      );

      cb(error);
      return;
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._isServer) {
      if (!this._masked) {
        const error = this.createError(
          RangeError,
          'MASK must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_MASK'
        );

        cb(error);
        return;
      }
    } else if (this._masked) {
      const error = this.createError(
        RangeError,
        'MASK must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_MASK'
      );

      cb(error);
      return;
    }

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
    else this.haveLength(cb);
  }

  /**
   * Gets extended payload length (7+16).
   *
   * @param {Function} cb Callback
   * @private
   */
  getPayloadLength16(cb) {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    this._payloadLength = this.consume(2).readUInt16BE(0);
    this.haveLength(cb);
  }

  /**
   * Gets extended payload length (7+64).
   *
   * @param {Function} cb Callback
   * @private
   */
  getPayloadLength64(cb) {
    if (this._bufferedBytes < 8) {
      this._loop = false;
      return;
    }

    const buf = this.consume(8);
    const num = buf.readUInt32BE(0);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      const error = this.createError(
        RangeError,
        'Unsupported WebSocket frame: payload length > 2^53 - 1',
        false,
        1009,
        'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
      );

      cb(error);
      return;
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
    this.haveLength(cb);
  }

  /**
   * Payload length has been read.
   *
   * @param {Function} cb Callback
   * @private
   */
  haveLength(cb) {
    if (this._payloadLength && this._opcode < 0x08) {
      this._totalPayloadLength += this._payloadLength;
      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
        const error = this.createError(
          RangeError,
          'Max payload size exceeded',
          false,
          1009,
          'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
        );

        cb(error);
        return;
      }
    }

    if (this._masked) this._state = GET_MASK;
    else this._state = GET_DATA;
  }

  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = false;
      return;
    }

    this._mask = this.consume(4);
    this._state = GET_DATA;
  }

  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @private
   */
  getData(cb) {
    let data = EMPTY_BUFFER$2;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);

      if (
        this._masked &&
        (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0
      ) {
        unmask(data, this._mask);
      }
    }

    if (this._opcode > 0x07) {
      this.controlMessage(data, cb);
      return;
    }

    if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data, cb);
      return;
    }

    if (data.length) {
      //
      // This message is not compressed so its length is the sum of the payload
      // length of all fragments.
      //
      this._messageLength = this._totalPayloadLength;
      this._fragments.push(data);
    }

    this.dataMessage(cb);
  }

  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(data, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate$3.extensionName];

    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
      if (err) return cb(err);

      if (buf.length) {
        this._messageLength += buf.length;
        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
          const error = this.createError(
            RangeError,
            'Max payload size exceeded',
            false,
            1009,
            'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
          );

          cb(error);
          return;
        }

        this._fragments.push(buf);
      }

      this.dataMessage(cb);
      if (this._state === GET_INFO) this.startLoop(cb);
    });
  }

  /**
   * Handles a data message.
   *
   * @param {Function} cb Callback
   * @private
   */
  dataMessage(cb) {
    if (!this._fin) {
      this._state = GET_INFO;
      return;
    }

    const messageLength = this._messageLength;
    const fragments = this._fragments;

    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragmented = 0;
    this._fragments = [];

    if (this._opcode === 2) {
      let data;

      if (this._binaryType === 'nodebuffer') {
        data = concat(fragments, messageLength);
      } else if (this._binaryType === 'arraybuffer') {
        data = toArrayBuffer(concat(fragments, messageLength));
      } else if (this._binaryType === 'blob') {
        data = new Blob(fragments);
      } else {
        data = fragments;
      }

      if (this._allowSynchronousEvents) {
        this.emit('message', data, true);
        this._state = GET_INFO;
      } else {
        this._state = DEFER_EVENT;
        setImmediate(() => {
          this.emit('message', data, true);
          this._state = GET_INFO;
          this.startLoop(cb);
        });
      }
    } else {
      const buf = concat(fragments, messageLength);

      if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
        const error = this.createError(
          Error,
          'invalid UTF-8 sequence',
          true,
          1007,
          'WS_ERR_INVALID_UTF8'
        );

        cb(error);
        return;
      }

      if (this._state === INFLATING || this._allowSynchronousEvents) {
        this.emit('message', buf, false);
        this._state = GET_INFO;
      } else {
        this._state = DEFER_EVENT;
        setImmediate(() => {
          this.emit('message', buf, false);
          this._state = GET_INFO;
          this.startLoop(cb);
        });
      }
    }
  }

  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(data, cb) {
    if (this._opcode === 0x08) {
      if (data.length === 0) {
        this._loop = false;
        this.emit('conclude', 1005, EMPTY_BUFFER$2);
        this.end();
      } else {
        const code = data.readUInt16BE(0);

        if (!isValidStatusCode$1(code)) {
          const error = this.createError(
            RangeError,
            `invalid status code ${code}`,
            true,
            1002,
            'WS_ERR_INVALID_CLOSE_CODE'
          );

          cb(error);
          return;
        }

        const buf = new FastBuffer(
          data.buffer,
          data.byteOffset + 2,
          data.length - 2
        );

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          const error = this.createError(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );

          cb(error);
          return;
        }

        this._loop = false;
        this.emit('conclude', code, buf);
        this.end();
      }

      this._state = GET_INFO;
      return;
    }

    if (this._allowSynchronousEvents) {
      this.emit(this._opcode === 0x09 ? 'ping' : 'pong', data);
      this._state = GET_INFO;
    } else {
      this._state = DEFER_EVENT;
      setImmediate(() => {
        this.emit(this._opcode === 0x09 ? 'ping' : 'pong', data);
        this._state = GET_INFO;
        this.startLoop(cb);
      });
    }
  }

  /**
   * Builds an error object.
   *
   * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
   * @param {String} message The error message
   * @param {Boolean} prefix Specifies whether or not to add a default prefix to
   *     `message`
   * @param {Number} statusCode The status code
   * @param {String} errorCode The exposed error code
   * @return {(Error|RangeError)} The error
   * @private
   */
  createError(ErrorCtor, message, prefix, statusCode, errorCode) {
    this._loop = false;
    this._errored = true;

    const err = new ErrorCtor(
      prefix ? `Invalid WebSocket frame: ${message}` : message
    );

    Error.captureStackTrace(err, this.createError);
    err.code = errorCode;
    err[kStatusCode$1] = statusCode;
    return err;
  }
};

var receiver = Receiver$1;

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Duplex" }] */
const { randomFillSync } = require$$1$2;

const PerMessageDeflate$2 = permessageDeflate;
const { EMPTY_BUFFER: EMPTY_BUFFER$1, kWebSocket: kWebSocket$2, NOOP: NOOP$1 } = constants;
const { isBlob: isBlob$1, isValidStatusCode } = validationExports;
const { mask: applyMask, toBuffer: toBuffer$1 } = bufferUtilExports;

const kByteLength = Symbol('kByteLength');
const maskBuffer = Buffer.alloc(4);
const RANDOM_POOL_SIZE = 8 * 1024;
let randomPool;
let randomPoolPointer = RANDOM_POOL_SIZE;

const DEFAULT = 0;
const DEFLATING = 1;
const GET_BLOB_DATA = 2;

/**
 * HyBi Sender implementation.
 */
let Sender$1 = class Sender {
  /**
   * Creates a Sender instance.
   *
   * @param {Duplex} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Function} [generateMask] The function used to generate the masking
   *     key
   */
  constructor(socket, extensions, generateMask) {
    this._extensions = extensions || {};

    if (generateMask) {
      this._generateMask = generateMask;
      this._maskBuffer = Buffer.alloc(4);
    }

    this._socket = socket;

    this._firstFragment = true;
    this._compress = false;

    this._bufferedBytes = 0;
    this._queue = [];
    this._state = DEFAULT;
    this.onerror = NOOP$1;
    this[kWebSocket$2] = undefined;
  }

  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {(Buffer|String)} data The data to frame
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @return {(Buffer|String)[]} The framed data
   * @public
   */
  static frame(data, options) {
    let mask;
    let merge = false;
    let offset = 2;
    let skipMasking = false;

    if (options.mask) {
      mask = options.maskBuffer || maskBuffer;

      if (options.generateMask) {
        options.generateMask(mask);
      } else {
        if (randomPoolPointer === RANDOM_POOL_SIZE) {
          /* istanbul ignore else  */
          if (randomPool === undefined) {
            //
            // This is lazily initialized because server-sent frames must not
            // be masked so it may never be used.
            //
            randomPool = Buffer.alloc(RANDOM_POOL_SIZE);
          }

          randomFillSync(randomPool, 0, RANDOM_POOL_SIZE);
          randomPoolPointer = 0;
        }

        mask[0] = randomPool[randomPoolPointer++];
        mask[1] = randomPool[randomPoolPointer++];
        mask[2] = randomPool[randomPoolPointer++];
        mask[3] = randomPool[randomPoolPointer++];
      }

      skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
      offset = 6;
    }

    let dataLength;

    if (typeof data === 'string') {
      if (
        (!options.mask || skipMasking) &&
        options[kByteLength] !== undefined
      ) {
        dataLength = options[kByteLength];
      } else {
        data = Buffer.from(data);
        dataLength = data.length;
      }
    } else {
      dataLength = data.length;
      merge = options.mask && options.readOnly && !skipMasking;
    }

    let payloadLength = dataLength;

    if (dataLength >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (dataLength > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);

    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;

    target[1] = payloadLength;

    if (payloadLength === 126) {
      target.writeUInt16BE(dataLength, 2);
    } else if (payloadLength === 127) {
      target[2] = target[3] = 0;
      target.writeUIntBE(dataLength, 4, 6);
    }

    if (!options.mask) return [target, data];

    target[1] |= 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (skipMasking) return [target, data];

    if (merge) {
      applyMask(data, mask, target, offset, dataLength);
      return [target];
    }

    applyMask(data, mask, data, 0, dataLength);
    return [target, data];
  }

  /**
   * Sends a close message to the other peer.
   *
   * @param {Number} [code] The status code component of the body
   * @param {(String|Buffer)} [data] The message component of the body
   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
   * @param {Function} [cb] Callback
   * @public
   */
  close(code, data, mask, cb) {
    let buf;

    if (code === undefined) {
      buf = EMPTY_BUFFER$1;
    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
      throw new TypeError('First argument must be a valid error code number');
    } else if (data === undefined || !data.length) {
      buf = Buffer.allocUnsafe(2);
      buf.writeUInt16BE(code, 0);
    } else {
      const length = Buffer.byteLength(data);

      if (length > 123) {
        throw new RangeError('The message must not be greater than 123 bytes');
      }

      buf = Buffer.allocUnsafe(2 + length);
      buf.writeUInt16BE(code, 0);

      if (typeof data === 'string') {
        buf.write(data, 2);
      } else {
        buf.set(data, 2);
      }
    }

    const options = {
      [kByteLength]: buf.length,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x08,
      readOnly: false,
      rsv1: false
    };

    if (this._state !== DEFAULT) {
      this.enqueue([this.dispatch, buf, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(buf, options), cb);
    }
  }

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  ping(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else if (isBlob$1(data)) {
      byteLength = data.size;
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x09,
      readOnly,
      rsv1: false
    };

    if (isBlob$1(data)) {
      if (this._state !== DEFAULT) {
        this.enqueue([this.getBlobData, data, false, options, cb]);
      } else {
        this.getBlobData(data, false, options, cb);
      }
    } else if (this._state !== DEFAULT) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  pong(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else if (isBlob$1(data)) {
      byteLength = data.size;
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x0a,
      readOnly,
      rsv1: false
    };

    if (isBlob$1(data)) {
      if (this._state !== DEFAULT) {
        this.enqueue([this.getBlobData, data, false, options, cb]);
      } else {
        this.getBlobData(data, false, options, cb);
      }
    } else if (this._state !== DEFAULT) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Function} [cb] Callback
   * @public
   */
  send(data, options, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate$2.extensionName];
    let opcode = options.binary ? 2 : 1;
    let rsv1 = options.compress;

    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else if (isBlob$1(data)) {
      byteLength = data.size;
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (this._firstFragment) {
      this._firstFragment = false;
      if (
        rsv1 &&
        perMessageDeflate &&
        perMessageDeflate.params[
          perMessageDeflate._isServer
            ? 'server_no_context_takeover'
            : 'client_no_context_takeover'
        ]
      ) {
        rsv1 = byteLength >= perMessageDeflate._threshold;
      }
      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    const opts = {
      [kByteLength]: byteLength,
      fin: options.fin,
      generateMask: this._generateMask,
      mask: options.mask,
      maskBuffer: this._maskBuffer,
      opcode,
      readOnly,
      rsv1
    };

    if (isBlob$1(data)) {
      if (this._state !== DEFAULT) {
        this.enqueue([this.getBlobData, data, this._compress, opts, cb]);
      } else {
        this.getBlobData(data, this._compress, opts, cb);
      }
    } else if (this._state !== DEFAULT) {
      this.enqueue([this.dispatch, data, this._compress, opts, cb]);
    } else {
      this.dispatch(data, this._compress, opts, cb);
    }
  }

  /**
   * Gets the contents of a blob as binary data.
   *
   * @param {Blob} blob The blob
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     the data
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  getBlobData(blob, compress, options, cb) {
    this._bufferedBytes += options[kByteLength];
    this._state = GET_BLOB_DATA;

    blob
      .arrayBuffer()
      .then((arrayBuffer) => {
        if (this._socket.destroyed) {
          const err = new Error(
            'The socket was closed while the blob was being read'
          );

          //
          // `callCallbacks` is called in the next tick to ensure that errors
          // that might be thrown in the callbacks behave like errors thrown
          // outside the promise chain.
          //
          process.nextTick(callCallbacks, this, err, cb);
          return;
        }

        this._bufferedBytes -= options[kByteLength];
        const data = toBuffer$1(arrayBuffer);

        if (!compress) {
          this._state = DEFAULT;
          this.sendFrame(Sender.frame(data, options), cb);
          this.dequeue();
        } else {
          this.dispatch(data, compress, options, cb);
        }
      })
      .catch((err) => {
        //
        // `onError` is called in the next tick for the same reason that
        // `callCallbacks` above is.
        //
        process.nextTick(onError, this, err, cb);
      });
  }

  /**
   * Dispatches a message.
   *
   * @param {(Buffer|String)} data The message to send
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     `data`
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate$2.extensionName];

    this._bufferedBytes += options[kByteLength];
    this._state = DEFLATING;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      if (this._socket.destroyed) {
        const err = new Error(
          'The socket was closed while data was being compressed'
        );

        callCallbacks(this, err, cb);
        return;
      }

      this._bufferedBytes -= options[kByteLength];
      this._state = DEFAULT;
      options.readOnly = false;
      this.sendFrame(Sender.frame(buf, options), cb);
      this.dequeue();
    });
  }

  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    while (this._state === DEFAULT && this._queue.length) {
      const params = this._queue.shift();

      this._bufferedBytes -= params[3][kByteLength];
      Reflect.apply(params[0], this, params.slice(1));
    }
  }

  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(params) {
    this._bufferedBytes += params[3][kByteLength];
    this._queue.push(params);
  }

  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} [cb] Callback
   * @private
   */
  sendFrame(list, cb) {
    if (list.length === 2) {
      this._socket.cork();
      this._socket.write(list[0]);
      this._socket.write(list[1], cb);
      this._socket.uncork();
    } else {
      this._socket.write(list[0], cb);
    }
  }
};

var sender = Sender$1;

/**
 * Calls queued callbacks with an error.
 *
 * @param {Sender} sender The `Sender` instance
 * @param {Error} err The error to call the callbacks with
 * @param {Function} [cb] The first callback
 * @private
 */
function callCallbacks(sender, err, cb) {
  if (typeof cb === 'function') cb(err);

  for (let i = 0; i < sender._queue.length; i++) {
    const params = sender._queue[i];
    const callback = params[params.length - 1];

    if (typeof callback === 'function') callback(err);
  }
}

/**
 * Handles a `Sender` error.
 *
 * @param {Sender} sender The `Sender` instance
 * @param {Error} err The error
 * @param {Function} [cb] The first pending callback
 * @private
 */
function onError(sender, err, cb) {
  callCallbacks(sender, err, cb);
  sender.onerror(err);
}

const { kForOnEventAttribute: kForOnEventAttribute$1, kListener: kListener$1 } = constants;

const kCode = Symbol('kCode');
const kData = Symbol('kData');
const kError = Symbol('kError');
const kMessage = Symbol('kMessage');
const kReason = Symbol('kReason');
const kTarget = Symbol('kTarget');
const kType = Symbol('kType');
const kWasClean = Symbol('kWasClean');

/**
 * Class representing an event.
 */
class Event {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @throws {TypeError} If the `type` argument is not specified
   */
  constructor(type) {
    this[kTarget] = null;
    this[kType] = type;
  }

  /**
   * @type {*}
   */
  get target() {
    return this[kTarget];
  }

  /**
   * @type {String}
   */
  get type() {
    return this[kType];
  }
}

Object.defineProperty(Event.prototype, 'target', { enumerable: true });
Object.defineProperty(Event.prototype, 'type', { enumerable: true });

/**
 * Class representing a close event.
 *
 * @extends Event
 */
class CloseEvent extends Event {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {Number} [options.code=0] The status code explaining why the
   *     connection was closed
   * @param {String} [options.reason=''] A human-readable string explaining why
   *     the connection was closed
   * @param {Boolean} [options.wasClean=false] Indicates whether or not the
   *     connection was cleanly closed
   */
  constructor(type, options = {}) {
    super(type);

    this[kCode] = options.code === undefined ? 0 : options.code;
    this[kReason] = options.reason === undefined ? '' : options.reason;
    this[kWasClean] = options.wasClean === undefined ? false : options.wasClean;
  }

  /**
   * @type {Number}
   */
  get code() {
    return this[kCode];
  }

  /**
   * @type {String}
   */
  get reason() {
    return this[kReason];
  }

  /**
   * @type {Boolean}
   */
  get wasClean() {
    return this[kWasClean];
  }
}

Object.defineProperty(CloseEvent.prototype, 'code', { enumerable: true });
Object.defineProperty(CloseEvent.prototype, 'reason', { enumerable: true });
Object.defineProperty(CloseEvent.prototype, 'wasClean', { enumerable: true });

/**
 * Class representing an error event.
 *
 * @extends Event
 */
class ErrorEvent extends Event {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.error=null] The error that generated this event
   * @param {String} [options.message=''] The error message
   */
  constructor(type, options = {}) {
    super(type);

    this[kError] = options.error === undefined ? null : options.error;
    this[kMessage] = options.message === undefined ? '' : options.message;
  }

  /**
   * @type {*}
   */
  get error() {
    return this[kError];
  }

  /**
   * @type {String}
   */
  get message() {
    return this[kMessage];
  }
}

Object.defineProperty(ErrorEvent.prototype, 'error', { enumerable: true });
Object.defineProperty(ErrorEvent.prototype, 'message', { enumerable: true });

/**
 * Class representing a message event.
 *
 * @extends Event
 */
class MessageEvent extends Event {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.data=null] The message content
   */
  constructor(type, options = {}) {
    super(type);

    this[kData] = options.data === undefined ? null : options.data;
  }

  /**
   * @type {*}
   */
  get data() {
    return this[kData];
  }
}

Object.defineProperty(MessageEvent.prototype, 'data', { enumerable: true });

/**
 * This provides methods for emulating the `EventTarget` interface. It's not
 * meant to be used directly.
 *
 * @mixin
 */
const EventTarget = {
  /**
   * Register an event listener.
   *
   * @param {String} type A string representing the event type to listen for
   * @param {(Function|Object)} handler The listener to add
   * @param {Object} [options] An options object specifies characteristics about
   *     the event listener
   * @param {Boolean} [options.once=false] A `Boolean` indicating that the
   *     listener should be invoked at most once after being added. If `true`,
   *     the listener would be automatically removed when invoked.
   * @public
   */
  addEventListener(type, handler, options = {}) {
    for (const listener of this.listeners(type)) {
      if (
        !options[kForOnEventAttribute$1] &&
        listener[kListener$1] === handler &&
        !listener[kForOnEventAttribute$1]
      ) {
        return;
      }
    }

    let wrapper;

    if (type === 'message') {
      wrapper = function onMessage(data, isBinary) {
        const event = new MessageEvent('message', {
          data: isBinary ? data : data.toString()
        });

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else if (type === 'close') {
      wrapper = function onClose(code, message) {
        const event = new CloseEvent('close', {
          code,
          reason: message.toString(),
          wasClean: this._closeFrameReceived && this._closeFrameSent
        });

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else if (type === 'error') {
      wrapper = function onError(error) {
        const event = new ErrorEvent('error', {
          error,
          message: error.message
        });

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else if (type === 'open') {
      wrapper = function onOpen() {
        const event = new Event('open');

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else {
      return;
    }

    wrapper[kForOnEventAttribute$1] = !!options[kForOnEventAttribute$1];
    wrapper[kListener$1] = handler;

    if (options.once) {
      this.once(type, wrapper);
    } else {
      this.on(type, wrapper);
    }
  },

  /**
   * Remove an event listener.
   *
   * @param {String} type A string representing the event type to remove
   * @param {(Function|Object)} handler The listener to remove
   * @public
   */
  removeEventListener(type, handler) {
    for (const listener of this.listeners(type)) {
      if (listener[kListener$1] === handler && !listener[kForOnEventAttribute$1]) {
        this.removeListener(type, listener);
        break;
      }
    }
  }
};

var eventTarget = {
  CloseEvent,
  ErrorEvent,
  Event,
  EventTarget,
  MessageEvent
};

/**
 * Call an event listener
 *
 * @param {(Function|Object)} listener The listener to call
 * @param {*} thisArg The value to use as `this`` when calling the listener
 * @param {Event} event The event to pass to the listener
 * @private
 */
function callListener(listener, thisArg, event) {
  if (typeof listener === 'object' && listener.handleEvent) {
    listener.handleEvent.call(listener, event);
  } else {
    listener.call(thisArg, event);
  }
}

const { tokenChars: tokenChars$1 } = validationExports;

/**
 * Adds an offer to the map of extension offers or a parameter to the map of
 * parameters.
 *
 * @param {Object} dest The map of extension offers or parameters
 * @param {String} name The extension or parameter name
 * @param {(Object|Boolean|String)} elem The extension parameters or the
 *     parameter value
 * @private
 */
function push(dest, name, elem) {
  if (dest[name] === undefined) dest[name] = [elem];
  else dest[name].push(elem);
}

/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */
function parse$2(header) {
  const offers = Object.create(null);
  let params = Object.create(null);
  let mustUnescape = false;
  let isEscaping = false;
  let inQuotes = false;
  let extensionName;
  let paramName;
  let start = -1;
  let code = -1;
  let end = -1;
  let i = 0;

  for (; i < header.length; i++) {
    code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars$1[code] === 1) {
        if (start === -1) start = i;
      } else if (
        i !== 0 &&
        (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
      ) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        const name = header.slice(start, end);
        if (code === 0x2c) {
          push(offers, name, params);
          params = Object.create(null);
        } else {
          extensionName = name;
        }

        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars$1[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars$1[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (start === -1) start = i;
        else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars$1[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22 /* '"' */ && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c /* '\' */) {
          isEscaping = true;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars$1[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        let value = header.slice(start, end);
        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }
        push(params, paramName, value);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        paramName = undefined;
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
  }

  if (start === -1 || inQuotes || code === 0x20 || code === 0x09) {
    throw new SyntaxError('Unexpected end of input');
  }

  if (end === -1) end = i;
  const token = header.slice(start, end);
  if (extensionName === undefined) {
    push(offers, token, params);
  } else {
    if (paramName === undefined) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ''));
    } else {
      push(params, paramName, token);
    }
    push(offers, extensionName, params);
  }

  return offers;
}

/**
 * Builds the `Sec-WebSocket-Extensions` header field value.
 *
 * @param {Object} extensions The map of extensions and parameters to format
 * @return {String} A string representing the given object
 * @public
 */
function format$1(extensions) {
  return Object.keys(extensions)
    .map((extension) => {
      let configurations = extensions[extension];
      if (!Array.isArray(configurations)) configurations = [configurations];
      return configurations
        .map((params) => {
          return [extension]
            .concat(
              Object.keys(params).map((k) => {
                let values = params[k];
                if (!Array.isArray(values)) values = [values];
                return values
                  .map((v) => (v === true ? k : `${k}=${v}`))
                  .join('; ');
              })
            )
            .join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

var extension$1 = { format: format$1, parse: parse$2 };

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Duplex|Readable$", "caughtErrors": "none" }] */

const EventEmitter$1 = require$$0$5;
const https = require$$1$3;
const http$1 = require$$2$3;
const net = require$$3$3;
const tls = require$$4$3;
const { randomBytes, createHash: createHash$1 } = require$$1$2;
const { URL: URL$1 } = require$$7;

const PerMessageDeflate$1 = permessageDeflate;
const Receiver = receiver;
const Sender = sender;
const { isBlob } = validationExports;

const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  GUID: GUID$1,
  kForOnEventAttribute,
  kListener,
  kStatusCode,
  kWebSocket: kWebSocket$1,
  NOOP
} = constants;
const {
  EventTarget: { addEventListener, removeEventListener }
} = eventTarget;
const { format, parse: parse$1 } = extension$1;
const { toBuffer } = bufferUtilExports;

const closeTimeout = 30 * 1000;
const kAborted = Symbol('kAborted');
const protocolVersions = [8, 13];
const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
let WebSocket$2 = class WebSocket extends EventEmitter$1 {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(address, protocols, options) {
    super();

    this._binaryType = BINARY_TYPES[0];
    this._closeCode = 1006;
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = EMPTY_BUFFER;
    this._closeTimer = null;
    this._errorEmitted = false;
    this._extensions = {};
    this._paused = false;
    this._protocol = '';
    this._readyState = WebSocket.CONNECTING;
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      this._bufferedAmount = 0;
      this._isServer = false;
      this._redirects = 0;

      if (protocols === undefined) {
        protocols = [];
      } else if (!Array.isArray(protocols)) {
        if (typeof protocols === 'object' && protocols !== null) {
          options = protocols;
          protocols = [];
        } else {
          protocols = [protocols];
        }
      }

      initAsClient(this, address, protocols, options);
    } else {
      this._autoPong = options.autoPong;
      this._isServer = true;
    }
  }

  /**
   * For historical reasons, the custom "nodebuffer" type is used by the default
   * instead of "blob".
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }

  set binaryType(type) {
    if (!BINARY_TYPES.includes(type)) return;

    this._binaryType = type;

    //
    // Allow to change `binaryType` on the fly.
    //
    if (this._receiver) this._receiver._binaryType = type;
  }

  /**
   * @type {Number}
   */
  get bufferedAmount() {
    if (!this._socket) return this._bufferedAmount;

    return this._socket._writableState.length + this._sender._bufferedBytes;
  }

  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }

  /**
   * @type {Boolean}
   */
  get isPaused() {
    return this._paused;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onclose() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onerror() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onopen() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onmessage() {
    return null;
  }

  /**
   * @type {String}
   */
  get protocol() {
    return this._protocol;
  }

  /**
   * @type {Number}
   */
  get readyState() {
    return this._readyState;
  }

  /**
   * @type {String}
   */
  get url() {
    return this._url;
  }

  /**
   * Set up the socket and the internal resources.
   *
   * @param {Duplex} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Object} options Options object
   * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
   *     multiple times in the same tick
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Number} [options.maxPayload=0] The maximum allowed message size
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @private
   */
  setSocket(socket, head, options) {
    const receiver = new Receiver({
      allowSynchronousEvents: options.allowSynchronousEvents,
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxPayload: options.maxPayload,
      skipUTF8Validation: options.skipUTF8Validation
    });

    const sender = new Sender(socket, this._extensions, options.generateMask);

    this._receiver = receiver;
    this._sender = sender;
    this._socket = socket;

    receiver[kWebSocket$1] = this;
    sender[kWebSocket$1] = this;
    socket[kWebSocket$1] = this;

    receiver.on('conclude', receiverOnConclude);
    receiver.on('drain', receiverOnDrain);
    receiver.on('error', receiverOnError);
    receiver.on('message', receiverOnMessage);
    receiver.on('ping', receiverOnPing);
    receiver.on('pong', receiverOnPong);

    sender.onerror = senderOnError;

    //
    // These methods may not be available if `socket` is just a `Duplex`.
    //
    if (socket.setTimeout) socket.setTimeout(0);
    if (socket.setNoDelay) socket.setNoDelay();

    if (head.length > 0) socket.unshift(head);

    socket.on('close', socketOnClose);
    socket.on('data', socketOnData);
    socket.on('end', socketOnEnd);
    socket.on('error', socketOnError$1);

    this._readyState = WebSocket.OPEN;
    this.emit('open');
  }

  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    if (!this._socket) {
      this._readyState = WebSocket.CLOSED;
      this.emit('close', this._closeCode, this._closeMessage);
      return;
    }

    if (this._extensions[PerMessageDeflate$1.extensionName]) {
      this._extensions[PerMessageDeflate$1.extensionName].cleanup();
    }

    this._receiver.removeAllListeners();
    this._readyState = WebSocket.CLOSED;
    this.emit('close', this._closeCode, this._closeMessage);
  }

  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} [code] Status code explaining why the connection is closing
   * @param {(String|Buffer)} [data] The reason why the connection is
   *     closing
   * @public
   */
  close(code, data) {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      abortHandshake$1(this, this._req, msg);
      return;
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (
        this._closeFrameSent &&
        (this._closeFrameReceived || this._receiver._writableState.errorEmitted)
      ) {
        this._socket.end();
      }

      return;
    }

    this._readyState = WebSocket.CLOSING;
    this._sender.close(code, data, !this._isServer, (err) => {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;

      this._closeFrameSent = true;

      if (
        this._closeFrameReceived ||
        this._receiver._writableState.errorEmitted
      ) {
        this._socket.end();
      }
    });

    setCloseTimer(this);
  }

  /**
   * Pause the socket.
   *
   * @public
   */
  pause() {
    if (
      this.readyState === WebSocket.CONNECTING ||
      this.readyState === WebSocket.CLOSED
    ) {
      return;
    }

    this._paused = true;
    this._socket.pause();
  }

  /**
   * Send a ping.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the ping is sent
   * @public
   */
  ping(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.ping(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Send a pong.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the pong is sent
   * @public
   */
  pong(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.pong(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Resume the socket.
   *
   * @public
   */
  resume() {
    if (
      this.readyState === WebSocket.CONNECTING ||
      this.readyState === WebSocket.CLOSED
    ) {
      return;
    }

    this._paused = false;
    if (!this._receiver._writableState.needDrain) this._socket.resume();
  }

  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} [options] Options object
   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
   *     text
   * @param {Boolean} [options.compress] Specifies whether or not to compress
   *     `data`
   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when data is written out
   * @public
   */
  send(data, options, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    const opts = {
      binary: typeof data !== 'string',
      mask: !this._isServer,
      compress: true,
      fin: true,
      ...options
    };

    if (!this._extensions[PerMessageDeflate$1.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || EMPTY_BUFFER, opts, cb);
  }

  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      abortHandshake$1(this, this._req, msg);
      return;
    }

    if (this._socket) {
      this._readyState = WebSocket.CLOSING;
      this._socket.destroy();
    }
  }
};

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket$2, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket$2.prototype, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket$2, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket$2.prototype, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket$2, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket$2.prototype, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket$2, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket$2.prototype, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

[
  'binaryType',
  'bufferedAmount',
  'extensions',
  'isPaused',
  'protocol',
  'readyState',
  'url'
].forEach((property) => {
  Object.defineProperty(WebSocket$2.prototype, property, { enumerable: true });
});

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach((method) => {
  Object.defineProperty(WebSocket$2.prototype, `on${method}`, {
    enumerable: true,
    get() {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) return listener[kListener];
      }

      return null;
    },
    set(handler) {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) {
          this.removeListener(method, listener);
          break;
        }
      }

      if (typeof handler !== 'function') return;

      this.addEventListener(method, handler, {
        [kForOnEventAttribute]: true
      });
    }
  });
});

WebSocket$2.prototype.addEventListener = addEventListener;
WebSocket$2.prototype.removeEventListener = removeEventListener;

var websocket = WebSocket$2;

/**
 * Initialize a WebSocket client.
 *
 * @param {WebSocket} websocket The client to initialize
 * @param {(String|URL)} address The URL to which to connect
 * @param {Array} protocols The subprotocols
 * @param {Object} [options] Connection options
 * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether any
 *     of the `'message'`, `'ping'`, and `'pong'` events can be emitted multiple
 *     times in the same tick
 * @param {Boolean} [options.autoPong=true] Specifies whether or not to
 *     automatically send a pong in response to a ping
 * @param {Function} [options.finishRequest] A function which can be used to
 *     customize the headers of each http request before it is sent
 * @param {Boolean} [options.followRedirects=false] Whether or not to follow
 *     redirects
 * @param {Function} [options.generateMask] The function used to generate the
 *     masking key
 * @param {Number} [options.handshakeTimeout] Timeout in milliseconds for the
 *     handshake request
 * @param {Number} [options.maxPayload=104857600] The maximum allowed message
 *     size
 * @param {Number} [options.maxRedirects=10] The maximum number of redirects
 *     allowed
 * @param {String} [options.origin] Value of the `Origin` or
 *     `Sec-WebSocket-Origin` header
 * @param {(Boolean|Object)} [options.perMessageDeflate=true] Enable/disable
 *     permessage-deflate
 * @param {Number} [options.protocolVersion=13] Value of the
 *     `Sec-WebSocket-Version` header
 * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
 *     not to skip UTF-8 validation for text and close messages
 * @private
 */
function initAsClient(websocket, address, protocols, options) {
  const opts = {
    allowSynchronousEvents: true,
    autoPong: true,
    protocolVersion: protocolVersions[1],
    maxPayload: 100 * 1024 * 1024,
    skipUTF8Validation: false,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10,
    ...options,
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: 'GET',
    host: undefined,
    path: undefined,
    port: undefined
  };

  websocket._autoPong = opts.autoPong;

  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError(
      `Unsupported protocol version: ${opts.protocolVersion} ` +
        `(supported versions: ${protocolVersions.join(', ')})`
    );
  }

  let parsedUrl;

  if (address instanceof URL$1) {
    parsedUrl = address;
  } else {
    try {
      parsedUrl = new URL$1(address);
    } catch (e) {
      throw new SyntaxError(`Invalid URL: ${address}`);
    }
  }

  if (parsedUrl.protocol === 'http:') {
    parsedUrl.protocol = 'ws:';
  } else if (parsedUrl.protocol === 'https:') {
    parsedUrl.protocol = 'wss:';
  }

  websocket._url = parsedUrl.href;

  const isSecure = parsedUrl.protocol === 'wss:';
  const isIpcUrl = parsedUrl.protocol === 'ws+unix:';
  let invalidUrlMessage;

  if (parsedUrl.protocol !== 'ws:' && !isSecure && !isIpcUrl) {
    invalidUrlMessage =
      'The URL\'s protocol must be one of "ws:", "wss:", ' +
      '"http:", "https", or "ws+unix:"';
  } else if (isIpcUrl && !parsedUrl.pathname) {
    invalidUrlMessage = "The URL's pathname is empty";
  } else if (parsedUrl.hash) {
    invalidUrlMessage = 'The URL contains a fragment identifier';
  }

  if (invalidUrlMessage) {
    const err = new SyntaxError(invalidUrlMessage);

    if (websocket._redirects === 0) {
      throw err;
    } else {
      emitErrorAndClose(websocket, err);
      return;
    }
  }

  const defaultPort = isSecure ? 443 : 80;
  const key = randomBytes(16).toString('base64');
  const request = isSecure ? https.request : http$1.request;
  const protocolSet = new Set();
  let perMessageDeflate;

  opts.createConnection =
    opts.createConnection || (isSecure ? tlsConnect : netConnect);
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith('[')
    ? parsedUrl.hostname.slice(1, -1)
    : parsedUrl.hostname;
  opts.headers = {
    ...opts.headers,
    'Sec-WebSocket-Version': opts.protocolVersion,
    'Sec-WebSocket-Key': key,
    Connection: 'Upgrade',
    Upgrade: 'websocket'
  };
  opts.path = parsedUrl.pathname + parsedUrl.search;
  opts.timeout = opts.handshakeTimeout;

  if (opts.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate$1(
      opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
      false,
      opts.maxPayload
    );
    opts.headers['Sec-WebSocket-Extensions'] = format({
      [PerMessageDeflate$1.extensionName]: perMessageDeflate.offer()
    });
  }
  if (protocols.length) {
    for (const protocol of protocols) {
      if (
        typeof protocol !== 'string' ||
        !subprotocolRegex.test(protocol) ||
        protocolSet.has(protocol)
      ) {
        throw new SyntaxError(
          'An invalid or duplicated subprotocol was specified'
        );
      }

      protocolSet.add(protocol);
    }

    opts.headers['Sec-WebSocket-Protocol'] = protocols.join(',');
  }
  if (opts.origin) {
    if (opts.protocolVersion < 13) {
      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
    } else {
      opts.headers.Origin = opts.origin;
    }
  }
  if (parsedUrl.username || parsedUrl.password) {
    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
  }

  if (isIpcUrl) {
    const parts = opts.path.split(':');

    opts.socketPath = parts[0];
    opts.path = parts[1];
  }

  let req;

  if (opts.followRedirects) {
    if (websocket._redirects === 0) {
      websocket._originalIpc = isIpcUrl;
      websocket._originalSecure = isSecure;
      websocket._originalHostOrSocketPath = isIpcUrl
        ? opts.socketPath
        : parsedUrl.host;

      const headers = options && options.headers;

      //
      // Shallow copy the user provided options so that headers can be changed
      // without mutating the original object.
      //
      options = { ...options, headers: {} };

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          options.headers[key.toLowerCase()] = value;
        }
      }
    } else if (websocket.listenerCount('redirect') === 0) {
      const isSameHost = isIpcUrl
        ? websocket._originalIpc
          ? opts.socketPath === websocket._originalHostOrSocketPath
          : false
        : websocket._originalIpc
          ? false
          : parsedUrl.host === websocket._originalHostOrSocketPath;

      if (!isSameHost || (websocket._originalSecure && !isSecure)) {
        //
        // Match curl 7.77.0 behavior and drop the following headers. These
        // headers are also dropped when following a redirect to a subdomain.
        //
        delete opts.headers.authorization;
        delete opts.headers.cookie;

        if (!isSameHost) delete opts.headers.host;

        opts.auth = undefined;
      }
    }

    //
    // Match curl 7.77.0 behavior and make the first `Authorization` header win.
    // If the `Authorization` header is set, then there is nothing to do as it
    // will take precedence.
    //
    if (opts.auth && !options.headers.authorization) {
      options.headers.authorization =
        'Basic ' + Buffer.from(opts.auth).toString('base64');
    }

    req = websocket._req = request(opts);

    if (websocket._redirects) {
      //
      // Unlike what is done for the `'upgrade'` event, no early exit is
      // triggered here if the user calls `websocket.close()` or
      // `websocket.terminate()` from a listener of the `'redirect'` event. This
      // is because the user can also call `request.destroy()` with an error
      // before calling `websocket.close()` or `websocket.terminate()` and this
      // would result in an error being emitted on the `request` object with no
      // `'error'` event listeners attached.
      //
      websocket.emit('redirect', websocket.url, req);
    }
  } else {
    req = websocket._req = request(opts);
  }

  if (opts.timeout) {
    req.on('timeout', () => {
      abortHandshake$1(websocket, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', (err) => {
    if (req === null || req[kAborted]) return;

    req = websocket._req = null;
    emitErrorAndClose(websocket, err);
  });

  req.on('response', (res) => {
    const location = res.headers.location;
    const statusCode = res.statusCode;

    if (
      location &&
      opts.followRedirects &&
      statusCode >= 300 &&
      statusCode < 400
    ) {
      if (++websocket._redirects > opts.maxRedirects) {
        abortHandshake$1(websocket, req, 'Maximum redirects exceeded');
        return;
      }

      req.abort();

      let addr;

      try {
        addr = new URL$1(location, address);
      } catch (e) {
        const err = new SyntaxError(`Invalid URL: ${location}`);
        emitErrorAndClose(websocket, err);
        return;
      }

      initAsClient(websocket, addr, protocols, options);
    } else if (!websocket.emit('unexpected-response', req, res)) {
      abortHandshake$1(
        websocket,
        req,
        `Unexpected server response: ${res.statusCode}`
      );
    }
  });

  req.on('upgrade', (res, socket, head) => {
    websocket.emit('upgrade', res);

    //
    // The user may have closed the connection from a listener of the
    // `'upgrade'` event.
    //
    if (websocket.readyState !== WebSocket$2.CONNECTING) return;

    req = websocket._req = null;

    const upgrade = res.headers.upgrade;

    if (upgrade === undefined || upgrade.toLowerCase() !== 'websocket') {
      abortHandshake$1(websocket, socket, 'Invalid Upgrade header');
      return;
    }

    const digest = createHash$1('sha1')
      .update(key + GUID$1)
      .digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake$1(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    let protError;

    if (serverProt !== undefined) {
      if (!protocolSet.size) {
        protError = 'Server sent a subprotocol but none was requested';
      } else if (!protocolSet.has(serverProt)) {
        protError = 'Server sent an invalid subprotocol';
      }
    } else if (protocolSet.size) {
      protError = 'Server sent no subprotocol';
    }

    if (protError) {
      abortHandshake$1(websocket, socket, protError);
      return;
    }

    if (serverProt) websocket._protocol = serverProt;

    const secWebSocketExtensions = res.headers['sec-websocket-extensions'];

    if (secWebSocketExtensions !== undefined) {
      if (!perMessageDeflate) {
        const message =
          'Server sent a Sec-WebSocket-Extensions header but no extension ' +
          'was requested';
        abortHandshake$1(websocket, socket, message);
        return;
      }

      let extensions;

      try {
        extensions = parse$1(secWebSocketExtensions);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake$1(websocket, socket, message);
        return;
      }

      const extensionNames = Object.keys(extensions);

      if (
        extensionNames.length !== 1 ||
        extensionNames[0] !== PerMessageDeflate$1.extensionName
      ) {
        const message = 'Server indicated an extension that was not requested';
        abortHandshake$1(websocket, socket, message);
        return;
      }

      try {
        perMessageDeflate.accept(extensions[PerMessageDeflate$1.extensionName]);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake$1(websocket, socket, message);
        return;
      }

      websocket._extensions[PerMessageDeflate$1.extensionName] =
        perMessageDeflate;
    }

    websocket.setSocket(socket, head, {
      allowSynchronousEvents: opts.allowSynchronousEvents,
      generateMask: opts.generateMask,
      maxPayload: opts.maxPayload,
      skipUTF8Validation: opts.skipUTF8Validation
    });
  });

  if (opts.finishRequest) {
    opts.finishRequest(req, websocket);
  } else {
    req.end();
  }
}

/**
 * Emit the `'error'` and `'close'` events.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {Error} The error to emit
 * @private
 */
function emitErrorAndClose(websocket, err) {
  websocket._readyState = WebSocket$2.CLOSING;
  //
  // The following assignment is practically useless and is done only for
  // consistency.
  //
  websocket._errorEmitted = true;
  websocket.emit('error', err);
  websocket.emitClose();
}

/**
 * Create a `net.Socket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {net.Socket} The newly created socket used to start the connection
 * @private
 */
function netConnect(options) {
  options.path = options.socketPath;
  return net.connect(options);
}

/**
 * Create a `tls.TLSSocket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {tls.TLSSocket} The newly created socket used to start the connection
 * @private
 */
function tlsConnect(options) {
  options.path = undefined;

  if (!options.servername && options.servername !== '') {
    options.servername = net.isIP(options.host) ? '' : options.host;
  }

  return tls.connect(options);
}

/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket|tls.Socket)} stream The request to
 *     abort or the socket to destroy
 * @param {String} message The error message
 * @private
 */
function abortHandshake$1(websocket, stream, message) {
  websocket._readyState = WebSocket$2.CLOSING;

  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake$1);

  if (stream.setHeader) {
    stream[kAborted] = true;
    stream.abort();

    if (stream.socket && !stream.socket.destroyed) {
      //
      // On Node.js >= 14.3.0 `request.abort()` does not destroy the socket if
      // called after the request completed. See
      // https://github.com/websockets/ws/issues/1869.
      //
      stream.socket.destroy();
    }

    process.nextTick(emitErrorAndClose, websocket, err);
  } else {
    stream.destroy(err);
    stream.once('error', websocket.emit.bind(websocket, 'error'));
    stream.once('close', websocket.emitClose.bind(websocket));
  }
}

/**
 * Handle cases where the `ping()`, `pong()`, or `send()` methods are called
 * when the `readyState` attribute is `CLOSING` or `CLOSED`.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {*} [data] The data to send
 * @param {Function} [cb] Callback
 * @private
 */
function sendAfterClose(websocket, data, cb) {
  if (data) {
    const length = isBlob(data) ? data.size : toBuffer(data).length;

    //
    // The `_bufferedAmount` property is used only when the peer is a client and
    // the opening handshake fails. Under these circumstances, in fact, the
    // `setSocket()` method is not called, so the `_socket` and `_sender`
    // properties are set to `null`.
    //
    if (websocket._socket) websocket._sender._bufferedBytes += length;
    else websocket._bufferedAmount += length;
  }

  if (cb) {
    const err = new Error(
      `WebSocket is not open: readyState ${websocket.readyState} ` +
        `(${readyStates[websocket.readyState]})`
    );
    process.nextTick(cb, err);
  }
}

/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {Buffer} reason The reason for closing
 * @private
 */
function receiverOnConclude(code, reason) {
  const websocket = this[kWebSocket$1];

  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;

  if (websocket._socket[kWebSocket$1] === undefined) return;

  websocket._socket.removeListener('data', socketOnData);
  process.nextTick(resume, websocket._socket);

  if (code === 1005) websocket.close();
  else websocket.close(code, reason);
}

/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */
function receiverOnDrain() {
  const websocket = this[kWebSocket$1];

  if (!websocket.isPaused) websocket._socket.resume();
}

/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */
function receiverOnError(err) {
  const websocket = this[kWebSocket$1];

  if (websocket._socket[kWebSocket$1] !== undefined) {
    websocket._socket.removeListener('data', socketOnData);

    //
    // On Node.js < 14.0.0 the `'error'` event is emitted synchronously. See
    // https://github.com/websockets/ws/issues/1940.
    //
    process.nextTick(resume, websocket._socket);

    websocket.close(err[kStatusCode]);
  }

  if (!websocket._errorEmitted) {
    websocket._errorEmitted = true;
    websocket.emit('error', err);
  }
}

/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */
function receiverOnFinish() {
  this[kWebSocket$1].emitClose();
}

/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {Buffer|ArrayBuffer|Buffer[])} data The message
 * @param {Boolean} isBinary Specifies whether the message is binary or not
 * @private
 */
function receiverOnMessage(data, isBinary) {
  this[kWebSocket$1].emit('message', data, isBinary);
}

/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */
function receiverOnPing(data) {
  const websocket = this[kWebSocket$1];

  if (websocket._autoPong) websocket.pong(data, !this._isServer, NOOP);
  websocket.emit('ping', data);
}

/**
 * The listener of the `Receiver` `'pong'` event.
 *
 * @param {Buffer} data The data included in the pong frame
 * @private
 */
function receiverOnPong(data) {
  this[kWebSocket$1].emit('pong', data);
}

/**
 * Resume a readable stream
 *
 * @param {Readable} stream The readable stream
 * @private
 */
function resume(stream) {
  stream.resume();
}

/**
 * The `Sender` error event handler.
 *
 * @param {Error} The error
 * @private
 */
function senderOnError(err) {
  const websocket = this[kWebSocket$1];

  if (websocket.readyState === WebSocket$2.CLOSED) return;
  if (websocket.readyState === WebSocket$2.OPEN) {
    websocket._readyState = WebSocket$2.CLOSING;
    setCloseTimer(websocket);
  }

  //
  // `socket.end()` is used instead of `socket.destroy()` to allow the other
  // peer to finish sending queued data. There is no need to set a timer here
  // because `CLOSING` means that it is already set or not needed.
  //
  this._socket.end();

  if (!websocket._errorEmitted) {
    websocket._errorEmitted = true;
    websocket.emit('error', err);
  }
}

/**
 * Set a timer to destroy the underlying raw socket of a WebSocket.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @private
 */
function setCloseTimer(websocket) {
  websocket._closeTimer = setTimeout(
    websocket._socket.destroy.bind(websocket._socket),
    closeTimeout
  );
}

/**
 * The listener of the socket `'close'` event.
 *
 * @private
 */
function socketOnClose() {
  const websocket = this[kWebSocket$1];

  this.removeListener('close', socketOnClose);
  this.removeListener('data', socketOnData);
  this.removeListener('end', socketOnEnd);

  websocket._readyState = WebSocket$2.CLOSING;

  let chunk;

  //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk.
  //
  if (
    !this._readableState.endEmitted &&
    !websocket._closeFrameReceived &&
    !websocket._receiver._writableState.errorEmitted &&
    (chunk = websocket._socket.read()) !== null
  ) {
    websocket._receiver.write(chunk);
  }

  websocket._receiver.end();

  this[kWebSocket$1] = undefined;

  clearTimeout(websocket._closeTimer);

  if (
    websocket._receiver._writableState.finished ||
    websocket._receiver._writableState.errorEmitted
  ) {
    websocket.emitClose();
  } else {
    websocket._receiver.on('error', receiverOnFinish);
    websocket._receiver.on('finish', receiverOnFinish);
  }
}

/**
 * The listener of the socket `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function socketOnData(chunk) {
  if (!this[kWebSocket$1]._receiver.write(chunk)) {
    this.pause();
  }
}

/**
 * The listener of the socket `'end'` event.
 *
 * @private
 */
function socketOnEnd() {
  const websocket = this[kWebSocket$1];

  websocket._readyState = WebSocket$2.CLOSING;
  websocket._receiver.end();
  this.end();
}

/**
 * The listener of the socket `'error'` event.
 *
 * @private
 */
function socketOnError$1() {
  const websocket = this[kWebSocket$1];

  this.removeListener('error', socketOnError$1);
  this.on('error', NOOP);

  if (websocket) {
    websocket._readyState = WebSocket$2.CLOSING;
    this.destroy();
  }
}

const { Duplex } = require$$0$4;

/**
 * Emits the `'close'` event on a stream.
 *
 * @param {Duplex} stream The stream.
 * @private
 */
function emitClose$1(stream) {
  stream.emit('close');
}

/**
 * The listener of the `'end'` event.
 *
 * @private
 */
function duplexOnEnd() {
  if (!this.destroyed && this._writableState.finished) {
    this.destroy();
  }
}

/**
 * The listener of the `'error'` event.
 *
 * @param {Error} err The error
 * @private
 */
function duplexOnError(err) {
  this.removeListener('error', duplexOnError);
  this.destroy();
  if (this.listenerCount('error') === 0) {
    // Do not suppress the throwing behavior.
    this.emit('error', err);
  }
}

/**
 * Wraps a `WebSocket` in a duplex stream.
 *
 * @param {WebSocket} ws The `WebSocket` to wrap
 * @param {Object} [options] The options for the `Duplex` constructor
 * @return {Duplex} The duplex stream
 * @public
 */
function createWebSocketStream(ws, options) {
  let terminateOnDestroy = true;

  const duplex = new Duplex({
    ...options,
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  });

  ws.on('message', function message(msg, isBinary) {
    const data =
      !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;

    if (!duplex.push(data)) ws.pause();
  });

  ws.once('error', function error(err) {
    if (duplex.destroyed) return;

    // Prevent `ws.terminate()` from being called by `duplex._destroy()`.
    //
    // - If the `'error'` event is emitted before the `'open'` event, then
    //   `ws.terminate()` is a noop as no socket is assigned.
    // - Otherwise, the error is re-emitted by the listener of the `'error'`
    //   event of the `Receiver` object. The listener already closes the
    //   connection by calling `ws.close()`. This allows a close frame to be
    //   sent to the other peer. If `ws.terminate()` is called right after this,
    //   then the close frame might not be sent.
    terminateOnDestroy = false;
    duplex.destroy(err);
  });

  ws.once('close', function close() {
    if (duplex.destroyed) return;

    duplex.push(null);
  });

  duplex._destroy = function (err, callback) {
    if (ws.readyState === ws.CLOSED) {
      callback(err);
      process.nextTick(emitClose$1, duplex);
      return;
    }

    let called = false;

    ws.once('error', function error(err) {
      called = true;
      callback(err);
    });

    ws.once('close', function close() {
      if (!called) callback(err);
      process.nextTick(emitClose$1, duplex);
    });

    if (terminateOnDestroy) ws.terminate();
  };

  duplex._final = function (callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._final(callback);
      });
      return;
    }

    // If the value of the `_socket` property is `null` it means that `ws` is a
    // client websocket and the handshake failed. In fact, when this happens, a
    // socket is never assigned to the websocket. Wait for the `'error'` event
    // that will be emitted by the websocket.
    if (ws._socket === null) return;

    if (ws._socket._writableState.finished) {
      callback();
      if (duplex._readableState.endEmitted) duplex.destroy();
    } else {
      ws._socket.once('finish', function finish() {
        // `duplex` is not destroyed here because the `'end'` event will be
        // emitted on `duplex` after this `'finish'` event. The EOF signaling
        // `null` chunk is, in fact, pushed when the websocket emits `'close'`.
        callback();
      });
      ws.close();
    }
  };

  duplex._read = function () {
    if (ws.isPaused) ws.resume();
  };

  duplex._write = function (chunk, encoding, callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._write(chunk, encoding, callback);
      });
      return;
    }

    ws.send(chunk, callback);
  };

  duplex.on('end', duplexOnEnd);
  duplex.on('error', duplexOnError);
  return duplex;
}

var stream = createWebSocketStream;

const { tokenChars } = validationExports;

/**
 * Parses the `Sec-WebSocket-Protocol` header into a set of subprotocol names.
 *
 * @param {String} header The field value of the header
 * @return {Set} The subprotocol names
 * @public
 */
function parse(header) {
  const protocols = new Set();
  let start = -1;
  let end = -1;
  let i = 0;

  for (i; i < header.length; i++) {
    const code = header.charCodeAt(i);

    if (end === -1 && tokenChars[code] === 1) {
      if (start === -1) start = i;
    } else if (
      i !== 0 &&
      (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
    ) {
      if (end === -1 && start !== -1) end = i;
    } else if (code === 0x2c /* ',' */) {
      if (start === -1) {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }

      if (end === -1) end = i;

      const protocol = header.slice(start, end);

      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }

      protocols.add(protocol);
      start = end = -1;
    } else {
      throw new SyntaxError(`Unexpected character at index ${i}`);
    }
  }

  if (start === -1 || end !== -1) {
    throw new SyntaxError('Unexpected end of input');
  }

  const protocol = header.slice(start, i);

  if (protocols.has(protocol)) {
    throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
  }

  protocols.add(protocol);
  return protocols;
}

var subprotocol$1 = { parse };

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Duplex$", "caughtErrors": "none" }] */

const EventEmitter = require$$0$5;
const http = require$$2$3;
const { createHash } = require$$1$2;

const extension = extension$1;
const PerMessageDeflate = permessageDeflate;
const subprotocol = subprotocol$1;
const WebSocket$1 = websocket;
const { GUID, kWebSocket } = constants;

const keyRegex = /^[+/0-9A-Za-z]{22}==$/;

const RUNNING = 0;
const CLOSING = 1;
const CLOSED = 2;

/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */
class WebSocketServer extends EventEmitter {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
   *     multiple times in the same tick
   * @param {Boolean} [options.autoPong=true] Specifies whether or not to
   *     automatically send a pong in response to a ping
   * @param {Number} [options.backlog=511] The maximum length of the queue of
   *     pending connections
   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
   *     track clients
   * @param {Function} [options.handleProtocols] A hook to handle protocols
   * @param {String} [options.host] The hostname where to bind the server
   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
   *     size
   * @param {Boolean} [options.noServer=false] Enable no server mode
   * @param {String} [options.path] Accept only connections matching this path
   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
   *     permessage-deflate
   * @param {Number} [options.port] The port where to bind the server
   * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
   *     server to use
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @param {Function} [options.verifyClient] A hook to reject connections
   * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
   *     class to use. It must be the `WebSocket` class or class that extends it
   * @param {Function} [callback] A listener for the `listening` event
   */
  constructor(options, callback) {
    super();

    options = {
      allowSynchronousEvents: true,
      autoPong: true,
      maxPayload: 100 * 1024 * 1024,
      skipUTF8Validation: false,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null, // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null,
      WebSocket: WebSocket$1,
      ...options
    };

    if (
      (options.port == null && !options.server && !options.noServer) ||
      (options.port != null && (options.server || options.noServer)) ||
      (options.server && options.noServer)
    ) {
      throw new TypeError(
        'One and only one of the "port", "server", or "noServer" options ' +
          'must be specified'
      );
    }

    if (options.port != null) {
      this._server = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      this._server.listen(
        options.port,
        options.host,
        options.backlog,
        callback
      );
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      const emitConnection = this.emit.bind(this, 'connection');

      this._removeListeners = addListeners(this._server, {
        listening: this.emit.bind(this, 'listening'),
        error: this.emit.bind(this, 'error'),
        upgrade: (req, socket, head) => {
          this.handleUpgrade(req, socket, head, emitConnection);
        }
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
    if (options.clientTracking) {
      this.clients = new Set();
      this._shouldEmitClose = false;
    }

    this.options = options;
    this._state = RUNNING;
  }

  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */
  address() {
    if (this.options.noServer) {
      throw new Error('The server is operating in "noServer" mode');
    }

    if (!this._server) return null;
    return this._server.address();
  }

  /**
   * Stop the server from accepting new connections and emit the `'close'` event
   * when all existing connections are closed.
   *
   * @param {Function} [cb] A one-time listener for the `'close'` event
   * @public
   */
  close(cb) {
    if (this._state === CLOSED) {
      if (cb) {
        this.once('close', () => {
          cb(new Error('The server is not running'));
        });
      }

      process.nextTick(emitClose, this);
      return;
    }

    if (cb) this.once('close', cb);

    if (this._state === CLOSING) return;
    this._state = CLOSING;

    if (this.options.noServer || this.options.server) {
      if (this._server) {
        this._removeListeners();
        this._removeListeners = this._server = null;
      }

      if (this.clients) {
        if (!this.clients.size) {
          process.nextTick(emitClose, this);
        } else {
          this._shouldEmitClose = true;
        }
      } else {
        process.nextTick(emitClose, this);
      }
    } else {
      const server = this._server;

      this._removeListeners();
      this._removeListeners = this._server = null;

      //
      // The HTTP/S server was created internally. Close it, and rely on its
      // `'close'` event.
      //
      server.close(() => {
        emitClose(this);
      });
    }
  }

  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */
  shouldHandle(req) {
    if (this.options.path) {
      const index = req.url.indexOf('?');
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

      if (pathname !== this.options.path) return false;
    }

    return true;
  }

  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {Duplex} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */
  handleUpgrade(req, socket, head, cb) {
    socket.on('error', socketOnError);

    const key = req.headers['sec-websocket-key'];
    const upgrade = req.headers.upgrade;
    const version = +req.headers['sec-websocket-version'];

    if (req.method !== 'GET') {
      const message = 'Invalid HTTP method';
      abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
      return;
    }

    if (upgrade === undefined || upgrade.toLowerCase() !== 'websocket') {
      const message = 'Invalid Upgrade header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (key === undefined || !keyRegex.test(key)) {
      const message = 'Missing or invalid Sec-WebSocket-Key header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (version !== 8 && version !== 13) {
      const message = 'Missing or invalid Sec-WebSocket-Version header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (!this.shouldHandle(req)) {
      abortHandshake(socket, 400);
      return;
    }

    const secWebSocketProtocol = req.headers['sec-websocket-protocol'];
    let protocols = new Set();

    if (secWebSocketProtocol !== undefined) {
      try {
        protocols = subprotocol.parse(secWebSocketProtocol);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Protocol header';
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
    }

    const secWebSocketExtensions = req.headers['sec-websocket-extensions'];
    const extensions = {};

    if (
      this.options.perMessageDeflate &&
      secWebSocketExtensions !== undefined
    ) {
      const perMessageDeflate = new PerMessageDeflate(
        this.options.perMessageDeflate,
        true,
        this.options.maxPayload
      );

      try {
        const offers = extension.parse(secWebSocketExtensions);

        if (offers[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        const message =
          'Invalid or unacceptable Sec-WebSocket-Extensions header';
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
    }

    //
    // Optionally call external client verification handler.
    //
    if (this.options.verifyClient) {
      const info = {
        origin:
          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
        secure: !!(req.socket.authorized || req.socket.encrypted),
        req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message, headers) => {
          if (!verified) {
            return abortHandshake(socket, code || 401, message, headers);
          }

          this.completeUpgrade(
            extensions,
            key,
            protocols,
            req,
            socket,
            head,
            cb
          );
        });
        return;
      }

      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
    }

    this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
  }

  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {Object} extensions The accepted extensions
   * @param {String} key The value of the `Sec-WebSocket-Key` header
   * @param {Set} protocols The subprotocols
   * @param {http.IncomingMessage} req The request object
   * @param {Duplex} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @throws {Error} If called more than once with the same socket
   * @private
   */
  completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    if (socket[kWebSocket]) {
      throw new Error(
        'server.handleUpgrade() was called more than once with the same ' +
          'socket, possibly due to a misconfiguration'
      );
    }

    if (this._state > RUNNING) return abortHandshake(socket, 503);

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${digest}`
    ];

    const ws = new this.options.WebSocket(null, undefined, this.options);

    if (protocols.size) {
      //
      // Optionally call external protocol selection handler.
      //
      const protocol = this.options.handleProtocols
        ? this.options.handleProtocols(protocols, req)
        : protocols.values().next().value;

      if (protocol) {
        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
        ws._protocol = protocol;
      }
    }

    if (extensions[PerMessageDeflate.extensionName]) {
      const params = extensions[PerMessageDeflate.extensionName].params;
      const value = extension.format({
        [PerMessageDeflate.extensionName]: [params]
      });
      headers.push(`Sec-WebSocket-Extensions: ${value}`);
      ws._extensions = extensions;
    }

    //
    // Allow external modification/inspection of handshake headers.
    //
    this.emit('headers', headers, req);

    socket.write(headers.concat('\r\n').join('\r\n'));
    socket.removeListener('error', socketOnError);

    ws.setSocket(socket, head, {
      allowSynchronousEvents: this.options.allowSynchronousEvents,
      maxPayload: this.options.maxPayload,
      skipUTF8Validation: this.options.skipUTF8Validation
    });

    if (this.clients) {
      this.clients.add(ws);
      ws.on('close', () => {
        this.clients.delete(ws);

        if (this._shouldEmitClose && !this.clients.size) {
          process.nextTick(emitClose, this);
        }
      });
    }

    cb(ws, req);
  }
}

var websocketServer = WebSocketServer;

/**
 * Add event listeners on an `EventEmitter` using a map of <event, listener>
 * pairs.
 *
 * @param {EventEmitter} server The event emitter
 * @param {Object.<String, Function>} map The listeners to add
 * @return {Function} A function that will remove the added listeners when
 *     called
 * @private
 */
function addListeners(server, map) {
  for (const event of Object.keys(map)) server.on(event, map[event]);

  return function removeListeners() {
    for (const event of Object.keys(map)) {
      server.removeListener(event, map[event]);
    }
  };
}

/**
 * Emit a `'close'` event on an `EventEmitter`.
 *
 * @param {EventEmitter} server The event emitter
 * @private
 */
function emitClose(server) {
  server._state = CLOSED;
  server.emit('close');
}

/**
 * Handle socket errors.
 *
 * @private
 */
function socketOnError() {
  this.destroy();
}

/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {Duplex} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @param {Object} [headers] Additional HTTP response headers
 * @private
 */
function abortHandshake(socket, code, message, headers) {
  //
  // The socket is writable unless the user destroyed or ended it before calling
  // `server.handleUpgrade()` or in the `verifyClient` function, which is a user
  // error. Handling this does not make much sense as the worst that can happen
  // is that some of the data written by the user might be discarded due to the
  // call to `socket.end()` below, which triggers an `'error'` event that in
  // turn causes the socket to be destroyed.
  //
  message = message || http.STATUS_CODES[code];
  headers = {
    Connection: 'close',
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(message),
    ...headers
  };

  socket.once('finish', socket.destroy);

  socket.end(
    `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
      Object.keys(headers)
        .map((h) => `${h}: ${headers[h]}`)
        .join('\r\n') +
      '\r\n\r\n' +
      message
  );
}

/**
 * Emit a `'wsClientError'` event on a `WebSocketServer` if there is at least
 * one listener for it, otherwise call `abortHandshake()`.
 *
 * @param {WebSocketServer} server The WebSocket server
 * @param {http.IncomingMessage} req The request object
 * @param {Duplex} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} message The HTTP response body
 * @private
 */
function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
  if (server.listenerCount('wsClientError')) {
    const err = new Error(message);
    Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);

    server.emit('wsClientError', err, socket, req);
  } else {
    abortHandshake(socket, code, message);
  }
}

const WebSocket = websocket;

WebSocket.createWebSocketStream = stream;
WebSocket.Server = websocketServer;
WebSocket.Receiver = receiver;
WebSocket.Sender = sender;

WebSocket.WebSocket = WebSocket;
WebSocket.WebSocketServer = WebSocket.Server;

var ws = WebSocket;

Object.defineProperty(WebSocket$3, "__esModule", { value: true });
WebSocket$3.WebSocketTransport = void 0;
const Transport_1$1 = Transport$1;
const RPCError_1$1 = RPCError$1;
const ws_1 = ws;
class WebSocketTransport extends Transport_1$1.Transport {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "ws", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get isConnected() {
        return this.ws !== undefined && this.ws.readyState === 1;
    }
    connect() {
        return new Promise(async (resolve, reject) => {
            for (let i = 0; i < 10; i++) {
                const ws = await new Promise((resolve, reject) => {
                    const socket = new ws_1.WebSocket(`ws://127.0.0.1:${6463 + i}/?v=1&client_id=${this.client.clientId}&encoding=json`);
                    socket.onopen = () => {
                        socket.onclose = null;
                        socket.onopen = null;
                        resolve(socket);
                    };
                    socket.onerror = () => {
                        socket.onclose = null;
                        socket.onopen = null;
                        reject();
                    };
                }).catch(() => undefined);
                if (ws) {
                    this.ws = ws;
                    resolve();
                    break;
                }
            }
            if (!this.ws)
                reject(new RPCError_1$1.RPCError(Transport_1$1.CUSTOM_RPC_ERROR_CODE.COULD_NOT_CONNECT, "Failed to connect to websocket"));
            this.ws.onmessage = (event) => {
                this.emit("message", JSON.parse(event.data.toString()));
            };
            this.ws.onclose = (event) => {
                if (!event.wasClean)
                    return;
                this.ws = undefined;
                this.emit("close", event.reason);
            };
            this.ws.onerror = (event) => {
                try {
                    this.ws?.close();
                }
                catch { }
                throw event.error;
            };
            this.emit("open");
        });
    }
    send(data) {
        this.ws?.send(JSON.stringify(data));
    }
    ping() { }
    close() {
        if (!this.ws)
            return new Promise((resolve) => void resolve());
        return new Promise((resolve) => {
            this.ws.once("close", () => {
                this.emit("close", "Closed by client");
                this.ws = undefined;
                resolve();
            });
            this.ws.close();
        });
    }
}
WebSocket$3.WebSocketTransport = WebSocketTransport;

var ClientUser$1 = {};

var VoiceSettings$1 = {};

var Base$1 = {};

Object.defineProperty(Base$1, "__esModule", { value: true });
Base$1.Base = void 0;
class Base {
    constructor(client) {
        /**
         * the client instance
         */
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = client;
    }
}
Base$1.Base = Base;

Object.defineProperty(VoiceSettings$1, "__esModule", { value: true });
VoiceSettings$1.VoiceSettings = VoiceSettings$1.KEY_TYPE = void 0;
const Base_1$5 = Base$1;
var KEY_TYPE;
(function (KEY_TYPE) {
    KEY_TYPE[KEY_TYPE["KEYBOARD_KEY"] = 0] = "KEYBOARD_KEY";
    KEY_TYPE[KEY_TYPE["MOUSE_BUTTON"] = 1] = "MOUSE_BUTTON";
    KEY_TYPE[KEY_TYPE["KEYBOARD_MODIFIER_KEY"] = 2] = "KEYBOARD_MODIFIER_KEY";
    KEY_TYPE[KEY_TYPE["GAMEPAD_BUTTON"] = 3] = "GAMEPAD_BUTTON";
})(KEY_TYPE || (VoiceSettings$1.KEY_TYPE = KEY_TYPE = {}));
class VoiceSettings extends Base_1$5.Base {
    constructor(client, props) {
        super(client);
        /**
         * input settings
         */
        Object.defineProperty(this, "input", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * output settings
         */
        Object.defineProperty(this, "output", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * voice mode settings
         */
        Object.defineProperty(this, "mode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * state of automatic gain control
         */
        Object.defineProperty(this, "automatic_gain_control", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * state of echo cancellation
         */
        Object.defineProperty(this, "echo_cancellation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * state of noise suppression
         */
        Object.defineProperty(this, "noise_suppression", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * state of voice quality of service
         */
        Object.defineProperty(this, "qos", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * state of silence warning notice
         */
        Object.defineProperty(this, "silence_warning", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * state of self-deafen
         */
        Object.defineProperty(this, "deaf", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * state of self-mute
         */
        Object.defineProperty(this, "mute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.assign(this, props);
        this.input = props.input;
        this.output = props.output;
        this.mode = props.mode;
        this.automatic_gain_control = props.automatic_gain_control;
        this.echo_cancellation = props.echo_cancellation;
        this.noise_suppression = props.noise_suppression;
        this.qos = props.qos;
        this.silence_warning = props.silence_warning;
        this.deaf = props.deaf;
        this.mute = props.mute;
    }
}
VoiceSettings$1.VoiceSettings = VoiceSettings;

var Channel$1 = {};

var Message$1 = {};

var User$1 = {};

Object.defineProperty(User$1, "__esModule", { value: true });
User$1.User = void 0;
const Base_1$4 = Base$1;
class User extends Base_1$4.Base {
    constructor(client, props) {
        super(client);
        /**
         * the user's id
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * the user's username, not unique across the platform
         */
        Object.defineProperty(this, "username", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * the user's 4-digit discord-tag
         */
        Object.defineProperty(this, "discriminator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * the user's [avatar hash](https://discord.com/developers/docs/reference#image-formatting)
         */
        Object.defineProperty(this, "avatar", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * the [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags) on a user's account
         */
        Object.defineProperty(this, "flags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * the [type of Nitro subscription](https://discord.com/developers/docs/resources/user#user-object-premium-types) on a user's account
         */
        Object.defineProperty(this, "premium_type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * the public [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags) on a user's account
         */
        Object.defineProperty(this, "public_flags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * user's rich presence
         */
        Object.defineProperty(this, "presence", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "avatar_decoration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.assign(this, props);
        // word can't explains how much i hate this
        this.id = props.id;
        this.username = props.username;
        this.discriminator = props.discriminator;
        this.avatar = props.avatar;
    }
    /**
     * The URL to the user's avatar.
     */
    get avatarUrl() {
        return this.client.getCdn().avatar(this.id, this.avatar);
    }
    /**
     * The URL to the user's default avatar. (avatar that is used when user have no avatar)
     */
    get defaultAvatarUrl() {
        return this.client.getCdn().defaultAvatar(parseInt(this.discriminator.substring(1)) % 5);
    }
    /**
     * User's tag
     */
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }
}
User$1.User = User;

Object.defineProperty(Message$1, "__esModule", { value: true });
Message$1.Message = void 0;
const Base_1$3 = Base$1;
const User_1$1 = User$1;
class Message extends Base_1$3.Base {
    constructor(client, props) {
        super(client);
        /**
         * id of the message
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * if the message's author is blocked
         */
        Object.defineProperty(this, "blocked", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * if the message is sent by a bot
         */
        Object.defineProperty(this, "bot", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * contents of the message
         */
        Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "content_parsed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * author's server nickname
         */
        Object.defineProperty(this, "nick", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "author_color", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * when this message was edited (or null if never)
         */
        Object.defineProperty(this, "edited_timestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * when this message was sent
         */
        Object.defineProperty(this, "timestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * whether this was a TTS message
         */
        Object.defineProperty(this, "tts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * users specifically mentioned in the message
         */
        Object.defineProperty(this, "mentions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * whether this message mentions everyone
         */
        Object.defineProperty(this, "mention_everyone", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * roles specifically mentioned in this message
         */
        Object.defineProperty(this, "mention_roles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * any embedded content
         */
        Object.defineProperty(this, "embeds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * any attached files
         */
        Object.defineProperty(this, "attachments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * the author of this message
         */
        Object.defineProperty(this, "author", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * whether this message is pinned
         */
        Object.defineProperty(this, "pinned", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * [type of message](https://discord.com/developers/docs/resources/channel#message-object-message-types)
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.assign(this, props);
        this.id = props.id;
        this.blocked = props.blocked;
        this.bot = props.bot;
        this.content = props.content;
        this.content_parsed = props.content_parsed;
        this.nick = props.nick;
        this.author_color = props.author_color;
        this.edited_timestamp = props.edited_timestamp;
        this.timestamp = props.timestamp;
        this.tts = props.tts;
        this.mentions = props.mentions.map((mentionData) => new User_1$1.User(client, mentionData));
        this.mention_everyone = props.mention_everyone;
        this.mention_roles = props.mention_roles;
        this.embeds = props.embeds;
        this.attachments = props.attachments;
        this.author = new User_1$1.User(client, props.author);
        this.pinned = props.pinned;
        this.type = props.type;
    }
}
Message$1.Message = Message;

Object.defineProperty(Channel$1, "__esModule", { value: true });
Channel$1.Channel = void 0;
const Message_1 = Message$1;
const Base_1$2 = Base$1;
class Channel extends Base_1$2.Base {
    constructor(client, props) {
        super(client);
        /**
         * channel id
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * channel's guild id
         */
        Object.defineProperty(this, "guild_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * channel name
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * channel type (guild text: 0, guild voice: 2, dm: 1, group dm: 3)
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * (text) channel topic
         */
        Object.defineProperty(this, "topic", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * (voice) bitrate of voice channel
         */
        Object.defineProperty(this, "bitrate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * (voice) user limit of voice channel (0 for none)
         */
        Object.defineProperty(this, "user_limit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * position of channel in channel list
         */
        Object.defineProperty(this, "position", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * (voice) channel's voice states
         */
        Object.defineProperty(this, "voice_states", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * (text) channel's messages
         */
        Object.defineProperty(this, "messages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.assign(this, props);
        this.id = props.id;
        this.guild_id = props.guild_id;
        this.name = props.name;
        this.type = props.type;
        this.topic = props.topic;
        this.bitrate = props.bitrate;
        this.user_limit = props.user_limit;
        this.position = props.position;
        this.voice_states = props.voice_states;
        this.messages = props.messages?.map((messgeData) => new Message_1.Message(client, messgeData));
    }
}
Channel$1.Channel = Channel;

var Guild$1 = {};

Object.defineProperty(Guild$1, "__esModule", { value: true });
Guild$1.Guild = void 0;
const Base_1$1 = Base$1;
class Guild extends Base_1$1.Base {
    constructor(client, props) {
        super(client);
        /**
         * guild id
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * guild name (2-100 characters, excluding trailing and leading whitespace)
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "icon_url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * guild member list
         * (always an empty array)
         * @deprecated
         */
        Object.defineProperty(this, "members", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        }); // Always an empty array
        /**
         * the vanity url code for the guild
         */
        Object.defineProperty(this, "vanity_url_code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.assign(this, props);
        this.id = props.id;
        this.name = props.name;
        this.icon_url = props.icon_url;
        this.vanity_url_code = props.vanity_url_code;
    }
}
Guild$1.Guild = Guild;

Object.defineProperty(ClientUser$1, "__esModule", { value: true });
ClientUser$1.ClientUser = ClientUser$1.ActivityPartyPrivacy = ClientUser$1.ActivitySupportedPlatform = void 0;
const VoiceSettings_1 = VoiceSettings$1;
const Channel_1 = Channel$1;
const Guild_1 = Guild$1;
const User_1 = User$1;
var ActivitySupportedPlatform;
(function (ActivitySupportedPlatform) {
    ActivitySupportedPlatform["IOS"] = "ios";
    ActivitySupportedPlatform["ANDROID"] = "android";
    ActivitySupportedPlatform["WEB"] = "web";
})(ActivitySupportedPlatform || (ClientUser$1.ActivitySupportedPlatform = ActivitySupportedPlatform = {}));
var ActivityPartyPrivacy;
(function (ActivityPartyPrivacy) {
    ActivityPartyPrivacy[ActivityPartyPrivacy["PRIVATE"] = 0] = "PRIVATE";
    ActivityPartyPrivacy[ActivityPartyPrivacy["PUBLIC"] = 1] = "PUBLIC";
})(ActivityPartyPrivacy || (ClientUser$1.ActivityPartyPrivacy = ActivityPartyPrivacy = {}));
class ClientUser extends User_1.User {
    // #region Helper function
    async fetchUser(userId) {
        return new User_1.User(this.client, (await this.client.request("GET_USER", { id: userId })).data);
    }
    /**
     * Used to get a guild the client is in.
     *
     * @param guildId - id of the guild to get
     * @param timeout - asynchronously get guild with time to wait before timing out
     * @returns partial guild
     */
    async fetchGuild(guildId, timeout) {
        return new Guild_1.Guild(this.client, (await this.client.request("GET_GUILD", { guild_id: guildId, timeout })).data);
    }
    /**
     * Used to get a list of guilds the client is in.
     * @returns the guilds the user is in
     */
    async fetchGuilds() {
        return (await this.client.request("GET_GUILDS")).data.guilds.map((guildData) => new Guild_1.Guild(this.client, guildData));
    }
    /**
     * Used to get a channel the client is in.
     * @param channelId - id of the channel to get
     * @returns partial channel
     */
    async fetchChannel(channelId) {
        return new Channel_1.Channel(this.client, (await this.client.request("GET_CHANNEL", { channel_id: channelId })).data);
    }
    /**
     * Used to get a guild's channels the client is in.
     * @param guildId - id of the guild to get channels for
     * @returns guild channels the user is in
     */
    async fetchChannels(guildId) {
        return (await this.client.request("GET_CHANNELS", { guild_id: guildId })).data.channels.map((channelData) => new Channel_1.Channel(this.client, channelData));
    }
    /**
     * Used to get the client's current voice channel. There are no arguments for this command. Returns the [Get Channel](https://discord.com/developers/docs/topics/rpc#getchannel) response, or `null` if none.
     * @returns the client's current voice channel, `null` if none
     */
    async getSelectedVoiceChannel() {
        const response = await this.client.request("GET_SELECTED_VOICE_CHANNEL");
        return response.data !== null ? new Channel_1.Channel(this.client, response.data) : null;
    }
    /**
     * Used to join voice channels, group dms, or dms. Returns the [Get Channel](https://discord.com/developers/docs/topics/rpc#getchannel) response, `null` if none.
     * @param channelId - channel id to join
     * @param timeout - asynchronously join channel with time to wait before timing out
     * @param force - forces a user to join a voice channel
     * @returns the channel that the user joined, `null` if none
     */
    async selectVoiceChannel(channelId, timeout, force, navigate) {
        return new Channel_1.Channel(this.client, (await this.client.request("SELECT_VOICE_CHANNEL", {
            channel_id: channelId,
            timeout,
            force,
            navigate
        })).data);
    }
    /**
     * Used to leave voice channels, group dms, or dms
     * @param timeout - asynchronously join channel with time to wait before timing out
     * @param force - forces a user to join a voice channel
     */
    async leaveVoiceChannel(timeout, force) {
        await this.client.request("SELECT_VOICE_CHANNEL", {
            channel_id: null,
            timeout,
            force
        });
    }
    /**
     * Used to get current client's voice settings
     * @returns the voice setting
     */
    async getVoiceSettings() {
        return new VoiceSettings_1.VoiceSettings(this.client, (await this.client.request("GET_VOICE_SETTINGS")).data);
    }
    /**
     * Used by hardware manufacturers to send information about the current state of their certified devices that are connected to Discord.
     * @param devices - a list of devices for your manufacturer, in order of priority
     * @returns
     */
    async setCeritfiedDevices(devices) {
        await this.client.request("SET_CERTIFIED_DEVICES", { devices });
    }
    /**
     * Used to accept an Ask to Join request.
     * @param userId - the id of the requesting user
     */
    async sendJoinInvite(userId) {
        await this.client.request("SEND_ACTIVITY_JOIN_INVITE", { user_id: userId });
    }
    /**
     * Used to reject an Ask to Join request.
     * @param userId - the id of the requesting user
     */
    async closeJoinRequest(userId) {
        await this.client.request("CLOSE_ACTIVITY_JOIN_REQUEST", { user_id: userId });
    }
    /**
     * Used to join text channels, group dms, or dms. Returns the [Get Channel](https://discord.com/developers/docs/topics/rpc#getchannel) response, or `null` if none.
     * @param channelId - channel id to join
     * @param timeout - asynchronously join channel with time to wait before timing out
     * @returns the text channel that user joined
     */
    async selectTextChannel(channelId, timeout) {
        return new Channel_1.Channel(this.client, (await this.client.request("SELECT_TEXT_CHANNEL", { channel_id: channelId, timeout })).data);
    }
    /**
     * Used to leave text channels, group dms, or dms.
     * @param timeout - asynchronously join channel with time to wait before timing out
     */
    async leaveTextChannel(timeout) {
        await this.client.request("SELECT_TEXT_CHANNEL", { channel_id: null, timeout });
    }
    async getRelationships() {
        return (await this.client.request("GET_RELATIONSHIPS")).data.relationships.map((data) => {
            return new User_1.User(this.client, { ...data.user, presence: data.presence });
        });
    }
    /**
     * Used to update a user's Rich Presence.
     *
     * @param activity - the rich presence to assign to the user
     * @param pid - the application's process id
     * @returns The activity that have been set
     */
    async setActivity(activity, pid) {
        const formattedAcitivity = {
            ...activity,
            assets: {},
            timestamps: {},
            party: {},
            secrets: {}
        };
        if (activity.startTimestamp instanceof Date) {
            formattedAcitivity.timestamps.start = Math.round(activity.startTimestamp.getTime());
        }
        else if (typeof activity.startTimestamp === "number") {
            formattedAcitivity.timestamps.start = activity.startTimestamp;
        }
        if (activity.endTimestamp instanceof Date) {
            formattedAcitivity.timestamps.end = Math.round(activity.endTimestamp.getTime());
        }
        else if (typeof activity.endTimestamp === "number") {
            formattedAcitivity.timestamps.end = activity.endTimestamp;
        }
        if (activity.largeImageKey)
            formattedAcitivity.assets.large_image = activity.largeImageKey;
        if (activity.smallImageKey)
            formattedAcitivity.assets.small_image = activity.smallImageKey;
        if (activity.largeImageText)
            formattedAcitivity.assets.large_text = activity.largeImageText;
        if (activity.smallImageText)
            formattedAcitivity.assets.small_text = activity.smallImageText;
        if (activity.partyId)
            formattedAcitivity.party.id = activity.partyId;
        if (activity.partyPrivacy)
            formattedAcitivity.party.privacy = activity.partyPrivacy;
        if (activity.partySize && activity.partyMax)
            formattedAcitivity.party.size = [activity.partySize, activity.partyMax];
        if (activity.joinSecret)
            formattedAcitivity.secrets.join = activity.joinSecret;
        if (activity.spectateSecret)
            formattedAcitivity.secrets.spectate = activity.spectateSecret;
        if (activity.matchSecret)
            formattedAcitivity.secrets.match = activity.matchSecret;
        if (activity.supportedPlatforms)
            formattedAcitivity.supported_platforms = activity.supportedPlatforms;
        if (Object.keys(formattedAcitivity.assets).length === 0)
            delete formattedAcitivity["assets"];
        if (Object.keys(formattedAcitivity.timestamps).length === 0)
            delete formattedAcitivity["timestamps"];
        if (Object.keys(formattedAcitivity.party).length === 0)
            delete formattedAcitivity["party"];
        if (Object.keys(formattedAcitivity.secrets).length === 0)
            delete formattedAcitivity["secrets"];
        formattedAcitivity.instance = !!activity.instance;
        // Clean-up
        delete formattedAcitivity["startTimestamp"];
        delete formattedAcitivity["endTimestamp"];
        delete formattedAcitivity["largeImageKey"];
        delete formattedAcitivity["smallImageKey"];
        delete formattedAcitivity["largeImageText"];
        delete formattedAcitivity["smallImageText"];
        delete formattedAcitivity["partyId"];
        delete formattedAcitivity["partyPrivacy"];
        delete formattedAcitivity["partySize"];
        delete formattedAcitivity["partyMax"];
        delete formattedAcitivity["joinSecret"];
        delete formattedAcitivity["spectateSecret"];
        delete formattedAcitivity["matchSecret"];
        delete formattedAcitivity["supportedPlatforms"];
        return (await this.client.request("SET_ACTIVITY", {
            pid: (pid ?? process) ? (process.pid ?? 0) : 0,
            activity: formattedAcitivity
        })).data;
    }
    /**
     * Used to clear a user's Rich Presence.
     *
     * @param pid - the application's process id
     */
    async clearActivity(pid) {
        await this.client.request("SET_ACTIVITY", { pid: (pid ?? process) ? (process.pid ?? 0) : 0 });
    }
    // #region Undocumented
    // This region holds method that are not documented by Discord BUT does exist
    // Also most of this might not even be correct, use at your own risk
    /**
     * Used to get a user's avatar
     * @param userId - id of the user to get the avatar of
     * @param format - image format
     * @param size - image size
     * @return base64 encoded image data
     */
    async getImage(userId, format = "png", size = 1024) {
        return (await this.client.request("GET_IMAGE", { type: "user", id: userId, format, size })).data.data_url;
    }
    /**
     * Requires RPC and RPC_VOICE_WRITE
     * @returns
     */
    async getSoundboardSounds() {
        return (await this.client.request("GET_SOUNDBOARD_SOUNDS")).data;
    }
    /**
     * Requires RPC and RPC_VOICE_WRITE
     * @returns
     */
    async playSoundboardSound(guildId, soundId) {
        return (await this.client.request("PLAY_SOUNDBOARD_SOUND", {
            guild_id: guildId,
            sound_id: soundId
        })).data;
    }
    /**
     * Requires RPC and RPC_VIDEO_WRITE
     * @returns
     */
    async toggleVideo() {
        return (await this.client.request("TOGGLE_VIDEO")).data;
    }
    /**
     * Requires RPC and RPC_SCREENSHARE_WRITE
     * @returns
     */
    async toggleScreenshare(pid) {
        return (await this.client.request("TOGGLE_SCREENSHARE", { pid })).data;
    }
    /**
     * Requires RPC and RPC_VOICE_WRITE
     * @returns
     */
    async setPushToTalk(active) {
        return (await this.client.request("PUSH_TO_TALK", { active })).data;
    }
    /**
     * Requires RPC and RPC_VOICE_WRITE
     * @returns
     */
    async setVoiceSettings(req) {
        return (await this.client.request("SET_VOICE_SETTINGS", req)).data;
    }
    /**
     * Requires RPC and RPC_VOICE_WRITE
     * @returns
     */
    async setVoiceSettings2(req) {
        return (await this.client.request("SET_VOICE_SETTINGS_2", req)).data;
    }
    /**
     * Requires RPC and RPC_GUILDS_MEMBERS_READ
     * @returns
     */
    async getChannelPermissions() {
        return (await this.client.request("GET_CHANNEL_PERMISSIONS")).data;
    }
    async getActivityInstanceConnectedParticipants() {
        return (await this.client.request("GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS")).data;
    }
    async navigateToConnections() {
        return (await this.client.request("NAVIGATE_TO_CONNECTIONS")).data;
    }
    async createChanenlInvite(channelId, args) {
        return (await this.client.request("CREATE_CHANNEL_INVITE", { channel_id: channelId, ...args })).data;
    }
    async openExternalLink(url) {
        return (await this.client.request("OPEN_EXTERNAL_LINK", { url })).data;
    }
    async getPlatformBehaviors() {
        return (await this.client.request("GET_PLATFORM_BEHAVIORS")).data;
    }
    async getProviderAccessToken(provider, connectionRedirect) {
        return (await this.client.request("GET_PROVIDER_ACCESS_TOKEN", { provider, connectionRedirect })).data;
    }
    async maybeGetProviderAccessToken(provider) {
        return (await this.client.request("MAYBE_GET_PROVIDER_ACCESS_TOKEN", { provider })).data;
    }
    async getSKUS() {
        return (await this.client.request("GET_SKUS")).data;
    }
    async getEntitlements() {
        return (await this.client.request("GET_ENTITLEMENTS")).data;
    }
    async getSKUsEmbedded() {
        return (await this.client.request("GET_SKUS_EMBEDDED")).data;
    }
    async getEntitlementsEmbedded() {
        return (await this.client.request("GET_ENTITLEMENTS_EMBEDDED")).data;
    }
    async encourageHardwareAcceleration() {
        return (await this.client.request("ENCOURAGE_HW_ACCELERATION")).data;
    }
    async captureLog(level, message) {
        return (await this.client.request("CAPTURE_LOG", { level, message })).data;
    }
    async sendAnalyticsEvent(eventName, eventProperties) {
        return (await this.client.request("SEND_ANALYTICS_EVENT", { eventName, eventProperties })).data;
    }
    async getLocale() {
        return (await this.client.request("USER_SETTINGS_GET_LOCALE")).data.locale;
    }
    async getAchievements() {
        return (await this.client.request("GET_USER_ACHIEVEMENTS")).data;
    }
    async setAchievement(achievementId, percentComplete) {
        return (await this.client.request("SET_USER_ACHIEVEMENT", {
            achievement_id: achievementId,
            percent_complete: percentComplete
        })).data;
    }
    async createNetworkingToken() {
        return (await this.client.request("NETWORKING_CREATE_TOKEN")).data;
    }
    async networkingPeerMetrics() {
        return (await this.client.request("NETWORKING_PEER_METRICS")).data;
    }
    async networkingSystemMetrics() {
        return (await this.client.request("NETWORKING_SYSTEM_METRICS")).data;
    }
    async getNetworkingConfig() {
        return (await this.client.request("GET_NETWORKING_CONFIG")).data;
    }
    async startPurchase(skuId, pid) {
        return (await this.client.request("START_PURCHASE", { sku_id: skuId, pid })).data;
    }
    async startPremiumPurchase(pid) {
        return (await this.client.request("START_PREMIUM_PURCHASE", { pid })).data;
    }
    async getApplicationTicket() {
        return (await this.client.request("GET_APPLICATION_TICKET")).data;
    }
    async getEntitlementTicket() {
        return (await this.client.request("GET_ENTITLEMENT_TICKET")).data;
    }
    async validateApplication() {
        return (await this.client.request("VALIDATE_APPLICATION")).data;
    }
    async openOverlayVoiceSettings(pid) {
        return (await this.client.request("OPEN_OVERLAY_VOICE_SETTINGS", { pid })).data;
    }
    async openOverlayGuildInvite(code, pid) {
        return (await this.client.request("OPEN_OVERLAY_GUILD_INVITE", { code, pid })).data;
    }
    async openOverlayActivityInvite(type, pid) {
        const typeToNumber = {
            JOIN: 0
        };
        return (await this.client.request("OPEN_OVERLAY_ACTIVITY_INVITE", { type: typeToNumber[type], pid })).data;
    }
    async setOverlayLocked(locked, pid) {
        return (await this.client.request("SET_OVERLAY_LOCKED", { locked, pid })).data;
    }
    async browserHandoff() {
        return (await this.client.request("BROWSER_HANDOFF")).data;
    }
    async openGuildTemplateBrowser(code) {
        return (await this.client.request("GUILD_TEMPLATE_BROWSER", { code })).data;
    }
    async openGiftCodeBrowser(code) {
        return (await this.client.request("GIFT_CODE_BROWSER", { code })).data;
    }
    async brainTreePopupBridgeCallback(state, path, query) {
        return (await this.client.request("BRAINTREE_POPUP_BRIDGE_CALLBACK", { state, path, query })).data;
    }
    async billingPopupBridgeCallback(state, path, query, paymentSourceType) {
        return (await this.client.request("BILLING_POPUP_BRIDGE_CALLBACK", {
            state,
            path,
            query,
            payment_source_type: paymentSourceType
        })).data;
    }
    async connectionsCallback(providerType, code, openIdParams, state) {
        return (await this.client.request("CONNECTIONS_CALLBACK", {
            providerType: providerType,
            code,
            open_id_params: openIdParams,
            state
        })).data;
    }
    async deepLink(type, params) {
        return (await this.client.request("DEEP_LINK", { type, params })).data;
    }
    async inviteBrowser(code) {
        return (await this.client.request("INVITE_BROWSER", { code })).data;
    }
    async initiateImageUpload() {
        return (await this.client.request("INITIATE_IMAGE_UPLOAD")).data;
    }
    async openShareMomentDialog(mediaUrl) {
        return (await this.client.request("OPEN_SHARE_MOMENT_DIALOG", { mediaUrl })).data;
    }
    async openInviteDialog() {
        return (await this.client.request("OPEN_INVITE_DIALOG")).data;
    }
    async acceptActivityInvite(type, userId, sessionId, channelId, messageId) {
        const typeToNumber = {
            JOIN: 0
        };
        return (await this.client.request("ACCEPT_ACTIVITY_INVITE", {
            type: typeToNumber[type],
            user_id: userId,
            session_id: sessionId,
            channel_id: channelId,
            message_id: messageId
        })).data;
    }
    async activityInviteUser(userId, type, content, pid) {
        const typeToNumber = {
            JOIN: 0
        };
        return (await this.client.request("ACTIVITY_INVITE_USER", {
            user_id: userId,
            type: typeToNumber[type],
            content,
            pid
        })).data;
    }
    async closeActivityJoinRequest(userId) {
        return (await this.client.request("CLOSE_ACTIVITY_JOIN_REQUEST", { user_id: userId })).data;
    }
    async sendActivityJoinInvite(userId, pid) {
        return (await this.client.request("SEND_ACTIVITY_JOIN_INVITE", { user_id: userId, pid })).data;
    }
    async setConfig(useInteractivePip) {
        return (await this.client.request("SET_CONFIG", { use_interactive_pip: useInteractivePip })).data;
    }
}
ClientUser$1.ClientUser = ClientUser;

var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$2 = Object.getOwnPropertyNames;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __name$4 = (target, value) => __defProp$4(target, "name", { value, configurable: true });
var __export$2 = (target, all) => {
  for (var name in all)
    __defProp$4(target, name, { get: all[name], enumerable: true });
};
var __copyProps$2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames$2(from))
      if (!__hasOwnProp$2.call(to, key) && key !== except)
        __defProp$4(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc$2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS$2 = (mod) => __copyProps$2(__defProp$4({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports$1 = {};
__export$2(src_exports$1, {
  calculateShardId: () => calculateShardId,
  getUserAgentAppendix: () => getUserAgentAppendix,
  isEquatable: () => isEquatable,
  isJSONEncodable: () => isJSONEncodable,
  lazy: () => lazy,
  polyfillDispose: () => polyfillDispose,
  range: () => range,
  shouldUseGlobalFetchAndWebSocket: () => shouldUseGlobalFetchAndWebSocket,
  version: () => version$2
});
var dist$2 = __toCommonJS$2(src_exports$1);

// src/functions/lazy.ts
function lazy(cb) {
  let defaultValue;
  return () => defaultValue ??= cb();
}
__name$4(lazy, "lazy");

// src/functions/range.ts
function* range(range2) {
  let rangeEnd;
  let start = 0;
  let step = 1;
  if (typeof range2 === "number") {
    rangeEnd = range2;
  } else {
    start = range2.start;
    rangeEnd = range2.end;
    step = range2.step ?? 1;
  }
  for (let index = start; index < rangeEnd; index += step) {
    yield index;
  }
}
__name$4(range, "range");

// src/functions/calculateShardId.ts
function calculateShardId(guildId, shardCount) {
  return Number(BigInt(guildId) >> 22n) % shardCount;
}
__name$4(calculateShardId, "calculateShardId");

// src/functions/runtime.ts
function shouldUseGlobalFetchAndWebSocket() {
  if (typeof globalThis.process === "undefined") {
    return "fetch" in globalThis && "WebSocket" in globalThis;
  }
  if ("versions" in globalThis.process) {
    return "deno" in globalThis.process.versions || "bun" in globalThis.process.versions;
  }
  return false;
}
__name$4(shouldUseGlobalFetchAndWebSocket, "shouldUseGlobalFetchAndWebSocket");

// src/functions/userAgentAppendix.ts
function getUserAgentAppendix() {
  if (typeof globalThis.EdgeRuntime !== "undefined") {
    return "Vercel-Edge-Functions";
  }
  if (typeof globalThis.R2 !== "undefined" && typeof globalThis.WebSocketPair !== "undefined") {
    return "Cloudflare-Workers";
  }
  if (typeof globalThis.Netlify !== "undefined") {
    return "Netlify-Edge-Functions";
  }
  if (typeof globalThis.process !== "object") {
    if (typeof globalThis.navigator === "object") {
      return globalThis.navigator.userAgent;
    }
    return "UnknownEnvironment";
  }
  if ("versions" in globalThis.process) {
    if ("deno" in globalThis.process.versions) {
      return `Deno/${globalThis.process.versions.deno}`;
    }
    if ("bun" in globalThis.process.versions) {
      return `Bun/${globalThis.process.versions.bun}`;
    }
    if ("node" in globalThis.process.versions) {
      return `Node.js/${globalThis.process.versions.node}`;
    }
  }
  return "UnknownEnvironment";
}
__name$4(getUserAgentAppendix, "getUserAgentAppendix");

// src/functions/polyfillDispose.ts
function polyfillDispose() {
  Symbol.dispose ??= Symbol("Symbol.dispose");
  Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");
}
__name$4(polyfillDispose, "polyfillDispose");

// src/JSONEncodable.ts
function isJSONEncodable(maybeEncodable) {
  return maybeEncodable !== null && typeof maybeEncodable === "object" && "toJSON" in maybeEncodable;
}
__name$4(isJSONEncodable, "isJSONEncodable");

// src/Equatable.ts
function isEquatable(maybeEquatable) {
  return maybeEquatable !== null && typeof maybeEquatable === "object" && "equals" in maybeEquatable;
}
__name$4(isEquatable, "isEquatable");

// src/index.ts
var version$2 = "1.1.1";

var v10$a = {};

var v10$9 = {};

var common$3 = {};

Object.defineProperty(common$3, "__esModule", { value: true });

(function (exports) {
	/**
	 * Types extracted from https://discord.com/developers/docs/topics/gateway
	 */
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GatewayDispatchEvents = exports.GatewayIntentBits = exports.GatewayCloseCodes = exports.GatewayOpcodes = exports.GatewayVersion = void 0;
	__exportStar(common$3, exports);
	exports.GatewayVersion = '10';
	/**
	 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
	 */
	var GatewayOpcodes;
	(function (GatewayOpcodes) {
	    /**
	     * An event was dispatched
	     */
	    GatewayOpcodes[GatewayOpcodes["Dispatch"] = 0] = "Dispatch";
	    /**
	     * A bidirectional opcode to maintain an active gateway connection.
	     * Fired periodically by the client, or fired by the gateway to request an immediate heartbeat from the client.
	     */
	    GatewayOpcodes[GatewayOpcodes["Heartbeat"] = 1] = "Heartbeat";
	    /**
	     * Starts a new session during the initial handshake
	     */
	    GatewayOpcodes[GatewayOpcodes["Identify"] = 2] = "Identify";
	    /**
	     * Update the client's presence
	     */
	    GatewayOpcodes[GatewayOpcodes["PresenceUpdate"] = 3] = "PresenceUpdate";
	    /**
	     * Used to join/leave or move between voice channels
	     */
	    GatewayOpcodes[GatewayOpcodes["VoiceStateUpdate"] = 4] = "VoiceStateUpdate";
	    /**
	     * Resume a previous session that was disconnected
	     */
	    GatewayOpcodes[GatewayOpcodes["Resume"] = 6] = "Resume";
	    /**
	     * You should attempt to reconnect and resume immediately
	     */
	    GatewayOpcodes[GatewayOpcodes["Reconnect"] = 7] = "Reconnect";
	    /**
	     * Request information about offline guild members in a large guild
	     */
	    GatewayOpcodes[GatewayOpcodes["RequestGuildMembers"] = 8] = "RequestGuildMembers";
	    /**
	     * The session has been invalidated. You should reconnect and identify/resume accordingly
	     */
	    GatewayOpcodes[GatewayOpcodes["InvalidSession"] = 9] = "InvalidSession";
	    /**
	     * Sent immediately after connecting, contains the `heartbeat_interval` to use
	     */
	    GatewayOpcodes[GatewayOpcodes["Hello"] = 10] = "Hello";
	    /**
	     * Sent in response to receiving a heartbeat to acknowledge that it has been received
	     */
	    GatewayOpcodes[GatewayOpcodes["HeartbeatAck"] = 11] = "HeartbeatAck";
	})(GatewayOpcodes || (exports.GatewayOpcodes = GatewayOpcodes = {}));
	/**
	 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
	 */
	var GatewayCloseCodes;
	(function (GatewayCloseCodes) {
	    /**
	     * We're not sure what went wrong. Try reconnecting?
	     */
	    GatewayCloseCodes[GatewayCloseCodes["UnknownError"] = 4000] = "UnknownError";
	    /**
	     * You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that!
	     *
	     * See https://discord.com/developers/docs/topics/gateway-events#payload-structure
	     */
	    GatewayCloseCodes[GatewayCloseCodes["UnknownOpcode"] = 4001] = "UnknownOpcode";
	    /**
	     * You sent an invalid payload to us. Don't do that!
	     *
	     * See https://discord.com/developers/docs/topics/gateway#sending-events
	     */
	    GatewayCloseCodes[GatewayCloseCodes["DecodeError"] = 4002] = "DecodeError";
	    /**
	     * You sent us a payload prior to identifying
	     *
	     * See https://discord.com/developers/docs/topics/gateway-events#identify
	     */
	    GatewayCloseCodes[GatewayCloseCodes["NotAuthenticated"] = 4003] = "NotAuthenticated";
	    /**
	     * The account token sent with your identify payload is incorrect
	     *
	     * See https://discord.com/developers/docs/topics/gateway-events#identify
	     */
	    GatewayCloseCodes[GatewayCloseCodes["AuthenticationFailed"] = 4004] = "AuthenticationFailed";
	    /**
	     * You sent more than one identify payload. Don't do that!
	     */
	    GatewayCloseCodes[GatewayCloseCodes["AlreadyAuthenticated"] = 4005] = "AlreadyAuthenticated";
	    /**
	     * The sequence sent when resuming the session was invalid. Reconnect and start a new session
	     *
	     * See https://discord.com/developers/docs/topics/gateway-events#resume
	     */
	    GatewayCloseCodes[GatewayCloseCodes["InvalidSeq"] = 4007] = "InvalidSeq";
	    /**
	     * Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this
	     */
	    GatewayCloseCodes[GatewayCloseCodes["RateLimited"] = 4008] = "RateLimited";
	    /**
	     * Your session timed out. Reconnect and start a new one
	     */
	    GatewayCloseCodes[GatewayCloseCodes["SessionTimedOut"] = 4009] = "SessionTimedOut";
	    /**
	     * You sent us an invalid shard when identifying
	     *
	     * See https://discord.com/developers/docs/topics/gateway#sharding
	     */
	    GatewayCloseCodes[GatewayCloseCodes["InvalidShard"] = 4010] = "InvalidShard";
	    /**
	     * The session would have handled too many guilds - you are required to shard your connection in order to connect
	     *
	     * See https://discord.com/developers/docs/topics/gateway#sharding
	     */
	    GatewayCloseCodes[GatewayCloseCodes["ShardingRequired"] = 4011] = "ShardingRequired";
	    /**
	     * You sent an invalid version for the gateway
	     */
	    GatewayCloseCodes[GatewayCloseCodes["InvalidAPIVersion"] = 4012] = "InvalidAPIVersion";
	    /**
	     * You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value
	     *
	     * See https://discord.com/developers/docs/topics/gateway#gateway-intents
	     */
	    GatewayCloseCodes[GatewayCloseCodes["InvalidIntents"] = 4013] = "InvalidIntents";
	    /**
	     * You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not
	     * enabled or are not whitelisted for
	     *
	     * See https://discord.com/developers/docs/topics/gateway#gateway-intents
	     *
	     * See https://discord.com/developers/docs/topics/gateway#privileged-intents
	     */
	    GatewayCloseCodes[GatewayCloseCodes["DisallowedIntents"] = 4014] = "DisallowedIntents";
	})(GatewayCloseCodes || (exports.GatewayCloseCodes = GatewayCloseCodes = {}));
	/**
	 * https://discord.com/developers/docs/topics/gateway#list-of-intents
	 */
	var GatewayIntentBits;
	(function (GatewayIntentBits) {
	    GatewayIntentBits[GatewayIntentBits["Guilds"] = 1] = "Guilds";
	    GatewayIntentBits[GatewayIntentBits["GuildMembers"] = 2] = "GuildMembers";
	    GatewayIntentBits[GatewayIntentBits["GuildModeration"] = 4] = "GuildModeration";
	    /**
	     * @deprecated This is the old name for {@apilink GatewayIntentBits#GuildModeration}
	     */
	    GatewayIntentBits[GatewayIntentBits["GuildBans"] = 4] = "GuildBans";
	    GatewayIntentBits[GatewayIntentBits["GuildEmojisAndStickers"] = 8] = "GuildEmojisAndStickers";
	    GatewayIntentBits[GatewayIntentBits["GuildIntegrations"] = 16] = "GuildIntegrations";
	    GatewayIntentBits[GatewayIntentBits["GuildWebhooks"] = 32] = "GuildWebhooks";
	    GatewayIntentBits[GatewayIntentBits["GuildInvites"] = 64] = "GuildInvites";
	    GatewayIntentBits[GatewayIntentBits["GuildVoiceStates"] = 128] = "GuildVoiceStates";
	    GatewayIntentBits[GatewayIntentBits["GuildPresences"] = 256] = "GuildPresences";
	    GatewayIntentBits[GatewayIntentBits["GuildMessages"] = 512] = "GuildMessages";
	    GatewayIntentBits[GatewayIntentBits["GuildMessageReactions"] = 1024] = "GuildMessageReactions";
	    GatewayIntentBits[GatewayIntentBits["GuildMessageTyping"] = 2048] = "GuildMessageTyping";
	    GatewayIntentBits[GatewayIntentBits["DirectMessages"] = 4096] = "DirectMessages";
	    GatewayIntentBits[GatewayIntentBits["DirectMessageReactions"] = 8192] = "DirectMessageReactions";
	    GatewayIntentBits[GatewayIntentBits["DirectMessageTyping"] = 16384] = "DirectMessageTyping";
	    GatewayIntentBits[GatewayIntentBits["MessageContent"] = 32768] = "MessageContent";
	    GatewayIntentBits[GatewayIntentBits["GuildScheduledEvents"] = 65536] = "GuildScheduledEvents";
	    GatewayIntentBits[GatewayIntentBits["AutoModerationConfiguration"] = 1048576] = "AutoModerationConfiguration";
	    GatewayIntentBits[GatewayIntentBits["AutoModerationExecution"] = 2097152] = "AutoModerationExecution";
	    GatewayIntentBits[GatewayIntentBits["GuildMessagePolls"] = 16777216] = "GuildMessagePolls";
	    GatewayIntentBits[GatewayIntentBits["DirectMessagePolls"] = 33554432] = "DirectMessagePolls";
	})(GatewayIntentBits || (exports.GatewayIntentBits = GatewayIntentBits = {}));
	/**
	 * https://discord.com/developers/docs/topics/gateway-events#receive-events
	 */
	var GatewayDispatchEvents;
	(function (GatewayDispatchEvents) {
	    GatewayDispatchEvents["ApplicationCommandPermissionsUpdate"] = "APPLICATION_COMMAND_PERMISSIONS_UPDATE";
	    GatewayDispatchEvents["ChannelCreate"] = "CHANNEL_CREATE";
	    GatewayDispatchEvents["ChannelDelete"] = "CHANNEL_DELETE";
	    GatewayDispatchEvents["ChannelPinsUpdate"] = "CHANNEL_PINS_UPDATE";
	    GatewayDispatchEvents["ChannelUpdate"] = "CHANNEL_UPDATE";
	    GatewayDispatchEvents["GuildBanAdd"] = "GUILD_BAN_ADD";
	    GatewayDispatchEvents["GuildBanRemove"] = "GUILD_BAN_REMOVE";
	    GatewayDispatchEvents["GuildCreate"] = "GUILD_CREATE";
	    GatewayDispatchEvents["GuildDelete"] = "GUILD_DELETE";
	    GatewayDispatchEvents["GuildEmojisUpdate"] = "GUILD_EMOJIS_UPDATE";
	    GatewayDispatchEvents["GuildIntegrationsUpdate"] = "GUILD_INTEGRATIONS_UPDATE";
	    GatewayDispatchEvents["GuildMemberAdd"] = "GUILD_MEMBER_ADD";
	    GatewayDispatchEvents["GuildMemberRemove"] = "GUILD_MEMBER_REMOVE";
	    GatewayDispatchEvents["GuildMembersChunk"] = "GUILD_MEMBERS_CHUNK";
	    GatewayDispatchEvents["GuildMemberUpdate"] = "GUILD_MEMBER_UPDATE";
	    GatewayDispatchEvents["GuildRoleCreate"] = "GUILD_ROLE_CREATE";
	    GatewayDispatchEvents["GuildRoleDelete"] = "GUILD_ROLE_DELETE";
	    GatewayDispatchEvents["GuildRoleUpdate"] = "GUILD_ROLE_UPDATE";
	    GatewayDispatchEvents["GuildStickersUpdate"] = "GUILD_STICKERS_UPDATE";
	    GatewayDispatchEvents["GuildUpdate"] = "GUILD_UPDATE";
	    GatewayDispatchEvents["IntegrationCreate"] = "INTEGRATION_CREATE";
	    GatewayDispatchEvents["IntegrationDelete"] = "INTEGRATION_DELETE";
	    GatewayDispatchEvents["IntegrationUpdate"] = "INTEGRATION_UPDATE";
	    GatewayDispatchEvents["InteractionCreate"] = "INTERACTION_CREATE";
	    GatewayDispatchEvents["InviteCreate"] = "INVITE_CREATE";
	    GatewayDispatchEvents["InviteDelete"] = "INVITE_DELETE";
	    GatewayDispatchEvents["MessageCreate"] = "MESSAGE_CREATE";
	    GatewayDispatchEvents["MessageDelete"] = "MESSAGE_DELETE";
	    GatewayDispatchEvents["MessageDeleteBulk"] = "MESSAGE_DELETE_BULK";
	    GatewayDispatchEvents["MessageReactionAdd"] = "MESSAGE_REACTION_ADD";
	    GatewayDispatchEvents["MessageReactionRemove"] = "MESSAGE_REACTION_REMOVE";
	    GatewayDispatchEvents["MessageReactionRemoveAll"] = "MESSAGE_REACTION_REMOVE_ALL";
	    GatewayDispatchEvents["MessageReactionRemoveEmoji"] = "MESSAGE_REACTION_REMOVE_EMOJI";
	    GatewayDispatchEvents["MessageUpdate"] = "MESSAGE_UPDATE";
	    GatewayDispatchEvents["PresenceUpdate"] = "PRESENCE_UPDATE";
	    GatewayDispatchEvents["StageInstanceCreate"] = "STAGE_INSTANCE_CREATE";
	    GatewayDispatchEvents["StageInstanceDelete"] = "STAGE_INSTANCE_DELETE";
	    GatewayDispatchEvents["StageInstanceUpdate"] = "STAGE_INSTANCE_UPDATE";
	    GatewayDispatchEvents["Ready"] = "READY";
	    GatewayDispatchEvents["Resumed"] = "RESUMED";
	    GatewayDispatchEvents["ThreadCreate"] = "THREAD_CREATE";
	    GatewayDispatchEvents["ThreadDelete"] = "THREAD_DELETE";
	    GatewayDispatchEvents["ThreadListSync"] = "THREAD_LIST_SYNC";
	    GatewayDispatchEvents["ThreadMembersUpdate"] = "THREAD_MEMBERS_UPDATE";
	    GatewayDispatchEvents["ThreadMemberUpdate"] = "THREAD_MEMBER_UPDATE";
	    GatewayDispatchEvents["ThreadUpdate"] = "THREAD_UPDATE";
	    GatewayDispatchEvents["TypingStart"] = "TYPING_START";
	    GatewayDispatchEvents["UserUpdate"] = "USER_UPDATE";
	    GatewayDispatchEvents["VoiceServerUpdate"] = "VOICE_SERVER_UPDATE";
	    GatewayDispatchEvents["VoiceStateUpdate"] = "VOICE_STATE_UPDATE";
	    GatewayDispatchEvents["WebhooksUpdate"] = "WEBHOOKS_UPDATE";
	    GatewayDispatchEvents["MessagePollVoteAdd"] = "MESSAGE_POLL_VOTE_ADD";
	    GatewayDispatchEvents["MessagePollVoteRemove"] = "MESSAGE_POLL_VOTE_REMOVE";
	    GatewayDispatchEvents["GuildScheduledEventCreate"] = "GUILD_SCHEDULED_EVENT_CREATE";
	    GatewayDispatchEvents["GuildScheduledEventUpdate"] = "GUILD_SCHEDULED_EVENT_UPDATE";
	    GatewayDispatchEvents["GuildScheduledEventDelete"] = "GUILD_SCHEDULED_EVENT_DELETE";
	    GatewayDispatchEvents["GuildScheduledEventUserAdd"] = "GUILD_SCHEDULED_EVENT_USER_ADD";
	    GatewayDispatchEvents["GuildScheduledEventUserRemove"] = "GUILD_SCHEDULED_EVENT_USER_REMOVE";
	    GatewayDispatchEvents["AutoModerationRuleCreate"] = "AUTO_MODERATION_RULE_CREATE";
	    GatewayDispatchEvents["AutoModerationRuleUpdate"] = "AUTO_MODERATION_RULE_UPDATE";
	    GatewayDispatchEvents["AutoModerationRuleDelete"] = "AUTO_MODERATION_RULE_DELETE";
	    GatewayDispatchEvents["AutoModerationActionExecution"] = "AUTO_MODERATION_ACTION_EXECUTION";
	    GatewayDispatchEvents["GuildAuditLogEntryCreate"] = "GUILD_AUDIT_LOG_ENTRY_CREATE";
	    GatewayDispatchEvents["EntitlementCreate"] = "ENTITLEMENT_CREATE";
	    GatewayDispatchEvents["EntitlementUpdate"] = "ENTITLEMENT_UPDATE";
	    GatewayDispatchEvents["EntitlementDelete"] = "ENTITLEMENT_DELETE";
	})(GatewayDispatchEvents || (exports.GatewayDispatchEvents = GatewayDispatchEvents = {}));
	// #endregion Shared
	
} (v10$9));

var mod$4 = /*@__PURE__*/getDefaultExportFromCjs(v10$9);

const GatewayCloseCodes = mod$4.GatewayCloseCodes;
const GatewayDispatchEvents = mod$4.GatewayDispatchEvents;
const GatewayIntentBits = mod$4.GatewayIntentBits;
const GatewayOpcodes = mod$4.GatewayOpcodes;
const GatewayVersion = mod$4.GatewayVersion;

var v10$8 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	GatewayCloseCodes: GatewayCloseCodes,
	GatewayDispatchEvents: GatewayDispatchEvents,
	GatewayIntentBits: GatewayIntentBits,
	GatewayOpcodes: GatewayOpcodes,
	GatewayVersion: GatewayVersion,
	default: mod$4
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(v10$8);

var globals$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FormattingPatterns = void 0;
	/**
	 * https://discord.com/developers/docs/reference#message-formatting-formats
	 */
	exports.FormattingPatterns = {
	    /**
	     * Regular expression for matching a user mention, strictly without a nickname
	     *
	     * The `id` group property is present on the `exec` result of this expression
	     */
	    User: /<@(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching a user mention, strictly with a nickname
	     *
	     * The `id` group property is present on the `exec` result of this expression
	     *
	     * @deprecated Passing `!` in user mentions is no longer necessary / supported, and future message contents won't have it
	     */
	    UserWithNickname: /<@!(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching a user mention, with or without a nickname
	     *
	     * The `id` group property is present on the `exec` result of this expression
	     *
	     * @deprecated Passing `!` in user mentions is no longer necessary / supported, and future message contents won't have it
	     */
	    UserWithOptionalNickname: /<@!?(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching a channel mention
	     *
	     * The `id` group property is present on the `exec` result of this expression
	     */
	    Channel: /<#(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching a role mention
	     *
	     * The `id` group property is present on the `exec` result of this expression
	     */
	    Role: /<@&(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching a application command mention
	     *
	     * The `fullName` (possibly including `name`, `subcommandOrGroup` and `subcommand`) and `id` group properties are present on the `exec` result of this expression
	     */
	    SlashCommand: 
	    // eslint-disable-next-line unicorn/no-unsafe-regex
	    /<\/(?<fullName>(?<name>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32})(?: (?<subcommandOrGroup>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?(?: (?<subcommand>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?):(?<id>\d{17,20})>/u,
	    /**
	     * Regular expression for matching a custom emoji, either static or animated
	     *
	     * The `animated`, `name` and `id` group properties are present on the `exec` result of this expression
	     */
	    Emoji: /<(?<animated>a)?:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching strictly an animated custom emoji
	     *
	     * The `animated`, `name` and `id` group properties are present on the `exec` result of this expression
	     */
	    AnimatedEmoji: /<(?<animated>a):(?<name>\w{2,32}):(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching strictly a static custom emoji
	     *
	     * The `name` and `id` group properties are present on the `exec` result of this expression
	     */
	    StaticEmoji: /<:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
	    /**
	     * Regular expression for matching a timestamp, either default or custom styled
	     *
	     * The `timestamp` and `style` group properties are present on the `exec` result of this expression
	     */
	    // eslint-disable-next-line prefer-named-capture-group
	    Timestamp: /<t:(?<timestamp>-?\d{1,13})(:(?<style>[DFRTdft]))?>/,
	    /**
	     * Regular expression for matching strictly default styled timestamps
	     *
	     * The `timestamp` group property is present on the `exec` result of this expression
	     */
	    DefaultStyledTimestamp: /<t:(?<timestamp>-?\d{1,13})>/,
	    /**
	     * Regular expression for matching strictly custom styled timestamps
	     *
	     * The `timestamp` and `style` group properties are present on the `exec` result of this expression
	     */
	    StyledTimestamp: /<t:(?<timestamp>-?\d{1,13}):(?<style>[DFRTdft])>/,
	};
	/**
	 * Freezes the formatting patterns
	 *
	 * @internal
	 */
	Object.freeze(exports.FormattingPatterns);
	
} (globals$1));

var mod$3 = /*@__PURE__*/getDefaultExportFromCjs(globals$1);

const FormattingPatterns = mod$3.FormattingPatterns;

var globals = /*#__PURE__*/Object.freeze({
	__proto__: null,
	FormattingPatterns: FormattingPatterns,
	default: mod$3
});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(globals);

var v10$7 = {};

var common$2 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PermissionFlagsBits = void 0;
	/**
	 * https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
	 *
	 * These flags are exported as `BigInt`s and NOT numbers. Wrapping them in `Number()`
	 * may cause issues, try to use BigInts as much as possible or modules that can
	 * replicate them in some way
	 */
	exports.PermissionFlagsBits = {
	    /**
	     * Allows creation of instant invites
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    CreateInstantInvite: 1n << 0n,
	    /**
	     * Allows kicking members
	     */
	    // eslint-disable-next-line sonarjs/no-identical-expressions
	    KickMembers: 1n << 1n,
	    /**
	     * Allows banning members
	     */
	    BanMembers: 1n << 2n,
	    /**
	     * Allows all permissions and bypasses channel permission overwrites
	     */
	    Administrator: 1n << 3n,
	    /**
	     * Allows management and editing of channels
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    ManageChannels: 1n << 4n,
	    /**
	     * Allows management and editing of the guild
	     */
	    ManageGuild: 1n << 5n,
	    /**
	     * Allows for the addition of reactions to messages
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    AddReactions: 1n << 6n,
	    /**
	     * Allows for viewing of audit logs
	     */
	    ViewAuditLog: 1n << 7n,
	    /**
	     * Allows for using priority speaker in a voice channel
	     *
	     * Applies to channel types: Voice
	     */
	    PrioritySpeaker: 1n << 8n,
	    /**
	     * Allows the user to go live
	     *
	     * Applies to channel types: Voice, Stage
	     */
	    Stream: 1n << 9n,
	    /**
	     * Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    ViewChannel: 1n << 10n,
	    /**
	     * Allows for sending messages in a channel and creating threads in a forum
	     * (does not allow sending messages in threads)
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    SendMessages: 1n << 11n,
	    /**
	     * Allows for sending of `/tts` messages
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    SendTTSMessages: 1n << 12n,
	    /**
	     * Allows for deletion of other users messages
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    ManageMessages: 1n << 13n,
	    /**
	     * Links sent by users with this permission will be auto-embedded
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    EmbedLinks: 1n << 14n,
	    /**
	     * Allows for uploading images and files
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    AttachFiles: 1n << 15n,
	    /**
	     * Allows for reading of message history
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    ReadMessageHistory: 1n << 16n,
	    /**
	     * Allows for using the `@everyone` tag to notify all users in a channel,
	     * and the `@here` tag to notify all online users in a channel
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    MentionEveryone: 1n << 17n,
	    /**
	     * Allows the usage of custom emojis from other servers
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    UseExternalEmojis: 1n << 18n,
	    /**
	     * Allows for viewing guild insights
	     */
	    ViewGuildInsights: 1n << 19n,
	    /**
	     * Allows for joining of a voice channel
	     *
	     * Applies to channel types: Voice, Stage
	     */
	    Connect: 1n << 20n,
	    /**
	     * Allows for speaking in a voice channel
	     *
	     * Applies to channel types: Voice
	     */
	    Speak: 1n << 21n,
	    /**
	     * Allows for muting members in a voice channel
	     *
	     * Applies to channel types: Voice, Stage
	     */
	    MuteMembers: 1n << 22n,
	    /**
	     * Allows for deafening of members in a voice channel
	     *
	     * Applies to channel types: Voice
	     */
	    DeafenMembers: 1n << 23n,
	    /**
	     * Allows for moving of members between voice channels
	     *
	     * Applies to channel types: Voice, Stage
	     */
	    MoveMembers: 1n << 24n,
	    /**
	     * Allows for using voice-activity-detection in a voice channel
	     *
	     * Applies to channel types: Voice
	     */
	    UseVAD: 1n << 25n,
	    /**
	     * Allows for modification of own nickname
	     */
	    ChangeNickname: 1n << 26n,
	    /**
	     * Allows for modification of other users nicknames
	     */
	    ManageNicknames: 1n << 27n,
	    /**
	     * Allows management and editing of roles
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    ManageRoles: 1n << 28n,
	    /**
	     * Allows management and editing of webhooks
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    ManageWebhooks: 1n << 29n,
	    /**
	     * Allows management and editing of emojis, stickers, and soundboard sounds
	     *
	     * @deprecated This is the old name for {@apilink PermissionFlagsBits#ManageGuildExpressions}
	     */
	    ManageEmojisAndStickers: 1n << 30n,
	    /**
	     * Allows for editing and deleting emojis, stickers, and soundboard sounds created by all users
	     */
	    ManageGuildExpressions: 1n << 30n,
	    /**
	     * Allows members to use application commands, including slash commands and context menu commands
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    UseApplicationCommands: 1n << 31n,
	    /**
	     * Allows for requesting to speak in stage channels
	     *
	     * Applies to channel types: Stage
	     */
	    RequestToSpeak: 1n << 32n,
	    /**
	     * Allows for editing and deleting scheduled events created by all users
	     *
	     * Applies to channel types: Voice, Stage
	     */
	    ManageEvents: 1n << 33n,
	    /**
	     * Allows for deleting and archiving threads, and viewing all private threads
	     *
	     * Applies to channel types: Text
	     */
	    ManageThreads: 1n << 34n,
	    /**
	     * Allows for creating public and announcement threads
	     *
	     * Applies to channel types: Text
	     */
	    CreatePublicThreads: 1n << 35n,
	    /**
	     * Allows for creating private threads
	     *
	     * Applies to channel types: Text
	     */
	    CreatePrivateThreads: 1n << 36n,
	    /**
	     * Allows the usage of custom stickers from other servers
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    UseExternalStickers: 1n << 37n,
	    /**
	     * Allows for sending messages in threads
	     *
	     * Applies to channel types: Text
	     */
	    SendMessagesInThreads: 1n << 38n,
	    /**
	     * Allows for using Activities (applications with the {@apilink ApplicationFlags.Embedded} flag) in a voice channel
	     *
	     * Applies to channel types: Voice
	     */
	    UseEmbeddedActivities: 1n << 39n,
	    /**
	     * Allows for timing out users to prevent them from sending or reacting to messages in chat and threads,
	     * and from speaking in voice and stage channels
	     */
	    ModerateMembers: 1n << 40n,
	    /**
	     * Allows for viewing role subscription insights
	     */
	    ViewCreatorMonetizationAnalytics: 1n << 41n,
	    /**
	     * Allows for using soundboard in a voice channel
	     *
	     * Applies to channel types: Voice
	     */
	    UseSoundboard: 1n << 42n,
	    /**
	     * Allows for creating emojis, stickers, and soundboard sounds, and editing and deleting those created by the current user
	     */
	    CreateGuildExpressions: 1n << 43n,
	    /**
	     * Allows for creating scheduled events, and editing and deleting those created by the current user
	     *
	     * Applies to channel types: Voice, Stage
	     */
	    CreateEvents: 1n << 44n,
	    /**
	     * Allows the usage of custom soundboard sounds from other servers
	     *
	     * Applies to channel types: Voice
	     */
	    UseExternalSounds: 1n << 45n,
	    /**
	     * Allows sending voice messages
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    SendVoiceMessages: 1n << 46n,
	    /**
	     * Allows sending polls
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    SendPolls: 1n << 49n,
	    /**
	     * Allows user-installed apps to send public responses. When disabled, users will still be allowed to use their apps but the responses will be ephemeral. This only applies to apps not also installed to the server
	     *
	     * Applies to channel types: Text, Voice, Stage
	     */
	    UseExternalApps: 1n << 50n,
	};
	/**
	 * Freeze the object of bits, preventing any modifications to it
	 *
	 * @internal
	 */
	Object.freeze(exports.PermissionFlagsBits);
	
} (common$2));

var application$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/application
 */
Object.defineProperty(application$1, "__esModule", { value: true });
application$1.ApplicationRoleConnectionMetadataType = application$1.ApplicationFlags = void 0;
/**
 * https://discord.com/developers/docs/resources/application#application-object-application-flags
 */
var ApplicationFlags$1;
(function (ApplicationFlags) {
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["EmbeddedReleased"] = 2] = "EmbeddedReleased";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["ManagedEmoji"] = 4] = "ManagedEmoji";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["EmbeddedIAP"] = 8] = "EmbeddedIAP";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["GroupDMCreate"] = 16] = "GroupDMCreate";
    /**
     * Indicates if an app uses the Auto Moderation API
     */
    ApplicationFlags[ApplicationFlags["ApplicationAutoModerationRuleCreateBadge"] = 64] = "ApplicationAutoModerationRuleCreateBadge";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["RPCHasConnected"] = 2048] = "RPCHasConnected";
    /**
     * Intent required for bots in 100 or more servers to receive `presence_update` events
     */
    ApplicationFlags[ApplicationFlags["GatewayPresence"] = 4096] = "GatewayPresence";
    /**
     * Intent required for bots in under 100 servers to receive `presence_update` events, found in Bot Settings
     */
    ApplicationFlags[ApplicationFlags["GatewayPresenceLimited"] = 8192] = "GatewayPresenceLimited";
    /**
     * Intent required for bots in 100 or more servers to receive member-related events like `guild_member_add`.
     * See list of member-related events [under `GUILD_MEMBERS`](https://discord.com/developers/docs/topics/gateway#list-of-intents)
     */
    ApplicationFlags[ApplicationFlags["GatewayGuildMembers"] = 16384] = "GatewayGuildMembers";
    /**
     * Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found in Bot Settings.
     * See list of member-related events [under `GUILD_MEMBERS`](https://discord.com/developers/docs/topics/gateway#list-of-intents)
     */
    ApplicationFlags[ApplicationFlags["GatewayGuildMembersLimited"] = 32768] = "GatewayGuildMembersLimited";
    /**
     * Indicates unusual growth of an app that prevents verification
     */
    ApplicationFlags[ApplicationFlags["VerificationPendingGuildLimit"] = 65536] = "VerificationPendingGuildLimit";
    /**
     * Indicates if an app is embedded within the Discord client (currently unavailable publicly)
     */
    ApplicationFlags[ApplicationFlags["Embedded"] = 131072] = "Embedded";
    /**
     * Intent required for bots in 100 or more servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055)
     */
    ApplicationFlags[ApplicationFlags["GatewayMessageContent"] = 262144] = "GatewayMessageContent";
    /**
     * Intent required for bots in under 100 servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055),
     * found in Bot Settings
     */
    ApplicationFlags[ApplicationFlags["GatewayMessageContentLimited"] = 524288] = "GatewayMessageContentLimited";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["EmbeddedFirstParty"] = 1048576] = "EmbeddedFirstParty";
    /**
     * Indicates if an app has registered global [application commands](https://discord.com/developers/docs/interactions/application-commands)
     */
    ApplicationFlags[ApplicationFlags["ApplicationCommandBadge"] = 8388608] = "ApplicationCommandBadge";
})(ApplicationFlags$1 || (application$1.ApplicationFlags = ApplicationFlags$1 = {}));
/**
 * https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-type
 */
var ApplicationRoleConnectionMetadataType$1;
(function (ApplicationRoleConnectionMetadataType) {
    /**
     * The metadata value (`integer`) is less than or equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerLessThanOrEqual"] = 1] = "IntegerLessThanOrEqual";
    /**
     * The metadata value (`integer`) is greater than or equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerGreaterThanOrEqual"] = 2] = "IntegerGreaterThanOrEqual";
    /**
     * The metadata value (`integer`) is equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerEqual"] = 3] = "IntegerEqual";
    /**
     * The metadata value (`integer`) is not equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerNotEqual"] = 4] = "IntegerNotEqual";
    /**
     * The metadata value (`ISO8601 string`) is less than or equal to the guild's configured value (`integer`; days before current date)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["DatetimeLessThanOrEqual"] = 5] = "DatetimeLessThanOrEqual";
    /**
     * The metadata value (`ISO8601 string`) is greater than or equal to the guild's configured value (`integer`; days before current date)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["DatetimeGreaterThanOrEqual"] = 6] = "DatetimeGreaterThanOrEqual";
    /**
     * The metadata value (`integer`) is equal to the guild's configured value (`integer`; `1`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["BooleanEqual"] = 7] = "BooleanEqual";
    /**
     * The metadata value (`integer`) is not equal to the guild's configured value (`integer`; `1`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["BooleanNotEqual"] = 8] = "BooleanNotEqual";
})(ApplicationRoleConnectionMetadataType$1 || (application$1.ApplicationRoleConnectionMetadataType = ApplicationRoleConnectionMetadataType$1 = {}));

var auditLog$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/audit-log
 */
Object.defineProperty(auditLog$1, "__esModule", { value: true });
auditLog$1.AuditLogOptionsType = auditLog$1.AuditLogEvent = void 0;
/**
 * https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
 */
var AuditLogEvent$1;
(function (AuditLogEvent) {
    AuditLogEvent[AuditLogEvent["GuildUpdate"] = 1] = "GuildUpdate";
    AuditLogEvent[AuditLogEvent["ChannelCreate"] = 10] = "ChannelCreate";
    AuditLogEvent[AuditLogEvent["ChannelUpdate"] = 11] = "ChannelUpdate";
    AuditLogEvent[AuditLogEvent["ChannelDelete"] = 12] = "ChannelDelete";
    AuditLogEvent[AuditLogEvent["ChannelOverwriteCreate"] = 13] = "ChannelOverwriteCreate";
    AuditLogEvent[AuditLogEvent["ChannelOverwriteUpdate"] = 14] = "ChannelOverwriteUpdate";
    AuditLogEvent[AuditLogEvent["ChannelOverwriteDelete"] = 15] = "ChannelOverwriteDelete";
    AuditLogEvent[AuditLogEvent["MemberKick"] = 20] = "MemberKick";
    AuditLogEvent[AuditLogEvent["MemberPrune"] = 21] = "MemberPrune";
    AuditLogEvent[AuditLogEvent["MemberBanAdd"] = 22] = "MemberBanAdd";
    AuditLogEvent[AuditLogEvent["MemberBanRemove"] = 23] = "MemberBanRemove";
    AuditLogEvent[AuditLogEvent["MemberUpdate"] = 24] = "MemberUpdate";
    AuditLogEvent[AuditLogEvent["MemberRoleUpdate"] = 25] = "MemberRoleUpdate";
    AuditLogEvent[AuditLogEvent["MemberMove"] = 26] = "MemberMove";
    AuditLogEvent[AuditLogEvent["MemberDisconnect"] = 27] = "MemberDisconnect";
    AuditLogEvent[AuditLogEvent["BotAdd"] = 28] = "BotAdd";
    AuditLogEvent[AuditLogEvent["RoleCreate"] = 30] = "RoleCreate";
    AuditLogEvent[AuditLogEvent["RoleUpdate"] = 31] = "RoleUpdate";
    AuditLogEvent[AuditLogEvent["RoleDelete"] = 32] = "RoleDelete";
    AuditLogEvent[AuditLogEvent["InviteCreate"] = 40] = "InviteCreate";
    AuditLogEvent[AuditLogEvent["InviteUpdate"] = 41] = "InviteUpdate";
    AuditLogEvent[AuditLogEvent["InviteDelete"] = 42] = "InviteDelete";
    AuditLogEvent[AuditLogEvent["WebhookCreate"] = 50] = "WebhookCreate";
    AuditLogEvent[AuditLogEvent["WebhookUpdate"] = 51] = "WebhookUpdate";
    AuditLogEvent[AuditLogEvent["WebhookDelete"] = 52] = "WebhookDelete";
    AuditLogEvent[AuditLogEvent["EmojiCreate"] = 60] = "EmojiCreate";
    AuditLogEvent[AuditLogEvent["EmojiUpdate"] = 61] = "EmojiUpdate";
    AuditLogEvent[AuditLogEvent["EmojiDelete"] = 62] = "EmojiDelete";
    AuditLogEvent[AuditLogEvent["MessageDelete"] = 72] = "MessageDelete";
    AuditLogEvent[AuditLogEvent["MessageBulkDelete"] = 73] = "MessageBulkDelete";
    AuditLogEvent[AuditLogEvent["MessagePin"] = 74] = "MessagePin";
    AuditLogEvent[AuditLogEvent["MessageUnpin"] = 75] = "MessageUnpin";
    AuditLogEvent[AuditLogEvent["IntegrationCreate"] = 80] = "IntegrationCreate";
    AuditLogEvent[AuditLogEvent["IntegrationUpdate"] = 81] = "IntegrationUpdate";
    AuditLogEvent[AuditLogEvent["IntegrationDelete"] = 82] = "IntegrationDelete";
    AuditLogEvent[AuditLogEvent["StageInstanceCreate"] = 83] = "StageInstanceCreate";
    AuditLogEvent[AuditLogEvent["StageInstanceUpdate"] = 84] = "StageInstanceUpdate";
    AuditLogEvent[AuditLogEvent["StageInstanceDelete"] = 85] = "StageInstanceDelete";
    AuditLogEvent[AuditLogEvent["StickerCreate"] = 90] = "StickerCreate";
    AuditLogEvent[AuditLogEvent["StickerUpdate"] = 91] = "StickerUpdate";
    AuditLogEvent[AuditLogEvent["StickerDelete"] = 92] = "StickerDelete";
    AuditLogEvent[AuditLogEvent["GuildScheduledEventCreate"] = 100] = "GuildScheduledEventCreate";
    AuditLogEvent[AuditLogEvent["GuildScheduledEventUpdate"] = 101] = "GuildScheduledEventUpdate";
    AuditLogEvent[AuditLogEvent["GuildScheduledEventDelete"] = 102] = "GuildScheduledEventDelete";
    AuditLogEvent[AuditLogEvent["ThreadCreate"] = 110] = "ThreadCreate";
    AuditLogEvent[AuditLogEvent["ThreadUpdate"] = 111] = "ThreadUpdate";
    AuditLogEvent[AuditLogEvent["ThreadDelete"] = 112] = "ThreadDelete";
    AuditLogEvent[AuditLogEvent["ApplicationCommandPermissionUpdate"] = 121] = "ApplicationCommandPermissionUpdate";
    AuditLogEvent[AuditLogEvent["AutoModerationRuleCreate"] = 140] = "AutoModerationRuleCreate";
    AuditLogEvent[AuditLogEvent["AutoModerationRuleUpdate"] = 141] = "AutoModerationRuleUpdate";
    AuditLogEvent[AuditLogEvent["AutoModerationRuleDelete"] = 142] = "AutoModerationRuleDelete";
    AuditLogEvent[AuditLogEvent["AutoModerationBlockMessage"] = 143] = "AutoModerationBlockMessage";
    AuditLogEvent[AuditLogEvent["AutoModerationFlagToChannel"] = 144] = "AutoModerationFlagToChannel";
    AuditLogEvent[AuditLogEvent["AutoModerationUserCommunicationDisabled"] = 145] = "AutoModerationUserCommunicationDisabled";
    AuditLogEvent[AuditLogEvent["CreatorMonetizationRequestCreated"] = 150] = "CreatorMonetizationRequestCreated";
    AuditLogEvent[AuditLogEvent["CreatorMonetizationTermsAccepted"] = 151] = "CreatorMonetizationTermsAccepted";
    AuditLogEvent[AuditLogEvent["OnboardingPromptCreate"] = 163] = "OnboardingPromptCreate";
    AuditLogEvent[AuditLogEvent["OnboardingPromptUpdate"] = 164] = "OnboardingPromptUpdate";
    AuditLogEvent[AuditLogEvent["OnboardingPromptDelete"] = 165] = "OnboardingPromptDelete";
    AuditLogEvent[AuditLogEvent["OnboardingCreate"] = 166] = "OnboardingCreate";
    AuditLogEvent[AuditLogEvent["OnboardingUpdate"] = 167] = "OnboardingUpdate";
    AuditLogEvent[AuditLogEvent["HomeSettingsCreate"] = 190] = "HomeSettingsCreate";
    AuditLogEvent[AuditLogEvent["HomeSettingsUpdate"] = 191] = "HomeSettingsUpdate";
})(AuditLogEvent$1 || (auditLog$1.AuditLogEvent = AuditLogEvent$1 = {}));
var AuditLogOptionsType$1;
(function (AuditLogOptionsType) {
    AuditLogOptionsType["Role"] = "0";
    AuditLogOptionsType["Member"] = "1";
})(AuditLogOptionsType$1 || (auditLog$1.AuditLogOptionsType = AuditLogOptionsType$1 = {}));

var autoModeration$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/auto-moderation
 */
Object.defineProperty(autoModeration$1, "__esModule", { value: true });
autoModeration$1.AutoModerationActionType = autoModeration$1.AutoModerationRuleEventType = autoModeration$1.AutoModerationRuleKeywordPresetType = autoModeration$1.AutoModerationRuleTriggerType = void 0;
/**
 * https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types
 */
var AutoModerationRuleTriggerType$1;
(function (AutoModerationRuleTriggerType) {
    /**
     * Check if content contains words from a user defined list of keywords (Maximum of 6 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["Keyword"] = 1] = "Keyword";
    /**
     * Check if content represents generic spam (Maximum of 1 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["Spam"] = 3] = "Spam";
    /**
     * Check if content contains words from internal pre-defined wordsets (Maximum of 1 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["KeywordPreset"] = 4] = "KeywordPreset";
    /**
     * Check if content contains more mentions than allowed (Maximum of 1 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["MentionSpam"] = 5] = "MentionSpam";
    /**
     * Check if member profile contains words from a user defined list of keywords (Maximum of 1 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["MemberProfile"] = 6] = "MemberProfile";
})(AutoModerationRuleTriggerType$1 || (autoModeration$1.AutoModerationRuleTriggerType = AutoModerationRuleTriggerType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-preset-types
 */
var AutoModerationRuleKeywordPresetType$1;
(function (AutoModerationRuleKeywordPresetType) {
    /**
     * Words that may be considered forms of swearing or cursing
     */
    AutoModerationRuleKeywordPresetType[AutoModerationRuleKeywordPresetType["Profanity"] = 1] = "Profanity";
    /**
     * Words that refer to sexually explicit behavior or activity
     */
    AutoModerationRuleKeywordPresetType[AutoModerationRuleKeywordPresetType["SexualContent"] = 2] = "SexualContent";
    /**
     * Personal insults or words that may be considered hate speech
     */
    AutoModerationRuleKeywordPresetType[AutoModerationRuleKeywordPresetType["Slurs"] = 3] = "Slurs";
})(AutoModerationRuleKeywordPresetType$1 || (autoModeration$1.AutoModerationRuleKeywordPresetType = AutoModerationRuleKeywordPresetType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types
 */
var AutoModerationRuleEventType$1;
(function (AutoModerationRuleEventType) {
    /**
     * When a member sends or edits a message in the guild
     */
    AutoModerationRuleEventType[AutoModerationRuleEventType["MessageSend"] = 1] = "MessageSend";
    /**
     * When a member edits their profile
     */
    AutoModerationRuleEventType[AutoModerationRuleEventType["MemberUpdate"] = 2] = "MemberUpdate";
})(AutoModerationRuleEventType$1 || (autoModeration$1.AutoModerationRuleEventType = AutoModerationRuleEventType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types
 */
var AutoModerationActionType$1;
(function (AutoModerationActionType) {
    /**
     * Blocks a member's message and prevents it from being posted.
     * A custom explanation can be specified and shown to members whenever their message is blocked
     */
    AutoModerationActionType[AutoModerationActionType["BlockMessage"] = 1] = "BlockMessage";
    /**
     * Logs user content to a specified channel
     */
    AutoModerationActionType[AutoModerationActionType["SendAlertMessage"] = 2] = "SendAlertMessage";
    /**
     * Timeout user for specified duration, this action type can be set if the bot has `MODERATE_MEMBERS` permission
     */
    AutoModerationActionType[AutoModerationActionType["Timeout"] = 3] = "Timeout";
    /**
     * Prevents a member from using text, voice, or other interactions
     */
    AutoModerationActionType[AutoModerationActionType["BlockMemberInteraction"] = 4] = "BlockMemberInteraction";
})(AutoModerationActionType$1 || (autoModeration$1.AutoModerationActionType = AutoModerationActionType$1 = {}));

var channel$2 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/channel
 */
Object.defineProperty(channel$2, "__esModule", { value: true });
channel$2.ChannelFlags = channel$2.SelectMenuDefaultValueType = channel$2.TextInputStyle = channel$2.ButtonStyle = channel$2.ComponentType = channel$2.AllowedMentionsTypes = channel$2.AttachmentFlags = channel$2.EmbedType = channel$2.ThreadMemberFlags = channel$2.ThreadAutoArchiveDuration = channel$2.OverwriteType = channel$2.MessageFlags = channel$2.MessageReferenceType = channel$2.MessageActivityType = channel$2.MessageType = channel$2.VideoQualityMode = channel$2.ChannelType = channel$2.ForumLayoutType = channel$2.SortOrderType = void 0;
/**
 * https://discord.com/developers/docs/resources/channel/#channel-object-sort-order-types
 */
var SortOrderType$1;
(function (SortOrderType) {
    /**
     * Sort forum posts by activity
     */
    SortOrderType[SortOrderType["LatestActivity"] = 0] = "LatestActivity";
    /**
     * Sort forum posts by creation time (from most recent to oldest)
     */
    SortOrderType[SortOrderType["CreationDate"] = 1] = "CreationDate";
})(SortOrderType$1 || (channel$2.SortOrderType = SortOrderType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/channel/#channel-object-forum-layout-types
 */
var ForumLayoutType$1;
(function (ForumLayoutType) {
    /**
     * No default has been set for forum channel
     */
    ForumLayoutType[ForumLayoutType["NotSet"] = 0] = "NotSet";
    /**
     * Display posts as a list
     */
    ForumLayoutType[ForumLayoutType["ListView"] = 1] = "ListView";
    /**
     * Display posts as a collection of tiles
     */
    ForumLayoutType[ForumLayoutType["GalleryView"] = 2] = "GalleryView";
})(ForumLayoutType$1 || (channel$2.ForumLayoutType = ForumLayoutType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#channel-object-channel-types
 */
var ChannelType$1;
(function (ChannelType) {
    /**
     * A text channel within a guild
     */
    ChannelType[ChannelType["GuildText"] = 0] = "GuildText";
    /**
     * A direct message between users
     */
    ChannelType[ChannelType["DM"] = 1] = "DM";
    /**
     * A voice channel within a guild
     */
    ChannelType[ChannelType["GuildVoice"] = 2] = "GuildVoice";
    /**
     * A direct message between multiple users
     */
    ChannelType[ChannelType["GroupDM"] = 3] = "GroupDM";
    /**
     * An organizational category that contains up to 50 channels
     *
     * See https://support.discord.com/hc/articles/115001580171
     */
    ChannelType[ChannelType["GuildCategory"] = 4] = "GuildCategory";
    /**
     * A channel that users can follow and crosspost into their own guild
     *
     * See https://support.discord.com/hc/articles/360032008192
     */
    ChannelType[ChannelType["GuildAnnouncement"] = 5] = "GuildAnnouncement";
    /**
     * A temporary sub-channel within a Guild Announcement channel
     */
    ChannelType[ChannelType["AnnouncementThread"] = 10] = "AnnouncementThread";
    /**
     * A temporary sub-channel within a Guild Text or Guild Forum channel
     */
    ChannelType[ChannelType["PublicThread"] = 11] = "PublicThread";
    /**
     * A temporary sub-channel within a Guild Text channel that is only viewable by those invited and those with the Manage Threads permission
     */
    ChannelType[ChannelType["PrivateThread"] = 12] = "PrivateThread";
    /**
     * A voice channel for hosting events with an audience
     *
     * See https://support.discord.com/hc/articles/1500005513722
     */
    ChannelType[ChannelType["GuildStageVoice"] = 13] = "GuildStageVoice";
    /**
     * The channel in a Student Hub containing the listed servers
     *
     * See https://support.discord.com/hc/articles/4406046651927
     */
    ChannelType[ChannelType["GuildDirectory"] = 14] = "GuildDirectory";
    /**
     * A channel that can only contain threads
     */
    ChannelType[ChannelType["GuildForum"] = 15] = "GuildForum";
    /**
     * A channel like forum channels but contains media for server subscriptions
     *
     * See https://creator-support.discord.com/hc/articles/14346342766743
     */
    ChannelType[ChannelType["GuildMedia"] = 16] = "GuildMedia";
    // EVERYTHING BELOW THIS LINE SHOULD BE OLD NAMES FOR RENAMED ENUM MEMBERS //
    /**
     * A channel that users can follow and crosspost into their own guild
     *
     * @deprecated This is the old name for {@apilink ChannelType#GuildAnnouncement}
     *
     * See https://support.discord.com/hc/articles/360032008192
     */
    ChannelType[ChannelType["GuildNews"] = 5] = "GuildNews";
    /**
     * A temporary sub-channel within a Guild Announcement channel
     *
     * @deprecated This is the old name for {@apilink ChannelType#AnnouncementThread}
     */
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    ChannelType[ChannelType["GuildNewsThread"] = 10] = "GuildNewsThread";
    /**
     * A temporary sub-channel within a Guild Text channel
     *
     * @deprecated This is the old name for {@apilink ChannelType#PublicThread}
     */
    ChannelType[ChannelType["GuildPublicThread"] = 11] = "GuildPublicThread";
    /**
     * A temporary sub-channel within a Guild Text channel that is only viewable by those invited and those with the Manage Threads permission
     *
     * @deprecated This is the old name for {@apilink ChannelType#PrivateThread}
     */
    ChannelType[ChannelType["GuildPrivateThread"] = 12] = "GuildPrivateThread";
})(ChannelType$1 || (channel$2.ChannelType = ChannelType$1 = {}));
var VideoQualityMode$1;
(function (VideoQualityMode) {
    /**
     * Discord chooses the quality for optimal performance
     */
    VideoQualityMode[VideoQualityMode["Auto"] = 1] = "Auto";
    /**
     * 720p
     */
    VideoQualityMode[VideoQualityMode["Full"] = 2] = "Full";
})(VideoQualityMode$1 || (channel$2.VideoQualityMode = VideoQualityMode$1 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-types
 */
var MessageType$1;
(function (MessageType) {
    MessageType[MessageType["Default"] = 0] = "Default";
    MessageType[MessageType["RecipientAdd"] = 1] = "RecipientAdd";
    MessageType[MessageType["RecipientRemove"] = 2] = "RecipientRemove";
    MessageType[MessageType["Call"] = 3] = "Call";
    MessageType[MessageType["ChannelNameChange"] = 4] = "ChannelNameChange";
    MessageType[MessageType["ChannelIconChange"] = 5] = "ChannelIconChange";
    MessageType[MessageType["ChannelPinnedMessage"] = 6] = "ChannelPinnedMessage";
    MessageType[MessageType["UserJoin"] = 7] = "UserJoin";
    MessageType[MessageType["GuildBoost"] = 8] = "GuildBoost";
    MessageType[MessageType["GuildBoostTier1"] = 9] = "GuildBoostTier1";
    MessageType[MessageType["GuildBoostTier2"] = 10] = "GuildBoostTier2";
    MessageType[MessageType["GuildBoostTier3"] = 11] = "GuildBoostTier3";
    MessageType[MessageType["ChannelFollowAdd"] = 12] = "ChannelFollowAdd";
    MessageType[MessageType["GuildDiscoveryDisqualified"] = 14] = "GuildDiscoveryDisqualified";
    MessageType[MessageType["GuildDiscoveryRequalified"] = 15] = "GuildDiscoveryRequalified";
    MessageType[MessageType["GuildDiscoveryGracePeriodInitialWarning"] = 16] = "GuildDiscoveryGracePeriodInitialWarning";
    MessageType[MessageType["GuildDiscoveryGracePeriodFinalWarning"] = 17] = "GuildDiscoveryGracePeriodFinalWarning";
    MessageType[MessageType["ThreadCreated"] = 18] = "ThreadCreated";
    MessageType[MessageType["Reply"] = 19] = "Reply";
    MessageType[MessageType["ChatInputCommand"] = 20] = "ChatInputCommand";
    MessageType[MessageType["ThreadStarterMessage"] = 21] = "ThreadStarterMessage";
    MessageType[MessageType["GuildInviteReminder"] = 22] = "GuildInviteReminder";
    MessageType[MessageType["ContextMenuCommand"] = 23] = "ContextMenuCommand";
    MessageType[MessageType["AutoModerationAction"] = 24] = "AutoModerationAction";
    MessageType[MessageType["RoleSubscriptionPurchase"] = 25] = "RoleSubscriptionPurchase";
    MessageType[MessageType["InteractionPremiumUpsell"] = 26] = "InteractionPremiumUpsell";
    MessageType[MessageType["StageStart"] = 27] = "StageStart";
    MessageType[MessageType["StageEnd"] = 28] = "StageEnd";
    MessageType[MessageType["StageSpeaker"] = 29] = "StageSpeaker";
    /**
     * @unstable https://github.com/discord/discord-api-docs/pull/5927#discussion_r1107678548
     */
    MessageType[MessageType["StageRaiseHand"] = 30] = "StageRaiseHand";
    MessageType[MessageType["StageTopic"] = 31] = "StageTopic";
    MessageType[MessageType["GuildApplicationPremiumSubscription"] = 32] = "GuildApplicationPremiumSubscription";
    MessageType[MessageType["GuildIncidentAlertModeEnabled"] = 36] = "GuildIncidentAlertModeEnabled";
    MessageType[MessageType["GuildIncidentAlertModeDisabled"] = 37] = "GuildIncidentAlertModeDisabled";
    MessageType[MessageType["GuildIncidentReportRaid"] = 38] = "GuildIncidentReportRaid";
    MessageType[MessageType["GuildIncidentReportFalseAlarm"] = 39] = "GuildIncidentReportFalseAlarm";
})(MessageType$1 || (channel$2.MessageType = MessageType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-activity-types
 */
var MessageActivityType$1;
(function (MessageActivityType) {
    MessageActivityType[MessageActivityType["Join"] = 1] = "Join";
    MessageActivityType[MessageActivityType["Spectate"] = 2] = "Spectate";
    MessageActivityType[MessageActivityType["Listen"] = 3] = "Listen";
    MessageActivityType[MessageActivityType["JoinRequest"] = 5] = "JoinRequest";
})(MessageActivityType$1 || (channel$2.MessageActivityType = MessageActivityType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#message-reference-types
 */
var MessageReferenceType$1;
(function (MessageReferenceType) {
    /**
     * A standard reference used by replies
     */
    MessageReferenceType[MessageReferenceType["Default"] = 0] = "Default";
    /**
     * Reference used to point to a message at a point in time
     */
    MessageReferenceType[MessageReferenceType["Forward"] = 1] = "Forward";
})(MessageReferenceType$1 || (channel$2.MessageReferenceType = MessageReferenceType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-flags
 */
var MessageFlags$1;
(function (MessageFlags) {
    /**
     * This message has been published to subscribed channels (via Channel Following)
     */
    MessageFlags[MessageFlags["Crossposted"] = 1] = "Crossposted";
    /**
     * This message originated from a message in another channel (via Channel Following)
     */
    MessageFlags[MessageFlags["IsCrosspost"] = 2] = "IsCrosspost";
    /**
     * Do not include any embeds when serializing this message
     */
    MessageFlags[MessageFlags["SuppressEmbeds"] = 4] = "SuppressEmbeds";
    /**
     * The source message for this crosspost has been deleted (via Channel Following)
     */
    MessageFlags[MessageFlags["SourceMessageDeleted"] = 8] = "SourceMessageDeleted";
    /**
     * This message came from the urgent message system
     */
    MessageFlags[MessageFlags["Urgent"] = 16] = "Urgent";
    /**
     * This message has an associated thread, which shares its id
     */
    MessageFlags[MessageFlags["HasThread"] = 32] = "HasThread";
    /**
     * This message is only visible to the user who invoked the Interaction
     */
    MessageFlags[MessageFlags["Ephemeral"] = 64] = "Ephemeral";
    /**
     * This message is an Interaction Response and the bot is "thinking"
     */
    MessageFlags[MessageFlags["Loading"] = 128] = "Loading";
    /**
     * This message failed to mention some roles and add their members to the thread
     */
    MessageFlags[MessageFlags["FailedToMentionSomeRolesInThread"] = 256] = "FailedToMentionSomeRolesInThread";
    /**
     * @unstable This message flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    MessageFlags[MessageFlags["ShouldShowLinkNotDiscordWarning"] = 1024] = "ShouldShowLinkNotDiscordWarning";
    /**
     * This message will not trigger push and desktop notifications
     */
    MessageFlags[MessageFlags["SuppressNotifications"] = 4096] = "SuppressNotifications";
    /**
     * This message is a voice message
     */
    MessageFlags[MessageFlags["IsVoiceMessage"] = 8192] = "IsVoiceMessage";
})(MessageFlags$1 || (channel$2.MessageFlags = MessageFlags$1 = {}));
var OverwriteType$1;
(function (OverwriteType) {
    OverwriteType[OverwriteType["Role"] = 0] = "Role";
    OverwriteType[OverwriteType["Member"] = 1] = "Member";
})(OverwriteType$1 || (channel$2.OverwriteType = OverwriteType$1 = {}));
var ThreadAutoArchiveDuration$1;
(function (ThreadAutoArchiveDuration) {
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneHour"] = 60] = "OneHour";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneDay"] = 1440] = "OneDay";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["ThreeDays"] = 4320] = "ThreeDays";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneWeek"] = 10080] = "OneWeek";
})(ThreadAutoArchiveDuration$1 || (channel$2.ThreadAutoArchiveDuration = ThreadAutoArchiveDuration$1 = {}));
var ThreadMemberFlags$1;
(function (ThreadMemberFlags) {
    /**
     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ThreadMemberFlags[ThreadMemberFlags["HasInteracted"] = 1] = "HasInteracted";
    /**
     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ThreadMemberFlags[ThreadMemberFlags["AllMessages"] = 2] = "AllMessages";
    /**
     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ThreadMemberFlags[ThreadMemberFlags["OnlyMentions"] = 4] = "OnlyMentions";
    /**
     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ThreadMemberFlags[ThreadMemberFlags["NoMessages"] = 8] = "NoMessages";
})(ThreadMemberFlags$1 || (channel$2.ThreadMemberFlags = ThreadMemberFlags$1 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-types
 *
 * @deprecated *Embed types should be considered deprecated and might be removed in a future API version*
 */
var EmbedType$1;
(function (EmbedType) {
    /**
     * Generic embed rendered from embed attributes
     */
    EmbedType["Rich"] = "rich";
    /**
     * Image embed
     */
    EmbedType["Image"] = "image";
    /**
     * Video embed
     */
    EmbedType["Video"] = "video";
    /**
     * Animated gif image embed rendered as a video embed
     */
    EmbedType["GIFV"] = "gifv";
    /**
     * Article embed
     */
    EmbedType["Article"] = "article";
    /**
     * Link embed
     */
    EmbedType["Link"] = "link";
    /**
     * Auto moderation alert embed
     *
     * @unstable This embed type is currently not documented by Discord, but it is returned in the auto moderation system messages.
     */
    EmbedType["AutoModerationMessage"] = "auto_moderation_message";
})(EmbedType$1 || (channel$2.EmbedType = EmbedType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure-attachment-flags
 */
var AttachmentFlags$1;
(function (AttachmentFlags) {
    /**
     * This attachment has been edited using the remix feature on mobile
     */
    AttachmentFlags[AttachmentFlags["IsRemix"] = 4] = "IsRemix";
})(AttachmentFlags$1 || (channel$2.AttachmentFlags = AttachmentFlags$1 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types
 */
var AllowedMentionsTypes$1;
(function (AllowedMentionsTypes) {
    /**
     * Controls @everyone and @here mentions
     */
    AllowedMentionsTypes["Everyone"] = "everyone";
    /**
     * Controls role mentions
     */
    AllowedMentionsTypes["Role"] = "roles";
    /**
     * Controls user mentions
     */
    AllowedMentionsTypes["User"] = "users";
})(AllowedMentionsTypes$1 || (channel$2.AllowedMentionsTypes = AllowedMentionsTypes$1 = {}));
/**
 * https://discord.com/developers/docs/interactions/message-components#component-object-component-types
 */
var ComponentType$1;
(function (ComponentType) {
    /**
     * Action Row component
     */
    ComponentType[ComponentType["ActionRow"] = 1] = "ActionRow";
    /**
     * Button component
     */
    ComponentType[ComponentType["Button"] = 2] = "Button";
    /**
     * Select menu for picking from defined text options
     */
    ComponentType[ComponentType["StringSelect"] = 3] = "StringSelect";
    /**
     * Text Input component
     */
    ComponentType[ComponentType["TextInput"] = 4] = "TextInput";
    /**
     * Select menu for users
     */
    ComponentType[ComponentType["UserSelect"] = 5] = "UserSelect";
    /**
     * Select menu for roles
     */
    ComponentType[ComponentType["RoleSelect"] = 6] = "RoleSelect";
    /**
     * Select menu for users and roles
     */
    ComponentType[ComponentType["MentionableSelect"] = 7] = "MentionableSelect";
    /**
     * Select menu for channels
     */
    ComponentType[ComponentType["ChannelSelect"] = 8] = "ChannelSelect";
    // EVERYTHING BELOW THIS LINE SHOULD BE OLD NAMES FOR RENAMED ENUM MEMBERS //
    /**
     * Select menu for picking from defined text options
     *
     * @deprecated This is the old name for {@apilink ComponentType#StringSelect}
     */
    ComponentType[ComponentType["SelectMenu"] = 3] = "SelectMenu";
})(ComponentType$1 || (channel$2.ComponentType = ComponentType$1 = {}));
/**
 * https://discord.com/developers/docs/interactions/message-components#button-object-button-styles
 */
var ButtonStyle$1;
(function (ButtonStyle) {
    ButtonStyle[ButtonStyle["Primary"] = 1] = "Primary";
    ButtonStyle[ButtonStyle["Secondary"] = 2] = "Secondary";
    ButtonStyle[ButtonStyle["Success"] = 3] = "Success";
    ButtonStyle[ButtonStyle["Danger"] = 4] = "Danger";
    ButtonStyle[ButtonStyle["Link"] = 5] = "Link";
    ButtonStyle[ButtonStyle["Premium"] = 6] = "Premium";
})(ButtonStyle$1 || (channel$2.ButtonStyle = ButtonStyle$1 = {}));
/**
 * https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-styles
 */
var TextInputStyle$1;
(function (TextInputStyle) {
    TextInputStyle[TextInputStyle["Short"] = 1] = "Short";
    TextInputStyle[TextInputStyle["Paragraph"] = 2] = "Paragraph";
})(TextInputStyle$1 || (channel$2.TextInputStyle = TextInputStyle$1 = {}));
/**
 * https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-default-value-structure
 */
var SelectMenuDefaultValueType$1;
(function (SelectMenuDefaultValueType) {
    SelectMenuDefaultValueType["Channel"] = "channel";
    SelectMenuDefaultValueType["Role"] = "role";
    SelectMenuDefaultValueType["User"] = "user";
})(SelectMenuDefaultValueType$1 || (channel$2.SelectMenuDefaultValueType = SelectMenuDefaultValueType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/channel#channel-object-channel-flags
 */
var ChannelFlags$1;
(function (ChannelFlags) {
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["GuildFeedRemoved"] = 1] = "GuildFeedRemoved";
    /**
     * This thread is pinned to the top of its parent forum channel
     */
    ChannelFlags[ChannelFlags["Pinned"] = 2] = "Pinned";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["ActiveChannelsRemoved"] = 4] = "ActiveChannelsRemoved";
    /**
     * Whether a tag is required to be specified when creating a thread in a forum channel.
     * Tags are specified in the `applied_tags` field
     */
    ChannelFlags[ChannelFlags["RequireTag"] = 16] = "RequireTag";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["IsSpam"] = 32] = "IsSpam";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["IsGuildResourceChannel"] = 128] = "IsGuildResourceChannel";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["ClydeAI"] = 256] = "ClydeAI";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["IsScheduledForDeletion"] = 512] = "IsScheduledForDeletion";
    /**
     * Whether media download options are hidden.
     */
    ChannelFlags[ChannelFlags["HideMediaDownloadOptions"] = 32768] = "HideMediaDownloadOptions";
})(ChannelFlags$1 || (channel$2.ChannelFlags = ChannelFlags$1 = {}));

var emoji$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/emoji
 */
Object.defineProperty(emoji$1, "__esModule", { value: true });

var gateway$1 = {};

/**
 * Types extracted from
 *  - https://discord.com/developers/docs/topics/gateway
 *  - https://discord.com/developers/docs/topics/gateway-events
 */
Object.defineProperty(gateway$1, "__esModule", { value: true });
gateway$1.ActivityFlags = gateway$1.ActivityType = gateway$1.ActivityPlatform = gateway$1.PresenceUpdateStatus = void 0;
/**
 * https://discord.com/developers/docs/topics/gateway-events#update-presence-status-types
 */
var PresenceUpdateStatus$1;
(function (PresenceUpdateStatus) {
    PresenceUpdateStatus["Online"] = "online";
    PresenceUpdateStatus["DoNotDisturb"] = "dnd";
    PresenceUpdateStatus["Idle"] = "idle";
    /**
     * Invisible and shown as offline
     */
    PresenceUpdateStatus["Invisible"] = "invisible";
    PresenceUpdateStatus["Offline"] = "offline";
})(PresenceUpdateStatus$1 || (gateway$1.PresenceUpdateStatus = PresenceUpdateStatus$1 = {}));
/**
 * @unstable This enum is currently not documented by Discord but has known values which we will try to keep up to date.
 * Values might be added or removed without a major version bump.
 */
var ActivityPlatform$1;
(function (ActivityPlatform) {
    ActivityPlatform["Desktop"] = "desktop";
    ActivityPlatform["Xbox"] = "xbox";
    ActivityPlatform["Samsung"] = "samsung";
    ActivityPlatform["IOS"] = "ios";
    ActivityPlatform["Android"] = "android";
    ActivityPlatform["Embedded"] = "embedded";
    ActivityPlatform["PS4"] = "ps4";
    ActivityPlatform["PS5"] = "ps5";
})(ActivityPlatform$1 || (gateway$1.ActivityPlatform = ActivityPlatform$1 = {}));
/**
 * https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types
 */
var ActivityType$1;
(function (ActivityType) {
    /**
     * Playing {game}
     */
    ActivityType[ActivityType["Playing"] = 0] = "Playing";
    /**
     * Streaming {details}
     */
    ActivityType[ActivityType["Streaming"] = 1] = "Streaming";
    /**
     * Listening to {name}
     */
    ActivityType[ActivityType["Listening"] = 2] = "Listening";
    /**
     * Watching {details}
     */
    ActivityType[ActivityType["Watching"] = 3] = "Watching";
    /**
     * {emoji} {state}
     */
    ActivityType[ActivityType["Custom"] = 4] = "Custom";
    /**
     * Competing in {name}
     */
    ActivityType[ActivityType["Competing"] = 5] = "Competing";
})(ActivityType$1 || (gateway$1.ActivityType = ActivityType$1 = {}));
/**
 * https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-flags
 */
var ActivityFlags$1;
(function (ActivityFlags) {
    ActivityFlags[ActivityFlags["Instance"] = 1] = "Instance";
    ActivityFlags[ActivityFlags["Join"] = 2] = "Join";
    ActivityFlags[ActivityFlags["Spectate"] = 4] = "Spectate";
    ActivityFlags[ActivityFlags["JoinRequest"] = 8] = "JoinRequest";
    ActivityFlags[ActivityFlags["Sync"] = 16] = "Sync";
    ActivityFlags[ActivityFlags["Play"] = 32] = "Play";
    ActivityFlags[ActivityFlags["PartyPrivacyFriends"] = 64] = "PartyPrivacyFriends";
    ActivityFlags[ActivityFlags["PartyPrivacyVoiceChannel"] = 128] = "PartyPrivacyVoiceChannel";
    ActivityFlags[ActivityFlags["Embedded"] = 256] = "Embedded";
})(ActivityFlags$1 || (gateway$1.ActivityFlags = ActivityFlags$1 = {}));

var guild$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/guild
 */
Object.defineProperty(guild$1, "__esModule", { value: true });
guild$1.GuildOnboardingPromptType = guild$1.GuildOnboardingMode = guild$1.MembershipScreeningFieldType = guild$1.GuildWidgetStyle = guild$1.IntegrationExpireBehavior = guild$1.GuildMemberFlags = guild$1.GuildFeature = guild$1.GuildSystemChannelFlags = guild$1.GuildHubType = guild$1.GuildPremiumTier = guild$1.GuildVerificationLevel = guild$1.GuildNSFWLevel = guild$1.GuildMFALevel = guild$1.GuildExplicitContentFilter = guild$1.GuildDefaultMessageNotifications = void 0;
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
 */
var GuildDefaultMessageNotifications$1;
(function (GuildDefaultMessageNotifications) {
    GuildDefaultMessageNotifications[GuildDefaultMessageNotifications["AllMessages"] = 0] = "AllMessages";
    GuildDefaultMessageNotifications[GuildDefaultMessageNotifications["OnlyMentions"] = 1] = "OnlyMentions";
})(GuildDefaultMessageNotifications$1 || (guild$1.GuildDefaultMessageNotifications = GuildDefaultMessageNotifications$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
 */
var GuildExplicitContentFilter$1;
(function (GuildExplicitContentFilter) {
    GuildExplicitContentFilter[GuildExplicitContentFilter["Disabled"] = 0] = "Disabled";
    GuildExplicitContentFilter[GuildExplicitContentFilter["MembersWithoutRoles"] = 1] = "MembersWithoutRoles";
    GuildExplicitContentFilter[GuildExplicitContentFilter["AllMembers"] = 2] = "AllMembers";
})(GuildExplicitContentFilter$1 || (guild$1.GuildExplicitContentFilter = GuildExplicitContentFilter$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
 */
var GuildMFALevel$1;
(function (GuildMFALevel) {
    GuildMFALevel[GuildMFALevel["None"] = 0] = "None";
    GuildMFALevel[GuildMFALevel["Elevated"] = 1] = "Elevated";
})(GuildMFALevel$1 || (guild$1.GuildMFALevel = GuildMFALevel$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level
 */
var GuildNSFWLevel$1;
(function (GuildNSFWLevel) {
    GuildNSFWLevel[GuildNSFWLevel["Default"] = 0] = "Default";
    GuildNSFWLevel[GuildNSFWLevel["Explicit"] = 1] = "Explicit";
    GuildNSFWLevel[GuildNSFWLevel["Safe"] = 2] = "Safe";
    GuildNSFWLevel[GuildNSFWLevel["AgeRestricted"] = 3] = "AgeRestricted";
})(GuildNSFWLevel$1 || (guild$1.GuildNSFWLevel = GuildNSFWLevel$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-verification-level
 */
var GuildVerificationLevel$1;
(function (GuildVerificationLevel) {
    /**
     * Unrestricted
     */
    GuildVerificationLevel[GuildVerificationLevel["None"] = 0] = "None";
    /**
     * Must have verified email on account
     */
    GuildVerificationLevel[GuildVerificationLevel["Low"] = 1] = "Low";
    /**
     * Must be registered on Discord for longer than 5 minutes
     */
    GuildVerificationLevel[GuildVerificationLevel["Medium"] = 2] = "Medium";
    /**
     * Must be a member of the guild for longer than 10 minutes
     */
    GuildVerificationLevel[GuildVerificationLevel["High"] = 3] = "High";
    /**
     * Must have a verified phone number
     */
    GuildVerificationLevel[GuildVerificationLevel["VeryHigh"] = 4] = "VeryHigh";
})(GuildVerificationLevel$1 || (guild$1.GuildVerificationLevel = GuildVerificationLevel$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-premium-tier
 */
var GuildPremiumTier$1;
(function (GuildPremiumTier) {
    GuildPremiumTier[GuildPremiumTier["None"] = 0] = "None";
    GuildPremiumTier[GuildPremiumTier["Tier1"] = 1] = "Tier1";
    GuildPremiumTier[GuildPremiumTier["Tier2"] = 2] = "Tier2";
    GuildPremiumTier[GuildPremiumTier["Tier3"] = 3] = "Tier3";
})(GuildPremiumTier$1 || (guild$1.GuildPremiumTier = GuildPremiumTier$1 = {}));
var GuildHubType$1;
(function (GuildHubType) {
    GuildHubType[GuildHubType["Default"] = 0] = "Default";
    GuildHubType[GuildHubType["HighSchool"] = 1] = "HighSchool";
    GuildHubType[GuildHubType["College"] = 2] = "College";
})(GuildHubType$1 || (guild$1.GuildHubType = GuildHubType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags
 */
var GuildSystemChannelFlags$1;
(function (GuildSystemChannelFlags) {
    /**
     * Suppress member join notifications
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressJoinNotifications"] = 1] = "SuppressJoinNotifications";
    /**
     * Suppress server boost notifications
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressPremiumSubscriptions"] = 2] = "SuppressPremiumSubscriptions";
    /**
     * Suppress server setup tips
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressGuildReminderNotifications"] = 4] = "SuppressGuildReminderNotifications";
    /**
     * Hide member join sticker reply buttons
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressJoinNotificationReplies"] = 8] = "SuppressJoinNotificationReplies";
    /**
     * Suppress role subscription purchase and renewal notifications
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressRoleSubscriptionPurchaseNotifications"] = 16] = "SuppressRoleSubscriptionPurchaseNotifications";
    /**
     * Hide role subscription sticker reply buttons
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressRoleSubscriptionPurchaseNotificationReplies"] = 32] = "SuppressRoleSubscriptionPurchaseNotificationReplies";
})(GuildSystemChannelFlags$1 || (guild$1.GuildSystemChannelFlags = GuildSystemChannelFlags$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-guild-features
 */
var GuildFeature$1;
(function (GuildFeature) {
    /**
     * Guild has access to set an animated guild banner image
     */
    GuildFeature["AnimatedBanner"] = "ANIMATED_BANNER";
    /**
     * Guild has access to set an animated guild icon
     */
    GuildFeature["AnimatedIcon"] = "ANIMATED_ICON";
    /**
     * Guild is using the old permissions configuration behavior
     *
     * See https://discord.com/developers/docs/change-log#upcoming-application-command-permission-changes
     */
    GuildFeature["ApplicationCommandPermissionsV2"] = "APPLICATION_COMMAND_PERMISSIONS_V2";
    /**
     * Guild has set up auto moderation rules
     */
    GuildFeature["AutoModeration"] = "AUTO_MODERATION";
    /**
     * Guild has access to set a guild banner image
     */
    GuildFeature["Banner"] = "BANNER";
    /**
     * Guild can enable welcome screen, Membership Screening and discovery, and receives community updates
     */
    GuildFeature["Community"] = "COMMUNITY";
    /**
     * Guild has enabled monetization
     */
    GuildFeature["CreatorMonetizableProvisional"] = "CREATOR_MONETIZABLE_PROVISIONAL";
    /**
     * Guild has enabled the role subscription promo page
     */
    GuildFeature["CreatorStorePage"] = "CREATOR_STORE_PAGE";
    /**
     * Guild has been set as a support server on the App Directory
     */
    GuildFeature["DeveloperSupportServer"] = "DEVELOPER_SUPPORT_SERVER";
    /**
     * Guild is able to be discovered in the directory
     */
    GuildFeature["Discoverable"] = "DISCOVERABLE";
    /**
     * Guild is able to be featured in the directory
     */
    GuildFeature["Featurable"] = "FEATURABLE";
    /**
     * Guild is listed in a directory channel
     */
    GuildFeature["HasDirectoryEntry"] = "HAS_DIRECTORY_ENTRY";
    /**
     * Guild is a Student Hub
     *
     * See https://support.discord.com/hc/articles/4406046651927
     *
     * @unstable This feature is currently not documented by Discord, but has known value
     */
    GuildFeature["Hub"] = "HUB";
    /**
     * Guild has disabled invite usage, preventing users from joining
     */
    GuildFeature["InvitesDisabled"] = "INVITES_DISABLED";
    /**
     * Guild has access to set an invite splash background
     */
    GuildFeature["InviteSplash"] = "INVITE_SPLASH";
    /**
     * Guild is in a Student Hub
     *
     * See https://support.discord.com/hc/articles/4406046651927
     *
     * @unstable This feature is currently not documented by Discord, but has known value
     */
    GuildFeature["LinkedToHub"] = "LINKED_TO_HUB";
    /**
     * Guild has enabled Membership Screening
     */
    GuildFeature["MemberVerificationGateEnabled"] = "MEMBER_VERIFICATION_GATE_ENABLED";
    /**
     * Guild has enabled monetization
     *
     * @unstable This feature is no longer documented by Discord
     */
    GuildFeature["MonetizationEnabled"] = "MONETIZATION_ENABLED";
    /**
     * Guild has increased custom sticker slots
     */
    GuildFeature["MoreStickers"] = "MORE_STICKERS";
    /**
     * Guild has access to create news channels
     */
    GuildFeature["News"] = "NEWS";
    /**
     * Guild is partnered
     */
    GuildFeature["Partnered"] = "PARTNERED";
    /**
     * Guild can be previewed before joining via Membership Screening or the directory
     */
    GuildFeature["PreviewEnabled"] = "PREVIEW_ENABLED";
    /**
     * Guild has access to create private threads
     */
    GuildFeature["PrivateThreads"] = "PRIVATE_THREADS";
    /**
     * Guild has disabled alerts for join raids in the configured safety alerts channel
     */
    GuildFeature["RaidAlertsDisabled"] = "RAID_ALERTS_DISABLED";
    GuildFeature["RelayEnabled"] = "RELAY_ENABLED";
    /**
     * Guild is able to set role icons
     */
    GuildFeature["RoleIcons"] = "ROLE_ICONS";
    /**
     * Guild has role subscriptions that can be purchased
     */
    GuildFeature["RoleSubscriptionsAvailableForPurchase"] = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE";
    /**
     * Guild has enabled role subscriptions
     */
    GuildFeature["RoleSubscriptionsEnabled"] = "ROLE_SUBSCRIPTIONS_ENABLED";
    /**
     * Guild has enabled ticketed events
     */
    GuildFeature["TicketedEventsEnabled"] = "TICKETED_EVENTS_ENABLED";
    /**
     * Guild has access to set a vanity URL
     */
    GuildFeature["VanityURL"] = "VANITY_URL";
    /**
     * Guild is verified
     */
    GuildFeature["Verified"] = "VERIFIED";
    /**
     * Guild has access to set 384kbps bitrate in voice (previously VIP voice servers)
     */
    GuildFeature["VIPRegions"] = "VIP_REGIONS";
    /**
     * Guild has enabled the welcome screen
     */
    GuildFeature["WelcomeScreenEnabled"] = "WELCOME_SCREEN_ENABLED";
})(GuildFeature$1 || (guild$1.GuildFeature = GuildFeature$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags
 */
var GuildMemberFlags$1;
(function (GuildMemberFlags) {
    /**
     * Member has left and rejoined the guild
     */
    GuildMemberFlags[GuildMemberFlags["DidRejoin"] = 1] = "DidRejoin";
    /**
     * Member has completed onboarding
     */
    GuildMemberFlags[GuildMemberFlags["CompletedOnboarding"] = 2] = "CompletedOnboarding";
    /**
     * Member bypasses guild verification requirements
     */
    GuildMemberFlags[GuildMemberFlags["BypassesVerification"] = 4] = "BypassesVerification";
    /**
     * Member has started onboarding
     */
    GuildMemberFlags[GuildMemberFlags["StartedOnboarding"] = 8] = "StartedOnboarding";
    /**
     * @unstable This guild member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    GuildMemberFlags[GuildMemberFlags["StartedHomeActions"] = 32] = "StartedHomeActions";
    /**
     * @unstable This guild member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    GuildMemberFlags[GuildMemberFlags["CompletedHomeActions"] = 64] = "CompletedHomeActions";
    /**
     * @unstable This guild member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    GuildMemberFlags[GuildMemberFlags["AutomodQuarantinedUsernameOrGuildNickname"] = 128] = "AutomodQuarantinedUsernameOrGuildNickname";
    /**
     * @unstable This guild member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    GuildMemberFlags[GuildMemberFlags["AutomodQuarantinedBio"] = 256] = "AutomodQuarantinedBio";
})(GuildMemberFlags$1 || (guild$1.GuildMemberFlags = GuildMemberFlags$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors
 */
var IntegrationExpireBehavior$1;
(function (IntegrationExpireBehavior) {
    IntegrationExpireBehavior[IntegrationExpireBehavior["RemoveRole"] = 0] = "RemoveRole";
    IntegrationExpireBehavior[IntegrationExpireBehavior["Kick"] = 1] = "Kick";
})(IntegrationExpireBehavior$1 || (guild$1.IntegrationExpireBehavior = IntegrationExpireBehavior$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options
 */
var GuildWidgetStyle$1;
(function (GuildWidgetStyle) {
    /**
     * Shield style widget with Discord icon and guild members online count
     */
    GuildWidgetStyle["Shield"] = "shield";
    /**
     * Large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget
     */
    GuildWidgetStyle["Banner1"] = "banner1";
    /**
     * Smaller widget style with guild icon, name and online count. Split on the right with Discord logo
     */
    GuildWidgetStyle["Banner2"] = "banner2";
    /**
     * Large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right
     */
    GuildWidgetStyle["Banner3"] = "banner3";
    /**
     * Large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget
     * and a "JOIN MY SERVER" button at the bottom
     */
    GuildWidgetStyle["Banner4"] = "banner4";
})(GuildWidgetStyle$1 || (guild$1.GuildWidgetStyle = GuildWidgetStyle$1 = {}));
var MembershipScreeningFieldType$1;
(function (MembershipScreeningFieldType) {
    /**
     * Server Rules
     */
    MembershipScreeningFieldType["Terms"] = "TERMS";
})(MembershipScreeningFieldType$1 || (guild$1.MembershipScreeningFieldType = MembershipScreeningFieldType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-mode
 */
var GuildOnboardingMode$1;
(function (GuildOnboardingMode) {
    /**
     * Counts only Default Channels towards constraints
     */
    GuildOnboardingMode[GuildOnboardingMode["OnboardingDefault"] = 0] = "OnboardingDefault";
    /**
     * Counts Default Channels and Questions towards constraints
     */
    GuildOnboardingMode[GuildOnboardingMode["OnboardingAdvanced"] = 1] = "OnboardingAdvanced";
})(GuildOnboardingMode$1 || (guild$1.GuildOnboardingMode = GuildOnboardingMode$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-types
 */
var GuildOnboardingPromptType$1;
(function (GuildOnboardingPromptType) {
    GuildOnboardingPromptType[GuildOnboardingPromptType["MultipleChoice"] = 0] = "MultipleChoice";
    GuildOnboardingPromptType[GuildOnboardingPromptType["Dropdown"] = 1] = "Dropdown";
})(GuildOnboardingPromptType$1 || (guild$1.GuildOnboardingPromptType = GuildOnboardingPromptType$1 = {}));

var guildScheduledEvent$1 = {};

Object.defineProperty(guildScheduledEvent$1, "__esModule", { value: true });
guildScheduledEvent$1.GuildScheduledEventPrivacyLevel = guildScheduledEvent$1.GuildScheduledEventStatus = guildScheduledEvent$1.GuildScheduledEventEntityType = guildScheduledEvent$1.GuildScheduledEventRecurrenceRuleMonth = guildScheduledEvent$1.GuildScheduledEventRecurrenceRuleWeekday = guildScheduledEvent$1.GuildScheduledEventRecurrenceRuleFrequency = void 0;
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-frequency
 */
var GuildScheduledEventRecurrenceRuleFrequency$1;
(function (GuildScheduledEventRecurrenceRuleFrequency) {
    GuildScheduledEventRecurrenceRuleFrequency[GuildScheduledEventRecurrenceRuleFrequency["Yearly"] = 0] = "Yearly";
    GuildScheduledEventRecurrenceRuleFrequency[GuildScheduledEventRecurrenceRuleFrequency["Monthly"] = 1] = "Monthly";
    GuildScheduledEventRecurrenceRuleFrequency[GuildScheduledEventRecurrenceRuleFrequency["Weekly"] = 2] = "Weekly";
    GuildScheduledEventRecurrenceRuleFrequency[GuildScheduledEventRecurrenceRuleFrequency["Daily"] = 3] = "Daily";
})(GuildScheduledEventRecurrenceRuleFrequency$1 || (guildScheduledEvent$1.GuildScheduledEventRecurrenceRuleFrequency = GuildScheduledEventRecurrenceRuleFrequency$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-weekday
 */
var GuildScheduledEventRecurrenceRuleWeekday$1;
(function (GuildScheduledEventRecurrenceRuleWeekday) {
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Monday"] = 0] = "Monday";
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Tuesday"] = 1] = "Tuesday";
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Wednesday"] = 2] = "Wednesday";
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Thursday"] = 3] = "Thursday";
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Friday"] = 4] = "Friday";
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Saturday"] = 5] = "Saturday";
    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Sunday"] = 6] = "Sunday";
})(GuildScheduledEventRecurrenceRuleWeekday$1 || (guildScheduledEvent$1.GuildScheduledEventRecurrenceRuleWeekday = GuildScheduledEventRecurrenceRuleWeekday$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-month
 */
var GuildScheduledEventRecurrenceRuleMonth$1;
(function (GuildScheduledEventRecurrenceRuleMonth) {
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["January"] = 1] = "January";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["February"] = 2] = "February";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["March"] = 3] = "March";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["April"] = 4] = "April";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["May"] = 5] = "May";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["June"] = 6] = "June";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["July"] = 7] = "July";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["August"] = 8] = "August";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["September"] = 9] = "September";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["October"] = 10] = "October";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["November"] = 11] = "November";
    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["December"] = 12] = "December";
})(GuildScheduledEventRecurrenceRuleMonth$1 || (guildScheduledEvent$1.GuildScheduledEventRecurrenceRuleMonth = GuildScheduledEventRecurrenceRuleMonth$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types
 */
var GuildScheduledEventEntityType$1;
(function (GuildScheduledEventEntityType) {
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["StageInstance"] = 1] = "StageInstance";
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["Voice"] = 2] = "Voice";
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["External"] = 3] = "External";
})(GuildScheduledEventEntityType$1 || (guildScheduledEvent$1.GuildScheduledEventEntityType = GuildScheduledEventEntityType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status
 */
var GuildScheduledEventStatus$1;
(function (GuildScheduledEventStatus) {
    GuildScheduledEventStatus[GuildScheduledEventStatus["Scheduled"] = 1] = "Scheduled";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Active"] = 2] = "Active";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Completed"] = 3] = "Completed";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Canceled"] = 4] = "Canceled";
})(GuildScheduledEventStatus$1 || (guildScheduledEvent$1.GuildScheduledEventStatus = GuildScheduledEventStatus$1 = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level
 */
var GuildScheduledEventPrivacyLevel$1;
(function (GuildScheduledEventPrivacyLevel) {
    /**
     * The scheduled event is only accessible to guild members
     */
    GuildScheduledEventPrivacyLevel[GuildScheduledEventPrivacyLevel["GuildOnly"] = 2] = "GuildOnly";
})(GuildScheduledEventPrivacyLevel$1 || (guildScheduledEvent$1.GuildScheduledEventPrivacyLevel = GuildScheduledEventPrivacyLevel$1 = {}));

var interactions$1 = {};

var applicationCommands = {};

var chatInput = {};

var attachment = {};

Object.defineProperty(attachment, "__esModule", { value: true });

var base$1 = {};

Object.defineProperty(base$1, "__esModule", { value: true });

var boolean = {};

Object.defineProperty(boolean, "__esModule", { value: true });

var channel$1 = {};

Object.defineProperty(channel$1, "__esModule", { value: true });

var integer = {};

Object.defineProperty(integer, "__esModule", { value: true });

var mentionable = {};

Object.defineProperty(mentionable, "__esModule", { value: true });

var number = {};

Object.defineProperty(number, "__esModule", { value: true });

var role = {};

Object.defineProperty(role, "__esModule", { value: true });

var shared = {};

Object.defineProperty(shared, "__esModule", { value: true });
shared.ApplicationCommandOptionType = void 0;
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
 */
var ApplicationCommandOptionType$1;
(function (ApplicationCommandOptionType) {
    ApplicationCommandOptionType[ApplicationCommandOptionType["Subcommand"] = 1] = "Subcommand";
    ApplicationCommandOptionType[ApplicationCommandOptionType["SubcommandGroup"] = 2] = "SubcommandGroup";
    ApplicationCommandOptionType[ApplicationCommandOptionType["String"] = 3] = "String";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Integer"] = 4] = "Integer";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Boolean"] = 5] = "Boolean";
    ApplicationCommandOptionType[ApplicationCommandOptionType["User"] = 6] = "User";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Channel"] = 7] = "Channel";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Role"] = 8] = "Role";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Mentionable"] = 9] = "Mentionable";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Number"] = 10] = "Number";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Attachment"] = 11] = "Attachment";
})(ApplicationCommandOptionType$1 || (shared.ApplicationCommandOptionType = ApplicationCommandOptionType$1 = {}));

var string = {};

Object.defineProperty(string, "__esModule", { value: true });

var subcommand = {};

Object.defineProperty(subcommand, "__esModule", { value: true });

var subcommandGroup = {};

Object.defineProperty(subcommandGroup, "__esModule", { value: true });

var user$2 = {};

Object.defineProperty(user$2, "__esModule", { value: true });

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(attachment, exports);
	__exportStar(base$1, exports);
	__exportStar(boolean, exports);
	__exportStar(channel$1, exports);
	__exportStar(integer, exports);
	__exportStar(mentionable, exports);
	__exportStar(number, exports);
	__exportStar(role, exports);
	__exportStar(shared, exports);
	__exportStar(string, exports);
	__exportStar(subcommand, exports);
	__exportStar(subcommandGroup, exports);
	__exportStar(user$2, exports);
	
} (chatInput));

var contextMenu = {};

Object.defineProperty(contextMenu, "__esModule", { value: true });

var permissions$1 = {};

Object.defineProperty(permissions$1, "__esModule", { value: true });
permissions$1.APIApplicationCommandPermissionsConstant = permissions$1.ApplicationCommandPermissionType = void 0;
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type
 */
var ApplicationCommandPermissionType$1;
(function (ApplicationCommandPermissionType) {
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["Role"] = 1] = "Role";
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["User"] = 2] = "User";
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["Channel"] = 3] = "Channel";
})(ApplicationCommandPermissionType$1 || (permissions$1.ApplicationCommandPermissionType = ApplicationCommandPermissionType$1 = {}));
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-constants
 */
permissions$1.APIApplicationCommandPermissionsConstant = {
    // eslint-disable-next-line unicorn/prefer-native-coercion-functions
    Everyone: (guildId) => String(guildId),
    AllChannels: (guildId) => String(BigInt(guildId) - 1n),
};

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.InteractionContextType = exports.ApplicationIntegrationType = exports.ApplicationCommandType = void 0;
	__exportStar(chatInput, exports);
	__exportStar(contextMenu, exports);
	__exportStar(permissions$1, exports);
	/**
	 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
	 */
	var ApplicationCommandType;
	(function (ApplicationCommandType) {
	    ApplicationCommandType[ApplicationCommandType["ChatInput"] = 1] = "ChatInput";
	    ApplicationCommandType[ApplicationCommandType["User"] = 2] = "User";
	    ApplicationCommandType[ApplicationCommandType["Message"] = 3] = "Message";
	})(ApplicationCommandType || (exports.ApplicationCommandType = ApplicationCommandType = {}));
	/**
	 * https://discord.com/developers/docs/resources/application#application-object-application-integration-types
	 */
	var ApplicationIntegrationType;
	(function (ApplicationIntegrationType) {
	    /**
	     * App is installable to servers
	     */
	    ApplicationIntegrationType[ApplicationIntegrationType["GuildInstall"] = 0] = "GuildInstall";
	    /**
	     * App is installable to users
	     */
	    ApplicationIntegrationType[ApplicationIntegrationType["UserInstall"] = 1] = "UserInstall";
	})(ApplicationIntegrationType || (exports.ApplicationIntegrationType = ApplicationIntegrationType = {}));
	/**
	 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types
	 */
	var InteractionContextType;
	(function (InteractionContextType) {
	    /**
	     * Interaction can be used within servers
	     */
	    InteractionContextType[InteractionContextType["Guild"] = 0] = "Guild";
	    /**
	     * Interaction can be used within DMs with the app's bot user
	     */
	    InteractionContextType[InteractionContextType["BotDM"] = 1] = "BotDM";
	    /**
	     * Interaction can be used within Group DMs and DMs other than the app's bot user
	     */
	    InteractionContextType[InteractionContextType["PrivateChannel"] = 2] = "PrivateChannel";
	})(InteractionContextType || (exports.InteractionContextType = InteractionContextType = {}));
	
} (applicationCommands));

var autocomplete = {};

Object.defineProperty(autocomplete, "__esModule", { value: true });

var base = {};

Object.defineProperty(base, "__esModule", { value: true });

var messageComponents = {};

Object.defineProperty(messageComponents, "__esModule", { value: true });

var modalSubmit = {};

Object.defineProperty(modalSubmit, "__esModule", { value: true });

var ping = {};

Object.defineProperty(ping, "__esModule", { value: true });

var responses = {};

Object.defineProperty(responses, "__esModule", { value: true });
responses.InteractionResponseType = responses.InteractionType = void 0;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type
 */
var InteractionType$1;
(function (InteractionType) {
    InteractionType[InteractionType["Ping"] = 1] = "Ping";
    InteractionType[InteractionType["ApplicationCommand"] = 2] = "ApplicationCommand";
    InteractionType[InteractionType["MessageComponent"] = 3] = "MessageComponent";
    InteractionType[InteractionType["ApplicationCommandAutocomplete"] = 4] = "ApplicationCommandAutocomplete";
    InteractionType[InteractionType["ModalSubmit"] = 5] = "ModalSubmit";
})(InteractionType$1 || (responses.InteractionType = InteractionType$1 = {}));
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
 */
var InteractionResponseType$1;
(function (InteractionResponseType) {
    /**
     * ACK a `Ping`
     */
    InteractionResponseType[InteractionResponseType["Pong"] = 1] = "Pong";
    /**
     * Respond to an interaction with a message
     */
    InteractionResponseType[InteractionResponseType["ChannelMessageWithSource"] = 4] = "ChannelMessageWithSource";
    /**
     * ACK an interaction and edit to a response later, the user sees a loading state
     */
    InteractionResponseType[InteractionResponseType["DeferredChannelMessageWithSource"] = 5] = "DeferredChannelMessageWithSource";
    /**
     * ACK a button interaction and update it to a loading state
     */
    InteractionResponseType[InteractionResponseType["DeferredMessageUpdate"] = 6] = "DeferredMessageUpdate";
    /**
     * ACK a button interaction and edit the message to which the button was attached
     */
    InteractionResponseType[InteractionResponseType["UpdateMessage"] = 7] = "UpdateMessage";
    /**
     * For autocomplete interactions
     */
    InteractionResponseType[InteractionResponseType["ApplicationCommandAutocompleteResult"] = 8] = "ApplicationCommandAutocompleteResult";
    /**
     * Respond to an interaction with an modal for a user to fill-out
     */
    InteractionResponseType[InteractionResponseType["Modal"] = 9] = "Modal";
    /**
     * Respond to an interaction with an upgrade button, only available for apps with monetization enabled
     *
     * @deprecated See https://discord.com/developers/docs/change-log#premium-apps-new-premium-button-style-deep-linking-url-schemes
     */
    InteractionResponseType[InteractionResponseType["PremiumRequired"] = 10] = "PremiumRequired";
})(InteractionResponseType$1 || (responses.InteractionResponseType = InteractionResponseType$1 = {}));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(applicationCommands, exports);
	__exportStar(autocomplete, exports);
	__exportStar(base, exports);
	__exportStar(messageComponents, exports);
	__exportStar(modalSubmit, exports);
	__exportStar(ping, exports);
	__exportStar(responses, exports);
	
} (interactions$1));

var invite$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/invite
 */
Object.defineProperty(invite$1, "__esModule", { value: true });
invite$1.InviteTargetType = invite$1.InviteType = void 0;
/**
 * https://discord.com/developers/docs/resources/invite#invite-object-invite-types
 */
var InviteType$1;
(function (InviteType) {
    InviteType[InviteType["Guild"] = 0] = "Guild";
    InviteType[InviteType["GroupDM"] = 1] = "GroupDM";
    InviteType[InviteType["Friend"] = 2] = "Friend";
})(InviteType$1 || (invite$1.InviteType = InviteType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types
 */
var InviteTargetType$1;
(function (InviteTargetType) {
    InviteTargetType[InviteTargetType["Stream"] = 1] = "Stream";
    InviteTargetType[InviteTargetType["EmbeddedApplication"] = 2] = "EmbeddedApplication";
})(InviteTargetType$1 || (invite$1.InviteTargetType = InviteTargetType$1 = {}));

var oauth2$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/topics/oauth2
 */
Object.defineProperty(oauth2$1, "__esModule", { value: true });
oauth2$1.OAuth2Scopes = void 0;
var OAuth2Scopes$1;
(function (OAuth2Scopes) {
    /**
     * For oauth2 bots, this puts the bot in the user's selected guild by default
     */
    OAuth2Scopes["Bot"] = "bot";
    /**
     * Allows [/users/@me/connections](https://discord.com/developers/docs/resources/user#get-user-connections)
     * to return linked third-party accounts
     *
     * See https://discord.com/developers/docs/resources/user#get-user-connections
     */
    OAuth2Scopes["Connections"] = "connections";
    /**
     * Allows your app to see information about the user's DMs and group DMs - requires Discord approval
     */
    OAuth2Scopes["DMChannelsRead"] = "dm_channels.read";
    /**
     * Enables [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) to return an `email`
     *
     * See https://discord.com/developers/docs/resources/user#get-current-user
     */
    OAuth2Scopes["Email"] = "email";
    /**
     * Allows [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) without `email`
     *
     * See https://discord.com/developers/docs/resources/user#get-current-user
     */
    OAuth2Scopes["Identify"] = "identify";
    /**
     * Allows [/users/@me/guilds](https://discord.com/developers/docs/resources/user#get-current-user-guilds)
     * to return basic information about all of a user's guilds
     *
     * See https://discord.com/developers/docs/resources/user#get-current-user-guilds
     */
    OAuth2Scopes["Guilds"] = "guilds";
    /**
     * Allows [/guilds/{guild.id}/members/{user.id}](https://discord.com/developers/docs/resources/guild#add-guild-member)
     * to be used for joining users to a guild
     *
     * See https://discord.com/developers/docs/resources/guild#add-guild-member
     */
    OAuth2Scopes["GuildsJoin"] = "guilds.join";
    /**
     * Allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild
     *
     * See https://discord.com/developers/docs/resources/user#get-current-user-guild-member
     */
    OAuth2Scopes["GuildsMembersRead"] = "guilds.members.read";
    /**
     * Allows your app to join users to a group dm
     *
     * See https://discord.com/developers/docs/resources/channel#group-dm-add-recipient
     */
    OAuth2Scopes["GroupDMJoins"] = "gdm.join";
    /**
     * For local rpc server api access, this allows you to read messages from all client channels
     * (otherwise restricted to channels/guilds your app creates)
     */
    OAuth2Scopes["MessagesRead"] = "messages.read";
    /**
     * Allows your app to update a user's connection and metadata for the app
     */
    OAuth2Scopes["RoleConnectionsWrite"] = "role_connections.write";
    /**
     * For local rpc server access, this allows you to control a user's local Discord client - requires Discord approval
     */
    OAuth2Scopes["RPC"] = "rpc";
    /**
     * For local rpc server api access, this allows you to receive notifications pushed out to the user - requires Discord approval
     */
    OAuth2Scopes["RPCNotificationsRead"] = "rpc.notifications.read";
    /**
     * This generates a webhook that is returned in the oauth token response for authorization code grants
     */
    OAuth2Scopes["WebhookIncoming"] = "webhook.incoming";
    /**
     * Allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval
     */
    OAuth2Scopes["Voice"] = "voice";
    /**
     * Allows your app to upload/update builds for a user's applications - requires Discord approval
     */
    OAuth2Scopes["ApplicationsBuildsUpload"] = "applications.builds.upload";
    /**
     * Allows your app to read build data for a user's applications
     */
    OAuth2Scopes["ApplicationsBuildsRead"] = "applications.builds.read";
    /**
     * Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications
     */
    OAuth2Scopes["ApplicationsStoreUpdate"] = "applications.store.update";
    /**
     * Allows your app to read entitlements for a user's applications
     */
    OAuth2Scopes["ApplicationsEntitlements"] = "applications.entitlements";
    /**
     * Allows your app to know a user's friends and implicit relationships - requires Discord approval
     */
    OAuth2Scopes["RelationshipsRead"] = "relationships.read";
    /**
     * Allows your app to fetch data from a user's "Now Playing/Recently Played" list - requires Discord approval
     */
    OAuth2Scopes["ActivitiesRead"] = "activities.read";
    /**
     * Allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)
     *
     * See https://discord.com/developers/docs/game-sdk/activities
     */
    OAuth2Scopes["ActivitiesWrite"] = "activities.write";
    /**
     * Allows your app to use Application Commands in a guild
     *
     * See https://discord.com/developers/docs/interactions/application-commands
     */
    OAuth2Scopes["ApplicationsCommands"] = "applications.commands";
    /**
     * Allows your app to update its Application Commands via this bearer token - client credentials grant only
     *
     * See https://discord.com/developers/docs/interactions/application-commands
     */
    OAuth2Scopes["ApplicationsCommandsUpdate"] = "applications.commands.update";
    /**
     * Allows your app to update permissions for its commands using a Bearer token - client credentials grant only
     *
     * See https://discord.com/developers/docs/interactions/application-commands
     */
    OAuth2Scopes["ApplicationCommandsPermissionsUpdate"] = "applications.commands.permissions.update";
})(OAuth2Scopes$1 || (oauth2$1.OAuth2Scopes = OAuth2Scopes$1 = {}));

var poll$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/poll
 */
Object.defineProperty(poll$1, "__esModule", { value: true });
poll$1.PollLayoutType = void 0;
/**
 * https://discord.com/developers/docs/resources/poll#layout-type
 */
var PollLayoutType$1;
(function (PollLayoutType) {
    /**
     * The, uhm, default layout type
     */
    PollLayoutType[PollLayoutType["Default"] = 1] = "Default";
})(PollLayoutType$1 || (poll$1.PollLayoutType = PollLayoutType$1 = {}));

var permissions = {};

/**
 * Types extracted from https://discord.com/developers/docs/topics/permissions
 */
Object.defineProperty(permissions, "__esModule", { value: true });
permissions.RoleFlags = void 0;
/**
 * https://discord.com/developers/docs/topics/permissions#role-object-role-flags
 */
var RoleFlags$1;
(function (RoleFlags) {
    /**
     * Role can be selected by members in an onboarding prompt
     */
    RoleFlags[RoleFlags["InPrompt"] = 1] = "InPrompt";
})(RoleFlags$1 || (permissions.RoleFlags = RoleFlags$1 = {}));

var stageInstance$1 = {};

Object.defineProperty(stageInstance$1, "__esModule", { value: true });
stageInstance$1.StageInstancePrivacyLevel = void 0;
/**
 * https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level
 */
var StageInstancePrivacyLevel$1;
(function (StageInstancePrivacyLevel) {
    /**
     * The stage instance is visible publicly, such as on stage discovery
     *
     * @deprecated
     */
    StageInstancePrivacyLevel[StageInstancePrivacyLevel["Public"] = 1] = "Public";
    /**
     * The stage instance is visible to only guild members
     */
    StageInstancePrivacyLevel[StageInstancePrivacyLevel["GuildOnly"] = 2] = "GuildOnly";
})(StageInstancePrivacyLevel$1 || (stageInstance$1.StageInstancePrivacyLevel = StageInstancePrivacyLevel$1 = {}));

var sticker$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/sticker
 */
Object.defineProperty(sticker$1, "__esModule", { value: true });
sticker$1.StickerFormatType = sticker$1.StickerType = void 0;
/**
 * https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types
 */
var StickerType$1;
(function (StickerType) {
    /**
     * An official sticker in a pack
     */
    StickerType[StickerType["Standard"] = 1] = "Standard";
    /**
     * A sticker uploaded to a guild for the guild's members
     */
    StickerType[StickerType["Guild"] = 2] = "Guild";
})(StickerType$1 || (sticker$1.StickerType = StickerType$1 = {}));
/**
 * https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types
 */
var StickerFormatType$1;
(function (StickerFormatType) {
    StickerFormatType[StickerFormatType["PNG"] = 1] = "PNG";
    StickerFormatType[StickerFormatType["APNG"] = 2] = "APNG";
    StickerFormatType[StickerFormatType["Lottie"] = 3] = "Lottie";
    StickerFormatType[StickerFormatType["GIF"] = 4] = "GIF";
})(StickerFormatType$1 || (sticker$1.StickerFormatType = StickerFormatType$1 = {}));

var teams = {};

/**
 * Types extracted from https://discord.com/developers/docs/topics/teams
 */
Object.defineProperty(teams, "__esModule", { value: true });
teams.TeamMemberRole = teams.TeamMemberMembershipState = void 0;
/**
 * https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum
 */
var TeamMemberMembershipState$1;
(function (TeamMemberMembershipState) {
    TeamMemberMembershipState[TeamMemberMembershipState["Invited"] = 1] = "Invited";
    TeamMemberMembershipState[TeamMemberMembershipState["Accepted"] = 2] = "Accepted";
})(TeamMemberMembershipState$1 || (teams.TeamMemberMembershipState = TeamMemberMembershipState$1 = {}));
/**
 * https://discord.com/developers/docs/topics/teams#team-member-roles-team-member-role-types
 */
var TeamMemberRole$1;
(function (TeamMemberRole) {
    TeamMemberRole["Admin"] = "admin";
    TeamMemberRole["Developer"] = "developer";
    TeamMemberRole["ReadOnly"] = "read_only";
})(TeamMemberRole$1 || (teams.TeamMemberRole = TeamMemberRole$1 = {}));

var template$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/guild-template
 */
Object.defineProperty(template$1, "__esModule", { value: true });

var user$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/user
 */
Object.defineProperty(user$1, "__esModule", { value: true });
user$1.ConnectionVisibility = user$1.ConnectionService = user$1.UserPremiumType = user$1.UserFlags = void 0;
/**
 * https://discord.com/developers/docs/resources/user#user-object-user-flags
 */
var UserFlags$1;
(function (UserFlags) {
    /**
     * Discord Employee
     */
    UserFlags[UserFlags["Staff"] = 1] = "Staff";
    /**
     * Partnered Server Owner
     */
    UserFlags[UserFlags["Partner"] = 2] = "Partner";
    /**
     * HypeSquad Events Member
     */
    UserFlags[UserFlags["Hypesquad"] = 4] = "Hypesquad";
    /**
     * Bug Hunter Level 1
     */
    UserFlags[UserFlags["BugHunterLevel1"] = 8] = "BugHunterLevel1";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["MFASMS"] = 16] = "MFASMS";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["PremiumPromoDismissed"] = 32] = "PremiumPromoDismissed";
    /**
     * House Bravery Member
     */
    UserFlags[UserFlags["HypeSquadOnlineHouse1"] = 64] = "HypeSquadOnlineHouse1";
    /**
     * House Brilliance Member
     */
    UserFlags[UserFlags["HypeSquadOnlineHouse2"] = 128] = "HypeSquadOnlineHouse2";
    /**
     * House Balance Member
     */
    UserFlags[UserFlags["HypeSquadOnlineHouse3"] = 256] = "HypeSquadOnlineHouse3";
    /**
     * Early Nitro Supporter
     */
    UserFlags[UserFlags["PremiumEarlySupporter"] = 512] = "PremiumEarlySupporter";
    /**
     * User is a [team](https://discord.com/developers/docs/topics/teams)
     */
    UserFlags[UserFlags["TeamPseudoUser"] = 1024] = "TeamPseudoUser";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["HasUnreadUrgentMessages"] = 8192] = "HasUnreadUrgentMessages";
    /**
     * Bug Hunter Level 2
     */
    UserFlags[UserFlags["BugHunterLevel2"] = 16384] = "BugHunterLevel2";
    /**
     * Verified Bot
     */
    UserFlags[UserFlags["VerifiedBot"] = 65536] = "VerifiedBot";
    /**
     * Early Verified Bot Developer
     */
    UserFlags[UserFlags["VerifiedDeveloper"] = 131072] = "VerifiedDeveloper";
    /**
     * Moderator Programs Alumni
     */
    UserFlags[UserFlags["CertifiedModerator"] = 262144] = "CertifiedModerator";
    /**
     * Bot uses only [HTTP interactions](https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction) and is shown in the online member list
     */
    UserFlags[UserFlags["BotHTTPInteractions"] = 524288] = "BotHTTPInteractions";
    /**
     * User has been identified as spammer
     *
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["Spammer"] = 1048576] = "Spammer";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["DisablePremium"] = 2097152] = "DisablePremium";
    /**
     * User is an [Active Developer](https://support-dev.discord.com/hc/articles/10113997751447)
     */
    UserFlags[UserFlags["ActiveDeveloper"] = 4194304] = "ActiveDeveloper";
    /**
     * User's account has been [quarantined](https://support.discord.com/hc/articles/6461420677527) based on recent activity
     *
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     * @privateRemarks
     *
     * This value would be 1 << 44, but bit shifting above 1 << 30 requires bigints
     */
    UserFlags[UserFlags["Quarantined"] = 17592186044416] = "Quarantined";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     * @privateRemarks
     *
     * This value would be 1 << 50, but bit shifting above 1 << 30 requires bigints
     */
    UserFlags[UserFlags["Collaborator"] = 1125899906842624] = "Collaborator";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     * @privateRemarks
     *
     * This value would be 1 << 51, but bit shifting above 1 << 30 requires bigints
     */
    UserFlags[UserFlags["RestrictedCollaborator"] = 2251799813685248] = "RestrictedCollaborator";
})(UserFlags$1 || (user$1.UserFlags = UserFlags$1 = {}));
/**
 * https://discord.com/developers/docs/resources/user#user-object-premium-types
 */
var UserPremiumType$1;
(function (UserPremiumType) {
    UserPremiumType[UserPremiumType["None"] = 0] = "None";
    UserPremiumType[UserPremiumType["NitroClassic"] = 1] = "NitroClassic";
    UserPremiumType[UserPremiumType["Nitro"] = 2] = "Nitro";
    UserPremiumType[UserPremiumType["NitroBasic"] = 3] = "NitroBasic";
})(UserPremiumType$1 || (user$1.UserPremiumType = UserPremiumType$1 = {}));
var ConnectionService$1;
(function (ConnectionService) {
    ConnectionService["BattleNet"] = "battlenet";
    ConnectionService["BungieNet"] = "bungie";
    ConnectionService["Domain"] = "domain";
    ConnectionService["eBay"] = "ebay";
    ConnectionService["EpicGames"] = "epicgames";
    ConnectionService["Facebook"] = "facebook";
    ConnectionService["GitHub"] = "github";
    ConnectionService["Instagram"] = "instagram";
    ConnectionService["LeagueOfLegends"] = "leagueoflegends";
    ConnectionService["PayPal"] = "paypal";
    ConnectionService["PlayStationNetwork"] = "playstation";
    ConnectionService["Reddit"] = "reddit";
    ConnectionService["RiotGames"] = "riotgames";
    ConnectionService["Roblox"] = "roblox";
    ConnectionService["Spotify"] = "spotify";
    ConnectionService["Skype"] = "skype";
    ConnectionService["Steam"] = "steam";
    ConnectionService["TikTok"] = "tiktok";
    ConnectionService["Twitch"] = "twitch";
    ConnectionService["X"] = "twitter";
    /**
     * @deprecated This is the old name for {@apilink ConnectionService#X}
     */
    ConnectionService["Twitter"] = "twitter";
    ConnectionService["Xbox"] = "xbox";
    ConnectionService["YouTube"] = "youtube";
})(ConnectionService$1 || (user$1.ConnectionService = ConnectionService$1 = {}));
var ConnectionVisibility$1;
(function (ConnectionVisibility) {
    /**
     * Invisible to everyone except the user themselves
     */
    ConnectionVisibility[ConnectionVisibility["None"] = 0] = "None";
    /**
     * Visible to everyone
     */
    ConnectionVisibility[ConnectionVisibility["Everyone"] = 1] = "Everyone";
})(ConnectionVisibility$1 || (user$1.ConnectionVisibility = ConnectionVisibility$1 = {}));

var voice$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/voice
 */
Object.defineProperty(voice$1, "__esModule", { value: true });

var webhook$1 = {};

/**
 * Types extracted from https://discord.com/developers/docs/resources/webhook
 */
Object.defineProperty(webhook$1, "__esModule", { value: true });
webhook$1.WebhookType = void 0;
var WebhookType$1;
(function (WebhookType) {
    /**
     * Incoming Webhooks can post messages to channels with a generated token
     */
    WebhookType[WebhookType["Incoming"] = 1] = "Incoming";
    /**
     * Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels
     */
    WebhookType[WebhookType["ChannelFollower"] = 2] = "ChannelFollower";
    /**
     * Application webhooks are webhooks used with Interactions
     */
    WebhookType[WebhookType["Application"] = 3] = "Application";
})(WebhookType$1 || (webhook$1.WebhookType = WebhookType$1 = {}));

var monetization$1 = {};

Object.defineProperty(monetization$1, "__esModule", { value: true });
monetization$1.SKUType = monetization$1.SKUFlags = monetization$1.EntitlementType = void 0;
/**
 * https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-types
 */
var EntitlementType$1;
(function (EntitlementType) {
    /**
     * Entitlement was purchased by user
     */
    EntitlementType[EntitlementType["Purchase"] = 1] = "Purchase";
    /**
     * Entitlement for Discord Nitro subscription
     */
    EntitlementType[EntitlementType["PremiumSubscription"] = 2] = "PremiumSubscription";
    /**
     * Entitlement was gifted by developer
     */
    EntitlementType[EntitlementType["DeveloperGift"] = 3] = "DeveloperGift";
    /**
     * Entitlement was purchased by a dev in application test mode
     */
    EntitlementType[EntitlementType["TestModePurchase"] = 4] = "TestModePurchase";
    /**
     * Entitlement was granted when the SKU was free
     */
    EntitlementType[EntitlementType["FreePurchase"] = 5] = "FreePurchase";
    /**
     * Entitlement was gifted by another user
     */
    EntitlementType[EntitlementType["UserGift"] = 6] = "UserGift";
    /**
     * Entitlement was claimed by user for free as a Nitro Subscriber
     */
    EntitlementType[EntitlementType["PremiumPurchase"] = 7] = "PremiumPurchase";
    /**
     * Entitlement was purchased as an app subscription
     */
    EntitlementType[EntitlementType["ApplicationSubscription"] = 8] = "ApplicationSubscription";
})(EntitlementType$1 || (monetization$1.EntitlementType = EntitlementType$1 = {}));
/**
 * https://discord.com/developers/docs/monetization/skus#sku-object-sku-flags
 */
var SKUFlags$1;
(function (SKUFlags) {
    /**
     * SKU is available for purchase
     */
    SKUFlags[SKUFlags["Available"] = 4] = "Available";
    /**
     * Recurring SKU that can be purchased by a user and applied to a single server.
     * Grants access to every user in that server.
     */
    SKUFlags[SKUFlags["GuildSubscription"] = 128] = "GuildSubscription";
    /**
     * Recurring SKU purchased by a user for themselves. Grants access to the purchasing user in every server.
     */
    SKUFlags[SKUFlags["UserSubscription"] = 256] = "UserSubscription";
})(SKUFlags$1 || (monetization$1.SKUFlags = SKUFlags$1 = {}));
var SKUType$1;
(function (SKUType) {
    /**
     * Durable one-time purchase
     */
    SKUType[SKUType["Durable"] = 2] = "Durable";
    /**
     * Consumable one-time purchase
     */
    SKUType[SKUType["Consumable"] = 3] = "Consumable";
    /**
     * Represents a recurring subscription
     */
    SKUType[SKUType["Subscription"] = 5] = "Subscription";
    /**
     * System-generated group for each Subscription SKU created
     */
    SKUType[SKUType["SubscriptionGroup"] = 6] = "SubscriptionGroup";
})(SKUType$1 || (monetization$1.SKUType = SKUType$1 = {}));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(common$2, exports);
	__exportStar(application$1, exports);
	__exportStar(auditLog$1, exports);
	__exportStar(autoModeration$1, exports);
	__exportStar(channel$2, exports);
	__exportStar(emoji$1, exports);
	__exportStar(gateway$1, exports);
	__exportStar(guild$1, exports);
	__exportStar(guildScheduledEvent$1, exports);
	__exportStar(interactions$1, exports);
	__exportStar(invite$1, exports);
	__exportStar(oauth2$1, exports);
	__exportStar(poll$1, exports);
	__exportStar(permissions, exports);
	__exportStar(stageInstance$1, exports);
	__exportStar(sticker$1, exports);
	__exportStar(teams, exports);
	__exportStar(template$1, exports);
	__exportStar(user$1, exports);
	__exportStar(voice$1, exports);
	__exportStar(webhook$1, exports);
	__exportStar(monetization$1, exports);
	
} (v10$7));

var mod$2 = /*@__PURE__*/getDefaultExportFromCjs(v10$7);

const APIApplicationCommandPermissionsConstant = mod$2.APIApplicationCommandPermissionsConstant;
const ActivityFlags = mod$2.ActivityFlags;
const ActivityPlatform = mod$2.ActivityPlatform;
const ActivityType = mod$2.ActivityType;
const AllowedMentionsTypes = mod$2.AllowedMentionsTypes;
const ApplicationCommandOptionType = mod$2.ApplicationCommandOptionType;
const ApplicationCommandPermissionType = mod$2.ApplicationCommandPermissionType;
const ApplicationCommandType = mod$2.ApplicationCommandType;
const ApplicationFlags = mod$2.ApplicationFlags;
const ApplicationIntegrationType = mod$2.ApplicationIntegrationType;
const ApplicationRoleConnectionMetadataType = mod$2.ApplicationRoleConnectionMetadataType;
const AttachmentFlags = mod$2.AttachmentFlags;
const AuditLogEvent = mod$2.AuditLogEvent;
const AuditLogOptionsType = mod$2.AuditLogOptionsType;
const AutoModerationActionType = mod$2.AutoModerationActionType;
const AutoModerationRuleEventType = mod$2.AutoModerationRuleEventType;
const AutoModerationRuleKeywordPresetType = mod$2.AutoModerationRuleKeywordPresetType;
const AutoModerationRuleTriggerType = mod$2.AutoModerationRuleTriggerType;
const ButtonStyle = mod$2.ButtonStyle;
const ChannelFlags = mod$2.ChannelFlags;
const ChannelType = mod$2.ChannelType;
const ComponentType = mod$2.ComponentType;
const ConnectionService = mod$2.ConnectionService;
const ConnectionVisibility = mod$2.ConnectionVisibility;
const EmbedType = mod$2.EmbedType;
const EntitlementType = mod$2.EntitlementType;
const ForumLayoutType = mod$2.ForumLayoutType;
const GuildDefaultMessageNotifications = mod$2.GuildDefaultMessageNotifications;
const GuildExplicitContentFilter = mod$2.GuildExplicitContentFilter;
const GuildFeature = mod$2.GuildFeature;
const GuildHubType = mod$2.GuildHubType;
const GuildMFALevel = mod$2.GuildMFALevel;
const GuildMemberFlags = mod$2.GuildMemberFlags;
const GuildNSFWLevel = mod$2.GuildNSFWLevel;
const GuildOnboardingMode = mod$2.GuildOnboardingMode;
const GuildOnboardingPromptType = mod$2.GuildOnboardingPromptType;
const GuildPremiumTier = mod$2.GuildPremiumTier;
const GuildScheduledEventEntityType = mod$2.GuildScheduledEventEntityType;
const GuildScheduledEventPrivacyLevel = mod$2.GuildScheduledEventPrivacyLevel;
const GuildScheduledEventRecurrenceRuleFrequency = mod$2.GuildScheduledEventRecurrenceRuleFrequency;
const GuildScheduledEventRecurrenceRuleMonth = mod$2.GuildScheduledEventRecurrenceRuleMonth;
const GuildScheduledEventRecurrenceRuleWeekday = mod$2.GuildScheduledEventRecurrenceRuleWeekday;
const GuildScheduledEventStatus = mod$2.GuildScheduledEventStatus;
const GuildSystemChannelFlags = mod$2.GuildSystemChannelFlags;
const GuildVerificationLevel = mod$2.GuildVerificationLevel;
const GuildWidgetStyle = mod$2.GuildWidgetStyle;
const IntegrationExpireBehavior = mod$2.IntegrationExpireBehavior;
const InteractionContextType = mod$2.InteractionContextType;
const InteractionResponseType = mod$2.InteractionResponseType;
const InteractionType = mod$2.InteractionType;
const InviteTargetType = mod$2.InviteTargetType;
const InviteType = mod$2.InviteType;
const MembershipScreeningFieldType = mod$2.MembershipScreeningFieldType;
const MessageActivityType = mod$2.MessageActivityType;
const MessageFlags = mod$2.MessageFlags;
const MessageReferenceType = mod$2.MessageReferenceType;
const MessageType = mod$2.MessageType;
const OAuth2Scopes = mod$2.OAuth2Scopes;
const OverwriteType = mod$2.OverwriteType;
const PermissionFlagsBits = mod$2.PermissionFlagsBits;
const PollLayoutType = mod$2.PollLayoutType;
const PresenceUpdateStatus = mod$2.PresenceUpdateStatus;
const RoleFlags = mod$2.RoleFlags;
const SKUFlags = mod$2.SKUFlags;
const SKUType = mod$2.SKUType;
const SelectMenuDefaultValueType = mod$2.SelectMenuDefaultValueType;
const SortOrderType = mod$2.SortOrderType;
const StageInstancePrivacyLevel = mod$2.StageInstancePrivacyLevel;
const StickerFormatType = mod$2.StickerFormatType;
const StickerType = mod$2.StickerType;
const TeamMemberMembershipState = mod$2.TeamMemberMembershipState;
const TeamMemberRole = mod$2.TeamMemberRole;
const TextInputStyle = mod$2.TextInputStyle;
const ThreadAutoArchiveDuration = mod$2.ThreadAutoArchiveDuration;
const ThreadMemberFlags = mod$2.ThreadMemberFlags;
const UserFlags = mod$2.UserFlags;
const UserPremiumType = mod$2.UserPremiumType;
const VideoQualityMode = mod$2.VideoQualityMode;
const WebhookType = mod$2.WebhookType;

var v10$6 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	APIApplicationCommandPermissionsConstant: APIApplicationCommandPermissionsConstant,
	ActivityFlags: ActivityFlags,
	ActivityPlatform: ActivityPlatform,
	ActivityType: ActivityType,
	AllowedMentionsTypes: AllowedMentionsTypes,
	ApplicationCommandOptionType: ApplicationCommandOptionType,
	ApplicationCommandPermissionType: ApplicationCommandPermissionType,
	ApplicationCommandType: ApplicationCommandType,
	ApplicationFlags: ApplicationFlags,
	ApplicationIntegrationType: ApplicationIntegrationType,
	ApplicationRoleConnectionMetadataType: ApplicationRoleConnectionMetadataType,
	AttachmentFlags: AttachmentFlags,
	AuditLogEvent: AuditLogEvent,
	AuditLogOptionsType: AuditLogOptionsType,
	AutoModerationActionType: AutoModerationActionType,
	AutoModerationRuleEventType: AutoModerationRuleEventType,
	AutoModerationRuleKeywordPresetType: AutoModerationRuleKeywordPresetType,
	AutoModerationRuleTriggerType: AutoModerationRuleTriggerType,
	ButtonStyle: ButtonStyle,
	ChannelFlags: ChannelFlags,
	ChannelType: ChannelType,
	ComponentType: ComponentType,
	ConnectionService: ConnectionService,
	ConnectionVisibility: ConnectionVisibility,
	EmbedType: EmbedType,
	EntitlementType: EntitlementType,
	ForumLayoutType: ForumLayoutType,
	GuildDefaultMessageNotifications: GuildDefaultMessageNotifications,
	GuildExplicitContentFilter: GuildExplicitContentFilter,
	GuildFeature: GuildFeature,
	GuildHubType: GuildHubType,
	GuildMFALevel: GuildMFALevel,
	GuildMemberFlags: GuildMemberFlags,
	GuildNSFWLevel: GuildNSFWLevel,
	GuildOnboardingMode: GuildOnboardingMode,
	GuildOnboardingPromptType: GuildOnboardingPromptType,
	GuildPremiumTier: GuildPremiumTier,
	GuildScheduledEventEntityType: GuildScheduledEventEntityType,
	GuildScheduledEventPrivacyLevel: GuildScheduledEventPrivacyLevel,
	GuildScheduledEventRecurrenceRuleFrequency: GuildScheduledEventRecurrenceRuleFrequency,
	GuildScheduledEventRecurrenceRuleMonth: GuildScheduledEventRecurrenceRuleMonth,
	GuildScheduledEventRecurrenceRuleWeekday: GuildScheduledEventRecurrenceRuleWeekday,
	GuildScheduledEventStatus: GuildScheduledEventStatus,
	GuildSystemChannelFlags: GuildSystemChannelFlags,
	GuildVerificationLevel: GuildVerificationLevel,
	GuildWidgetStyle: GuildWidgetStyle,
	IntegrationExpireBehavior: IntegrationExpireBehavior,
	InteractionContextType: InteractionContextType,
	InteractionResponseType: InteractionResponseType,
	InteractionType: InteractionType,
	InviteTargetType: InviteTargetType,
	InviteType: InviteType,
	MembershipScreeningFieldType: MembershipScreeningFieldType,
	MessageActivityType: MessageActivityType,
	MessageFlags: MessageFlags,
	MessageReferenceType: MessageReferenceType,
	MessageType: MessageType,
	OAuth2Scopes: OAuth2Scopes,
	OverwriteType: OverwriteType,
	PermissionFlagsBits: PermissionFlagsBits,
	PollLayoutType: PollLayoutType,
	PresenceUpdateStatus: PresenceUpdateStatus,
	RoleFlags: RoleFlags,
	SKUFlags: SKUFlags,
	SKUType: SKUType,
	SelectMenuDefaultValueType: SelectMenuDefaultValueType,
	SortOrderType: SortOrderType,
	StageInstancePrivacyLevel: StageInstancePrivacyLevel,
	StickerFormatType: StickerFormatType,
	StickerType: StickerType,
	TeamMemberMembershipState: TeamMemberMembershipState,
	TeamMemberRole: TeamMemberRole,
	TextInputStyle: TextInputStyle,
	ThreadAutoArchiveDuration: ThreadAutoArchiveDuration,
	ThreadMemberFlags: ThreadMemberFlags,
	UserFlags: UserFlags,
	UserPremiumType: UserPremiumType,
	VideoQualityMode: VideoQualityMode,
	WebhookType: WebhookType,
	default: mod$2
});

var require$$2 = /*@__PURE__*/getAugmentedNamespace(v10$6);

var v10$5 = {};

var common$1 = {};

Object.defineProperty(common$1, "__esModule", { value: true });
common$1.Locale = common$1.RESTJSONErrorCodes = void 0;
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes
 */
var RESTJSONErrorCodes$1;
(function (RESTJSONErrorCodes) {
    RESTJSONErrorCodes[RESTJSONErrorCodes["GeneralError"] = 0] = "GeneralError";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownAccount"] = 10001] = "UnknownAccount";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownApplication"] = 10002] = "UnknownApplication";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownChannel"] = 10003] = "UnknownChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuild"] = 10004] = "UnknownGuild";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownIntegration"] = 10005] = "UnknownIntegration";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownInvite"] = 10006] = "UnknownInvite";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownMember"] = 10007] = "UnknownMember";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownMessage"] = 10008] = "UnknownMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownPermissionOverwrite"] = 10009] = "UnknownPermissionOverwrite";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownProvider"] = 10010] = "UnknownProvider";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownRole"] = 10011] = "UnknownRole";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownToken"] = 10012] = "UnknownToken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownUser"] = 10013] = "UnknownUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownEmoji"] = 10014] = "UnknownEmoji";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownWebhook"] = 10015] = "UnknownWebhook";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownWebhookService"] = 10016] = "UnknownWebhookService";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSession"] = 10020] = "UnknownSession";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownBan"] = 10026] = "UnknownBan";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSKU"] = 10027] = "UnknownSKU";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStoreListing"] = 10028] = "UnknownStoreListing";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownEntitlement"] = 10029] = "UnknownEntitlement";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownBuild"] = 10030] = "UnknownBuild";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownLobby"] = 10031] = "UnknownLobby";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownBranch"] = 10032] = "UnknownBranch";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStoreDirectoryLayout"] = 10033] = "UnknownStoreDirectoryLayout";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownRedistributable"] = 10036] = "UnknownRedistributable";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGiftCode"] = 10038] = "UnknownGiftCode";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStream"] = 10049] = "UnknownStream";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownPremiumServerSubscribeCooldown"] = 10050] = "UnknownPremiumServerSubscribeCooldown";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildTemplate"] = 10057] = "UnknownGuildTemplate";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownDiscoverableServerCategory"] = 10059] = "UnknownDiscoverableServerCategory";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSticker"] = 10060] = "UnknownSticker";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStickerPack"] = 10061] = "UnknownStickerPack";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownInteraction"] = 10062] = "UnknownInteraction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownApplicationCommand"] = 10063] = "UnknownApplicationCommand";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownVoiceState"] = 10065] = "UnknownVoiceState";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownApplicationCommandPermissions"] = 10066] = "UnknownApplicationCommandPermissions";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStageInstance"] = 10067] = "UnknownStageInstance";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildMemberVerificationForm"] = 10068] = "UnknownGuildMemberVerificationForm";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildWelcomeScreen"] = 10069] = "UnknownGuildWelcomeScreen";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildScheduledEvent"] = 10070] = "UnknownGuildScheduledEvent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildScheduledEventUser"] = 10071] = "UnknownGuildScheduledEventUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownTag"] = 10087] = "UnknownTag";
    RESTJSONErrorCodes[RESTJSONErrorCodes["BotsCannotUseThisEndpoint"] = 20001] = "BotsCannotUseThisEndpoint";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OnlyBotsCanUseThisEndpoint"] = 20002] = "OnlyBotsCanUseThisEndpoint";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ExplicitContentCannotBeSentToTheDesiredRecipient"] = 20009] = "ExplicitContentCannotBeSentToTheDesiredRecipient";
    RESTJSONErrorCodes[RESTJSONErrorCodes["NotAuthorizedToPerformThisActionOnThisApplication"] = 20012] = "NotAuthorizedToPerformThisActionOnThisApplication";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ActionCannotBePerformedDueToSlowmodeRateLimit"] = 20016] = "ActionCannotBePerformedDueToSlowmodeRateLimit";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheMazeIsntMeantForYou"] = 20017] = "TheMazeIsntMeantForYou";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OnlyTheOwnerOfThisAccountCanPerformThisAction"] = 20018] = "OnlyTheOwnerOfThisAccountCanPerformThisAction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["AnnouncementEditLimitExceeded"] = 20022] = "AnnouncementEditLimitExceeded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnderMinimumAge"] = 20024] = "UnderMinimumAge";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ChannelSendRateLimit"] = 20028] = "ChannelSendRateLimit";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerSendRateLimit"] = 20029] = "ServerSendRateLimit";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords"] = 20031] = "StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords";
    RESTJSONErrorCodes[RESTJSONErrorCodes["GuildPremiumSubscriptionLevelTooLow"] = 20035] = "GuildPremiumSubscriptionLevelTooLow";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildsReached"] = 30001] = "MaximumNumberOfGuildsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfFriendsReached"] = 30002] = "MaximumNumberOfFriendsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPinsReachedForTheChannel"] = 30003] = "MaximumNumberOfPinsReachedForTheChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfRecipientsReached"] = 30004] = "MaximumNumberOfRecipientsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildRolesReached"] = 30005] = "MaximumNumberOfGuildRolesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfWebhooksReached"] = 30007] = "MaximumNumberOfWebhooksReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfEmojisReached"] = 30008] = "MaximumNumberOfEmojisReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfReactionsReached"] = 30010] = "MaximumNumberOfReactionsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGroupDMsReached"] = 30011] = "MaximumNumberOfGroupDMsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildChannelsReached"] = 30013] = "MaximumNumberOfGuildChannelsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfAttachmentsInAMessageReached"] = 30015] = "MaximumNumberOfAttachmentsInAMessageReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfInvitesReached"] = 30016] = "MaximumNumberOfInvitesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfAnimatedEmojisReached"] = 30018] = "MaximumNumberOfAnimatedEmojisReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfServerMembersReached"] = 30019] = "MaximumNumberOfServerMembersReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfServerCategoriesReached"] = 30030] = "MaximumNumberOfServerCategoriesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["GuildAlreadyHasTemplate"] = 30031] = "GuildAlreadyHasTemplate";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfApplicationCommandsReached"] = 30032] = "MaximumNumberOfApplicationCommandsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumThreadParticipantsReached"] = 30033] = "MaximumThreadParticipantsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumDailyApplicationCommandCreatesReached"] = 30034] = "MaximumDailyApplicationCommandCreatesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfNonGuildMemberBansHasBeenExceeded"] = 30035] = "MaximumNumberOfNonGuildMemberBansHasBeenExceeded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfBanFetchesHasBeenReached"] = 30037] = "MaximumNumberOfBanFetchesHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfUncompletedGuildScheduledEventsReached"] = 30038] = "MaximumNumberOfUncompletedGuildScheduledEventsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfStickersReached"] = 30039] = "MaximumNumberOfStickersReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPruneRequestsHasBeenReached"] = 30040] = "MaximumNumberOfPruneRequestsHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached"] = 30042] = "MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfEditsToMessagesOlderThanOneHourReached"] = 30046] = "MaximumNumberOfEditsToMessagesOlderThanOneHourReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPinnedThreadsInForumHasBeenReached"] = 30047] = "MaximumNumberOfPinnedThreadsInForumHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfTagsInForumHasBeenReached"] = 30048] = "MaximumNumberOfTagsInForumHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["BitrateIsTooHighForChannelOfThisType"] = 30052] = "BitrateIsTooHighForChannelOfThisType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPremiumEmojisReached"] = 30056] = "MaximumNumberOfPremiumEmojisReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfWebhooksPerGuildReached"] = 30058] = "MaximumNumberOfWebhooksPerGuildReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfChannelPermissionOverwritesReached"] = 30060] = "MaximumNumberOfChannelPermissionOverwritesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheChannelsForThisGuildAreTooLarge"] = 30061] = "TheChannelsForThisGuildAreTooLarge";
    RESTJSONErrorCodes[RESTJSONErrorCodes["Unauthorized"] = 40001] = "Unauthorized";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VerifyYourAccount"] = 40002] = "VerifyYourAccount";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OpeningDirectMessagesTooFast"] = 40003] = "OpeningDirectMessagesTooFast";
    RESTJSONErrorCodes[RESTJSONErrorCodes["SendMessagesHasBeenTemporarilyDisabled"] = 40004] = "SendMessagesHasBeenTemporarilyDisabled";
    RESTJSONErrorCodes[RESTJSONErrorCodes["RequestEntityTooLarge"] = 40005] = "RequestEntityTooLarge";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FeatureTemporarilyDisabledServerSide"] = 40006] = "FeatureTemporarilyDisabledServerSide";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UserBannedFromThisGuild"] = 40007] = "UserBannedFromThisGuild";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ConnectionHasBeenRevoked"] = 40012] = "ConnectionHasBeenRevoked";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TargetUserIsNotConnectedToVoice"] = 40032] = "TargetUserIsNotConnectedToVoice";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThisMessageWasAlreadyCrossposted"] = 40033] = "ThisMessageWasAlreadyCrossposted";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ApplicationCommandWithThatNameAlreadyExists"] = 40041] = "ApplicationCommandWithThatNameAlreadyExists";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ApplicationInteractionFailedToSend"] = 40043] = "ApplicationInteractionFailedToSend";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendAMessageInAForumChannel"] = 40058] = "CannotSendAMessageInAForumChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InteractionHasAlreadyBeenAcknowledged"] = 40060] = "InteractionHasAlreadyBeenAcknowledged";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TagNamesMustBeUnique"] = 40061] = "TagNamesMustBeUnique";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServiceResourceIsBeingRateLimited"] = 40062] = "ServiceResourceIsBeingRateLimited";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThereAreNoTagsAvailableThatCanBeSetByNonModerators"] = 40066] = "ThereAreNoTagsAvailableThatCanBeSetByNonModerators";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TagRequiredToCreateAForumPostInThisChannel"] = 40067] = "TagRequiredToCreateAForumPostInThisChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["AnEntitlementHasAlreadyBeenGrantedForThisResource"] = 40074] = "AnEntitlementHasAlreadyBeenGrantedForThisResource";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CloudflareIsBlockingYourRequest"] = 40333] = "CloudflareIsBlockingYourRequest";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MissingAccess"] = 50001] = "MissingAccess";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidAccountType"] = 50002] = "InvalidAccountType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExecuteActionOnDMChannel"] = 50003] = "CannotExecuteActionOnDMChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["GuildWidgetDisabled"] = 50004] = "GuildWidgetDisabled";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEditMessageAuthoredByAnotherUser"] = 50005] = "CannotEditMessageAuthoredByAnotherUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendAnEmptyMessage"] = 50006] = "CannotSendAnEmptyMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendMessagesToThisUser"] = 50007] = "CannotSendMessagesToThisUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendMessagesInNonTextChannel"] = 50008] = "CannotSendMessagesInNonTextChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ChannelVerificationLevelTooHighForYouToGainAccess"] = 50009] = "ChannelVerificationLevelTooHighForYouToGainAccess";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OAuth2ApplicationDoesNotHaveBot"] = 50010] = "OAuth2ApplicationDoesNotHaveBot";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OAuth2ApplicationLimitReached"] = 50011] = "OAuth2ApplicationLimitReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidOAuth2State"] = 50012] = "InvalidOAuth2State";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MissingPermissions"] = 50013] = "MissingPermissions";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidToken"] = 50014] = "InvalidToken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["NoteWasTooLong"] = 50015] = "NoteWasTooLong";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ProvidedTooFewOrTooManyMessagesToDelete"] = 50016] = "ProvidedTooFewOrTooManyMessagesToDelete";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidMFALevel"] = 50017] = "InvalidMFALevel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MessageCanOnlyBePinnedInTheChannelItWasSentIn"] = 50019] = "MessageCanOnlyBePinnedInTheChannelItWasSentIn";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InviteCodeInvalidOrTaken"] = 50020] = "InviteCodeInvalidOrTaken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExecuteActionOnSystemMessage"] = 50021] = "CannotExecuteActionOnSystemMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExecuteActionOnThisChannelType"] = 50024] = "CannotExecuteActionOnThisChannelType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidOAuth2AccessToken"] = 50025] = "InvalidOAuth2AccessToken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MissingRequiredOAuth2Scope"] = 50026] = "MissingRequiredOAuth2Scope";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidWebhookToken"] = 50027] = "InvalidWebhookToken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidRole"] = 50028] = "InvalidRole";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidRecipients"] = 50033] = "InvalidRecipients";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OneOfTheMessagesProvidedWasTooOldForBulkDelete"] = 50034] = "OneOfTheMessagesProvidedWasTooOldForBulkDelete";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidFormBodyOrContentType"] = 50035] = "InvalidFormBodyOrContentType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InviteAcceptedToGuildWithoutTheBotBeingIn"] = 50036] = "InviteAcceptedToGuildWithoutTheBotBeingIn";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidActivityAction"] = 50039] = "InvalidActivityAction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidAPIVersion"] = 50041] = "InvalidAPIVersion";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FileUploadedExceedsMaximumSize"] = 50045] = "FileUploadedExceedsMaximumSize";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidFileUploaded"] = 50046] = "InvalidFileUploaded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSelfRedeemThisGift"] = 50054] = "CannotSelfRedeemThisGift";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidGuild"] = 50055] = "InvalidGuild";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidSKU"] = 50057] = "InvalidSKU";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidRequestOrigin"] = 50067] = "InvalidRequestOrigin";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidMessageType"] = 50068] = "InvalidMessageType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["PaymentSourceRequiredToRedeemGift"] = 50070] = "PaymentSourceRequiredToRedeemGift";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotModifyASystemWebhook"] = 50073] = "CannotModifyASystemWebhook";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotDeleteChannelRequiredForCommunityGuilds"] = 50074] = "CannotDeleteChannelRequiredForCommunityGuilds";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEditStickersWithinMessage"] = 50080] = "CannotEditStickersWithinMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidStickerSent"] = 50081] = "InvalidStickerSent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidActionOnArchivedThread"] = 50083] = "InvalidActionOnArchivedThread";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidThreadNotificationSettings"] = 50084] = "InvalidThreadNotificationSettings";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ParameterEarlierThanCreation"] = 50085] = "ParameterEarlierThanCreation";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CommunityServerChannelsMustBeTextChannels"] = 50086] = "CommunityServerChannelsMustBeTextChannels";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor"] = 50091] = "TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerNotAvailableInYourLocation"] = 50095] = "ServerNotAvailableInYourLocation";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerNeedsMonetizationEnabledToPerformThisAction"] = 50097] = "ServerNeedsMonetizationEnabledToPerformThisAction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerNeedsMoreBoostsToPerformThisAction"] = 50101] = "ServerNeedsMoreBoostsToPerformThisAction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["RequestBodyContainsInvalidJSON"] = 50109] = "RequestBodyContainsInvalidJSON";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OwnerCannotBePendingMember"] = 50131] = "OwnerCannotBePendingMember";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OwnershipCannotBeMovedToABotUser"] = 50132] = "OwnershipCannotBeMovedToABotUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FailedToResizeAssetBelowTheMinimumSize"] = 50138] = "FailedToResizeAssetBelowTheMinimumSize";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji"] = 50144] = "CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotConvertBetweenPremiumEmojiAndNormalEmoji"] = 50145] = "CannotConvertBetweenPremiumEmojiAndNormalEmoji";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UploadedFileNotFound"] = 50146] = "UploadedFileNotFound";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesDoNotSupportAdditionalContent"] = 50159] = "VoiceMessagesDoNotSupportAdditionalContent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesMustHaveASingleAudioAttachment"] = 50160] = "VoiceMessagesMustHaveASingleAudioAttachment";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesMustHaveSupportingMetadata"] = 50161] = "VoiceMessagesMustHaveSupportingMetadata";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesCannotBeEdited"] = 50162] = "VoiceMessagesCannotBeEdited";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotDeleteGuildSubscriptionIntegration"] = 50163] = "CannotDeleteGuildSubscriptionIntegration";
    RESTJSONErrorCodes[RESTJSONErrorCodes["YouCannotSendVoiceMessagesInThisChannel"] = 50173] = "YouCannotSendVoiceMessagesInThisChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheUserAccountMustFirstBeVerified"] = 50178] = "TheUserAccountMustFirstBeVerified";
    RESTJSONErrorCodes[RESTJSONErrorCodes["YouDoNotHavePermissionToSendThisSticker"] = 50600] = "YouDoNotHavePermissionToSendThisSticker";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TwoFactorAuthenticationIsRequired"] = 60003] = "TwoFactorAuthenticationIsRequired";
    RESTJSONErrorCodes[RESTJSONErrorCodes["NoUsersWithDiscordTagExist"] = 80004] = "NoUsersWithDiscordTagExist";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ReactionWasBlocked"] = 90001] = "ReactionWasBlocked";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UserCannotUseBurstReactions"] = 90002] = "UserCannotUseBurstReactions";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ApplicationNotYetAvailable"] = 110001] = "ApplicationNotYetAvailable";
    RESTJSONErrorCodes[RESTJSONErrorCodes["APIResourceOverloaded"] = 130000] = "APIResourceOverloaded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheStageIsAlreadyOpen"] = 150006] = "TheStageIsAlreadyOpen";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotReplyWithoutPermissionToReadMessageHistory"] = 160002] = "CannotReplyWithoutPermissionToReadMessageHistory";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThreadAlreadyCreatedForMessage"] = 160004] = "ThreadAlreadyCreatedForMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThreadLocked"] = 160005] = "ThreadLocked";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumActiveThreads"] = 160006] = "MaximumActiveThreads";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumActiveAnnouncementThreads"] = 160007] = "MaximumActiveAnnouncementThreads";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidJSONForUploadedLottieFile"] = 170001] = "InvalidJSONForUploadedLottieFile";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UploadedLottiesCannotContainRasterizedImages"] = 170002] = "UploadedLottiesCannotContainRasterizedImages";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerMaximumFramerateExceeded"] = 170003] = "StickerMaximumFramerateExceeded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerFrameCountExceedsMaximumOf1000Frames"] = 170004] = "StickerFrameCountExceedsMaximumOf1000Frames";
    RESTJSONErrorCodes[RESTJSONErrorCodes["LottieAnimationMaximumDimensionsExceeded"] = 170005] = "LottieAnimationMaximumDimensionsExceeded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerFramerateIsTooSmallOrTooLarge"] = 170006] = "StickerFramerateIsTooSmallOrTooLarge";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerAnimationDurationExceedsMaximumOf5Seconds"] = 170007] = "StickerAnimationDurationExceedsMaximumOf5Seconds";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotUpdateAFinishedEvent"] = 180000] = "CannotUpdateAFinishedEvent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FailedToCreateStageNeededForStageEvent"] = 180002] = "FailedToCreateStageNeededForStageEvent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MessageWasBlockedByAutomaticModeration"] = 200000] = "MessageWasBlockedByAutomaticModeration";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TitleWasBlockedByAutomaticModeration"] = 200001] = "TitleWasBlockedByAutomaticModeration";
    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId"] = 220001] = "WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId";
    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId"] = 220002] = "WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId";
    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhooksCanOnlyCreateThreadsInForumChannels"] = 220003] = "WebhooksCanOnlyCreateThreadsInForumChannels";
    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhookServicesCannotBeUsedInForumChannels"] = 220004] = "WebhookServicesCannotBeUsedInForumChannels";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MessageBlockedByHarmfulLinksFilter"] = 240000] = "MessageBlockedByHarmfulLinksFilter";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEnableOnboardingRequirementsAreNotMet"] = 350000] = "CannotEnableOnboardingRequirementsAreNotMet";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotUpdateOnboardingWhileBelowRequirements"] = 350001] = "CannotUpdateOnboardingWhileBelowRequirements";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FailedToBanUsers"] = 500000] = "FailedToBanUsers";
    RESTJSONErrorCodes[RESTJSONErrorCodes["PollVotingBlocked"] = 520000] = "PollVotingBlocked";
    RESTJSONErrorCodes[RESTJSONErrorCodes["PollExpired"] = 520001] = "PollExpired";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidChannelTypeForPollCreation"] = 520002] = "InvalidChannelTypeForPollCreation";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEditAPollMessage"] = 520003] = "CannotEditAPollMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotUseAnEmojiIncludedWithThePoll"] = 520004] = "CannotUseAnEmojiIncludedWithThePoll";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExpireANonPollMessage"] = 520006] = "CannotExpireANonPollMessage";
})(RESTJSONErrorCodes$1 || (common$1.RESTJSONErrorCodes = RESTJSONErrorCodes$1 = {}));
/**
 * https://discord.com/developers/docs/reference#locales
 */
var Locale$1;
(function (Locale) {
    Locale["Indonesian"] = "id";
    Locale["EnglishUS"] = "en-US";
    Locale["EnglishGB"] = "en-GB";
    Locale["Bulgarian"] = "bg";
    Locale["ChineseCN"] = "zh-CN";
    Locale["ChineseTW"] = "zh-TW";
    Locale["Croatian"] = "hr";
    Locale["Czech"] = "cs";
    Locale["Danish"] = "da";
    Locale["Dutch"] = "nl";
    Locale["Finnish"] = "fi";
    Locale["French"] = "fr";
    Locale["German"] = "de";
    Locale["Greek"] = "el";
    Locale["Hindi"] = "hi";
    Locale["Hungarian"] = "hu";
    Locale["Italian"] = "it";
    Locale["Japanese"] = "ja";
    Locale["Korean"] = "ko";
    Locale["Lithuanian"] = "lt";
    Locale["Norwegian"] = "no";
    Locale["Polish"] = "pl";
    Locale["PortugueseBR"] = "pt-BR";
    Locale["Romanian"] = "ro";
    Locale["Russian"] = "ru";
    Locale["SpanishES"] = "es-ES";
    Locale["SpanishLATAM"] = "es-419";
    Locale["Swedish"] = "sv-SE";
    Locale["Thai"] = "th";
    Locale["Turkish"] = "tr";
    Locale["Ukrainian"] = "uk";
    Locale["Vietnamese"] = "vi";
})(Locale$1 || (common$1.Locale = Locale$1 = {}));

var application = {};

Object.defineProperty(application, "__esModule", { value: true });

var auditLog = {};

Object.defineProperty(auditLog, "__esModule", { value: true });

var autoModeration = {};

Object.defineProperty(autoModeration, "__esModule", { value: true });

var channel = {};

Object.defineProperty(channel, "__esModule", { value: true });
channel.ReactionType = void 0;
/**
 * https://discord.com/developers/docs/resources/channel#get-reactions-reaction-types
 */
var ReactionType$1;
(function (ReactionType) {
    ReactionType[ReactionType["Normal"] = 0] = "Normal";
    ReactionType[ReactionType["Super"] = 1] = "Super";
})(ReactionType$1 || (channel.ReactionType = ReactionType$1 = {}));

var emoji = {};

Object.defineProperty(emoji, "__esModule", { value: true });

var gateway = {};

Object.defineProperty(gateway, "__esModule", { value: true });

var guild = {};

Object.defineProperty(guild, "__esModule", { value: true });

var guildScheduledEvent = {};

Object.defineProperty(guildScheduledEvent, "__esModule", { value: true });

var interactions = {};

Object.defineProperty(interactions, "__esModule", { value: true });

var invite = {};

Object.defineProperty(invite, "__esModule", { value: true });

var oauth2 = {};

Object.defineProperty(oauth2, "__esModule", { value: true });

var poll = {};

Object.defineProperty(poll, "__esModule", { value: true });

var stageInstance = {};

Object.defineProperty(stageInstance, "__esModule", { value: true });

var sticker = {};

Object.defineProperty(sticker, "__esModule", { value: true });

var template = {};

Object.defineProperty(template, "__esModule", { value: true });

var user = {};

Object.defineProperty(user, "__esModule", { value: true });

var voice = {};

Object.defineProperty(voice, "__esModule", { value: true });

var webhook = {};

Object.defineProperty(webhook, "__esModule", { value: true });

var monetization = {};

Object.defineProperty(monetization, "__esModule", { value: true });
monetization.EntitlementOwnerType = void 0;
/**
 * https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement
 */
var EntitlementOwnerType$1;
(function (EntitlementOwnerType) {
    EntitlementOwnerType[EntitlementOwnerType["Guild"] = 1] = "Guild";
    EntitlementOwnerType[EntitlementOwnerType["User"] = 2] = "User";
})(EntitlementOwnerType$1 || (monetization.EntitlementOwnerType = EntitlementOwnerType$1 = {}));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OAuth2Routes = exports.RouteBases = exports.CDNRoutes = exports.ImageFormat = exports.StickerPackApplicationId = exports.Routes = exports.APIVersion = void 0;
	__exportStar(common$1, exports);
	__exportStar(application, exports);
	__exportStar(auditLog, exports);
	__exportStar(autoModeration, exports);
	__exportStar(channel, exports);
	__exportStar(emoji, exports);
	__exportStar(gateway, exports);
	__exportStar(guild, exports);
	__exportStar(guildScheduledEvent, exports);
	__exportStar(interactions, exports);
	__exportStar(invite, exports);
	__exportStar(oauth2, exports);
	__exportStar(poll, exports);
	__exportStar(stageInstance, exports);
	__exportStar(sticker, exports);
	__exportStar(template, exports);
	__exportStar(user, exports);
	__exportStar(voice, exports);
	__exportStar(webhook, exports);
	__exportStar(monetization, exports);
	exports.APIVersion = '10';
	exports.Routes = {
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/role-connections/metadata`
	     * - PUT `/applications/{application.id}/role-connections/metadata`
	     */
	    applicationRoleConnectionMetadata(applicationId) {
	        return `/applications/${applicationId}/role-connections/metadata`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/auto-moderation/rules`
	     * - POST `/guilds/{guild.id}/auto-moderation/rules`
	     */
	    guildAutoModerationRules(guildId) {
	        return `/guilds/${guildId}/auto-moderation/rules`;
	    },
	    /**
	     * Routes for:
	     * - GET    `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
	     * - PATCH  `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
	     * - DELETE `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
	     */
	    guildAutoModerationRule(guildId, ruleId) {
	        return `/guilds/${guildId}/auto-moderation/rules/${ruleId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/audit-logs`
	     */
	    guildAuditLog(guildId) {
	        return `/guilds/${guildId}/audit-logs`;
	    },
	    /**
	     * Route for:
	     * - GET    `/channels/{channel.id}`
	     * - PATCH  `/channels/{channel.id}`
	     * - DELETE `/channels/{channel.id}`
	     */
	    channel(channelId) {
	        return `/channels/${channelId}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/channels/{channel.id}/messages`
	     * - POST `/channels/{channel.id}/messages`
	     */
	    channelMessages(channelId) {
	        return `/channels/${channelId}/messages`;
	    },
	    /**
	     * Route for:
	     * - GET    `/channels/{channel.id}/messages/{message.id}`
	     * - PATCH  `/channels/{channel.id}/messages/{message.id}`
	     * - DELETE `/channels/{channel.id}/messages/{message.id}`
	     */
	    channelMessage(channelId, messageId) {
	        return `/channels/${channelId}/messages/${messageId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/messages/{message.id}/crosspost`
	     */
	    channelMessageCrosspost(channelId, messageId) {
	        return `/channels/${channelId}/messages/${messageId}/crosspost`;
	    },
	    /**
	     * Route for:
	     * - PUT    `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
	     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
	     *
	     * **Note**: You need to URL encode the emoji yourself
	     */
	    channelMessageOwnReaction(channelId, messageId, emoji) {
	        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`;
	    },
	    /**
	     * Route for:
	     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/{user.id}`
	     *
	     * **Note**: You need to URL encode the emoji yourself
	     */
	    channelMessageUserReaction(channelId, messageId, emoji, userId) {
	        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}`;
	    },
	    /**
	     * Route for:
	     * - GET    `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
	     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
	     *
	     * **Note**: You need to URL encode the emoji yourself
	     */
	    channelMessageReaction(channelId, messageId, emoji) {
	        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}`;
	    },
	    /**
	     * Route for:
	     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions`
	     */
	    channelMessageAllReactions(channelId, messageId) {
	        return `/channels/${channelId}/messages/${messageId}/reactions`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/messages/bulk-delete`
	     */
	    channelBulkDelete(channelId) {
	        return `/channels/${channelId}/messages/bulk-delete`;
	    },
	    /**
	     * Route for:
	     * - PUT    `/channels/{channel.id}/permissions/{overwrite.id}`
	     * - DELETE `/channels/{channel.id}/permissions/{overwrite.id}`
	     */
	    channelPermission(channelId, overwriteId) {
	        return `/channels/${channelId}/permissions/${overwriteId}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/channels/{channel.id}/invites`
	     * - POST `/channels/{channel.id}/invites`
	     */
	    channelInvites(channelId) {
	        return `/channels/${channelId}/invites`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/followers`
	     */
	    channelFollowers(channelId) {
	        return `/channels/${channelId}/followers`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/typing`
	     */
	    channelTyping(channelId) {
	        return `/channels/${channelId}/typing`;
	    },
	    /**
	     * Route for:
	     * - GET `/channels/{channel.id}/pins`
	     */
	    channelPins(channelId) {
	        return `/channels/${channelId}/pins`;
	    },
	    /**
	     * Route for:
	     * - PUT    `/channels/{channel.id}/pins/{message.id}`
	     * - DELETE `/channels/{channel.id}/pins/{message.id}`
	     */
	    channelPin(channelId, messageId) {
	        return `/channels/${channelId}/pins/${messageId}`;
	    },
	    /**
	     * Route for:
	     * - PUT    `/channels/{channel.id}/recipients/{user.id}`
	     * - DELETE `/channels/{channel.id}/recipients/{user.id}`
	     */
	    channelRecipient(channelId, userId) {
	        return `/channels/${channelId}/recipients/${userId}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/emojis`
	     * - POST `/guilds/{guild.id}/emojis`
	     */
	    guildEmojis(guildId) {
	        return `/guilds/${guildId}/emojis`;
	    },
	    /**
	     * Route for:
	     * - GET    `/guilds/{guild.id}/emojis/{emoji.id}`
	     * - PATCH  `/guilds/{guild.id}/emojis/{emoji.id}`
	     * - DELETE `/guilds/{guild.id}/emojis/{emoji.id}`
	     */
	    guildEmoji(guildId, emojiId) {
	        return `/guilds/${guildId}/emojis/${emojiId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/guilds`
	     */
	    guilds() {
	        return '/guilds';
	    },
	    /**
	     * Route for:
	     * - GET    `/guilds/{guild.id}`
	     * - PATCH  `/guilds/{guild.id}`
	     * - DELETE `/guilds/{guild.id}`
	     */
	    guild(guildId) {
	        return `/guilds/${guildId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/preview`
	     */
	    guildPreview(guildId) {
	        return `/guilds/${guildId}/preview`;
	    },
	    /**
	     * Route for:
	     * - GET   `/guilds/{guild.id}/channels`
	     * - POST  `/guilds/{guild.id}/channels`
	     * - PATCH `/guilds/{guild.id}/channels`
	     */
	    guildChannels(guildId) {
	        return `/guilds/${guildId}/channels`;
	    },
	    /**
	     * Route for:
	     * - GET    `/guilds/{guild.id}/members/{user.id}`
	     * - PUT    `/guilds/{guild.id}/members/{user.id}`
	     * - PATCH  `/guilds/{guild.id}/members/@me`
	     * - PATCH  `/guilds/{guild.id}/members/{user.id}`
	     * - DELETE `/guilds/{guild.id}/members/{user.id}`
	     */
	    guildMember(guildId, userId = '@me') {
	        return `/guilds/${guildId}/members/${userId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/members`
	     */
	    guildMembers(guildId) {
	        return `/guilds/${guildId}/members`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/members/search`
	     */
	    guildMembersSearch(guildId) {
	        return `/guilds/${guildId}/members/search`;
	    },
	    /**
	     * Route for:
	     * - PATCH `/guilds/{guild.id}/members/@me/nick`
	     *
	     * @deprecated Use {@link Routes.guildMember} instead.
	     */
	    guildCurrentMemberNickname(guildId) {
	        return `/guilds/${guildId}/members/@me/nick`;
	    },
	    /**
	     * Route for:
	     * - PUT    `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
	     * - DELETE `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
	     */
	    guildMemberRole(guildId, memberId, roleId) {
	        return `/guilds/${guildId}/members/${memberId}/roles/${roleId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/guilds/{guild.id}/mfa`
	     */
	    guildMFA(guildId) {
	        return `/guilds/${guildId}/mfa`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/bans`
	     */
	    guildBans(guildId) {
	        return `/guilds/${guildId}/bans`;
	    },
	    /**
	     * Route for:
	     * - GET    `/guilds/{guild.id}/bans/{user.id}`
	     * - PUT    `/guilds/{guild.id}/bans/{user.id}`
	     * - DELETE `/guilds/{guild.id}/bans/{user.id}`
	     */
	    guildBan(guildId, userId) {
	        return `/guilds/${guildId}/bans/${userId}`;
	    },
	    /**
	     * Route for:
	     * - GET   `/guilds/{guild.id}/roles`
	     * - POST  `/guilds/{guild.id}/roles`
	     * - PATCH `/guilds/{guild.id}/roles`
	     */
	    guildRoles(guildId) {
	        return `/guilds/${guildId}/roles`;
	    },
	    /**
	     * Route for:
	     * - GET    `/guilds/{guild.id}/roles/{role.id}`
	     * - PATCH  `/guilds/{guild.id}/roles/{role.id}`
	     * - DELETE `/guilds/{guild.id}/roles/{role.id}`
	     */
	    guildRole(guildId, roleId) {
	        return `/guilds/${guildId}/roles/${roleId}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/prune`
	     * - POST `/guilds/{guild.id}/prune`
	     */
	    guildPrune(guildId) {
	        return `/guilds/${guildId}/prune`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/regions`
	     */
	    guildVoiceRegions(guildId) {
	        return `/guilds/${guildId}/regions`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/invites`
	     */
	    guildInvites(guildId) {
	        return `/guilds/${guildId}/invites`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/integrations`
	     */
	    guildIntegrations(guildId) {
	        return `/guilds/${guildId}/integrations`;
	    },
	    /**
	     * Route for:
	     * - DELETE `/guilds/{guild.id}/integrations/{integration.id}`
	     */
	    guildIntegration(guildId, integrationId) {
	        return `/guilds/${guildId}/integrations/${integrationId}`;
	    },
	    /**
	     * Route for:
	     * - GET   `/guilds/{guild.id}/widget`
	     * - PATCH `/guilds/{guild.id}/widget`
	     */
	    guildWidgetSettings(guildId) {
	        return `/guilds/${guildId}/widget`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/widget.json`
	     */
	    guildWidgetJSON(guildId) {
	        return `/guilds/${guildId}/widget.json`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/vanity-url`
	     */
	    guildVanityUrl(guildId) {
	        return `/guilds/${guildId}/vanity-url`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/widget.png`
	     */
	    guildWidgetImage(guildId) {
	        return `/guilds/${guildId}/widget.png`;
	    },
	    /**
	     * Route for:
	     * - GET    `/invites/{invite.code}`
	     * - DELETE `/invites/{invite.code}`
	     */
	    invite(code) {
	        return `/invites/${code}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/templates/{template.code}`
	     * - POST `/guilds/templates/{template.code}`
	     */
	    template(code) {
	        return `/guilds/templates/${code}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/templates`
	     * - POST `/guilds/{guild.id}/templates`
	     */
	    guildTemplates(guildId) {
	        return `/guilds/${guildId}/templates`;
	    },
	    /**
	     * Route for:
	     * - PUT    `/guilds/{guild.id}/templates/{template.code}`
	     * - PATCH  `/guilds/{guild.id}/templates/{template.code}`
	     * - DELETE `/guilds/{guild.id}/templates/{template.code}`
	     */
	    guildTemplate(guildId, code) {
	        return `/guilds/${guildId}/templates/${code}`;
	    },
	    /**
	     * Route for:
	     * - GET `/channels/{channel.id}/polls/{message.id}/answers/{answer_id}`
	     */
	    pollAnswerVoters(channelId, messageId, answerId) {
	        return `/channels/${channelId}/polls/${messageId}/answers/${answerId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/polls/{message.id}/expire`
	     */
	    expirePoll(channelId, messageId) {
	        return `/channels/${channelId}/polls/${messageId}/expire`;
	    },
	    /**
	     * Route for:
	     * - POST `/channels/{channel.id}/threads`
	     * - POST `/channels/{channel.id}/messages/{message.id}/threads`
	     */
	    threads(parentId, messageId) {
	        const parts = ['', 'channels', parentId];
	        if (messageId)
	            parts.push('messages', messageId);
	        parts.push('threads');
	        return parts.join('/');
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/threads/active`
	     */
	    guildActiveThreads(guildId) {
	        return `/guilds/${guildId}/threads/active`;
	    },
	    /**
	     * Route for:
	     * - GET `/channels/{channel.id}/threads/archived/public`
	     * - GET `/channels/{channel.id}/threads/archived/private`
	     */
	    channelThreads(channelId, archivedStatus) {
	        return `/channels/${channelId}/threads/archived/${archivedStatus}`;
	    },
	    /**
	     * Route for:
	     * - GET `/channels/{channel.id}/users/@me/threads/archived/private`
	     */
	    channelJoinedArchivedThreads(channelId) {
	        return `/channels/${channelId}/users/@me/threads/archived/private`;
	    },
	    /**
	     * Route for:
	     * - GET    `/channels/{thread.id}/thread-members`
	     * - GET    `/channels/{thread.id}/thread-members/{user.id}`
	     * - PUT    `/channels/{thread.id}/thread-members/@me`
	     * - PUT    `/channels/{thread.id}/thread-members/{user.id}`
	     * - DELETE `/channels/{thread.id}/thread-members/@me`
	     * - DELETE `/channels/{thread.id}/thread-members/{user.id}`
	     */
	    threadMembers(threadId, userId) {
	        const parts = ['', 'channels', threadId, 'thread-members'];
	        if (userId)
	            parts.push(userId);
	        return parts.join('/');
	    },
	    /**
	     * Route for:
	     * - GET   `/users/@me`
	     * - GET   `/users/{user.id}`
	     * - PATCH `/users/@me`
	     *
	     * @param [userId] The user ID, defaulted to `@me`
	     */
	    user(userId = '@me') {
	        return `/users/${userId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/users/@me/applications/{application.id}/role-connection`
	     * - PUT `/users/@me/applications/{application.id}/role-connection`
	     */
	    userApplicationRoleConnection(applicationId) {
	        return `/users/@me/applications/${applicationId}/role-connection`;
	    },
	    /**
	     * Route for:
	     * - GET `/users/@me/guilds`
	     */
	    userGuilds() {
	        return `/users/@me/guilds`;
	    },
	    /**
	     * Route for:
	     * - GET `/users/@me/guilds/{guild.id}/member`
	     */
	    userGuildMember(guildId) {
	        return `/users/@me/guilds/${guildId}/member`;
	    },
	    /**
	     * Route for:
	     * - DELETE `/users/@me/guilds/{guild.id}`
	     */
	    userGuild(guildId) {
	        return `/users/@me/guilds/${guildId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/users/@me/channels`
	     */
	    userChannels() {
	        return `/users/@me/channels`;
	    },
	    /**
	     * Route for:
	     * - GET `/users/@me/connections`
	     */
	    userConnections() {
	        return `/users/@me/connections`;
	    },
	    /**
	     * Route for:
	     * - GET `/voice/regions`
	     */
	    voiceRegions() {
	        return `/voice/regions`;
	    },
	    /**
	     * Route for:
	     * - GET  `/channels/{channel.id}/webhooks`
	     * - POST `/channels/{channel.id}/webhooks`
	     */
	    channelWebhooks(channelId) {
	        return `/channels/${channelId}/webhooks`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/webhooks`
	     */
	    guildWebhooks(guildId) {
	        return `/guilds/${guildId}/webhooks`;
	    },
	    /**
	     * Route for:
	     * - GET    `/webhooks/{webhook.id}`
	     * - GET    `/webhooks/{webhook.id}/{webhook.token}`
	     * - PATCH  `/webhooks/{webhook.id}`
	     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}`
	     * - DELETE `/webhooks/{webhook.id}`
	     * - DELETE `/webhooks/{webhook.id}/{webhook.token}`
	     * - POST   `/webhooks/{webhook.id}/{webhook.token}`
	     *
	     * - POST   `/webhooks/{application.id}/{interaction.token}`
	     */
	    webhook(webhookId, webhookToken) {
	        const parts = ['', 'webhooks', webhookId];
	        if (webhookToken)
	            parts.push(webhookToken);
	        return parts.join('/');
	    },
	    /**
	     * Route for:
	     * - GET    `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
	     * - GET    `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
	     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
	     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
	     * - DELETE `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
	     * - DELETE `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
	     *
	     * - PATCH  `/webhooks/{application.id}/{interaction.token}/messages/@original`
	     * - PATCH  `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
	     * - DELETE `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
	     */
	    webhookMessage(webhookId, webhookToken, messageId = '@original') {
	        return `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/webhooks/{webhook.id}/{webhook.token}/github`
	     * - POST `/webhooks/{webhook.id}/{webhook.token}/slack`
	     */
	    webhookPlatform(webhookId, webhookToken, platform) {
	        return `/webhooks/${webhookId}/${webhookToken}/${platform}`;
	    },
	    /**
	     * Route for:
	     * - GET `/gateway`
	     */
	    gateway() {
	        return `/gateway`;
	    },
	    /**
	     * Route for:
	     * - GET `/gateway/bot`
	     */
	    gatewayBot() {
	        return `/gateway/bot`;
	    },
	    /**
	     * Route for:
	     * - GET `/oauth2/applications/@me`
	     */
	    oauth2CurrentApplication() {
	        return `/oauth2/applications/@me`;
	    },
	    /**
	     * Route for:
	     * - GET `/oauth2/@me`
	     */
	    oauth2CurrentAuthorization() {
	        return `/oauth2/@me`;
	    },
	    /**
	     * Route for:
	     * - GET `/oauth2/authorize`
	     */
	    oauth2Authorization() {
	        return `/oauth2/authorize`;
	    },
	    /**
	     * Route for:
	     * - POST `/oauth2/token`
	     */
	    oauth2TokenExchange() {
	        return `/oauth2/token`;
	    },
	    /**
	     * Route for:
	     * - POST `/oauth2/token/revoke`
	     */
	    oauth2TokenRevocation() {
	        return `/oauth2/token/revoke`;
	    },
	    /**
	     * Route for:
	     * - GET  `/applications/{application.id}/commands`
	     * - PUT  `/applications/{application.id}/commands`
	     * - POST `/applications/{application.id}/commands`
	     */
	    applicationCommands(applicationId) {
	        return `/applications/${applicationId}/commands`;
	    },
	    /**
	     * Route for:
	     * - GET    `/applications/{application.id}/commands/{command.id}`
	     * - PATCH  `/applications/{application.id}/commands/{command.id}`
	     * - DELETE `/applications/{application.id}/commands/{command.id}`
	     */
	    applicationCommand(applicationId, commandId) {
	        return `/applications/${applicationId}/commands/${commandId}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/applications/{application.id}/guilds/{guild.id}/commands`
	     * - PUT  `/applications/{application.id}/guilds/{guild.id}/commands`
	     * - POST `/applications/{application.id}/guilds/{guild.id}/commands`
	     */
	    applicationGuildCommands(applicationId, guildId) {
	        return `/applications/${applicationId}/guilds/${guildId}/commands`;
	    },
	    /**
	     * Route for:
	     * - GET    `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
	     * - PATCH  `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
	     * - DELETE `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
	     */
	    applicationGuildCommand(applicationId, guildId, commandId) {
	        return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`;
	    },
	    /**
	     * Route for:
	     * - POST `/interactions/{interaction.id}/{interaction.token}/callback`
	     */
	    interactionCallback(interactionId, interactionToken) {
	        return `/interactions/${interactionId}/${interactionToken}/callback`;
	    },
	    /**
	     * Route for:
	     * - GET   `/guilds/{guild.id}/member-verification`
	     * - PATCH `/guilds/{guild.id}/member-verification`
	     */
	    guildMemberVerification(guildId) {
	        return `/guilds/${guildId}/member-verification`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/voice-states/@me`
	     * - GET `/guilds/{guild.id}/voice-states/{user.id}`
	     * - PATCH `/guilds/{guild.id}/voice-states/@me`
	     * - PATCH `/guilds/{guild.id}/voice-states/{user.id}`
	     */
	    guildVoiceState(guildId, userId = '@me') {
	        return `/guilds/${guildId}/voice-states/${userId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
	     * - PUT `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
	     */
	    guildApplicationCommandsPermissions(applicationId, guildId) {
	        return `/applications/${applicationId}/guilds/${guildId}/commands/permissions`;
	    },
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
	     * - PUT `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
	     */
	    applicationCommandPermissions(applicationId, guildId, commandId) {
	        return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`;
	    },
	    /**
	     * Route for:
	     * - GET   `/guilds/{guild.id}/welcome-screen`
	     * - PATCH `/guilds/{guild.id}/welcome-screen`
	     */
	    guildWelcomeScreen(guildId) {
	        return `/guilds/${guildId}/welcome-screen`;
	    },
	    /**
	     * Route for:
	     * - POST `/stage-instances`
	     */
	    stageInstances() {
	        return `/stage-instances`;
	    },
	    /**
	     * Route for:
	     * - GET `/stage-instances/{channel.id}`
	     * - PATCH `/stage-instances/{channel.id}`
	     * - DELETE `/stage-instances/{channel.id}`
	     */
	    stageInstance(channelId) {
	        return `/stage-instances/${channelId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/stickers/{sticker.id}`
	     */
	    sticker(stickerId) {
	        return `/stickers/${stickerId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/sticker-packs`
	     */
	    stickerPacks() {
	        return '/sticker-packs';
	    },
	    /**
	     * Route for:
	     * - GET `/sticker-packs/{pack.id}`
	     */
	    stickerPack(packId) {
	        return `/sticker-packs/${packId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/sticker-packs`
	     *
	     * @deprecated Use {@link Routes.stickerPacks} instead.
	     */
	    nitroStickerPacks() {
	        return '/sticker-packs';
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/stickers`
	     * - POST `/guilds/{guild.id}/stickers`
	     */
	    guildStickers(guildId) {
	        return `/guilds/${guildId}/stickers`;
	    },
	    /**
	     * Route for:
	     * - GET    `/guilds/{guild.id}/stickers/{sticker.id}`
	     * - PATCH  `/guilds/{guild.id}/stickers/{sticker.id}`
	     * - DELETE `/guilds/{guild.id}/stickers/{sticker.id}`
	     */
	    guildSticker(guildId, stickerId) {
	        return `/guilds/${guildId}/stickers/${stickerId}`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/scheduled-events`
	     * - POST `/guilds/{guild.id}/scheduled-events`
	     */
	    guildScheduledEvents(guildId) {
	        return `/guilds/${guildId}/scheduled-events`;
	    },
	    /**
	     * Route for:
	     * - GET  `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
	     * - PATCH `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
	     * - DELETE `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
	     */
	    guildScheduledEvent(guildId, guildScheduledEventId) {
	        return `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}/users`
	     */
	    guildScheduledEventUsers(guildId, guildScheduledEventId) {
	        return `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}/users`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/onboarding`
	     * - PUT `/guilds/{guild.id}/onboarding`
	     */
	    guildOnboarding(guildId) {
	        return `/guilds/${guildId}/onboarding`;
	    },
	    /**
	     * Route for:
	     * - GET `/applications/@me`
	     * - PATCH `/applications/@me`
	     */
	    currentApplication() {
	        return '/applications/@me';
	    },
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/entitlements`
	     * - POST `/applications/{application.id}/entitlements`
	     */
	    entitlements(applicationId) {
	        return `/applications/${applicationId}/entitlements`;
	    },
	    /**
	     * Route for:
	     * - DELETE `/applications/{application.id}/entitlements/{entitlement.id}`
	     */
	    entitlement(applicationId, entitlementId) {
	        return `/applications/${applicationId}/entitlements/${entitlementId}`;
	    },
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/skus`
	     */
	    skus(applicationId) {
	        return `/applications/${applicationId}/skus`;
	    },
	    /**
	     * Route for:
	     * - POST `/guilds/{guild.id}/bulk-ban`
	     */
	    guildBulkBan(guildId) {
	        return `/guilds/${guildId}/bulk-ban`;
	    },
	    /**
	     * Route for:
	     * - POST `/applications/{application.id}/entitlements/{entitlement.id}/consume`
	     */
	    consumeEntitlement(applicationId, entitlementId) {
	        return `/applications/${applicationId}/entitlements/${entitlementId}/consume`;
	    },
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/emojis`
	     * - POST `/applications/{application.id}/emojis`
	     */
	    applicationEmojis(applicationId) {
	        return `/applications/${applicationId}/emojis`;
	    },
	    /**
	     * Route for:
	     * - GET `/applications/{application.id}/emojis/{emoji.id}`
	     * - PATCH `/applications/{application.id}/emojis/{emoji.id}`
	     * - DELETE `/applications/{application.id}/emojis/{emoji.id}`
	     */
	    applicationEmoji(applicationId, emojiId) {
	        return `/applications/${applicationId}/emojis/${emojiId}`;
	    },
	};
	exports.StickerPackApplicationId = '710982414301790216';
	var ImageFormat;
	(function (ImageFormat) {
	    ImageFormat["JPEG"] = "jpeg";
	    ImageFormat["PNG"] = "png";
	    ImageFormat["WebP"] = "webp";
	    ImageFormat["GIF"] = "gif";
	    ImageFormat["Lottie"] = "json";
	})(ImageFormat || (exports.ImageFormat = ImageFormat = {}));
	exports.CDNRoutes = {
	    /**
	     * Route for:
	     * - GET `/emojis/{emoji.id}.{png|jpeg|webp|gif}`
	     *
	     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    emoji(emojiId, format) {
	        return `/emojis/${emojiId}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/icons/{guild.id}/{guild.icon}.{png|jpeg|webp|gif}`
	     *
	     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    guildIcon(guildId, guildIcon, format) {
	        return `/icons/${guildId}/${guildIcon}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/splashes/{guild.id}/{guild.splash}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    guildSplash(guildId, guildSplash, format) {
	        return `/splashes/${guildId}/${guildSplash}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/discovery-splashes/{guild.id}/{guild.discovery_splash}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    guildDiscoverySplash(guildId, guildDiscoverySplash, format) {
	        return `/discovery-splashes/${guildId}/${guildDiscoverySplash}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/banners/{guild.id}/{guild.banner}.{png|jpeg|webp|gif}`
	     *
	     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    guildBanner(guildId, guildBanner, format) {
	        return `/banners/${guildId}/${guildBanner}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/banners/{user.id}/{user.banner}.{png|jpeg|webp|gif}`
	     *
	     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    userBanner(userId, userBanner, format) {
	        return `/banners/${userId}/${userBanner}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/embed/avatars/{index}.png`
	     *
	     * The value for `index` parameter depends on whether the user is [migrated to the new username system](https://discord.com/developers/docs/change-log#unique-usernames-on-discord).
	     * For users on the new username system, `index` will be `(user.id >> 22) % 6`.
	     * For users on the legacy username system, `index` will be `user.discriminator % 5`.
	     *
	     * This route supports the extension: PNG
	     */
	    defaultUserAvatar(index) {
	        return `/embed/avatars/${index}.png`;
	    },
	    /**
	     * Route for:
	     * - GET `/avatars/{user.id}/{user.avatar}.{png|jpeg|webp|gif}`
	     *
	     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    userAvatar(userId, userAvatar, format) {
	        return `/avatars/${userId}/${userAvatar}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/{guild.id}/users/{user.id}/avatars/{guild_member.avatar}.{png|jpeg|webp|gif}`
	     *
	     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    guildMemberAvatar(guildId, userId, memberAvatar, format) {
	        return `/guilds/${guildId}/users/${userId}/avatars/${memberAvatar}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/avatar-decorations/{user.id}/{user.avatar_decoration}.png`
	     *
	     * This route supports the extension: PNG
	     *
	     * @deprecated Use {@link CDNRoutes.avatarDecoration} instead.
	     */
	    userAvatarDecoration(userId, userAvatarDecoration) {
	        return `/avatar-decorations/${userId}/${userAvatarDecoration}.png`;
	    },
	    /**
	     * Route for:
	     * - GET `/avatar-decoration-presets/{avatar_decoration_data_asset}.png`
	     *
	     * This route supports the extension: PNG
	     */
	    avatarDecoration(avatarDecorationDataAsset) {
	        return `/avatar-decoration-presets/${avatarDecorationDataAsset}.png`;
	    },
	    /**
	     * Route for:
	     * - GET `/app-icons/{application.id}/{application.icon}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    applicationIcon(applicationId, applicationIcon, format) {
	        return `/app-icons/${applicationId}/${applicationIcon}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/app-icons/{application.id}/{application.cover_image}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    applicationCover(applicationId, applicationCoverImage, format) {
	        return `/app-icons/${applicationId}/${applicationCoverImage}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/app-assets/{application.id}/{application.asset_id}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    applicationAsset(applicationId, applicationAssetId, format) {
	        return `/app-assets/${applicationId}/${applicationAssetId}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/app-assets/{application.id}/achievements/{achievement.id}/icons/{achievement.icon}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    achievementIcon(applicationId, achievementId, achievementIconHash, format) {
	        return `/app-assets/${applicationId}/achievements/${achievementId}/icons/${achievementIconHash}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/app-assets/710982414301790216/store/{sticker_pack.banner.asset_id}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    stickerPackBanner(stickerPackBannerAssetId, format) {
	        return `/app-assets/${exports.StickerPackApplicationId}/store/${stickerPackBannerAssetId}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/app-assets/${application.id}/store/${asset.id}.{png|jpeg|webp}}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    storePageAsset(applicationId, assetId, format = ImageFormat.PNG) {
	        return `/app-assets/${applicationId}/store/${assetId}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/team-icons/{team.id}/{team.icon}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    teamIcon(teamId, teamIcon, format) {
	        return `/team-icons/${teamId}/${teamIcon}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/stickers/{sticker.id}.{png|json}`
	     *
	     * This route supports the extensions: PNG, Lottie, GIF
	     */
	    sticker(stickerId, format) {
	        return `/stickers/${stickerId}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/role-icons/{role.id}/{role.icon}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    roleIcon(roleId, roleIcon, format) {
	        return `/role-icons/${roleId}/${roleIcon}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guild-events/{guild_scheduled_event.id}/{guild_scheduled_event.image}.{png|jpeg|webp}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP
	     */
	    guildScheduledEventCover(guildScheduledEventId, guildScheduledEventCoverImage, format) {
	        return `/guild-events/${guildScheduledEventId}/${guildScheduledEventCoverImage}.${format}`;
	    },
	    /**
	     * Route for:
	     * - GET `/guilds/${guild.id}/users/${user.id}/banners/${guild_member.banner}.{png|jpeg|webp|gif}`
	     *
	     * This route supports the extensions: PNG, JPEG, WebP, GIF
	     */
	    guildMemberBanner(guildId, userId, guildMemberBanner, format) {
	        return `/guilds/${guildId}/users/${userId}/banners/${guildMemberBanner}.${format}`;
	    },
	};
	exports.RouteBases = {
	    api: `https://discord.com/api/v${exports.APIVersion}`,
	    cdn: 'https://cdn.discordapp.com',
	    media: 'https://media.discordapp.net',
	    invite: 'https://discord.gg',
	    template: 'https://discord.new',
	    gift: 'https://discord.gift',
	    scheduledEvent: 'https://discord.com/events',
	};
	// Freeze bases object
	Object.freeze(exports.RouteBases);
	exports.OAuth2Routes = {
	    authorizationURL: `${exports.RouteBases.api}${exports.Routes.oauth2Authorization()}`,
	    tokenURL: `${exports.RouteBases.api}${exports.Routes.oauth2TokenExchange()}`,
	    /**
	     * See https://tools.ietf.org/html/rfc7009
	     */
	    tokenRevocationURL: `${exports.RouteBases.api}${exports.Routes.oauth2TokenRevocation()}`,
	};
	// Freeze OAuth2 route object
	Object.freeze(exports.OAuth2Routes);
	
} (v10$5));

var mod$1 = /*@__PURE__*/getDefaultExportFromCjs(v10$5);

const APIVersion = mod$1.APIVersion;
const CDNRoutes = mod$1.CDNRoutes;
const EntitlementOwnerType = mod$1.EntitlementOwnerType;
const ImageFormat = mod$1.ImageFormat;
const Locale = mod$1.Locale;
const OAuth2Routes = mod$1.OAuth2Routes;
const RESTJSONErrorCodes = mod$1.RESTJSONErrorCodes;
const ReactionType = mod$1.ReactionType;
const RouteBases = mod$1.RouteBases;
const Routes = mod$1.Routes;
const StickerPackApplicationId = mod$1.StickerPackApplicationId;

var v10$4 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	APIVersion: APIVersion,
	CDNRoutes: CDNRoutes,
	EntitlementOwnerType: EntitlementOwnerType,
	ImageFormat: ImageFormat,
	Locale: Locale,
	OAuth2Routes: OAuth2Routes,
	RESTJSONErrorCodes: RESTJSONErrorCodes,
	ReactionType: ReactionType,
	RouteBases: RouteBases,
	Routes: Routes,
	StickerPackApplicationId: StickerPackApplicationId,
	default: mod$1
});

var require$$3 = /*@__PURE__*/getAugmentedNamespace(v10$4);

var v10$3 = {};

var common = {};

Object.defineProperty(common, "__esModule", { value: true });
common.RPCCloseEventCodes = common.RPCErrorCodes = void 0;
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-error-codes
 */
var RPCErrorCodes$1;
(function (RPCErrorCodes) {
    RPCErrorCodes[RPCErrorCodes["UnknownError"] = 1000] = "UnknownError";
    RPCErrorCodes[RPCErrorCodes["InvalidPayload"] = 4000] = "InvalidPayload";
    RPCErrorCodes[RPCErrorCodes["InvalidCommand"] = 4002] = "InvalidCommand";
    RPCErrorCodes[RPCErrorCodes["InvalidGuild"] = 4003] = "InvalidGuild";
    RPCErrorCodes[RPCErrorCodes["InvalidEvent"] = 4004] = "InvalidEvent";
    RPCErrorCodes[RPCErrorCodes["InvalidChannel"] = 4005] = "InvalidChannel";
    RPCErrorCodes[RPCErrorCodes["InvalidPermissions"] = 4006] = "InvalidPermissions";
    RPCErrorCodes[RPCErrorCodes["InvalidClientId"] = 4007] = "InvalidClientId";
    RPCErrorCodes[RPCErrorCodes["InvalidOrigin"] = 4008] = "InvalidOrigin";
    RPCErrorCodes[RPCErrorCodes["InvalidToken"] = 4009] = "InvalidToken";
    RPCErrorCodes[RPCErrorCodes["InvalidUser"] = 4010] = "InvalidUser";
    RPCErrorCodes[RPCErrorCodes["OAuth2Error"] = 5000] = "OAuth2Error";
    RPCErrorCodes[RPCErrorCodes["SelectChannelTimedOut"] = 5001] = "SelectChannelTimedOut";
    RPCErrorCodes[RPCErrorCodes["GetGuildTimedOut"] = 5002] = "GetGuildTimedOut";
    RPCErrorCodes[RPCErrorCodes["SelectVoiceForceRequired"] = 5003] = "SelectVoiceForceRequired";
    RPCErrorCodes[RPCErrorCodes["CaptureShortcutAlreadyListening"] = 5004] = "CaptureShortcutAlreadyListening";
})(RPCErrorCodes$1 || (common.RPCErrorCodes = RPCErrorCodes$1 = {}));
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-close-event-codes
 */
var RPCCloseEventCodes$1;
(function (RPCCloseEventCodes) {
    RPCCloseEventCodes[RPCCloseEventCodes["InvalidClientId"] = 4000] = "InvalidClientId";
    RPCCloseEventCodes[RPCCloseEventCodes["InvalidOrigin"] = 4001] = "InvalidOrigin";
    RPCCloseEventCodes[RPCCloseEventCodes["RateLimited"] = 4002] = "RateLimited";
    RPCCloseEventCodes[RPCCloseEventCodes["TokenRevoked"] = 4003] = "TokenRevoked";
    RPCCloseEventCodes[RPCCloseEventCodes["InvalidVersion"] = 4004] = "InvalidVersion";
    RPCCloseEventCodes[RPCCloseEventCodes["InvalidEncoding"] = 4005] = "InvalidEncoding";
})(RPCCloseEventCodes$1 || (common.RPCCloseEventCodes = RPCCloseEventCodes$1 = {}));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(common, exports);
	
} (v10$3));

var mod = /*@__PURE__*/getDefaultExportFromCjs(v10$3);

const RPCCloseEventCodes = mod.RPCCloseEventCodes;
const RPCErrorCodes = mod.RPCErrorCodes;

var v10$2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	RPCCloseEventCodes: RPCCloseEventCodes,
	RPCErrorCodes: RPCErrorCodes,
	default: mod
});

var require$$4 = /*@__PURE__*/getAugmentedNamespace(v10$2);

var v10$1 = {};

Object.defineProperty(v10$1, "__esModule", { value: true });
v10$1.isDMInteraction = isDMInteraction$1;
v10$1.isGuildInteraction = isGuildInteraction$1;
v10$1.isApplicationCommandDMInteraction = isApplicationCommandDMInteraction$1;
v10$1.isApplicationCommandGuildInteraction = isApplicationCommandGuildInteraction$1;
v10$1.isMessageComponentDMInteraction = isMessageComponentDMInteraction$1;
v10$1.isMessageComponentGuildInteraction = isMessageComponentGuildInteraction$1;
v10$1.isLinkButton = isLinkButton$1;
v10$1.isInteractionButton = isInteractionButton$1;
v10$1.isMessageComponentInteraction = isMessageComponentInteraction$1;
v10$1.isMessageComponentButtonInteraction = isMessageComponentButtonInteraction$1;
v10$1.isMessageComponentSelectMenuInteraction = isMessageComponentSelectMenuInteraction$1;
v10$1.isChatInputApplicationCommandInteraction = isChatInputApplicationCommandInteraction$1;
v10$1.isContextMenuApplicationCommandInteraction = isContextMenuApplicationCommandInteraction$1;
const index_1 = require$$2;
// Interactions
/**
 * A type-guard check for DM interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction was received in a DM channel
 */
function isDMInteraction$1(interaction) {
    return Reflect.has(interaction, 'user');
}
/**
 * A type-guard check for guild interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction was received in a guild
 */
function isGuildInteraction$1(interaction) {
    return Reflect.has(interaction, 'guild_id');
}
// ApplicationCommandInteractions
/**
 * A type-guard check for DM application command interactions
 *
 * @param interaction The application command interaction to check against
 * @returns A boolean that indicates if the application command interaction was received in a DM channel
 */
function isApplicationCommandDMInteraction$1(interaction) {
    return isDMInteraction$1(interaction);
}
/**
 * A type-guard check for guild application command interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the application command interaction was received in a guild
 */
function isApplicationCommandGuildInteraction$1(interaction) {
    return isGuildInteraction$1(interaction);
}
// MessageComponentInteractions
/**
 * A type-guard check for DM message component interactions
 *
 * @param interaction The message component interaction to check against
 * @returns A boolean that indicates if the message component interaction was received in a DM channel
 */
function isMessageComponentDMInteraction$1(interaction) {
    return isDMInteraction$1(interaction);
}
/**
 * A type-guard check for guild message component interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the message component interaction was received in a guild
 */
function isMessageComponentGuildInteraction$1(interaction) {
    return isGuildInteraction$1(interaction);
}
// Buttons
/**
 * A type-guard check for buttons that have a `url` attached to them.
 *
 * @param component The button to check against
 * @returns A boolean that indicates if the button has a `url` attached to it
 */
function isLinkButton$1(component) {
    return component.style === index_1.ButtonStyle.Link;
}
/**
 * A type-guard check for buttons that have a `custom_id` attached to them.
 *
 * @param component The button to check against
 * @returns A boolean that indicates if the button has a `custom_id` attached to it
 */
function isInteractionButton$1(component) {
    return component.style !== index_1.ButtonStyle.Link;
}
// Message Components
/**
 * A type-guard check for message component interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction is a message component
 */
function isMessageComponentInteraction$1(interaction) {
    return interaction.type === index_1.InteractionType.MessageComponent;
}
/**
 * A type-guard check for button message component interactions
 *
 * @param interaction The message component interaction to check against
 * @returns A boolean that indicates if the message component is a button
 */
function isMessageComponentButtonInteraction$1(interaction) {
    return interaction.data.component_type === index_1.ComponentType.Button;
}
/**
 * A type-guard check for select menu message component interactions
 *
 * @param interaction The message component interaction to check against
 * @returns A boolean that indicates if the message component is a select menu
 */
function isMessageComponentSelectMenuInteraction$1(interaction) {
    return [
        index_1.ComponentType.StringSelect,
        index_1.ComponentType.UserSelect,
        index_1.ComponentType.RoleSelect,
        index_1.ComponentType.MentionableSelect,
        index_1.ComponentType.ChannelSelect,
    ].includes(interaction.data.component_type);
}
// Application Commands
/**
 * A type-guard check for chat input application commands.
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction is a chat input application command
 */
function isChatInputApplicationCommandInteraction$1(interaction) {
    return interaction.data.type === index_1.ApplicationCommandType.ChatInput;
}
/**
 * A type-guard check for context menu application commands.
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction is a context menu application command
 */
function isContextMenuApplicationCommandInteraction$1(interaction) {
    return (interaction.data.type === index_1.ApplicationCommandType.Message ||
        interaction.data.type === index_1.ApplicationCommandType.User);
}

const isApplicationCommandDMInteraction = v10$1.isApplicationCommandDMInteraction;
const isApplicationCommandGuildInteraction = v10$1.isApplicationCommandGuildInteraction;
const isChatInputApplicationCommandInteraction = v10$1.isChatInputApplicationCommandInteraction;
const isContextMenuApplicationCommandInteraction = v10$1.isContextMenuApplicationCommandInteraction;
const isDMInteraction = v10$1.isDMInteraction;
const isGuildInteraction = v10$1.isGuildInteraction;
const isInteractionButton = v10$1.isInteractionButton;
const isLinkButton = v10$1.isLinkButton;
const isMessageComponentButtonInteraction = v10$1.isMessageComponentButtonInteraction;
const isMessageComponentDMInteraction = v10$1.isMessageComponentDMInteraction;
const isMessageComponentGuildInteraction = v10$1.isMessageComponentGuildInteraction;
const isMessageComponentInteraction = v10$1.isMessageComponentInteraction;
const isMessageComponentSelectMenuInteraction = v10$1.isMessageComponentSelectMenuInteraction;

var v10 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: v10$1,
	isApplicationCommandDMInteraction: isApplicationCommandDMInteraction,
	isApplicationCommandGuildInteraction: isApplicationCommandGuildInteraction,
	isChatInputApplicationCommandInteraction: isChatInputApplicationCommandInteraction,
	isContextMenuApplicationCommandInteraction: isContextMenuApplicationCommandInteraction,
	isDMInteraction: isDMInteraction,
	isGuildInteraction: isGuildInteraction,
	isInteractionButton: isInteractionButton,
	isLinkButton: isLinkButton,
	isMessageComponentButtonInteraction: isMessageComponentButtonInteraction,
	isMessageComponentDMInteraction: isMessageComponentDMInteraction,
	isMessageComponentGuildInteraction: isMessageComponentGuildInteraction,
	isMessageComponentInteraction: isMessageComponentInteraction,
	isMessageComponentSelectMenuInteraction: isMessageComponentSelectMenuInteraction
});

var require$$5 = /*@__PURE__*/getAugmentedNamespace(v10);

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Utils = void 0;
	__exportStar(require$$0, exports);
	__exportStar(require$$1, exports);
	__exportStar(require$$2, exports);
	__exportStar(require$$3, exports);
	__exportStar(require$$4, exports);
	exports.Utils = require$$5;
	
} (v10$a));

var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __name$3 = (target, value) => __defProp$3(target, "name", { value, configurable: true });
var __export$1 = (target, all) => {
  for (var name in all)
    __defProp$3(target, name, { get: all[name], enumerable: true });
};
var __copyProps$1 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames$1(from))
      if (!__hasOwnProp$1.call(to, key) && key !== except)
        __defProp$3(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS$1 = (mod) => __copyProps$1(__defProp$3({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export$1(src_exports, {
  Collection: () => Collection,
  version: () => version$1
});
var dist$1 = __toCommonJS$1(src_exports);

// src/collection.ts
var Collection = class _Collection extends Map {
  static {
    __name$3(this, "Collection");
  }
  /**
   * Obtains the value of the given key if it exists, otherwise sets and returns the value provided by the default value generator.
   *
   * @param key - The key to get if it exists, or set otherwise
   * @param defaultValueGenerator - A function that generates the default value
   * @example
   * ```ts
   * collection.ensure(guildId, () => defaultGuildConfig);
   * ```
   */
  ensure(key, defaultValueGenerator) {
    if (this.has(key)) return this.get(key);
    if (typeof defaultValueGenerator !== "function") throw new TypeError(`${defaultValueGenerator} is not a function`);
    const defaultValue = defaultValueGenerator(key, this);
    this.set(key, defaultValue);
    return defaultValue;
  }
  /**
   * Checks if all of the elements exist in the collection.
   *
   * @param keys - The keys of the elements to check for
   * @returns `true` if all of the elements exist, `false` if at least one does not exist.
   */
  hasAll(...keys) {
    return keys.every((key) => super.has(key));
  }
  /**
   * Checks if any of the elements exist in the collection.
   *
   * @param keys - The keys of the elements to check for
   * @returns `true` if any of the elements exist, `false` if none exist.
   */
  hasAny(...keys) {
    return keys.some((key) => super.has(key));
  }
  first(amount) {
    if (amount === void 0) return this.values().next().value;
    if (amount < 0) return this.last(amount * -1);
    amount = Math.min(this.size, amount);
    const iter = this.values();
    return Array.from({ length: amount }, () => iter.next().value);
  }
  firstKey(amount) {
    if (amount === void 0) return this.keys().next().value;
    if (amount < 0) return this.lastKey(amount * -1);
    amount = Math.min(this.size, amount);
    const iter = this.keys();
    return Array.from({ length: amount }, () => iter.next().value);
  }
  last(amount) {
    const arr = [...this.values()];
    if (amount === void 0) return arr[arr.length - 1];
    if (amount < 0) return this.first(amount * -1);
    if (!amount) return [];
    return arr.slice(-amount);
  }
  lastKey(amount) {
    const arr = [...this.keys()];
    if (amount === void 0) return arr[arr.length - 1];
    if (amount < 0) return this.firstKey(amount * -1);
    if (!amount) return [];
    return arr.slice(-amount);
  }
  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at | Array.at()}.
   * Returns the item at a given index, allowing for positive and negative integers.
   * Negative integers count back from the last item in the collection.
   *
   * @param index - The index of the element to obtain
   */
  at(index) {
    index = Math.floor(index);
    const arr = [...this.values()];
    return arr.at(index);
  }
  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at | Array.at()}.
   * Returns the key at a given index, allowing for positive and negative integers.
   * Negative integers count back from the last item in the collection.
   *
   * @param index - The index of the key to obtain
   */
  keyAt(index) {
    index = Math.floor(index);
    const arr = [...this.keys()];
    return arr.at(index);
  }
  random(amount) {
    const arr = [...this.values()];
    if (amount === void 0) return arr[Math.floor(Math.random() * arr.length)];
    if (!arr.length || !amount) return [];
    return Array.from(
      { length: Math.min(amount, arr.length) },
      () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
    );
  }
  randomKey(amount) {
    const arr = [...this.keys()];
    if (amount === void 0) return arr[Math.floor(Math.random() * arr.length)];
    if (!arr.length || !amount) return [];
    return Array.from(
      { length: Math.min(amount, arr.length) },
      () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
    );
  }
  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse | Array.reverse()}
   * but returns a Collection instead of an Array.
   */
  reverse() {
    const entries = [...this.entries()].reverse();
    this.clear();
    for (const [key, value] of entries) this.set(key, value);
    return this;
  }
  find(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    for (const [key, val] of this) {
      if (fn(val, key, this)) return val;
    }
    return void 0;
  }
  findKey(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    for (const [key, val] of this) {
      if (fn(val, key, this)) return key;
    }
    return void 0;
  }
  findLast(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    const entries = [...this.entries()];
    for (let index = entries.length - 1; index >= 0; index--) {
      const val = entries[index][1];
      const key = entries[index][0];
      if (fn(val, key, this)) return val;
    }
    return void 0;
  }
  findLastKey(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    const entries = [...this.entries()];
    for (let index = entries.length - 1; index >= 0; index--) {
      const key = entries[index][0];
      const val = entries[index][1];
      if (fn(val, key, this)) return key;
    }
    return void 0;
  }
  sweep(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    const previousSize = this.size;
    for (const [key, val] of this) {
      if (fn(val, key, this)) this.delete(key);
    }
    return previousSize - this.size;
  }
  filter(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    const results = new this.constructor[Symbol.species]();
    for (const [key, val] of this) {
      if (fn(val, key, this)) results.set(key, val);
    }
    return results;
  }
  partition(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    const results = [
      new this.constructor[Symbol.species](),
      new this.constructor[Symbol.species]()
    ];
    for (const [key, val] of this) {
      if (fn(val, key, this)) {
        results[0].set(key, val);
      } else {
        results[1].set(key, val);
      }
    }
    return results;
  }
  flatMap(fn, thisArg) {
    const collections = this.map(fn, thisArg);
    return new this.constructor[Symbol.species]().concat(...collections);
  }
  map(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    const iter = this.entries();
    return Array.from({ length: this.size }, () => {
      const [key, value] = iter.next().value;
      return fn(value, key, this);
    });
  }
  mapValues(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    const coll = new this.constructor[Symbol.species]();
    for (const [key, val] of this) coll.set(key, fn(val, key, this));
    return coll;
  }
  some(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    for (const [key, val] of this) {
      if (fn(val, key, this)) return true;
    }
    return false;
  }
  every(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    for (const [key, val] of this) {
      if (!fn(val, key, this)) return false;
    }
    return true;
  }
  reduce(fn, initialValue) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    let accumulator;
    const iterator = this.entries();
    if (initialValue === void 0) {
      if (this.size === 0) throw new TypeError("Reduce of empty collection with no initial value");
      accumulator = iterator.next().value[1];
    } else {
      accumulator = initialValue;
    }
    for (const [key, value] of iterator) {
      accumulator = fn(accumulator, value, key, this);
    }
    return accumulator;
  }
  reduceRight(fn, initialValue) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    const entries = [...this.entries()];
    let accumulator;
    let index;
    if (initialValue === void 0) {
      if (entries.length === 0) throw new TypeError("Reduce of empty collection with no initial value");
      accumulator = entries[entries.length - 1][1];
      index = entries.length - 1;
    } else {
      accumulator = initialValue;
      index = entries.length;
    }
    while (--index >= 0) {
      const key = entries[index][0];
      const val = entries[index][1];
      accumulator = fn(accumulator, val, key, this);
    }
    return accumulator;
  }
  each(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    for (const [key, value] of this) {
      fn(value, key, this);
    }
    return this;
  }
  tap(fn, thisArg) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0) fn = fn.bind(thisArg);
    fn(this);
    return this;
  }
  /**
   * Creates an identical shallow copy of this collection.
   *
   * @example
   * ```ts
   * const newColl = someColl.clone();
   * ```
   */
  clone() {
    return new this.constructor[Symbol.species](this);
  }
  /**
   * Combines this collection with others into a new collection. None of the source collections are modified.
   *
   * @param collections - Collections to merge
   * @example
   * ```ts
   * const newColl = someColl.concat(someOtherColl, anotherColl, ohBoyAColl);
   * ```
   */
  concat(...collections) {
    const newColl = this.clone();
    for (const coll of collections) {
      for (const [key, val] of coll) newColl.set(key, val);
    }
    return newColl;
  }
  /**
   * Checks if this collection shares identical items with another.
   * This is different to checking for equality using equal-signs, because
   * the collections may be different objects, but contain the same data.
   *
   * @param collection - Collection to compare with
   * @returns Whether the collections have identical contents
   */
  equals(collection) {
    if (!collection) return false;
    if (this === collection) return true;
    if (this.size !== collection.size) return false;
    for (const [key, value] of this) {
      if (!collection.has(key) || value !== collection.get(key)) {
        return false;
      }
    }
    return true;
  }
  /**
   * The sort method sorts the items of a collection in place and returns it.
   * The sort is not necessarily stable in Node 10 or older.
   * The default sort order is according to string Unicode code points.
   *
   * @param compareFunction - Specifies a function that defines the sort order.
   * If omitted, the collection is sorted according to each character's Unicode code point value, according to the string conversion of each element.
   * @example
   * ```ts
   * collection.sort((userA, userB) => userA.createdTimestamp - userB.createdTimestamp);
   * ```
   */
  sort(compareFunction = _Collection.defaultSort) {
    const entries = [...this.entries()];
    entries.sort((a, b) => compareFunction(a[1], b[1], a[0], b[0]));
    super.clear();
    for (const [key, value] of entries) {
      super.set(key, value);
    }
    return this;
  }
  /**
   * The intersection method returns a new collection containing the items where the key is present in both collections.
   *
   * @param other - The other Collection to filter against
   * @example
   * ```ts
   * const col1 = new Collection([['a', 1], ['b', 2]]);
   * const col2 = new Collection([['a', 1], ['c', 3]]);
   * const intersection = col1.intersection(col2);
   * console.log(col1.intersection(col2));
   * // => Collection { 'a' => 1 }
   * ```
   */
  intersection(other) {
    const coll = new this.constructor[Symbol.species]();
    for (const [key, value] of this) {
      if (other.has(key)) coll.set(key, value);
    }
    return coll;
  }
  /**
   * Returns a new collection containing the items where the key is present in either of the collections.
   *
   * @remarks
   *
   * If the collections have any items with the same key, the value from the first collection will be used.
   * @param other - The other Collection to filter against
   * @example
   * ```ts
   * const col1 = new Collection([['a', 1], ['b', 2]]);
   * const col2 = new Collection([['a', 1], ['b', 3], ['c', 3]]);
   * const union = col1.union(col2);
   * console.log(union);
   * // => Collection { 'a' => 1, 'b' => 2, 'c' => 3 }
   * ```
   */
  union(other) {
    const coll = new this.constructor[Symbol.species](this);
    for (const [key, value] of other) {
      if (!coll.has(key)) coll.set(key, value);
    }
    return coll;
  }
  /**
   * Returns a new collection containing the items where the key is present in this collection but not the other.
   *
   * @param other - The other Collection to filter against
   * @example
   * ```ts
   * const col1 = new Collection([['a', 1], ['b', 2]]);
   * const col2 = new Collection([['a', 1], ['c', 3]]);
   * console.log(col1.difference(col2));
   * // => Collection { 'b' => 2 }
   * console.log(col2.difference(col1));
   * // => Collection { 'c' => 3 }
   * ```
   */
  difference(other) {
    const coll = new this.constructor[Symbol.species]();
    for (const [key, value] of this) {
      if (!other.has(key)) coll.set(key, value);
    }
    return coll;
  }
  /**
   * Returns a new collection containing only the items where the keys are present in either collection, but not both.
   *
   * @param other - The other Collection to filter against
   * @example
   * ```ts
   * const col1 = new Collection([['a', 1], ['b', 2]]);
   * const col2 = new Collection([['a', 1], ['c', 3]]);
   * const symmetricDifference = col1.symmetricDifference(col2);
   * console.log(col1.symmetricDifference(col2));
   * // => Collection { 'b' => 2, 'c' => 3 }
   * ```
   */
  symmetricDifference(other) {
    const coll = new this.constructor[Symbol.species]();
    for (const [key, value] of this) {
      if (!other.has(key)) coll.set(key, value);
    }
    for (const [key, value] of other) {
      if (!this.has(key)) coll.set(key, value);
    }
    return coll;
  }
  /**
   * Merges two Collections together into a new Collection.
   *
   * @param other - The other Collection to merge with
   * @param whenInSelf - Function getting the result if the entry only exists in this Collection
   * @param whenInOther - Function getting the result if the entry only exists in the other Collection
   * @param whenInBoth - Function getting the result if the entry exists in both Collections
   * @example
   * ```ts
   * // Sums up the entries in two collections.
   * coll.merge(
   *  other,
   *  x => ({ keep: true, value: x }),
   *  y => ({ keep: true, value: y }),
   *  (x, y) => ({ keep: true, value: x + y }),
   * );
   * ```
   * @example
   * ```ts
   * // Intersects two collections in a left-biased manner.
   * coll.merge(
   *  other,
   *  x => ({ keep: false }),
   *  y => ({ keep: false }),
   *  (x, _) => ({ keep: true, value: x }),
   * );
   * ```
   */
  merge(other, whenInSelf, whenInOther, whenInBoth) {
    const coll = new this.constructor[Symbol.species]();
    const keys = /* @__PURE__ */ new Set([...this.keys(), ...other.keys()]);
    for (const key of keys) {
      const hasInSelf = this.has(key);
      const hasInOther = other.has(key);
      if (hasInSelf && hasInOther) {
        const result = whenInBoth(this.get(key), other.get(key), key);
        if (result.keep) coll.set(key, result.value);
      } else if (hasInSelf) {
        const result = whenInSelf(this.get(key), key);
        if (result.keep) coll.set(key, result.value);
      } else if (hasInOther) {
        const result = whenInOther(other.get(key), key);
        if (result.keep) coll.set(key, result.value);
      }
    }
    return coll;
  }
  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed | Array.toReversed()}
   * but returns a Collection instead of an Array.
   */
  toReversed() {
    return new this.constructor[Symbol.species](this).reverse();
  }
  /**
   * The sorted method sorts the items of a collection and returns it.
   * The sort is not necessarily stable in Node 10 or older.
   * The default sort order is according to string Unicode code points.
   *
   * @param compareFunction - Specifies a function that defines the sort order.
   * If omitted, the collection is sorted according to each character's Unicode code point value,
   * according to the string conversion of each element.
   * @example
   * ```ts
   * collection.sorted((userA, userB) => userA.createdTimestamp - userB.createdTimestamp);
   * ```
   */
  toSorted(compareFunction = _Collection.defaultSort) {
    return new this.constructor[Symbol.species](this).sort((av, bv, ak, bk) => compareFunction(av, bv, ak, bk));
  }
  toJSON() {
    return [...this.entries()];
  }
  static defaultSort(firstValue, secondValue) {
    return Number(firstValue > secondValue) || Number(firstValue === secondValue) - 1;
  }
  /**
   * Creates a Collection from a list of entries.
   *
   * @param entries - The list of entries
   * @param combine - Function to combine an existing entry with a new one
   * @example
   * ```ts
   * Collection.combineEntries([["a", 1], ["b", 2], ["a", 2]], (x, y) => x + y);
   * // returns Collection { "a" => 3, "b" => 2 }
   * ```
   */
  static combineEntries(entries, combine) {
    const coll = new _Collection();
    for (const [key, value] of entries) {
      if (coll.has(key)) {
        coll.set(key, combine(coll.get(key), value, key));
      } else {
        coll.set(key, value);
      }
    }
    return coll;
  }
};

// src/index.ts
var version$1 = "2.1.1";

var cjs$1 = {};

var __defProp$2 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name$2 = (target, value) => __defProp$2(target, "name", { value, configurable: true });
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/lib/Snowflake.ts
var IncrementSymbol = Symbol("@sapphire/snowflake.increment");
var EpochSymbol = Symbol("@sapphire/snowflake.epoch");
var ProcessIdSymbol = Symbol("@sapphire/snowflake.processId");
var WorkerIdSymbol = Symbol("@sapphire/snowflake.workerId");
var MaximumWorkerId = 0b11111n;
var MaximumProcessId = 0b11111n;
var MaximumIncrement = 0b111111111111n;
var _a, _b, _c, _d;
var _Snowflake = class _Snowflake {
  /**
   * @param epoch the epoch to use
   */
  constructor(epoch) {
    /**
     * Alias for {@link deconstruct}
     */
    // eslint-disable-next-line @typescript-eslint/unbound-method
    __publicField$1(this, "decode", this.deconstruct);
    /**
     * Internal reference of the epoch passed in the constructor
     * @internal
     */
    __publicField$1(this, _a);
    /**
     * Internal incrementor for generating snowflakes
     * @internal
     */
    __publicField$1(this, _b, 0n);
    /**
     * The process ID that will be used by default in the generate method
     * @internal
     */
    __publicField$1(this, _c, 1n);
    /**
     * The worker ID that will be used by default in the generate method
     * @internal
     */
    __publicField$1(this, _d, 0n);
    this[EpochSymbol] = BigInt(epoch instanceof Date ? epoch.getTime() : epoch);
  }
  /**
   * The epoch for this snowflake
   */
  get epoch() {
    return this[EpochSymbol];
  }
  /**
   * Gets the configured process ID
   */
  get processId() {
    return this[ProcessIdSymbol];
  }
  /**
   * Sets the process ID that will be used by default for the {@link generate} method
   * @param value The new value, will be coerced to BigInt and masked with `0b11111n`
   */
  set processId(value) {
    this[ProcessIdSymbol] = BigInt(value) & MaximumProcessId;
  }
  /**
   * Gets the configured worker ID
   */
  get workerId() {
    return this[WorkerIdSymbol];
  }
  /**
   * Sets the worker ID that will be used by default for the {@link generate} method
   * @param value The new value, will be coerced to BigInt and masked with `0b11111n`
   */
  set workerId(value) {
    this[WorkerIdSymbol] = BigInt(value) & MaximumWorkerId;
  }
  /**
   * Generates a snowflake given an epoch and optionally a timestamp
   * @param options options to pass into the generator, see {@link SnowflakeGenerateOptions}
   *
   * **note** when `increment` is not provided it defaults to the private `increment` of the instance
   * @example
   * ```typescript
   * const epoch = new Date('2000-01-01T00:00:00.000Z');
   * const snowflake = new Snowflake(epoch).generate();
   * ```
   * @returns A unique snowflake
   */
  generate({
    increment,
    timestamp = Date.now(),
    workerId = this[WorkerIdSymbol],
    processId = this[ProcessIdSymbol]
  } = {}) {
    if (timestamp instanceof Date)
      timestamp = BigInt(timestamp.getTime());
    else if (typeof timestamp === "number")
      timestamp = BigInt(timestamp);
    else if (typeof timestamp !== "bigint") {
      throw new TypeError(`"timestamp" argument must be a number, bigint, or Date (received ${typeof timestamp})`);
    }
    if (typeof increment !== "bigint") {
      increment = this[IncrementSymbol];
      this[IncrementSymbol] = increment + 1n & MaximumIncrement;
    }
    return timestamp - this[EpochSymbol] << 22n | (workerId & MaximumWorkerId) << 17n | (processId & MaximumProcessId) << 12n | increment & MaximumIncrement;
  }
  /**
   * Deconstructs a snowflake given a snowflake ID
   * @param id the snowflake to deconstruct
   * @returns a deconstructed snowflake
   * @example
   * ```typescript
   * const epoch = new Date('2000-01-01T00:00:00.000Z');
   * const snowflake = new Snowflake(epoch).deconstruct('3971046231244935168');
   * ```
   */
  deconstruct(id) {
    const bigIntId = BigInt(id);
    const epoch = this[EpochSymbol];
    return {
      id: bigIntId,
      timestamp: (bigIntId >> 22n) + epoch,
      workerId: bigIntId >> 17n & MaximumWorkerId,
      processId: bigIntId >> 12n & MaximumProcessId,
      increment: bigIntId & MaximumIncrement,
      epoch
    };
  }
  /**
   * Retrieves the timestamp field's value from a snowflake.
   * @param id The snowflake to get the timestamp value from.
   * @returns The UNIX timestamp that is stored in `id`.
   */
  timestampFrom(id) {
    return Number((BigInt(id) >> 22n) + this[EpochSymbol]);
  }
  /**
   * Returns a number indicating whether a reference snowflake comes before, or after, or is same as the given
   * snowflake in sort order.
   * @param a The first snowflake to compare.
   * @param b The second snowflake to compare.
   * @returns `-1` if `a` is older than `b`, `0` if `a` and `b` are equals, `1` if `a` is newer than `b`.
   * @example Sort snowflakes in ascending order
   * ```typescript
   * const ids = ['737141877803057244', '1056191128120082432', '254360814063058944'];
   * console.log(ids.sort((a, b) => Snowflake.compare(a, b)));
   * // → ['254360814063058944', '737141877803057244', '1056191128120082432'];
   * ```
   * @example Sort snowflakes in descending order
   * ```typescript
   * const ids = ['737141877803057244', '1056191128120082432', '254360814063058944'];
   * console.log(ids.sort((a, b) => -Snowflake.compare(a, b)));
   * // → ['1056191128120082432', '737141877803057244', '254360814063058944'];
   * ```
   */
  static compare(a, b) {
    const typeA = typeof a;
    return typeA === typeof b ? typeA === "string" ? cmpString(a, b) : cmpBigInt(a, b) : cmpBigInt(BigInt(a), BigInt(b));
  }
};
_a = EpochSymbol, _b = IncrementSymbol, _c = ProcessIdSymbol, _d = WorkerIdSymbol;
__name$2(_Snowflake, "Snowflake");
var Snowflake = _Snowflake;
function cmpBigInt(a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
}
__name$2(cmpBigInt, "cmpBigInt");
function cmpString(a, b) {
  return a === b ? 0 : a.length < b.length ? -1 : a.length > b.length ? 1 : a < b ? -1 : 1;
}
__name$2(cmpString, "cmpString");

// src/lib/DiscordSnowflake.ts
var DiscordSnowflake = new Snowflake(1420070400000n);

// src/lib/TwitterSnowflake.ts
var TwitterSnowflake = new Snowflake(1288834974657n);

cjs$1.DiscordSnowflake = DiscordSnowflake;
cjs$1.MaximumIncrement = MaximumIncrement;
cjs$1.MaximumProcessId = MaximumProcessId;
cjs$1.MaximumWorkerId = MaximumWorkerId;
cjs$1.Snowflake = Snowflake;
cjs$1.TwitterSnowflake = TwitterSnowflake;

var dist = {};

var patternTree = {};

var toHex$1 = {};

Object.defineProperty(toHex$1, "__esModule", { value: true });
toHex$1.fromHex = toHex$1.toHex = void 0;
const hex = (num) => new Number(num).toString(16).toLowerCase();
const toHex = (num) => `0x${hex(num).length === 1 ? "0" + hex(num) : hex(num)}`;
toHex$1.toHex = toHex;
const fromHex = (hex) => new Number(hex);
toHex$1.fromHex = fromHex;

var tree$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createComplexNode = exports.createNode = exports.merge = void 0;
	const createMatch = (leaf) => ({
	    typename: leaf.typename,
	    mime: leaf.info.mime,
	    extension: leaf.info.extension,
	});
	const isMatchingNode = (tree, path) => tree && path.length === 0;
	const head = (arr) => arr[0];
	const tail = (arr) => arr.slice(1, arr.length);
	const merge = (node, tree) => {
	    if (node.bytes.length === 0)
	        return tree;
	    const currentByte = head(node.bytes); // 0
	    const path = tail(node.bytes); // [1,2]
	    const currentTree = tree.bytes[currentByte];
	    // traversed to end. Just add key to leaf.
	    if (isMatchingNode(currentTree, path)) {
	        const matchingNode = tree.bytes[currentByte];
	        tree.bytes[currentByte] = {
	            ...matchingNode,
	            matches: [
	                ...(matchingNode.matches ? matchingNode.matches : []),
	                createMatch(node),
	            ],
	        };
	        return tree;
	    }
	    // Path exists already, Merge subtree
	    if (tree.bytes[currentByte]) {
	        tree.bytes[currentByte] = exports.merge(exports.createNode(node.typename, path, node.info), tree.bytes[currentByte]);
	        return tree;
	    }
	    // Tree did not exist before
	    if (!tree.bytes[currentByte]) {
	        tree.bytes[currentByte] = {
	            ...tree.bytes[currentByte],
	            ...exports.createComplexNode(node.typename, path, node.info),
	        };
	    }
	    return tree;
	};
	exports.merge = merge;
	const createNode = (typename, bytes, info) => {
	    return { typename, bytes, info: info ? info : {} };
	};
	exports.createNode = createNode;
	const createComplexNode = (typename, bytes, info) => {
	    let obj = {
	        bytes: {},
	        matches: undefined,
	    };
	    const currentKey = head(bytes); // 0
	    const path = tail(bytes); // [1,2]
	    if (bytes.length === 0) {
	        return {
	            matches: [
	                createMatch({
	                    typename: typename,
	                    info: info ? { extension: info.extension, mime: info.mime } : {},
	                }),
	            ],
	            bytes: {},
	        };
	    }
	    obj.bytes[currentKey] = exports.createComplexNode(typename, path, info);
	    return obj;
	};
	exports.createComplexNode = createComplexNode; 
} (tree$1));

Object.defineProperty(patternTree, "__esModule", { value: true });
const toHex_1 = toHex$1;
const tree_1 = tree$1;
// https://en.wikipedia.org/wiki/List_of_file_signatures
let tree = {
    noOffset: null,
    offset: {},
};
const add = (typename, signature, additionalInfo, offset) => {
    if (offset) {
        const existing = tree.offset[toHex_1.toHex(offset)];
        if (!existing) {
            tree.offset[toHex_1.toHex(offset)] = tree_1.createComplexNode(typename, signature.map((e) => e.toLowerCase()), additionalInfo);
        }
        else {
            const merged = tree_1.merge(tree_1.createNode(typename, signature.map((e) => e.toLowerCase()), additionalInfo), { ...existing });
            tree.offset[toHex_1.toHex(offset)] = merged;
        }
    }
    else {
        if (tree.noOffset === null) {
            tree.noOffset = tree_1.createComplexNode(typename, signature.map((e) => e.toLowerCase()), additionalInfo);
        }
        else {
            tree.noOffset = tree_1.merge(tree_1.createNode(typename, signature.map((e) => e.toLowerCase()), additionalInfo), tree.noOffset);
        }
    }
};
add("gif", ["0x47", "0x49", "0x46", "0x38", "0x37", "0x61"], {
    mime: "image/gif",
    extension: "gif",
});
add("gif", ["0x47", "0x49", "0x46", "0x38", "0x39", "0x61"], {
    mime: "image/gif",
    extension: "gif",
});
add("jpg", ["0xFF", "0xD8", "0xFF"], {
    mime: "image/jpeg",
    extension: "jpeg",
});
add("webp", [
    "0x52",
    "0x49",
    "0x46",
    "0x46",
    "?",
    "?",
    "?",
    "?",
    "0x57",
    "0x45",
    "0x42",
    "0x50",
], { mime: "image/webp", extension: "webp" });
add("heif", ["0x66", "0x74", "0x79", "0x70", "0x6D", "0x69", "0x66", "0x31"], { mime: "image/heif", extension: "heif" }, 4);
add("heif", ["0x66", "0x74", "0x79", "0x70", "0x68", "0x65", "0x69", "0x63"], { mime: "image/heif", extension: "heic" }, 4);
add("rpm", ["0xed", "0xab", "0xee", "0xdb"]);
add("bin", ["0x53", "0x50", "0x30", "0x31"], {
    mime: "application/octet-stream",
    extension: "bin",
});
add("pic", ["0x00"]);
add("pif", ["0x00"]);
add("sea", ["0x00"]);
add("ytr", ["0x00"]);
// 66747970
// 6D703432
add("mp4", ["0x66", "0x74", "0x79", "0x70"], { mime: "video/mp4", extension: "mp4" }, 0x4);
add("ttf", ["0x00", "0x01", "0x00", "0x00", "0x00"], {
    mime: "font/ttf",
    extension: "ttf",
});
add("otf", ["0x4F", "0x54", "0x54", "0x4F"], {
    mime: "font/otf",
    extension: "otf",
});
add("eot", ["0x50", "0x4C"], {
    mime: "application/vnd.ms-fontobject",
    extension: "eot",
});
add("woff", ["0x77", "0x4F", "0x46", "0x46"], {
    mime: "font/woff",
    extension: "woff",
});
add("woff2", ["0x77", "0x4F", "0x46", "0x32"], {
    mime: "font/woff2",
    extension: "woff2",
});
add("pdb", [
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
]);
add("dba", ["0xBE", "0xBA", "0xFE", "0xCA"]);
add("dba2", ["0x00", "0x01", "0x42", "0x44"]);
add("tda", ["0x00", "0x01", "0x44", "0x54"]);
add("tda2", ["0x00", "0x01", "0x00", "0x00"]);
add("ico", ["0x00", "0x00", "0x01", "0x00"], {
    mime: "image/x-icon",
    extension: "ico",
});
add("3gp", ["0x66", "0x74", "0x79", "0x70", "0x33", "0x67"]);
add("z", ["0x1F", "0x9D"]);
add("tar.z", ["0x1F", "0xA0"]);
add("bac", [
    "0x42",
    "0x41",
    "0x43",
    "0x4B",
    "0x4D",
    "0x49",
    "0x4B",
    "0x45",
    "0x44",
    "0x49",
    "0x53",
    "0x4B",
]);
add("bz2", ["0x42", "0x5A", "0x68"], {
    mime: "application/x-bzip2",
    extension: "bz2",
});
add("tif", ["0x49", "0x49", "0x2A", "0x00"], {
    mime: "image/tiff",
    extension: "tif",
});
add("tiff", ["0x4D", "0x4D", "0x00", "0x2A"], {
    mime: "image/tiff",
    extension: "tiff",
});
add("cr2", [
    "0x49",
    "0x49",
    "0x2A",
    "0x00",
    "0x10",
    "0x00",
    "0x00",
    "0x00",
    "0x43",
    "0x52",
]);
add("cin", ["0x80", "0x2A", "0x5F", "0xD7"]);
add("cin1", ["0x52", "0x4E", "0x43", "0x01"]);
add("cin2", ["0x52", "0x4E", "0x43", "0x02"]);
add("dpx", ["0x53", "0x44", "0x50", "0x58"]);
add("dpx2", ["0x58", "0x50", "0x44", "0x53"]);
add("exr", ["0x76", "0x2F", "0x31", "0x01"]);
add("bpg", ["0x42", "0x50", "0x47", "0xFB"]);
add("ilbm", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x49",
    "0x4C",
    "0x42",
    "0x4D",
]);
add("8svx", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x38",
    "0x53",
    "0x56",
    "0x58",
]);
add("acbm", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x41",
    "0x43",
    "0x42",
    "0x4D",
]);
add("anbm", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x41",
    "0x4E",
    "0x42",
    "0x4D",
]);
add("anim", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x41",
    "0x4E",
    "0x49",
    "0x4D",
]);
add("faxx", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x46",
    "0x41",
    "0x58",
    "0x58",
]);
add("ftxt", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x46",
    "0x54",
    "0x58",
    "0x54",
]);
add("smus", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x53",
    "0x4D",
    "0x55",
    "0x53",
]);
add("cmus", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x43",
    "0x4D",
    "0x55",
    "0x53",
]);
add("yuvn", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x59",
    "0x55",
    "0x56",
    "0x4E",
]);
add("iff", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x46",
    "0x41",
    "0x4E",
    "0x54",
]);
add("aiff", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x41",
    "0x49",
    "0x46",
    "0x46",
], { mime: "audio/x-aiff", extension: "aiff" });
add("idx", ["0x49", "0x4E", "0x44", "0x58"]);
add("lz", ["0x4C", "0x5A", "0x49", "0x50"]);
add("exe", ["0x4D", "0x5A"]);
add("zip", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/zip",
    extension: "zip",
});
add("zip", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/zip",
    extension: "zip",
});
add("zip", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/zip",
    extension: "zip",
});
add("jar", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/java-archive",
    extension: "jar",
});
add("jar", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/java-archive",
    extension: "jar",
});
add("jar", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/java-archive",
    extension: "jar",
});
add("odt", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.oasis.opendocument.text",
    extension: "odt",
});
add("odt", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.oasis.opendocument.text",
    extension: "odt",
});
add("odt", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.oasis.opendocument.text",
    extension: "odt",
});
add("ods", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.oasis.opendocument.spreadsheet",
    extension: "ods",
});
add("ods", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.oasis.opendocument.spreadsheet",
    extension: "ods",
});
add("ods", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.oasis.opendocument.spreadsheet",
    extension: "ods",
});
add("odp", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.oasis.opendocument.presentation",
    extension: "odp",
});
add("odp", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.oasis.opendocument.presentation",
    extension: "odp",
});
add("odp", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.oasis.opendocument.presentation",
    extension: "odp",
});
add("docx", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extension: "docx",
});
add("docx", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extension: "docx",
});
add("docx", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extension: "docx",
});
add("xlsx", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extension: "xlsx",
});
add("xlsx", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extension: "xlsx",
});
add("xlsx", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extension: "xlsx",
});
add("pptx", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    extension: "pptx",
});
add("pptx", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    extension: "pptx",
});
add("pptx", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    extension: "pptx",
});
add("vsdx", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.ms-visio.drawing",
    extension: "vsdx",
});
add("vsdx", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.ms-visio.drawing",
    extension: "vsdx",
});
add("vsdx", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.ms-visio.drawing",
    extension: "vsdx",
});
add("apk", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.android.package-archive",
    extension: "apk",
});
add("apk", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.android.package-archive",
    extension: "apk",
});
add("apk", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.android.package-archive",
    extension: "apk",
});
add("aar", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.android.package-archive",
    extension: "aar",
});
add("aar", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.android.package-archive",
    extension: "aar",
});
add("aar", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.android.package-archive",
    extension: "aar",
});
add("rar", ["0x52", "0x61", "0x72", "0x21", "0x1A", "0x07", "0x00"], {
    mime: "application/vnd.rar",
    extension: "rar",
});
add("rar", ["0x52", "0x61", "0x72", "0x21", "0x1A", "0x07", "0x01", "0x00"], {
    mime: "application/vnd.rar",
    extension: "rar",
});
add("rar", ["0x7F", "0x45", "0x4C", "0x46"], {
    mime: "application/vnd.rar",
    extension: "rar",
});
add("png", ["0x89", "0x50", "0x4E", "0x47", "0x0D", "0x0A", "0x1A", "0x0A"], {
    mime: "image/png",
    extension: "png",
});
add("apng", ["0x89", "0x50", "0x4E", "0x47", "0x0D", "0x0A", "0x1A", "0x0A"], {
    mime: "image/apng",
    extension: "apng",
});
add("class", ["0xCA", "0xFE", "0xBA", "0xBE"]);
add("class", ["0xEF", "0xBB", "0xBF"]);
add("class", ["0xFE", "0xed", "0xFA", "0xCE"], undefined, 0x1000);
add("class", ["0xFE", "0xed", "0xFA", "0xCF"], undefined, 0x1000);
add("class", ["0xCE", "0xFA", "0xed", "0xFE"]);
add("class", ["0xCF", "0xFA", "0xed", "0xFE"]);
add("class", ["0xFF", "0xFE"]);
add("class", ["0xFF", "0xFE"]);
add("class", ["0xFF", "0xFE", "0x00", "0x00"]);
add("ps", ["0x25", "0x21", "0x50", "0x53"], {
    mime: "application/postscript",
    extension: ".ps"
});
add("pdf", ["0x25", "0x50", "0x44", "0x46"], {
    mime: "application/pdf",
    extension: "pdf",
});
add("asf", [
    "0x30",
    "0x26",
    "0xB2",
    "0x75",
    "0x8E",
    "0x66",
    "0xCF",
    "0x11",
    "0xA6",
    "0xD9",
    "0x00",
    "0xAA",
    "0x00",
    "0x62",
    "0xCE",
    "0x6C",
]);
add("wma", [
    "0x30",
    "0x26",
    "0xB2",
    "0x75",
    "0x8E",
    "0x66",
    "0xCF",
    "0x11",
    "0xA6",
    "0xD9",
    "0x00",
    "0xAA",
    "0x00",
    "0x62",
    "0xCE",
    "0x6C",
]);
add("wmv", [
    "0x30",
    "0x26",
    "0xB2",
    "0x75",
    "0x8E",
    "0x66",
    "0xCF",
    "0x11",
    "0xA6",
    "0xD9",
    "0x00",
    "0xAA",
    "0x00",
    "0x62",
    "0xCE",
    "0x6C",
]);
add("deploymentimage", [
    "0x24",
    "0x53",
    "0x44",
    "0x49",
    "0x30",
    "0x30",
    "0x30",
    "0x31",
]);
// ogg video ' theora'
add("ogv", [
    "0x4F",
    "0x67",
    "0x67",
    "0x53",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "0x80",
    "0x74",
    "0x68",
    "0x65",
    "0x6F",
    "0x72",
    "0x61",
], {
    mime: "video/ogg",
    extension: "ogv",
});
// ogg video '\x01video'
add("ogm", [
    "0x4F",
    "0x67",
    "0x67",
    "0x53",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "0x01",
    "0x76",
    "0x69",
    "0x64",
    "0x65",
    "0x6F",
    "0x00",
], {
    mime: "video/ogg",
    extension: "ogm",
});
// ogg audio ' FLAC'
add("oga", [
    "0x4F",
    "0x67",
    "0x67",
    "0x53",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "0x7F",
    "0x46",
    "0x4C",
    "0x41",
    "0x43",
], {
    mime: "audio/ogg",
    extension: "oga",
});
// ogg audio 'Speex  '
add("spx", [
    "0x4F",
    "0x67",
    "0x67",
    "0x53",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "0x53",
    "0x70",
    "0x65",
    "0x65",
    "0x78",
    "0x20",
    "0x20",
], {
    mime: "audio/ogg",
    extension: "spx",
});
// ogg audio '\x01vorbis '
add("ogg", [
    "0x4F",
    "0x67",
    "0x67",
    "0x53",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "0x01",
    "0x76",
    "0x6F",
    "0x72",
    "0x62",
    "0x69",
    "0x73",
], {
    mime: "audio/ogg",
    extension: "ogg",
});
// default OGG container
add("ogx", ["0x4F", "0x67", "0x67", "0x53"], {
    mime: "application/ogg",
    extension: "ogx",
});
add("psd", ["0x38", "0x42", "0x50", "0x53"], {
    mime: "application/x-photoshop",
    extension: "psd",
});
add("clip", ["0x43", "0x53", "0x46", "0x43", "0x48", "0x55", "0x4e", "0x4b"]);
add("wav", [
    "0x52",
    "0x49",
    "0x46",
    "0x46",
    "?",
    "?",
    "?",
    "?",
    "0x57",
    "0x41",
    "0x56",
    "0x45",
], { mime: "audio/x-wav", extension: "wav" });
add("avi", [
    "0x52",
    "0x49",
    "0x46",
    "0x46",
    "?",
    "?",
    "?",
    "?",
    "0x41",
    "0x56",
    "0x49",
    "0x20",
], { mime: "video/x-msvideo", extension: "avi" });
add("mp3", ["0xFF", "0xFB"], { mime: "audio/mpeg", extension: "mp3" });
add("mp3", ["0xFF", "0xF3"], { mime: "audio/mpeg", extension: "mp3" });
add("mp3", ["0xFF", "0xF2"], { mime: "audio/mpeg", extension: "mp3" });
add("mp3", ["0x49", "0x44", "0x33"], { mime: "audio/mpeg", extension: "mp3" });
add("bmp", ["0x42", "0x4D"], { mime: "image/bmp", extension: "bmp" });
add("iso", ["0x43", "0x44", "0x30", "0x30", "0x31"]);
add("flac", ["0x66", "0x4C", "0x61", "0x43"]);
add("mid", ["0x4D", "0x54", "0x68", "0x64"], {
    mime: "audio/midi",
    extension: "mid",
});
add("midi", ["0x4D", "0x54", "0x68", "0x64"], {
    mime: "audio/midi",
    extension: "midi",
});
add("doc", ["0xD0", "0xCF", "0x11", "0xE0", "0xA1", "0xB1", "0x1A", "0xE1"], {
    mime: "application/msword",
    extension: "doc",
});
add("xls", ["0xD0", "0xCF", "0x11", "0xE0", "0xA1", "0xB1", "0x1A", "0xE1"], {
    mime: "application/vnd.ms-excel",
    extension: "xls",
});
add("ppt", ["0xD0", "0xCF", "0x11", "0xE0", "0xA1", "0xB1", "0x1A", "0xE1"], {
    mime: "application/vnd.ms-powerpoint",
    extension: "ppt",
});
add("msg", ["0xD0", "0xCF", "0x11", "0xE0", "0xA1", "0xB1", "0x1A", "0xE1"]);
add("dex", ["0x64", "0x65", "0x78", "0x0A", "0x30", "0x33", "0x35", "0x00"]);
add("vmdk", ["0x4B", "0x44", "0x4D"]);
add("crx", ["0x43", "0x72", "0x32", "0x34"]);
add("fh8", ["0x41", "0x47", "0x44", "0x33"]);
add("cwk", [
    "0x05",
    "0x07",
    "0x00",
    "0x00",
    "0x42",
    "0x4F",
    "0x42",
    "0x4F",
    "0x05",
    "0x07",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x01",
]);
add("cwk", [
    "0x06",
    "0x07",
    "0xE1",
    "0x00",
    "0x42",
    "0x4F",
    "0x42",
    "0x4F",
    "0x06",
    "0x07",
    "0xE1",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x01",
]);
add("toast", ["0x45", "0x52", "0x02", "0x00", "0x00", "0x00"]);
add("toast", ["0x8B", "0x45", "0x52", "0x02", "0x00", "0x00", "0x00"]);
add("dmg", ["0x78", "0x01", "0x73", "0x0D", "0x62", "0x62", "0x60"]);
add("xar", ["0x78", "0x61", "0x72", "0x21"]);
add("dat", ["0x50", "0x4D", "0x4F", "0x43", "0x43", "0x4D", "0x4F", "0x43"]);
add("nes", ["0x4E", "0x45", "0x53", "0x1A"]);
add("tar", ["0x75", "0x73", "0x74", "0x61", "0x72", "0x00", "0x30", "0x30"], {
    // As per Mozilla documentation available at:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    // or wikipedia page:
    // https://en.wikipedia.org/wiki/List_of_archive_formats
    mime: "application/x-tar",
    extension: "tar"
}, 0x101);
add("tar", ["0x75", "0x73", "0x74", "0x61", "0x72", "0x20", "0x20", "0x00"], {
    mime: "application/x-tar",
    extension: "tar"
}, 0x101);
add("tox", ["0x74", "0x6F", "0x78", "0x33"]);
add("mlv", ["0x4D", "0x4C", "0x56", "0x49"]);
add("windowsupdate", [
    "0x44",
    "0x43",
    "0x4D",
    "0x01",
    "0x50",
    "0x41",
    "0x33",
    "0x30",
]);
add("7z", ["0x37", "0x7A", "0xBC", "0xAF", "0x27", "0x1C"], {
    mime: "application/x-7z-compressed",
    extension: "7z",
});
add("gz", ["0x1F", "0x8B"], { mime: "application/gzip", extension: "gz" });
add("tar.gz", ["0x1F", "0x8B"], {
    mime: "application/gzip",
    extension: "tar.gz",
});
add("xz", ["0xFD", "0x37", "0x7A", "0x58", "0x5A", "0x00", "0x00"], {
    mime: "application/gzip",
    extension: "xz",
});
add("tar.xz", ["0xFD", "0x37", "0x7A", "0x58", "0x5A", "0x00", "0x00"], {
    mime: "application/gzip",
    extension: "tar.xz",
});
add("lz2", ["0x04", "0x22", "0x4D", "0x18"]);
add("cab", ["0x4D", "0x53", "0x43", "0x46"]);
add("mkv", ["0x1A", "0x45", "0xDF", "0xA3"], {
    mime: "video/x-matroska",
    extension: "mkv",
});
add("mka", ["0x1A", "0x45", "0xDF", "0xA3"], {
    mime: "audio/x-matroska",
    extension: "mka",
});
add("mks", ["0x1A", "0x45", "0xDF", "0xA3"], {
    mime: "video/x-matroska",
    extension: "mks",
});
add("mk3d", ["0x1A", "0x45", "0xDF", "0xA3"]);
add("webm", ["0x1A", "0x45", "0xDF", "0xA3"], {
    mime: "audio/webm",
    extension: "webm",
});
add("dcm", ["0x44", "0x49", "0x43", "0x4D"], undefined, 0x80);
add("xml", ["0x3C", "0x3f", "0x78", "0x6d", "0x6C", "0x20"], {
    mime: "application/xml",
    extension: "xml",
});
add("wasm", ["0x00", "0x61", "0x73", "0x6d"], {
    mime: "application/wasm",
    extension: "wasm",
});
add("lep", ["0xCF", "0x84", "0x01"]);
add("swf", ["0x43", "0x57", "0x53"], {
    mime: "application/x-shockwave-flash",
    extension: "swf",
});
add("swf", ["0x46", "0x57", "0x53"], {
    mime: "application/x-shockwave-flash",
    extension: "swf",
});
add("deb", ["0x21", "0x3C", "0x61", "0x72", "0x63", "0x68", "0x3E"]);
add("rtf", ["0x7B", "0x5C", "0x72", "0x74", "0x66", "0x31"], {
    mime: "application/rtf",
    extension: "rtf",
});
add("m2p", ["0x00", "0x00", "0x01", "0xBA"]);
add("vob", ["0x00", "0x00", "0x01", "0xBA"]);
add("mpg", ["0x00", "0x00", "0x01", "0xBA"], {
    mime: "video/mpeg",
    extension: "mpg",
});
add("mpeg", ["0x00", "0x00", "0x01", "0xBA"], {
    mime: "video/mpeg",
    extension: "mpeg",
});
add("mpeg", ["0x47"], { mime: "video/mpeg", extension: "mpeg" });
add("mpeg", ["0x00", "0x00", "0x01", "0xB3"], {
    mime: "video/mpeg",
    extension: "mpeg",
});
// mov 'free' TODO: find test file
add("mov", ["0x66", "0x72", "0x65", "0x65"], {
    mime: "video/quicktime",
    extension: "mov",
}, 0x4);
// mov 'mdat'
add("mov", ["0x6D", "0x64", "0x61", "0x74"], {
    mime: "video/quicktime",
    extension: "mov",
}, 0x4);
// mov 'moov' TODO: find test file
add("mov", ["0x6D", "0x6F", "0x6F", "0x76"], {
    mime: "video/quicktime",
    extension: "mov",
}, 0x4);
// move 'wide' TODO: find test file
add("mov", ["0x77", "0x69", "0x64", "0x65"], {
    mime: "video/quicktime",
    extension: "mov",
}, 0x4);
// mov 'ftypqt'
add("mov", ["0x66", "0x74", "0x79", "0x70", "0x71", "0x74"], {
    mime: "video/quicktime",
    extension: "mov",
}, 0x4);
add("hl2demo", ["0x48", "0x4C", "0x32", "0x44", "0x45", "0x4D", "0x4F"]);
add("txt", ["0xEF", "0xBB", "0xBF"], {
    mime: "text/plain; charset=UTF-8",
    extension: "txt",
});
add("txt", ["0xFF", "0xFE"], {
    mime: "text/plain; charset=UTF-16LE",
    extension: "txt",
});
add("txt", ["0xFE", "0xFF"], {
    mime: "text/plain; charset=UTF-16BE",
    extension: "txt",
});
add("txt", ["0xFF", "0xFE", "0x00", "0x00"], {
    mime: "text/plain; charset=UTF-32LE",
    extension: "txt",
});
add("txt", ["0x00", "0x00", "0xFE", "0xFF"], {
    mime: "text/plain; charset=UTF-32BE",
    extension: "txt",
});
add("SubRip", ["0x31", "0x0D", "0x0A", "0x30", "0x30", "0x3A"], {
    mime: "application/x-subrip",
    extension: "srt",
});
add("WebVTT", [
    "0xEF",
    "0xBB",
    "0xBF",
    "0x57",
    "0x45",
    "0x42",
    "0x56",
    "0x54",
    "0x54",
    "0x0A",
], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", [
    "0xEF",
    "0xBB",
    "0xBF",
    "0x57",
    "0x45",
    "0x42",
    "0x56",
    "0x54",
    "0x54",
    "0x0D",
], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", [
    "0xEF",
    "0xBB",
    "0xBF",
    "0x57",
    "0x45",
    "0x42",
    "0x56",
    "0x54",
    "0x54",
    "0x20",
], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", [
    "0xEF",
    "0xBB",
    "0xBF",
    "0x57",
    "0x45",
    "0x42",
    "0x56",
    "0x54",
    "0x54",
    "0x09",
], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", ["0x57", "0x45", "0x42", "0x56", "0x54", "0x54", "0x0A"], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", ["0x57", "0x45", "0x42", "0x56", "0x54", "0x54", "0x0D"], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", ["0x57", "0x45", "0x42", "0x56", "0x54", "0x54", "0x20"], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", ["0x57", "0x45", "0x42", "0x56", "0x54", "0x54", "0x09"], {
    mime: "text/vtt",
    extension: "vtt",
});
add("Json", ["0x7B"], {
    mime: "application/json",
    extension: ".json",
});
add("Json", ["0x5B"], {
    mime: "application/json",
    extension: ".json",
});
add("ELF", ["0x7F", "0x45", "0x4C", "0x46"], {
    mime: "application/x-executable",
    extension: ".elf",
});
add("Mach-O", ["0xFE", "0xED", "0xFA", "0xC"], {
    mime: "application/x-mach-binary",
    extension: ".o",
});
add("Mach-O", ["0xFE", "0xED", "0xFA", "0xCF"], {
    mime: "application/x-executable",
    extension: "elf",
});
add("EML", ["0x52", "0x65", "0x63", "0x65", "0x69", "0x76", "0x65", "0x64", "0x3A"], {
    mime: "message/rfc822",
    extension: ".eml",
});
add("SVG", ["0x3c", "0x73", "0x76", "0x67"], {
    mime: "image/svg+xml",
    extension: "svg",
});
patternTree.default = () => tree;

(function (exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.filetypeextension = exports.filetypemime = exports.filetypename = exports.filetypeinfo = void 0;
	const pattern_tree_1 = __importDefault(patternTree);
	const toHex_1 = toHex$1;
	const patternTree$1 = pattern_tree_1.default();
	const filetypeinfo = (bytes) => {
	    let tree = patternTree$1;
	    for (const k of Object.keys(tree.offset)) {
	        const offset = toHex_1.fromHex(k);
	        const offsetExceedsFile = offset >= bytes.length;
	        if (offsetExceedsFile) {
	            continue;
	        }
	        const node = patternTree$1.offset[k];
	        const guessed = walkTree(offset, bytes, node);
	        if (guessed.length > 0) {
	            return guessed;
	        }
	    }
	    if (tree.noOffset === null) {
	        return [];
	    }
	    return walkTree(0, bytes, tree.noOffset);
	};
	exports.filetypeinfo = filetypeinfo;
	const walkTree = (index, bytes, node) => {
	    let step = node;
	    let guessFile = [];
	    while (true) {
	        const currentByte = toHex_1.toHex(bytes[index]);
	        if (step.bytes["?"] && !step.bytes[currentByte]) {
	            step = step.bytes["?"];
	        }
	        else {
	            step = step.bytes[currentByte];
	        }
	        if (!step) {
	            return guessFile;
	        }
	        if (step && step.matches) {
	            guessFile = step.matches.slice(0);
	        }
	        index += 1;
	    }
	};
	exports.default = exports.filetypeinfo;
	const filetypename = (bytes) => exports.filetypeinfo(bytes).map((e) => e.typename);
	exports.filetypename = filetypename;
	const filetypemime = (bytes) => exports.filetypeinfo(bytes)
	    .map((e) => (e.mime ? e.mime : null))
	    .filter((x) => x !== null);
	exports.filetypemime = filetypemime;
	const filetypeextension = (bytes) => exports.filetypeinfo(bytes)
	    .map((e) => (e.extension ? e.extension : null))
	    .filter((x) => x !== null);
	exports.filetypeextension = filetypeextension; 
} (dist));

var cjs = {};

var __defProp$1 = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name$1 = (target, value) => __defProp$1(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/lib/_AsyncQueueEntry.ts
var _AsyncQueueEntry = class _AsyncQueueEntry {
  constructor(queue) {
    __publicField(this, "promise");
    __publicField(this, "resolve");
    __publicField(this, "reject");
    __publicField(this, "queue");
    __publicField(this, "signal", null);
    __publicField(this, "signalListener", null);
    this.queue = queue;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  setSignal(signal) {
    if (signal.aborted) return this;
    this.signal = signal;
    this.signalListener = () => {
      const index = this.queue["promises"].indexOf(this);
      if (index !== -1) this.queue["promises"].splice(index, 1);
      this.reject(new Error("Request aborted manually"));
    };
    this.signal.addEventListener("abort", this.signalListener);
    return this;
  }
  use() {
    this.dispose();
    this.resolve();
    return this;
  }
  abort() {
    this.dispose();
    this.reject(new Error("Request aborted manually"));
    return this;
  }
  dispose() {
    if (this.signal) {
      this.signal.removeEventListener("abort", this.signalListener);
      this.signal = null;
      this.signalListener = null;
    }
  }
};
__name$1(_AsyncQueueEntry, "AsyncQueueEntry");
var AsyncQueueEntry = _AsyncQueueEntry;

// src/lib/AsyncQueue.ts
var _AsyncQueue = class _AsyncQueue {
  constructor() {
    /**
     * The promises array
     */
    __publicField(this, "promises", []);
  }
  /**
   * The amount of entries in the queue, including the head.
   * @seealso {@link queued} for the queued count.
   */
  get remaining() {
    return this.promises.length;
  }
  /**
   * The amount of queued entries.
   * @seealso {@link remaining} for the count with the head.
   */
  get queued() {
    return this.remaining === 0 ? 0 : this.remaining - 1;
  }
  /**
   * Waits for last promise and queues a new one
   * @example
   * ```typescript
   * const queue = new AsyncQueue();
   * async function request(url, options) {
   *     await queue.wait({ signal: options.signal });
   *     try {
   *         const result = await fetch(url, options);
   *         // Do some operations with 'result'
   *     } finally {
   *         // Remove first entry from the queue and resolve for the next entry
   *         queue.shift();
   *     }
   * }
   *
   * request(someUrl1, someOptions1); // Will call fetch() immediately
   * request(someUrl2, someOptions2); // Will call fetch() after the first finished
   * request(someUrl3, someOptions3); // Will call fetch() after the second finished
   * ```
   */
  wait(options) {
    const entry = new AsyncQueueEntry(this);
    if (this.promises.length === 0) {
      this.promises.push(entry);
      return Promise.resolve();
    }
    this.promises.push(entry);
    if (options?.signal) entry.setSignal(options.signal);
    return entry.promise;
  }
  /**
   * Unlocks the head lock and transfers the next lock (if any) to the head.
   */
  shift() {
    if (this.promises.length === 0) return;
    if (this.promises.length === 1) {
      this.promises.shift();
      return;
    }
    this.promises.shift();
    this.promises[0].use();
  }
  /**
   * Aborts all the pending promises.
   * @note To avoid race conditions, this does **not** unlock the head lock.
   */
  abortAll() {
    if (this.queued === 0) return;
    for (let i = 1; i < this.promises.length; ++i) {
      this.promises[i].abort();
    }
    this.promises.length = 1;
  }
};
__name$1(_AsyncQueue, "AsyncQueue");
var AsyncQueue = _AsyncQueue;

cjs.AsyncQueue = AsyncQueue;

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/web.ts
var web_exports = {};
__export(web_exports, {
  ALLOWED_EXTENSIONS: () => ALLOWED_EXTENSIONS,
  ALLOWED_SIZES: () => ALLOWED_SIZES,
  ALLOWED_STICKER_EXTENSIONS: () => ALLOWED_STICKER_EXTENSIONS,
  BurstHandlerMajorIdKey: () => BurstHandlerMajorIdKey,
  CDN: () => CDN,
  DEPRECATION_WARNING_PREFIX: () => DEPRECATION_WARNING_PREFIX,
  DefaultRestOptions: () => DefaultRestOptions,
  DefaultUserAgent: () => DefaultUserAgent,
  DefaultUserAgentAppendix: () => DefaultUserAgentAppendix,
  DiscordAPIError: () => DiscordAPIError,
  HTTPError: () => HTTPError,
  OverwrittenMimeTypes: () => OverwrittenMimeTypes,
  REST: () => REST,
  RESTEvents: () => RESTEvents,
  RateLimitError: () => RateLimitError,
  RequestMethod: () => RequestMethod,
  calculateUserDefaultAvatarIndex: () => calculateUserDefaultAvatarIndex,
  makeURLSearchParams: () => makeURLSearchParams,
  parseResponse: () => parseResponse,
  version: () => version
});
var web = __toCommonJS(web_exports);

// src/environment.ts
var defaultStrategy;
function setDefaultStrategy(newStrategy) {
  defaultStrategy = newStrategy;
}
__name(setDefaultStrategy, "setDefaultStrategy");
function getDefaultStrategy() {
  return defaultStrategy;
}
__name(getDefaultStrategy, "getDefaultStrategy");

// src/lib/utils/constants.ts
var import_util = dist$2;
var import_v10 = v10$a;
var DefaultUserAgent = `DiscordBot (https://discord.js.org, 2.4.0)`;
var DefaultUserAgentAppendix = (0, import_util.getUserAgentAppendix)();
var DefaultRestOptions = {
  agent: null,
  api: "https://discord.com/api",
  authPrefix: "Bot",
  cdn: "https://cdn.discordapp.com",
  headers: {},
  invalidRequestWarningInterval: 0,
  globalRequestsPerSecond: 50,
  offset: 50,
  rejectOnRateLimit: null,
  retries: 3,
  timeout: 15e3,
  userAgentAppendix: DefaultUserAgentAppendix,
  version: import_v10.APIVersion,
  hashSweepInterval: 144e5,
  // 4 Hours
  hashLifetime: 864e5,
  // 24 Hours
  handlerSweepInterval: 36e5,
  // 1 Hour
  async makeRequest(...args) {
    return getDefaultStrategy()(...args);
  },
  mediaProxy: "https://media.discordapp.net"
};
var RESTEvents = /* @__PURE__ */ ((RESTEvents2) => {
  RESTEvents2["Debug"] = "restDebug";
  RESTEvents2["HandlerSweep"] = "handlerSweep";
  RESTEvents2["HashSweep"] = "hashSweep";
  RESTEvents2["InvalidRequestWarning"] = "invalidRequestWarning";
  RESTEvents2["RateLimited"] = "rateLimited";
  RESTEvents2["Response"] = "response";
  return RESTEvents2;
})(RESTEvents || {});
var ALLOWED_EXTENSIONS = ["webp", "png", "jpg", "jpeg", "gif"];
var ALLOWED_STICKER_EXTENSIONS = ["png", "json", "gif"];
var ALLOWED_SIZES = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
var OverwrittenMimeTypes = {
  // https://github.com/discordjs/discord.js/issues/8557
  "image/apng": "image/png"
};
var BurstHandlerMajorIdKey = "burst";
var DEPRECATION_WARNING_PREFIX = "DeprecationWarning";

// src/lib/errors/RateLimitError.ts
var RateLimitError = class _RateLimitError extends Error {
  static {
    __name(this, "RateLimitError");
  }
  timeToReset;
  limit;
  method;
  hash;
  url;
  route;
  majorParameter;
  global;
  retryAfter;
  sublimitTimeout;
  scope;
  constructor({
    timeToReset,
    limit,
    method,
    hash,
    url,
    route,
    majorParameter,
    global,
    retryAfter,
    sublimitTimeout,
    scope
  }) {
    super();
    this.timeToReset = timeToReset;
    this.limit = limit;
    this.method = method;
    this.hash = hash;
    this.url = url;
    this.route = route;
    this.majorParameter = majorParameter;
    this.global = global;
    this.retryAfter = retryAfter;
    this.sublimitTimeout = sublimitTimeout;
    this.scope = scope;
  }
  /**
   * The name of the error
   */
  get name() {
    return `${_RateLimitError.name}[${this.route}]`;
  }
};

// src/lib/utils/types.ts
var RequestMethod = /* @__PURE__ */ ((RequestMethod2) => {
  RequestMethod2["Delete"] = "DELETE";
  RequestMethod2["Get"] = "GET";
  RequestMethod2["Patch"] = "PATCH";
  RequestMethod2["Post"] = "POST";
  RequestMethod2["Put"] = "PUT";
  return RequestMethod2;
})(RequestMethod || {});

// src/lib/utils/utils.ts
function serializeSearchParam(value) {
  switch (typeof value) {
    case "string":
      return value;
    case "number":
    case "bigint":
    case "boolean":
      return value.toString();
    case "object":
      if (value === null) return null;
      if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value.toISOString();
      }
      if (typeof value.toString === "function" && value.toString !== Object.prototype.toString) return value.toString();
      return null;
    default:
      return null;
  }
}
__name(serializeSearchParam, "serializeSearchParam");
function makeURLSearchParams(options) {
  const params = new URLSearchParams();
  if (!options) return params;
  for (const [key, value] of Object.entries(options)) {
    const serialized = serializeSearchParam(value);
    if (serialized !== null) params.append(key, serialized);
  }
  return params;
}
__name(makeURLSearchParams, "makeURLSearchParams");
async function parseResponse(res) {
  if (res.headers.get("Content-Type")?.startsWith("application/json")) {
    return res.json();
  }
  return res.arrayBuffer();
}
__name(parseResponse, "parseResponse");
function hasSublimit(bucketRoute, body, method) {
  if (bucketRoute === "/channels/:id") {
    if (typeof body !== "object" || body === null) return false;
    if (method !== "PATCH" /* Patch */) return false;
    const castedBody = body;
    return ["name", "topic"].some((key) => Reflect.has(castedBody, key));
  }
  return true;
}
__name(hasSublimit, "hasSublimit");
function shouldRetry(error) {
  if (error.name === "AbortError") return true;
  return "code" in error && error.code === "ECONNRESET" || error.message.includes("ECONNRESET");
}
__name(shouldRetry, "shouldRetry");
async function onRateLimit(manager, rateLimitData) {
  const { options } = manager;
  if (!options.rejectOnRateLimit) return;
  const shouldThrow = typeof options.rejectOnRateLimit === "function" ? await options.rejectOnRateLimit(rateLimitData) : options.rejectOnRateLimit.some((route) => rateLimitData.route.startsWith(route.toLowerCase()));
  if (shouldThrow) {
    throw new RateLimitError(rateLimitData);
  }
}
__name(onRateLimit, "onRateLimit");
function calculateUserDefaultAvatarIndex(userId) {
  return Number(BigInt(userId) >> 22n) % 6;
}
__name(calculateUserDefaultAvatarIndex, "calculateUserDefaultAvatarIndex");
async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}
__name(sleep, "sleep");
function isBufferLike(value) {
  return value instanceof ArrayBuffer || value instanceof Uint8Array || value instanceof Uint8ClampedArray;
}
__name(isBufferLike, "isBufferLike");
function deprecationWarning(message) {
  if (typeof globalThis.process === "undefined") {
    console.warn(`${DEPRECATION_WARNING_PREFIX}: ${message}`);
  } else {
    process.emitWarning(message, DEPRECATION_WARNING_PREFIX);
  }
}
__name(deprecationWarning, "deprecationWarning");
function normalizeRateLimitOffset(offset, route) {
  if (typeof offset === "number") {
    return Math.max(0, offset);
  }
  const result = offset(route);
  return Math.max(0, result);
}
__name(normalizeRateLimitOffset, "normalizeRateLimitOffset");

// src/lib/CDN.ts
var deprecationEmittedForEmoji = false;
var CDN = class {
  constructor(cdn = DefaultRestOptions.cdn, mediaProxy = DefaultRestOptions.mediaProxy) {
    this.cdn = cdn;
    this.mediaProxy = mediaProxy;
  }
  static {
    __name(this, "CDN");
  }
  /**
   * Generates an app asset URL for a client's asset.
   *
   * @param clientId - The client id that has the asset
   * @param assetHash - The hash provided by Discord for this asset
   * @param options - Optional options for the asset
   */
  appAsset(clientId, assetHash, options) {
    return this.makeURL(`/app-assets/${clientId}/${assetHash}`, options);
  }
  /**
   * Generates an app icon URL for a client's icon.
   *
   * @param clientId - The client id that has the icon
   * @param iconHash - The hash provided by Discord for this icon
   * @param options - Optional options for the icon
   */
  appIcon(clientId, iconHash, options) {
    return this.makeURL(`/app-icons/${clientId}/${iconHash}`, options);
  }
  /**
   * Generates an avatar URL, e.g. for a user or a webhook.
   *
   * @param id - The id that has the icon
   * @param avatarHash - The hash provided by Discord for this avatar
   * @param options - Optional options for the avatar
   */
  avatar(id, avatarHash, options) {
    return this.dynamicMakeURL(`/avatars/${id}/${avatarHash}`, avatarHash, options);
  }
  avatarDecoration(userIdOrAsset, userAvatarDecoration, options) {
    if (userAvatarDecoration) {
      return this.makeURL(`/avatar-decorations/${userIdOrAsset}/${userAvatarDecoration}`, options);
    }
    return this.makeURL(`/avatar-decoration-presets/${userIdOrAsset}`, { extension: "png" });
  }
  /**
   * Generates a banner URL, e.g. for a user or a guild.
   *
   * @param id - The id that has the banner splash
   * @param bannerHash - The hash provided by Discord for this banner
   * @param options - Optional options for the banner
   */
  banner(id, bannerHash, options) {
    return this.dynamicMakeURL(`/banners/${id}/${bannerHash}`, bannerHash, options);
  }
  /**
   * Generates an icon URL for a channel, e.g. a group DM.
   *
   * @param channelId - The channel id that has the icon
   * @param iconHash - The hash provided by Discord for this channel
   * @param options - Optional options for the icon
   */
  channelIcon(channelId, iconHash, options) {
    return this.makeURL(`/channel-icons/${channelId}/${iconHash}`, options);
  }
  /**
   * Generates a default avatar URL
   *
   * @param index - The default avatar index
   * @remarks
   * To calculate the index for a user do `(userId >> 22) % 6`,
   * or `discriminator % 5` if they're using the legacy username system.
   */
  defaultAvatar(index) {
    return this.makeURL(`/embed/avatars/${index}`, { extension: "png" });
  }
  /**
   * Generates a discovery splash URL for a guild's discovery splash.
   *
   * @param guildId - The guild id that has the discovery splash
   * @param splashHash - The hash provided by Discord for this splash
   * @param options - Optional options for the splash
   */
  discoverySplash(guildId, splashHash, options) {
    return this.makeURL(`/discovery-splashes/${guildId}/${splashHash}`, options);
  }
  emoji(emojiId, options) {
    let resolvedOptions;
    if (typeof options === "string") {
      if (!deprecationEmittedForEmoji) {
        deprecationWarning(
          "Passing a string for the second parameter of CDN#emoji() is deprecated. Use an object instead."
        );
        deprecationEmittedForEmoji = true;
      }
      resolvedOptions = { extension: options };
    } else {
      resolvedOptions = options;
    }
    return this.makeURL(`/emojis/${emojiId}`, resolvedOptions);
  }
  /**
   * Generates a guild member avatar URL.
   *
   * @param guildId - The id of the guild
   * @param userId - The id of the user
   * @param avatarHash - The hash provided by Discord for this avatar
   * @param options - Optional options for the avatar
   */
  guildMemberAvatar(guildId, userId, avatarHash, options) {
    return this.dynamicMakeURL(`/guilds/${guildId}/users/${userId}/avatars/${avatarHash}`, avatarHash, options);
  }
  /**
   * Generates a guild member banner URL.
   *
   * @param guildId - The id of the guild
   * @param userId - The id of the user
   * @param bannerHash - The hash provided by Discord for this banner
   * @param options - Optional options for the banner
   */
  guildMemberBanner(guildId, userId, bannerHash, options) {
    return this.dynamicMakeURL(`/guilds/${guildId}/users/${userId}/banner`, bannerHash, options);
  }
  /**
   * Generates an icon URL, e.g. for a guild.
   *
   * @param id - The id that has the icon splash
   * @param iconHash - The hash provided by Discord for this icon
   * @param options - Optional options for the icon
   */
  icon(id, iconHash, options) {
    return this.dynamicMakeURL(`/icons/${id}/${iconHash}`, iconHash, options);
  }
  /**
   * Generates a URL for the icon of a role
   *
   * @param roleId - The id of the role that has the icon
   * @param roleIconHash - The hash provided by Discord for this role icon
   * @param options - Optional options for the role icon
   */
  roleIcon(roleId, roleIconHash, options) {
    return this.makeURL(`/role-icons/${roleId}/${roleIconHash}`, options);
  }
  /**
   * Generates a guild invite splash URL for a guild's invite splash.
   *
   * @param guildId - The guild id that has the invite splash
   * @param splashHash - The hash provided by Discord for this splash
   * @param options - Optional options for the splash
   */
  splash(guildId, splashHash, options) {
    return this.makeURL(`/splashes/${guildId}/${splashHash}`, options);
  }
  /**
   * Generates a sticker URL.
   *
   * @param stickerId - The sticker id
   * @param extension - The extension of the sticker
   * @privateRemarks
   * Stickers cannot have a `.webp` extension, so we default to a `.png`.
   * Sticker GIFs do not use the CDN base URL.
   */
  sticker(stickerId, extension = "png") {
    return this.makeURL(`/stickers/${stickerId}`, {
      allowedExtensions: ALLOWED_STICKER_EXTENSIONS,
      base: extension === "gif" ? this.mediaProxy : this.cdn,
      extension
    });
  }
  /**
   * Generates a sticker pack banner URL.
   *
   * @param bannerId - The banner id
   * @param options - Optional options for the banner
   */
  stickerPackBanner(bannerId, options) {
    return this.makeURL(`/app-assets/710982414301790216/store/${bannerId}`, options);
  }
  /**
   * Generates a team icon URL for a team's icon.
   *
   * @param teamId - The team id that has the icon
   * @param iconHash - The hash provided by Discord for this icon
   * @param options - Optional options for the icon
   */
  teamIcon(teamId, iconHash, options) {
    return this.makeURL(`/team-icons/${teamId}/${iconHash}`, options);
  }
  /**
   * Generates a cover image for a guild scheduled event.
   *
   * @param scheduledEventId - The scheduled event id
   * @param coverHash - The hash provided by discord for this cover image
   * @param options - Optional options for the cover image
   */
  guildScheduledEventCover(scheduledEventId, coverHash, options) {
    return this.makeURL(`/guild-events/${scheduledEventId}/${coverHash}`, options);
  }
  /**
   * Constructs the URL for the resource, checking whether or not `hash` starts with `a_` if `dynamic` is set to `true`.
   *
   * @param route - The base cdn route
   * @param hash - The hash provided by Discord for this icon
   * @param options - Optional options for the link
   */
  dynamicMakeURL(route, hash, { forceStatic = false, ...options } = {}) {
    return this.makeURL(route, !forceStatic && hash.startsWith("a_") ? { ...options, extension: "gif" } : options);
  }
  /**
   * Constructs the URL for the resource
   *
   * @param route - The base cdn route
   * @param options - The extension/size options for the link
   */
  makeURL(route, {
    allowedExtensions = ALLOWED_EXTENSIONS,
    base = this.cdn,
    extension = "webp",
    size
  } = {}) {
    extension = String(extension).toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      throw new RangeError(`Invalid extension provided: ${extension}
Must be one of: ${allowedExtensions.join(", ")}`);
    }
    if (size && !ALLOWED_SIZES.includes(size)) {
      throw new RangeError(`Invalid size provided: ${size}
Must be one of: ${ALLOWED_SIZES.join(", ")}`);
    }
    const url = new URL(`${base}${route}.${extension}`);
    if (size) {
      url.searchParams.set("size", String(size));
    }
    return url.toString();
  }
};

// src/lib/errors/DiscordAPIError.ts
function isErrorGroupWrapper(error) {
  return Reflect.has(error, "_errors");
}
__name(isErrorGroupWrapper, "isErrorGroupWrapper");
function isErrorResponse(error) {
  return typeof Reflect.get(error, "message") === "string";
}
__name(isErrorResponse, "isErrorResponse");
var DiscordAPIError = class _DiscordAPIError extends Error {
  /**
   * @param rawError - The error reported by Discord
   * @param code - The error code reported by Discord
   * @param status - The status code of the response
   * @param method - The method of the request that erred
   * @param url - The url of the request that erred
   * @param bodyData - The unparsed data for the request that errored
   */
  constructor(rawError, code, status, method, url, bodyData) {
    super(_DiscordAPIError.getMessage(rawError));
    this.rawError = rawError;
    this.code = code;
    this.status = status;
    this.method = method;
    this.url = url;
    this.requestBody = { files: bodyData.files, json: bodyData.body };
  }
  static {
    __name(this, "DiscordAPIError");
  }
  requestBody;
  /**
   * The name of the error
   */
  get name() {
    return `${_DiscordAPIError.name}[${this.code}]`;
  }
  static getMessage(error) {
    let flattened = "";
    if ("code" in error) {
      if (error.errors) {
        flattened = [...this.flattenDiscordError(error.errors)].join("\n");
      }
      return error.message && flattened ? `${error.message}
${flattened}` : error.message || flattened || "Unknown Error";
    }
    return error.error_description ?? "No Description";
  }
  static *flattenDiscordError(obj, key = "") {
    if (isErrorResponse(obj)) {
      return yield `${key.length ? `${key}[${obj.code}]` : `${obj.code}`}: ${obj.message}`.trim();
    }
    for (const [otherKey, val] of Object.entries(obj)) {
      const nextKey = otherKey.startsWith("_") ? key : key ? Number.isNaN(Number(otherKey)) ? `${key}.${otherKey}` : `${key}[${otherKey}]` : otherKey;
      if (typeof val === "string") {
        yield val;
      } else if (isErrorGroupWrapper(val)) {
        for (const error of val._errors) {
          yield* this.flattenDiscordError(error, nextKey);
        }
      } else {
        yield* this.flattenDiscordError(val, nextKey);
      }
    }
  }
};

// src/lib/errors/HTTPError.ts
var HTTPError = class _HTTPError extends Error {
  /**
   * @param status - The status code of the response
   * @param statusText - The status text of the response
   * @param method - The method of the request that erred
   * @param url - The url of the request that erred
   * @param bodyData - The unparsed data for the request that errored
   */
  constructor(status, statusText, method, url, bodyData) {
    super(statusText);
    this.status = status;
    this.method = method;
    this.url = url;
    this.requestBody = { files: bodyData.files, json: bodyData.body };
  }
  static {
    __name(this, "HTTPError");
  }
  requestBody;
  name = _HTTPError.name;
};

// src/lib/REST.ts
var import_collection = dist$1;
var import_snowflake = cjs$1;
var import_async_event_emitter = dist$3;
var import_magic_bytes = dist;

// src/lib/handlers/Shared.ts
var invalidCount = 0;
var invalidCountResetTime = null;
function incrementInvalidCount(manager) {
  if (!invalidCountResetTime || invalidCountResetTime < Date.now()) {
    invalidCountResetTime = Date.now() + 1e3 * 60 * 10;
    invalidCount = 0;
  }
  invalidCount++;
  const emitInvalid = manager.options.invalidRequestWarningInterval > 0 && invalidCount % manager.options.invalidRequestWarningInterval === 0;
  if (emitInvalid) {
    manager.emit("invalidRequestWarning" /* InvalidRequestWarning */, {
      count: invalidCount,
      remainingTime: invalidCountResetTime - Date.now()
    });
  }
}
__name(incrementInvalidCount, "incrementInvalidCount");
async function makeNetworkRequest(manager, routeId, url, options, requestData, retries) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), manager.options.timeout);
  if (requestData.signal) {
    if (requestData.signal.aborted) controller.abort();
    else requestData.signal.addEventListener("abort", () => controller.abort());
  }
  let res;
  try {
    res = await manager.options.makeRequest(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (!(error instanceof Error)) throw error;
    if (shouldRetry(error) && retries !== manager.options.retries) {
      return null;
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
  if (manager.listenerCount("response" /* Response */)) {
    manager.emit(
      "response" /* Response */,
      {
        method: options.method ?? "get",
        path: routeId.original,
        route: routeId.bucketRoute,
        options,
        data: requestData,
        retries
      },
      res instanceof Response ? res.clone() : { ...res }
    );
  }
  return res;
}
__name(makeNetworkRequest, "makeNetworkRequest");
async function handleErrors(manager, res, method, url, requestData, retries) {
  const status = res.status;
  if (status >= 500 && status < 600) {
    if (retries !== manager.options.retries) {
      return null;
    }
    throw new HTTPError(status, res.statusText, method, url, requestData);
  } else {
    if (status >= 400 && status < 500) {
      if (status === 401 && requestData.auth) {
        manager.setToken(null);
      }
      const data = await parseResponse(res);
      throw new DiscordAPIError(data, "code" in data ? data.code : data.error, status, method, url, requestData);
    }
    return res;
  }
}
__name(handleErrors, "handleErrors");

// src/lib/handlers/BurstHandler.ts
var BurstHandler = class {
  /**
   * @param manager - The request manager
   * @param hash - The hash that this RequestHandler handles
   * @param majorParameter - The major parameter for this handler
   */
  constructor(manager, hash, majorParameter) {
    this.manager = manager;
    this.hash = hash;
    this.majorParameter = majorParameter;
    this.id = `${hash}:${majorParameter}`;
  }
  static {
    __name(this, "BurstHandler");
  }
  /**
   * {@inheritdoc IHandler.id}
   */
  id;
  /**
   * {@inheritDoc IHandler.inactive}
   */
  inactive = false;
  /**
   * Emits a debug message
   *
   * @param message - The message to debug
   */
  debug(message) {
    this.manager.emit("restDebug" /* Debug */, `[REST ${this.id}] ${message}`);
  }
  /**
   * {@inheritDoc IHandler.queueRequest}
   */
  async queueRequest(routeId, url, options, requestData) {
    return this.runRequest(routeId, url, options, requestData);
  }
  /**
   * The method that actually makes the request to the API, and updates info about the bucket accordingly
   *
   * @param routeId - The generalized API route with literal ids for major parameters
   * @param url - The fully resolved URL to make the request to
   * @param options - The fetch options needed to make the request
   * @param requestData - Extra data from the user's request needed for errors and additional processing
   * @param retries - The number of retries this request has already attempted (recursion)
   */
  async runRequest(routeId, url, options, requestData, retries = 0) {
    const method = options.method ?? "get";
    const res = await makeNetworkRequest(this.manager, routeId, url, options, requestData, retries);
    if (res === null) {
      return this.runRequest(routeId, url, options, requestData, ++retries);
    }
    const status = res.status;
    let retryAfter = 0;
    const retry = res.headers.get("Retry-After");
    const offset = normalizeRateLimitOffset(this.manager.options.offset, routeId.bucketRoute);
    if (retry) retryAfter = Number(retry) * 1e3 + offset;
    if (status === 401 || status === 403 || status === 429) {
      incrementInvalidCount(this.manager);
    }
    if (status >= 200 && status < 300) {
      return res;
    } else if (status === 429) {
      const isGlobal = res.headers.has("X-RateLimit-Global");
      const scope = res.headers.get("X-RateLimit-Scope") ?? "user";
      await onRateLimit(this.manager, {
        global: isGlobal,
        method,
        url,
        route: routeId.bucketRoute,
        majorParameter: this.majorParameter,
        hash: this.hash,
        limit: Number.POSITIVE_INFINITY,
        timeToReset: retryAfter,
        retryAfter,
        sublimitTimeout: 0,
        scope
      });
      this.debug(
        [
          "Encountered unexpected 429 rate limit",
          `  Global         : ${isGlobal}`,
          `  Method         : ${method}`,
          `  URL            : ${url}`,
          `  Bucket         : ${routeId.bucketRoute}`,
          `  Major parameter: ${routeId.majorParameter}`,
          `  Hash           : ${this.hash}`,
          `  Limit          : ${Number.POSITIVE_INFINITY}`,
          `  Retry After    : ${retryAfter}ms`,
          `  Sublimit       : None`,
          `  Scope          : ${scope}`
        ].join("\n")
      );
      await sleep(retryAfter);
      return this.runRequest(routeId, url, options, requestData, retries);
    } else {
      const handled = await handleErrors(this.manager, res, method, url, requestData, retries);
      if (handled === null) {
        return this.runRequest(routeId, url, options, requestData, ++retries);
      }
      return handled;
    }
  }
};

// src/lib/handlers/SequentialHandler.ts
var import_async_queue = cjs;
var SequentialHandler = class {
  /**
   * @param manager - The request manager
   * @param hash - The hash that this RequestHandler handles
   * @param majorParameter - The major parameter for this handler
   */
  constructor(manager, hash, majorParameter) {
    this.manager = manager;
    this.hash = hash;
    this.majorParameter = majorParameter;
    this.id = `${hash}:${majorParameter}`;
  }
  static {
    __name(this, "SequentialHandler");
  }
  /**
   * {@inheritDoc IHandler.id}
   */
  id;
  /**
   * The time this rate limit bucket will reset
   */
  reset = -1;
  /**
   * The remaining requests that can be made before we are rate limited
   */
  remaining = 1;
  /**
   * The total number of requests that can be made before we are rate limited
   */
  limit = Number.POSITIVE_INFINITY;
  /**
   * The interface used to sequence async requests sequentially
   */
  #asyncQueue = new import_async_queue.AsyncQueue();
  /**
   * The interface used to sequence sublimited async requests sequentially
   */
  #sublimitedQueue = null;
  /**
   * A promise wrapper for when the sublimited queue is finished being processed or null when not being processed
   */
  #sublimitPromise = null;
  /**
   * Whether the sublimit queue needs to be shifted in the finally block
   */
  #shiftSublimit = false;
  /**
   * {@inheritDoc IHandler.inactive}
   */
  get inactive() {
    return this.#asyncQueue.remaining === 0 && (this.#sublimitedQueue === null || this.#sublimitedQueue.remaining === 0) && !this.limited;
  }
  /**
   * If the rate limit bucket is currently limited by the global limit
   */
  get globalLimited() {
    return this.manager.globalRemaining <= 0 && Date.now() < this.manager.globalReset;
  }
  /**
   * If the rate limit bucket is currently limited by its limit
   */
  get localLimited() {
    return this.remaining <= 0 && Date.now() < this.reset;
  }
  /**
   * If the rate limit bucket is currently limited
   */
  get limited() {
    return this.globalLimited || this.localLimited;
  }
  /**
   * The time until queued requests can continue
   */
  getTimeToReset(routeId) {
    const offset = normalizeRateLimitOffset(this.manager.options.offset, routeId.bucketRoute);
    return this.reset + offset - Date.now();
  }
  /**
   * Emits a debug message
   *
   * @param message - The message to debug
   */
  debug(message) {
    this.manager.emit("restDebug" /* Debug */, `[REST ${this.id}] ${message}`);
  }
  /**
   * Delay all requests for the specified amount of time, handling global rate limits
   *
   * @param time - The amount of time to delay all requests for
   */
  async globalDelayFor(time) {
    await sleep(time);
    this.manager.globalDelay = null;
  }
  /**
   * {@inheritDoc IHandler.queueRequest}
   */
  async queueRequest(routeId, url, options, requestData) {
    let queue = this.#asyncQueue;
    let queueType = 0 /* Standard */;
    if (this.#sublimitedQueue && hasSublimit(routeId.bucketRoute, requestData.body, options.method)) {
      queue = this.#sublimitedQueue;
      queueType = 1 /* Sublimit */;
    }
    await queue.wait({ signal: requestData.signal });
    if (queueType === 0 /* Standard */) {
      if (this.#sublimitedQueue && hasSublimit(routeId.bucketRoute, requestData.body, options.method)) {
        queue = this.#sublimitedQueue;
        const wait = queue.wait();
        this.#asyncQueue.shift();
        await wait;
      } else if (this.#sublimitPromise) {
        await this.#sublimitPromise.promise;
      }
    }
    try {
      return await this.runRequest(routeId, url, options, requestData);
    } finally {
      queue.shift();
      if (this.#shiftSublimit) {
        this.#shiftSublimit = false;
        this.#sublimitedQueue?.shift();
      }
      if (this.#sublimitedQueue?.remaining === 0) {
        this.#sublimitPromise?.resolve();
        this.#sublimitedQueue = null;
      }
    }
  }
  /**
   * The method that actually makes the request to the api, and updates info about the bucket accordingly
   *
   * @param routeId - The generalized api route with literal ids for major parameters
   * @param url - The fully resolved url to make the request to
   * @param options - The fetch options needed to make the request
   * @param requestData - Extra data from the user's request needed for errors and additional processing
   * @param retries - The number of retries this request has already attempted (recursion)
   */
  async runRequest(routeId, url, options, requestData, retries = 0) {
    while (this.limited) {
      const isGlobal = this.globalLimited;
      let limit2;
      let timeout;
      let delay;
      if (isGlobal) {
        const offset2 = normalizeRateLimitOffset(this.manager.options.offset, routeId.bucketRoute);
        limit2 = this.manager.options.globalRequestsPerSecond;
        timeout = this.manager.globalReset + offset2 - Date.now();
        if (!this.manager.globalDelay) {
          this.manager.globalDelay = this.globalDelayFor(timeout);
        }
        delay = this.manager.globalDelay;
      } else {
        limit2 = this.limit;
        timeout = this.getTimeToReset(routeId);
        delay = sleep(timeout);
      }
      const rateLimitData = {
        global: isGlobal,
        method: options.method ?? "get",
        url,
        route: routeId.bucketRoute,
        majorParameter: this.majorParameter,
        hash: this.hash,
        limit: limit2,
        timeToReset: timeout,
        retryAfter: timeout,
        sublimitTimeout: 0,
        scope: "user"
      };
      this.manager.emit("rateLimited" /* RateLimited */, rateLimitData);
      await onRateLimit(this.manager, rateLimitData);
      if (isGlobal) {
        this.debug(`Global rate limit hit, blocking all requests for ${timeout}ms`);
      } else {
        this.debug(`Waiting ${timeout}ms for rate limit to pass`);
      }
      await delay;
    }
    if (!this.manager.globalReset || this.manager.globalReset < Date.now()) {
      this.manager.globalReset = Date.now() + 1e3;
      this.manager.globalRemaining = this.manager.options.globalRequestsPerSecond;
    }
    this.manager.globalRemaining--;
    const method = options.method ?? "get";
    const res = await makeNetworkRequest(this.manager, routeId, url, options, requestData, retries);
    if (res === null) {
      return this.runRequest(routeId, url, options, requestData, ++retries);
    }
    const status = res.status;
    let retryAfter = 0;
    const limit = res.headers.get("X-RateLimit-Limit");
    const remaining = res.headers.get("X-RateLimit-Remaining");
    const reset = res.headers.get("X-RateLimit-Reset-After");
    const hash = res.headers.get("X-RateLimit-Bucket");
    const retry = res.headers.get("Retry-After");
    const scope = res.headers.get("X-RateLimit-Scope") ?? "user";
    const offset = normalizeRateLimitOffset(this.manager.options.offset, routeId.bucketRoute);
    this.limit = limit ? Number(limit) : Number.POSITIVE_INFINITY;
    this.remaining = remaining ? Number(remaining) : 1;
    this.reset = reset ? Number(reset) * 1e3 + Date.now() + offset : Date.now();
    if (retry) retryAfter = Number(retry) * 1e3 + offset;
    if (hash && hash !== this.hash) {
      this.debug(["Received bucket hash update", `  Old Hash  : ${this.hash}`, `  New Hash  : ${hash}`].join("\n"));
      this.manager.hashes.set(`${method}:${routeId.bucketRoute}`, { value: hash, lastAccess: Date.now() });
    } else if (hash) {
      const hashData = this.manager.hashes.get(`${method}:${routeId.bucketRoute}`);
      if (hashData) {
        hashData.lastAccess = Date.now();
      }
    }
    let sublimitTimeout = null;
    if (retryAfter > 0) {
      if (res.headers.has("X-RateLimit-Global")) {
        this.manager.globalRemaining = 0;
        this.manager.globalReset = Date.now() + retryAfter;
      } else if (!this.localLimited) {
        sublimitTimeout = retryAfter;
      }
    }
    if (status === 401 || status === 403 || status === 429) {
      incrementInvalidCount(this.manager);
    }
    if (res.ok) {
      return res;
    } else if (status === 429) {
      const isGlobal = this.globalLimited;
      let limit2;
      let timeout;
      if (isGlobal) {
        const offset2 = normalizeRateLimitOffset(this.manager.options.offset, routeId.bucketRoute);
        limit2 = this.manager.options.globalRequestsPerSecond;
        timeout = this.manager.globalReset + offset2 - Date.now();
      } else {
        limit2 = this.limit;
        timeout = this.getTimeToReset(routeId);
      }
      await onRateLimit(this.manager, {
        global: isGlobal,
        method,
        url,
        route: routeId.bucketRoute,
        majorParameter: this.majorParameter,
        hash: this.hash,
        limit: limit2,
        timeToReset: timeout,
        retryAfter,
        sublimitTimeout: sublimitTimeout ?? 0,
        scope
      });
      this.debug(
        [
          "Encountered unexpected 429 rate limit",
          `  Global         : ${isGlobal.toString()}`,
          `  Method         : ${method}`,
          `  URL            : ${url}`,
          `  Bucket         : ${routeId.bucketRoute}`,
          `  Major parameter: ${routeId.majorParameter}`,
          `  Hash           : ${this.hash}`,
          `  Limit          : ${limit2}`,
          `  Retry After    : ${retryAfter}ms`,
          `  Sublimit       : ${sublimitTimeout ? `${sublimitTimeout}ms` : "None"}`,
          `  Scope          : ${scope}`
        ].join("\n")
      );
      if (sublimitTimeout) {
        const firstSublimit = !this.#sublimitedQueue;
        if (firstSublimit) {
          this.#sublimitedQueue = new import_async_queue.AsyncQueue();
          void this.#sublimitedQueue.wait();
          this.#asyncQueue.shift();
        }
        this.#sublimitPromise?.resolve();
        this.#sublimitPromise = null;
        await sleep(sublimitTimeout);
        let resolve;
        const promise = new Promise((res2) => resolve = res2);
        this.#sublimitPromise = { promise, resolve };
        if (firstSublimit) {
          await this.#asyncQueue.wait();
          this.#shiftSublimit = true;
        }
      }
      return this.runRequest(routeId, url, options, requestData, retries);
    } else {
      const handled = await handleErrors(this.manager, res, method, url, requestData, retries);
      if (handled === null) {
        return this.runRequest(routeId, url, options, requestData, ++retries);
      }
      return handled;
    }
  }
};

// src/lib/REST.ts
var REST = class _REST extends import_async_event_emitter.AsyncEventEmitter {
  static {
    __name(this, "REST");
  }
  /**
   * The {@link https://undici.nodejs.org/#/docs/api/Agent | Agent} for all requests
   * performed by this manager.
   */
  agent = null;
  cdn;
  /**
   * The number of requests remaining in the global bucket
   */
  globalRemaining;
  /**
   * The promise used to wait out the global rate limit
   */
  globalDelay = null;
  /**
   * The timestamp at which the global bucket resets
   */
  globalReset = -1;
  /**
   * API bucket hashes that are cached from provided routes
   */
  hashes = new import_collection.Collection();
  /**
   * Request handlers created from the bucket hash and the major parameters
   */
  handlers = new import_collection.Collection();
  #token = null;
  hashTimer;
  handlerTimer;
  options;
  constructor(options = {}) {
    super();
    this.cdn = new CDN(options.cdn ?? DefaultRestOptions.cdn, options.mediaProxy ?? DefaultRestOptions.mediaProxy);
    this.options = { ...DefaultRestOptions, ...options };
    this.globalRemaining = Math.max(1, this.options.globalRequestsPerSecond);
    this.agent = options.agent ?? null;
    this.setupSweepers();
  }
  setupSweepers() {
    const validateMaxInterval = /* @__PURE__ */ __name((interval) => {
      if (interval > 144e5) {
        throw new Error("Cannot set an interval greater than 4 hours");
      }
    }, "validateMaxInterval");
    if (this.options.hashSweepInterval !== 0 && this.options.hashSweepInterval !== Number.POSITIVE_INFINITY) {
      validateMaxInterval(this.options.hashSweepInterval);
      this.hashTimer = setInterval(() => {
        const sweptHashes = new import_collection.Collection();
        const currentDate = Date.now();
        this.hashes.sweep((val, key) => {
          if (val.lastAccess === -1) return false;
          const shouldSweep = Math.floor(currentDate - val.lastAccess) > this.options.hashLifetime;
          if (shouldSweep) {
            sweptHashes.set(key, val);
            this.emit("restDebug" /* Debug */, `Hash ${val.value} for ${key} swept due to lifetime being exceeded`);
          }
          return shouldSweep;
        });
        this.emit("hashSweep" /* HashSweep */, sweptHashes);
      }, this.options.hashSweepInterval);
      this.hashTimer.unref?.();
    }
    if (this.options.handlerSweepInterval !== 0 && this.options.handlerSweepInterval !== Number.POSITIVE_INFINITY) {
      validateMaxInterval(this.options.handlerSweepInterval);
      this.handlerTimer = setInterval(() => {
        const sweptHandlers = new import_collection.Collection();
        this.handlers.sweep((val, key) => {
          const { inactive } = val;
          if (inactive) {
            sweptHandlers.set(key, val);
            this.emit("restDebug" /* Debug */, `Handler ${val.id} for ${key} swept due to being inactive`);
          }
          return inactive;
        });
        this.emit("handlerSweep" /* HandlerSweep */, sweptHandlers);
      }, this.options.handlerSweepInterval);
      this.handlerTimer.unref?.();
    }
  }
  /**
   * Runs a get request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  async get(fullRoute, options = {}) {
    return this.request({ ...options, fullRoute, method: "GET" /* Get */ });
  }
  /**
   * Runs a delete request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  async delete(fullRoute, options = {}) {
    return this.request({ ...options, fullRoute, method: "DELETE" /* Delete */ });
  }
  /**
   * Runs a post request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  async post(fullRoute, options = {}) {
    return this.request({ ...options, fullRoute, method: "POST" /* Post */ });
  }
  /**
   * Runs a put request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  async put(fullRoute, options = {}) {
    return this.request({ ...options, fullRoute, method: "PUT" /* Put */ });
  }
  /**
   * Runs a patch request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  async patch(fullRoute, options = {}) {
    return this.request({ ...options, fullRoute, method: "PATCH" /* Patch */ });
  }
  /**
   * Runs a request from the api
   *
   * @param options - Request options
   */
  async request(options) {
    const response = await this.queueRequest(options);
    return parseResponse(response);
  }
  /**
   * Sets the default agent to use for requests performed by this manager
   *
   * @param agent - The agent to use
   */
  setAgent(agent) {
    this.agent = agent;
    return this;
  }
  /**
   * Sets the authorization token that should be used for requests
   *
   * @param token - The authorization token to use
   */
  setToken(token) {
    this.#token = token;
    return this;
  }
  /**
   * Queues a request to be sent
   *
   * @param request - All the information needed to make a request
   * @returns The response from the api request
   */
  async queueRequest(request) {
    const routeId = _REST.generateRouteData(request.fullRoute, request.method);
    const hash = this.hashes.get(`${request.method}:${routeId.bucketRoute}`) ?? {
      value: `Global(${request.method}:${routeId.bucketRoute})`,
      lastAccess: -1
    };
    const handler = this.handlers.get(`${hash.value}:${routeId.majorParameter}`) ?? this.createHandler(hash.value, routeId.majorParameter);
    const { url, fetchOptions } = await this.resolveRequest(request);
    return handler.queueRequest(routeId, url, fetchOptions, {
      body: request.body,
      files: request.files,
      auth: request.auth !== false,
      signal: request.signal
    });
  }
  /**
   * Creates a new rate limit handler from a hash, based on the hash and the major parameter
   *
   * @param hash - The hash for the route
   * @param majorParameter - The major parameter for this handler
   * @internal
   */
  createHandler(hash, majorParameter) {
    const queue = majorParameter === BurstHandlerMajorIdKey ? new BurstHandler(this, hash, majorParameter) : new SequentialHandler(this, hash, majorParameter);
    this.handlers.set(queue.id, queue);
    return queue;
  }
  /**
   * Formats the request data to a usable format for fetch
   *
   * @param request - The request data
   */
  async resolveRequest(request) {
    const { options } = this;
    let query = "";
    if (request.query) {
      const resolvedQuery = request.query.toString();
      if (resolvedQuery !== "") {
        query = `?${resolvedQuery}`;
      }
    }
    const headers = {
      ...this.options.headers,
      "User-Agent": `${DefaultUserAgent} ${options.userAgentAppendix}`.trim()
    };
    if (request.auth !== false) {
      if (!this.#token) {
        throw new Error("Expected token to be set for this request, but none was present");
      }
      headers.Authorization = `${request.authPrefix ?? this.options.authPrefix} ${this.#token}`;
    }
    if (request.reason?.length) {
      headers["X-Audit-Log-Reason"] = encodeURIComponent(request.reason);
    }
    const url = `${options.api}${request.versioned === false ? "" : `/v${options.version}`}${request.fullRoute}${query}`;
    let finalBody;
    let additionalHeaders = {};
    if (request.files?.length) {
      const formData = new FormData();
      for (const [index, file] of request.files.entries()) {
        const fileKey = file.key ?? `files[${index}]`;
        if (isBufferLike(file.data)) {
          let contentType = file.contentType;
          if (!contentType) {
            const [parsedType] = (0, import_magic_bytes.filetypeinfo)(file.data);
            if (parsedType) {
              contentType = OverwrittenMimeTypes[parsedType.mime] ?? parsedType.mime ?? "application/octet-stream";
            }
          }
          formData.append(fileKey, new Blob([file.data], { type: contentType }), file.name);
        } else {
          formData.append(fileKey, new Blob([`${file.data}`], { type: file.contentType }), file.name);
        }
      }
      if (request.body != null) {
        if (request.appendToFormData) {
          for (const [key, value] of Object.entries(request.body)) {
            formData.append(key, value);
          }
        } else {
          formData.append("payload_json", JSON.stringify(request.body));
        }
      }
      finalBody = formData;
    } else if (request.body != null) {
      if (request.passThroughBody) {
        finalBody = request.body;
      } else {
        finalBody = JSON.stringify(request.body);
        additionalHeaders = { "Content-Type": "application/json" };
      }
    }
    const method = request.method.toUpperCase();
    const fetchOptions = {
      // Set body to null on get / head requests. This does not follow fetch spec (likely because it causes subtle bugs) but is aligned with what request was doing
      body: ["GET", "HEAD"].includes(method) ? null : finalBody,
      headers: { ...request.headers, ...additionalHeaders, ...headers },
      method,
      // Prioritize setting an agent per request, use the agent for this instance otherwise.
      dispatcher: request.dispatcher ?? this.agent ?? void 0
    };
    return { url, fetchOptions };
  }
  /**
   * Stops the hash sweeping interval
   */
  clearHashSweeper() {
    clearInterval(this.hashTimer);
  }
  /**
   * Stops the request handler sweeping interval
   */
  clearHandlerSweeper() {
    clearInterval(this.handlerTimer);
  }
  /**
   * Generates route data for an endpoint:method
   *
   * @param endpoint - The raw endpoint to generalize
   * @param method - The HTTP method this endpoint is called without
   * @internal
   */
  static generateRouteData(endpoint, method) {
    if (endpoint.startsWith("/interactions/") && endpoint.endsWith("/callback")) {
      return {
        majorParameter: BurstHandlerMajorIdKey,
        bucketRoute: "/interactions/:id/:token/callback",
        original: endpoint
      };
    }
    const majorIdMatch = /(?:^\/webhooks\/(\d{17,19}\/[^/?]+))|(?:^\/(?:channels|guilds|webhooks)\/(\d{17,19}))/.exec(
      endpoint
    );
    const majorId = majorIdMatch?.[2] ?? majorIdMatch?.[1] ?? "global";
    const baseRoute = endpoint.replaceAll(/\d{17,19}/g, ":id").replace(/\/reactions\/(.*)/, "/reactions/:reaction").replace(/\/webhooks\/:id\/[^/?]+/, "/webhooks/:id/:token");
    let exceptions = "";
    if (method === "DELETE" /* Delete */ && baseRoute === "/channels/:id/messages/:id") {
      const id = /\d{17,19}$/.exec(endpoint)[0];
      const timestamp = import_snowflake.DiscordSnowflake.timestampFrom(id);
      if (Date.now() - timestamp > 1e3 * 60 * 60 * 24 * 14) {
        exceptions += "/Delete Old Message";
      }
    }
    return {
      majorParameter: majorId,
      bucketRoute: baseRoute + exceptions,
      original: endpoint
    };
  }
};

// src/shared.ts
var version = "2.4.0";

// src/web.ts
setDefaultStrategy(fetch);

var __classPrivateFieldGet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Client_refreshToken, _Client_transport, _Client_user, _Client_application, _Client_rest, _Client_refreshTimeout, _Client_connectionPromise, _Client__nonceMap;
Object.defineProperty(Client$1, "__esModule", { value: true });
Client$1.Client = void 0;
const v10_1 = v10$l;
const async_event_emitter_1 = dist$3;
const IPC_1 = IPC;
const WebSocket_1 = WebSocket$3;
const ClientUser_1 = ClientUser$1;
const RPCError_1 = RPCError$1;
const rest_1 = web;
const node_crypto_1 = __importDefault(require$$2$2);
const Transport_1 = Transport$1;
class Client extends async_event_emitter_1.AsyncEventEmitter {
    get user() {
        return __classPrivateFieldGet(this, _Client_user, "f");
    }
    get application() {
        return __classPrivateFieldGet(this, _Client_application, "f");
    }
    get transport() {
        return __classPrivateFieldGet(this, _Client_transport, "f");
    }
    get isConnected() {
        return __classPrivateFieldGet(this, _Client_transport, "f").isConnected;
    }
    constructor(options) {
        super();
        /**
         * application id
         */
        Object.defineProperty(this, "clientId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * application secret
         */
        Object.defineProperty(this, "clientSecret", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * pipe id
         */
        Object.defineProperty(this, "pipeId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _Client_refreshToken.set(this, void 0);
        /**
         * transport instance
         */
        _Client_transport.set(this, void 0);
        /**
         * current user
         */
        _Client_user.set(this, void 0);
        /**
         * current application
         */
        _Client_application.set(this, void 0);
        _Client_rest.set(this, void 0);
        _Client_refreshTimeout.set(this, void 0);
        _Client_connectionPromise.set(this, void 0);
        _Client__nonceMap.set(this, new Map());
        this.clientId = options.clientId;
        this.clientSecret = options.clientSecret;
        this.pipeId = options.pipeId;
        __classPrivateFieldSet(this, _Client_rest, new rest_1.REST({ version: "10" }).setToken("this-is-a-dummy"), "f");
        __classPrivateFieldSet(this, _Client_transport, options.transport?.type === undefined || options.transport.type === "ipc"
            ? new IPC_1.IPCTransport({
                client: this,
                pathList: options.transport?.pathList
            })
            : new (options.transport.type === "websocket" ? WebSocket_1.WebSocketTransport : options.transport.type)({
                client: this
            }), "f");
        __classPrivateFieldGet(this, _Client_transport, "f").on("message", (message) => {
            if (message.cmd === "DISPATCH" && message.evt === "READY") {
                if (message.data.user)
                    __classPrivateFieldSet(this, _Client_user, new ClientUser_1.ClientUser(this, message.data.user), "f");
                if (message.data.config && message.data.config.cdn_host)
                    __classPrivateFieldGet(this, _Client_rest, "f").options.cdn = message.data.config.cdn_host;
                this.emit("connected");
            }
            else {
                if (message.nonce && __classPrivateFieldGet(this, _Client__nonceMap, "f").has(message.nonce)) {
                    const nonceObj = __classPrivateFieldGet(this, _Client__nonceMap, "f").get(message.nonce);
                    if (message.evt === "ERROR") {
                        nonceObj.error.code = message.data.code;
                        nonceObj.error.message = message.data.message;
                        nonceObj?.reject(nonceObj.error);
                    }
                    else
                        nonceObj?.resolve(message);
                    __classPrivateFieldGet(this, _Client__nonceMap, "f").delete(message.nonce);
                }
                this.emit(message.evt, message.data);
            }
        });
    }
    /**
     * @hidden
     */
    async request(cmd, args, evt) {
        const error = new RPCError_1.RPCError(Transport_1.RPC_ERROR_CODE.UNKNOWN_ERROR);
        RPCError_1.RPCError.captureStackTrace(error, this.request);
        return new Promise((resolve, reject) => {
            const nonce = node_crypto_1.default.randomUUID();
            __classPrivateFieldGet(this, _Client_transport, "f").send({ cmd, args, evt, nonce });
            __classPrivateFieldGet(this, _Client__nonceMap, "f").set(nonce, { resolve, reject, error });
        });
    }
    // #endregion
    // #region Authorization handlers
    async authenticate(accessToken) {
        const { application, user } = (await this.request("AUTHENTICATE", { access_token: accessToken })).data;
        __classPrivateFieldSet(this, _Client_application, application, "f");
        __classPrivateFieldSet(this, _Client_user, new ClientUser_1.ClientUser(this, user), "f");
        this.emit("ready");
    }
    async refreshAccessToken() {
        this.emit("debug", "CLIENT | Refreshing access token!");
        const exchangeResponse = await __classPrivateFieldGet(this, _Client_rest, "f").post(v10_1.Routes.oauth2TokenExchange(), {
            body: new URLSearchParams({
                client_id: this.clientId,
                client_secret: this.clientSecret ?? "",
                grant_type: "refresh_token",
                refresh_token: __classPrivateFieldGet(this, _Client_refreshToken, "f") ?? ""
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            passThroughBody: true
        });
        this.hanleAccessTokenResponse(exchangeResponse);
        this.emit("debug", "CLIENT | Access token refreshed!");
        return exchangeResponse.access_token;
    }
    hanleAccessTokenResponse(data) {
        if (!("access_token" in data) ||
            !("refresh_token" in data) ||
            !("expires_in" in data) ||
            !("token_type" in data))
            throw new TypeError(`Invalid access token response!\nData: ${JSON.stringify(data, null, 2)}`);
        __classPrivateFieldGet(this, _Client_rest, "f").setToken(data.access_token);
        __classPrivateFieldGet(this, _Client_rest, "f").options.authPrefix = data.token_type;
        __classPrivateFieldSet(this, _Client_refreshToken, data.refresh_token, "f");
        __classPrivateFieldSet(this, _Client_refreshTimeout, setTimeout(() => void this.refreshAccessToken(), data.expires_in), "f");
    }
    async authorize(options) {
        if (!this.clientSecret)
            throw new ReferenceError("Client secret is required for authorization!");
        let rpcToken;
        if (options.useRPCToken) {
            rpcToken = // Sadly discord-api-types doesn't have the oauth2/token/rpc endpoint
                (await __classPrivateFieldGet(this, _Client_rest, "f").post("/oauth2/token/rpc", {
                    body: new URLSearchParams({
                        client_id: this.clientId,
                        client_secret: this.clientSecret
                    }),
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    }
                })).rpc_token;
        }
        const { code } = (await this.request("AUTHORIZE", {
            scopes: options.scopes,
            client_id: this.clientId,
            rpc_token: options.useRPCToken ? rpcToken : undefined,
            prompt: options.prompt ?? "consent"
        })).data;
        const exchangeResponse = await __classPrivateFieldGet(this, _Client_rest, "f").post(v10_1.Routes.oauth2TokenExchange(), {
            body: new URLSearchParams({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: "authorization_code",
                code
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            passThroughBody: true
        });
        this.hanleAccessTokenResponse(exchangeResponse);
        return exchangeResponse.access_token;
    }
    // #endregion
    /**
     * Used to subscribe to events. `evt` of the payload should be set to the event being subscribed to. `args` of the payload should be set to the args needed for the event.
     * @param event event name now subscribed to
     * @param args args for the event
     * @returns an object to unsubscribe from the event
     */
    async subscribe(event, args) {
        await this.request("SUBSCRIBE", args, event);
        return {
            /**
             * Unsubscribes from the event
             */
            unsubscribe: () => this.request("UNSUBSCRIBE", args, event)
        };
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * connect to the local rpc server
     */
    async connect() {
        if (__classPrivateFieldGet(this, _Client_connectionPromise, "f"))
            return __classPrivateFieldGet(this, _Client_connectionPromise, "f");
        const error = new RPCError_1.RPCError(Transport_1.RPC_ERROR_CODE.UNKNOWN_ERROR);
        RPCError_1.RPCError.captureStackTrace(error, this.connect);
        __classPrivateFieldSet(this, _Client_connectionPromise, new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                __classPrivateFieldSet(this, _Client_connectionPromise, undefined, "f");
                error.code = Transport_1.CUSTOM_RPC_ERROR_CODE.CONNECTION_TIMEOUT;
                error.message = "Connection timed out";
                reject(error);
            }, 10e3);
            if (typeof timeout === "object" && "unref" in timeout)
                timeout.unref();
            this.once("connected", () => {
                __classPrivateFieldSet(this, _Client_connectionPromise, undefined, "f");
                __classPrivateFieldGet(this, _Client_transport, "f").once("close", (reason) => {
                    __classPrivateFieldGet(this, _Client__nonceMap, "f").forEach((promise) => {
                        promise.error.code =
                            typeof reason === "object" ? reason.code : Transport_1.CUSTOM_RPC_ERROR_CODE.CONNECTION_ENDED;
                        promise.error.message =
                            typeof reason === "object" ? reason.message : (reason ?? "Connection ended");
                        promise.reject(promise.error);
                    });
                    this.emit("disconnected");
                });
                clearTimeout(timeout);
                resolve();
            });
            __classPrivateFieldGet(this, _Client_transport, "f").connect().catch(reject);
        }), "f");
        return __classPrivateFieldGet(this, _Client_connectionPromise, "f");
    }
    /**
     * will try to authorize if a scope is specified, else it's the same as `connect()`
     * @param options options for the authorization
     */
    async login(options) {
        await this.connect();
        if (!options || !options.scopes) {
            this.emit("ready");
            return;
        }
        let accessToken = "";
        if (options.refreshToken) {
            __classPrivateFieldSet(this, _Client_refreshToken, options.refreshToken, "f");
            accessToken = await this.refreshAccessToken();
        }
        else {
            if (!this.clientSecret)
                throw new ReferenceError("Client secret is required for authorization!");
            accessToken = await this.authorize(options);
        }
        await this.authenticate(accessToken);
    }
    /**
     * disconnects from the local rpc server
     */
    async destroy() {
        if (__classPrivateFieldGet(this, _Client_refreshTimeout, "f")) {
            clearTimeout(__classPrivateFieldGet(this, _Client_refreshTimeout, "f"));
            __classPrivateFieldSet(this, _Client_refreshTimeout, undefined, "f");
            __classPrivateFieldSet(this, _Client_refreshToken, undefined, "f");
        }
        await __classPrivateFieldGet(this, _Client_transport, "f").close();
    }
    getCdn() {
        return __classPrivateFieldGet(this, _Client_rest, "f").cdn;
    }
}
Client$1.Client = Client;
_Client_refreshToken = new WeakMap(), _Client_transport = new WeakMap(), _Client_user = new WeakMap(), _Client_application = new WeakMap(), _Client_rest = new WeakMap(), _Client_refreshTimeout = new WeakMap(), _Client_connectionPromise = new WeakMap(), _Client__nonceMap = new WeakMap();

var CertifiedDevice$1 = {};

Object.defineProperty(CertifiedDevice$1, "__esModule", { value: true });
CertifiedDevice$1.CertifiedDevice = CertifiedDevice$1.DeviceType = void 0;
const Base_1 = Base$1;
var DeviceType;
(function (DeviceType) {
    DeviceType["AUDIO_INPUT"] = "audioinput";
    DeviceType["AUDIO_OUTPUT"] = "audiooutput";
    DeviceType["VIDEO_INPUT"] = "videoinput";
})(DeviceType || (CertifiedDevice$1.DeviceType = DeviceType = {}));
class CertifiedDevice extends Base_1.Base {
    constructor(client, props) {
        super(client);
        /**
         * the type of device
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * the device's Windows UUID
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * the hardware vendor
         */
        Object.defineProperty(this, "vendor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * the model of the product
         */
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * UUIDs of related devices
         */
        Object.defineProperty(this, "related", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * if the device's native echo cancellation is enabled
         */
        Object.defineProperty(this, "echo_cancellation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * if the device's native noise suppression is enabled
         */
        Object.defineProperty(this, "noise_suppression", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * if the device's native automatic gain control is enabled
         */
        Object.defineProperty(this, "automatic_gain_control", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * if the device is hardware muted
         */
        Object.defineProperty(this, "hardware_mute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.assign(this, props);
        this.type = props.type;
        this.id = props.id;
        this.vendor = props.vendor;
        this.model = props.model;
        this.related = props.related;
    }
}
CertifiedDevice$1.CertifiedDevice = CertifiedDevice;

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WebSocket = exports.IPC = void 0;
	__exportStar(Client$1, exports);
	__exportStar(ClientUser$1, exports);
	__exportStar(CertifiedDevice$1, exports);
	__exportStar(Channel$1, exports);
	__exportStar(Guild$1, exports);
	__exportStar(User$1, exports);
	__exportStar(VoiceSettings$1, exports);
	__exportStar(Transport$1, exports);
	__exportStar(Message$1, exports);
	exports.IPC = __importStar(IPC);
	exports.WebSocket = __importStar(WebSocket$3); 
} (dist$4));

Object.defineProperty(main, "__esModule", { value: true });
exports.stop = main.stop = exports.stateUpdate = main.stateUpdate = exports.infoUpdate = main.infoUpdate = exports.start = main.start = exports.info = main.info = void 0;
// import * as DiscordRPC from 'discord-rpc';
const discord_rpc_1 = dist$4;
exports.info = main.info = {
    name: 'WatchRPC',
    auther: 'WaterWolf5918',
    version: 0.1,
    configBuilder: {
        pages: {
            Main: [
                { id: 'useServiceName', displayName: 'Use Service Name', type: 'checkbox', required: true, default: true },
                { id: 'clientId', displayName: 'Discord Client ID', type: 'text', required: true, default: '995095535709081670' },
                { id: 'overrideSpotify', displayName: 'Override Spotify', type: 'checkbox', required: true, default: false }
            ]
        }
    },
    // config: {
    //     useServiceName: true,
    //     // clientId: '1279158270182948895'
    //     clientId: '995095535709081670',
    //     overrideSpotify: true
    // }
};
// const rpc = new Client({ clientId: info.config.clientId });
let lastUpdate;
let client;
const start = function (modules) {
    console.log('[WatchRPC] Hello World!');
    lastUpdate = Date.now();
    // .catch(() => {
    //     // PushError("[DiscordRPC] RPC login failed. Is discord open ?",err.toString())
    //     console.log('[WatchRPC] RPC login failed, Please Forgive me :(')
    //     // console.log('[WatchRPC] Stopping Plugin')
    //     // stop();
    //     // return 1
    // })
    // rpc.on('ready',() => {
    //     console.log(`[WatchRPC] Logged in as ${rpc.user.username}`)
    // })
    // rpc.login()
};
exports.start = main.start = start;
const infoUpdate = function (modules, metadata, configHelper) {
    const start = Math.round(Date.now() / 1000);
    start + (metadata.time.totalTime * 1000);
    const service = serviceByService(metadata.auth.service, configHelper.get('overrideSpotify'));
    const now = Date.now();
    if (((now - lastUpdate) / 1000) <= 5) {
        return;
    }
    if (!client) {
        client = new discord_rpc_1.Client({ clientId: configHelper.get('clientId') });
        client.login();
    }
    if (configHelper.get('useServiceName') && client.clientId !== service.id) {
        client.destroy();
        client = new discord_rpc_1.Client({ clientId: service.id });
        client.login();
    }
    client.user?.setActivity({
        details: `${metadata.data.title}`,
        state: `${metadata.data.creator} [⏵]`,
        largeImageKey: `${metadata.data.thumbnail}`,
        smallImageKey: metadata.data.thumbnail2 ?? 'ytlogo4',
        smallImageText: 'WatchRPC (OpenMediaShare)',
        largeImageText: `${metadata.time.formattedTime} | ${Math.round(metadata.time.timePercent)}%`,
        buttons: [{ label: 'Watch Video', url: `${metadata.data.url}` }],
        instance: false,
        // metadata is stored in seconds so we need to convert that to millseconds before using it for timestamps
        "startTimestamp": now - (metadata.time.curruntTime * 1000),
        // idk why but this fixes discord timestamps difting 
        "endTimestamp": now + ((metadata.time.totalTime * 1000) - (metadata.time.curruntTime * 1000)),
        "type": service.type,
    });
    lastUpdate = Date.now();
};
exports.infoUpdate = main.infoUpdate = infoUpdate;
const stateUpdate = function (modules, playerState, configHelper) {
    // console.log(playerState);
    const metadata = modules.infoStore.info;
    const service = serviceByService(metadata.auth.service, configHelper.get('overrideSpotify'));
    let icon;
    switch (playerState) {
        case 'playing':
            icon = '⏵';
            break;
        case 'paused':
            icon = '⏸';
            break;
        case 'unknown':
            icon = '?';
            break;
    }
    client.user?.setActivity({
        details: `${metadata.data.title}`,
        state: `${metadata.data.creator} [${icon}]`,
        largeImageKey: `${metadata.data.thumbnail}`,
        smallImageKey: metadata.data.thumbnail2 ?? 'ytlogo4',
        smallImageText: 'WatchRPC (OpenMediaShare)',
        largeImageText: `${metadata.time.formattedTime} | ${Math.round(metadata.time.timePercent)}%`,
        buttons: [{ label: 'Watch Video', url: `${metadata.data.url}` }],
        instance: false,
        // metadata is stored in seconds so we need to convert that to millseconds before using it for timestamps
        "type": service.type,
    });
};
exports.stateUpdate = main.stateUpdate = stateUpdate;
function serviceByService(service, overrideSpotify) {
    switch (service) {
        case 'spicetify':
            if (overrideSpotify) {
                return { type: 2, label: 'Spotify', id: '1313101111044870144' };
            }
            return { type: 2, label: 'WatchRPC', id: '995095535709081670' };
        case 'youtubeEmbedUserscript':
            return { type: 3, label: 'Youtube', id: '1313100797969694732' };
        case 'youtubeUserscript':
            return { type: 3, label: 'Youtube', id: '1313100797969694732' };
        default:
            return { type: 0, label: 'WatchRPC', id: '995095535709081670' };
    }
}
const stop = function () {
    // rpc.clearActivity()
    console.log('[WatchRPC] Goodbye World!');
};
exports.stop = main.stop = stop;

exports.default = main;
