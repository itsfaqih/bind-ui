export default function toggle() {
  return {
    checked: false,
    id: '',
    refs: {},

    init() {
      this.$nextTick(() => {
        this.refs.self = document.getElementById(this.id);
        this.checked = this.refs.self.dataset.checked === 'true';
      });
    },

    toggle: {
      ['@click']() {
        if (this.checked) {
          this.checked = false;
        } else {
          this.checked = true;
        }
      },
      [':id']() {
        this.id = this.$id('toggle');
        return this.id;
      },
      [':aria-checked']() {
        return this.checked;
      },
      [':aria-labelledby']() {
        const labelId = this.$id('toggle', 'label');
        const label = document.getElementById(labelId);

        if (label) {
          return labelId;
        }
        return null;
      }
    },

    toggleGroup: {
      ['x-id']() {
        return ['toggle'];
      },
    },

    toggleLabel: {
      [':id']() {
        return this.$id('toggle', 'label');
      }
    }
  };
}
