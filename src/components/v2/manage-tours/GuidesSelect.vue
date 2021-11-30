<template>
    <v-col cols="12">
        <v-autocomplete :loading="isUpdating" v-model="guideIds" :disabled="isUpdating" :items="guides" filled chips
                        color="blue-grey lighten-2" label="Guides" item-text="name" item-value="_id" multiple>
            <template v-slot:selection="data">
                <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select"
                        @click:close="remove(data.item)">
                    <v-avatar left>
                        <v-img :src="data.item.photo"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                </v-chip>
            </template>
            <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                    <v-list-item-avatar>
                        <img :src="data.item.photo">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                        <!-- <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle> -->
                    </v-list-item-content>
                </template>
            </template>
        </v-autocomplete>
    </v-col>
</template>

<script>
    // import userService from '../../../services/user.service'

    export default {
        name: "GuidesSelect",
        async created() {
            await this.loadGuides()
        },
        data() {
            return {
                isUpdating: false,
            }
        },
        props: {
            tourGuides: {
                type: Array,

            }
        },
        computed:{
            guides:{
                get:function(){
                    return this.$store.getters["manageTour/getGuides"]
                }
            },
            guideIds:{
                get:function(){
                  return this.$store.getters["manageTour/getGuideIds"]
                },
                set:function (newVal) {
                    return this.$store.commit("manageTour/setGuideIds",newVal)
                }
            }
        },
        methods: {
            remove(item) {
                const index = this.guideIds.indexOf(item._id)
                if (index >= 0) this.guideIds.splice(index, 1)
            },
           async loadGuides(){
               this.isUpdating = true
               await this.$store.dispatch("manageTour/getGuides")
               const tourGuides=this.tourGuides
                await this.$store.dispatch("manageTour/getSelectedGuideIds",tourGuides)
               this.isUpdating = false
            }
        },
    }
</script>

<style>

</style>
