import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'observed' });

export class Store {
    @observable modal = { opened: false, type: '' };
    @observable refetchHash = '';
    @observable sources = [];
    @observable categories = [];
    @observable user = null;
    @observable sidebarOpened = true;
    @observable selectedCategory = 'all'

    @action updateModal = (value) => {
        this.modal = value
    }

    @action setRefetchHash = (hash) => {
        this.refetchHash = hash
    }

    @action setSources = (sources) => {
        this.sources = sources
    }

    @action setCategories = (categories) => {
        this.categories = categories
    }

    @action setUser = (userData) => {
        this.user = userData
    }

    @action toggleSidebar = () => {
        this.sidebarOpened = !this.sidebarOpened
    }

    @action updateCategory = (category) => {
        this.selectedCategory = category
    }
}