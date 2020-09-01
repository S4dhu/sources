import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'observed' });

export class Store {
    @observable modal = { opened: false, type: '' }
    @observable refetchHash = ''

    @action updateModal = (value) => {
        this.modal = value
    }

    @action setRefetchHash = (hash) => {
        this.refetchHash = hash
    }
}