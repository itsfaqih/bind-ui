import './prism.js';

import Alpine from 'alpinejs';
import trap from '@alpinejs/trap';

import dialog from './libs/dialog';
import listbox from './libs/listbox';
import menu from './libs/menu';
import popover from './libs/popover';
import tabs from './libs/tabs';

Alpine.plugin(trap);

Alpine.data('dialog', dialog);
Alpine.data('listbox', listbox);
Alpine.data('menu', menu);
Alpine.data('popover', popover);
Alpine.data('tabs', tabs);

Alpine.start();
