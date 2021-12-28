export default function listbox() {
  return {
    open: false,
    refs: {},
    selected: {},
    selectedString: '',

    init() {
      this.$nextTick(() => {
        const container = document.getElementById(this.$id('listbox'));
        this.refs.button = document.getElementById(this.$id('listbox', 'button'));
        this.refs.list = document.getElementById(this.$id('listbox', 'options'));
        this.refs.options = this.refs.list.querySelectorAll(`#${this.$id('listbox')} [role="option"]`);

        if (container.dataset.value) {
          this.selectedString = container.dataset.value;
        } else if (this.refs.options.length > 0) {
          const firstOption = this.refs.options[0];

          this.selectedString = firstOption.dataset.value;
        }
      });

      this.$watch('selectedString', value => {
        this.selected = JSON.parse(value) || {};
      });
    },

    toggle() {
      if (this.open) {
        this.$nextTick(() => {
          this.refs.button.focus();
        });
      }

      this.open = !this.open;
    },

    close() {
      this.open = false;
    },

    setSelected(option) {
      this.selectedString = option;
      this.toggle();
    },

    focusPreviousOption() {
      const hasOption = this.refs.options.length > 0;
      if (!hasOption) {
        return;
      }

      const hasActiveOption = document.activeElement.getAttribute('role') === 'option';

      if (!hasActiveOption) {
        this.refs.button.blur();
        const lastOption = this.refs.options[this.refs.options.length - 1];
        lastOption.focus();
        return;
      }

      const activeOption = document.activeElement;
      const firstOption = this.refs.options[0];

      if (activeOption.id === firstOption.id) {
        return;
      }

      const prevOptionOrder = parseInt(activeOption.id.split('-')[3]) - 2;
      const prevOption = this.refs.options[prevOptionOrder];

      prevOption.focus();
    },

    focusNextOption() {
      const hasOption = this.refs.options.length > 0;
      if (!hasOption) {
        return;
      }

      const hasActiveOption = document.activeElement.getAttribute('role') === 'option';

      if (!hasActiveOption) {
        this.refs.button.blur();
        const firstOption = this.refs.options[0];
        firstOption.focus();
        return;
      }

      const activeOption = document.activeElement;
      const lastOption = this.refs.options[this.refs.options.length - 1];

      if (activeOption.id === lastOption.id) {
        return;
      }

      const nextOptionOrder = parseInt(activeOption.id.split('-')[3]);
      const nextOption = this.refs.options[nextOptionOrder];

      nextOption.focus();
    },

    listbox: {
      ['x-id']() {
        return ['listbox'];
      },
      ['@click.outside']() {
        this.close();
      },
      [':id']() {
        return this.$id('listbox');
      },
    },

    listboxButton: {
      ['@click']() {
        this.toggle();
        this.$nextTick(() => {
          this.refs.list.querySelector(`[data-value='${this.selectedString}']`).focus();
        });
      },
      ['@keydown.space']() {
        this.$nextTick(() => {
          this.refs.list.querySelector('[role=option]').focus();
        });
      },
      ['@keydown.enter']() {
        this.$nextTick(() => {
          this.refs.list.querySelector('[role=option]').focus();
        });
      },
      ['@keydown.arrow-up.prevent']() {
        this.toggle();
        this.$nextTick(() => {
          this.refs.list.querySelector(`[data-value='${this.selectedString}']`).focus();
        });
      },
      ['@keydown.arrow-down.prevent']() {
        this.toggle();
        this.$nextTick(() => {
          this.refs.list.querySelector(`[data-value='${this.selectedString}']`).focus();
        });
      },
      [':id']() {
        return this.$id('listbox', 'button');
      },
      [':aria-haspopup']() {
        return true;
      },
      [':aria-expanded']() {
        return this.open;
      },
      [':aria-controls']() {
        return this.$id('listbox', 'options');
      },
    },

    listboxOptions: {
      ['x-show']() {
        return this.open;
      },
      ['@keydown.tab.prevent']() {},
      ['@keydown.escape']() {
        this.toggle();
      },
      ['@keydown.arrow-up.prevent']() {
        this.focusPreviousOption();
      },
      ['@keydown.arrow-down.prevent']() {
        this.focusNextOption();
      },
      [':role']() {
        return 'listbox';
      },
      [':id']() {
        return this.$id('listbox', 'options');
      },
      [':aria-labelledby']() {
        return this.$id('listbox', 'button');
      },
      [':tabindex']() {
        return 0;
      },
    },

    listboxOption: {
      ['x-data']() {
        return {
          selected: () => {
            const value = this.$el.dataset.value;

            return value === this.selectedString;
          },
        };
      },
      ['@keydown.tab.prevent']() {},
      ['@keydown.escape.stop']() {
        this.toggle();
      },
      ['@keydown.arrow-up.prevent.stop']() {
        this.focusPreviousOption();
      },
      ['@keydown.arrow-down.prevent.stop']() {
        this.focusNextOption();
      },
      ['@keydown.enter.prevent.stop']() {
        this.setSelected(this.$el.dataset.value);
      },
      ['@keydown.space.prevent.stop']() {
        this.setSelected(this.$el.dataset.value);
      },
      ['@mouseenter']() {
        this.$el.focus();
      },
      ['@mouseleave']() {
        this.refs.list.focus();
      },
      ['@click']() {
        this.setSelected(this.$el.dataset.value);
      },
      [':id']() {
        return this.$id(`${this.$id('listbox')}-option`);
      },
      [':role']() {
        return 'option';
      },
      [':tabindex']() {
        return -1;
      },
    },
  };
}
