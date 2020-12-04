import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'observed' });

export class Store {
    @observable modal = { opened: false, type: '' };
    @observable refetchHash = '';
    @observable sources = [];
    @observable user = null;
    @observable sidebarOpened = true;

    @action updateModal = (value) => {
        this.modal = value
    }

    @action setRefetchHash = (hash) => {
        this.refetchHash = hash
    }

    @action setSources = (sources) => {
        this.sources = sources
    }

    @action setUser = (userData) => {
        this.user = userData
    }

    @action toggleSidebar = () => {
        this.sidebarOpened = !this.sidebarOpened
    }
}