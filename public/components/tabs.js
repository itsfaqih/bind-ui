function tabs() {
  return {
    active: 0,
    isManual: false,
    orientation: 'horizontal',
    refs: {},

    init() {
      this.$nextTick(() => {
        const id = this.$id('tabs');
        const container = document.getElementById(id);
        this.refs.tabs = container.querySelectorAll(`#${id} [role="tab"]`);
        this.isManual = container.dataset.manual === 'true';
        if (container.dataset.vertical === 'true') {
          this.orientation = 'vertical';
        }
        if (container.dataset.defaultIndex) {
          this.active = parseInt(container.dataset.defaultIndex);
        }
      });
    },

    focusPreviousItem() {
      const elementId = document.activeElement.id;
      const idIndex = elementId.lastIndexOf('-');
      const id = parseInt(elementId.substring(idIndex + 1));
      const index = id - 1;

      if (index === 0) {
        return;
      }

      this.refs.tabs[index - 1].focus();

      if (!this.isManual) {
        this.active = index - 1;
      }
    },

    focusNextItem() {
      const elementId = document.activeElement.id;
      const idIndex = elementId.lastIndexOf('-');
      const id = parseInt(elementId.substring(idIndex + 1));
      const index = id - 1;

      if (index === this.refs.tabs.length - 1) {
        return;
      }

      this.refs.tabs[index + 1].focus();

      if (!this.isManual) {
        this.active = index + 1;
      }
    },

    tabGroup: {
      ['x-id']() {
        return ['tabs'];
      },
      [':id']() {
        return this.$id('tabs');
      },
    },

    tabList: {
      [':role']() {
        return 'tablist';
      },
      [':aria-orientation']() {
        return this.orientation;
      },
    },

    tab: {
      ['x-data']() {
        return {
          selected: () => {
            const elementId = this.$el.id;
            const idIndex = elementId.lastIndexOf('-');
            const tabId = parseInt(elementId.substring(idIndex + 1));

            return tabId === this.active + 1;
          },
        };
      },
      ['@click']() {
        const elementId = this.$el.id;
        const idIndex = elementId.lastIndexOf('-');
        const id = parseInt(elementId.substring(idIndex + 1));

        this.active = id - 1;
      },
      ['@keydown.arrow-left'](e) {
        if (this.orientation === 'horizontal') {
          e.preventDefault();
          this.focusPreviousItem();
        }
      },
      ['@keydown.arrow-right'](e) {
        if (this.orientation === 'horizontal') {
          e.preventDefault();
          this.focusNextItem();
        }
      },
      ['@keydown.arrow-up'](e) {
        if (this.orientation === 'vertical') {
          e.preventDefault();
          this.focusPreviousItem();
        }
      },
      ['@keydown.arrow-down'](e) {
        if (this.orientation === 'vertical') {
          e.preventDefault();
          this.focusNextItem();
        }
      },
      [':id']() {
        return this.$id(`${this.$id('tabs')}-tab`);
      },
      [':role']() {
        return 'tab';
      },
      [':aria-selected']() {
        const elementId = this.$el.id;
        const idIndex = elementId.lastIndexOf('-');
        const id = parseInt(elementId.substring(idIndex + 1));
        const index = id - 1;

        return this.active === index;
      },
      [':tabindex']() {
        const elementId = this.$el.id;
        const idIndex = elementId.lastIndexOf('-');
        const id = parseInt(elementId.substring(idIndex + 1));
        const index = id - 1;

        return this.active === index ? 0 : -1;
      },
    },

    tabPanels: {},

    tabPanel: {
      ['x-show']() {
        const elementId = this.$el.id;
        const idIndex = elementId.lastIndexOf('-');
        const id = parseInt(elementId.substring(idIndex + 1));

        return this.active === id - 1;
      },
      [':id']() {
        return this.$id(`${this.$id('tabs')}-panel`);
      },
      [':role']() {
        return 'tabpanel';
      },
      [':aria-labelledby']() {
        const elementId = this.$el.id;
        const idIndex = elementId.lastIndexOf('-');
        const id = parseInt(elementId.substring(idIndex + 1));

        return `${this.$id('tabs')}-tab-${id}`;
      },
      [':tabindex']() {
        return 0;
      },
    },
  };
}
