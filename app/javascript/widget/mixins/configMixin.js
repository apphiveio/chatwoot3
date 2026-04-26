import { pickLocaleWithFallback } from 'widget/helpers/i18nHelper';

export default {
  computed: {
    useInboxAvatarForBot() {
      return this.channelConfig.enabledFeatures.includes(
        'use_inbox_avatar_for_bot'
      );
    },
    hasAConnectedAgentBot() {
      return !!window.chatwootWebChannel.hasAConnectedAgentBot;
    },
    inboxAvatarUrl() {
      return window.chatwootWebChannel.avatarUrl;
    },
    channelConfig() {
      return window.chatwootWebChannel;
    },
    // Resolved welcome heading/tagline. Picks a translation from
    // welcomeTitleI18n / welcomeTaglineI18n (configured per-inbox via
    // additional_attributes) for the active vue-i18n locale, falling
    // back to the legacy single-string column managed in the inbox
    // settings UI.
    welcomeTitleResolved() {
      return pickLocaleWithFallback(
        this.channelConfig.welcomeTitleI18n,
        this.channelConfig.welcomeTitle,
        this.$i18n && this.$i18n.locale
      );
    },
    welcomeTaglineResolved() {
      return pickLocaleWithFallback(
        this.channelConfig.welcomeTaglineI18n,
        this.channelConfig.welcomeTagline,
        this.$i18n && this.$i18n.locale
      );
    },
    hasEmojiPickerEnabled() {
      return this.channelConfig.enabledFeatures.includes('emoji_picker');
    },
    hasAttachmentsEnabled() {
      return this.channelConfig.enabledFeatures.includes('attachments');
    },
    hasEndConversationEnabled() {
      return this.channelConfig.enabledFeatures.includes('end_conversation');
    },
    preChatFormEnabled() {
      return window.chatwootWebChannel.preChatFormEnabled;
    },
    preChatFormOptions() {
      let preChatMessage = '';
      const options = window.chatwootWebChannel.preChatFormOptions || {};
      preChatMessage = options.pre_chat_message;
      const { pre_chat_fields: preChatFields = [] } = options;
      return {
        preChatMessage,
        preChatFields,
      };
    },
    shouldShowPreChatForm() {
      const { preChatFields } = this.preChatFormOptions;
      // Check if at least one enabled field in pre-chat fields
      const hasEnabledFields =
        preChatFields.filter(field => field.enabled).length > 0;
      return this.preChatFormEnabled && hasEnabledFields;
    },
  },
};
