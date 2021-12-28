function menu() {
  return {
    open: false,
    refs: {},

    init() {
      this.$nextTick(() => {
        this.refs.button = document.getElementById(this.$id('menu', 'button'));
        this.refs.list = document.getElementById(this.$id('menu', 'items'));
        this.refs.items = this.refs.list.querySelectorAll(`#${this.$id('menu')} [role="menuitem"]`);
      });
    },

    toggle() {
      const isClosing = this.open;
      if (isClosing) {
        this.$nextTick(() => {
          this.refs.button.focus();
        });
      }

      this.open = !this.open;
    },

    close() {
      this.open = false;
    },

    focusPreviousItem() {
      const hasItem = this.refs.items.length > 0;
      if (!hasItem) {
        return;
      }

      const hasActiveItem = document.activeElement.getAttribute('role') === 'menuitem';

      if (!hasActiveItem) {
        this.refs.button.blur();
        const lastItem = this.refs.items[this.refs.items.length - 1];
        lastItem.focus();
        return;
      }

      const activeItem = document.activeElement;
      const firstItem = this.refs.items[0];

      if (activeItem.id === firstItem.id) {
        return;
      }

      const prevItemOrder = parseInt(activeItem.id.split('-')[3]) - 2;
      const prevItem = this.refs.items[prevItemOrder];

      prevItem.focus();
    },

    focusNextItem() {
      const hasItem = this.refs.items.length > 0;
      if (!hasItem) {
        return;
      }

      const hasActiveItem = document.activeElement.getAttribute('role') === 'menuitem';

      if (!hasActiveItem) {
        this.refs.button.blur();
        const firstItem = this.refs.items[0];
        firstItem.focus();
        return;
      }

      const activeItem = document.activeElement;
      const lastItem = this.refs.items[this.refs.items.length - 1];

      if (activeItem.id === lastItem.id) {
        return;
      }

      const nextItemOrder = parseInt(activeItem.id.split('-')[3]);
      const nextItem = this.refs.items[nextItemOrder];

      nextItem.focus();
    },

    menu: {
      ['x-id']() {
        return ['menu'];
      },
      ['@click.outside']() {
        this.close();
      },
      [':id']() {
        return this.$id('menu');
      }
    },

    menuButton: {
      ['@click']() {
        this.toggle();
        this.$nextTick(() => {
          this.refs.list.focus();
        });
      },
      ['@keydown.space']() {
        this.$nextTick(() => {
          this.refs.list.querySelector('[role=menuitem]').focus();
        });
      },
      ['@keydown.enter']() {
        this.$nextTick(() => {
          this.refs.list.querySelector('[role=menuitem]').focus();
        });
      },
      [':id']() {
        return this.$id('menu', 'button');
      },
      [':aria-haspopup']() {
        return true;
      },
      [':aria-expanded']() {
        return this.open;
      },
      [':aria-controls']() {
        return this.$id('menu', 'items');
      },
    },

    menuItems: {
      ['x-show']() {
        return this.open;
      },
      ['@keydown.tab.prevent']() {},
      ['@keydown.escape']() {
        this.toggle();
      },
      ['@keydown.arrow-up.prevent']() {
        this.focusPreviousItem();
      },
      ['@keydown.arrow-down.prevent']() {
        this.focusNextItem();
      },
      [':role']() {
        return 'menu';
      },
      [':id']() {
        return this.$id('menu', 'items');
      },
      [':aria-labelledby']() {
        return this.$id('menu', 'button');
      },
      [':tabindex']() {
        return 0;
      },
    },

    menuItem: {
      ['@keydown.tab.prevent']() {},
      ['@keydown.escape.stop']() {
        this.toggle();
      },
      ['@keydown.arrow-up.prevent.stop']() {
        this.focusPreviousItem();
      },
      ['@keydown.arrow-down.prevent.stop']() {
        this.focusNextItem();
      },
      ['@mouseenter']() {
        this.$el.focus();
      },
      ['@mouseleave']() {
        this.refs.list.focus();
      },
      ['@click']() {
        this.close();
      },
      [':id']() {
        return this.$id(`${this.$id('menu')}-item`);
      },
      [':role']() {
        return 'menuitem';
      },
      [':tabindex']() {
        return -1;
      },
    },
  };
}
