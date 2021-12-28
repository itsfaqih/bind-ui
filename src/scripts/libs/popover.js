export default function popover() {
  return {
    open: false,
    refs: {},

    init() {
      this.$nextTick(() => {
        this.refs.button = document.getElementById(this.$id('popover', 'button'));
      });
    },

    toggle() {
      this.open = !this.open;
    },

    popover: {
      ['x-id']() {
        return ['popover'];
      },
      ['x-trap']() {
        return this.open;
      },
      ['@keydown.escape']() {
        this.open = false;
      },
      ['@click.outside']() {
        this.open = false;
      },
      [':id']() {
        return this.$id('popover');
      },
    },

    popoverButton: {
      ['@click']() {
        this.toggle();
      },
      [':id']() {
        return this.$id('popover', 'button');
      },
      [':aria-expanded']() {
        return this.open;
      },
      [':aria-controls']() {
        return this.$id('popover', 'panel');
      },
    },

    popoverPanel: {
      ['x-show']() {
        return this.open;
      },
      [':id']() {
        return this.$id('popover', 'panel');
      },
    },
  };
}
