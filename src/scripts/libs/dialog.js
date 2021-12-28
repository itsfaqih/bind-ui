export default function dialog(dialogId) {
  return {
    open: false,
    id: '',
    dialogId,
    refs: {},

    init() {
      this.$watch('open', value => {
        if (value) {
          const container = document.getElementById(this.id);
          this.refs.trigger = document.activeElement;

          this.$nextTick(() => {
            this.refs.initialFocus =
              this.$refs.initialFocus ||
              container.querySelector(
                'button, a, input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
              );

            this.refs.initialFocus.focus();
          });
        } else {
          this.refs.trigger.focus();
          this.$nextTick(() => {
            this.refs.trigger = null;
          });
        }
      });
    },

    dialog: {
      ['x-id']() {
        return ['dialog'];
      },
      ['x-show']() {
        return this.open;
      },
      ['x-trap.noscroll.inert']() {
        return this.open;
      },
      ['@dialog.window']() {
        if (this.$event.detail === this.dialogId) {
          this.open = true;
        }
      },
      ['@keydown.escape.prevent.stop']() {
        this.open = false;
      },
      [':id']() {
        this.id = this.$id('dialog');
        return this.$id('dialog');
      },
      [':role']() {
        return 'dialog';
      },
      [':aria-modal']() {
        return 'true';
      },
      [':aria-labelledby']() {
        return this.$id('dialog', 'title');
      },
      [':aria-describedby']() {
        const description = document.getElementById(this.$id('dialog', 'description'));

        if (description) {
          return this.$id('dialog', 'description');
        }
        return null;
      },
    },

    dialogOverlay: {
      [':id']() {
        return this.$id('dialog', 'overlay');
      },
      ['x-show']() {
        return this.open;
      },
      [':aria-hidden']() {
        return true;
      },
    },

    dialogContent: {
      ['x-show']() {
        return this.open;
      },
    },

    dialogTitle: {
      [':id']() {
        return this.$id('dialog', 'title');
      },
    },

    dialogDescription: {
      [':id']() {
        return this.$id('dialog', 'description');
      },
    },
  };
}
