import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from '../router'

let api = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 2000,
    withCredentials: true
})

let auth = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 2000,
    withCredentials: true
})

vue.use(vuex)

var store = new vuex.Store({
    state: {
        error: {},
        activeUser: {},
        keep: {},
        activeKeep: {},
        vault: [],
        activeVault: {},
        vaults: [],
        myCreatedKeeps: []
    },
    mutations: {

        //SET USER
        setUser(state, user) {
            state.activeUser = user
        },
        resetState(state) {
            state.error = {},
                state.activeKeep = {},
                state.keep = {},
                state.vault = [],
                state.activeVault = {},
                state.vaults = [],
                state.myCreatedKeeps = []
        },
        //HANDLE ERROR
        handleError(state, err) {
            state.error = err
        },
        //SET KEEPS
        addOrUpdateKeep(state, data) {

            var i = state.vault.findIndex(e => e._id == data.keep._id)
            if (i > -1) {
                vue.set(state.vault, i, data.keep)
            } else {
                state.vault.push(data.keep)
            }

        },
        removeKeep(state, data) {
            for (var i = 0; i < state.vault.length; i++) {
                var keep = state.vault[i]
                if (keep._id == data.keep._id) {
                    state.vault.splice(i, 1)
                    return
                }
            }
        },
        setKeeps(state, data) {
            state.vault = data
            console.log(state.vault)
        },
        setMyKeeps(state, data) {
            state.myKeeps = data
            console.log(state.myKeeps)
        },
        //COLLABORATORS
        setCollabs(state, data) {
            console.log(data)
            state.collaborators = data
        },
        setMyVaults(state, data) {
            state.myVaults = data
            console.log(state.myVaults)
        },
        setActiveKeep(state, data) {
            state.activeKeep = {}
            state.activeKeep = data
        },

        setActiveVault(state, data) {
            vue.set(state, "activeVault", data)
        },
        setTimeSlot(state, data) {
            state.timeSlots = data
        },
        // SET USER NOTES
        setUserNotes(state, data) {
            state.userNotes = data
        },

        // SET ACTIVE NOTE
        setActiveNote(state, note) {

            state.activeNote = {}
            state.activeNote = note
        },
        setAdminKeeps(state, data) {
            console.log()
            state.adminKeeps = data
        }

    },
    actions: {

        //***LOGIN AND REGISTER***

        //LOGIN

        login({ commit, dispatch }, payload) {

            auth.post('login', payload)
                .then(res => {
                    console.log("successful login")
                    commit('setUser', res.data.data)
                    dispatch('initSocket', res.data.data)
                })
                .catch(err => {
                    commit('handleError', err)

                })
        },

        //REGISTER

        register({ commit, dispatch }, payload) {

            auth.post('register', payload)
                .then(res => {
                    commit('setUser', res.data.data)
                    dispatch('initSocket', res.data.data)
                })
                .catch((err) => {
                    { commit('handleError', err) }
                })
        },

        //AUTHENTICATE

        authenticate({ commit, dispatch }) {
            auth('authenticate')
                .then(res => {
                    commit('setUser', res.data.data)
                    dispatch('initSocket', res.data.data)

                })
                .catch((err) => {
                    commit('handleError', err)
                })
        },

        //LOGOUT

        logout({ commit, dispatch }) {
            auth.delete('logout')
                .then((user) => {
                    user = {}

                    commit('setUser', user)
                    commit('resetState')
                    router.push({ name: 'Home' })
                })
        },

        //*** KEEPS/ACTIVITIES ***/

        //GET ALL KEEPS

        getAllKeeps({ commit, dispatch }) {
            api('/find-keeps')
                .then(res => {
                    commit('setKeeps', res.data.data)
                })
        },

        //GET ACTIVITIES BY KEEP ID

        getVaults({ commit, dispatch }, payload) {

            api('/keeps/' + payload._id + '/vaults')
                .then(res => {
                    commit('setSchedule', res.data.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        //GET MY KEEPS (USER)

        getMyKeeps({ commit, dispatch }) {
            api(`/user-keeps`)
                .then(res => {
                    console.log('res to getMyKeeps: ', res)
                    commit('setMyKeeps', res.data.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        getMyVaults({ commit, dispatch }) {

            api(`/user-vaults`)
                .then(res => {
                    console.log('res to getMyVaults: ', res)
                    commit('setUserSchedule', res.data.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        // CREATE NEW KEEP

        createKeep({ commit, dispatch }, payload) {

            api.post('keeps/', payload.keep)
                .then(res => {
                    console.log('res to create keep: ', res.data.data)
                    dispatch('getAllKeeps')
                    dispatch('getCreatedKeeps')
                    dispatch('addToMyKeeps', { user: payload.user, keep: res.data.data })
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        // GET VAULT BY ID
        getVaultById({ commit, dispatch }, vault) {
            api('vaults/' + vault._id)
                .then(res => {
                    commit('setActiveVault', res.data.data)
                    dispatch('joinRoom', vault._id)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        // GET KEEP BY ID
        getKeepById({ commit, dispatch }, keep) {

            api('keeps/' + keep._id)
                .then(res => {
                    commit('setActiveKeep', res.data.data)
                    dispatch('getVaults', { _id: keep._id })
                    dispatch('joinRoom', keep._id)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        // ADD VAULT
        addVault({ commit, dispatch }, payload) {
            payload.vault.keepId = payload.keepId
            api.post('vaults', payload.vault)
                .then(res => {
                    console.log(res)
                    dispatch('getVaults', { _id: payload.vault.keepId })
                    if (payload.emit) {
                        payload.action = 'getVaults'
                        dispatch('emitData', payload)
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        addToMySchedule({ commit, dispatch }, payload) {
            payload.user.vaults.push(payload.vault._id)
            api.put('/user-vaults', payload.user)
                .then(res => {
                    console.log('vault has been added')
                    dispatch('authenticate')
                    if (payload.emit) {
                        payload.action = 'getVaultById'
                        dispatch('emitData', payload)
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })

        },
        editKeep({ commit, dispatch }, payload) {
            api.put('keeps/' + payload.keep._id, payload.keep)
                .then(res => {
                    commit('setActiveKeep', payload.keep)

                    if (payload.emit) {
                        payload.mutation = 'addOrUpdateKeep'
                        dispatch('emitData', payload)
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        editVault({ commit, dispatch }, payload) {

            api.put('vaults/' + payload.vault._id, payload.vault)
                .then(res => {
                    commit('setActiveVault', payload.vault)
                    dispatch('getVaults', { _id: payload.vault.keepId })
                    if (payload.emit) {
                        payload.action = 'getVaultById'
                        dispatch('emitData', payload)
                        payload.action = "getVaults"
                        dispatch('emitData', payload)
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        deleteVault({ commit, dispatch }, payload) {

            api.delete('vaults/' + payload.vault._id)
                .then(res => {
                    console.log("delete request:", res)
                    dispatch('getVaults', { _id: res.data.data.keepId })
                    if (payload.emit) {
                        payload.action = 'getVaults'
                        dispatch('emitData', payload)
                        payload.action = 'getVaultById'
                        dispatch('emitData', payload)
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        addToVault({ commit, dispatch }, payload) {
            payload.user.vaults[_id].push(payload.keep._id)

            api.put('/user-vaults/' + vault._id, payload.user)
                .then(res => {
                    console.log('this keep has been added')
                    dispatch('authenticate')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        //VARIOUS DELETES

        deleteKeep({ commit, dispatch }, payload) {

            api.delete('keeps/' + payload.keep._id)
                .then(res => {
                    console.log('res to delete keep: ', res.data.data)
                    router.push('/admin-keeps')
                    dispatch('getAllKeeps')
                    if (payload.emit) {
                        payload.action = 'getAllKeeps'
                        dispatch('emitData', payload)
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        //REMOVE ACTIVITIES FROM MY SCHEDULE
        removeFromMySchedule({ commit, dispatch }, payload) {
            for (var i = 0; i < payload.user.vaults.length; i++) {
                var vault = payload.user.vaults[i]
                if (vault == payload.vault._id) {
                    payload.user.vaults.splice(i, 1)
                    break
                }
            }
            api.put('/user-vaults', payload.user)
                .then(res => {
                    console.log('vault has been removed from user schedule')
                    dispatch('authenticate')
                    dispatch('getMySchedule', payload.keep)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        getCreatedKeeps({ commit, dispatch }) {
            api('/admin-keeps')
                .then(res => {
                    console.log('res to get created: ', res)
                    console.log('res.data.data of get created: ', res.data.data)
                    commit('setAdminKeeps', res.data.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        //REMOVE KEEP FROM MY SCHEDULE
        removeFromMyKeeps({ commit, dispatch }, payload) {
            api.put('/user-keeps/' + payload.keep._id, payload.keep)
                .then(res => {
                    console.log('this keep has been removed from user keeps')
                    dispatch('authenticate')
                    dispatch('getMyKeeps')
                    dispatch('getMySchedule', payload.keep)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        publishKeep({ commit, dispatch }, payload) {
            api.put('/keeps/' + payload.keep._id, payload.keep)
                .then(res => {
                    dispatch('getAllKeeps')
                    if (payload.emit && payload.keep.published) {
                        payload.mutation = 'addOrUpdateKeep'
                        dispatch('emitData', payload)
                    }
                    if (payload.emit && !payload.keep.published) {
                        payload.mutation = 'removeKeep'
                        dispatch('emitData', payload)
                    }
                })

                .catch(err => {
                    commit('handleError', err)
                })
        },

        //HANDLE ERROR
        handleError({ commit, dispatch }, err) {
            commit('handleError', err)
        }

    }

})


export default store