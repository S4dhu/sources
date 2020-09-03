import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'observed' });

export class Store {
    @observable modal = { opened: false, type: '' };
    @observable refetchHash = '';
    @observable sources = [];
    @observable user = null;

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
}